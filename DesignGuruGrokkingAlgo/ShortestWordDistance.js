function func(words, word1, word2) {
  let index1 = null;
  let index2 = null;
  let min = words.length;

  for (let i = 0; i < words.length; i++) {
    const ele = words[i];

    if (ele == word1 && index2 == null) {
      index1 = i;
    } else if (ele == word1 && index2 != null) {
      index1 = i;
      const diff = Math.abs(index1 - index2);
      min = min < diff ? min : diff;
    } else if (ele == word2 && index1 == null) {
      index2 = i;
    } else if (ele == word2 && index1 != null) {
      index2 = i;
      const diff = Math.abs(index1 - index2);
      min = min < diff ? min : diff;
    }
  }

  return min;
}

const words = ["a", "c", "d", "b", "a"];
const word1 = "a";
const word2 = "b";
const result = func(words, word1, word2);
console.log(result);

//each iteration we find the distance between word
// compare it previous one and select the min
//

function shortestDistance(words, word1, word2) {
  let shortestDistance = words.length; // Initialize the shortest distance with the length of the words list
  // Initialize the positions of word1 and word2 with -1
  let position1 = -1;
  let position2 = -1;

  for (let i = 0; i < words.length; i++) {
    if (words[i] === word1) {
      // If the current word is word1, update the position1
      position1 = i;
    } else if (words[i] === word2) {
      // If the current word is word2, update the position2
      position2 = i;
    }
    // If both the positions are updated, update the shortest distance
    if (position1 !== -1 && position2 !== -1) {
      shortestDistance = Math.min(
        shortestDistance,
        Math.abs(position1 - position2),
      );
    }
  }
  return shortestDistance;
}

// To find the shortest distance between two given words, we can iterate
// through the list of words and use two pointers to track the positions
// of these words. Whenever we find one of these words in the list, we
// will update the word's position and calculate the distance from the
// other word. This way, we will keep track of the shortest distance
// between the two words.

// Here's how the algorithm will work:

// Initialize two variables position1 and position2 to store the positions
// of word1 and word2 in the words list, respectively. Initialize these
// variables to -1 which means that the words haven't been found yet.

// Initialize a variable shortestDistance with the length of the words
// list as the initial value. This value will be updated later in the loop
// as the shortest distance is found.

// Loop through the words list and for each word, check if it is word1
// or word2. If it is word1, update position1 with the current index. If
// it is word2, update position2 with the current index.

// If both position1 and position2 have been updated, that means both
// word1 and word2 have been found in the words list. In this case,
// update the shortestDistance with the absolute difference of the
// positions of word1 and word2.

// Repeat steps 3 and 4 until the end of the words list is reached.

// Return the final value of shortestDistance as the result.
