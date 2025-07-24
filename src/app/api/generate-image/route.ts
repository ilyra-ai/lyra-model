import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()
    if (!prompt) {
      return NextResponse.json({ message: 'Prompt obrigatório.' }, { status: 400 })
    }
    const img = await openai.images.generate({
      model: 'dall-e-2',
      prompt,
      n: 1,
      size: '1024x1024'
    })
    const url = (img as any).data?.[0]?.url
    if (!url) {
      return NextResponse.json({ message: 'Nenhum resultado.' }, { status: 500 })
    }
    return NextResponse.json({ url })
  } catch (error) {
    console.error('Erro na geração de imagem', error)
    return NextResponse.json({ message: 'Erro na geração', error: (error as Error).message }, { status: 500 })
  }
}
