const express = require('express')
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const BASE_PATH = process.env.BASE_PATH || '';
const BASE_URL = `http://localhost:${PORT}/${BASE_PATH}`;

app.listen(PORT, async () => {
  try {
    console.log(`app base url: ${BASE_URL}`)
  } catch (err) {
    console.log(err)
  }
})

app.use(cors);
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

//add route

app.use((req, res) => {
    res.status(404).send({ error: 'Not Found' });
});