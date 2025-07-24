import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ message: 'URL é obrigatória para download.' }, { status: 400 });
    }

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Falha no download: ${res.status}`)
  }
  const buffer = Buffer.from(await res.arrayBuffer())
  const fileName = path.basename(new URL(url).pathname)
  const dir = path.join(process.cwd(), 'public', 'downloads')
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(path.join(dir, fileName), buffer)
  return NextResponse.json({ message: `Arquivo salvo em ${fileName}` })

  } catch (error) {
    console.error('Erro ao processar solicitação de download:', error);
    return NextResponse.json({ message: 'Erro interno do servidor ao processar download.' }, { status: 500 });
  }
}