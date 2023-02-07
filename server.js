const express = require('express');
const User=require('./models/User');
const connectdb=require('./config/connectdb');

const app = express();
require('dotenv').config({path:"./config/.env"})
console.log(process.env.MONGO_URI)
//GET :  RETURN ALL USERS 
app.get('/users',async(req,res)=>{
    const users = await User.find({});
    res.json(users) 
// or res.send()    
})
// POST :  ADD A NEW USER TO THE DATABASE 
app.post("/user", async (req, res) => {
    try {
      const newUser = new User({
        name: req.body.name,
        age: req.body.age
      });
      await newUser.save();
      res.json({ message: "User added successfully" });
    } catch (error) {
      res.status(400).send(error);
    }
  });

// PUT : EDIT A USER BY ID 
app.put("/user/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        age: req.body.age
      }, {
        new: true
      });
      if (!user)
       return res.status(404).send("The user with the given ID was not found.");
      res.json(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });
    
//  DELETE : REMOVE A USER BY ID 
app.delete("/user/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndRemove(req.params.id)
      if (!user) 
      return res.status(404).send({ error: "User not found" });
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).send(error) 
    }
  })

connectdb()
const port = 5000

app.listen(port, (err) => err?console.log(err):console.log(`app listening on port ${port}!`))