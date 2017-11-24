const Promise = require('bluebird');
const moment = require('moment');
const _ = require('lodash');

module.exports = class {
	constructor(model) {
		this._userModel = model;
	}

	create(body) {
		const user = _.merge(body, { creationDate: moment() });
		return this._userModel.create(user)
		.then(() => {
			return user;
		});
	}

	getUsers() {
		return this._userModel.find()
		.then(doc => doc);
	}

	getUser(filter) {
		return this._userModel.findOne(filter)
		.then(doc => doc);
	}

	update(filter, update) {
		const toApply = {
			$set: update
		}
		return this._userModel.findOneAndUpdate(filter, update, { new: true })
		.then(doc => doc);
	}
}