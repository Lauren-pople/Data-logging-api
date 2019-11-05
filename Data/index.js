const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log("listening at port 3000")); // calls terminal host 
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db'); // stores the data collected in data base 
database.loadDatabase();

app.post('/api', (request, response) => { // api
    const data = request.body; 
    const timestamp = Date.now(); //timestamp is today's date
    data.timestamp = timestamp; // creates timestamp
    database.insert(data); // data from db is inserted into api
    response.json(data); 
});


app.get('/api', (request, response) => { // displays api
    database.find({}).sort({timestamp: 1}).limit(999).exec(function (err,docs){ // finds and then sorts the data by timestamp going up in the value 1
        if (err) {
            console.log(err);
            response.end();
            return;
        }
        response.json(docs); 
    });
});
