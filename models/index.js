const db = require('./db');
const ObjectId = db.Schema.Types.ObjectId;

const userSchema = new db.Schema({
	first_name: String,
	last_name: String,
	profile_pic: String,
	locale: String,
	timezone: Number,
	fbId: String ,
	userFollowed: [{ type: ObjectId, ref: 'User' }],
	spotFollowed: [{ type: ObjectId, ref: 'Spot' }],
	creationDate: Date
});

const spotSchema = new db.Schema({
	name: String,
	location: String
});

const sessionSchema = new db.Schema({
	organizer: { type: ObjectId, ref: 'User' },
	attendees: [{ type: ObjectId, ref: 'User' }],
	spot: { type: ObjectId, ref: 'Spot' },
	start: Date,
	end: Date
});

exports.User = db.model('User', userSchema);
const Session = db.model('Session', sessionSchema);
exports.Spot = db.model('Spot', spotSchema);

