const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


// Rest API declaration....
const api = require('./server/routes/api');
const fileroutes = require('./server/routes/file');
const payment = require('./server/routes/payment');


// Declaration of bodyParser for text and json data....
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// API Location.....
app.use('/file',fileroutes);
app.use('/api', api);
app.use('/payment',payment);

//Declare the static folder where all the angular code displayed..
app.use(express.static(path.join(__dirname, 'dist/practice')));
//app.use(express.static(path.join(__dirname, 'buzoni')));



// Declare the any route location for path
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/practice/index.html'));
   // res.sendFile(path.join(__dirname, 'buzoni/buzoni.html'));
});


// port listenning

const port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log(" Server running on localhost : " + port);
});


