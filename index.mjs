import express from 'express';
import cors from 'cors';
import { router as suggestRouter } from './lib/suggest.mjs';

const app = express();
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('requested');
  res.send('Hello World!');
});

router.get('/listary/goodic', async (req, res, next) => {
  const { query } = req.query;

  console.log({ query });
  try {
    const { search } = await import('./lib/goodic.mjs');
    res.json(await search(query));
  }
  catch (err) {
    next(err);
  }
});

app.use(cors());
app.use(router);
app.use('/suggest', suggestRouter);
app.listen(3000);
