const lorum = [
    'lorem',
    'imsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'curabitur',
    'vel',
    'hendrerit',
    'libero',
    'eleifend',
    'blandit',
    'nunc',
    'ornare',
    'odio',
    'ut',
    'orci',
    'gravida',
    'imperdiet',
    'nullam',
    'purus',
    'lacinia',
    'a',
    'pretium',
    'quis',
];

//Create users
    //create an array of objects with 5 usernames, and email that is the username@hotmail.com
    //for each username generate 3 thoughts* and add the ids to the thoughts array of each user
    //for each username generate a random number between 0 and 4 (number of friends),
        //add friend id to the friends array as long as the friend id is != the user

const genUsers = (num) => {
    const users = []
    for(let i = 1; i<=num;i++){
        users.push({username:`username${i}`,email:`username${i}@email.com`})
    }
    return users
}
//Create reactions(num,username)
    //for each reaction to be created
        //create an empty array
        //--Object--
        //pick random reaction text from the word array and add it to the body
        //add a random username where the reatcionUsername is != username
    //

const genReactions = (users,user,rNums) => {
    const reactions = [];
    for (let i = 1; i <= rNums; i++) {
      const randNumWords = Math.floor(Math.random() * 100);
      let reactionBody = "";
      for (let j = 0; j < randNumWords; j++) {
        const randWordIndex = Math.floor(Math.random() * lorum.length);
        const word = `${lorum[randWordIndex]} `;
        if (reactionBody.length + word.length <= 280) {
          reactionBody += word;
        }
      }
      let username;
      do{
        index = Math.floor(Math.random() * users.length)
        username = users[index].username
        console.log(username)
        console.log(user)
        }
        while( username === user.username)

      // console.log(reactionBody)
      reactions.push({
        reactionBody,
        username
      });
    }
    // console.log(reactions)
    return reactions;
}
//Create thoughts(num,username)
    //for each thought to be created
        //create an empty array
        //--Object--
        //pick random thought text from the word array and add it to the text
        //add the username
        // pick 3 random reaction ids and add to an array

/* const genThoughts = (users) => {
    const allReactions = [...genReactions(users,users.length)]
    // console.log(allReactions)
    const thoughts = []
    // console.log(users.length)
    for(let i = 0; i<users.length;i++){
        const randNumThoughts = Math.floor(Math.random() * 6)
        const randNumReactions = Math.floor(Math.random() * 4)
        const randNumWords = Math.floor(Math.random() * 100) + 1
        // console.log(randNumThoughts,randNumReactions,randNumWords)
        for(let j = 0;j<randNumThoughts;j++){
            let thoughtText = ''
            for(let k = 0;k<randNumWords;k++){
                const randWordIndex = Math.floor(Math.random() * lorum.length)
                const word = `${lorum[randWordIndex]} `
                if((thoughtText.length + word.length) <= 280){
                    thoughtText += word
                }
            }
            const reactions = []
            let tryAgain = 0
            
            for(let l = 0;l<randNumReactions;l++){
                while(allReactions.length != 0){
                    index = Math.floor(Math.random() * allReactions.length)
                    if(allReactions[index].username != users[i].username){
                        const reaction = allReactions[index]
                        reactions.push(reaction)
                        allReactions.splice(index,1)
                    }
                    else{
                        tryAgain++
                        if (tryAgain === 3){
                            break
                        }
                        l--
                    }
                    
                }
            }
            console.log(reactions)
            thoughts.push({
                thoughtText,
                username:users[i].username,
                reactions
            }) 
        }
    }
    return thoughts
} */

const genThoughts = (users,user) => {
    const randNumReactions = Math.floor(Math.random() * 4)
    console.log(user)
    const reactions = [...genReactions(users,user,randNumReactions)]
    const thoughts = []
    // console.log(users.length)
        const randNumThoughts = Math.floor(Math.random() * 6)
        if(randNumThoughts === 0){
            return -1
        }
        const randNumWords = Math.floor(Math.random() * 100) + 1
        // console.log(randNumThoughts,randNumReactions,randNumWords)
        for(let j = 0;j<randNumThoughts;j++){
            let thoughtText = ''
            for(let k = 0;k<randNumWords;k++){
                const randWordIndex = Math.floor(Math.random() * lorum.length)
                const word = `${lorum[randWordIndex]} `
                if((thoughtText.length + word.length) <= 280){
                    thoughtText += word
                }
                /* console.log(thoughtText)
                console.log(`char length: ${thoughtText.length}`) */
            }

            console.log(reactions)
            thoughts.push({
                thoughtText,
                username:user.username,
                reactions:reactions
            }) 
            
        }
    console.log(thoughts)
    return thoughts
}

/* const addFriends = users => {
    users.forEach(user => {
        const friends = []
        const userIndex = users.indexOf(user)
        const friendNum = Math.floor(Math.random() * users.length)
        for (let i = 0; i<friendNum;i++){
            let index;
            do{
                index = Math.floor(Math.random() * users.length)
            }
            while(userIndex === index)
            friends.push(users[index]._id)
        }
        users.friends = friends 
    })
    return users
    
} */

    const addFriends = (users,user) => {
            const friends = []
            const friendNum = Math.floor(Math.random() * users.length)
            for (let i = 0; i<friendNum;i++){
                let index;
                let newFriend;

                do{
                    index = Math.floor(Math.random() * users.length)
                    newFriend = users[index]._id
                    console.log(newFriend)
                }
                while( newFriend === user._id || friends.includes(newFriend))
                friends.push(users[index]._id)
            } 
        console.log(friends)
        return friends
    }


module.exports = {genUsers,genThoughts,addFriends}