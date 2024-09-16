const connection = require('../config/connection')
const{User,Thought,Reaction} = require('../models')
const {genUsers,genThoughts,addFriends} = require('./data')

connection.once('open', async () => {

    let userCheck = await connection.db.listCollections({name:'users'}).toArray()
    if(userCheck.length){
        await connection.dropCollection('users')
    }
    let thoughtCheck = await connection.db.listCollections({name:'thoughts'}).toArray()
    if(thoughtCheck.length){
        await connection.dropCollection('thoughts')
    }

    const createUsers = [...genUsers(5)]
    const users = await User.insertMany(createUsers) 
       
    // const createThoughts = [...genThoughts(users)]
    // const thoughts = await Thought.insertMany(createThoughts)
    // const friends = [...addFriends(users)]
    console.log(createUsers)
    console.log(users)
    for (let i = 0;i<users.length;i++){
        const friends = [...addFriends(users,users[i])]
        //$addToSet?
        await User.findOneAndUpdate({_id:users[i]._id},{friends})
    }
    for (let j = 0;j<users.length;j++){
        const createThoughts = genThoughts(users,users[j])
        console.log(`From seed.js`,createThoughts)
        if(createThoughts != -1){
            const thoughts = await Thought.insertMany({createThoughts})
            await User.findOneAndUpdate({_id:users[j]._id},{thoughts})
        }
    }
    /* await User.updateMany({friends:undefined},{friends}) 
    await User.updateMany({thoughts:undefined},{thoughts}) */

    /* console.table(users)
    console.table(thoughts) 
    console.log(createUsers)*/
    console.log('Seeding Complete')
    process.exit(0)

})



