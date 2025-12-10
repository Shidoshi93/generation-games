# 🎮 Generation Games API

API RESTful desenvolvida com NestJS para gerenciamento de jogos e categorias. Este projeto faz parte do bootcamp da Generation Brasil.

## 📋 Sobre o Projeto

A Generation Games API é uma aplicação backend que permite o cadastro, consulta, atualização e exclusão de jogos e suas respectivas categorias. A API oferece endpoints completos para gerenciar um catálogo de jogos digitais com informações como título, preço, desenvolvedor, data de lançamento e avaliações.

## 🚀 Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[TypeORM](https://typeorm.io/)** - ORM para TypeScript e JavaScript
- **[MySQL](https://www.mysql.com/)** - Sistema de gerenciamento de banco de dados
- **[Class Validator](https://github.com/typestack/class-validator)** - Validação de dados baseada em decoradores
- **[Class Transformer](https://github.com/typestack/class-transformer)** - Transformação de objetos
- **[Chalk](https://github.com/chalk/chalk)** - Estilização de terminal
- **[ESLint](https://eslint.org/)** - Linter para JavaScript/TypeScript
- **[Prettier](https://prettier.io/)** - Formatador de código

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (v16 ou superior)
- [MySQL](https://www.mysql.com/) (v8 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## 🔧 Instalação e Configuração

1. **Clone o repositório:**
```bash
git clone https://github.com/Shidoshi93/generation-games.git
cd generation-games
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=generation_games
```

4. **Execute o projeto:**

O comando abaixo criará automaticamente o banco de dados e iniciará a aplicação:

```bash
# Modo desenvolvimento
npm run start:dev

# Modo produção
npm run start:prod

# Modo debug
npm run start:debug
```

A aplicação estará rodando em `http://localhost:3000`

## 📚 Endpoints da API

### 🏷️ Categorias

#### Listar todas as categorias
```http
GET /category
```

#### Buscar categoria por ID
```http
GET /category/:id
```

#### Buscar categoria por nome
```http
GET /category/name/:name
```

#### Criar nova categoria
```http
POST /category
Content-Type: application/json

{
  "name": "RPG",
  "description": "Jogos de interpretação de personagens"
}
```

#### Atualizar categoria
```http
PUT /category
Content-Type: application/json

{
  "id": 1,
  "name": "RPG",
  "description": "Jogos de RPG e aventura"
}
```

#### Deletar categoria
```http
DELETE /category/:id
```

---

### 🎮 Jogos

#### Listar todos os jogos
```http
GET /game
```

#### Buscar jogo por ID
```http
GET /game/:id
```

#### Buscar jogos por nome da categoria
```http
GET /game/category/:categoryName
```

#### Buscar jogos por ID da categoria
```http
GET /game/category/id/:categoryId
```

#### Criar novo jogo
```http
POST /game
Content-Type: application/json

{
  "title": "The Witcher 3",
  "description": "RPG de ação em mundo aberto",
  "price": 149.90,
  "developer": "CD Projekt Red",
  "releaseDate": "2015-05-19",
  "rating": 9.5,
  "category": {
    "id": 1
  }
}
```

#### Atualizar jogo
```http
PUT /game/:id
Content-Type: application/json

{
  "id": 1,
  "title": "The Witcher 3: Wild Hunt",
  "description": "RPG de ação em mundo aberto - Complete Edition",
  "price": 99.90,
  "developer": "CD Projekt Red",
  "releaseDate": "2015-05-19",
  "rating": 9.8,
  "category": {
    "id": 1
  }
}
```

#### Deletar jogo
```http
DELETE /game/:id
```

## 📊 Estrutura do Banco de Dados

### Tabela: category
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT (PK) | Identificador único |
| name | VARCHAR(100) | Nome da categoria |
| description | VARCHAR(1000) | Descrição da categoria |
| createdAt | TIMESTAMP | Data de criação |
| updatedAt | TIMESTAMP | Data de atualização |

### Tabela: game
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT (PK) | Identificador único |
| title | VARCHAR(100) | Título do jogo |
| description | VARCHAR(1000) | Descrição do jogo |
| price | DECIMAL(10,2) | Preço do jogo |
| developer | VARCHAR(100) | Desenvolvedora |
| releaseDate | TIMESTAMP | Data de lançamento |
| rating | FLOAT | Avaliação (0-10) |
| createdAt | TIMESTAMP | Data de criação |
| updatedAt | TIMESTAMP | Data de atualização |
| categoryId | INT (FK) | Referência para categoria |

## 📁 Estrutura do Projeto

```
generation-games/
├── scripts/
│   └── create-db.js          # Script para criação do banco de dados
├── src/
│   ├── category/
│   │   ├── controller/
│   │   │   └── category.controller.ts
│   │   ├── entities/
│   │   │   └── category.entity.ts
│   │   ├── service/
│   │   │   └── category.service.ts
│   │   └── category.module.ts
│   ├── game/
│   │   ├── controller/
│   │   │   └── game.controller.ts
│   │   ├── entities/
│   │   │   └── game.entity.ts
│   │   ├── sevice/
│   │   │   └── game.service.ts
│   │   └── game.module.ts
│   ├── app.module.ts
│   └── main.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## 👨‍💻 Autor

⌨️ com ❤️ por [Shidoshi93](https://github.com/Shidoshi93)
Desenvolvido durante o bootcamp da [Generation Brasil](https://brazil.generation.org/).
