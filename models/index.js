const db = require('./db');
const ObjectId = db.Schema.Types.ObjectId;

const userSchema = new db.Schema({
	first_name: String,
	last_name: String,
	profile_pic: String,
	locale: String,
	timezone: Number,
	fbId: String ,
	userFollowed: [String],
	spotFollowed: [{ type: ObjectId, ref: 'Spot' }],
	creationDate: Date
});

const spotSchema = new db.Schema({
	name: String,
	location: String
});

const sessionSchema = new db.Schema({
	organizer: String,
	attendees: [String],
	spot: { type: ObjectId, ref: 'Spot' },
	start: Date,
	end: Date
});

exports.User = db.model('User', userSchema);
exports.Session = db.model('Session', sessionSchema);
exports.Spot = db.model('Spot', spotSchema);

