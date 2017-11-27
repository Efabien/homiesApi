const express=require('express');
const router = express.Router();

const Models = require('../models');
const User = Models.User;

const UserService = require('../modules/user-services');
const userService = new UserService(User);

const CreateUserRoute = require('./api/create-user-route');
const GetUserRoute = require('./api/get-user-route');
const UserFollowedRoute = require('./api/user-followed-route');
const FollowUserRoute = require('./api/follow-user-route');
const UnfollowUserRoute = require('./api/unfollow-user-route');
const UpdateUserRoute = require('./api/update-user-route');

const createUser = new CreateUserRoute(userService);
const getUser = new GetUserRoute(userService);
const userFollowed = new UserFollowedRoute(userService);
const followUser = new FollowUserRoute(userService);
const unfollowUser = new UnfollowUserRoute(userService);
const updateUser = new UpdateUserRoute(userService);

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
router.get('/user/:fbId', getUser.handler);
router.get('/user/:fbId/followed', userFollowed.handler);
router.patch('/user/:fbId', updateUser.handler);
/**
	body: {
		fbId: 'aedfvbvafabvmarg'
	}
	response: {
		ok: true
	}
*/
router.post('/follow/user/:followedId', followUser.handler);
router.post('/unfollow/user/:followedId', unfollowUser.handler);

exports.router = router;
