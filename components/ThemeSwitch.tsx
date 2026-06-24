"use client";

import * as React from "react";
import { Moon, Sun, Monitor, Check } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const themes = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
    description: "Clean and bright",
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
    description: "Easy on the eyes",
  },
  {
    value: "system",
    label: "System",
    icon: Monitor,
    description: "Follows your device",
  },
] as const;

export function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-xl border-border/60 bg-background hover:bg-muted hover:border-primary/40 transition-all duration-200 shadow-sm"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90 text-primary" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0 text-primary" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 rounded-xl border-border/60 bg-popover shadow-lg p-1.5"
        sideOffset={8}
      >
        <div className="px-2 py-1.5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Appearance
          </p>
        </div>
        <div className="h-px bg-border my-1" />
        {themes.map((t) => {
          const Icon = t.icon;
          const isActive = theme === t.value;
          return (
            <DropdownMenuItem
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-150",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground hover:bg-muted"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm">{t.label}</p>
                <p className="text-[11px] text-muted-foreground leading-tight">
                  {t.description}
                </p>
              </div>
              {isActive && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}