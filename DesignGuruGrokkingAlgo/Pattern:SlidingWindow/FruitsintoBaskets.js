function func(list) {
  let wStart = 0;
  let hash = {};
  let max = 0;

  for (let i = 0; i < list.length; i++) {
    const ele = list[i];
    hash[ele] = (hash[ele] || 0) + 1;
    while (Object.keys(hash).length > 2) {
      const leftEle = list[wStart];
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

const list = ["A", "B", "C", "B", "B", "C"];

const result = func(list);
console.log(result);

// Similar Problems
// Problem 1: Longest Substring with at most 2 distinct characters

// Given a string, find the length of the longest substring in it
// with at most two distinct characters.

// Solution: This problem is exactly similar to our parent problem.

// Solution
// To solve this problem, we use a sliding window approach. This technique is effective for problems involving contiguous subarrays or sublists. The sliding window approach allows us to maintain a window of elements that meet a certain condition—in this case, having no more than two types of fruits. We expand the window by adding elements from the right and contract it from the left when the condition is violated. This approach ensures we check all possible subarrays without starting from each element repeatedly, making it efficient.

// This method works well because it continuously adjusts the window size based on the elements it encounters. By using a dictionary to keep track of the fruit counts within the window, we can efficiently manage and adjust the window size to find the maximum length subarray that satisfies the condition. The efficiency comes from the fact that each element is processed at most twice, once when added and once when removed from the window.

// Step-by-Step Algorithm
// Initialize two variables: windowStart to keep track of the starting index of the window and maxLength to store the maximum length of the subarray found.
// Create a dictionary fruitFrequencyMap to count the frequency of each fruit in the current window.
// Iterate over the array using a variable windowEnd which marks the end of the window.
// Add the current fruit at windowEnd to the dictionary and update its count.
// If the dictionary size exceeds two, it means there are more than two types of fruits in the window.
// Shrink the window from the start by removing the fruit at windowStart and updating the dictionary.
// If the count of the fruit at windowStart becomes zero, remove it from the dictionary.
// Move windowStart to the right to shrink the window.
// Update maxLength to be the maximum of its current value and the size of the current window (windowEnd - windowStart + 1).
// Return maxLength as the result.
// Algorithm Walkthrough
// Consider the input array ['A', 'B', 'C', 'A', 'C']:

// Initialize windowStart = 0, maxLength = 0, fruitFrequencyMap = {}.
// windowEnd = 0: Add 'A' to fruitFrequencyMap, making it {'A': 1}.
// windowEnd = 1: Add 'B' to fruitFrequencyMap, making it {'A': 1, 'B': 1}.
// maxLength = 2 (subarray ['A', 'B']).
// windowEnd = 2: Add 'C' to fruitFrequencyMap, making it {'A': 1, 'B': 1, 'C': 1}.
// More than two types of fruits, shrink window: windowStart = 1, fruitFrequencyMap = {'A': 0, 'B': 1, 'C': 1}.
// Remove 'A': fruitFrequencyMap = {'B': 1, 'C': 1}.
// windowEnd = 3: Add 'A' to fruitFrequencyMap, making it {'B': 1, 'C': 1, 'A': 1}.
// More than two types of fruits, shrink window: windowStart = 2, fruitFrequencyMap = {'B': 0, 'C': 1, 'A': 1}.
// Remove 'B': fruitFrequencyMap = {'C': 1, 'A': 1}.
// windowEnd = 4: Add 'C' to fruitFrequencyMap, making it {'C': 2, 'A': 1}.
// maxLength = 3 (subarray ['C', 'A', 'C']).

//   Explanation of Time Complexity
//   Single Pass
//   The algorithm goes through the input array just once, using a sliding window approach.
//   The outer loop runs once for each character in the input array, so it runs "N" times, where "N" is the length of the array.
//   Sliding Window Adjustment
//   The inner loop makes sure that the window contains at most two distinct characters.
//   For each character, adding or removing from the fruitFrequencyMap takes constant time (O(1)), because hash map operations (insertion, update, and deletion) are on average constant time.
//   Overall Time Complexity
//   The overall time complexity is O(N) because both the outer and inner loops process each element at most once.
//   Overall Time Complexity
//   The overall time complexity of the algorithm is O(N).
//   Explanation of Space Complexity
//   HashMap Space
//   The fruitFrequencyMap stores the frequency of up to two distinct characters.
//   The space complexity of the hash map is O(1), which is constant.
//   Additional Variables
//   The algorithm uses additional variables (windowStart, windowEnd, maxLength) that require constant space.
//   Overall Space Complexity
//   The overall space complexity of the algorithm is O(1).
//   Examples
//   // Example of time complexity explanation
//   for (int i = 0; i < arr.length; i++) {
//       // Process each element once
//   }

//   // Example of space complexity explanation
//   Map<Character, Integer> fruitFrequencyMap = new HashMap<>();
//   // The space used by the fruitFrequencyMap is constant, regardless of the input size
//   //
//   //
//   //
