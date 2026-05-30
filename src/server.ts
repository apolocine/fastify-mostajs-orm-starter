/**
 * Fastify + @mostajs/orm — blog starter.
 * Boots with no native binary via the sqljs (SQLite WASM) dialect.
 * @author Dr Hamid MADANI <drmdh@msn.com>
 */
import Fastify from 'fastify';
import { getRepos } from './orm/repositories.js';
import { postDetailPage, postListPage } from './view.js';

const app = Fastify();

// --- HTML pages ---
app.get('/', async (_req, reply) => {
  const { posts } = await getRepos();
  const list = await posts.findWithRelations({ published: true }, ['author', 'comments'], { sort: { createdAt: -1 }, limit: 20 });
  reply.type('text/html').send(postListPage('Fastify', list as never));
});

app.get('/posts/:id', async (req, reply) => {
  const { posts } = await getRepos();
  const post = await posts.findByIdWithRelations((req.params as { id: string }).id, ['author', 'comments']);
  if (!post) { reply.code(404).type('text/html').send(postListPage('Fastify', [])); return; }
  reply.type('text/html').send(postDetailPage('Fastify', post as never));
});

// --- JSON API ---
app.get('/api/posts', async () => {
  const { posts } = await getRepos();
  return posts.findAll({ published: true }, { sort: { createdAt: -1 }, limit: 50 });
});

app.get('/api/posts/:id', async (req, reply) => {
  const { posts } = await getRepos();
  const post = await posts.findByIdWithRelations((req.params as { id: string }).id, ['author', 'comments']);
  if (!post) { reply.code(404); return { error: 'Not found' }; }
  return post;
});

app.post('/api/posts', async (req, reply) => {
  const { posts } = await getRepos();
  const b = req.body as { title: string; slug: string; content: string; authorId: string; published?: boolean };
  const created = await posts.create({ title: b.title, slug: b.slug, content: b.content, published: b.published ?? false, author: b.authorId });
  reply.code(201);
  return created;
});

const port = Number(process.env.PORT) || 3000;
app.listen({ port, host: '0.0.0.0' })
  .then(() => console.log(`▲ Fastify + @mostajs/orm — http://localhost:${port}`))
  .catch((err) => { console.error(err); process.exit(1); });
