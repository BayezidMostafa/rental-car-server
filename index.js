const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

// Middleware
app.use(cors())
app.use(express.json())



const uri = process.env.DB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async() => {
    try{
        const carCollection = client.db('resellcar').collection('cardata');
        app.get('/cars', async(req, res) => {
            const query = {};
            const result = await carCollection.find(query).toArray();
            res.send(result);
        })
    }
    catch{}
    finally{}
}

run().catch(error => console.error(error))

app.get('/', (req, res) => {
    res.send('Server is running')
})

app.listen(port, () => {
    console.log(`Rental Car Server Is Running On Port: ${port}`);
})