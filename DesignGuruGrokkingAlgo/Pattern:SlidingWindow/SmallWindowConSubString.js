function func(input, pattern) {
  let windowStart = 0,
    matched = 0,
    charFrequency = {};
  let minLength = Infinity;
  let startIndex = 0;
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
      // !!!important
      if (charFrequency[rightChar] >= 0) {
        matched += 1;
      }
    }

    // if (matched === Object.keys(charFrequency).length) {
    //   resultIndices.push(windowStart);
    //   console.log(resultIndices);
    //   return true;
    // }

    while (matched === pattern.length) {
      if (minLength > windowEnd - windowStart + 1) {
        minLength = windowEnd - windowStart + 1;
        startIndex = windowStart;
      }

      let leftChar = input[windowStart];
      windowStart++;
      if (leftChar in charFrequency) {
        if (charFrequency[leftChar] === 0) {
          matched--;
        }
        charFrequency[leftChar] += 1;
      }
    }
  }

  if (minLength > input.length) {
    return "";
  }

  return input.substring(startIndex, startIndex + minLength);
}

const input = "aabdec";

const result = func(input, "abc");
console.log(result);

// Solution
// To solve this problem, we use the sliding window technique. This approach helps us dynamically adjust the range of the substring we're considering. We start with two pointers, one at the beginning and another that expands to include new characters. As we move the right pointer to include characters, we check if the current window contains all the characters from pattern in the required frequency. Once it does, we try to shrink the window from the left to find the smallest possible window. This method is efficient because it avoids redundant calculations by reusing information from the previous state.

// This approach is effective because it ensures that each character in s is processed at most twice (once by each pointer), resulting in a linear time complexity relative to the length of s. The space complexity is manageable, as we only store the frequency of characters in a hash map. This guarantees that the solution is both time and space efficient.

// Step-by-step Algorithm
// Initialize Variables:

// Create a hash map to store the frequency of characters in pattern.
// Initialize variables: windowStart to track the start of the window, minLength to track the minimum window size, matched to count matched characters, and subStrStart to remember the start index of the smallest window.
// Expand the Window:

// Iterate through s with windowEnd.
// For each character at windowEnd, check if it is in the hash map. If yes, decrement its frequency in the map.
// If the character's frequency in the map is zero or more, increment the matched count.
// Shrink the Window:

// While matched equals the length of pattern, it means the current window contains all characters of pattern.
// Update the minLength and subStrStart if the current window size is smaller than the previous smallest window.
// Move the windowStart to the right to shrink the window. If the character at windowStart is in the hash map, increase its frequency in the map. If its frequency becomes zero, decrement the matched count.
// Return Result:

// After processing all characters, if minLength is greater than the length of s, return an empty string. Otherwise, return the substring starting at subStrStart with the length of minLength.
// Algorithm Walkthrough
// Example:

// s = "aabdec"
// t = "abc"
// Initialize:

// charFrequencyMap: {a: 1, b: 1, c: 1}
// windowStart = 0, matched = 0, minLength = 7, subStrStart = 0
// Iteration:

// windowEnd = 0: rightChar = 'a'
// charFrequencyMap: {a: 0, b: 1, c: 1}, matched = 1
// windowEnd = 1: rightChar = 'a'
// charFrequencyMap: {a: -1, b: 1, c: 1}, matched = 1
// windowEnd = 2: rightChar = 'b'
// charFrequencyMap: {a: -1, b: 0, c: 1}, matched = 2
// windowEnd = 3: rightChar = 'd'
// No change in charFrequencyMap or matched
// windowEnd = 4: rightChar = 'e'
// No change in charFrequencyMap or matched
// windowEnd = 5: rightChar = 'c'
// charFrequencyMap: {a: -1, b: 0, c: 0}, matched = 3
// matched == t.length(): Update minLength = 6, subStrStart = 0
// windowStart = 1: leftChar = 'a'
// charFrequencyMap: {a: 0, b: 0, c: 0}, matched = 3, minLength = 5, subStrStart = 1
// windowStart = 2: leftChar = 'a'
// charFrequencyMap: {a: 1, b: 0, c: 0}, matched = 2
// Result:

// minLength = 5, subStrStart = 1
// Return s.substring(1, 1 + 5) => "abdec"

// Complexity Analysis
// Time Complexity
// Frequency Map Creation: The algorithm starts by creating a frequency map of the characters in the pattern. This step takes O(M) time, where M is the length of the pattern.

// Sliding Window Traversal: A sliding window approach is used to traverse through the string. The outer loop runs for each character in the string, so the loop runs O(N) times, where N is the length of the input string.

// Character Frequency Updates: For each character in the window, the algorithm performs constant-time operations such as updating the frequency in the charFrequencyMap and adjusting the matched count. These operations take O(1) time on average, as hash map operations like put() and get() are constant on average.

// Overall Time Complexity: The total time complexity is O(N+M), where N is the length of the string and M is the length of the pattern.

// Space Complexity
// HashMap Space: The algorithm uses a hash map, charFrequencyMap, to store the frequency of characters in the pattern. This requires O(M) space, where M is the number of unique characters in the pattern.

// Additional Variables: The algorithm uses a few extra variables such as windowStart, windowEnd, matched, minLength, and subStrStart, all of which require constant space, O(1).

// Overall Space Complexity: The overall space complexity is O(M), where M is the number of unique characters in the pattern.

// In summary, the time complexity of the algorithm is determined by the length of the input string N and the length of the pattern M, while the space complexity depends on the number of unique characters in the pattern M.
