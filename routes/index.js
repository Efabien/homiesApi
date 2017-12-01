const express=require('express');
const router = express.Router();

const Models = require('../models');
const User = Models.User;
const Session = Models.Session;
const Spot = Models.Spot;

const UserService = require('../modules/user-services');
const SessionService = require('../modules/session-services');
const SpotService = require('../modules/spot-services');
const userService = new UserService(User);
const sessionService = new SessionService(Session);
const spotService = new SpotService(Spot);

const NotFoundMiddleware = require('../middlewares/404');

const notFound = new NotFoundMiddleware({ userService, sessionService, spotService });

const CreateUserRoute = require('./api/create-user-route');
const GetUserRoute = require('./api/get-user-route');
const UserFollowedRoute = require('./api/user-followed-route');
const FollowUserRoute = require('./api/follow-user-route');
const UnfollowUserRoute = require('./api/unfollow-user-route');
const UpdateUserRoute = require('./api/update-user-route');
const CreateSessionRoute = require('./api/create-session-route');
const GetSessionRoute = require('./api/get-session-route');
const AttendSessionRoute = require('./api/attend-session-route');
const NeglectSessionRoute = require('./api/neglect-session-route');
const UpdateSessionRoute = require('./api/update-session-route');
const CreateSpotRoute = require('./api/create-spot-route');
const UpdateSpotRoute = require('./api/update-spot-route');
const DeletionRoute = require('./api/deletion-route');

const createUser = new CreateUserRoute(userService);
const getUser = new GetUserRoute(userService);
const userFollowed = new UserFollowedRoute(userService);
const followUser = new FollowUserRoute(userService);
const unfollowUser = new UnfollowUserRoute(userService);
const updateUser = new UpdateUserRoute(userService);
const createSession = new CreateSessionRoute(sessionService);
const getSession = new GetSessionRoute(sessionService, userService);
const attendSession = new AttendSessionRoute(sessionService);
const neglectSession = new NeglectSessionRoute(sessionService);
const updateSession = new UpdateSessionRoute(sessionService);
const createSpot = new CreateSpotRoute(spotService);
const updateSpot = new UpdateSpotRoute(spotService);
const deletion = new DeletionRoute({ userService, sessionService, spotService });

//defining routes
router.get('/', (req,res) => {
	res.send('hello world');
});

/**
* body: {
		first_name: Enone,
		last_name: Fabien,
		profile_pic: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/p200x200/13055603_10105219398495383_8237637584159975445_n.jpg?oh=1d241d4b6d4dac50eaf9bb73288ea192&oe=57AF5C03&__gda__=1470213755_ab17c8c8e3a0a447fed3f272fa2179ce'
		locale: 'en_US',
		timezone: 3,
		fbId: 'aedfvbvafabvmarg',
	}
	response: {
		user: first_name: Enone,
		last_name: Fabien,
		profile_pic: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/p200x200/13055603_10105219398495383_8237637584159975445_n.jpg?oh=1d241d4b6d4dac50eaf9bb73288ea192&oe=57AF5C03&__gda__=1470213755_ab17c8c8e3a0a447fed3f272fa2179ce'
		locale: 'en_US',
		timezone: 3,
		fbId: 'aedfvbvafabvmarg',
		creationDate: '2011-10-05T14:48:00.000Z'
	}
*/

router.post('/user', createUser.handler);
router.get('/user/:fbId', notFound.userHandler, getUser.handler);
router.get('/user/:fbId/followed', notFound.userHandler, userFollowed.handler);
router.patch('/user/:fbId', notFound.userHandler, updateUser.handler);
/**
	body: {
		me: 'aedfvbvafabvmarg'
	}
	response: {
		ok: true
	}
*/
router.post('/follow/user/:fbId', notFound.userHandler, followUser.handler);
router.post('/unfollow/user/:fbId', notFound.userHandler, unfollowUser.handler);

/**
body: {
	organizer: 'fbId',
	spot: '5a1d63579b4f4b15e4f1ba45', //valid ObjectId
	start: '2011-10-05T14:48:00.000Z', //ISO string
	end: '2011-10-05T15:48:00.000Z'
}
*/
router.post('/session', createSession.handler);
router.patch('/session/:sessionId', notFound.sessionHandler, updateSession.handler);
router.get('/session', getSession.handler);
/**
body: {
	me: 'foobar'
}
response: {
	ok: true
}
*/
router.post('/attend/:sessionId', notFound.sessionHandler, attendSession.handler);
router.post('/neglect/:sessionId', notFound.sessionHandler, neglectSession.handler);

/**
body: {
	location: "Skate Park Antanimena, ancien SAGRO",
	name: "Skate Park"
}
*/
router.post('/spot', createSpot.handler);
/**
body: {
	location: "Skate Park Antanimena, ancien SAGRO",
	name: "Skate Park",
	pics: ['picsUrl']
}
*/
router.patch('/spot/:spotId',notFound.spotHandler, updateSpot.handler);

router.delete('/:type/:id',notFound.handler, deletion.handler);

exports.router = router;
