const Promise = require('bluebird');

module.exports = class {
	constructor(userService) {
		this._userService = userService;

		this.handler = this.handler.bind(this);
	}
	handler(req, res) {
		const self = this;
		Promise.coroutine(function*() {
			const user = yield self._userService.update({ fbId: req.params.fbId }, req.body);
			res.json(user);
		})();
	}
}
