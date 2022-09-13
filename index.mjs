import express from 'express';
import cors from 'cors';
import { router as extensionRouter } from './lib/extension.mjs';
import { router as suggestRouter } from './lib/suggest.mjs';

const app = express();
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('requested');
  res.send('Hello World!');
});

app.use(router);
app.use('/extension', extensionRouter);
app.use('/suggest', suggestRouter);
app.listen(3000);
