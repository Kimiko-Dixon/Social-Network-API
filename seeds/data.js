//Word array
const lorum = [
  "lorem",
  "imsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "curabitur",
  "vel",
  "hendrerit",
  "libero",
  "eleifend",
  "blandit",
  "nunc",
  "ornare",
  "odio",
  "ut",
  "orci",
  "gravida",
  "imperdiet",
  "nullam",
  "purus",
  "lacinia",
  "a",
  "pretium",
  "quis",
];

//Creates an array of a specified number of user objects with a username and email
const genUsers = (num) => {
  const users = [];
  for (let i = 1; i <= num; i++) {
    users.push({ username: `username${i}`, email: `username${i}@email.com` });
  }
  return users;
};

//Generate Reactions
const genReactions = (users, user, rNums) => {
  const reactions = [];
  //Generate a provided number of reactions
  for (let i = 1; i <= rNums; i++) {
    //Generate a random number of words for each reaction
    const randNumWords = Math.floor(Math.random() * 100);
    let reactionBody = "";
    //Create the reaction body
    for (let j = 0; j < randNumWords; j++) {
      const randWordIndex = Math.floor(Math.random() * lorum.length);
      const word = `${lorum[randWordIndex]} `;
      if (reactionBody.length + word.length <= 280) {
        reactionBody += word;
      }
    }
    //Randomly select a user for the reaction
    let username;
    do {
      index = Math.floor(Math.random() * users.length);
      username = users[index].username;
      console.log(username);
      console.log(user);
    } while (username === user.username);

    //Add reaction to the reactions array
    reactions.push({
      reactionBody,
      username,
    });
  }

  return reactions;
};

//Generate thoughts
const genThoughts = (users, user) => {
  //Random number of reactions
  const randNumReactions = Math.floor(Math.random() * 4);
  console.log(user);
  //Generate reactions for the user's thoughts
  const reactions = [...genReactions(users, user, randNumReactions)];
  const thoughts = [];

  //Random number of thoughts
  const randNumThoughts = Math.floor(Math.random() * 6);
  //If the random number is zero return -1
  if (randNumThoughts === 0) {
    return -1;
  }
  const randNumWords = Math.floor(Math.random() * 100) + 1;

  //Create thought text
  for (let j = 0; j < randNumThoughts; j++) {
    let thoughtText = "";
    for (let k = 0; k < randNumWords; k++) {
      const randWordIndex = Math.floor(Math.random() * lorum.length);
      const word = `${lorum[randWordIndex]} `;
      if (thoughtText.length + word.length <= 280) {
        thoughtText += word;
      }
    }

    //Add thought to the thoughts array
    console.log(reactions);
    thoughts.push({
      thoughtText,
      username: user.username,
      userId: user._id,
      reactions: reactions,
    });
  }
  console.log(thoughts);
  return thoughts;
};
//Add Friends
const addFriends = (users, user) => {
  const friends = [];
  //Random number of friends
  const friendNum = Math.floor(Math.random() * users.length);
  for (let i = 0; i < friendNum; i++) {
    let index;
    let newFriend;
    //Select a Random friend that is not the user and is not already added
    do {
      index = Math.floor(Math.random() * users.length);
      newFriend = users[index]._id;
      console.log(newFriend);
    } while (newFriend === user._id || friends.includes(newFriend));
    friends.push(users[index]._id);
  }
  console.log(friends);
  return friends;
};

module.exports = { genUsers, genThoughts, addFriends };
