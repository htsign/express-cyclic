import express from 'express';

const router = express.Router();

router.get('/booklive', async (req, res, next) => {
  const { query } = req.query;

  console.log({ query });
  const { search } = await import('./suggest/booklive.mjs');
  return res.json(await search(query));
});

router.get('/niconico', async (req, res, next) => {
  const { query } = req.query;

  console.log({ query });
  const { search } = await import('./suggest/niconico.mjs');
  return res.json(await search(query));
});

export { router };
