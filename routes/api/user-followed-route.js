const Promise = require('bluebird');

module.exports = class {
	constructor(userService) {
		this._userService = userService;

		this.handler = Promise.coroutine(this.handler.bind(this));
	}

	*handler(req, res) {
			const user = req.body.user;
			const followedUsers = yield this._userService.get({ fbId: { $in: user.userFollowed } });
			res.json(followedUsers);
	}
}
