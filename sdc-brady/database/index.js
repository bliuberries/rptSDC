const pg = require('pg')
// const client = new Client();
// const pool = pg.Pool({
//   user: 'bradyliu',
//   host: 'localhost',
//   database: 'sdc-zon13',
//   password: '',
//   port: 3333,
// })

const pool = new pg.Pool({ database: 'sdc-zon13' });

pool.connect()
  .then(() => console.log('connected to postgreSQL'));

const createTable = () => {
  const createTable =
    `DROP TABLE IF EXISTS product_info;
    CREATE TABLE product_info (
       productID INTEGER PRIMARY KEY,
       seller VARCHAR (50) NOT NULL,
       productName VARCHAR (255) NOT NULL,
       sellerProfile VARCHAR (255) NOT NULL,
       price numeric NOT NULL,
       listPrice numeric,
       savings numeric,
       stars numeric,
       customerReviews numeric,
       primeStatus BOOLEAN NOT NULL,
       freeReturn BOOLEAN NOT NULL,
       styles VARCHAR (255),
       options VARCHAR (255),
       features varchar ARRAY
    )`;
  pool
    .query(createTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((e) => {
      console.log(e);
      pool.end();
    })
}
createTable();
const insertRecords = (id, merchant, name, profile, price, listPrice, savings, stars, customerRevs, primeStatus, freeReturns, styles, options, features) => {
  const query = `INSERT INTO product VALUES (${id}, ${merchant}, ${name}, ${profile}, ${price}, ${listPrice}, ${savings}, ${stars}, ${customerRevs}, ${primeStatus}, ${freeReturns}, ${styles}, ${options}, ${features})`;
  pool
    .query(query)
    .catch(e => console.log(e.stack));
};

module.exports = {
  createTable,
  insertRecords
}