const express = require('express');

const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

//middleware
// {
//   origin:[
//     'https://job-portal-website-d80f9.web.app',
//     'https://job-portal-website-d80f9.firebaseapp.com'
//   ],
//   credentials: true
// }
app.use(cors({
  origin: [
    // 'http://localhost:5173'
'https://job-portal-website-d80f9.web.app',
'https://job-portal-website-d80f9.firebaseapp.com',
'https://inquisitive-tulumba-ee0976.netlify.app'
],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());



// const uri = "mongodb+srv://<username>:<password>@cluster0.pjjm5f6.mongodb.net/?retryWrites=true&w=majority";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pjjm5f6.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const logger = (req, res, next) => {
  console.log('log: info',req.method, req.url);
  next();
}

const verifyToken =(req,res,next)=>{
  const token = req?.cookies?.token;
  console.log('token in the middleware',token);
  if(!token)
  {
    return res.status(401).send({message: 'unauthorized access'})
  }
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
    if(err)
    {
      return res.status(401).send({message: 'unauthorized access'})
    }
    req.user = decoded;
    next();
  })
}

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const userCollection = client.db('jobPortalDB').collection('user');
    const jobCollection = client.db('jobPortalDB').collection('addJob');
    const bidsCollection = client.db('jobPortalDB').collection('bids');


    app.post('/jwt',logger, async (req, res) => {
      const user = req.body;
      console.log('user for token', user);
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })

      res
        .cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none'

        })
        .send({ success: true });
    })

    app.post('/logout', async (req, res) => {
      const user = req.body;
      console.log('logging out');
      res.clearCookie('token', { maxAge: 0 }).send({ success: true });

    })
    //user api
    app.post('/user', async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    })

    app.get('/user', logger,verifyToken,async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    //addjob
    app.post('/addJob', async (req, res) => {
      const addJob = req.body;
      // console.log(addJob);
      const result = await jobCollection.insertOne(addJob);
      res.send(result);
    })
    app.get('/addJob',async (req, res) => {
      const cursor = jobCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/addJob/:id',logger, verifyToken,async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await jobCollection.findOne(query);
      res.send(result);
    })


    //userBids
    app.post('/bids', async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await bidsCollection.insertOne(user);
      res.send(result);
    })


    app.get('/bids',async (req, res) => {
      const cursor = bidsCollection.find().sort({ status: 1 });
      // console.log('cook cookies', req.cookies);
      const result = await cursor.toArray();
      res.send(result);
    });


    app.put('/bids/:id', async (req, res) => {
      const id = req.params.id;
      const updatedStatus = req.body.status;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const update = { $set: { status: updatedStatus } };
      const result = await bidsCollection.updateOne(filter, update, options);
      res.send(result);
    });



    app.put('/addJob/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updatedJob = req.body;
      const job = {
        $set: {
          title: updatedJob.title,
          deadline: updatedJob.deadline,
          category: updatedJob.category,
          maxPrice: updatedJob.maxPrice,
          minPrice: updatedJob.minPrice,
          description: updatedJob.description
        }
      }

      const result = await jobCollection.updateOne(filter, job, options);
      res.send(result);
    })

    app.delete('/addJob/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await jobCollection.deleteOne(query);
      res.send(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send("server is running...");
});

app.listen(port, () => {
  console.log(` server is running on ${port}`)
})

