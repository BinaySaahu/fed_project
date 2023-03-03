const PORT = 8000;
const express = require("express");
const uri =
  "mongodb+srv://binaysahu364:vMDZTESrmohGbZUU@cluster0.jnz4swj.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.listen(PORT, () => {
  console.log("Server running on port 8000");
});
app.post("/register", async (req, res) => {
    const client = new MongoClient(uri);
    const { name, roll, college} = req.body;
    const generateduserId = uuidv4();  
    try {
      await client.connect();
      const database = client.db("app-data");
      const users = database.collection("users");
      const existingUser = await users.findOne({ roll });
      if (existingUser) {
        res.status(409).send("User already exists,Please login");
        return;
      } else {
        const sanitizedName = name.toLowerCase();
  
        const data = {
          user_id: generateduserId,
          user_name: sanitizedName,
          roll_number:roll,
          college_name:college
        };
        const insertedUser = await users.insertOne(data);
  
        const token = jwt.sign(insertedUser, roll, {
          expiresIn: 60 * 24,
        });
        res.status(201).json({ token, userId: data.user_id });
      }
    } catch (err) {
      console.log(err);
    }
  });
  app.get('/view',async (req,res)=>{
    const client = new MongoClient(uri);
    const userId = req.query.userId;
  
    try{
      await client.connect();
      const database = client.db("app-data");
      const users = database.collection("users");
  
      const query = {user_id:userId};
      const user = await users.findOne(query)
      res.json(user);
  
    }finally{
      await client.close();
    }
  
  })