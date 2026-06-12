require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");
const uri = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('server is running')
})

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {
  
     const db = client.db("hire-loop-cullection");
    const jobsCullection = db.collection("jobs");


app.get('/jobs',async (req,res)=>{

  const query = {}

  if(req.query.companyId){
    query.companyId = req.query.companyId
  }
  if(req.query.status){
    query.status = req.query.status
  }

  const cursor = jobsCullection.find(query)
  const result = await cursor.toArray()
  res.send(result)

})


app.post("/jobs",async (req,res)=>{
    const jobData = req.body
    const result = await jobsCullection.insertOne(jobData)
    res.send(result)
})
   
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})