const Promise = require('bluebird');

module.exports = class {
	constructor(userService) {
		this._userService = userService;

		this.handler = Promise.coroutine(this.handler.bind(this));
	}

	*handler(req, res) {
			const user = req.body.user;
			if (user) res.json(user);
			else {
				const users = yield this._userService.getAll();
				res.json(users);
			}
	}
}
