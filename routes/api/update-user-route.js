const Promise = require('bluebird');

module.exports = class {
	constructor(userService) {
		this._userService = userService;

		this.handler = Promise.coroutine(this.handler.bind(this));
	}
	*handler(req, res) {
		const user = yield this._userService.update({ fbId: req.params.fbId }, req.body);
		res.json(user);
	}
}
