import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'logs', 'train.log')
    const data = await fs.readFile(filePath, 'utf-8')
    return NextResponse.json({ logs: data })
  } catch (error) {
    console.error("Erro na API de logs:", error);
    return NextResponse.json({ message: "Erro ao carregar logs.", error: (error as Error).message }, { status: 500 });
  }
}