const Promise = require('bluebird');

module.exports = class {
	constructor(userService) {
		this._userService = userService;

		this.handler = this.handler.bind(this);
	}
	handler(req, res) {
		const self = this;
		Promise.coroutine(function*() {
			const user = yield self._userService.create(req.body);
			res.json(user);
		})();
	}
}
