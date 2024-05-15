require("dotenv").config()

const express=require("express")
const hbs=require("hbs");
const app=express();
const port=process.env.PORT || 8000
const path=require("path")
const user=require("./model")

const mongodburl=process.env.MONGODB_URL;

mongoose.connect("mongodburl")
.then(console.log("connectd mongoatlas"))
.catch((err)=>
{
    "error"
})

app.use(express.urlencoded({extended:false}))



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
           res.status(400).send("no")
       }
})


app.listen(port,()=>
{
    console.log("port is running success");
})