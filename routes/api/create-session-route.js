const Promise = require('bluebird');

module.exports = class {
	constructor(sessionService) {
		this._sessionService = sessionService;

		this.handler = this.handler.bind(this);
	}
	handler(req, res) {
		const self = this;
		Promise.coroutine(function*() {
			const session = yield self._sessionService.create(req.body);
			res.json(session);
		})();
	}
}
