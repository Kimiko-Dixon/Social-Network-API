const {Schema,model} = require('mongoose')

const userSchema = new Schema({
    username:{type:String,unique:true,required:true,trim:true},
    email:{type:String,unique:true,required:true,match:/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/},//+validation*
    thoughts:[{type:Schema.Types.ObjectId, ref: 'thought'}],
    friends:[{type:Schema.Types.ObjectId, ref: 'user'}]
})

const User = model('user',userSchema)
module.exports = User