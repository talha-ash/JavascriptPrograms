function func(input, input2) {
  let resultIntervals = [];

  for (let i = 0; i < input.length; i++) {
    const interval1 = input[i];
    for (let j = 0; j < input2.length; j++) {
      const interval2 = input2[j];

      let aOverlapB =
        interval1[0] >= interval2[0] && interval1[0] <= interval2[1];
      let bOverlapA =
        interval2[0] >= interval1[0] && interval2[0] <= interval1[1];

      if (aOverlapB || bOverlapA) {
        let start = Math.max(interval1[0], interval2[0]);
        let end = Math.min(interval1[1], interval2[1]);
        resultIntervals.push([start, end]);
      }
    }
  }
  return resultIntervals;
}

const input = [
  [1, 3],
  [5, 6],
  [7, 9],
];

const result = func(input, [
  [2, 3],
  [5, 7],
]);
console.log(result);

// Solution
// This problem follows the Merge Intervals pattern. As we have discussed under Insert Interval, there are five overlapping possibilities between two intervals ‘a’ and ‘b’. A close observation will tell us that whenever the two intervals overlap, one of the interval’s start time lies within the other interval. This rule can help us identify if any two intervals overlap or not:

// Image
// Now, if we have found that the two intervals overlap, how can we find the overlapped part?

// Again from the above diagram, the overlapping interval will be equal to:

//     start = max(a.start, b.start)
//     end = min(a.end, b.end)
// That is, the highest start time and the lowest end time will be the overlapping interval.

// So our algorithm will be to iterate through both the lists together to see if any two intervals overlap. If two intervals overlap, we will insert the overlapped part into a result list and move on to the next interval which is finishing early.

// Step-by-Step Algorithm
// Initialize Pointers:

// Create two pointers i and j set to 0. These will track the positions in arr1 and arr2.
// Create Result List:

// Initialize an empty list result to store the intersection intervals.
// Iterate Over Both Lists:

// Use a while loop to iterate as long as both pointers i and j are within the bounds of their respective lists.
// Check for Overlap:

// For intervals arr1[i] and arr2[j], check if they overlap:
// Condition 1: arr1[i].start >= arr2[j].start and arr1[i].start <= arr2[j].end
// Condition 2: arr2[j].start >= arr1[i].start and arr2[j].start <= arr1[i].end
// If either condition is true, it means the intervals overlap.
// Calculate Intersection:

// If the intervals overlap, calculate the intersection interval:
// start = Math.max(arr1[i].start, arr2[j].start)
// end = Math.min(arr1[i].end, arr2[j].end)
// Add this intersection to the result list.
// Move Pointer:

// Move the pointer which has the interval ending first to the next interval:
// If arr1[i].end < arr2[j].end, increment i.
// Otherwise, increment j.
// Return Result:

// After the loop completes, return the result list containing all intersections.
// Algorithm Walkthrough
// Using the input arr1=[[1, 3], [5, 6], [7, 9]] and arr2=[[2, 3], [5, 7]]:

// Initial State:

// i = 0, j = 0
// arr1[0] = [1, 3]
// arr2[0] = [2, 3]
// First Comparison:

// Check overlap:
// arr1[0].start >= arr2[0].start and arr1[0].start <= arr2[0].end => 1 >= 2 and 1 <= 3 (False)
// arr2[0].start >= arr1[0].start and arr2[0].start <= arr1[0].end => 2 >= 1 and 2 <= 3 (True)
// Intersection: [2, 3]
// result = [[2, 3]]
// Move i to next interval (since arr1[0].end < arr2[0].end is False).
// Next State:

// i = 0, j = 1
// arr1[0] = [1, 3]
// arr2[1] = [5, 7]
// Second Comparison:

// Check overlap:
// arr1[0].start >= arr2[1].start and arr1[0].start <= arr2[1].end => 1 >= 5 and 1 <= 7 (False)
// arr2[1].start >= arr1[0].start and arr2[1].start <= arr1[0].end => 5 >= 1 and 5 <= 3 (False)
// No intersection.
// Move i to next interval (since arr1[0].end < arr2[1].start is True).
// Next State:

// i = 1, j = 1
// arr1[1] = [5, 6]
// arr2[1] = [5, 7]
// Third Comparison:

// Check overlap:
// arr1[1].start >= arr2[1].start and arr1[1].start <= arr2[1].end => 5 >= 5 and 5 <= 7 (True)
// arr2[1].start >= arr1[1].start and arr2[1].start <= arr1[1].end => 5 >= 5 and 5 <= 6 (True)
// Intersection: [5, 6]
// result = [[2, 3], [5, 6]]
// Move i to next interval (since arr1[1].end < arr2[1].end is True).
// Final State:

// i = 2, j = 1
// arr1[2] = [7, 9]
// arr2[1] = [5, 7]
// Fourth Comparison:

// Check overlap:
// arr1[2].start >= arr2[1].start and arr1[2].start <= arr2[1].end => 7 >= 5 and 7 <= 7 (True)
// arr2[1].start >= arr1[2].start and arr2[1].start <= arr1[2].end => 5 >= 7 and 5 <= 9 (False)
// Intersection: [7, 7]
// result = [[2, 3], [5, 6], [7, 7]]
// Move j to next interval (since arr2[1].end < arr1[2].end is True).
// End:

// Loop ends as j is out of bounds.
// Result: [[2, 3], [5, 6], [7, 7]]

// Explanation of Time and Space Complexity
// Time Complexity
// The time complexity of an algorithm measures how the running time of the algorithm grows with the size of the input. In this case, the algorithm iterates through both input lists once. Therefore, the time complexity is represented as O(N + M), where N is the number of intervals in the first list and M is the number of intervals in the second list.

// Example:
// If the first list has 5 intervals and the second list has 7 intervals, the time complexity will be O(5 + 7) = O(12).

// Space Complexity
// The space complexity of an algorithm measures the amount of memory used by the algorithm. In this case, the algorithm only needs a constant amount of space, meaning the space used does not increase with the size of the input.

// Example:
// If the result list is not considered, the algorithm uses the same amount of space regardless of the input size.

// Overall, the time complexity indicates how the algorithm's running time scales with input size, while the space complexity indicates how much memory the algorithm requires. In this case, the algorithm's time complexity is O(N + M) and space complexity is constant.
