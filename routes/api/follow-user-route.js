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
			const followedId = req.params.fbId;
			const user = yield self._userService.getOne({ fbId: req.body.me });
			user.userFollowed.push(followedId);
			user.save();
			res.json({ ok: true });
		})();
	}
}
