const  express = require("express");


const app=express();
app.use('/api',require ('./aboutRoute'))
const doSome=(req,res,next)=>{
    console.log("Middle ware called ..");
    req.requestTime= Date.now().toString();
    next()
   
}
app.get('/',doSome,(req,res)=>{
    res.send('HI'+ req.requestTime)
})
// app.get('/xz?y',doSome,(req,res)=>{
//     res.send('Hi ')
// })
app.get('/user/:id/books/:bId',(req,res)=>{
    const {id,bId}=req.params;
    res.send({id,bId})
})
// console.log( express.application)

app.route('/demo')
.get((req,res)=>{
    res.end('cnncfdrcnb');
})
app.listen(3000,()=>{
    console.log('salman khan ')
})
