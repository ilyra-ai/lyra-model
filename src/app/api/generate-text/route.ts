import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(request: Request) {
  try {
    const { prompt, model } = await request.json()
    if (!prompt) {
      return NextResponse.json({ message: 'Prompt obrigatório.' }, { status: 400 })
    }
    const completion = await openai.chat.completions.create({
      model: model || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    })
    const text = completion.choices[0]?.message?.content ?? ''
    return NextResponse.json({ text })
  } catch (error) {
    console.error('Erro na geração de texto', error)
    return NextResponse.json({ message: 'Erro na geração', error: (error as Error).message }, { status: 500 })
  }
}
