function func(input) {
  let hash = {};
  let result = 0;
  for (let i = 0; i < input.length; i++) {
    const ele = input[i];
    if (hash[ele]) {
      hash[ele] += 1;
    } else {
      hash[ele] = 1;
    }
  }

  let isOdd = false;
  for (ele in hash) {
    let value = hash[ele];
    if (value % 2 == 0) {
      result += value;
    } else {
      isOdd = true;
      result += value - 1;
    }
  }

  return isOdd ? result + 1 : result;
}

const result = func("bananas");
console.log(result);

// Solution
// To solve this problem, we can use a hashmap to keep track of the frequency of each character in the string. The idea is to use pairs of characters to form the palindrome. For example, if a character appears an even number of times, we can use all of them in the palindrome. If a character appears an odd number of times, we can use all except one of them in the palindrome. Additionally, if there's any character that appears an odd number of times, we can use one of them as the center of the palindrome.

// Initialization: Start by initializing a hashmap to keep track of the characters and their frequencies.

// Character Counting: Iterate through the string and populate the hashmap with the frequency of each character.

// Palindrome Length Calculation: For each character in the hashmap, if it appears an even number of times, add its count to the palindrome length. If it appears an odd number of times, add its count minus one to the palindrome length. Also, set a flag indicating that there's a character available for the center of the palindrome.

// Final Adjustment: If the center flag is set, add one to the palindrome length.

// Algorithm Walkthrough:
// Initialize a HashMap:

// We'll use a hashmap to store the frequency of each character in the string.
// Populate the HashMap:

// For the string "bananas", our hashmap will look like this:
// b: 1
// a: 3
// n: 2
// s: 1
// Determine Palindrome Length:

// We'll iterate through the hashmap to determine the length of the palindrome we can form.
// Even Frequencies:

// For characters with even frequencies, we can use all of them in the palindrome. For our string, the character 'n' has an even frequency.
// 'n' can contribute 2 characters.
// So far, we have a contribution of 2 characters to the palindrome.
// Odd Frequencies:

// For characters with odd frequencies, we can use all but one of them in the palindrome. The central character of the palindrome can be any character with an odd frequency.
// For our string, characters 'b', 'a', and 's' have odd frequencies.
// 'b' can contribute 0 characters (leaving out 1).
// 'a' can contribute 2 characters (leaving out 1).
// 's' can contribute 0 characters (leaving out 1).
// Additionally, one of the characters left out from the odd frequencies can be used as the central character of the palindrome. Let's use 'a' for this purpose.
// So, from the odd frequencies, we have a contribution of 2 characters to the palindrome, plus 1 for the central character.
// Total Length:

// Combining the contributions from even and odd frequencies, we get a total palindrome length of 2 (from even frequencies) + 3 (from odd frequencies) = 5.
// The longest palindrome that can be constructed from "bananas" is of length 5.

// Explanation of Time and Space Complexity
// Time Complexity
// Iterating through the string:

// We go through the entire string once to count the frequency of each character.
// This operation takes O(n) time, where n is the length of the string.
// For example, if the input string is "aabbc", the time complexity for counting the frequencies would be O(5).
// Iterating through the hashmap:

// After counting the frequencies, we iterate through the hashmap to determine how many characters can be used to form a palindrome.
// This operation takes O(k) time, where k is the number of unique characters in the string.
// For example, if the input string has 4 unique characters, the time complexity for iterating through the hashmap would be O(4).
// Combining the two steps:

// The overall time complexity is O(n) + O(k), but since k is <= n, we can simplify it to O(n).
// Space Complexity
// Hashmap for character frequencies:

// The space taken by the hashmap is proportional to the number of unique characters in the string.
// In the worst case, this would be O(26) for the English alphabet, but in general terms, it would be O(k) for k unique characters.
// Overall space complexity:

// Thus, the space complexity of the algorithm is O(1).
// Tailored Explanation Level
// This explanation is tailored to an intermediate level of understanding, assuming familiarity with basic programming concepts and notation. It provides a straightforward breakdown of time and space complexity with relevant examples to aid comprehension.
