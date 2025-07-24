import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  const formData = await request.formData()
  const files = formData.getAll('files') as File[]
  if (files.length === 0) {
    return NextResponse.json({ message: 'Nenhum arquivo enviado.' }, { status: 400 })
  }
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  await fs.mkdir(uploadDir, { recursive: true })
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    await fs.writeFile(path.join(uploadDir, file.name), buffer)
  }
  return NextResponse.json({ message: 'Arquivos enviados com sucesso.' })
}
