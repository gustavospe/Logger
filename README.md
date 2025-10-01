# Cache API Logger

Este projeto é uma aplicação Next.js para registrar e visualizar logs de requisições feitas à API do GoCache.

## Como funciona
Basicamente, a aplicação recebe uma requisição, captura os dados recebidos e salva essas informações em um data logger para consulta posterior. Isso permite acompanhar e analisar todas as requisições feitas à API de forma centralizada e prática.

## Funcionalidades

## Estrutura do Projeto
- `app/` - Páginas e layouts da aplicação
- `components/` - Componentes reutilizáveis de UI
- `hooks/` - Hooks customizados
- `lib/` - Funções utilitárias
- `logs/` - Armazenamento de logs de requisições
- `public/` - Arquivos estáticos
- `styles/` - Estilos globais

## Como rodar o projeto
1. Instale as dependências:
   ```bash
   pnpm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```
3. Acesse `http://localhost:3333` no navegador.

## Requisitos
- Node.js >= 18
- PNPM

## Scripts úteis
- `pnpm dev` - Inicia o servidor de desenvolvimento
- `pnpm build` - Gera a build de produção
- `pnpm start` - Inicia o servidor em produção

## Licença
MIT
