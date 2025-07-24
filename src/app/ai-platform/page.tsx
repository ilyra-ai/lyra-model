"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { MainSidebar } from "@/components/main-sidebar";
import { cn } from "@/lib/utils";

import {
  Info, MessageCircle, UserCog2, Book, Settings,
  Laptop, Sparkles, LogOut, Cloud, FilePlus2,
  Paperclip, Globe, ArrowUp, Image, PencilLine,
  FileText, TerminalSquare, Lightbulb, Upload, Download,
  Video, ScrollText, Trash2, Key, Eraser, Palette,
  Check, ChevronsUpDown
} from "lucide-react";

import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";

// Interface para os modelos de IA
interface Model {
  name: string;
  type: "text" | "image" | "video";
  api: string | null;
  local: boolean;
}

// Lista completa de modelos de IA (copiada do script Python)
const AI_MODELS: {
  text: Model[];
  image: Model[];
  video: Model[];
} = {
  "text": [
    {"name": "GPT-2", "type": "text", "api": null, "local": true},
    {"name": "GPT-3.5", "type": "text", "api": "openai", "local": false},
    {"name": "Claude", "type": "text", "api": "anthropic", "local": false},
    {"name": "LLaMA", "type": "text", "api": null, "local": true},
    {"name": "BLOOM", "type": "text", "api": null, "local": true},
  ],
  "image": [
    {"name": "Stable Diffusion", "type": "image", "api": null, "local": true},
    {"name": "DALL-E 2", "type": "image", "api": "openai", "local": false},
    {"name": "Midjourney", "type": "image", "api": "midjourney", "local": false},
    {"name": "Kandinsky", "type": "image", "api": null, "local": true},
    {"name": "DeepFloyd IF", "type": "image", "api": null, "local": true},
    {"name": "Imagen", "type": "image", "api": "google", "local": false},
    {"name": "DreamBooth", "type": "image", "api": null, "local": true},
    {"name": "ControlNet", "type": "image", "api": null, "local": true},
    {"name": "GLIDE", "type": "image", "api": null, "local": true},
    {"name": "Latent Diffusion", "type": "image", "api": null, "local": true},
    {"name": "VQGAN+CLIP", "type": "image", "api": null, "local": true},
    {"name": "BigGAN", "type": "image", "api": null, "local": true},
    {"name": "StyleGAN3", "type": "image", "api": null, "local": true},
    {"name": "Parti", "type": "image", "api": "google", "local": false},
    {"name": "Make-A-Scene", "type": "image", "api": "meta", "local": false},
    {"name": "CogView2", "type": "image", "api": null, "local": true},
    {"name": "ERNIE-ViLG", "type": "image", "api": "baidu", "local": false},
    {"name": "Taiyi", "type": "image", "api": null, "local": true},
    {"name": "OFA", "type": "image", "api": null, "local": true},
    {"name": "Versatile Diffusion", "type": "image", "api": null, "local": true},
  ],
  "video": [
    {"name": "Runway Gen-2", "type": "video", "api": "runway", "local": false},
    {"name": "Pika Labs", "type": "video", "api": "pika", "local": false},
    {"name": "Stable Video Diffusion", "type": "video", "api": null, "local": true},
    {"name": "ModelScope", "type": "video", "api": null, "local": true},
    {"name": "Zeroscope", "type": "video", "api": null, "local": true},
    {"name": "Text2Video-Zero", "type": "video", "api": null, "local": true},
    {"name": "Make-A-Video", "type": "video", "api": "meta", "local": false},
    {"name": "Imagen Video", "type": "video", "api": "google", "local": false},
    {"name": "Phenaki", "type": "video", "api": "google", "local": false},
    {"name": "CogVideo", "type": "video", "api": null, "local": true},
    {"name": "NUWA", "type": "video", "api": "microsoft", "local": false},
    {"name": "VideoGPT", "type": "video", "api": null, "local": true},
    {"name": "TATS", "type": "video", "api": null, "local": true},
    {"name": "VideoGen", "type": "video", "api": null, "local": true},
    {"name": "Tune-A-Video", "type": "video", "api": null, "local": true},
    {"name": "Text2Live", "type": "video", "api": null, "local": true},
    {"name": "DreamBooth3D", "type": "video", "api": null, "local": true},
    {"name": "Magic Video", "type": "video", "api": null, "local": true},
    {"name": "Latent-Shift", "type": "video", "api": null, "local": true},
    {"name": "Video Diffusion", "type": "video", "api": null, "local": true},
  ]
};

// Configurações padrão (adaptado do script Python)
const defaultConfig = {
  model: {
    vocab_size: 50257, d_model: 512, n_heads: 8, n_layers: 6, d_ff: 2048,
    max_seq_len: 1024, dropout: 0.1, activation: "gelu", layer_norm_eps: 1e-5,
    initializer_range: 0.02
  },
  training: {
    batch_size: 16, epochs: 10, learning_rate: 5e-4, lr_scheduler: "cosine",
    warmup_steps: 1000, gradient_clip: 1.0, weight_decay: 0.01, adam_epsilon: 1e-8,
    seed: 42, gradient_accumulation_steps: 1, fp16: false, eval_steps: 500,
    save_steps: 1000, logging_steps: 100
  },
  generation: {
    max_length: 200, min_length: 10, temperature: 0.8, top_k: 50, top_p: 0.95,
    repetition_penalty: 1.2, length_penalty: 1.0, num_beams: 1, strategy: "sampling",
    do_sample: true
  },
  ui: {
    theme: "dark", primary_color: "#000000", secondary_color: "#FFFFFF",
    font_family: "Inter", custom_css: ""
  },
  selected_model_name: "GPT-2", // This will be replaced by selectedModel object
  installed_models: [],
  api_keys: {
    openai: "",
    anthropic: "",
    runway: "",
    midjourney: "",
    google: "",
    meta: "",
    baidu: "",
    microsoft: ""
  }
};

// Lista de modelos base para o combobox (agora inclui "Nenhum")
const BASE_MODELS_EXAMPLES = [
  "Nenhum", // Adicionado para tornar a seleção opcional
  "GPT-3.5-turbo", "GPT-4", "Claude-3-Opus", "Llama-3-8B", "Mistral-7B",
  "Falcon-40B", "Bloom-7B1", "T5-Large", "BERT-Base", "RoBERTa-Large",
  "DistilBERT", "XLM-RoBERTa", "Electra-Base", "DeBERTa-v3-Large", "GPT-Neo-2.7B",
  "GPT-J-6B", "Dolly-v2-12B", "MPT-7B", "Stable-Diffusion-XL", "DALL-E-3",
  "Imagen-2", "Whisper-Large", "BART-Large", "Pegasus-Large", "T5-v1.1-Large",
  "Flan-T5-XL", "Gemma-7B", "Mixtral-8x7B", "CodeLlama-7B", "Phi-2"
];


export default function AIPage() {
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([]);
  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState<Model>(AI_MODELS.text[0]); // Initialize with the first text model
  const [selectedModelType, setSelectedModelType] = useState<Model['type']>('text');
  const [temporaryChat, setTemporaryChat] = useState(false);
  const [activeView, setActiveView] = useState<string>("chat"); // New state for active view
  const [isLoading, setIsLoading] = useState(false);
  const [logsContent, setLogsContent] = useState("Nenhum log disponível.");
  const [metricsPlotUrl, setMetricsPlotUrl] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Novo estado para a barra lateral


  // Configurações do modelo (para a aba de configurações)
  const [modelConfig, setModelConfig] = useState(defaultConfig.model);
  const [trainingConfig, setTrainingConfig] = useState(defaultConfig.training);
  const [generationConfig, setGenerationConfig] = useState(defaultConfig.generation);
  const [uiConfig, setUiConfig] = useState(defaultConfig.ui);
  const [apiKeys, setApiKeys] = useState(defaultConfig.api_keys);

  // Novos estados para URL do Dataset e Modelo Base para Fine-tuning
  const [datasetUrl, setDatasetUrl] = useState("https://huggingface.co/datasets/oscar-corpus/OSCAR-2301/resolve/main/br_meta/br_meta.jsonl.zst");
  const [fineTuneBase, setFineTuneBase] = useState("Nenhum"); // Inicializado com "Nenhum"
  const [openCombobox, setOpenCombobox] = useState(false); // Estado para o combobox

  // Estado para o input de URL de download
  const [downloadUrlInput, setDownloadUrlInput] = useState("");


  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);
    toast.info("Processando sua solicitação...");

    // Simulação de chamada de API para o backend Python
    // No mundo real, você faria uma requisição fetch/axios para seu servidor Python aqui.
    // Exemplo:
    // try {
    //   const response = await fetch('/api/generate-text', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ prompt: message, model: selectedModel.name }),
    //   });
    //   const data = await response.json();
    //   const aiResponse = { role: "assistant", content: data.generatedText };
    //   setChatHistory((prev) => [...prev, aiResponse]);
    //   toast.success("Resposta gerada!");
    // } catch (error) {
    //   console.error("Erro ao gerar resposta:", error);
    //   const errorMessage = { role: "assistant", content: "❌ Erro ao gerar resposta. Verifique o backend." };
    //   setChatHistory((prev) => [...prev, errorMessage]);
    //   toast.error("Erro ao gerar resposta!");
    // } finally {
    //   setIsLoading(false);
    // }

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula atraso

    const aiResponseContent = `Esta é uma resposta simulada do modelo ${selectedModel.name} (${selectedModel.type}) para: "${message}".\n\n_Gerado em 2.00s com ${selectedModel.name}_`;
    const aiResponse = { role: "assistant", content: aiResponseContent };
    setChatHistory((prev) => [...prev, aiResponse]);
    toast.success("Resposta gerada!");
    setIsLoading(false);
  };

  const handleQuickAction = async (actionIdentifier: string) => {
    let prompt = "";
    let toastMessage = "";
    let simulatedResult = "";
    let modelType: Model['type'] = 'text'; // Default to text

    // Determine modelType based on actionIdentifier
    if (actionIdentifier === "image") {
        modelType = "image";
    } else if (actionIdentifier === "video") {
        modelType = "video";
    } else {
        modelType = "text"; // All other quick actions are text-based
    }

    // Automatically select a model of the chosen type for quick actions
    const modelsOfType = AI_MODELS[modelType];
    if (modelsOfType.length > 0) {
      setSelectedModel(modelsOfType[0]); // Select the first model of that type
      setSelectedModelType(modelType);
    } else {
      toast.error(`Nenhum modelo do tipo ${modelType} disponível.`);
      return;
    }

    switch (actionIdentifier) {
      case "image":
        prompt = "uma paisagem bonita";
        toastMessage = "Gerando imagem...";
        simulatedResult = "🖼️ Imagem simulada gerada. (Requer backend para funcionalidade real)";
        break;
      case "video":
        prompt = "um vídeo de um gato brincando";
        toastMessage = "Gerando vídeo...";
        simulatedResult = "🎬 Vídeo simulado gerado. (Requer backend para funcionalidade real)";
        break;
      case "write":
        prompt = "um parágrafo sobre o futuro da IA";
        toastMessage = "Ajudando a escrever...";
        simulatedResult = "✏️ Texto simulado gerado. (Requer backend para funcionalidade real)";
        break;
      case "summarize":
        prompt = "o seguinte texto: 'Inteligência Artificial (IA) é um campo da ciência da computação dedicado à resolução de problemas cognitivos comumente associados à inteligência humana, como aprendizado, resolução de problemas e reconhecimento de padrões.'";
        toastMessage = "Resumindo texto...";
        simulatedResult = "📄 Resumo simulado gerado. (Requer backend para funcionalidade real)";
        break;
      case "analyze":
        prompt = "o seguinte texto para análise de sentimento e entidades: 'O novo produto é excelente, mas o suporte ao cliente precisa melhorar.'";
        toastMessage = "Análise de texto simulada.";
        simulatedResult = "📊 Análise de texto simulada. (Requer backend para funcionalidade real)";
        break;
      case "code":
        prompt = "uma função JavaScript para calcular o fatorial de um número.";
        toastMessage = "Gerando código...";
        simulatedResult = "💻 Código simulado gerado. (Requer backend para funcionalidade real)";
        break;
      case "brainstorm":
        prompt = "ideias para um novo aplicativo de produtividade.";
        toastMessage = "Brainstorming...";
        simulatedResult = "💡 Ideias simuladas gerado. (Requer backend para funcionalidade real)";
        break;
      default:
        return;
    }

    setIsLoading(true);
    toast.info(toastMessage);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simula atraso

    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: `Ação rápida: ${actionIdentifier} com prompt "${prompt}"` },
      { role: "assistant", content: simulatedResult },
    ]);
    toast.success("Ação concluída!");
    setIsLoading(false);
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) {
      toast.error("Nenhum arquivo selecionado.");
      return;
    }
    setIsLoading(true);
    toast.info("Processando arquivos...");
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula atraso
    toast.success(`Processamento simulado de ${files.length} arquivo(s) concluído.`);
    setIsLoading(false);
    // No mundo real, você enviaria os arquivos para o backend aqui.
  };

  const handleUrlDownload = async () => {
    if (!downloadUrlInput.trim()) {
      toast.error("Por favor, insira uma URL para download.");
      return;
    }
    setIsLoading(true);
    toast.info("Enviando URL para download no backend...");
    try {
      const response = await fetch('/api/download-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: downloadUrlInput }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      toast.success(data.message);
    } catch (error) {
      console.error("Erro ao enviar URL para download:", error);
      toast.error(`Erro ao baixar da URL: ${(error as Error).message}.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrainModel = async () => {
    setIsLoading(true);
    toast.info("Iniciando treinamento do modelo...");
    try {
      const baseModelForTraining = fineTuneBase === "Nenhum" ? null : fineTuneBase;

      const requestBody = {
        modelConfig,
        trainingConfig,
        datasetUrl,
        fineTuneBase: baseModelForTraining,
      };

      const response = await fetch('/api/train', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      toast.success(data.message);
      setMetricsPlotUrl(data.metricsPlotUrl || null);
    } catch (error) {
      console.error("Erro ao iniciar treinamento:", error);
      toast.error(`Erro ao iniciar treinamento: ${(error as Error).message}.`);
      setMetricsPlotUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveConfig = () => {
    // No mundo real, você enviaria as configurações para o backend para persistência.
    toast.success("Configurações salvas (simulado)!");
  };

  const handleGetLogs = async () => {
    setIsLoading(true);
    toast.info("Carregando logs...");
    try {
      const response = await fetch('/api/logs');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLogsContent(data.logs || "Nenhum log disponível.");
      toast.success("Logs carregados!");
    } catch (error) {
      console.error("Erro ao carregar logs:", error);
      setLogsContent(`Erro ao carregar logs: ${(error as Error).message}.`);
      toast.error(`Erro ao carregar logs: ${(error as Error).message}.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearLogs = async () => {
    setIsLoading(true);
    toast.info("Limpando logs...");
    try {
      const response = await fetch('/api/clear-logs', { method: 'POST' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLogsContent(data.message + "\n");
      toast.success("Logs limpos!");
    } catch (error) {
      console.error("Erro ao limpar logs:", error);
      toast.error(`Erro ao limpar logs: ${(error as Error).message}.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveApiKeys = () => {
    // No mundo real, você enviaria as chaves de API para o backend para persistência segura.
    toast.success("Chaves de API salvas (simulado)!");
  };

  const handleClearChat = () => {
    setChatHistory([]);
    toast.info("Histórico do chat limpo!");
  };

  // Nova função para lidar com a seleção de tipo de modelo da sidebar
  const handleSelectModelTypeFromSidebar = (type: Model['type']) => {
    setSelectedModelType(type);
    const modelsOfType = AI_MODELS[type];
    if (modelsOfType.length > 0) {
      setSelectedModel(modelsOfType[0]); // Seleciona o primeiro modelo do tipo
    } else {
      toast.error(`Nenhum modelo do tipo ${type} disponível.`);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-start bg-background text-foreground font-[family-name:var(--font-geist-sans)]">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={18}
          minSize={4} // Tamanho mínimo quando recolhido (para mostrar apenas o ícone)
          maxSize={25} // Tamanho máximo quando expandido
          collapsedSize={4} // Tamanho quando explicitamente recolhido
          collapsible={true}
          onCollapse={() => setIsSidebarCollapsed(true)}
          onExpand={() => setIsSidebarCollapsed(false)}
          // Removido: collapsed={isSidebarCollapsed}
        >
          <MainSidebar
            activeView={activeView}
            onSelectView={setActiveView}
            onSelectModelType={handleSelectModelTypeFromSidebar}
            isCollapsed={isSidebarCollapsed} // Passa o estado de recolhimento
            onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)} // Passa a função de alternar
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={82}>
          {/* Header */}
          <div className="flex w-full items-center justify-between px-3 py-3 border-b border-border bg-card">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium">
                  {selectedModel.type.charAt(0).toUpperCase() + selectedModel.type.slice(1)}: {selectedModel.name}
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-2">
                <div className="flex flex-col items-start gap-1">
                  <span className="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground">Modelos de Texto</span>
                  <div className="flex w-full flex-col items-start gap-1 px-2">
                    {AI_MODELS.text.map((model) => (
                      <Button
                        key={model.name}
                        variant="ghost"
                        className={`w-full justify-start ${selectedModel.name === model.name && selectedModel.type === model.type ? "bg-accent text-accent-foreground" : ""}`}
                        onClick={() => setSelectedModel(model)}
                      >
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-medium">{model.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {model.local ? "Local" : `API: ${model.api}`}
                          </span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="w-full h-px bg-border my-2" />
                <div className="flex flex-col items-start gap-1">
                  <span className="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground">Modelos de Imagem</span>
                  <div className="flex w-full flex-col items-start gap-1 px-2">
                    {AI_MODELS.image.map((model) => (
                      <Button
                        key={model.name}
                        variant="ghost"
                        className={`w-full justify-start ${selectedModel.name === model.name && selectedModel.type === model.type ? "bg-accent text-accent-foreground" : ""}`}
                        onClick={() => setSelectedModel(model)}
                      >
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-medium">{model.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {model.local ? "Local" : `API: ${model.api}`}
                          </span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="w-full h-px bg-border my-2" />
                <div className="flex flex-col items-start gap-1">
                  <span className="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground">Modelos de Vídeo</span>
                  <div className="flex w-full flex-col items-start gap-1 px-2">
                    {AI_MODELS.video.map((model) => (
                      <Button
                        key={model.name}
                        variant="ghost"
                        className={`w-full justify-start ${selectedModel.name === model.name && selectedModel.type === model.type ? "bg-accent text-accent-foreground" : ""}`}
                        onClick={() => setSelectedModel(model)}
                      >
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-medium">{model.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {model.local ? "Local" : `API: ${model.api}`}
                          </span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="w-full h-px bg-border my-2" />
                <div className="flex w-full items-center gap-4 px-3 py-2">
                  <MessageCircle className="h-5 w-5 text-muted-foreground" />
                  <span className="grow text-sm text-foreground">Chat temporário</span>
                  <Switch checked={temporaryChat} onCheckedChange={setTemporaryChat} />
                </div>
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/fychrij7dzl8wgq2zjq9.avif" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2">
                <DropdownMenuItem className="flex items-center gap-2">
                  <UserCog2 className="h-4 w-4" /> My GPTs
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Book className="h-4 w-4" /> Personalizar Lyra
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2" onClick={() => setActiveView("settings-model")}>
                  <Settings className="h-4 w-4" /> Configurações
                </DropdownMenuItem>
                <div className="w-full h-px bg-border my-2" />
                <DropdownMenuItem className="flex items-center gap-2">
                  <Laptop className="h-4 w-4" /> Baixar app macOS
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Atualizar plano
                </DropdownMenuItem>
                <div className="w-full h-px bg-border my-2" />
                <DropdownMenuItem className="flex items-center gap-2" onClick={handleClearChat}>
                  <Eraser className="h-4 w-4" /> Limpar Chat
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Main Content Area */}
          {activeView === "chat" && (
            <div className="flex w-full grow flex-col items-center justify-center gap-4 bg-background px-6 py-6 overflow-auto">
              <div className="flex w-full flex-col items-center justify-center gap-7">
                <h1 className="text-3xl font-bold text-center text-foreground">
                  Com o que posso ajudar?
                </h1>

                {chatHistory.length > 0 && (
                  <div className="w-full max-w-3xl flex flex-col gap-4 p-4 border rounded-lg bg-muted/20 overflow-y-auto max-h-[400px]">
                    {chatHistory.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex w-full max-w-3xl flex-col items-start rounded-md border border-input bg-card p-3 shadow-sm">
                  <div className="flex w-full flex-col items-start gap-2 px-2 py-2">
                    <Textarea
                      placeholder="Mensagem para a Plataforma de IA"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={1}
                      className="min-h-[24px] resize-none border-none focus-visible:ring-0"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56 p-2">
                          <DropdownMenuItem className="flex items-center gap-2" onClick={() => toast.info("Conectar ao Google Drive (simulado)")}>
                            <Cloud className="h-4 w-4" /> Conectar ao Google Drive
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2" onClick={() => toast.info("Upload do computador (simulado)")}>
                            <FilePlus2 className="h-4 w-4" /> Upload do computador
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast.info("Funcionalidade de busca na web em breve!")}>
                        <Globe className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                    <Button
                      variant="default"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={handleSendMessage}
                      disabled={isLoading || !message.trim()}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Quick action buttons moved back here */}
                <div className="flex grow shrink-0 basis-0 flex-wrap items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 rounded-full px-3 py-2 shadow-sm"
                    onClick={() => handleQuickAction("image")}
                  >
                    <Image className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-muted-foreground">Criar imagem</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 rounded-full px-3 py-2 shadow-sm"
                    onClick={() => handleQuickAction("video")}
                  >
                    <Video className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-muted-foreground">Gerar vídeo</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 rounded-full px-3 py-2 shadow-sm"
                    onClick={() => handleQuickAction("write")}
                  >
                    <PencilLine className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-muted-foreground">Ajudar a escrever</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 rounded-full px-3 py-2 shadow-sm"
                    onClick={() => handleQuickAction("summarize")}
                  >
                    <FileText className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-muted-foreground">Resumir texto</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 rounded-full px-3 py-2 shadow-sm"
                    onClick={() => handleQuickAction("analyze")}
                  >
                    <ScrollText className="h-4 w-4 text-orange-600" />
                    <span className="text-sm text-muted-foreground">Analisar texto</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 rounded-full px-3 py-2 shadow-sm"
                    onClick={() => handleQuickAction("code")}
                  >
                    <TerminalSquare className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-muted-foreground">Código</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 rounded-full px-3 py-2 shadow-sm"
                    onClick={() => handleQuickAction("brainstorm")}
                  >
                    <Lightbulb className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-muted-foreground">Brainstorm</span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeView === "settings-model" && (
            <div className="flex w-full grow flex-col items-center justify-start gap-4 bg-background px-6 py-6 overflow-auto">
              <div className="w-full max-w-3xl p-4 border rounded-md bg-card">
                <h2 className="text-xl font-semibold mb-4">Configurações do Modelo</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Arquitetura do Modelo</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="n_layers">Camadas ({modelConfig.n_layers})</Label>
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
                        <Label htmlFor="n_heads">Heads de Atenção ({modelConfig.n_heads})</Label>
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
                        <Label htmlFor="d_model">Dimensão do Modelo ({modelConfig.d_model})</Label>
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
                        <Label htmlFor="max_seq_len">Comprimento Máximo da Sequência ({modelConfig.max_seq_len})</Label>
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
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Parâmetros de Treinamento</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="batch_size">Tamanho do Batch ({trainingConfig.batch_size})</Label>
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
                        <Label htmlFor="epochs">Épocas ({trainingConfig.epochs})</Label>
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
                        <Label htmlFor="learning_rate">Taxa de Aprendizagem</Label>
                        <Input
                          id="learning_rate"
                          type="number"
                          step="0.00001"
                          value={trainingConfig.learning_rate}
                          onChange={(e) => setTrainingConfig({ ...trainingConfig, learning_rate: parseFloat(e.target.value) })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Button onClick={handleSaveConfig} className="mt-6 w-full">Salvar Configuração</Button>
              </div>
            </div>
          )}

          {activeView === "settings-upload" && (
            <div className="flex w-full grow flex-col items-center justify-start gap-4 bg-background px-6 py-6 overflow-auto">
              <div className="w-full max-w-3xl p-4 border rounded-md bg-card">
                <h2 className="text-xl font-semibold mb-4">Upload de Dados</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="file_upload">Upload de Arquivos</Label>
                    <Input
                      id="file_upload"
                      type="file"
                      multiple
                      accept=".txt,.pdf,.docx,.json,.jsonl,.zst,.csv"
                      onChange={(e) => handleFileUpload(e.target.files)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-grow">
                      <Label htmlFor="url_input">Ou baixar de URL</Label>
                      <Input
                        id="url_input"
                        placeholder="https://example.com/data.jsonl.zst"
                        value={downloadUrlInput}
                        onChange={(e) => setDownloadUrlInput(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleUrlDownload} className="mt-6" disabled={isLoading}>
                      Baixar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === "settings-training" && (
            <div className="flex w-full grow flex-col items-center justify-start gap-4 bg-background px-6 py-6 overflow-auto">
              <div className="w-full max-w-3xl p-4 border rounded-md bg-card">
                <h2 className="text-xl font-semibold mb-4">Treinamento</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="dataset_url">URL do Dataset</Label>
                    <Input
                      id="dataset_url"
                      placeholder="https://huggingface.co/datasets/oscar-corpus/OSCAR-2301/resolve/main/br_meta/br_meta.jsonl.zst"
                      value={datasetUrl}
                      onChange={(e) => setDatasetUrl(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fine_tune_base">Modelo Base para Fine-tuning (Opcional)</Label>
                    <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCombobox}
                          className="w-full justify-between"
                        >
                          {fineTuneBase || "Selecione um modelo (opcional)..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Buscar ou digitar modelo..."
                            value={fineTuneBase}
                            onValueChange={setFineTuneBase}
                          />
                          <CommandEmpty>Nenhum modelo encontrado.</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {BASE_MODELS_EXAMPLES.map((model) => (
                                <CommandItem
                                  key={model}
                                  value={model}
                                  onSelect={(currentValue) => {
                                    setFineTuneBase(currentValue);
                                    setOpenCombobox(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      fineTuneBase.toLowerCase() === model.toLowerCase() ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {model}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Button onClick={handleTrainModel} className="w-full" disabled={isLoading}>
                    <Sparkles className="h-4 w-4 mr-2" /> Iniciar Treinamento
                  </Button>
                  {metricsPlotUrl && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">Métricas de Treinamento</h3>
                      <img src={metricsPlotUrl} alt="Training Metrics Plot" className="w-full h-auto rounded-md border" />
                      <p className="text-sm text-muted-foreground mt-2">
                        Este gráfico é um placeholder. O gráfico real seria gerado pelo backend Python.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeView === "settings-logs" && (
            <div className="flex w-full grow flex-col items-center justify-start gap-4 bg-background px-6 py-6 overflow-auto">
              <div className="w-full max-w-3xl p-4 border rounded-md bg-card">
                <h2 className="text-xl font-semibold mb-4">Logs do Sistema</h2>
                <div className="space-y-4">
                  <Textarea
                    id="logs_content"
                    value={logsContent}
                    readOnly
                    rows={15}
                    className="font-mono text-xs bg-muted/50 resize-y"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleGetLogs} disabled={isLoading} className="flex-grow">
                      Carregar Logs
                    </Button>
                    <Button onClick={handleClearLogs} disabled={isLoading} variant="destructive" className="flex-grow">
                      Limpar Logs
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === "settings-api-keys" && (
            <div className="flex w-full grow flex-col items-center justify-start gap-4 bg-background px-6 py-6 overflow-auto">
              <div className="w-full max-w-3xl p-4 border rounded-md bg-card">
                <h2 className="text-xl font-semibold mb-4">Chaves de API</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Insira suas chaves de API para provedores de IA externos. Estas chaves seriam usadas pelo backend.
                </p>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="openai_api_key">OpenAI API Key</Label>
                    <Input
                      id="openai_api_key"
                      type="password"
                      placeholder="sk-..."
                      value={apiKeys.openai}
                      onChange={(e) => setApiKeys({ ...apiKeys, openai: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="anthropic_api_key">Anthropic API Key</Label>
                    <Input
                      id="anthropic_api_key"
                      type="password"
                      placeholder="sk-ant-api03-..."
                      value={apiKeys.anthropic}
                      onChange={(e) => setApiKeys({ ...apiKeys, anthropic: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="runway_api_key">Runway API Key</Label>
                    <Input
                      id="runway_api_key"
                      type="password"
                      placeholder="rw-..."
                      value={apiKeys.runway}
                      onChange={(e) => setApiKeys({ ...apiKeys, runway: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="midjourney_api_key">Midjourney API Key</Label>
                    <Input
                      id="midjourney_api_key"
                      type="password"
                      placeholder="mj-..."
                      value={apiKeys.midjourney}
                      onChange={(e) => setApiKeys({ ...apiKeys, midjourney: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="google_api_key">Google API Key</Label>
                    <Input
                      id="google_api_key"
                      type="password"
                      placeholder="AIza..."
                      value={apiKeys.google}
                      onChange={(e) => setApiKeys({ ...apiKeys, google: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="meta_api_key">Meta API Key</Label>
                    <Input
                      id="meta_api_key"
                      type="password"
                      placeholder="EAAB..."
                      value={apiKeys.meta}
                      onChange={(e) => setApiKeys({ ...apiKeys, meta: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="baidu_api_key">Baidu API Key</Label>
                    <Input
                      id="baidu_api_key"
                      type="password"
                      placeholder="24.a..."
                      value={apiKeys.baidu}
                      onChange={(e) => setApiKeys({ ...apiKeys, baidu: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="microsoft_api_key">Microsoft API Key</Label>
                    <Input
                      id="microsoft_api_key"
                      type="password"
                      placeholder="ms-..."
                      value={apiKeys.microsoft}
                      onChange={(e) => setApiKeys({ ...apiKeys, microsoft: e.target.value })}
                    />
                  </div>
                  <Button onClick={handleSaveApiKeys} className="w-full">Salvar Chaves de API</Button>
                </div>
              </div>
            </div>
          )}

          {activeView === "settings-customize" && (
            <div className="flex w-full grow flex-col items-center justify-start gap-4 bg-background px-6 py-6 overflow-auto">
              <div className="w-full max-w-3xl p-4 border rounded-md bg-card">
                <h2 className="text-xl font-semibold mb-4">Customizar UI</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="ui_theme">Tema</Label>
                    <RadioGroup
                      id="ui_theme"
                      value={uiConfig.theme}
                      onValueChange={(val) => setUiConfig({ ...uiConfig, theme: val })}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="light" />
                        <Label htmlFor="light">Claro</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="dark" />
                        <Label htmlFor="dark">Escuro</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label htmlFor="primary_color">Cor Primária</Label>
                    <Input
                      id="primary_color"
                      type="color"
                      value={uiConfig.primary_color}
                      onChange={(e) => setUiConfig({ ...uiConfig, primary_color: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondary_color">Cor Secundária</Label>
                    <Input
                      id="secondary_color"
                      type="color"
                      value={uiConfig.secondary_color}
                      onChange={(e) => setUiConfig({ ...uiConfig, secondary_color: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="font_family">Família da Fonte</Label>
                    <Input
                      id="font_family"
                      value={uiConfig.font_family}
                      onChange={(e) => setUiConfig({ ...uiConfig, font_family: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="custom_css">CSS Personalizado</Label>
                    <Textarea
                      id="custom_css"
                      value={uiConfig.custom_css}
                      onChange={(e) => setUiConfig({ ...uiConfig, custom_css: e.target.value })}
                      rows={8}
                      className="font-mono"
                    />
                  </div>
                  <Button onClick={handleSaveConfig} className="w-full">Salvar Configurações de UI</Button>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex w-full flex-col items-center justify-center gap-3 px-4 py-4 border-t border-border bg-card">
            <span className="text-xs text-muted-foreground">
              A Plataforma de IA pode cometer erros. Verifique informações importantes.
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}