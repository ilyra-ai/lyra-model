import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST() {
  try {
    const filePath = path.join(process.cwd(), 'logs', 'train.log')
    await fs.writeFile(filePath, '')
    return NextResponse.json({ message: 'Logs limpos com sucesso.' })
  } catch (error) {
    console.error("Erro na API de limpeza de logs:", error);
    return NextResponse.json({ message: "Erro ao limpar logs.", error: (error as Error).message }, { status: 500 });
  }
}