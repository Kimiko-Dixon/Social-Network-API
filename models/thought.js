const {Schema,model} = require('mongoose')
const Reaction = require('./reaction')
import('dateformat')

const thoughtSchema = new Schema(
    {
        thoughtText:{type:String,required:true,minlength:1,maxlength:280},//+validate #of char 
        createdAt:{type:Date,default:Date.now,get:formatDate},//create getter for formatting
        username:{type:String,required:true},
        reactions:[{Reaction}]
    },
    {
        toJSON:{
            getters:true
        },
        id:false 
    }
)

function formatDate(date){
    return dateFormat(date,'mmmm dS, yyyy "at" hh:MM TT') 
}

const Thought = model('thought',thoughtSchema)
module.exports = Thought