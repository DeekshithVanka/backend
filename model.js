const mongoose=require("mongoose")
const validator=require("validator")
const { default: isEmail } = require("validator/lib/isEmail")
const userschema={
    username:String,
  
    email:{
        type:String,
        required:true,
       

    },
    password:{
        type:String,
        minlength:[4,"password must be 4 long"],
        required:true

    }
}
const user=mongoose.model("user",userschema)
module.exports=user