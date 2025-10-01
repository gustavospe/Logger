'use client'

import { useState, useEffect } from 'react'
import LogViewer from '@/components/log-viewer'

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

export default function Home() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/logs')
      const data = await response.json()
      setLogs(data)
    } catch (error) {
      console.error('Error fetching logs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
    
    // Auto-refresh a cada 5 segundos
    const interval = setInterval(fetchLogs, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="container mx-auto p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">GoCache Logger</h1>
          <p className="text-muted-foreground">Proxy reverso com monitoramento em tempo real</p>
        </div>
        
        <div className="bg-card p-4 rounded-lg border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Logs em Tempo Real</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {logs.length} requisições registradas
              </span>
              <button
                onClick={fetchLogs}
                className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
              >
                Atualizar
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Carregando logs...
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma requisição registrada ainda.
            </div>
          ) : (
            <LogViewer logs={logs} />
          )}
        </div>
      </div>
    </main>
  )
}
