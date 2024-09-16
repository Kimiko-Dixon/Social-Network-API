const {Thought,User,Reaction} = require('../models')
module.exports = {
    //get thoughts
    async getThoughts(req,res) {
        try{
            const thoughts  = await Thought.find({})
            res.status(200).json(thoughts)
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //get thought
    async getThought(req,res) {
        try{
            const thought  = await Thought.findOne({_id:ObjectId(req.body._id)})
            if(!thought){
                res.status(404).json('Thought not found')
                return
            }
            res.status(200).json(thought)
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //post thought
    async createThought(req,res) {
        try{
            const poster = User.findOne({username:req.body.username})
            if(!poster){
                res.status(404).json('Username not found')
                return
            }
            const newThought = Thought.create({
                thoughtText:req.body.thoughtText,
                username:req.body.username
            })

            await User.findOneAndUpdate({_id:poster._id},{$addToSet:newThought._id})
            res.status(200).json(newThought)
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //update thought
    async updateThought(req,res) {
        try{
            const updateThought = await Thought.findOneAndUpdate(
                {_id:ObjectId(req.params._id)},
                {$push:{thoughtText:req.body.thoughtText}},
                {new:true}
            )
            if(!updateThought){
                res.status(404).json('Thought not found')
                return
            }
            res.status(200).json(updateThought)
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //delete thought
    async deleteThought(req,res) {
        try{
            const deleteThought = await Thought.findOneAndDelete({_id:ObjectId(req.params._id)})
            if(!deleteThought){
                res.status(404).json('User not found')
                return
            }
            await User.findOneAndUpdate({username:deleteThought.username},{})
            res.status(200).json(deleteThought)
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //post reaction
    async createReaction(req,res) {
        try{
            const poster = User.findOne({username:req.body.username})
            if(!poster){
                res.status(404).json('Username not found')
                return
            }
            const newReaction = await Thought.findOneAndUpdate(
                {_id:ObjectId(req.params._id)},
                {$addToSet:{reactions:{reactionBody:req.body.reactionBody,username: req.body.username}}},
                {new:true}
            )
            res.status(200).json(newReaction)
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //delete reaction
    async deleteReaction(req,res) {
        try{
            const thought = await Thought.findOne({_id:ObjectId(req.params.thoughtId)})//thoughtId or _id
            if(!thought){
                res.status(404).json('Thought not found')
                return
            }
            thought.reactions.pull({reactionId:ObjectId(req.body.reactionId)})
            res.status(200).json(thought)//return something else
        }
        catch(err){
            res.status(500).json(err)
        }
    }
}