// require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
// const pg = require('../database/index.js');
const pgp = require('pg-promise')();
const app = express();
// const db = pgp({ database: 'sdc-zon13' });
const pg = require('pg')
const pool = new pg.Pool({ database: 'sdc-zon13' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../build')));
app.use(cors());

app.use('/products/:id', express.static(path.join(__dirname, '../build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/product/:productid', function (req, res) {
  let query = `SELECT * from product_info WHERE productid = ${req.params.productid};`;
  pool.query(query, (err, data) => {
    if(err) console.log(err, 'err');
    res.send(data);
  })
})

app.get('/', function (req, res) {
  // console.log(path.join(__dirname, '../build', 'index.html'))
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`listening to port ${process.env.PORT ||8080}`);
});