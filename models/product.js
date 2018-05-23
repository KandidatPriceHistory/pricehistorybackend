
const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');
/* Our `mongoose-timestamp` module will add the createdAt and updatedAt
timestamps for us, and MongoDB will automatically generate a UUID called _id.
*/
const ProductSchema = new mongoose.Schema(
	{
		manufacturer: {
			name: {
				type: String,
				required: true,
			},
			id: {
				type: String,
				required: true,
			}
		},
		name: {
      type: String,
      required: true,
    },
		id: {
      type: String,
      required: true,
    },
		productImages: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{ minimize: false },
);

ProductSchema.plugin(timestamps);
ProductSchema.plugin(mongooseStringQuery);

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
