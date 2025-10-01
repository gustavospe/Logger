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

    // Captura o body e extrai URLs
    let body = {}
    let extractedUrls: string[] = []
    
    try {
      const text = await request.text()
      if (text) {
        // Tenta parsear como JSON, se falhar mantém como texto
        try {
          body = JSON.parse(text)
        } catch {
          body = { raw: text }
          // Se é form-data, tenta extrair URLs do formato urls[n]=...
          const urlMatches = text.match(/urls\[[^\]]+\]=([^&]+)/g)
          if (urlMatches) {
            extractedUrls = urlMatches.map(match => {
              const urlPart = match.split('=')[1]
              return decodeURIComponent(urlPart)
            })
          }
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
      ip: headers["x-forwarded-for"] || headers["x-real-ip"] || "unknown",
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

    // Responde no padrão especificado
    const responseHeaders = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://painel.gocache.com.br',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'X-Gocache-Cachestatus': 'BYPASS',
      'Server': 'gocache',
      'Server-Timing': 'x-gocache-cache-status;desc="BYPASS",x-variant;desc="a",x-id;desc="7751f0fc943c80c361c8c4deb74bffed"',
    }

    return NextResponse.json(
      {
        response: {
          urls_accepted: extractedUrls.length > 0 ? extractedUrls : [`https://${url}`]
        }
      },
      { 
        status: 202,
        headers: responseHeaders
      },
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
