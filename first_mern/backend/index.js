const express=require('express');
const app = express();
const mongoose=require('mongoose')
const UserModel  = require('./models/Users')
const cors = require("cors");
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://127.0.0.1:27017/first_mern')
        .then(() => console.log('connected to database'))
        .catch( ()=>console.log("not connected"))


        app.get("",(req,res)=>{
            res.send("helo")
        })

        app.get('/getUsers', (req, res) => {
            UserModel.find().exec().then(result => {
                if (!result) {
                  res.json({ message: 'No users found' });
                } else {
                  res.json(result);
                }
              })
              .catch(err => {
                res.status(500).json({ error: err.message });
              });
          });
          
          app.post("/createUser", async (req, res) => {
            try {
              const user = req.body;
              const newUser = new UserModel(user);
              await newUser.save();
              res.json(newUser);
            } catch (error) {
              console.error(error);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          });

app.listen(3000,()=>{
    console.log('sever started running');
})