const {Schema,model} = require('mongoose')
const Reaction = require('./reaction')
const date = require('date-and-time')
const ordinal = require('date-and-time/plugin/ordinal')
const meridiem = require('date-and-time/plugin/meridiem')

date.plugin(ordinal)
date.plugin(meridiem)

const thoughtSchema = new Schema(
    {
        thoughtText:{type:String,required:true,minlength:1,maxlength:280},
        createdAt:{type:Date,default:Date.now,get:formatDate},
        username:{type:String,required:true},
        reactions:[Reaction],
        userId:{type:Schema.Types.ObjectId, ref: 'user'}
    },
    {
        toJSON:{
            getters:true,
            virtuals:true
        },
        id:false 
    }
)

function formatDate(today){
    return date.format(today,'MMM DDD, YYYY [at] hh:mm a') 
}

thoughtSchema.virtual(`reactionCount`).get(function(){
    return this.reactions.length
})

const Thought = model('thought',thoughtSchema)
module.exports = Thought