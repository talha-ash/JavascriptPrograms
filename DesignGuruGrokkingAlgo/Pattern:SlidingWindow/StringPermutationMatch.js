function func(input, pattern) {
  let windowStart = 0,
    matched = 0,
    charFrequency = {};
  let resultIndices = [];
  for (let i = 0; i < pattern.length; i++) {
    const chr = pattern[i];
    if (!(chr in charFrequency)) {
      charFrequency[chr] = 0;
    }
    charFrequency[chr] += 1;
  }

  // Our goal is to match all the characters from the 'charFrequency' with the current
  // window try to extend the range [windowStart, windowEnd]
  for (let windowEnd = 0; windowEnd < input.length; windowEnd++) {
    const rightChar = input[windowEnd];
    if (rightChar in charFrequency) {
      // Decrement the frequency of matched character
      charFrequency[rightChar] -= 1;
      if (charFrequency[rightChar] === 0) {
        matched += 1;
      }
    }

    if (matched === Object.keys(charFrequency).length) {
      resultIndices.push(windowStart);
      console.log(resultIndices);
      return true;
    }

    // Shrink the sliding window
    if (windowEnd >= pattern.length - 1) {
      let leftChar = input[windowStart];
      windowStart += 1;
      if (leftChar in charFrequency) {
        if (charFrequency[leftChar] === 0) {
          matched -= 1;
        }
        charFrequency[leftChar] += 1;
      }
    }
  }
  console.log(resultIndices);
  return false;
}

const input = "ac";

const result = func(input, "bb");
console.log(result);

// Solution
// To solve this problem, we use a sliding window technique combined with a hashmap to keep track of character frequencies. The sliding window allows us to check each substring of the input string efficiently. The hashmap stores the count of each character in the pattern. As we slide the window over the string, we compare the character counts of the current window with those in the hashmap. This approach ensures that we only check substrings that are the same length as the pattern, which makes it very efficient.

// The reason this approach is effective is due to its linear time complexity. Instead of generating all possible substrings, we slide a window of fixed size across the string and update our counts dynamically. This reduces the number of comparisons and allows us to quickly determine if a permutation of the pattern exists in the string. It is the most efficient approach as it combines the benefits of the sliding window and hashmap for constant time lookups and updates.

// Step-by-step Algorithm
// Initialization:

// Create a hashmap to store the frequency of each character in the pattern.
// Initialize the windowStart pointer and matchedCount to 0.
// Sliding Window Iterations:

// For each character in the string (using windowEnd as the end pointer):
// Check if the character is in the pattern's frequency map.
// If it is, decrement its count in the map.
// If the character's count in the map reaches 0, increment the matched count.
// If the size of the window exceeds the pattern length:
// Remove the leftmost character (at windowStart) from the window.
// If the leftmost character is in the pattern's frequency map:
// If its count was 0, decrement the matched count.
// Increment the character's count back in the map.
// Check if the matched count equals the number of unique characters in the pattern:
// If it does, return true.
// Algorithm Walkthrough
// Let's go through the algorithm using the example: str = "aaacb", pattern = "abc"

// Initialization:

// Pattern frequency: {a: 1, b: 1, c: 1}
// Window Start: 0
// Matched characters count: 0
// First Iteration (windowEnd = 0):

// Current window: a
// Right character: a
// Updated pattern frequency: {a: 0, b: 1, c: 1}
// matched count: 1 (since a frequency is now 0)
// Second Iteration (windowEnd = 1):

// Current window: aa
// Right character: a
// Updated pattern frequency: {a: -1, b: 1, c: 1}
// matched count: 1 (no change since a frequency is less than 0)
// Third Iteration (windowEnd = 2):

// Current window: aaa
// Right character: a
// Updated pattern frequency: {a: -2, b: 1, c: 1}
// matched count: 1 (no change since a frequency is less than 0)
// windowEnd(2) >= pattern.length() - 1. So, increment windowStart and decrement frequency of str[windowStart] in the map.
// Updated pattern frequency: {a: -1, b: 1, c: 1}
// Fourth Iteration (windowEnd = 3):

// Current window: aaac
// Right character: c
// Updated pattern frequency: {a: -1, b: 1, c: 0}
// matched count: 2 (since c frequency is now 0)
// windowEnd(2) >= pattern.length() - 1. So, increment windowStart and decrement frequency of str[windowStart] in the map.
// Updated pattern frequency: {a: 0, b: 1, c: 0}
// Fifth Iteration (windowEnd = 4):

// Current window: aaacb
// Right character: b
// Updated pattern frequency: {a: 0, b: 0, c: 0}
// matched count: 3 (since b frequency is now 0)
// Since matched count is equal to the size of the pattern (3), return true

// Intermediate Level Explanation: Complexity Analysis
// Time Complexity
// Creating the frequency map: The algorithm first counts the frequency of each character in the pattern. It takes O(M) time, where M is the length of the pattern.
// Sliding window traversal: The algorithm uses a sliding window approach to go through the string. The outer loop runs for each character in the string, so it takes O(N) time, where N is the length of the input string.
// Character frequency updates: For each character in the window, the algorithm updates the frequency and matched count, which takes O(1) time on average.
// Total time complexity: O(N+M), where N is the length of the input string and M is the length of the pattern.

// Space Complexity
// HashMap space: The algorithm uses a hash map to store the character frequencies, requiring O(M) space, where M is the number of unique characters in the pattern.
// Additional variables: The algorithm uses a few extra variables that require constant space.
// Overall space complexity: O(M).

// This algorithm analyzes the time and space complexity of a specific pattern matching approach. It breaks down the time and space involved in creating character frequency maps, traversing through strings using sliding windows, and updating character frequencies. This breakdown provides insights into how the algorithm performs based on the length of the input string and the pattern.

// Using Array With Time O(26.N)
function findAnagrams(s, p) {
  // Create two arrays of size 26 (one for each lowercase letter)
  // We'll use these as frequency counters
  let patternCount = new Array(26).fill(0);
  let windowCount = new Array(26).fill(0);

  // Store the result indices
  let result = [];

  // If the string is shorter than the pattern, no anagrams possible
  if (s.length < p.length) return result;

  // First, count frequencies in the pattern
  for (let i = 0; i < p.length; i++) {
    // Convert character to index (a=0, b=1, etc.)
    patternCount[p.charCodeAt(i) - "a".charCodeAt(0)]++;
    // Count first window of string
    windowCount[s.charCodeAt(i) - "a".charCodeAt(0)]++;
  }

  // Check if first window is an anagram
  if (arraysAreEqual(patternCount, windowCount)) {
    result.push(0);
  }

  // Slide the window through the string
  for (let i = p.length; i < s.length; i++) {
    // Add new character to window
    windowCount[s.charCodeAt(i) - "a".charCodeAt(0)]++;
    // Remove first character of previous window
    windowCount[s.charCodeAt(i - p.length) - "a".charCodeAt(0)]--;

    // Check if current window is an anagram
    if (arraysAreEqual(patternCount, windowCount)) {
      result.push(i - p.length + 1);
    }
  }

  return result;
}

// Helper function to compare arrays
function arraysAreEqual(arr1, arr2) {
  for (let i = 0; i < 26; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
