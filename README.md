# Fastify + @mostajs/orm Starter — Blog

> Fastify blog API (Users · Posts · Comments) on **[@mostajs/orm](https://www.npmjs.com/package/@mostajs/orm)** — one API, 13 databases, zero codegen. **Boots in the browser / Bolt.new / Cloudflare Workers with no native binary** (sqljs SQLite WASM).

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Open in Bolt.new](https://img.shields.io/badge/Open_in-Bolt.new-000?style=for-the-badge&logo=stackblitz)](https://bolt.new/github.com/apolocine/fastify-mostajs-orm-starter)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/apolocine/fastify-mostajs-orm-starter)

## Quick start

```bash
git clone https://github.com/apolocine/fastify-mostajs-orm-starter.git
cd fastify-mostajs-orm-starter
npm install
npm run dev      # http://localhost:3000
```

No database to install — the default `sqljs` dialect runs SQLite in WebAssembly, **in-memory**, and seeds demo data on boot (3 users / 5 posts / 12 comments).

## Routes

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | HTML page — list of published posts (author + comment count) |
| `GET` | `/posts/:id` | HTML page — a post with its comments |
| `GET` | `/api/posts` | JSON — published posts |
| `GET` | `/api/posts/:id` | JSON — a post with `author` + `comments` populated |
| `POST` | `/api/posts` | JSON — create a post (`{ title, slug, content, authorId, published? }`) |

## Stack

- **Fastify 5** · **TypeScript** run with **tsx** (no build step)
- **@mostajs/orm 2.5.x** — `sqljs` (SQLite WASM) by default
- **Plain CSS** server-rendered pages (no framework, no native dep)

## Switch database (one env, no code change)

```bash
DB_DIALECT=sqlite DATABASE_URL=./blog.db npm run dev    # local Node (npm i better-sqlite3)
DB_DIALECT=pglite DATABASE_URL=idb://blog npm run dev   # Postgres WASM (npm i @electric-sql/pglite)
```

## License

MIT — © Dr Hamid MADANI. The underlying [@mostajs/orm](https://github.com/apolocine/mosta-orm) is AGPL-3.0 (commercial license: drmdh@msn.com).
