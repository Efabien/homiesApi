const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth.js');
const routes = require('./routes');
const config = require('./config');

//setting port
app.set('port', config.port);

//parse data from post
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//allowing cross origin ressources
app.use(cors());

//auth
app.use(auth);

app.use(routes.router);
//spinning the server
app.listen(app.get('port'), () => {
    console.log('running on port', app.get('port'))
});
