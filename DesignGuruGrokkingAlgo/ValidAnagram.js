function func(str1, str2) {
  let sum1 = 0;
  let sum2 = 0;
  if (str1.length != str2.length) {
    return false;
  }
  for (let i = 0; i < str1.length; i++) {
    sum1 = sum1 + str1[i].charCodeAt(0);
    sum2 = sum2 + str2[i].charCodeAt(0);
  }

  return sum1 == sum2;
}

const str = "rat";
const str2 = "car";
const result = func(str, str2);
console.log(result);

//we can also use hashmap technique
//We can use a hash map to store the frequency
// of each character in both strings.

//For each character in the string, the frequency
//of that character in string s is incremented and
// the frequency of that character in string t is
// decremented. After iterating over all characters
// in the strings, we will check if the frequency of
// all characters is 0. If it is, the strings are
// anagrams of each other and the function
// returns true. Otherwise, it returns false.
function isAnagram(s, t) {
  // Check if the lengths of both strings are equal. If not, return false.
  if (s.length !== t.length) {
    return false;
  }

  // Create an object to store the frequency of characters in both strings.
  let freqMap = {};
  for (let i = 0; i < s.length; i++) {
    // Increment the frequency of the character in string s.
    freqMap[s[i]] = (freqMap[s[i]] || 0) + 1;
    // Decrement the frequency of the character in string t.
    freqMap[t[i]] = (freqMap[t[i]] || 0) - 1;
  }

  // Check if the frequency of all characters is 0.
  for (let char in freqMap) {
    if (freqMap[char] !== 0) {
      return false;
    }
  }

  // If all characters have a frequency of 0, this means that 't' is an anagram of 's'.
  return true;
}
