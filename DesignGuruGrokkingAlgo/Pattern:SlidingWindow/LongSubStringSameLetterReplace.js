function func(input, k) {
  let wStart = 0;
  let hash = {};
  let maxLength = 0;
  let maxRepeated = 0;

  for (let i = 0; i < input.length; i++) {
    const ele = input[i];
    hash[ele] = (hash[ele] || 0) + 1;
    maxRepeated = Math.max(maxRepeated, hash[ele]);

    let windowSize = i - wStart + 1;

    if (windowSize - maxRepeated > k) {
      let left = input[wStart];
      hash[left] -= 1;
      wStart++;
    }

    maxLength = Math.max(maxLength, i - wStart + 1);
  }
  return maxLength;
}

const input = "aabccbb";

const result = func(input, 2);
console.log(result);

// Solution
// To solve this problem, we can use a sliding window technique. The idea is to maintain a window that can contain up to k characters that are different from the most frequent character in the current window. By doing so, we maximize the length of the window while keeping the number of changes within the allowed limit. This approach works because the window will only shrink when the number of characters that need to be changed exceeds k.

// The sliding window approach is efficient because it only requires a single pass through the string, making it suitable for handling large input sizes. Additionally, it uses a hashmap to keep track of the frequency of characters in the current window, ensuring that we can quickly determine the most frequent character. This combination of techniques ensures that the solution is both time and space efficient.

// Step-by-step Algorithm
// Initialize Variables

// Start a window at the beginning of the string.
// Set maxLength to 0 to keep track of the longest valid substring.
// Use maxRepeatLetterCount to store the count of the most frequent character in the current window.
// Use a HashMap letterFrequencyMap to store the frequency of each character in the current window.
// Expand the Window

// Iterate through the string using a loop with windowEnd ranging from 0 to the length of the string.
// Add the character at windowEnd to the letterFrequencyMap and update its frequency.
// Update maxRepeatLetterCount to be the maximum frequency of any character in the current window.
// Shrink the Window if Necessary

// If the number of characters that need to be replaced (windowEnd - windowStart + 1 - maxRepeatLetterCount) exceeds k, shrink the window from the left by incrementing windowStart.
// Adjust the frequency of the character that is left out of the window.
// Update the Maximum Length

// Calculate the current window size and update maxLength if the current window size is larger.
// Return the Result

// After the loop, maxLength will hold the length of the longest substring where up to k characters can be replaced to make all characters the same.
// Algorithm Walkthrough
// Let's go through the example str = "aabccbb", k = 2 step by step.

// Initialization

// windowStart = 0, maxLength = 0, maxRepeatLetterCount = 0
// letterFrequencyMap = {}
// Expand the Window

// Iteration 1

// windowEnd = 0, rightChar = 'a'
// Update letterFrequencyMap = {'a': 1}
// maxRepeatLetterCount = 1
// Current window size = windowEnd - windowStart + 1 = 1
// windowEnd - windowStart + 1 - maxRepeatLetterCount = 1 - 1 = 0 (<= k)
// Update maxLength = 1
// Iteration 2

// windowEnd = 1, rightChar = 'a'
// Update letterFrequencyMap = {'a': 2}
// maxRepeatLetterCount = 2
// Current window size = windowEnd - windowStart + 1 = 2
// windowEnd - windowStart + 1 - maxRepeatLetterCount = 2 - 2 = 0 (<= k)
// Update maxLength = 2
// Iteration 3

// windowEnd = 2, rightChar = 'b'
// Update letterFrequencyMap = {'a': 2, 'b': 1}
// maxRepeatLetterCount = 2
// Current window size = windowEnd - windowStart + 1 = 3
// windowEnd - windowStart + 1 - maxRepeatLetterCount = 3 - 2 = 1 (<= k)
// Update maxLength = 3
// Iteration 4

// windowEnd = 3, rightChar = 'c'
// Update letterFrequencyMap = {'a': 2, 'b': 1, 'c': 1}
// maxRepeatLetterCount = 2
// Current window size = windowEnd - windowStart + 1 = 4
// windowEnd - windowStart + 1 - maxRepeatLetterCount = 4 - 2 = 2 (<= k)
// Update maxLength = 4
// Iteration 5

// windowEnd = 4, rightChar = 'c'
// Update letterFrequencyMap = {'a': 2, 'b': 1, 'c': 2}
// maxRepeatLetterCount = 2
// Current window size = windowEnd - windowStart + 1 = 5
// windowEnd - windowStart + 1 - maxRepeatLetterCount = 5 - 2 = 3 (> k)
// Shrink window: windowStart = 1
// Update letterFrequencyMap = {'a': 1, 'b': 1, 'c': 2}
// Current window size after shrinking = windowEnd - windowStart + 1 = 4
// Iteration 6

// windowEnd = 5, rightChar = 'b'
// Update letterFrequencyMap = {'a': 1, 'b': 2, 'c': 2}
// maxRepeatLetterCount = 2
// Current window size = windowEnd - windowStart + 1 = 5
// windowEnd - windowStart + 1 - maxRepeatLetterCount = 5 - 2 = 3 (> k)
// Shrink window: windowStart = 2
// Update letterFrequencyMap = {'a': 0, 'b': 2, 'c': 2}
// Current window size after shrinking = windowEnd - windowStart + 1 = 4
// Iteration 7

// windowEnd = 6, rightChar = 'b'
// Update letterFrequencyMap = {'a': 0, 'b': 3, 'c': 2}
// maxRepeatLetterCount = 3
// Current window size = windowEnd - windowStart + 1 = 5
// windowEnd - windowStart + 1 - maxRepeatLetterCount = 5 - 3 = 2 (<= k)
// Update maxLength = 5
// The maximum length of the substring with up to 2 character replacements is 5 for the input string aabccbb. The valid substring is "bccbb" or "abccb".

// Explanation of Time and Space Complexity Analysis
// Time Complexity
// Single Pass: The algorithm goes through the input string only once, so it has a time complexity of O(N), where N is the length of the input string.
// Sliding Window Adjustment: Each character in the string involves map operations which are average constant-time operations. This means that the overall time complexity is O(N) because each character is processed once, both in extending and shrinking the window.
// Space Complexity
// HashMap Space: The algorithm uses a hash map to store the frequency of characters within the sliding window. In the worst case, the hash map will contain up to all unique characters in the input string, resulting in a space complexity of O(M), where M is the number of unique characters in the input string.
// Additional Variables: The algorithm uses a few additional variables that require constant space, denoted by O(1).
// Simplified Space Complexity
// HashMap Space: Since the English alphabet has at most 26 characters, the maximum number of unique characters is bounded, so the space complexity is essentially constant.
// Conclusion
// Overall Time Complexity: O(N), where N is the length of the input string.
// Overall Space Complexity: O(M), where M is the number of unique characters (bounded by 26 for the English alphabet).
