const express = require('express');
const cors = require('cors');

const app = express();

app.get('/', cors(), (req, res) => {
  console.log('requested');
  res.send('Hello World!');
});

app.listen(3000);
