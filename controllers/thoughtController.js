const{ObjectId} = require('mongoose').Types
const {Thought,User,Reaction} = require('../models')
module.exports = {
    //Get thoughts
    async getThoughts(req,res) {
        try{
            const thoughts  = await Thought.find()
            res.status(200).json(thoughts)
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },
    //Get thought
    async getThought(req,res) {
        try{
            const thought  = await Thought.findOne({_id:req.params._id})

            //If thought not found return 404
            if(!thought){
                res.status(404).json('Thought not found')
                return
            }
            res.status(200).json(thought)
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },
    //Post thought
    async createThought(req,res) {
        try{
            //Check if the poster for the thought exists
            const poster = await User.findOne({_id:req.body.userId})
            if(!poster){
                res.status(404).json('Poster not found')
                return
            }
            //Create thought
            const newThought = await Thought.create({
                thoughtText:req.body.thoughtText,
                username:req.body.username,
                userId:req.body.userId
            })
            //Add thought to the thoughts array of the user
            await User.findOneAndUpdate({_id:poster._id},{$addToSet:{thoughts:newThought._id}},{new:true})//change to other method
            res.status(201).json(newThought)
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },
    //update thought
    async updateThought(req,res) {
        try{
            const updateThought = await Thought.findOneAndUpdate(
                {_id:new ObjectId(req.params._id)},
                {$set:{thoughtText:req.body.thoughtText}},
                {new:true}
            )
            //If thought does not exist return 404
            if(!updateThought){
                res.status(404).json('Thought not found')
                return
            }
            res.status(200).json(updateThought)
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },
    //delete thought
    async deleteThought(req,res) {
        try{
            const deleteThought = await Thought.findOneAndDelete({_id:req.params._id})
            //If thought does not exist return 404
            if(!deleteThought){
                res.status(404).json('Thought not found')
                return
            }
            //Deletes the thought from the thoughts array of the user
            const user = await User.findOne({_id:deleteThought.userId})
            user.thoughts.pull(deleteThought._id)
            await user.save()

            res.status(200).json(deleteThought)
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //post reaction
    async createReaction(req,res) {
        try{
            //Check if the poster for the thought exists
            const poster = await User.findOne({username:req.body.username})
            if(!poster){
                res.status(404).json('Username not found')
                return
            }
            //Check if the thought exists
            const thought = await Thought.findOne({_id:req.params.thoughtId})
            if(!thought){
                res.status(404).json('Thought not found')
                return
            }

            //Add reaction to the thought's reaction array
            thought.reactions.push({reactionBody:req.body.reactionBody,username:req.body.username})
            await thought.save()
            res.status(200).json(thought)
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },
    //Delete reaction
    async deleteReaction(req,res) {
        try{
            //Check if the thought or reaction exists
            const thought = await Thought.findOne({_id:req.params.thoughtId})
            if(!thought){
                res.status(404).json('Thought not found')
                return
            }
            else if(!thought.reactions.includes({_id:req.params.reactionId})){
                res.status(404).json('Reaction not found')
                return
            }

            //Deletes reaction from the reactions array
            thought.reactions.pull({_id:req.params.reactionId})
            await thought.save()
            
            res.status(200).json(thought)
        }
        catch(err){
            res.status(500).json(err)
        }
    }
}