import { type NextRequest, NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

const GOCACHE_API_BASE = "https://api.gocache.com.br"
async function proxyRequest(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  try {
    const { slug } = await params
    const domain = slug.join("/")

    const originalHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => {
      originalHeaders[key] = value
    })

    const bodyText = await request.text()
    const gocacheHeaders: Record<string, string> = {
      'Content-Type': originalHeaders['content-type'] || 'application/x-www-form-urlencoded',
    }

    if (originalHeaders['cookie']) {
      gocacheHeaders['Cookie'] = originalHeaders['cookie']
    }
    if (originalHeaders['gocache-token']) {
      gocacheHeaders['GoCache-Token'] = originalHeaders['gocache-token']
    }
    const gocacheUrl = `${GOCACHE_API_BASE}/v1/cache/${domain}`

    const gocacheResponse = await fetch(gocacheUrl, {
      method: request.method,
      headers: gocacheHeaders,
      body: bodyText || undefined,
    })
    const responseText = await gocacheResponse.text()
    let responseData
    try {
      responseData = JSON.parse(responseText)
    } catch {
      responseData = { raw: responseText }
    }

    const responseHeaders: Record<string, string> = {}
    gocacheResponse.headers.forEach((value, key) => {
      responseHeaders[key] = value
    })
    const logEntry = {
      timestamp: new Date().toISOString(),
      request: {
        method: request.method,
        url: `/v1/cache/${domain}`,
        headers: originalHeaders,
        body: bodyText ? { raw: bodyText } : {},
        ip: originalHeaders["x-forwarded-for"] || originalHeaders["x-real-ip"] || "unknown",
      },
      response: {
        status: gocacheResponse.status,
        statusText: gocacheResponse.statusText,
        headers: responseHeaders,
        body: responseData,
      },
      gocacheUrl,
    }

    const logsDir = path.join(process.cwd(), "logs")
    const logFile = path.join(logsDir, "requests.log")

    if (!existsSync(logsDir)) {
      await mkdir(logsDir, { recursive: true })
    }
    let logs = []
    if (existsSync(logFile)) {
      const fileContent = await readFile(logFile, "utf-8")
      try {
        logs = JSON.parse(fileContent)
      } catch {
        logs = []
      }
    }

    logs.push(logEntry)
    await writeFile(logFile, JSON.stringify(logs, null, 2), "utf-8")

    console.log(`Proxy request: ${request.method} ${gocacheUrl} - Status: ${gocacheResponse.status}`)
    return new NextResponse(responseText, {
      status: gocacheResponse.status,
      statusText: gocacheResponse.statusText,
      headers: responseHeaders,
    })
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

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  return proxyRequest(request, { params })
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  return proxyRequest(request, { params })
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  return proxyRequest(request, { params })
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  return proxyRequest(request, { params })
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  return proxyRequest(request, { params })
}
