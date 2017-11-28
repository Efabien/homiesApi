const Promise = require('bluebird');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class {
	constructor(userService) {
		this._userService = userService;

		this.handler = this.handler.bind(this)
	}

	handler(req, res) {
		const self = this;
		Promise.coroutine(function*() {
			const followedId = req.params.followedId;
			const user = yield self._userService.getOne({ fbId: req.body.fbId });
			user.userFollowed = user.userFollowed.filter(item => item !== followedId);
			user.save();
			res.json({ ok: true });
		})();
	}
}
