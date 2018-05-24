
const axios = require('axios');
const errors = require('restify-errors');

const PriceHistoryItem = require('./models/pricehistoryitem');

const priceHistoryId = ["1-4257585","1-4496447","1-4540096","1-3891671","1-4502611"];
const urlList = []


function updateProducts(){
  loopGetProduct(setUrl(priceHistoryId))
  console.log('updated products');
  /* TODO
  schedule.scheduleJob('0 0 * * *', () => {
    updateProducts()
  })*/
}

function setUrl(priceHistoryId) {
  const productUrl = "http://www.pricerunner.se/public/v1/pl/";
  const projectUrl = "/se?urlName=priceHistoryApplication";
  priceHistoryId.map(id => {
    urlList.push(productUrl + id + projectUrl)
  })
  return urlList
}

function loopGetProduct(urlList) {
  urlList.map(url => {
    getProduct(url)
  })
}

function getProduct(url){
  axios.get(url)
    .then((response) => {
      for (var el=0; el<10; el++){
        const price = parseInt(response.data.offers[el].price)
        saveProduct(
          response.data.id,
          response.data.offers[el].retailerId,
          price
        );
      }
    })
    .catch((err) => {
    console.log('error noooo')
  });
};

function saveProduct(productid, retailerid, price){

  let pricehistory = new PriceHistoryItem({productid, retailerid, price});
  axios.post('http://pricehistorybackend.herokuapp.com/pricehistories', pricehistory)
    .then (function(response){
      console.log('saved successfully ')
  })
    .catch((err) => {
      console.error('error!',err);
  });
}

module.exports = updateProducts();
