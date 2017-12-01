const Promise = require('bluebird');
const _ = require('lodash');

module.exports = class {
	constructor(spotService) {
		this._spotService = spotService;

		this.handler = Promise.coroutine(this.handler.bind(this));
	}
	*handler(req, res) {
		const pics = req.body.pics;
		if (pics) {
			req.body = _.omit(req.body, ['pics']);
			const toUpdate = yield this._spotService.getOne({ _id: req.params.spotId });
			toUpdate.pics = toUpdate.pics.concat(pics);
			toUpdate.save();
		}
		const proceed = (_.has(req.body, ['name']) || _.has(req.body, ['location']));
		if (proceed) {
			const spot = yield this._spotService.update({ _id: req.params.spotId }, req.body);
			res.json(spot);
		} else {
			res.json({ ok: true, message: 'photo uploaded'});
		}
	}
}
