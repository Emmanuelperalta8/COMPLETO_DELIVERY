# Coffee Delivery

Projeto fullstack para gerenciamento e pedido de cafés, desenvolvido com **NestJS** (backend) e **React/Vite** (frontend).

---

## ✨ Funcionalidades

- Listagem de cafés cadastrados no banco de dados (via API)
- Visualização de detalhes de um café individual
- Adicionar café ao carrinho e finalizar pedido (dados enviados ao backend)
- Integração completa front → back → banco de dados

---

## 🗂 Estrutura do projeto

```
/
├── backend       # Código do servidor NestJS (API e banco)
└── frontend      # Código do cliente React/Vite (interface)
```

---

## ⚙️ Pré-requisitos

- Node.js >= 18.x
- npm >= 9.x
- Banco de dados (PostgreSQL recomendado, pode usar SQLite para testes)
- (Opcional) Docker, caso queira rodar banco de dados facilmente

---

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

---

### 2. Configurando e rodando o Backend

#### a) Instale as dependências

```bash
cd backend
npm install
```

#### b) Configure o banco de dados

- Renomeie (se necessário) o arquivo `.env.example` para `.env`
- Edite a variável `DATABASE_URL` conforme seu banco (exemplo para PostgreSQL):

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/coffeedb"
```

- Se estiver usando SQLite para testes, pode ficar assim:

```
DATABASE_URL="file:./dev.db"
```

#### c) Rode as migrations (criação das tabelas)

```bash
npx prisma migrate dev
```

#### d) (Opcional) Popule o banco de dados com cafés iniciais

```bash
npx prisma db seed
```

#### e) Inicie o servidor NestJS

```bash
npm run start:dev
```

- O backend estará rodando em: [http://localhost:3000](http://localhost:3000)
- Teste a rota: [http://localhost:3000/coffees](http://localhost:3000/coffees)

---

### 3. Configurando e rodando o Frontend

#### a) Instale as dependências

```bash
cd ../frontend
npm install
```

#### b) Configure o endpoint da API

- No arquivo de serviços/API (por exemplo, `src/services/api.ts`), garanta que a URL base está assim:

```js
baseURL: "http://localhost:3000"
```

- Se precisar, ajuste no `.env` do frontend.

#### c) Inicie o servidor React/Vite

```bash
npm run dev
```

- O frontend estará rodando em: [http://localhost:5173](http://localhost:5173)

---

## 📝 Observações importantes

- Sempre rode **primeiro o backend** antes do frontend, para garantir que a API estará disponível.
- O frontend depende do backend para buscar todos os dados.
- Para adicionar/excluir/editar cafés, utilize as rotas da API (pode usar [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/)).
- Não deixe dados mockados no frontend: tudo deve vir da API.

---

## 💡 Dicas

- Caso dê erro de conexão com banco, confira a string de conexão e se o serviço está rodando.
- Se alterar o banco, sempre rode as migrations novamente.
- Se mudar o endereço/porta do backend, lembre-se de atualizar a baseURL no frontend.

---

## 🛠 Principais comandos

| Comando                | Local      | O que faz                                  |
|------------------------|------------|---------------------------------------------|
| npm install            | ambos      | Instala as dependências                     |
| npm run start:dev      | backend    | Sobe o servidor NestJS                      |
| npx prisma migrate dev | backend    | Executa as migrations no banco              |
| npm run dev            | frontend   | Inicia o servidor React/Vite (interface)    |

---

## 📚 Tecnologias

- **Backend:** Node.js, NestJS, Prisma ORM, PostgreSQL/SQLite
- **Frontend:** React, Vite, Styled-components, Axios

---

## 🧑‍💻 Autoria

Desenvolvido por [Seu Nome](https://github.com/seu-usuario)

---
