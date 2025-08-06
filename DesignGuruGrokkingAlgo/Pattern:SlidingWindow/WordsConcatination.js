function func(input, words) {
  if (!input || !words.length) return [];

  //calcualte length
  const wordLength = words[0].length;
  const totalLength = words.length;
  const wSize = totalLength * wordLength;
  let result = [];

  let wordFreq = {};
  for (let i = 0; i < words.length; i++) {
    wordFreq[words[i]] = (wordFreq[words[i]] || 0) + 1;
  }

  for (let i = 0; i <= input.length - wSize; i++) {
    let seenWord = { ...wordFreq };
    let validWord = 0;

    for (let j = 0; j < totalLength; j++) {
      const startPos = i + j * wordLength;
      const currentWord = input.substring(startPos, startPos + wordLength);

      if (seenWord[currentWord] > 0) {
        seenWord[currentWord] = seenWord[currentWord] - 1;
        validWord++;
      } else {
        break;
      }
    }

    if (validWord == totalLength) {
      result.push(i);
    }
  }
  return result;
}

const input = "barfoothefoobarman";

const result = func(input, ["foo", "bar"]);
console.log(result);

// Solution
// To solve this problem, we need to check every possible starting position in the string where the concatenation of all given words might begin. We will use a sliding window approach. This approach involves creating a window of the size equal to the total length of all words combined and sliding it across the string, one character at a time. For each position of the window, we will check if it contains a valid concatenation of the given words. This method is effective because it reduces the number of unnecessary checks by focusing only on the relevant parts of the string.

// This approach is effective because it systematically checks all possible positions in the string, ensuring no potential concatenation is missed. By using a hashmap to store the frequency of each word in the list and another hashmap to track the words seen in the current window, we can efficiently validate the concatenations.

// Step-by-step Algorithm
// Initialize Data Structures:

// Create a hashmap to store the frequency of each word in the list.
// Create a list to store the starting indices of valid concatenations.
// Set Up Variables:

// Calculate the total number of words (wordsCount).
// Determine the length of each word (wordLength).
// Fill Frequency Map:

// Iterate through the list of words and populate the frequency hashmap with the count of each word.
// Slide the Window:

// Iterate over the string, adjusting the starting position of the window from 0 to str.length() - wordsCount * wordLength.
// Check Each Window:

// For each starting position i, create a hashmap (wordsSeen) to track the words seen in the current window.
// Within the window, iterate through the words:
// Calculate the starting index of the next word in the window (nextWordIndex).
// Extract the word from the string using substring.
// Check if the word exists in the frequency hashmap:
// If it does not exist, break out of the inner loop.
// If it exists, update the wordsSeen hashmap with the count of the word seen.
// If the count of the word in wordsSeen exceeds the count in the frequency hashmap, break out of the inner loop.
// If all words are matched perfectly, add the starting index i to the result list.
// Return Results:

// Return the list of starting indices where valid concatenations are found.
// Algorithm Walkthrough
// Using the example:

// Input:

// String = "catfoxcat"
// Words = ["cat", "fox"]
// Steps:

// Initialize:

// wordFrequencyMap: { "cat": 1, "fox": 1 }
// resultIndices: []
// wordsCount = 2
// wordLength = 3
// totalLength = 2 * 3 = 6
// Sliding Window:

// Iterate from i = 0 to i = str.length() - totalLength = 3

// i = 0:

// Window: "catfox"
// wordsSeen = {}
// j = 0:
// nextWordIndex = 0
// Extracted Word: "cat"
// Update wordsSeen = { "cat": 1 }
// j = 1:
// nextWordIndex = 3
// Extracted Word: "fox"
// Update wordsSeen = { "cat": 1, "fox": 1 }
// All words matched, add index 0 to result list.
// resultIndices: [0]
// i = 1:

// Window: "atfoxc"
// wordsSeen = {}
// j = 0:
// nextWordIndex = 1
// Extracted Word: "atf"
// "atf" is not in the wordFrequencyMap, break.
// resultIndices remains [0]
// i = 2:

// Window: "tfoxca"
// wordsSeen = {}
// j = 0:
// nextWordIndex = 2
// Extracted Word: "tfo"
// "tfo" is not in the wordFrequencyMapp, break.
// resultIndices remains [0]
// i = 3:

// Window: "foxcat"
// wordsSeen = {}
// j = 0:
// nextWordIndex = 3
// Extracted Word: "fox"
// Update wordsSeen = { "fox": 1 }
// j = 1:
// nextWordIndex = 6
// Extracted Word: "cat"
// Update wordsSeen = { "fox": 1, "cat": 1 }
// All words matched, add index 3 to result list.
// resultIndices: [0, 3]
// Output:
// [0, 3]

// Time Complexity
// Building the Frequency Map
// The algorithm first counts how many times each word appears in the given list of words.
// This step takes O(M) time, where M is the total number of words in the list.
// Sliding Window Traversal
// The outer loop goes through the input string, stopping at a point where there are enough characters left to include all the words together.
// This loop runs for O(N - M * L) iterations, where:
// N is the length of the string
// M is the number of words
// L is the length of each word
// Word Matching
// For each starting position in the string, the inner loop checks for a valid sequence of words.
// This loop runs for O(M) iterations, and each iteration takes O(L) time to extract a word and update the frequency map.
// So the total cost of word matching for each starting index is O(M*L).
// Therefore, the overall time complexity is:

// Outer loop: O(N - M * L)
// Inner loop: O(M * L)
// Total time complexity: O((N - M * L) * M * L)
// Overall time complexity: O(N * M * L), where N is the length of the string, M is the number of words, and L is the length of each word.
// Space Complexity
// The algorithm uses two hash maps:
// wordFrequencyMap to store the frequency of each word from the words array, resulting in a space complexity of O(M)
// wordsSeen to store the frequency of words as they are found in the current window of the string, also resulting in a space complexity of O(M)
// The result list stores the starting indices of valid concatenations, potentially having up to N - M * L entries in the worst case.
// Overall space complexity: O(M)
// This explanation is at an intermediate level and provides an understanding of time and space complexity with a specific example relating to the given text.
