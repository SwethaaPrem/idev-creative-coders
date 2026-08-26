import React, { useEffect, useState, useRef } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

interface ThemeSelectorProps {
  align?: "top" | "bottom";
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ align = "bottom" }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "system";
  });
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const applyTheme = (currentTheme: Theme) => {
      const root = document.documentElement;
      
      if (currentTheme === "light") {
        root.classList.add("light");
      } else if (currentTheme === "dark") {
        root.classList.remove("light");
      } else {
        // System preference
        const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (systemIsDark) {
          root.classList.remove("light");
        } else {
          root.classList.add("light");
        }
      }
    };

    applyTheme(theme);
    localStorage.setItem("theme", theme);

    // Dynamic listener for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [theme]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="w-4 h-4 text-accent" />;
      case "dark":
        return <Moon className="w-4 h-4 text-accent" />;
      case "system":
      default:
        return <Monitor className="w-4 h-4 text-accent" />;
    }
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 rounded-full border border-border-subtle hover:border-text-primary/30 bg-surface/50 backdrop-blur-sm transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer"
        aria-label="Select theme"
      >
        {getIcon()}
      </button>

      {isOpen && (
        <div className={`absolute right-0 w-32 rounded-xl bg-surface border border-border-subtle shadow-xl z-50 overflow-hidden ${
          align === "top" ? "bottom-full mb-2" : "top-full mt-2"
        }`}>
          <div className="py-1">
            {(["light", "dark", "system"] as Theme[]).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setTheme(mode);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-mono hover:bg-background transition-colors duration-200 cursor-pointer ${
                  theme === mode ? "text-accent font-semibold" : "text-text-secondary"
                }`}
              >
                {mode === "light" && <Sun className="w-3.5 h-3.5" />}
                {mode === "dark" && <Moon className="w-3.5 h-3.5" />}
                {mode === "system" && <Monitor className="w-3.5 h-3.5" />}
                {mode}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
