const Promise = require('bluebird');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class {
	constructor(userService) {
		this._userService = userService;

		this.handler = Promise.coroutine(this.handler.bind(this));
	}

	*handler(req, res) {
			const followedId = req.params.fbId;
			const user = yield this._userService.getOne({ fbId: req.body.me });
			user.userFollowed = user.userFollowed.filter(item => item !== followedId);
			user.save();
			res.json({ ok: true });
	}
}
