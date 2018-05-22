/*
CRUD operations:
POST /pricehistory (Creates a todo item)
GET /pricehistory (Lists all todos in the queue)
GET /pricehistory/:pricehistory_id (Gets a specific todo item in the queue)
PUT /pricehistory/:pricehistory_id (Updates a specific todo item in the queue)
DELETE /pricehistory/:pricehistory_id (Destroys a specific todo item in the queue)*/

/**
 * Module Dependencies
 */
const errors = require('restify-errors');

const Pricehistory = require('../models/pricehistoryitem');

	/*
	POST
	 */
	server.post('/pricehistoryitem', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'"),
			);
		}

		let data = req.body || {};
//create an instance of model Pricehistory

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
	server.get('/pricehistoryitem', (req, res, next) => {
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

	/*
	GET
	 */
	server.get('/pricehistoryitem/:pricehistory_id', (req, res, next) => {
		Pricehistory.findOne({ _id: req.params.pricehistory_id }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message),
				);
			}

			res.send(doc);
			next();
		});
	});

	/*
	DELETE
	 */
	server.del('/pricehistoryitem/:pricehistory_id', (req, res, next) => {
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
