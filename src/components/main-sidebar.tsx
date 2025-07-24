import React from "react";
import { Button } from "@/components/ui/button";
import {
  MessageCircle, UserCog2, Book, Settings,
  Laptop, Sparkles, LogOut, Cloud, FilePlus2,
  Paperclip, Globe, ArrowUp, Image, PencilLine,
  FileText, TerminalSquare, Lightbulb, Upload, Download,
  Video, ScrollText, Trash2, Key, Eraser, Palette,
  LayoutDashboard, Database, Brain, FileTerminal, LockKeyhole, Paintbrush,
  ChevronLeft, ChevronRight // Importando os novos ícones
} from "lucide-react";

interface MainSidebarProps {
  activeView: string;
  onSelectView: (view: string) => void;
  onSelectModelType: (type: 'text' | 'image' | 'video') => void;
  isCollapsed: boolean; // Nova prop
  onToggleCollapse: () => void; // Nova prop
}

export function MainSidebar({ activeView, onSelectView, onSelectModelType, isCollapsed, onToggleCollapse }: MainSidebarProps) {
  return (
    <div className="flex h-full flex-col items-start gap-3 px-3 py-3 border-r border-border bg-card">
      {/* Botão para recolher/expandir a sidebar */}
      <div className="flex w-full justify-end mb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="h-8 w-8"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex w-full flex-col items-start gap-1">
        <Button
          variant={activeView === "chat" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelectView("chat")}
        >
          <MessageCircle className="h-4 w-4 mr-2" /> {isCollapsed ? null : "Chat"}
        </Button>
        <Button
          variant={activeView === "settings-model" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelectView("settings-model")}
        >
          <Settings className="h-4 w-4 mr-2" /> {isCollapsed ? null : "Configurações do Modelo"}
        </Button>
        <Button
          variant={activeView === "settings-upload" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelectView("settings-upload")}
        >
          <Database className="h-4 w-4 mr-2" /> {isCollapsed ? null : "Upload de Dados"}
        </Button>
        <Button
          variant={activeView === "settings-training" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelectView("settings-training")}
        >
          <Brain className="h-4 w-4 mr-2" /> {isCollapsed ? null : "Treinamento"}
        </Button>
        <Button
          variant={activeView === "settings-logs" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelectView("settings-logs")}
        >
          <FileTerminal className="h-4 w-4 mr-2" /> {isCollapsed ? null : "Logs"}
        </Button>
        <Button
          variant={activeView === "settings-api-keys" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelectView("settings-api-keys")}
        >
          <LockKeyhole className="h-4 w-4 mr-2" /> {isCollapsed ? null : "Chaves de API"}
        </Button>
        <Button
          variant={activeView === "settings-customize" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelectView("settings-customize")}
        >
          <Paintbrush className="h-4 w-4 mr-2" /> {isCollapsed ? null : "Customizar UI"}
        </Button>
      </div>
      <div className="w-full h-px bg-border my-2" />
      <div className="flex w-full flex-col items-start gap-1">
        {isCollapsed ? null : <span className="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground">Modelos Rápidos</span>}
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => onSelectModelType("text")}
        >
          <FileText className="h-4 w-4 mr-2 text-blue-600" /> {isCollapsed ? null : "Texto"}
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => onSelectModelType("image")}
        >
          <Image className="h-4 w-4 mr-2 text-green-600" /> {isCollapsed ? null : "Imagem"}
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => onSelectModelType("video")}
        >
          <Video className="h-4 w-4 mr-2 text-purple-600" /> {isCollapsed ? null : "Vídeo"}
        </Button>
      </div>
    </div>
  );
}