const dotenv=require('dotenv').config()

const mongoose=require("mongoose")
const express=require("express")
const hbs=require("hbs");
const app=express();
const port=process.env.PORT || 8000
const path=require("path")






mongoose.connect(process.env.MONGODB_URL)
.then(console.log("connectd mongoatlas"))
.catch((err)=>
{
    "error"
})
const userschema={
    username:String,
  
    email:{
        type:String,
        required:true,   

    },
    password:{
        type:String,
       required:true

    }
}
const user=mongoose.model("user",userschema)

app.use(express.json())
app.use(express.urlencoded({extended:true}))



const viewpath=path.join(__dirname,"./views")
const partialpath=path.join(__dirname,"./views/partials")

app.set("view engine","hbs")
app.set("views",viewpath)

hbs.registerPartials(partialpath)

app.get("/",(req,res)=>{
    res.render('index')
})
app.post("/register",async (req,res)=>
{
    try{
        
        const schemuser=new user({
            username : req.body.username,
            email:  req.body.email,
            password:req.body.password
         })
        const registered=await schemuser.save()
        res.status(201).render('end')
   
       }
       catch(err)
       {
           res.status(400).send(err)
       }
})


app.listen(port,()=>
{
    console.log("port is running success");
})