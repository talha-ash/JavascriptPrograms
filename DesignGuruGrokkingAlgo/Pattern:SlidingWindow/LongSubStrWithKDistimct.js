function func(str, k) {
  let wStart = 0;
  let hash = {};
  let max = 0;

  for (let i = 0; i < str.length; i++) {
    const ele = str[i];
    hash[ele] = (hash[ele] || 0) + 1;
    while (Object.keys(hash).length > k) {
      const leftEle = str[wStart];
      hash[leftEle] -= 1;
      if (hash[leftEle] == 0) {
        delete hash[leftEle];
      }
      wStart++;
    }
    max = Math.max(max, i - wStart + 1);
  }
  return max;
}

const str = "araaci";

const result = func(str, 2);
console.log(result);

// Solution
// To solve this problem, we can use a sliding window approach. The idea is to maintain a window that contains at most ( K ) distinct characters. We will expand the window by including one character at a time from the right, and once the window contains more than ( K ) distinct characters, we will shrink it from the left until it again contains ( K ) or fewer distinct characters.

// This approach is effective because it allows us to process the string in linear time, which is efficient for large inputs. By keeping track of the frequency of characters within the window using a hash map, we can efficiently manage the characters and ensure that the window always contains at most ( K ) distinct characters.

// Step-by-Step Algorithm
// Initialize two pointers, windowStart and windowEnd, both set to 0.
// Create a hash map to keep track of the frequency of characters within the current window.
// Start a loop with windowEnd ranging from 0 to the length of the string:
// Add the character at windowEnd to the hash map and update its frequency.
// If the hash map contains more than ( K ) distinct characters:
// Remove characters from the left (i.e., move windowStart to the right) until the hash map contains at most ( K ) distinct characters.
// Decrease the frequency of the leftmost character and remove it from the hash map if its frequency becomes zero.
// Update the maximum length of the substring found so far.
// Return the maximum length.
// Algorithm Walkthrough
// Let's use the input str = "araaci", K = 2 for a step-by-step walkthrough.

// windowStart = 0, windowEnd = 0

// Add 'a' to the hash map: {'a': 1}
// Maximum length = 1
// windowEnd = 1

// Add 'r' to the hash map: {'a': 1, 'r': 1}
// Maximum length = 2
// windowEnd = 2

// Add 'a' to the hash map: {'a': 2, 'r': 1}
// Maximum length = 3
// windowEnd = 3

// Add 'a' to the hash map: {'a': 3, 'r': 1}
// Maximum length = max(maxLength, windowEnd - windowStart + 1) = max(0, 3 - 0 + 1) = 4
// windowEnd = 4

// Add 'c' to the hash map: {'a': 3, 'r': 1, 'c': 1}
// More than ( K ) distinct characters, shrink window from the left:
// Remove 1 'a': {'a': 2, 'r': 1, 'c': 1}
// windowStart = 1
// Remove 1 'r': {'a': 2, 'c': 1}
// windowStart = 2
// Maximum length = max(maxLength, windowEnd - windowStart + 1) = max(4, 4 - 2 + 1) = 4
// windowEnd = 5

// Add 'i' to the hash map: {'a': 2, 'c': 1, 'i': 1}
// More than ( K ) distinct characters, shrink window from the left:
// Remove 'a': {'a': 1, 'c': 1, 'i': 1}
// windowStart = 3
// Remove 'a': {'c': 1, 'i': 1}
// windowStart = 4
// Maximum length = max(maxLength, windowEnd - windowStart + 1) = max(4, 5 - 4 + 1) = 4

// Complexity Analysis
// Time Complexity
// Single pass:

// The algorithm goes through the entire input string once, which requires O(N) time, where N is the length of the input string.
// Sliding window adjustment:

// The inner loop adjusts the window size when the number of distinct characters exceeds k. This inner loop performs constant-time operations to adjust the window.
// Overall time complexity:

// The overall time complexity is O(N) because the outer loop processes each character once, and the inner loop performs constant-time operations to adjust the window.
// Space Complexity
// HashMap space:

// The charFrequencyMap stores up to k + 1 distinct characters in the worst case. Since there can be at most k distinct characters in the map at any given time, the space used by the hash map is O(k).
// Additional variables:

// The algorithm uses a few additional variables (windowStart, windowEnd, maxLength), which require constant space.
// Overall space complexity:

// The overall space complexity is O(k), where k is the maximum number of distinct characters allowed.
// Explanation using an example:
// If we have a string "abccabc" and k=2 (meaning we want to find the longest substring with at most 2 distinct characters), the algorithm would use a sliding window approach to find the longest substring. The time complexity would be O(N) where N is the length of the input string "abccabc".

// This explanation can be understood by a beginner with a foundational understanding of algorithms and data structures.
