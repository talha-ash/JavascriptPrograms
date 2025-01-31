function func(input) {
  input.sort((a, b) => a[0] - b[0]);
  let mergeInterval = [];

  let startInterval = input[0][0];
  let endInterval = input[0][1];
  for (let i = 1; i < input.length; i++) {
    let interval = input[i];
    if (endInterval >= interval[0]) {
      endInterval = Math.max(endInterval, interval[1]);
    } else {
      mergeInterval.push([startInterval, endInterval]);
      startInterval = interval[0];
      endInterval = interval[1];
    }
  }

  mergeInterval.push([startInterval, endInterval]);
  return mergeInterval;
}

const input = [
  [1, 4],
  [2, 6],
  [3, 5],
];

const result = func(input);
console.log(result);

// Solution
// Let’s take the example of two intervals (‘a’ and ‘b’) such that a.start <= b.start. There are four possible scenarios:

// Image
// Our goal is to merge the intervals whenever they overlap. For the above-mentioned three overlapping scenarios (2, 3, and 4), this is how we will merge them:

// Image
// To solve this problem, we will sort the list of intervals by their start times. This helps in easily identifying overlapping intervals. After sorting, we can iterate through the intervals, merging them if they overlap. We will maintain a list to store the merged intervals. As we iterate, we compare the current interval with the last interval in the merged list. If they overlap, we merge them by extending the end time. Otherwise, we add the current interval to the merged list.

// This approach works because sorting brings overlapping intervals next to each other. This allows us to handle overlapping intervals in a single pass through the list. Sorting the intervals first is key to simplifying the merging process.

// Step-by-Step Algorithm
// Sort Intervals:

// Begin by sorting the list of intervals based on their start times.
// This can be done using a comparator in Java.
// Initialize Merged List:

// Create an empty list called mergedIntervals to store the merged intervals.
// Set Initial Interval:

// Start by picking the first interval and set it as the current interval.
// Iterate Through Intervals:

// Loop through the rest of the intervals.
// For each interval:
// Check Overlap:
// If the start of the current interval is less than or equal to the end of the previous interval, it means they overlap.
// In this case, merge them by updating the end of the previous interval to be the maximum of both ends.
// Non-overlapping:
// If they do not overlap, add the previous interval to the mergedIntervals list.
// Update the current interval to be the next interval in the list.
// Add Last Interval:

// After the loop completes, add the last interval to the mergedIntervals list.
// Return Result:

// Return the mergedIntervals list as the final output.
// Algorithm Walkthrough
// Given input: [[1, 4], [2, 5], [7, 9]]

// Sort Intervals:

// Original intervals: [[1, 4], [2, 5], [7, 9]]
// Sorted intervals: [[1, 4], [2, 5], [7, 9]] (already sorted)
// Initialize Merged List:

// mergedIntervals: []
// Set Initial Interval:

// Current interval: [1, 4]
// Iterate Through Intervals:

// First Iteration:
// Next interval: [2, 5]
// Check overlap: 2 <= 4 (True)
// Merge intervals: [1, 5]
// Update current interval: [1, 5]
// Second Iteration:
// Next interval: [7, 9]
// Check overlap: 7 <= 5 (False)
// Add previous interval to mergedIntervals: [[1, 5]]
// Update current interval: [7, 9]
// Add Last Interval:

// Add last interval to mergedIntervals: [[1, 5], [7, 9]]
// Return Result:

// mergedIntervals: [[1, 5], [7, 9]]

// Time Complexity
// The time complexity of an algorithm measures the amount of time it takes to run based on the size of the input. For the given algorithm:

// The time complexity is O(NlogN) for sorting the intervals, where N is the total number of intervals.
// After sorting, we iterate through the intervals only once, which takes O(N) time.
// Space Complexity
// The space complexity of an algorithm measures the amount of memory it uses based on the input size. For the given algorithm:

// The space complexity is O(N) because we need to return a list containing all the merged intervals.
// Sorting also requires O(N) space due to the algorithm used.
// Similar Problems
// The problem of finding if any two intervals overlap is similar to the problem being addressed.

// For example, given intervals [[1,4], [2,5], [7,9]], the algorithm can determine that intervals [1,4] and [2,5] overlap.
// Explanation for Intermediate Level
// Time Complexity:

// The time complexity of an algorithm tells us how its running time grows as the input size increases. In this case, sorting the intervals takes O(NlogN) time, and iterating through the intervals takes O(N) time.
// Space Complexity:

// Space complexity tells us how much memory an algorithm uses based on input size. In this algorithm, it uses O(N) space to return the merged intervals and O(N) space for sorting.
// Similar Problems:

// The algorithm's approach to finding overlapping intervals can also be used to solve similar problems related to interval overlap.
