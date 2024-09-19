const {Schema,Types} = require('mongoose')
const date = require('date-and-time')
const ordinal = require('date-and-time/plugin/ordinal')
const meridiem = require('date-and-time/plugin/meridiem')

date.plugin(ordinal)
date.plugin(meridiem)

const reactionSchema = new Schema(
    {
        /* reactionId:{type:Schema.Types.ObjectId,default: () => new Types.ObjectId()}, */
        reactionBody:{type:String,required:true,maxlength: 280},
        username:{type:String,required:true},
        createdAt:{type:Date,default:Date.now,get:formatDate},
    },
    {
        toJSON:{
            getters:true
        },
        id:false 
    },
)
function formatDate(today){
    return date.format(today,'MMM DDD, YYYY [at] hh:mm a') 
}

module.exports = reactionSchema