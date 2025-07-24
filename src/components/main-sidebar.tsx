import React from "react";
import { Button } from "@/components/ui/button";
import {
  MessageCircle, UserCog2, Book, Settings,
  Laptop, Sparkles, LogOut, Cloud, FilePlus2,
  Paperclip, Globe, ArrowUp, Image, PencilLine,
  FileText, TerminalSquare, Lightbulb, Upload, Download,
  Video, ScrollText, Trash2, Key, Eraser, Palette,
  LayoutDashboard, Database, Brain, FileTerminal, LockKeyhole, Paintbrush
} from "lucide-react";

interface MainSidebarProps {
  activeView: string;
  onSelectView: (view: string) => void;
  onSelectModelType: (type: 'text' | 'image' | 'video') => void;
}

export function MainSidebar({ activeView, onSelectView, onSelectModelType }: MainSidebarProps) {
  return (
    <div className="flex h-full flex-col items-start gap-3 px-3 py-3 border-r border-border bg-card">
      <div className="flex w-full flex-col items-start gap-1">
        <Button
          variant={activeView === "chat" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelectView("chat")}
        >
          <MessageCircle className="h-4 w-4 mr-2" /> Chat
        </Button>
        <Button
          variant={activeView === "settings-model" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelectView("settings-model")}
        >
          <Settings className="h-4 w-4 mr-2" /> Configurações do Modelo
        </Button>
        <Button
          variant={activeView === "settings-upload" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelectView("settings-upload")}
        >
          <Database className="h-4 w-4 mr-2" /> Upload de Dados
        </Button>
        <Button
          variant={activeView === "settings-training" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelectView("settings-training")}
        >
          <Brain className="h-4 w-4 mr-2" /> Treinamento
        </Button>
        <Button
          variant={activeView === "settings-logs" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelectView("settings-logs")}
        >
          <FileTerminal className="h-4 w-4 mr-2" /> Logs
        </Button>
        <Button
          variant={activeView === "settings-api-keys" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelectView("settings-api-keys")}
        >
          <LockKeyhole className="h-4 w-4 mr-2" /> Chaves de API
        </Button>
        <Button
          variant={activeView === "settings-customize" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelectView("settings-customize")}
        >
          <Paintbrush className="h-4 w-4 mr-2" /> Customizar UI
        </Button>
      </div>
      <div className="w-full h-px bg-border my-2" />
      <div className="flex w-full flex-col items-start gap-1">
        <span className="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground">Modelos Rápidos</span>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => onSelectModelType("text")}
        >
          <FileText className="h-4 w-4 mr-2 text-blue-600" /> Texto
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => onSelectModelType("image")}
        >
          <Image className="h-4 w-4 mr-2 text-green-600" /> Imagem
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => onSelectModelType("video")}
        >
          <Video className="h-4 w-4 mr-2 text-purple-600" /> Vídeo
        </Button>
      </div>
    </div>
  );
}