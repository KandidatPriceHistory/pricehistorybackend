
const errors = require('restify-errors');

const Pricehistory = require('../models/pricehistoryitem');

	/*
	POST
	 */
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

	/*
 LIST
	 */
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

	server.get('/pricehistories/:productId/:retailerid', (req, res, next) => {
		Pricehistory.apiQuery(req.params, function(err, docs) {
			if (err) {
 				console.error(err);
				return next(
				new errors.InvalidContentError(err.errors.name.message),
			);
		}
		const arrayOfDates = []
		const graphDataSorted = []
		let lastDate = ""

		docs.map( obj => {
 			const eachDate = new Date(obj.updatedAt);
 			arrayOfDates.push(eachDate)
		})

		const sortedArray = arrayOfDates.sort(function(a,b){
			return b.date - a.date
		});

		sortedArray.map(sortedDate => {
			docs.forEach(obj => {
 				const date = new Date(obj.updatedAt);
				if (sortedDate.getTime() === date.getTime()) {
					const newObj = { "price": obj.price, "date":date }
					graphDataSorted.push(newObj)
					lastDate = sortedDate;
				}
			})
		})

 		res.send(graphDataSorted);
		next();
		});
	});

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
