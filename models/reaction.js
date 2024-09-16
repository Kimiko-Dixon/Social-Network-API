const {Schema,Types} = require('mongoose')
import('dateformat')

const reactionSchema = new Schema(
    {
        reactionId:{type:Schema.Types.ObjectId,default: () => new Types.ObjectId()},
        reactionBody:{type:String,required:true,maxlength: 280},
        username:{type:String,required:true},
        createdAt:{type:Date,default:Date.now,get:formatDate},//create getter for formatting
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

module.exports = reactionSchema