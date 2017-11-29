Promise = require('bluebird');

module.exports = class {
	constructor(services) {
		this._userService = services.userService;
		this._sessionService = services.sessionService;
		this._spotService = services.spotService;

		this.handler = this.handler.bind(this);
	}

	handler(req, res, next) {
		const self = this;
		Promise.coroutine(function*() {
			const userFbId = req.params.fbId;
			const sessionId = req.params.sessionId;
			if (!userFbId && !sessionId) return next();
			if (userFbId) {
				const user = yield self._userService.getOne({ fbId: userFbId });
				if (user) return next();
				res.json({ error: true , status: 404, message: `User with fbId ${userFbId} not found`});
			}
			if (sessionId) {
				const session = yield self._sessionService.getOne({ _id: sessionId });
				if (session) return next();
				res.json({ error: true , status: 404, message: `Session with _id ${sessionId} not found`});
			}
		})();
	}
}