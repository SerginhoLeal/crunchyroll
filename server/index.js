require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

const app = express();

app.use(express.static('public'));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use(cors());

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

requireDir('./src/upload/models');
requireDir('./src/users/models');

app.use('/', require('./src/routes'));

app.listen(process.env.PORT || 5000);

//crair artigos