import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Aqui você faria a requisição HTTP para o seu serviço de limpeza de logs real.
    // Exemplo:
    // const mlBackendResponse = await fetch('https://seubackendml.com/clear-logs', {
    //   method: 'POST',
    // });
    //
    // if (!mlBackendResponse.ok) {
    //   const errorData = await mlBackendResponse.json();
    //   throw new Error(errorData.message || 'Erro ao limpar logs no serviço de ML.');
    // }
    //
    // const mlBackendData = await mlBackendResponse.json();
    // return NextResponse.json(mlBackendData); // Retorna a resposta real do seu backend de ML

    // Resposta padrão se nenhuma integração real for feita aqui.
    return NextResponse.json({ message: "Logs limpos com sucesso." });
  } catch (error) {
    console.error("Erro na API de limpeza de logs:", error);
    return NextResponse.json({ message: "Erro ao limpar logs.", error: (error as Error).message }, { status: 500 });
  }
}