const config = require('../config');

module.exports = (req, res, next) => {
	const authorized = (req.headers.authorization && req.headers.authorization === config.authorization);
	if (authorized) return next();
	console.log('unauthorized connection');
	res.json({'message':'you are not authorized to use this service'});
}
