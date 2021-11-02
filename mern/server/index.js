const express=require('express');
const cors=require('cors');
const mongoose = require('mongoose');
const jwt=require('jsonwebtoken')
const User=require('./model/user.model')
const bcrypt=require('bcryptjs')
const app=express()
app.use(cors())
app.use(express.json())



mongoose.connect('mongodb://localhost:27017/mern',()=>{
 console.log('CONNECTED TO DB')
})
app.get('/',(req,res)=>{
    res.send('hello');
})
app.post('/api/register',async(req,res)=>{
 console.log(req.body);
 
try{
 req.body.password=await bcrypt.hash(req.body.password,8)
    const user =new User(req.body);

await user.save();
//   res.send(user)
res.status(200).send({user});
}catch(e){
 console.log(e)
 res.send({error:'eroor'})
}
// res.status(200).send({user});
 
})

app.post('/api/login',async(req,res)=>{
    User.findOne({email:req.body.email}).then(user=>{
        if(user){
            const isPasswordValid= bcrypt.compare(req.body.password,user.password).then(vaue=>{
                if(vaue){
                    const token= jwt.sign({email:user.email},'salman')
                     res.send({user,token})
                     }
                     res.send({error:'wrong password'})
            })
           
            
        }else{
            res.send({error:'error'})
        }
    })
   
})


app.get('/api/quote',async (req,res)=>{
    const token =req.headers['x-access-token']
   try{
      const decoded=jwt.verify(token,'salman')
      const email=decoded.email
      const user=await User.findOne({email})
          res.send({'status':'ok','quote':user.quote})
   }catch(e){
console.group(token)
    res.send({'error':'error'})
   }
})

app.post('/api/quote',async (req,res)=>{
    const token =req.headers['x-access-token']
   try{
      const decoded=jwt.verify(token,'salman')
      const email=decoded.email
      const user=await User.updateOne({email},{$set:{quote:req.body.quote}})
          res.send({'status':'ok','quote':user.quote})
   }catch(e){
console.group(e)
console.log(token)
    res.send({'error':'error'})
   }
})

app.listen(3001,()=>{
    console.log('server started !')
})