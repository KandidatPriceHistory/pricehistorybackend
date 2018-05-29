
//Module Dependencies
const config = require('./config');
const restify = require('restify');
const mongoose = require('mongoose');
const restifyPlugins = require('restify-plugins');
const schedule = require('node-schedule')

//Initialize Server
global.server = restify.createServer({
	name: config.name,
	version: config.version,
});

//Middleware
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

//Start Server, Connect to DB & Require Routes
server.listen(config.port, () => {

	// establish connection to mongodb
	mongoose.Promise = global.Promise;
	mongoose.connect(config.db.uri, { useMongoClient: true });

	const db = mongoose.connection;

	db.on('error', (err) => {
	    console.error(err);
	    process.exit(1);
	});

	db.once('open', () => {
	    require('./routes/product');
			require('./routes/retailer');
			require('./routes/pricehistoryitem');
	    console.log(`Server is listening on port ${config.port}`);

			schedule.scheduleJob('0 0 * * *', () => {
		    require('./api');
		  })

	});
});
