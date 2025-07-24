import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simula um atraso para a busca de logs
    await new Promise(resolve => setTimeout(resolve, 1000));

    const timestamp = new Date().toLocaleString();
    const logs = `[${timestamp}] INFO: Sistema iniciado.\n` +
                 `[${timestamp}] DEBUG: Carregando configurações do modelo.\n` +
                 `[${timestamp}] INFO: Treinamento iniciado para o modelo X.\n` +
                 `[${timestamp}] WARNING: Baixa precisão na época 5.\n` +
                 `[${timestamp}] INFO: Treinamento concluído com sucesso.\n` +
                 `[${timestamp}] ERROR: Falha na conexão com o serviço de dados.\n` +
                 `[${timestamp}] INFO: Logs atualizados.`;

    return NextResponse.json({ logs });
  } catch (error) {
    console.error("Erro na API de logs:", error);
    return NextResponse.json({ message: "Erro ao carregar logs.", error: (error as Error).message }, { status: 500 });
  }
}