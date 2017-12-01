const Promise = require('bluebird');

module.exports = class {
	constructor(userService) {
		this._userService = userService;

		this.handler = Promise.coroutine(this.handler.bind(this));
	}

	*handler(req, res) {
			const user = yield this._userService.pickOne(
				{ fbId: req.params.fbId },
				{ userFollowed: 1 });
			const followedUsers = yield this._userService.get({ _id: { $in: user.userFollowed } });
			res.json(followedUsers);
	}
}
