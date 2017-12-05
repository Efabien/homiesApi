Promise = require('bluebird');

module.exports = class {
	constructor(services) {
		this._userService = services.userService;
		this._sessionService = services.sessionService;
		this._spotService = services.spotService;

		this.handler = Promise.coroutine(this.handler.bind(this));
		this.userHandler = Promise.coroutine(this.userHandler.bind(this));
		this.sessionHandler = Promise.coroutine(this.sessionHandler.bind(this));
		this.spotHandler = Promise.coroutine(this.spotHandler.bind(this));
	}

	*userHandler(req, res, next) {
			const userFbId = req.params.fbId;
				const user = yield this._userService.getOne({ fbId: userFbId });
				if (user || userFbId === 'all') {
					if (userFbId !== 'all') req.body.user = user;
					return next();
				}
				res.json({ error: true , status: 404, message: `User with fbId ${userFbId} not found`});
	}

	*sessionHandler(req, res, next) {
			const sessionId = req.params.sessionId;
			if (!sessionId.match(/^[0-9a-fA-F]{24}$/)) res.json({ error: true, status: 403, message: `Invalid id`});
				const session = yield this._sessionService.getOne({ _id: sessionId });
				if (session) {
					req.body.session = session;
					return next();
				}
				res.json({ error: true , status: 404, message: `Session with _id ${sessionId} not found`});
	}

	*spotHandler(req, res, next) {
			const spotId = req.params.spotId;
			if (!spotId.match(/^[0-9a-fA-F]{24}$/)) res.json({ error: true, status: 403, message: `Invalid id`});
				const spot = yield this._spotService.getOne({ _id: spotId });
				if (spot) {
					req.body.spot = spot;
					return next();
				}
				res.json({ error: true , status: 404, message: `Spot with _id ${spotId} not found`});
	}

	*handler(req, res, next) {
		const self = this;
		const id = req.params.id;
		if (!id.match(/^[0-9a-fA-F]{24}$/)) res.json({ error: true, status: 403, message: `Invalid id`});
		const serviceMap = {
			user: self._userService,
			session: self._sessionService,
			spot: self._spotService
		}
		const service = serviceMap[req.params.type];
		const item = yield service.getOne({ _id: id });
		if (item) return next();
		res.json({ error: true, status: 404, message: `No item found for id ${id}`});
	}
}