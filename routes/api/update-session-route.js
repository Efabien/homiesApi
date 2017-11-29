const Promise = require('bluebird');

module.exports = class {
	constructor(sessionService) {
		this._sessionService = sessionService;

		this.handler = this.handler.bind(this);
	}
	handler(req, res) {
		const self = this;
		Promise.coroutine(function*() {
			const user = yield self._sessionService.update({ fbId: req.params.fbId }, req.body);
			res.json(user);
		})();
	}
}
