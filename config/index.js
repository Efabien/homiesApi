module.exports = {
	port: process.env.PORT || 2022,
	host: process.env.HOST || `http://localhost:${this.port}`,
	authorization: process.env.RESTIFEO_AUTH_TOKEN,
	mongoString: process.env.MONGO_STRING || 'mongodb://localhost/homies'
}
