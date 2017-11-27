const Promise = require('bluebird');

module.exports = class {
	constructor(userService) {
		this._userService = userService;

		this.handler = this.handler.bind(this)
	}

	handler(req, res) {
		const self = this;
		Promise.coroutine(function*() {
			const user = yield self._userService.pickOne(
				{ fbId: req.params.fbId },
				{ userFollowed: 1 });
			const followedUsers = yield self._userService.get({ _id: { $in: user.userFollowed } });
			res.json(followedUsers);
		})();
	}
}
