import { Bell, Search, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const isDarkMode = document.documentElement.classList.toggle("dark");
    setIsDark(isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  };

  return (
    <header className="fixed top-0 left-20 right-0 h-20 bg-white dark:bg-slate-900 border-b border-border shadow-sm z-40 transition-all duration-300 ease-out lg:left-64">
      <div className="flex items-center justify-between h-full px-6 md:px-8">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search projects, clients, documents..."
              className="w-full pl-10 pr-4 py-2 bg-muted/30 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4 ml-6">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <Bell size={20} className="text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            {isDark ? (
              <Sun size={20} className="text-muted-foreground" />
            ) : (
              <Moon size={20} className="text-muted-foreground" />
            )}
          </button>

          {/* Profile Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-orange-500 rounded-lg flex items-center justify-center text-white font-semibold cursor-pointer hover:shadow-lg transition-shadow">
            MA
          </div>
        </div>
      </div>
    </header>
  );
};
