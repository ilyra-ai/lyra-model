import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Simula um atraso para a limpeza de logs
    await new Promise(resolve => setTimeout(resolve, 500));

    const timestamp = new Date().toLocaleString();
    const message = `Logs limpos em ${timestamp}.`;

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Erro na API de limpeza de logs:", error);
    return NextResponse.json({ message: "Erro ao limpar logs.", error: (error as Error).message }, { status: 500 });
  }
}