function func(input) {
  input.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < input.length; i++) {
    let interval = input[i];
    let previnterval = input[i - 1];
    if (previnterval[1] >= interval[0]) {
      return false;
    }
  }

  return true;
}

const input = [
  [1, 4],
  [2, 6],
  [3, 5],
];

const result = func(input);
console.log(result);

// Solution
// To solve this problem, we need to check if any of the given meeting times overlap. The best way to do this is by first sorting the intervals based on their start times. Once sorted, we can then iterate through the list and compare each interval with the previous one to see if there is any overlap.

// This approach works efficiently because by sorting the intervals, we ensure that if there is an overlap, it will be between consecutive intervals. This reduces the problem to a simpler check, making the solution both effective and easy to understand.

// Step-by-Step Algorithm
// Sort the intervals based on their start times. This ensures that we only need to compare each interval with the previous one.
// Iterate through the sorted list of intervals.
// For each interval from the second one onwards, compare its start time with the end time of the previous interval.
// If the start time of the current interval is less than the end time of the previous interval, return false because it means there is an overlap.
// If no overlaps are found during the iteration, return true indicating that all meetings can be attended without conflicts.
// Algorithm Walkthrough
// Let's take the example intervals: [[6,7], [2,4], [13, 14], [8,12], [45, 47]]

// Step 1: Sort the intervals based on start times: [[2,4], [6,7], [8,12], [13, 14], [45, 47]].
// Step 2: Iterate through the sorted intervals:
// Compare the second interval ([6, 7]) with the first interval ([2, 4]):
// (6) (start time of second) is not less than (4) (end time of first), so no overlap.
// Compare the third interval ([8, 12]) with the second interval ([6, 7]):
// (8) (start time of third) is not less than (7) (end time of second), so no overlap.
// Compare the fourth interval ([13, 14]) with the third interval ([8, 12]):
// (13) (start time of fourth) is not less than (12) (end time of third), so no overlap.
// Compare the fifth interval ([45, 47]) with the fourth interval ([13, 14]):
// (45) (start time of fifth) is not less than (14) (end time of fourth), so no overlap.
// Step 3: Since no overlaps were found, return true.

//   Explanation of Time and Space Complexity
//   Time Complexity
//   The time complexity of an algorithm measures how its running time increases as the input size grows.
//   In this case, the time complexity of the algorithm is O(N*logN), where 'N' is the number of appointments.
//   This means that as the number of appointments increases, the time taken by the algorithm grows at a rate of N multiplied by the logarithm of N.
//   The sorting process in the beginning contributes to the O(N*logN) time complexity.
//   Space Complexity
//   The space complexity of an algorithm measures how much extra memory it needs based on the input size.
//   For this algorithm, the space complexity is O(N) because of the space needed for sorting the appointments.
//   Similar Problems
//   The user also mentions a similar problem of finding conflicting appointments, which can be approached using a similar algorithm.
//   An example is given where a list of appointments is provided, and the conflicting appointments need to be identified.
//   By using this algorithm, it is possible to efficiently handle tasks related to managing appointments and conflicts.
