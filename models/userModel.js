
var mongoose=require("../config/dbConfig")
var schema =mongoose.Schema
var userSchema = new schema({
  email: String, 
  username: String,
  password:String,
  phone: Number,
  school: String
})
var userModel =mongoose.model("user",userSchema)
module.exports=userModel