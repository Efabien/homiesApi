const Promise = require('bluebird');
const moment = require('moment');
const _ = require('lodash');

const BaseService = require('./base-service');

module.exports = class UserSercice extends BaseService {
	constructor(model) {
		super(model);
	}

	create(body) {
		const user = _.merge(body, { creationDate: moment() });
		return this._model.create(user)
		.then(() => {
			return user;
		});
	}
}
