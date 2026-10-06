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
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-strong)] bg-transparent transition-colors duration-300 hover:border-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
        aria-label="Select theme"
      >
        {getIcon()}
      </button>

      {isOpen && (
        <div className={`panel absolute right-0 w-36 rounded-2xl z-50 overflow-hidden ${
          align === "top" ? "bottom-full mb-2" : "top-full mt-3"
        }`}>
          <div className="p-1.5">
            {(["light", "dark", "system"] as Theme[]).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setTheme(mode);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-[11px] uppercase tracking-[0.06em] font-mono font-bold hover:bg-text-primary/5 transition-colors duration-200 cursor-pointer ${
                  theme === mode ? "text-accent" : "text-text-secondary"
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
