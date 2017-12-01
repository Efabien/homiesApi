const Promise = require('bluebird');

module.exports = class {
	constructor(sessionService) {
		this._sessionService = sessionService;

		this.handler = Promise.coroutine(this.handler.bind(this));
	}
	
	*handler(req, res) {
			const session = yield this._sessionService.create(req.body);
			res.json(session);
	}
}
