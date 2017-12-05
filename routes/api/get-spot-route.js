const Promise = require('bluebird');

module.exports = class {
	constructor(spotService) {
		this._spotService = spotService;

		this.handler = Promise.coroutine(this.handler.bind(this));
	}

	*handler(req, res) {
		const spot = req.body.spot;
		res.json(spot);
	}
}
