
const axios = require('axios');
const errors = require('restify-errors');

const PriceHistoryItem = require('./models/pricehistoryitem');

const priceHistoryId = ["1-4257585","1-4496447","1-4540096","1-3891671","1-4502611"];
const urlList = []
/*
  const idArray = ["5afd8b85f3203f0004454a2c","5afd8b85f3203f0004454a25", "5afd8b85f3203f0004454a29","5afd8b85f3203f0004454a2e",
   "5afd8b85f3203f0004454a01","5afd8b85f3203f0004454a04","5afd8b85f3203f0004454a03","5afd8b85f3203f0004454a09",
   "5afd8b85f3203f0004454a0a","5afd8b85f3203f0004454a02","5afd8b85f3203f0004454a05","5afd8b85f3203f0004454a10",
   "5afd8b85f3203f0004454a0b", "5afd8b85f3203f0004454a08", "5afd8b85f3203f0004454a0f","5afd768cea373a2babca1df2"
  ]
}*/

function updateProducts(){
  loopGetProduct(setUrl(priceHistoryId))
  console.log('updated products');
  setTimeout(updateProducts,86400000)
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
    console.log('the url:',url);
    getProduct(url)
  })
}

function getProduct(url){
  axios.get(url)
    .then((response) => {
      for (var el=0; el<5; el++){
        const price = parseInt(response.data.offers[el].price)
        console.log(price);
        /*saveProduct(
          response.data.id,
          response.data.offers[el].retailerId,
          price
        );*/
      }
    })
    .catch((err) => {
    console.log('error noooo')
  });
  //PriceRunner API: https://www.pricerunner.se/public/v1/pl/1-4257585/se?urlName=Mobiltelefoner/Apple-iPhone-X-64GB-priser&offer_sort=pricewithship
};

function saveProduct(productid, retailerid, price){

  let pricehistory = new PriceHistoryItem({productid, retailerid, price});
  axios.post('http://localhost:3000/pricehistoryitem', pricehistory)
    .then (function(response){
      console.log('saved successfully ')
  })
    .catch((err) => {
      console.error('error!',err);
  });
}

module.exports = updateProducts();
