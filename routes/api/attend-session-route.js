const Promise = require('bluebird');

module.exports = class {
	constructor(sessionService) {
		this._sessionService = sessionService;

		this.handler = this.handler.bind(this);
	}
	handler(req, res) {
		const self = this;
		Promise.coroutine(function*() {
			const sessionId = req.params.sessionId;
			const session = yield self._sessionService.getOne({ _id: sessionId });
			session.attendees.push(req.body.fbId);
			session.save();
			res.json({ ok: true });
		})();
	}
}
