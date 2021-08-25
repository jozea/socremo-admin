// //Install express server
// const express = require('express');
// const path = require('path');

// const app = express();

// // Serve only the static files form the dist directory
// app.use(express.static(__dirname + './dist/socremo-admin/'));

// app.get('/*', function(req,res) {
    
// res.sendFile(path.join(__dirname+'/dist/socremo-admin/index.html'));
// });

// // Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);


// //Install express server
// const express = require('express');
// const path = require('path');

// const app = express();

// // Serve only the static files form the dist directory
// app.use(express.static(__dirname + './socremo-admin/dist/'));

// app.get('/*', function(req,res) {
    
// res.sendFile('./socremo-admin/dist//index.html');
// });

// // Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);



//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/accion'));

app.get('/*', function(req,res) {
    
res.sendFile('index.html', {root: '/dist/accion/'});
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);