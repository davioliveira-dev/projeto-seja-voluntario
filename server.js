//Imports
const express = require('express');
const bodyParser = require('body-parser');
const routers = require('./src/routers');
const apiRouters = require('./src/apiRouters');

//Instance of the 'Express' framework
const app = express();

// Configuring view layer
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.set('views', __dirname + '/src/views');

//Configuring static content
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//Configuring the request body

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Application routes
app.use(routers);
app.use('/api', apiRouters);

//Listening to port 3000
app.listen(3000, () => console.log('Projeto rodando na porta 3000'));
