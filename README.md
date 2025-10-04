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

## Docker & MongoDB

Este projeto inclui uma configuração Docker Compose para executar MongoDB localmente para desenvolvimento.

### Serviços Incluídos

- **MongoDB 7.0**: Banco de dados principal
- **Mongo Express**: Interface web para administração do MongoDB

### Como usar

1. Iniciar os serviços:
   ```bash
   docker-compose up -d
   ```
2. Parar os serviços:
   ```bash
   docker-compose down
   ```
3. Parar os serviços e remover volumes (dados):
   ```bash
   docker-compose down -v
   ```

### Acessos

- **MongoDB**
  - Host: localhost
  - Porta: 27017
  - Username: admin
  - Password: password123
  - Database: logger_db
- **Mongo Express (Interface Web)**
  - URL: http://localhost:8081
  - Username: admin
  - Password: admin123

### String de Conexão

Para sua aplicação Next.js, use a seguinte string de conexão:
```bash
mongodb://admin:password123@localhost:27017/logger_db?authSource=admin
```

### Comandos Úteis

- Ver logs dos containers:
  ```bash
  docker-compose logs -f
  ```
- Entrar no container do MongoDB:
  ```bash
  docker exec -it logger-mongodb mongosh -u admin -p password123 --authenticationDatabase admin
  ```
- Backup do banco de dados:
  ```bash
  docker exec logger-mongodb mongodump --uri="mongodb://admin:password123@localhost:27017/logger_db?authSource=admin" --out=/data/backup
  ```

### Configuração de Produção

Para produção, lembre-se de:
1. Alterar as senhas padrão
2. Usar variáveis de ambiente seguras
3. Configurar volumes persistentes apropriados
4. Remover o Mongo Express se não for necessário
5. Configurar rede adequada
