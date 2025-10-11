import { Link, useLocation } from "react-router-dom";
import { Home, CheckSquare, DollarSign, Calendar, BookOpen } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/todo", icon: CheckSquare, label: "To-do" },
    { path: "/finances", icon: DollarSign, label: "Finances" },
    { path: "/schedule", icon: Calendar, label: "Schedule" },
    { path: "/diary", icon: BookOpen, label: "Diary" },
  ];

  return (
    <nav className="glass-strong border-b border-border/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-xl text-foreground">
              MindFlow
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg
                    font-body text-sm font-medium
                    transition-all duration-200
                    ${isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-background/10"
                    }
                  `}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
