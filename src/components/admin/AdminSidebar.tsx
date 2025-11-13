import { Home, Users, BookOpen, CreditCard, Tag, Settings as SettingsIcon } from "lucide-react";

type AdminView = "home" | "users" | "courses" | "payments" | "coupons" | "settings";

interface AdminSidebarProps {
  currentView: AdminView;
  onViewChange: (view: AdminView) => void;
}

export function AdminSidebar({ currentView, onViewChange }: AdminSidebarProps) {
  const menuItems = [
    { id: "home" as AdminView, label: "Dashboard", icon: Home },
    { id: "users" as AdminView, label: "Usuários", icon: Users },
    { id: "courses" as AdminView, label: "Cursos", icon: BookOpen },
    { id: "payments" as AdminView, label: "Pagamentos", icon: CreditCard },
    { id: "coupons" as AdminView, label: "Cupons", icon: Tag },
    { id: "settings" as AdminView, label: "Configurações", icon: SettingsIcon },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Área Administrativa</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
