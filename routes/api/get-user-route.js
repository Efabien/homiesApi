const Promise = require('bluebird');

module.exports = class {
	constructor(userService) {
		this._userService = userService;

		this.handler = this.handler.bind(this)
	}

	handler(req, res) {
		const self = this;
		Promise.coroutine(function*() {
			const fbId = req.params.fbId;
			const users = yield self._userService.getAll();
			if (fbId === 'all') res.json(users);
			else res.json(users.find(user => user.fbId = fbId));
		})();
	}
}
