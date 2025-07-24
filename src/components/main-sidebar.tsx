"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  MessageCircle, Settings, Cloud, Sparkles, ScrollText, Key, Palette,
  UserCog2, Book, Laptop, LogOut
} from "lucide-react";

interface MainSidebarProps {
  activeView: string;
  onSelectView: (view: string) => void;
  onSelectModelType: (type: "text" | "image" | "video") => void; // Still needed for model selection in header
}

export function MainSidebar({ activeView, onSelectView, onSelectModelType }: MainSidebarProps) {
  // handleQuickActionClick is no longer needed here as quick actions are moved to chat area
  // The onSelectModelType prop is kept as it might be used by the header's model selection logic.

  return (
    <div className="flex h-full flex-col border-r border-border bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <h2 className="text-lg font-semibold text-sidebar-primary-foreground">Plataforma de IA</h2>
      </div>
      <nav className="flex flex-col gap-1 p-2">
        <Button
          variant={activeView === "chat" ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start gap-2",
            activeView === "chat" && "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90"
          )}
          onClick={() => onSelectView("chat")}
        >
          <MessageCircle className="h-4 w-4" />
          Chat
        </Button>

        <div className="my-2 h-px w-full bg-sidebar-border" />

        <span className="px-3 py-2 text-xs font-semibold text-muted-foreground">Configurações</span>
        <Button
          variant={activeView === "settings-model" ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start gap-2",
            activeView === "settings-model" && "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90"
          )}
          onClick={() => onSelectView("settings-model")}
        >
          <Settings className="h-4 w-4" />
          Configurações do Modelo
        </Button>
        <Button
          variant={activeView === "settings-upload" ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start gap-2",
            activeView === "settings-upload" && "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90"
          )}
          onClick={() => onSelectView("settings-upload")}
        >
          <Cloud className="h-4 w-4" />
          Upload de Dados
        </Button>
        <Button
          variant={activeView === "settings-training" ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start gap-2",
            activeView === "settings-training" && "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90"
          )}
          onClick={() => onSelectView("settings-training")}
        >
          <Sparkles className="h-4 w-4" />
          Treinamento
        </Button>
        <Button
          variant={activeView === "settings-logs" ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start gap-2",
            activeView === "settings-logs" && "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90"
          )}
          onClick={() => onSelectView("settings-logs")}
        >
          <ScrollText className="h-4 w-4" />
          Logs do Sistema
        </Button>
        <Button
          variant={activeView === "settings-api-keys" ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start gap-2",
            activeView === "settings-api-keys" && "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90"
          )}
          onClick={() => onSelectView("settings-api-keys")}
        >
          <Key className="h-4 w-4" />
          Chaves de API
        </Button>
        <Button
          variant={activeView === "settings-customize" ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start gap-2",
            activeView === "settings-customize" && "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90"
          )}
          onClick={() => onSelectView("settings-customize")}
        >
          <Palette className="h-4 w-4" />
          Customizar UI
        </Button>
      </nav>
    </div>
  );
}