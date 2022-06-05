const express = require('express');

const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

// use middlewere
app.use(cors());
app.use(express.json());
// dbuser2
// UbxHv6WQr3Bv62rG




const uri = "mongodb+srv://dbuser2:UbxHv6WQr3Bv62rG@cluster0.tjo1e.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        await client.connect();
        const userCollection = client.db("foodexpress").collection("users");
            // get user
        app.get('/users', async(req,res)=>{
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send({users})
        })
        // get user
            // post add a newuser
        app.post('/user' , async(req,res)=>{
            const newUser = req.body;
            console.log(newUser);
            const result = await userCollection.insertOne(newUser);
            res.send({result})
             // post add a newuser

            
            
        })


        app.delete('/users/:id', async(req , res)=>{
            const id = req.params.id;
            const query = { _id: ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            res.send(result);

        })

        // specific user
        app.get('/users/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await userCollection.findOne(query);
            res.send(result)
        })
    }
    finally{

    }

}
run().catch(console.dir);
    





app.get('/', (req , res)=>{
    res.send('Running My node Crud Server')

});

app.listen(port , ()=>{
    console.log('CRUD SERVER IS RUNNING',port);
})