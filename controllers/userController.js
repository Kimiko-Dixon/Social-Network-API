//Require the ObjectId class and the User and Thought models
const{ObjectId} = require('mongoose').Types
const {User,Thought} = require('../models')

module.exports = {
    //Get users
    async getUsers(req,res) {
        try{
            const users  = await User.find()
            res.status(200).json(users)
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //Get user
    async getUser(req,res) {
        try{
            const user  = await User.findOne({_id:req.params._id})
            //If user not found return 404
            if(!user){
                res.status(404).json('User not found')
                return
            }
            res.status(200).json(user)
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //post user
    async createUser(req,res) {
        try{
            //Check if the username or password is already used in the database
            const isUsername = await User.findOne(
                {
                    username:req.body.username
                }
            )
            const isEmail = await User.findOne(
                {
                    email:req.body.email
                }
            )

            if(isUsername || isEmail){
                res.status(422).json('Username or email address is already in use')
                return
            }
            //Create user
            const newUser = await User.create({
                username:req.body.username,
                email:req.body.email
            })
            res.status(200).json(newUser)
            
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //Update user
    async updateUser(req,res) {
        try{
            const updateUser = await User.findOneAndUpdate(
                {_id: new ObjectId(req.params._id)},
                {$set:{username:req.body.username}},
                {new:true}
            )
            //Check if user exists
            if(!updateUser){
                res.status(404).json('User not found')
                return
            }
            res.status(200).json(updateUser)
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //Delete user
    async deleteUser(req,res) {
        try{
            //Check if user exists
            const deleteUser = await User.findOneAndDelete({_id:req.params._id})
            if(!deleteUser){
                res.status(404).json('User not found')
                return
            }
            //Deletes thoughts by the user
            await Thought.deleteMany({userId:req.params._id})
            res.status(200).json(deleteUser)
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //post friend
    async addFriend(req,res) {
        try{
            const user = await User.findOne({_id:req.params.userId})
            /* const user = await User.findOneAndUpdate(
                {_id:new ObjectId(req.params.userId)},
                {$push:{friends:req.params.friendId}},
                {new:true}
            ) */
            //Check if the friend exists or friend is already added
            if(!user){
                res.status(404).json('User not found')
                return
            }
            else if(user.friends.includes(req.params.friendId)){
                res.status(422).json('This friend was already added')
                return
            }
            //Check if the friend exists
            const friend = await User.findOne({_id:req.params.friendId})
            if(!friend){
                res.status(404).json('Friend not found')
                return
            }
            user.friends.push(req.params.friendId)
            await user.save()

            res.status(200).json(user)
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //delete friend
    async deleteFriend(req,res) {
        try{
            //Check if user exists
            const user = await User.findOne({_id:req.params.userId})
            if(!user){
                res.status(404).json('User not found')
                return
            }
            //Check if friend exists
            else if(!user.friends.includes(req.params.friendId)){
                res.status(404).json('Friend not found')
                return
            }

            //Delete friend
            user.friends.pull(req.params.friendId)
            await user.save()
            res.status(200).json(user)
        }
        catch(err){
            res.status(500).json(err)
        }
    }
}

