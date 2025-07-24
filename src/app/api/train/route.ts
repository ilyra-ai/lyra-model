import { NextResponse } from 'next/server'
import { spawn } from 'child_process'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const { modelConfig, trainingConfig, datasetUrl, fineTuneBase } = await request.json();

    const dataDir = path.join(process.cwd(), 'data')
    await fs.mkdir(dataDir, { recursive: true })
    const fileName = path.basename(new URL(datasetUrl).pathname)
    const datasetPath = path.join(dataDir, fileName)
    const res = await fetch(datasetUrl)
    if (!res.ok) throw new Error(`Falha ao baixar dataset: ${res.status}`)
    await fs.writeFile(datasetPath, Buffer.from(await res.arrayBuffer()))

    const args = [
      'scripts/train_model.py',
      '--dataset', datasetPath,
      '--epochs', String(trainingConfig.epochs),
      '--batch-size', String(trainingConfig.batch_size)
    ]
    if (fineTuneBase) {
      args.push('--base-model', fineTuneBase)
    }

    const logDir = path.join(process.cwd(), 'logs')
    await fs.mkdir(logDir, { recursive: true })
    const logFile = path.join(logDir, 'train.log')

    const proc = spawn('python3', args)
    const writeStream = await fs.open(logFile, 'a')
    proc.stdout.on('data', async chunk => {
      await writeStream.appendFile(chunk)
    })
    proc.stderr.on('data', async chunk => {
      await writeStream.appendFile(chunk)
    })

    proc.on('close', () => {
      writeStream.close()
    })

    return NextResponse.json({ message: 'Treinamento iniciado', metricsPlotUrl: null })
  } catch (error) {
    console.error("Erro na API de treinamento:", error);
    return NextResponse.json({ message: "Erro ao iniciar treinamento.", error: (error as Error).message }, { status: 500 });
  }
}