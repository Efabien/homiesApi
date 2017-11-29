const Promise = require('bluebird');

module.exports = class {
	constructor(services) {
		this._serviceMap = {
			user: services.userService,
			session: services.sessionService,
			spot: services.spotService
		}

		this.handler = this.handler.bind(this);
	}
	handler(req, res) {
		const self = this;
		Promise.coroutine(function*() {
			const service = self._serviceMap[req.params.type];
			const response = yield service.deleteById(req.params.id);
			res.json(response);
		})();
	}
}
