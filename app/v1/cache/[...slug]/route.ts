import { type NextRequest, NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  try {
    const { slug } = await params
    const url = slug.join("/")

    // Captura todos os headers
    const headers: Record<string, string> = {}
    request.headers.forEach((value, key) => {
      headers[key] = value
    })

    // Captura o body
    let body = {}
    try {
      const text = await request.text()
      if (text) {
        // Tenta parsear como JSON, se falhar mantém como texto
        try {
          body = JSON.parse(text)
        } catch {
          body = { raw: text }
        }
      }
    } catch (error) {
      console.error("Error reading body:", error)
    }

    // Cria o objeto de log
    const logEntry = {
      timestamp: new Date().toISOString(),
      method: "DELETE",
      url: `/v1/cache/${url}`,
      headers,
      body,
      ip: request.ip || headers["x-forwarded-for"] || "unknown",
    }

    // Salva no arquivo de log
    const logsDir = path.join(process.cwd(), "logs")
    const logFile = path.join(logsDir, "requests.log")

    // Cria o diretório de logs se não existir
    if (!existsSync(logsDir)) {
      await mkdir(logsDir, { recursive: true })
    }

    // Lê o arquivo existente ou cria um array vazio
    let logs = []
    if (existsSync(logFile)) {
      const fileContent = await readFile(logFile, "utf-8")
      try {
        logs = JSON.parse(fileContent)
      } catch {
        logs = []
      }
    }

    // Adiciona o novo log
    logs.push(logEntry)

    // Salva de volta no arquivo
    await writeFile(logFile, JSON.stringify(logs, null, 2), "utf-8")

    console.log(`Request logged: DELETE /v1/cache/${url}`)

    return NextResponse.json(
      {
        success: true,
        message: "Request logged successfully",
        url: `/v1/cache/${url}`,
        timestamp: logEntry.timestamp,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
