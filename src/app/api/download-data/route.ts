import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ message: 'URL é obrigatória para download.' }, { status: 400 });
    }

    // No ambiente de produção real, você enviaria esta URL para o seu backend de ML
    // para que ele faça o download dos dados.
    // Por exemplo, você pode usar uma biblioteca HTTP para fazer uma requisição POST
    // para o seu servidor de ML com a URL fornecida.

    console.log(`Simulando envio de URL para download no backend: ${url}`);

    // Simulação de sucesso. No mundo real, você esperaria uma resposta do seu backend de ML.
    return NextResponse.json({ message: `Solicitação de download para ${url} enviada com sucesso para o backend.` });

  } catch (error) {
    console.error('Erro ao processar solicitação de download:', error);
    return NextResponse.json({ message: 'Erro interno do servidor ao processar download.' }, { status: 500 });
  }
}