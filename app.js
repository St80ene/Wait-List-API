require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on ${port}`));
// const genreModule = require('./routes/genres');
// const home = require('./routes/home');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

// app.use(genreModule);
// app.use(home);

app.get('/', (req, res) => {
  res.status(200).json({status: 'OK', message: 'Welcome'});
})