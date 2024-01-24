const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// MongoDB functions


app.get('/', (req, res) => {
    res.send('house server is running')
})

app.listen(port, () => {
    console.log(`house Server is running on port: ${port}`)
})