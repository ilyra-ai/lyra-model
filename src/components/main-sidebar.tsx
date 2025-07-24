"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  MessageCircle, Settings, Cloud, Sparkles, ScrollText, Key, Palette,
  Image, Video, PencilLine, FileText, ScrollText as AnalyzeTextIcon, TerminalSquare, Lightbulb
} from "lucide-react";

interface MainSidebarProps {
  activeView: string;
  onSelectView: (view: string) => void;
  onSelectModelType: (type: "text" | "image" | "video") => void;
}

export function MainSidebar({ activeView, onSelectView, onSelectModelType }: MainSidebarProps) {
  const handleQuickActionClick = (actionIdentifier: string, modelType: "text" | "image" | "video") => {
    onSelectModelType(modelType); // Set the model type first
    onSelectView('chat'); // Always go back to chat view for quick actions
    // The actual prompt/simulated result logic will remain in ai-platform/page.tsx
    // as it depends on the message input and chat history.
  };

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

        <span className="px-3 py-2 text-xs font-semibold text-muted-foreground">Ações Rápidas</span>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => handleQuickActionClick("image", "image")}
        >
          <Image className="h-4 w-4 text-green-600" />
          Criar imagem
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => handleQuickActionClick("video", "video")}
        >
          <Video className="h-4 w-4 text-purple-600" />
          Gerar vídeo
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => handleQuickActionClick("write", "text")}
        >
          <PencilLine className="h-4 w-4 text-blue-600" />
          Ajudar a escrever
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => handleQuickActionClick("summarize", "text")}
        >
          <FileText className="h-4 w-4 text-yellow-600" />
          Resumir texto
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => handleQuickActionClick("analyze", "text")}
        >
          <AnalyzeTextIcon className="h-4 w-4 text-orange-600" />
          Analisar texto
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => handleQuickActionClick("code", "text")}
        >
          <TerminalSquare className="h-4 w-4 text-gray-600" />
          Código
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => handleQuickActionClick("brainstorm", "text")}
        >
          <Lightbulb className="h-4 w-4 text-red-600" />
          Brainstorm
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