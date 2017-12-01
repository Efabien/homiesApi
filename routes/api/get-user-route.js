const Promise = require('bluebird');

module.exports = class {
	constructor(userService) {
		this._userService = userService;

		this.handler = Promise.coroutine(this.handler.bind(this));
	}

	*handler(req, res) {
			const fbId = req.params.fbId;
			const users = yield this._userService.getAll();
			if (fbId === 'all') res.json(users);
			else res.json(users.find(user => user.fbId === fbId));
	}
}
