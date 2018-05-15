
const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');
/* Our `mongoose-timestamp` module will add the createdAt and updatedAt
timestamps for us, and MongoDB will automatically generate a UUID called _id.
*/
const RetailerSchema = new mongoose.Schema(
	{
    retailerid: {
      type: Number,
      required: true,
      trim: true,
    },
		retailerName:{
      type: String,
      required: true,
    },
    retailerLogo: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ minimize: false },
);

RetailerSchema.plugin(timestamps);
RetailerSchema.plugin(mongooseStringQuery);

const Retailer = mongoose.model('Retailer', RetailerSchema);
module.exports = Retailer;
