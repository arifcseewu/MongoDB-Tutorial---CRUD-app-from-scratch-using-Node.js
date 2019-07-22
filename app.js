const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const path = require('path');

const db = require('./db');
const collection = 'todo';



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getTodos', (req, res) => {
    db.getDB().collection(collection).find({}).toArray((err, document) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log(document);
            res.json(document);
        }
    });
})

db.connect((err) => {
    if(err) {
        console.log('Unable to connect to database');
        process.exit(1);
    }
    else {
        app.listen(3000, () => {
            console.log('Connected to the database, App listening to post 3000');
        });
    }
})

