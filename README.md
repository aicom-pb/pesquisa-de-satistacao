# Formulario de Pesquisa - Pimenta Bueno

Formulario online para coleta de opinioes da populacao sobre servicos publicos da Prefeitura de Pimenta Bueno.

## Funcionalidades

- Formulario responsivo com validacoes obrigatorias
- Envio de respostas para Supabase via API serverless na Vercel
- Bloqueio de envio duplicado no mesmo dispositivo (client_id)
- Modal de sucesso apos envio
- Botao para ver dados consolidados em graficos (sem expor respostas individuais)
- Compartilhamento no WhatsApp do link publico de graficos
- Painel admin com tabela completa, graficos de pizza e exportacao PDF
- Exportacao PDF com respostas e opcao com graficos

## Estrutura do projeto

```text
/
|-- index.html                     # Formulario publico
|-- graficos.html                  # Painel publico (somente graficos)
|-- admin.html                     # Painel administrativo
|-- api/
|   `-- submit.js                  # API de envio (Vercel Function)
|-- SETUP_SUPABASE_VERCEL.txt      # Guia completo de replicacao
|-- package.json
|-- vercel.json
`-- .gitignore
```

## Configuracao rapida

1. Crie o projeto no Supabase.
2. Execute os SQLs do arquivo `SETUP_SUPABASE_VERCEL.txt`.
3. Configure na Vercel as variaveis:

```env
SUPABASE_URL=https://SEU_PROJECT_ID.supabase.co
SUPABASE_ANON_KEY=SUA_ANON_PUBLIC_KEY
```

4. No `admin.html` e no `graficos.html`, atualize:

```js
const SUPABASE_URL = 'https://SEU_PROJECT_ID.supabase.co';
const SUPABASE_KEY = 'SUA_ANON_PUBLIC_KEY';
```

## Paginas

- `/` -> formulario
- `/graficos.html` -> visao publica com dados consolidados em graficos
- `/admin.html` -> painel completo para administracao

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Observacoes

- O aviso de `favicon.ico 404` no navegador nao impacta o funcionamento.
- O bloqueio de envio duplicado e por navegador/dispositivo.
- Para duplicar este projeto em outra conta, use `SETUP_SUPABASE_VERCEL.txt`.
