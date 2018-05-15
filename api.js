// import axios from 'axios';
// import ProductSchema from "./models/product";
// import Pricehistory from "./models/pricehistory";

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
      // const dataResponse = response.data
      saveProduct(response.data);
    })
    .catch((err) => {
    console.log('error noooo')
  });

  //PriceRunner API: https://www.pricerunner.se/public/v1/pl/1-4257585/se?urlName=Mobiltelefoner/Apple-iPhone-X-64GB-priser&offer_sort=pricewithship
  //setTimeout(getProduct(), 1000);
};

function saveProduct(data){
  //create an instance of model Pricehistory
  let pricehistory = new Pricehistory(data[0]);
  // save the new model instance, passing a callback
  pricehistory.save(function(err) {
    if (err) {
      console.error(err);
    }
    console.log('product saved, product: ',pricehistory)
    //saved!
  });
}
