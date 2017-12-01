const Promise = require('bluebird');

module.exports = class {
	constructor(userService) {
		this._userService = userService;

		this.handler = Promise.coroutine(this.handler.bind(this));
	}
	*handler(req, res) {
			const user = yield this._userService.create(req.body);
			res.json(user);
	}
}
