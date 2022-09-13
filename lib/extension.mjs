import express from 'express';

const router = express.Router();

router.get('/goodic', async (req, res, next) => {
  const { query, format } = req.query;

  console.log({ query });
  const { search } = await import('./extension/goodic/core.mjs');
  return res.json(await search(query, format));
});

export { router };
