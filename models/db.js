const mongoose = require('mongoose');
mongoose.promise = require('bluebird');
const config = require('../config');
mongoose.connect(config.mongoString, { useMongoCLient: true });

mongoose.connection.on('error', e => console.log(e.message));
mongoose.connection.on('connected', () => console.log(`Connected to ${config.mongoString}`));

module.exports = mongoose;
