
const axios = require('axios');
const errors = require('restify-errors');

const Pricehistory = require('./models/pricehistory');

const priceHistoryId = ["1-4257585","1-4496447","1-4540096","1-3891671","1-4502611"];
const urlList = []

server.get('/getProduct', function(req,res,next) {
  getProduct();
})

function setUrl(priceHistoryId) {
  const productUrl = "http://www.pricerunner.se/public/v1/pl/";
  const projectUrl = "/se?urlName=priceHistoryApplication";
  priceHistoryId.map(id => {
    urlList.push(productUrl + id + projectUrl)
  })
  // console.log(urlList)
  return urlList
}

function updateProducts(){
  loopGetProduct(setUrl(priceHistoryId))
  console.log('updated products');
  setTimeout(updateProducts,86400000)
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
      for (var el=0; el<10; el++){
        const price = parseInt(response.data.minPrice.value)
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
  //PriceRunner API: https://www.pricerunner.se/public/v1/pl/1-4257585/se?urlName=Mobiltelefoner/Apple-iPhone-X-64GB-priser&offer_sort=pricewithship
};

function saveProduct(productid, retailerid, price){

  let pricehistory = new Pricehistory({productid, retailerid, price});
  axios.post('http://pricehistorybackend.herokuapp.com/pricehistory', pricehistory)
    .then (function(response){
      console.log('saved successfully ')
  })
    .catch((err) => {
      console.error('error!',err);
  });
}

module.exports = updateProducts();
