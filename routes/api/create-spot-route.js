const Promise = require('bluebird');

module.exports = class {
	constructor(spotService) {
		this._spotService = spotService;

		this.handler = Promise.coroutine(this.handler.bind(this));
	}
	*handler(req, res) {
			const spot = yield this._spotService.create(req.body);
			res.json(spot);
	}
}
