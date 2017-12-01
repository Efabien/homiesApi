const Promise = require('bluebird');
const moment = require('moment');
const ObjectId = require('mongoose').Schema.Types.ObjectId;

module.exports = class {
	constructor(sessionService, userService) {
		this._sessionService = sessionService;
		this._userService = userService;

		this.handler = Promise.coroutine(this.handler.bind(this));
	}

	*handler(req, res) {
			const _id = req.query._id;
			const riders = req.query.riders && req.query.riders.split(',');
			const spot = req.query.spot;
			const start = req.query.start;
			const end = req.query.end;
			const organizedOnly = req.query.organizedOnly;
			let allSesh = yield this._sessionService.getAll();
			if (_id) allSesh = allSesh.filter(sesh => sesh._id.equals(_id));
			
			if (riders) {
				allSesh = allSesh.filter(sesh => {
				const seshRiders = organizedOnly? [sesh.organizer] : sesh.attendees.concat([sesh.organizer]);
					return riders.every(rider => seshRiders.includes(rider));
				});
			}
			
			if (spot) allSesh = allSesh.filter(sesh => sesh.spot.equals(spot));
			
			if (start && end) {
				allSesh = allSesh.filter(sesh => {
					return ((moment(sesh.start).isBefore(start) || moment(sesh.start).isSame(start)) &&
						(moment(sesh.end).isAfter(end) || moment(sesh.end).isSame(end)));
				});
			}
			res.json(allSesh);
	}
}
