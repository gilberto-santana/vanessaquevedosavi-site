-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create enum types
create type public.app_role as enum ('admin', 'instructor', 'student');
create type public.enrollment_status as enum ('active', 'completed', 'cancelled');
create type public.payment_status as enum ('pending', 'completed', 'failed', 'refunded');
create type public.subscription_tier as enum ('free', 'basic', 'premium', 'enterprise');

-- Profiles table (linked to auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- User roles table
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamp with time zone default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create policy "Users can view own roles"
  on public.user_roles for select
  using (auth.uid() = user_id);

-- Security definer function to check roles
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Organizations table (multi-tenant)
create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  logo_url text,
  subscription_tier subscription_tier default 'free',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.organizations enable row level security;

-- Organization members (created BEFORE the organizations policy that references it)
create table public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role default 'student',
  created_at timestamp with time zone default now(),
  unique (organization_id, user_id)
);

alter table public.organization_members enable row level security;

-- NOW create the organizations policy that depends on organization_members
create policy "Organizations are viewable by members"
  on public.organizations for select
  using (
    exists (
      select 1 from public.organization_members
      where organization_id = id and user_id = auth.uid()
    )
  );

create policy "Members can view organization members"
  on public.organization_members for select
  using (
    exists (
      select 1 from public.organization_members om
      where om.organization_id = organization_id and om.user_id = auth.uid()
    )
  );

-- Courses table
create table public.courses (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  instructor_id uuid references auth.users(id) on delete set null,
  title text not null,
  description text,
  thumbnail_url text,
  price decimal(10,2) default 0,
  is_published boolean default false,
  duration_hours integer,
  level text,
  category text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.courses enable row level security;

create policy "Published courses are viewable by everyone"
  on public.courses for select
  using (is_published = true);

create policy "Instructors can manage own courses"
  on public.courses for all
  using (auth.uid() = instructor_id);

-- Course modules
create table public.course_modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade not null,
  title text not null,
  description text,
  order_index integer not null,
  created_at timestamp with time zone default now()
);

alter table public.course_modules enable row level security;

create policy "Modules viewable with course access"
  on public.course_modules for select
  using (
    exists (
      select 1 from public.courses
      where id = course_id and is_published = true
    )
  );

-- Course lessons
create table public.course_lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid references public.course_modules(id) on delete cascade not null,
  title text not null,
  content text,
  video_url text,
  duration_minutes integer,
  order_index integer not null,
  is_free boolean default false,
  created_at timestamp with time zone default now()
);

alter table public.course_lessons enable row level security;

create policy "Lessons viewable with module access"
  on public.course_lessons for select
  using (
    exists (
      select 1 from public.course_modules cm
      join public.courses c on c.id = cm.course_id
      where cm.id = module_id and (c.is_published = true or is_free = true)
    )
  );

-- Course enrollments
create table public.course_enrollments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  status enrollment_status default 'active',
  progress_percentage integer default 0,
  enrolled_at timestamp with time zone default now(),
  completed_at timestamp with time zone,
  unique (course_id, user_id)
);

alter table public.course_enrollments enable row level security;

create policy "Users can view own enrollments"
  on public.course_enrollments for select
  using (auth.uid() = user_id);

create policy "Users can enroll themselves"
  on public.course_enrollments for insert
  with check (auth.uid() = user_id);

-- User progress tracking
create table public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  lesson_id uuid references public.course_lessons(id) on delete cascade not null,
  completed boolean default false,
  completed_at timestamp with time zone,
  time_spent_minutes integer default 0,
  created_at timestamp with time zone default now(),
  unique (user_id, lesson_id)
);

alter table public.user_progress enable row level security;

create policy "Users can manage own progress"
  on public.user_progress for all
  using (auth.uid() = user_id);

-- Certificates
create table public.certificates (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid references public.course_enrollments(id) on delete cascade not null,
  certificate_url text,
  issued_at timestamp with time zone default now(),
  unique (enrollment_id)
);

alter table public.certificates enable row level security;

create policy "Users can view own certificates"
  on public.certificates for select
  using (
    exists (
      select 1 from public.course_enrollments
      where id = enrollment_id and user_id = auth.uid()
    )
  );

-- Subscription plans
create table public.subscription_plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tier subscription_tier not null unique,
  price decimal(10,2) not null,
  features jsonb,
  created_at timestamp with time zone default now()
);

alter table public.subscription_plans enable row level security;

create policy "Plans are viewable by everyone"
  on public.subscription_plans for select
  using (true);

-- Payments
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  course_id uuid references public.courses(id) on delete set null,
  amount decimal(10,2) not null,
  status payment_status default 'pending',
  payment_method text,
  transaction_id text,
  created_at timestamp with time zone default now()
);

alter table public.payments enable row level security;

create policy "Users can view own payments"
  on public.payments for select
  using (auth.uid() = user_id);

-- Coupons
create table public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  discount_percentage integer,
  discount_amount decimal(10,2),
  valid_from timestamp with time zone default now(),
  valid_until timestamp with time zone,
  max_uses integer,
  uses_count integer default 0,
  created_at timestamp with time zone default now()
);

alter table public.coupons enable row level security;

create policy "Coupons viewable by authenticated users"
  on public.coupons for select
  using (auth.role() = 'authenticated');

-- Gamification: User points
create table public.user_points (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  total_points integer default 0,
  level integer default 1,
  updated_at timestamp with time zone default now()
);

alter table public.user_points enable row level security;

create policy "Users can view own points"
  on public.user_points for select
  using (auth.uid() = user_id);

create policy "Points viewable for leaderboard"
  on public.user_points for select
  using (true);

-- Badges
create table public.badges (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  icon_url text,
  points_required integer,
  created_at timestamp with time zone default now()
);

alter table public.badges enable row level security;

create policy "Badges are viewable by everyone"
  on public.badges for select
  using (true);

-- User badges
create table public.user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  badge_id uuid references public.badges(id) on delete cascade not null,
  earned_at timestamp with time zone default now(),
  unique (user_id, badge_id)
);

alter table public.user_badges enable row level security;

create policy "Users can view own badges"
  on public.user_badges for select
  using (auth.uid() = user_id);

create policy "Badges viewable by everyone"
  on public.user_badges for select
  using (true);

-- Forum posts
create table public.forum_posts (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  content text not null,
  likes_count integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.forum_posts enable row level security;

create policy "Posts viewable by enrolled users"
  on public.forum_posts for select
  using (
    exists (
      select 1 from public.course_enrollments
      where course_id = forum_posts.course_id and user_id = auth.uid()
    )
  );

create policy "Users can create posts in enrolled courses"
  on public.forum_posts for insert
  with check (
    auth.uid() = user_id and
    exists (
      select 1 from public.course_enrollments
      where course_id = forum_posts.course_id and user_id = auth.uid()
    )
  );

-- Forum comments
create table public.forum_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.forum_posts(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default now()
);

alter table public.forum_comments enable row level security;

create policy "Comments viewable with post access"
  on public.forum_comments for select
  using (
    exists (
      select 1 from public.forum_posts fp
      join public.course_enrollments ce on ce.course_id = fp.course_id
      where fp.id = post_id and ce.user_id = auth.uid()
    )
  );

-- Messages
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references auth.users(id) on delete cascade not null,
  receiver_id uuid references auth.users(id) on delete cascade not null,
  subject text,
  content text not null,
  read boolean default false,
  created_at timestamp with time zone default now()
);

alter table public.messages enable row level security;

create policy "Users can view messages they sent or received"
  on public.messages for select
  using (auth.uid() = sender_id or auth.uid() = receiver_id);

create policy "Users can send messages"
  on public.messages for insert
  with check (auth.uid() = sender_id);

-- Update timestamp function
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply update triggers
create trigger update_profiles_updated_at before update on public.profiles
  for each row execute function public.update_updated_at_column();

create trigger update_organizations_updated_at before update on public.organizations
  for each row execute function public.update_updated_at_column();

create trigger update_courses_updated_at before update on public.courses
  for each row execute function public.update_updated_at_column();

create trigger update_forum_posts_updated_at before update on public.forum_posts
  for each row execute function public.update_updated_at_column();