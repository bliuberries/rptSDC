const faker = require('faker');
const pgp = require('pg-promise')();

// const connection = {
//   user: 'bradyliu',
//   host: 'localhost',
//   database: 'sdc-zon13',
//   password: '',
//   port: 3333,
// };
const db = pgp({ database: 'sdc-zon13' });
const startTimer = new Date().getTime();

// create data
const generateData = (amountOfData, index) => {
  const data = [];
  const itemCount = amountOfData * index;
  for (let i = 0; i < amountOfData; i++) {
    let diceRoll = Math.random();
    let price = faker.commerce.price();
    let listPrice = diceRoll > .85 ? price * 1.2 : 
                    diceRoll > .65 ? price * 1.15 : 
                    diceRoll > .6 ? price * 1.3 :
                    price;
    let stars = diceRoll > .9 ? 5 : diceRoll > .6 ? 4 : diceRoll > .3 ? 3 : diceRoll > .15 ? 2 : 1;
    data.push({
      productid: itemCount + i,
      seller: `${faker.name.firstName()} ${faker.name.lastName()}`,
      productname: faker.commerce.productName(),
      sellerprofile: faker.internet.url(),
      price: price,
      listprice: listPrice,
      savings: listPrice - price,    
      stars: stars,
      customerreviews: Math.floor(Math.random() * Math.floor(4899)),
      primestatus: diceRoll > .35 ? true : false,
      freereturn: diceRoll > .6 ? true : false,
      styles: diceRoll > .5 ? faker.commerce.color() : '',
      options: diceRoll > .8 ? faker.commerce.productMaterial() : '',
      features: [
        faker.lorem.word(),
        faker.lorem.words(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
      ]
    });
  }
  return pgp.helpers.insert(data, ['productid', 'seller', 'productname', 'sellerprofile', 'price', 'listprice', 'savings', 'stars', 'customerreviews', 'primestatus', 'freereturn', 'styles', 'options', 'features'], 'product_info');
};

db.tx(async (t) => {
  let index = 0;
  while(index < 1) {
    await t.none(generateData(10000, index));
    console.log(`${index + 1} chunks loaded`);
    index++;
  }
})
  .then(() =>
    console.log('10m records packed together nicely'),
  )
  .catch((e) => console.log(e))
  .finally(() => {
    const endTimer = new Date().getTime();
    console.log(
      `Run Time: ${Math.round((endTimer - startTimer) / 1000, 2)} seconds`,
    );
    pgp.end();
  });