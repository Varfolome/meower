const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();

const uri = "mongodb+srv://tsimafei:dataformeower123@cluster0.cqiwv.mongodb.net/startdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


app.use(cors());
app.use(express.json());

client.connect(err => {

  const mews = client.db('meower').collection('mews');

  app.get('/', (req,res) => {
    res.json({
      message: 'Meower! :)'
    });
  });

  app.get('/mews', (req,res) => {
    res.json(mews);
  });


  function isValidMew(mew){
    return mew.name && mew.name.toString().trim() !== '' &&
      mew.content && mew.content.toString().trim() !== '';
  }

  app.post('/mews', (req,res) => {
    if(isValidMew(req.body)) {
      const mew = {
        name: req.body.name.toString(),
        content: req.body.content.toString(),
        created: new Date()
      };

        mews
          .insertOne(mew)
          .then(createdMew => {
            res.json(createdMew);
          });

      console.log(mew);
    } else {
      res.status(422);
      res.json({
        message: 'Hey! Its empty!'
      });
    }
  });

  app.listen(5000, () => {
    console.log('Listening');
  });

//client.close();

});
