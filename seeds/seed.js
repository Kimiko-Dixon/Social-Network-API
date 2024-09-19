//Require the database connection, models,and data functions
const connection = require('../config/connection')
const{User,Thought,Reaction} = require('../models')
const {genUsers,genThoughts,addFriends} = require('./data')

connection.once('open', async () => {
    //Drop the collections
    let userCheck = await connection.db.listCollections({name:'users'}).toArray()
    if(userCheck.length){
        await connection.dropCollection('users')
    }
    let thoughtCheck = await connection.db.listCollections({name:'thoughts'}).toArray()
    if(thoughtCheck.length){
        await connection.dropCollection('thoughts')
    }

    //Create users and add to database
    const createUsers = [...genUsers(5)]
    const users = await User.insertMany(createUsers) 
       
    console.log(createUsers)
    console.log(users)
    //Add friends to each user
    for (let i = 0;i<users.length;i++){
        const friends = [...addFriends(users,users[i])]
        await User.findOneAndUpdate({_id:users[i]._id},{friends})
    }
    //Add thoughts to each user
    for (let j = 0;j<users.length;j++){
        const createThoughts = genThoughts(users,users[j])
        console.log(`From seed.js`,createThoughts)
        //Add to database if there are thoughts to add
        if(createThoughts != -1){
            const thoughts = await Thought.insertMany(createThoughts)
            await User.findOneAndUpdate({_id:users[j]._id},{thoughts})
        }
    }

    console.log('Seeding Complete')
    process.exit(0)

})



