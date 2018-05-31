
const errors = require('restify-errors');

const Pricehistory = require('../models/pricehistoryitem');

const db = require('../index')

	/* POST */
server.post('/pricehistories', (req, res, next) => {
	if (!req.is('application/json')) {
		return next(
			new errors.InvalidContentError("Expects 'application/json'"),
		);
	}
	let data = req.body || {};

	for (i=0; i<data.length; i++){
		let pricehistory = new Pricehistory(data[i]);

// save the new model instance, passing a callback
	pricehistory.save(function(err) {
			if (err) {
				console.error(err);
				return next(new errors.InternalError(err.message));
				next();
				//saved!
				}
			})
	}
	res.send(201,data);
	next();
});

	/* LIST */
server.get('/pricehistories', (req, res, next) => {
		Pricehistory.apiQuery(req.params, function(err, docs) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message),
				);
			}
			res.send(docs);
			next();
		});
	});

/* get the max price */
server.get('/pricehistories/:productId/:retailerid/max', (req, res, next) => {
			Pricehistory.find({
				productId: req.params.productId,
				retailerid: req.params.retailerid
			}).sort({price:-1}).exec(function(err, docs) {
				if (err) {
					console.error(err);
					return next(
						new errors.InvalidContentError(err.errors.name.message),
					);
				}
				res.send(docs[0]);
				next();
		})
});

/* get the min price */
server.get('/pricehistories/:productId/:retailerid/min', (req, res, next) => {
		Pricehistory.find({
				productId: req.params.productId,
				retailerid: req.params.retailerid
			}).sort({price:1}).exec(function(err, docs) {
				if (err) {
					console.error(err);
					return next(
						new errors.InvalidContentError(err.errors.name.message),
					);
				}
				res.send(docs[0]);
				next();
		})
});

/* get specific price data of one product and one store sorted */
server.get('/pricehistories/:productId/:retailerid', (req, res, next) => {
	/*
	 -- the more clean soltion below but its returning multiple prices for one date
	*/
	
	/* Pricehistory.find({
			productId: req.params.productId,
			retailerid: req.params.retailerid
		}).sort({updatedAt:'asc'}).exec(function(err, docs) ... */

	/*
	 -- the ugly solution below but it works
	*/
	Pricehistory.apiQuery(req.params, function(err, docs) {
		if (err) {
 				console.error(err);
				return next(
				new errors.InvalidContentError(err.errors.name.message),
			);

		}
		const arrayOfDates = []
		const graphDataSorted = []
		let lastDate = new Date()

		docs.map( obj => {
			arrayOfDates.push(obj.updatedAt)
		})

		const sortedArray = arrayOfDates.sort(
 			function(a,b){
 				return +new Date(b) - +new Date (a)
			}).reverse();

		sortedArray.map(sortedDate => {
				docs.forEach(obj => {
					const date = new Date(obj.updatedAt);
	 				if (sortedDate.getTime() === date.getTime() && sortedDate.getDate() != lastDate.getDate()) {
	 					const newObj = { "price": obj.price, "date":date }
	 					graphDataSorted.push(newObj)
	 					lastDate = sortedDate;
	 				}
	 			})
	 		})

	  res.send(graphDataSorted);
	 	next();
	});
})

	/*
	DELETE
	 */
server.del('/pricehistories/:pricehistory_id', (req, res, next) => {
		Pricehistory.remove({ _id: req.params.pricehistory_id }, function(err) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message),
				);
			}

			res.send(204);
			next();
		});
});
