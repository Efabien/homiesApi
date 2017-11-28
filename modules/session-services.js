const Promise = require('bluebird');
const moment = require('moment');
const _ = require('lodash');
const ObjectId = require('mongoose').Schema.Types.ObjectId;

const BaseService = require('./base-service');

module.exports = class UserSercice extends BaseService {
	constructor(model) {
		super(model);
	}

	create(body) {
		const session = {
			organizer: body.organizer,
			spot: body.spot,
			start: body.start,
			end: body.end
		};
		return this._model.create(session)
		.then(() => {
			return session;
		});
	}
}
