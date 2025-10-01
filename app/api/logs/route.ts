import { NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

export async function GET() {
  try {
    const logsDir = path.join(process.cwd(), "logs")
    const logFile = path.join(logsDir, "requests.log")

    if (!existsSync(logFile)) {
      return NextResponse.json([])
    }

    const fileContent = await readFile(logFile, "utf-8")
    let logs = []
    
    try {
      logs = JSON.parse(fileContent)
    } catch {
      logs = []
    }

    // Ordena por timestamp mais recente primeiro
    logs.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    return NextResponse.json(logs)
  } catch (error) {
    console.error("Error reading logs:", error)
    return NextResponse.json({ error: "Failed to read logs" }, { status: 500 })
  }
}