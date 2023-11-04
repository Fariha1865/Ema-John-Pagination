const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;

//middleware


app.use(express.json());
app.use(cookieParser());

const corsOptions={
    origin:'http://localhost:5173',
    credentials:true,
    optionSuccessStatus:200,
}

app.use(cors(corsOptions));

const verifyToken = (req, res, next)=>{
    const token = req?.cookies?.token;
    

    if(!token)
    {
        return res.status(401).send({message: 'Unauthorized Access'});
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
        if(err){
            return res.status(401).send({message: 'Unauthorized Access'});
        }
        console.log(token)
        req.user = decoded;
        next();

    })
    
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5jqcqmr.mongodb.net/?retryWrites=true&w=majority`;

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

        const database = client.db("Car_Doctor");
        const servicesCollection = database.collection("services");
        const bookingsCollection = database.collection("orders");
        // let cartProductsCollection;

        app.post("/jwt", async (req, res) => {

            const user = req.body;
            console.log("logging In"+JSON.stringify(user));


            const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1h'});


            res.cookie('token',token,{

                httpOnly: true,
                secure: true,
                sameSite: 'none'
            })
            .send({success:true});

        })
        app.post("/logout", async (req, res) => {

            const user = req.body;
            console.log("logging out"+user);

            res.clearCookie('token',{maxAge:0}).send({success:true});

        })
        app.get("/services", async (req, res) => {

            const cursor = servicesCollection.find();
            const result = await cursor.toArray();
            res.send(result)

        })
        app.get("/bookings",verifyToken, async (req, res) => {

            console.log(req.query.email);
            console.log('token owner info', req.user)
            if(req.user?.email !== req.query?.email){
                return res.status(403).send({message: 'forbidden access'})
            }
            let query = {};
            if (req.query?.email) {
                query = { email: req.query.email }
            }
            const cursor = bookingsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)

        })
        app.get("/service/:id", async (req, res) => {

            console.log("get id: ", req.params.id)
            const getServiceDetails = req.params.id;

            const query = { _id: new ObjectId(getServiceDetails) }
            const options = {
                // Include only the `title` and `imdb` fields in the returned document
                projection: { title: 1, price:1 ,img:1},
              };

            const result = await servicesCollection.find(query,options).toArray();
            res.send(result);
        })
        // app.get("/productDetails/:productId", async (req, res) => {


        //     const getProductDetails = req.params.productId;

        //     const query = { _id: new ObjectId(getProductDetails) }

        //     const result = await brandProductsCollection.find(query).toArray();
        //     res.send(result);
        // })
        // app.get("/updateProducts/:id", async (req, res) => {


        //     console.log(req.params.id)
        //     const getProductDetails = req.params.id;

        //     const query = { _id: new ObjectId(getProductDetails) }

        //     const result = await brandProductsCollection.find(query).toArray();
        //     res.send(result);
        // })


        app.post("/order", async (req, res) => {

            const orderCollection = database.collection("orders");
            console.log('Inside post hitting')
            // console.log(req.body);


            const service = req.body;
            const result = await orderCollection.insertOne(service);
            res.send(result);

            console.log(result);

        })
        // app.post("/cartProducts/:userEmail", async (req, res) => {

        //     // console.log(req.params.userEmail)
            
          
        //     try {
        //         cartProductsCollection = database.collection(`cartProducts${req.params.userEmail}`);



        //         const product = req.body;
        //         const result = await cartProductsCollection.insertOne(product);
        //         res.send(result);
        //     } catch (error) {
        //         res.status(500).json({ errorCode: error.code, errorMessage: error.message });
        //     }



        // })
        // app.get("/cart/:userEmail", async (req, res) => {

        //     const cartProductsCollection = database.collection(`cartProducts${req.params.userEmail}`);


        //     const query = { email: req.params.userEmail }

        //     const result = await cartProductsCollection.find(query).toArray();
        //     console.log(result)
        //     res.send(result)

        // })

        // app.put("/productUpdate/:id", async (req, res) => {

        //     const updatedProductId = req.params.id;
        //     const updated = req.body;

        //     console.log("user to update", updatedProductId)
        //     console.log("user to update", updated)

        //     const filter = { _id: new ObjectId(updatedProductId) }

        //     const options = { upsert: true };

        //     const updateProduct = {
        //         $set: {
        //             name: updated.name,
        //             brand: updated.brand,
        //             photo: updated.photo,
        //             price: updated.price,
        //             type: updated.type,
        //             rating: updated.rating,
        //             description: updated.description,
        //         },
        //     };

        //     const result = await brandProductsCollection.updateOne(filter, updateProduct, options);

        //     res.send(result);
        // })

        // app.delete("/product/:id", async (req, res) => {
        
           
        //         const deleteProduct = req.params.id;
        //         const query = { _id: deleteProduct };
        
        //         const result = await cartProductsCollection.deleteOne(query);
        //         res.send(result)
        
                
            
        // });
        








        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("Car-Doctor server is running");
})


app.listen(port, () => {

    console.log(`server is running on port ${port}`)
})