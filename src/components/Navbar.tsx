import { Link, useLocation } from "react-router-dom";
import { MapPin, Calendar, Train, BookOpen, Home } from "lucide-react";
import { cn } from "@/src/lib/utils";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/explore", icon: MapPin, label: "Explore" },
  { path: "/planner", icon: Calendar, label: "Planner" },
  { path: "/transport", icon: Train, label: "Transport" },
  { path: "/stories", icon: BookOpen, label: "Stories" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="h-[72px] bg-surface border-b border-border flex items-center justify-between px-10 sticky top-0 z-50">
      <div className="text-xl font-extrabold text-accent tracking-tighter uppercase">
        Aamchi Trip
      </div>
      
      <div className="flex gap-8">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-colors",
                isActive ? "text-accent" : "text-text-muted hover:text-accent"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="w-10 h-10 bg-gray-200 rounded-full" />
    </nav>
  );
}

