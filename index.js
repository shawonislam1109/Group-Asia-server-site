const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const ApplicationCollection = client.db('Gropu-Asia').collection('Application');
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
        app.post('/createEmploye', async (req, res)=>{
            const query = req.body ; 
            const result = await EmployesCollection.insertOne(query)
            res.send(result) 
        })
        app.delete('/deleteEmploye/:id', async(req, res)=>{
            const id = req.params.id ;
            const query = {_id : ObjectId(id)} ;
            const result = await EmployesCollection.deleteOne(query) ;
            res.send(result) ; 
        })
        app.delete('/deleteApplication/:id', async (req, res)=>{
            const id = req.params.id ; 
            const query = {_id : ObjectId(id)} ; 
            const filter = await ApplicationCollection.deleteOne(query) ; 
            res.send(filter) ; 
        })
        app.post('/application', async (req, res)=>{
            const query = req.body; 
            const result = await ApplicationCollection.insertOne(query) ;
            res.send(result)
        })
        app.put('/updateapplication/:id', async(req, res)=>{
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const updateDAta = req.body;
            const options = { upsert: true }
            const updateDoc = {
                $set: {
                    date : updateDAta.date ,
                    application : updateDAta.application,
                }
            }
            const result = await ApplicationCollection.updateOne(filter, updateDoc, options)
            res.send(result) ; 
        })
        app.get('/application', async (req, res)=>{
            const query = {} ; 
            const result = await ApplicationCollection.find(query).toArray() ; 
            res.send(result) ; 
        })
        app.get('/application/:id', async(req, res)=>{
            const id = req.params.id ; 
            const filter = {_id: ObjectId(id)}
            const result = await ApplicationCollection.findOne(filter) ;
            res.send(result)
        })
        app.get('/application', async (req, res)=> {
            const email = req.query.email ; 
            const query = {email : email }
            const result = await ApplicationCollection.findOne(query)
            res.send(result) ; 
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