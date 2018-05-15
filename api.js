
const axios = require('axios');
const errors = require('restify-errors');

const Pricehistory = require('./models/pricehistory');

server.get('/getProduct', function(req,res,next) {
  getProduct();
})

function getProduct(){
  axios.get('http://localhost:3000/pricehistory')
    .then((response) => {
      console.log('response:',response.data);
      const resObj = response.data[0]
      // const dataResponse = response.data
      saveProduct(resObj.productid, resObj.retailerid,
      resObj.price, resObj.updatedAt);
    })
    .catch((err) => {
    console.log('error noooo')
  });

  //PriceRunner API: https://www.pricerunner.se/public/v1/pl/1-4257585/se?urlName=Mobiltelefoner/Apple-iPhone-X-64GB-priser&offer_sort=pricewithship
  //setTimeout(getProduct(), 1000);
};

function saveProduct(productid, retailerid, price, date){

  let pricehistory = new Pricehistory({productid, retailerid, price, date});
  axios.post('http://localhost:3000/pricehistory', pricehistory)
    .then (function(response){
      console.log('saved successfully ')
  })
    .catch((err) => {
      console.error('error!',err);
  });

}
