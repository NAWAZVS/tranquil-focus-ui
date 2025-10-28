import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", href: "/" },
    { name: "To-Do", href: "/todo" },
    { name: "Finances", href: "/finances" },
    { name: "Schedule", href: "/schedule" },
    { name: "Diary", href: "/diary" },
  ];

  const isActive = (href) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="glass-strong rounded-2xl mx-6 mt-6 px-8 py-4 relative z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-background font-heading font-bold text-sm">M</span>
          </div>
          <span className="font-heading font-semibold text-lg text-foreground">Mindful</span>
        </div>
        
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`
                font-body font-medium text-sm transition-all duration-300 relative
                px-1
                ${isActive(item.href) 
                  ? "text-primary" 
                  : "text-foreground hover:text-primary/80"
                }
                after:content-[''] after:absolute after:w-full after:h-0.5 
                after:bottom-[-4px] after:left-0 after:transition-all after:duration-300
                ${isActive(item.href) 
                  ? "after:bg-primary after:scale-x-100" 
                  : "after:bg-primary after:scale-x-0 hover:after:scale-x-100"
                }
              `}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <Avatar className="w-10 h-10 ring-2 ring-primary/30 hover:ring-primary/50 transition-all duration-300">
          <AvatarImage src="/placeholder.svg" alt="Nawaz" />
          <AvatarFallback className="bg-gradient-primary font-heading font-semibold text-background">
            N
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navigation;
