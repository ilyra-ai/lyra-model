"use client";

import React, { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Info, MessageCircle, UserCog2, Book, Settings,
  Laptop, Sparkles, LogOut, Cloud, FilePlus2,
  Paperclip, Globe, ArrowUp, Image, PencilLine,
  FileText, TerminalSquare, Lightbulb
} from "lucide-react";

// Simulação de configurações (no mundo real, viriam de um backend ou de um arquivo de configuração)
const initialConfig = {
  model: {
    n_layers: 6,
    n_heads: 8,
    d_model: 512,
    max_seq_len: 1024,
  },
  training: {
    batch_size: 16,
    epochs: 10,
    learning_rate: 5e-4,
  },
  generation: {
    temperature: 0.8,
    top_k: 50,
    top_p: 0.95,
    max_length: 200,
  },
  ui: {
    theme: "light",
    primary_color: "#000000",
    secondary_color: "#FFFFFF",
    font_family: "Inter",
    custom_css: "",
  },
  selected_model: "GPT-2",
  installed_models: ["GPT-2", "Stable Diffusion"], // Simulação de modelos instalados
  api_keys: {},
};

export default function AIPlatformPage() {
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [temporaryChat, setTemporaryChat] = useState(false);
  const [currentModel, setCurrentModel] = useState(initialConfig.selected_model);

  // Configurações do modelo (estado local para a UI)
  const [modelConfig, setModelConfig] = useState(initialConfig.model);
  const [trainingConfig, setTrainingConfig] = useState(initialConfig.training);
  const [generationConfig, setGenerationConfig] = useState(initialConfig.generation);
  const [uiConfig, setUiConfig] = useState(initialConfig.ui);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText;
    const newChatHistory = [...chatHistory, { role: "user", content: userMessage }];
    setChatHistory(newChatHistory);
    setInputText("");
    setIsLoading(true);
    toast.info("Processando sua solicitação...");

    // Simulação de chamada de API para o backend Python
    // No mundo real, você faria um fetch/axios para seu servidor Python aqui.
    // Exemplo: const response = await fetch('/api/generate-text', { method: 'POST', body: JSON.stringify({ text: userMessage, model: currentModel }) });
    // const data = await response.json();
    // const aiResponse = data.generatedText;

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula um atraso

    const aiResponse = `Esta é uma resposta simulada para: "${userMessage}". (Modelo: ${currentModel})`;
    setChatHistory((prev) => [...prev, { role: "assistant", content: aiResponse }]);
    toast.success("Resposta gerada!");
    setIsLoading(false);
  };

  const handleQuickAction = async (actionType: string) => {
    let prompt = "";
    let simulatedResponse = "";
    let toastMessage = "";

    switch (actionType) {
      case "image":
        prompt = "uma bela paisagem";
        simulatedResponse = `Simulando geração de imagem para: "${prompt}". Um backend Python seria necessário para gerar a imagem real.`;
        toastMessage = "Simulando geração de imagem...";
        break;
      case "write":
        prompt = "um e-mail profissional";
        simulatedResponse = `Simulando ajuda para escrever: "${prompt}". Um backend Python seria necessário para gerar o texto real.`;
        toastMessage = "Simulando ajuda para escrever...";
        break;
      case "summarize":
        prompt = "o texto fornecido";
        simulatedResponse = `Simulando resumo de: "${prompt}". Um backend Python seria necessário para resumir o texto real.`;
        toastMessage = "Simulando resumo...";
        break;
      case "code":
        prompt = "um componente React para um botão";
        simulatedResponse = `Simulando geração de código para: "${prompt}". Um backend Python seria necessário para gerar o código real.`;
        toastMessage = "Simulando geração de código...";
        break;
      case "brainstorm":
        prompt = "ideias para um novo aplicativo";
        simulatedResponse = `Simulando brainstorming para: "${prompt}". Um backend Python seria necessário para gerar as ideias reais.`;
        toastMessage = "Simulando brainstorming...";
        break;
      default:
        return;
    }

    setChatHistory((prev) => [...prev, { role: "user", content: `Ação rápida: ${actionType}` }]);
    setIsLoading(true);
    toast.info(toastMessage);

    await new Promise((resolve) => setTimeout(resolve, 2500)); // Simula um atraso

    setChatHistory((prev) => [...prev, { role: "assistant", content: simulatedResponse }]);
    toast.success("Ação rápida simulada concluída!");
    setIsLoading(false);
  };

  const handleSaveConfig = () => {
    // No mundo real, você enviaria essas configurações para o backend
    toast.success("Configurações salvas (simulado)!");
    console.log("Model Config:", modelConfig);
    console.log("Training Config:", trainingConfig);
    console.log("Generation Config:", generationConfig);
  };

  const handleSaveUiConfig = () => {
    // No mundo real, você salvaria essas configurações no localStorage ou em um backend
    toast.success("Configurações de UI salvas (simulado)!");
    console.log("UI Config:", uiConfig);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const files = Array.from(event.target.files);
    toast.info(`Processando ${files.length} arquivo(s)...`);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simula upload e processamento

    const fileNames = files.map(file => file.name).join(", ");
    toast.success(`Arquivos (${fileNames}) processados (simulado)!`);
    setChatHistory((prev) => [...prev, { role: "assistant", content: `Arquivos carregados e processados (simulado): ${fileNames}. Um backend Python seria necessário para o processamento real.` }]);
    setIsLoading(false);
  };

  const handleUrlDownload = async () => {
    const url = (document.getElementById("urlInput") as HTMLInputElement)?.value;
    if (!url) {
      toast.error("Por favor, insira uma URL.");
      return;
    }

    toast.info(`Baixando e processando URL: ${url}...`);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 3500)); // Simula download e processamento

    toast.success(`URL (${url}) processada (simulado)!`);
    setChatHistory((prev) => [...prev, { role: "assistant", content: `URL baixada e processada (simulado): ${url}. Um backend Python seria necessário para o processamento real.` }]);
    setIsLoading(false);
  };

  const handleTrainModel = async () => {
    const datasetUrl = (document.getElementById("trainUrl") as HTMLInputElement)?.value;
    const baseModel = (document.getElementById("fineTuneBase") as HTMLSelectElement)?.value;

    toast.info(`Iniciando treinamento do modelo (simulado) com dataset: ${datasetUrl}...`);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 5000)); // Simula treinamento

    toast.success("Treinamento do modelo concluído (simulado)!");
    setChatHistory((prev) => [...prev, { role: "assistant", content: `Modelo treinado (simulado) com dataset: ${datasetUrl}. Base: ${baseModel}. Um backend Python seria necessário para o treinamento real.` }]);
    setIsLoading(false);
  };

  const modelOptions = initialConfig.installed_models.map(model => ({
    name: model,
    subtitle: model === "GPT-2" ? "Modelo local básico" : "Modelo de exemplo",
  }));

  return (
    <div className="flex h-screen w-full flex-col items-start font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <div className="flex w-full items-center justify-between px-3 py-3 border-b border-solid border-border bg-background">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80">
              {currentModel}
              <Info className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 p-2 bg-card border border-border rounded-md shadow-lg">
            <div className="px-5 pt-2 pb-1 text-caption font-caption text-muted-foreground">Model</div>
            {modelOptions.map((model) => (
              <DropdownMenuItem
                key={model.name}
                onClick={() => setCurrentModel(model.name)}
                className={`flex w-full items-center gap-2 px-5 py-2 rounded-md cursor-pointer ${currentModel === model.name ? "bg-accent text-accent-foreground" : "hover:bg-muted"}`}
              >
                <div className="flex flex-col items-start">
                  <span className="text-body font-body text-foreground">{model.name}</span>
                  <span className="text-caption text-muted-foreground">{model.subtitle}</span>
                </div>
              </DropdownMenuItem>
            ))}
            <div className="w-full h-px bg-border my-2" />
            <div className="flex w-full items-center gap-4 px-5 py-3">
              <MessageCircle className="h-6 w-6 text-muted-foreground" />
              <span className="grow text-body font-body text-foreground">Temporary chat</span>
              <Switch
                checked={temporaryChat}
                onCheckedChange={setTemporaryChat}
              />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/fychrij7dzl8wgq2zjq9.avif" alt="User Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-2 bg-card border border-border rounded-md shadow-lg">
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-muted">
              <UserCog2 className="h-4 w-4" /> My GPTs
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-muted">
              <Book className="h-4 w-4" /> Customize Lyra
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowSettings(true)} className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-muted">
              <Settings className="h-4 w-4" /> Settings
            </DropdownMenuItem>
            <div className="w-full h-px bg-border my-2" />
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-muted">
              <Laptop className="h-4 w-4" /> Download the macOS app
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-muted">
              <Sparkles className="h-4 w-4" /> Upgrade plan
            </DropdownMenuItem>
            <div className="w-full h-px bg-border my-2" />
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-muted">
              <LogOut className="h-4 w-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Content */}
      {!showSettings ? (
        <div className="flex w-full grow flex-col items-center justify-center gap-7 bg-background px-6 py-6 overflow-auto">
          <h1 className="text-3xl font-bold text-center text-foreground">
            What can I help with?
          </h1>

          {chatHistory.length > 0 && (
            <div ref={chatContainerRef} className="w-full max-w-2xl flex flex-col gap-4 p-4 border rounded-lg bg-card overflow-y-auto max-h-[50vh]">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-[70%] ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex w-full max-w-2xl flex-col items-start rounded-lg bg-secondary px-3 py-2">
            <div className="flex w-full flex-col items-start gap-2 px-2 py-2">
              <Textarea
                placeholder="Message AI Platform"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={1}
                className="min-h-[24px] resize-none border-none bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
              />
            </div>
            <div className="flex w-full items-start gap-2">
              <div className="flex grow items-start gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-md text-muted-foreground hover:bg-muted">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="p-2 bg-card border border-border rounded-md shadow-lg">
                    <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-muted">
                      <Cloud className="h-4 w-4" /> Connect to Google Drive
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-muted">
                      <FilePlus2 className="h-4 w-4" />
                      <label htmlFor="file-upload" className="cursor-pointer">Upload from computer</label>
                      <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileUpload} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="icon" className="rounded-md text-muted-foreground hover:bg-muted" onClick={() => toast.info("Funcionalidade de busca na web em breve!")}>
                  <Globe className="h-5 w-5" />
                </Button>
              </div>
              <Button
                variant="default"
                size="icon"
                className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleSendMessage}
                disabled={isLoading || !inputText.trim()}
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 w-full max-w-2xl">
            <Button variant="outline" className="flex items-center gap-2 rounded-full px-3 py-2 shadow-sm text-muted-foreground hover:bg-muted" onClick={() => handleQuickAction("image")}>
              <Image className="h-4 w-4 text-success-600" />
              <span className="text-sm">Create image</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 rounded-full px-3 py-2 shadow-sm text-muted-foreground hover:bg-muted" onClick={() => handleQuickAction("write")}>
              <PencilLine className="h-4 w-4 text-brand-500" />
              <span className="text-sm">Help me write</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 rounded-full px-3 py-2 shadow-sm text-muted-foreground hover:bg-muted" onClick={() => handleQuickAction("summarize")}>
              <FileText className="h-4 w-4 text-warning-500" />
              <span className="text-sm">Summarize text</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 rounded-full px-3 py-2 shadow-sm text-muted-foreground hover:bg-muted" onClick={() => handleQuickAction("code")}>
              <TerminalSquare className="h-4 w-4 text-neutral-500" />
              <span className="text-sm">Code</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 rounded-full px-3 py-2 shadow-sm text-muted-foreground hover:bg-muted" onClick={() => handleQuickAction("brainstorm")}>
              <Lightbulb className="h-4 w-4 text-destructive" />
              <span className="text-sm">Brainstorm</span>
            </Button>
          </div>
        </div>
      ) : (
        // Settings Tabs
        <div className="flex w-full grow flex-col items-center justify-start gap-7 bg-background px-6 py-6 overflow-auto">
          <div className="w-full max-w-2xl flex flex-col gap-6 p-6 border rounded-lg shadow-lg bg-card">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Settings</h2>
              <Button variant="ghost" onClick={() => setShowSettings(false)}>Close</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Model Settings */}
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold text-foreground">Model Architecture</h3>
                <div>
                  <Label htmlFor="n_layers">Layers: {modelConfig.n_layers}</Label>
                  <Slider
                    id="n_layers"
                    min={1}
                    max={24}
                    step={1}
                    value={[modelConfig.n_layers]}
                    onValueChange={(val) => setModelConfig({ ...modelConfig, n_layers: val[0] })}
                  />
                </div>
                <div>
                  <Label htmlFor="n_heads">Attention Heads: {modelConfig.n_heads}</Label>
                  <Slider
                    id="n_heads"
                    min={1}
                    max={16}
                    step={1}
                    value={[modelConfig.n_heads]}
                    onValueChange={(val) => setModelConfig({ ...modelConfig, n_heads: val[0] })}
                  />
                </div>
                <div>
                  <Label htmlFor="d_model">Model Dimension: {modelConfig.d_model}</Label>
                  <Slider
                    id="d_model"
                    min={128}
                    max={1024}
                    step={64}
                    value={[modelConfig.d_model]}
                    onValueChange={(val) => setModelConfig({ ...modelConfig, d_model: val[0] })}
                  />
                </div>
                <div>
                  <Label htmlFor="max_seq_len">Max Sequence Length: {modelConfig.max_seq_len}</Label>
                  <Slider
                    id="max_seq_len"
                    min={128}
                    max={2048}
                    step={128}
                    value={[modelConfig.max_seq_len]}
                    onValueChange={(val) => setModelConfig({ ...modelConfig, max_seq_len: val[0] })}
                  />
                </div>
              </div>

              {/* Training Parameters */}
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold text-foreground">Training Parameters</h3>
                <div>
                  <Label htmlFor="batch_size">Batch Size: {trainingConfig.batch_size}</Label>
                  <Slider
                    id="batch_size"
                    min={1}
                    max={64}
                    step={1}
                    value={[trainingConfig.batch_size]}
                    onValueChange={(val) => setTrainingConfig({ ...trainingConfig, batch_size: val[0] })}
                  />
                </div>
                <div>
                  <Label htmlFor="epochs">Epochs: {trainingConfig.epochs}</Label>
                  <Slider
                    id="epochs"
                    min={1}
                    max={100}
                    step={1}
                    value={[trainingConfig.epochs]}
                    onValueChange={(val) => setTrainingConfig({ ...trainingConfig, epochs: val[0] })}
                  />
                </div>
                <div>
                  <Label htmlFor="learning_rate">Learning Rate</Label>
                  <Input
                    id="learning_rate"
                    type="number"
                    step="0.00001"
                    value={trainingConfig.learning_rate}
                    onChange={(e) => setTrainingConfig({ ...trainingConfig, learning_rate: parseFloat(e.target.value) })}
                  />
                </div>
                <Button onClick={handleSaveConfig} disabled={isLoading}>
                  💾 Save Configuration
                </Button>
              </div>
            </div>

            {/* Upload Data */}
            <div className="flex flex-col gap-4 mt-8">
              <h3 className="text-xl font-semibold text-foreground">Upload Data</h3>
              <div>
                <Label htmlFor="file-upload-settings">Upload Files</Label>
                <Input
                  id="file-upload-settings"
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
              </div>
              <div>
                <Label htmlFor="urlInput">Or download from URL</Label>
                <Input
                  id="urlInput"
                  placeholder="https://example.com/data.jsonl.zst"
                />
              </div>
              <div className="flex gap-4">
                <Button onClick={handleUrlDownload} disabled={isLoading}>
                  🌐 Download from URL
                </Button>
              </div>
            </div>

            {/* Training */}
            <div className="flex flex-col gap-4 mt-8">
              <h3 className="text-xl font-semibold text-foreground">Training</h3>
              <div>
                <Label htmlFor="trainUrl">Dataset URL</Label>
                <Input
                  id="trainUrl"
                  defaultValue="https://huggingface.co/datasets/oscar-corpus/OSCAR-2301/resolve/main/br_meta/br_meta.jsonl.zst"
                />
              </div>
              <div>
                <Label htmlFor="fineTuneBase">Base Model for Fine-tuning</Label>
                <select
                  id="fineTuneBase"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="None">None</option>
                  {initialConfig.installed_models.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
              <Button onClick={handleTrainModel} disabled={isLoading}>
                🚀 Start Training
              </Button>
            </div>

            {/* Customization */}
            <div className="flex flex-col gap-4 mt-8">
              <h3 className="text-xl font-semibold text-foreground">Customize UI</h3>
              <div>
                <Label htmlFor="uiTheme">Theme</Label>
                <RadioGroup
                  id="uiTheme"
                  value={uiConfig.theme}
                  onValueChange={(val) => setUiConfig({ ...uiConfig, theme: val })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark">Dark</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <Input
                  id="primaryColor"
                  type="color"
                  value={uiConfig.primary_color}
                  onChange={(e) => setUiConfig({ ...uiConfig, primary_color: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <Input
                  id="secondaryColor"
                  type="color"
                  value={uiConfig.secondary_color}
                  onChange={(e) => setUiConfig({ ...uiConfig, secondary_color: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="fontFamily">Font Family</Label>
                <select
                  id="fontFamily"
                  value={uiConfig.font_family}
                  onChange={(e) => setUiConfig({ ...uiConfig, font_family: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Inter">Inter</option>
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                </select>
              </div>
              <div>
                <Label htmlFor="customCss">Custom CSS</Label>
                <Textarea
                  id="customCss"
                  value={uiConfig.custom_css}
                  onChange={(e) => setUiConfig({ ...uiConfig, custom_css: e.target.value })}
                  rows={5}
                  className="font-mono"
                  placeholder="/* Adicione seu CSS personalizado aqui */"
                />
              </div>
              <Button onClick={handleSaveUiConfig} disabled={isLoading}>
                💾 Save UI Settings
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex w-full flex-col items-center justify-center gap-3 px-4 py-4 border-t border-solid border-border bg-background">
        <span className="text-sm text-muted-foreground">
          AI Platform can make mistakes. Check important info.
        </span>
      </div>
    </div>
  );
}