
module.exports = class {
	constructor(model) {
		this._model = model;
	}

	create(document) {
		return this._model.create(document)
		.then(() => {
			return document;
		})
	}

	getAll() {
		return this._model.find()
		.then(docs => docs);
	}

	get(filter) {
		return this._model.find(filter)
		.then(doc => doc);
	}

	getOne(filter) {
		return this._model.findOne(filter)
		.then(doc => doc);
	}

	pick(filter, projection) {
		return this._model.find(filter, projection)
		.then(doc => doc);
	}

	pickOne(filter, projection) {
		return this._model.findOne(filter, projection)
		.then(doc => doc);
	}

	update(filter, update) {
		const toApply = {
			$set: update
		}
		return this._model.findOneAndUpdate(filter, update, { new: true })
		.then(doc => doc);
	}

	expose() {
		return this._model;
	}
}