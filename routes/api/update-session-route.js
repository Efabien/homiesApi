const Promise = require('bluebird');

module.exports = class {
	constructor(sessionService) {
		this._sessionService = sessionService;

		this.handler = Promise.coroutine(this.handler.bind(this));
	}
	*handler(req, res) {
		const user = yield this._sessionService.update({ fbId: req.params.fbId }, req.body);
		res.json(user);
	}
}
