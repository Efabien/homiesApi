const Promise = require('bluebird');

module.exports = class {
	constructor(sessionService) {
		this._sessionService = sessionService;

		this.handler = Promise.coroutine(this.handler.bind(this));
	}
	*handler(req, res) {
			const sessionId = req.params.sessionId;
			const session = yield this._sessionService.getOne({ _id: sessionId });
			session.attendees.push(req.body.me);
			session.save();
			res.json({ ok: true });
	}
}
