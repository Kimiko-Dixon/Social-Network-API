const{ObjectId} = require('mongoose').Types
const {User} = require('../models')
module.exports = {
    //get users
    async getUsers(req,res) {
        try{
            const users  = await User.find({})
            res.status(200).json(users)
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //get user
    async getUser(req,res) {
        try{
            const user  = await User.findOne({_id:ObjectId(req.body._id)})
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
            //check if correct
            const isUser = await User.find(
                {
                    username:req.body.username,
                    email:req.body.email
                }
            )
            if(isUser){
                res.json('Username or email address is already in use')
                return
            }
            const newUser = await User.create(req.body)
            res.status(200).json(newUser)
            
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //update user
    async updateUser(req,res) {
        try{
            const updateUser = await User.findOneAndUpdate(
                {_id:ObjectId(req.params._id)},
                {$push:{username:req.body.username}},
                {new:true}
            )
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
    //delete user
    async deleteUser(req,res) {
        try{
            const deleteUser = await User.findOneAndDelete({_id:ObjectId(req.params._id)})
            if(!deleteUser){
                res.status(404).json('User not found')
                return
            }
            res.status(200).json(deleteUser)
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //post friend
    async addFriend(req,res) {
        try{

        }
        catch(err){
            res.status(500).json(err)
        }
    },
    //delete friend
    async deleteFriend(req,res) {
        try{
            const user = await User.findOne({_id:ObjectId(req.params.userId)})
            if(!user){
                res.status(404).json('User not found')
                return
            }
            user.friends.pull(ObjectId(req.params.friendId))
            res.status(200).json(user)//return something else
        }
        catch(err){
            res.status(500).json(err)
        }
    }
}

