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
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nowshinkhan.c8ljhxf.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const houseUserCollection = client.db('houseRental').collection('houseUser');
    const houseCollection = client.db('houseRental').collection('houseDB');

    
    app.get('/houseDB/:id', async(req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await houseCollection.findOne(query);
        res.send(result);
    })
  
  
  
      app.post('/houseDB', async(req, res) =>{
        const newHouse = req.body;
        console.log(newHouse);
        const result = await houseCollection.insertOne(newHouse)
        res.send(result);
      })
  
      app.delete('/houseDB/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }
        const result = await houseCollection.deleteOne(query);
        res.send(result);
    })
  
    app.put('/houseDB/:id', async(req, res) =>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const options = { upsert: true };
      const updateHouse =req.body;
      const house = {
        $set:{
          name: updateHouse.name,
          address: updateHouse.address,
          city: updateHouse.city,
          bedroom: updateHouse.bedroom,
          room: updateHouse.room,
          rent: updateHouse.rent,
          phone: updateHouse.phone,
          avaible: updateHouse.avaible,
          details: updateHouse.details,
          picture: updateHouse.picture
        }
      }
  
      const result = await houseCollection.updateOne(filter, house, options)
      res.send(result);
    })
  

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('house server is running')
})

app.listen(port, () => {
    console.log(`house Server is running on port: ${port}`)
})