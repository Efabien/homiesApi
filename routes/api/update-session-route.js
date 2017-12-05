const Promise = require('bluebird');
const _ = require('lodash');

module.exports = class {
	constructor(sessionService) {
		this._sessionService = sessionService;

		this.handler = Promise.coroutine(this.handler.bind(this));
	}
	*handler(req, res) {
		const session = yield this._sessionService.update({ _id: req.params.sessionId }, _.omit(req.body, ['session']));
		res.json(session);
	}
}
