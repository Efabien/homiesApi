Promise = require('bluebird');

module.exports = class {
	constructor(services) {
		this._userService = services.userService;
		this._sessionService = services.sessionService;
		this._spotService = services.spotService;

		this.userHandler = Promise.coroutine(this.userHandler.bind(this));
		this.sessionHandler = Promise.coroutine(this.sessionHandler.bind(this));
	}

	*userHandler(req, res, next) {
			const userFbId = req.params.fbId;
				const user = yield this._userService.getOne({ fbId: userFbId });
				if (user || userFbId === 'all') return next();
				res.json({ error: true , status: 404, message: `User with fbId ${userFbId} not found`});
	}

	*sessionHandler(req, res, next) {
			const sessionId = req.params.sessionId;
			if (!sessionId.match(/^[0-9a-fA-F]{24}$/)) res.json({ error: true, status: 403, message: `Invalid id`});
				const session = yield this._sessionService.getOne({ _id: sessionId });
				if (session) return next();
				res.json({ error: true , status: 404, message: `Session with _id ${sessionId} not found`});
	}

	*spotHandler(req, res, next) {
			const spotId = req.params.spotId;
			if (!userFbId.match(/^[0-9a-fA-F]{24}$/)) res.json({ error: true, status: 403, message: `Invalid id`});
				const spot = yield this._spotService.getOne({ _id: spotId });
				if (spot) return next();
				res.json({ error: true , status: 404, message: `Spot with _id ${spotId} not found`});
	}
}