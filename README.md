# GoCache Logger - Proxy Reverso

Uma aplicação Next.js que funciona como proxy reverso para a API da GoCache, interceptando e registrando todas as requisições e respostas em tempo real.

## 🔄 Como funciona

Este projeto atua como um **proxy reverso transparente** entre o cliente e a API da GoCache:

1. **Intercepta** requisições enviadas para `localhost:3333/v1/cache/*`
2. **Repassa** automaticamente para `https://api.gocache.com.br/v1/cache/*`
3. **Captura** tanto a requisição original quanto a resposta da GoCache
4. **Salva** todos os dados no data logger (`logs/requests.log`)
5. **Retorna** exatamente a resposta original da GoCache

## ✨ Funcionalidades

- **Proxy reverso completo** para todos os métodos HTTP (GET, POST, PUT, DELETE, PATCH)
- **Captura transparente** de requisições e respostas
- **Preservação total** de headers, status codes e corpo das mensagens
- **Data logger estruturado** em formato JSON
- **Compatibilidade total** com a API original da GoCache

## 📁 Estrutura do Projeto

```
cache-api/
├── app/
│   └── v1/cache/[...slug]/
│       └── route.ts          # Proxy reverso principal
├── logs/
│   └── requests.log          # Arquivo de logs das requisições
└── components/               # Componentes de UI (futuro dashboard)
```

## 🚀 Exemplo de uso

Substitua a URL da GoCache pelo seu proxy local:

```bash
# Antes (API original)
curl --request DELETE \
  --url https://api.gocache.com.br/v1/cache/guiafacil.com \
  --header 'GoCache-Token: seu-token' \
  --data 'urls[1]=https://example.com/page'

# Agora (através do proxy)
curl --request DELETE \
  --url http://localhost:3333/v1/cache/guiafacil.com \
  --header 'GoCache-Token: seu-token' \
  --data 'urls[1]=https://example.com/page'
```

## 📊 Estrutura do Log

Cada requisição gera um log estruturado:

```json
{
  "timestamp": "2025-10-01T18:04:36.016Z",
  "request": {
    "method": "DELETE",
    "url": "/v1/cache/guiafacil.com",
    "headers": { "gocache-token": "...", "cookie": "..." },
    "body": { "raw": "urls[1]=..." },
    "ip": "::ffff:127.0.0.1"
  },
  "response": {
    "status": 202,
    "statusText": "Accepted",
    "headers": { "server": "gocache", "content-type": "application/json" },
    "body": { "response": { "urls_accepted": ["..."] } }
  },
  "gocacheUrl": "https://api.gocache.com.br/v1/cache/guiafacil.com"
}
```

## 🛠️ Instalação e Uso

### 1. Clone e instale
```bash
git clone https://github.com/gustavospe/GoCache-logger.git
cd cache-api
pnpm install
```

### 2. Inicie o servidor
```bash
pnpm dev
```

### 3. Configure suas aplicações
Altere a URL base da API GoCache em suas aplicações:
- **De:** `https://api.gocache.com.br`  
- **Para:** `http://localhost:3333`

### 4. Monitore os logs
Os logs são salvos automaticamente em `logs/requests.log`

## ⚙️ Configuração

### Variáveis de ambiente
Crie um arquivo `.env.local` (opcional):
```env
GOCACHE_API_BASE=https://api.gocache.com.br
LOG_LEVEL=info
```

### Portas
- **Desenvolvimento:** `http://localhost:3333`
- **Produção:** Configurável via `PORT`

## 📋 Scripts disponíveis

```bash
pnpm dev      # Servidor de desenvolvimento (porta 3333)
pnpm build    # Build de produção
pnpm start    # Servidor de produção
pnpm lint     # Verificação de código
```

## 🔧 Requisitos

- **Node.js:** >= 18.0.0
- **PNPM:** >= 8.0.0
- **Conectividade:** Acesso à internet para proxy

## 📈 Monitoramento

- **Logs:** `logs/requests.log`
- **Console:** Logs em tempo real no terminal
- **Status:** Codes HTTP originais preservados

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Add nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.
