
const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const RetailerSchema = new mongoose.Schema(
	{
		retailersProducts: [
			{
				productid: {
					type: String,
					required: true,
			}
		}
		],
		retailerid: {
      type: String,
      required: true,
    },
		retailerName:{
      type: String,
      required: true,
    },
		retailerLogo: {
			type: String,
			required: false,
		},
	},
	{ minimize: false },
);

RetailerSchema.plugin(timestamps);
RetailerSchema.plugin(mongooseStringQuery);

const Retailer = mongoose.model('Retailer', RetailerSchema);
module.exports = Retailer;
