'use client'

import { useState } from 'react'

interface LogEntry {
  timestamp: string
  request: {
    method: string
    url: string
    headers: Record<string, string>
    body: any
    ip: string
  }
  response: {
    status: number
    statusText: string
    headers: Record<string, string>
    body: any
  }
  gocacheUrl: string
}

interface LogViewerProps {
  logs: LogEntry[]
}

export default function LogViewer({ logs }: LogViewerProps) {
  const [expandedLog, setExpandedLog] = useState<number | null>(null)

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR')
  }

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600'
    if (status >= 300 && status < 400) return 'text-yellow-600'
    if (status >= 400) return 'text-red-600'
    return 'text-gray-600'
  }

  const formatJson = (obj: any) => {
    return JSON.stringify(obj, null, 2)
  }

  const decodeUrl = (raw: string) => {
    try {
      return decodeURIComponent(raw)
    } catch {
      return raw
    }
  }

  return (
    <div className="space-y-4">
      {logs.map((log, index) => (
        <div key={index} className="border rounded-lg overflow-hidden">
          {/* Header do Log */}
          <div 
            className="p-4 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setExpandedLog(expandedLog === index ? null : index)}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    {log.request.method}
                  </span>
                  <span className="font-mono text-sm">{log.request.url}</span>
                  <span className={`font-mono text-sm font-semibold ${getStatusColor(log.response.status)}`}>
                    {log.response.status} {log.response.statusText}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatTimestamp(log.timestamp)} • IP: {log.request.ip}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {expandedLog === index ? '▼' : '▶'}
              </div>
            </div>
          </div>

          {/* Detalhes Expandidos */}
          {expandedLog === index && (
            <div className="p-4 space-y-4 bg-card">
              {/* Requisição */}
              <div>
                <h4 className="font-semibold mb-2 text-blue-600">📤 Requisição</h4>
                <div className="space-y-2">
                  <div>
                    <strong>URL GoCache:</strong>
                    <code className="ml-2 text-sm bg-muted px-2 py-1 rounded">{log.gocacheUrl}</code>
                  </div>
                  
                  {/* Headers da Requisição */}
                  <div>
                    <strong>Headers:</strong>
                    <pre className="mt-1 p-3 bg-muted rounded text-sm overflow-x-auto">
                      {formatJson(log.request.headers)}
                    </pre>
                  </div>
                  
                  {/* Body da Requisição */}
                  {log.request.body && Object.keys(log.request.body).length > 0 && (
                    <div>
                      <strong>Body:</strong>
                      {log.request.body.raw ? (
                        <div className="mt-1 space-y-2">
                          <div className="p-3 bg-muted rounded">
                            <div className="text-xs text-muted-foreground mb-2">Raw:</div>
                            <code className="text-sm">{log.request.body.raw}</code>
                          </div>
                          <div className="p-3 bg-muted rounded">
                            <div className="text-xs text-muted-foreground mb-2">Decoded:</div>
                            <code className="text-sm">{decodeUrl(log.request.body.raw)}</code>
                          </div>
                        </div>
                      ) : (
                        <pre className="mt-1 p-3 bg-muted rounded text-sm overflow-x-auto">
                          {formatJson(log.request.body)}
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Resposta */}
              <div>
                <h4 className="font-semibold mb-2 text-green-600">📥 Resposta</h4>
                <div className="space-y-2">
                  {/* Headers da Resposta */}
                  <div>
                    <strong>Headers:</strong>
                    <pre className="mt-1 p-3 bg-muted rounded text-sm overflow-x-auto">
                      {formatJson(log.response.headers)}
                    </pre>
                  </div>
                  
                  {/* Body da Resposta */}
                  <div>
                    <strong>Body:</strong>
                    <pre className="mt-1 p-3 bg-muted rounded text-sm overflow-x-auto">
                      {formatJson(log.response.body)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}