const Promise = require('bluebird');

const BaseService = require('./base-service');

module.exports = class UserSercice extends BaseService {
	constructor(model) {
		super(model);
	}
}
