"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function FmanusPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleProcess = async () => {
    setIsLoading(true);
    setOutputText("Processando...");
    toast.info("Processando seu texto...");

    // Simulação de uma chamada de API para o backend Python
    // No mundo real, você faria uma requisição fetch/axios para seu servidor Python aqui.
    // Exemplo: const response = await fetch('/api/process-fmanus', { method: 'POST', body: JSON.stringify({ text: inputText }) });
    // const data = await response.json();
    // setOutputText(data.processedText);

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula um atraso de 2 segundos

    const processedResult = `Texto processado: ${inputText.toUpperCase()}`; // Exemplo de processamento
    setOutputText(processedResult);
    toast.success("Processamento concluído!");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full max-w-2xl flex flex-col gap-6 p-6 border rounded-lg shadow-lg bg-card">
        <h1 className="text-3xl font-bold text-center text-primary">
          Aplicativo fmanus
        </h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="inputText" className="text-lg font-medium text-foreground">
            Entrada:
          </label>
          <Textarea
            id="inputText"
            placeholder="Digite seu texto aqui..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={6}
            className="min-h-[120px] resize-y border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
          />
        </div>

        <Button
          onClick={handleProcess}
          disabled={isLoading || !inputText.trim()}
          className="w-full py-3 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isLoading ? "Processando..." : "Processar Texto"}
        </Button>

        <div className="flex flex-col gap-2">
          <label htmlFor="outputText" className="text-lg font-medium text-foreground">
            Saída:
          </label>
          <Textarea
            id="outputText"
            value={outputText}
            readOnly
            rows={6}
            className="min-h-[120px] resize-y border-input bg-muted text-muted-foreground"
          />
        </div>
      </main>
    </div>
  );
}