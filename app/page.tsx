export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-6">
        <h1 className="text-4xl font-bold text-center">Cache API Logger</h1>
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">API Endpoint</h2>
          <code className="block bg-muted p-4 rounded text-sm overflow-x-auto">
            DELETE http://localhost:3333/v1/cache/&#123;url&#125;
          </code>
          <p className="mt-4 text-muted-foreground">
            Esta API registra todas as requisições DELETE recebidas em um arquivo de log localizado em{" "}
            <code className="bg-muted px-2 py-1 rounded">logs/requests.log</code>
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Exemplo de uso</h2>
          <code className="block bg-muted p-4 rounded text-sm overflow-x-auto whitespace-pre">
            {`curl --request DELETE \\
  --url http://localhost:3333/v1/cache/guiafacil.com \\
  --header 'Content-Type: application/x-www-form-urlencoded' \\
  --header 'Cookie: __goc_session__=...' \\
  --header 'GoCache-Token: 78346427834678274328' \\
  --data 'urls[1]=https://guiafacil.com/site/...'`}
          </code>
        </div>
      </div>
    </main>
  )
}
