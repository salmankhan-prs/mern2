const  express = require("express");

const router=express.Router();
router.use(express.json())
router.use((req,res,next)=>{
    req.demo="salman"
    console.log('router middleware')
    next()
})

router.all('*',(req,res,next)=>{
    req.user="abcd";
    req.id=121;
    console.log(req.ip)
    next();
}

)
router.param('name',(req,res,next,name)=>{
    console.log('id'+name);
    next()
})
router.get('/about/:name/',(req,res)=>{
    res.cookie('name',"salmman",{
        expires: new Date(Date.now() + 19000)
    })
    res.send('HI'+req.demo)
})



module.exports=router