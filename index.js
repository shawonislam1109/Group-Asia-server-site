const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config() ; 
const app = express();

const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) =>
{
    res.send({
        message: 'This server Group aisa connect'
    })
})

const user = process.env.user_name ; 
const password = process.env.user_password ; 


const uri = `mongodb+srv://${user}:${password}@cluster0.5rnuhbi.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    const AdminCollection = client.db('Gropu-Asia').collection('Admin');
    const EmployesCollection = client.db('Gropu-Asia').collection('CreateEmploye');
    try{
        app.get('/admin',async (req, res)=> {
            const query = {} ;
            const result = await AdminCollection.find(query).toArray();
            res.send(result)  ; 
        })
        app.get('/crateEmployes', async(req, res)=> {
            const query = {} ; 
            const  result = await EmployesCollection.find(query).toArray();
            res.send(result) ; 
        })
        app.post('/createEmployes', async (req, res)=>{
            const query = req.body ; 
            const result = await EmployesCollection.insertOne(query)
            res.send(result) 
        })

    }
    finally{

    }
}

run().catch((error)=> console.log(error))


app.listen(port, () =>
{
    console.log(`This server Group aisa is connected port is ${ port }`)
})