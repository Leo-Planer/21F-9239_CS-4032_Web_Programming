// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;
const mongoURI = 'mongodb://localhost:27017/mydatabase';

// Body parser middleware 
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the public directory
app.use(express.static('public'));

// MongoDB Client
const MongoClient = mongodb.MongoClient;
let db;

MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB');
        db = client.db('Users'); // Update the database name

        // Start the server
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email } = req.body;

    // Insert into MongoDB collection
    const collection = db.collection('customers'); // Update the collection name
    collection.insertOne({ name, email })
        .then(result => {
            console.log('Data inserted:', result.ops[0]);
            res.send('Data inserted successfully!');
        })
        .catch(err => {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
        });
});
