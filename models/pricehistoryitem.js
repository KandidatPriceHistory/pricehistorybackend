
const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const PricehistorySchema = new mongoose.Schema(
	{
    productId: {
      type: String,
      required: false,
    },
    retailerid: {
			type: String,
			required: false,
		},
    price: {
			type: Number,
			required: false,
		},
	},
	{ minimize: false },
);

PricehistorySchema.plugin(timestamps);
PricehistorySchema.plugin(mongooseStringQuery);

const Pricehistory = mongoose.model('Pricehistory', PricehistorySchema);
module.exports = Pricehistory;
