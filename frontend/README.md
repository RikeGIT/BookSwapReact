# Bookswap Frontend

Frontend web app feito com React + TypeScript para o projeto Bookswap.

Este app consome a API Django (JWT), permite autenticar usuários e gerenciar livros (listar, criar, editar, deletar) com rotas protegidas.

## Tecnologias

- React 19 + TypeScript
- React Router DOM 7
- Axios
- Context API (AuthContext) para autenticação e sessão JWT
- CSS simples por página/componente

## Como executar

Pré-requisitos:

- Node.js 18+ e npm
- Backend Django rodando em <http://127.0.0.1:8000> com as rotas em `/api/v1/`

1. Instalar dependências:

```bash
npm install
```

1. Rodar em desenvolvimento:

```bash
npm start
```

Acesse <http://localhost:3000>

1. Build de produção:

```bash
npm run build
```

## Configuração da API

O Axios já está configurado em `src/lib/axios.ts` com:

```ts
baseURL: 'http://127.0.0.1:8000/api/v1'
```

Portanto, os endpoints usados no frontend são relativos, por exemplo:

- GET `/books/`
- POST `/books/`
- PUT `/books/:id/`
- DELETE `/books/:id/`

Certifique-se de que o backend expose estas rotas via DRF Router (ex.: `books`), e que o login JWT esteja funcional em `/token/`.

## Funcionalidades

- Login com JWT e persistência de sessão (localStorage)
- Rotas protegidas via `ProtectedRoute`
- Listagem de livros com `BookCard`
- Criar, editar e deletar livros
- Tratamento de erros de API com mensagens ao usuário

## Estrutura de pastas (resumo)

```text
src/
	components/
	contexts/
	hooks/
	lib/
	pages/
	types/
```

## Imagens / GIFs

Adicione aqui prints ou GIFs da aplicação em funcionamento para a apresentação.

