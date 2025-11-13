import { Home, BookOpen, Users, MessageSquare, Award } from "lucide-react";

type InstructorView = "home" | "courses" | "course-editor" | "students" | "messages" | "certificates";

interface InstructorSidebarProps {
  currentView: InstructorView;
  onViewChange: (view: InstructorView) => void;
}

export function InstructorSidebar({ currentView, onViewChange }: InstructorSidebarProps) {
  const menuItems = [
    { id: "home" as InstructorView, label: "Dashboard", icon: Home },
    { id: "courses" as InstructorView, label: "Meus Cursos", icon: BookOpen },
    { id: "students" as InstructorView, label: "Alunos", icon: Users },
    { id: "messages" as InstructorView, label: "Mensagens", icon: MessageSquare },
    { id: "certificates" as InstructorView, label: "Certificados", icon: Award },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Área do Instrutor</h2>
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
