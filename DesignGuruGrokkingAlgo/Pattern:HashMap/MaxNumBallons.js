function func(input) {
  let hash = {};

  for (let i = 0; i < input.length; i++) {
    const ele = input[i];
    if (hash[ele]) {
      hash[ele] += 1;
    } else {
      hash[ele] = 1;
    }
  }

  hash["o"] = hash["o"] / 2;
  hash["l"] = hash["l"] / 2;

  let min = Infinity;

  for (value in hash) {
    min = Math.min(min, hash[value]);
  }

  return min;
}

const result = func("balloonballoon");
console.log(result);

// Solution
// To solve this problem, you start by creating a hashmap to count the frequency of each letter in the given string. Since the word "balloon" contains specific letters with varying frequencies (like 'l' and 'o' appearing twice), you need to account for these in your hashmap. Once you have the frequency of each letter, the next step is to determine how many times you can form the word "balloon". This is done by finding the minimum number of times each letter in "balloon" appears in the hashmap. The limiting factor will be the letter with the minimum frequency ratio to its requirement in the word "balloon". This approach ensures a balance between utilizing the available letters and adhering to the letter composition of "balloon".

// Character Frequency Count: Traverse the string and populate a hashmap with the frequency count of each character.

// Determine Maximum Count: Check the hashmap to determine the maximum number of times the word "balloon" can be formed. For characters 'b', 'a', and 'n', their frequency in the hashmap directly gives the number of times they can be used. For 'l' and 'o', we need to divide their frequency by 2.

// Result Calculation: The minimum value among the counts of 'b', 'a', 'l'/2, 'o'/2, and 'n' will give the maximum number of times the word "balloon" can be formed.

// Return the Result: Return the calculated minimum value as the final result.

// This approach is effective because it ensures that we account for the frequency of each character required to form the word "balloon". Using a hashmap allows for efficient storage and retrieval of character frequencies.

// Algorithm Walkthrough:

// Given the input string "balloonballoooon":

// Initialize an empty hashmap.
// Traverse the string and populate the hashmap with character frequencies: {'b':2, 'a':2, 'l':4, 'o':5, 'n':2}.
// Calculate the maximum number of times "balloon" can be formed:
// 'b' can be used 2 times.
// 'a' can be used 2 times.
// 'l' can be used 4/2 = 2 times.
// 'o' can be used 5/2 = 2.5 times, but since we need whole words, it's 2 times.
// 'n' can be used 2 times.
// The minimum among these values is 2, which is the final result.
// Here is the visual representation of the algorithm:

// Complexity Analysis
// Time Complexity
// The time complexity of an algorithm tells us how the time taken by the algorithm grows with the size of the input data.

// The given algorithm goes through the input string once to create a hashmap, taking O(n) time, where n is the length of the string.
// After populating the hashmap, the subsequent operations like accessing and updating elements are constant time.
// Therefore, the overall time complexity of the algorithm is O(n), where n is the length of the input string.
// Space Complexity
// The space complexity of an algorithm tells us how much extra space or memory the algorithm requires.

// The space complexity is determined by the size of the hashmap. In the worst case, the hashmap will have an entry for each unique character in the input string.
// However, since the English alphabet has a fixed number of characters, the space complexity is considered O(1), which means it requires a constant amount of extra space regardless of the input size.
// Example
// # Example of time complexity
// input_string = "abcdabcdabcd"
// # The length of the input string is 12, so the algorithm will take O(12) = O(n) time to traverse the string.

// # Example of space complexity
// # Suppose input_string = "abcd"
// # The hashmap will have 4 entries (one for each character), so the space complexity is O(1) because it's constant regardless of the length of the input_string.
