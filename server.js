//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + './socremo-admin/dist/'));

app.get('/*', function(req,res) {
    
res.sendFile('./socremo-admin/dist//index.html');
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);