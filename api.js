import axios from 'axios';
import ProductSchema from "./models/product";
import Pricehistory from "./models/pricehistory";

const errors = require('restify-errors');

const Pricehistory = require('../models/pricehistory');

export function getProduct(){
  axios.get('http://localhost:3000/retailers')
    .then((response) => {
      console.log(response.data);
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
  server.post('/pricehistory', (req, res) => {
    if (!req.is('application/json')) {
      return next(
        new errors.InvalidContentError("Expects 'application/json'"),
      );
  }
  let data = req.body || {};
  //create an instance of model Pricehistory
  let pricehistory = new Pricehistory(data);
  // save the new model instance, passing a callback
  pricehistory.save(function(err) {
    if (err) {
      console.error(err);
      return next(new errors.InternalError(err.message));
      next();
      //saved!
    }
    res.send(201);
    next();
  });
});
};
