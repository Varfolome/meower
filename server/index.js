const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
  res.json({
    message: 'Meower! :)'
  });
});

app.post('/mews', (req,res) => {
  console.log(req.body);
});

app.listen(5000, () => {
  console.log('Listening');
});
