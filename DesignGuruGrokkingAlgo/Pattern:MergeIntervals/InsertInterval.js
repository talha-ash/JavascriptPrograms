function func(input, newInterval) {
  let mergeInterval = [];

  let matchFound = false;
  let startInterval = newInterval[0];
  let endInterval = newInterval[1];

  for (let i = 0; i < input.length; i++) {
    let interval = input[i];
    if (endInterval >= interval[0] && startInterval <= interval[1]) {
      matchFound = true;
      endInterval = Math.max(endInterval, interval[1]);
      startInterval = Math.min(startInterval, interval[0]);
    } else if (matchFound) {
      matchFound = false;
      mergeInterval.push([startInterval, endInterval]);
      mergeInterval.push(interval);
      startInterval = endInterval = null;
    } else {
      mergeInterval.push(interval);
    }
  }
  if (startInterval) {
    mergeInterval.push([startInterval, endInterval]);
  }
  return mergeInterval;
}

const input = [
  [1, 3],
  [5, 7],
  [8, 12],
];

const result = func(input, [4, 6]);
console.log(result);

// class Interval {
//   constructor(start, end) {
//     this.start = start;
//     this.end = end;
//   }
// }

class Solution {
  insert(intervals, new_interval) {
    let merged = [],
      i = 0;

    // skip and add to output all intervals that come before the 'new_interval'
    while (i < intervals.length && intervals[i].end < new_interval.start) {
      merged.push(intervals[i]);
      i += 1;
    }

    // merge all intervals that overlap with 'new_interval'
    while (i < intervals.length && intervals[i].start <= new_interval.end) {
      new_interval.start = Math.min(intervals[i].start, new_interval.start);
      new_interval.end = Math.max(intervals[i].end, new_interval.end);
      i += 1;
    }

    // insert the new_interval
    merged.push(new_interval);

    // add all the remaining intervals to the output
    while (i < intervals.length) {
      merged.push(intervals[i]);
      i += 1;
    }

    return merged;
  }
}

function printInterval(res) {
  process.stdout.write(`[${res.start}, ${res.end}]`);
}

const sol = new Solution();
process.stdout.write("Intervals after inserting the new interval: ");
let result = sol.insert(
  [new Interval(1, 3), new Interval(5, 7), new Interval(8, 12)],
  new Interval(4, 6),
);
for (let i = 0; i < result.length; i++) {
  // Declare i with 'let'
  printInterval(result[i]);
}
console.log();

process.stdout.write("Intervals after inserting the new interval: ");
result = sol.insert(
  [new Interval(1, 3), new Interval(5, 7), new Interval(8, 12)],
  new Interval(4, 10),
);
for (let i = 0; i < result.length; i++) {
  // Declare i with 'let'
  printInterval(result[i]);
}
console.log();

process.stdout.write("Intervals after inserting the new interval: ");
result = sol.insert(
  [new Interval(2, 3), new Interval(5, 7)],
  new Interval(1, 4),
);
for (let i = 0; i < result.length; i++) {
  // Declare i with 'let'
  printInterval(result[i]);
}
console.log();

// Solution
// If the given list was not sorted, we could have simply appended the new interval to it and used the merge() function from Merge Intervals. But since the given list is sorted, we should try to come up with a solution better than .

// When inserting a new interval in a sorted list, we need to first find the correct index where the new interval can be placed. In other words, we need to skip all the intervals which end before the start of the new interval. So we can iterate through the given sorted listed of intervals and skip all the intervals with the following condition:

// intervals[i].end < newInterval.start
// Once we have found the correct place, we can follow an approach similar to Merge Intervals to insert and/or merge the new interval. Let’s call the new interval ‘a’ and the first interval with the above condition ‘b’. There are five possibilities:

// Image
// The diagram above clearly shows the merging approach. To handle all four merging scenarios, we need to do something like this:

//     c.start = min(a.start, b.start)
//     c.end = max(a.end, b.end)
// Step-by-Step Algorithm
// Create an empty list to store the merged intervals.
// Traverse the given list of intervals:
// Add all intervals that end before the new interval starts to the merged list.
// For overlapping intervals:
// Adjust the start of the new interval to the minimum start time.
// Adjust the end of the new interval to the maximum end time.
// Add the merged new interval to the merged list.
// Add all intervals that start after the new interval ends to the merged list.
// Return the merged list of intervals.
// Algorithm Walkthrough
// Using the example Intervals = [[1, 3], [5, 7], [8, 12]], New Interval = [4, 10]:

// Start with an empty list: mergedIntervals = []
// First interval [1, 3]:
// Ends before [4, 10] starts.
// Add to mergedIntervals: [[1, 3]]
// Second interval [5, 7]:
// Overlaps with [4, 10].
// Adjust new interval: [4, 10] -> [4, 10] (no change)
// Third interval [8, 12]:
// Overlaps with [4, 10].
// Adjust new interval: [4, 10] -> [4, 12]
// Add merged new interval [4, 12] to mergedIntervals: [[1, 3], [4, 12]]
// No more intervals left to process.
// Final merged intervals: [[1, 3], [4, 12]]

// Solution
// If the given list was not sorted, we could have simply appended the new interval to it and used the merge() function from Merge Intervals. But since the given list is sorted, we should try to come up with a solution better than .

// When inserting a new interval in a sorted list, we need to first find the correct index where the new interval can be placed. In other words, we need to skip all the intervals which end before the start of the new interval. So we can iterate through the given sorted listed of intervals and skip all the intervals with the following condition:

// intervals[i].end < newInterval.start
// Once we have found the correct place, we can follow an approach similar to Merge Intervals to insert and/or merge the new interval. Let’s call the new interval ‘a’ and the first interval with the above condition ‘b’. There are five possibilities:

// Image
// The diagram above clearly shows the merging approach. To handle all four merging scenarios, we need to do something like this:

//     c.start = min(a.start, b.start)
//     c.end = max(a.end, b.end)
// Step-by-Step Algorithm
// Create an empty list to store the merged intervals.
// Traverse the given list of intervals:
// Add all intervals that end before the new interval starts to the merged list.
// For overlapping intervals:
// Adjust the start of the new interval to the minimum start time.
// Adjust the end of the new interval to the maximum end time.
// Add the merged new interval to the merged list.
// Add all intervals that start after the new interval ends to the merged list.
// Return the merged list of intervals.
// Algorithm Walkthrough
// Using the example Intervals = [[1, 3], [5, 7], [8, 12]], New Interval = [4, 10]:

// Start with an empty list: mergedIntervals = []
// First interval [1, 3]:
// Ends before [4, 10] starts.
// Add to mergedIntervals: [[1, 3]]
// Second interval [5, 7]:
// Overlaps with [4, 10].
// Adjust new interval: [4, 10] -> [4, 10] (no change)
// Third interval [8, 12]:
// Overlaps with [4, 10].
// Adjust new interval: [4, 10] -> [4, 12]
// Add merged new interval [4, 12] to mergedIntervals: [[1, 3], [4, 12]]
// No more intervals left to process.
// Final merged intervals: [[1, 3], [4, 12]]

// Explanation of Time Complexity
// The time complexity of an algorithm refers to the amount of time it takes to run, based on the size of the input.

// In the given algorithm, the time complexity is denoted as O(N), where N represents the total number of intervals.

// This means that as the number of intervals increases, the time taken by the algorithm will also increase linearly.

// For example, if there are 5 intervals, the algorithm will take a certain amount of time to complete. If the number of intervals is doubled to 10, the time taken will also approximately double.

// Explanation of Space Complexity
// The space complexity of an algorithm refers to the amount of memory space it requires.

// In this algorithm, the space complexity is constant, denoted as O(1), as it runs in constant space.

// This means that the amount of memory space used by the algorithm does not depend on the input size.

// However, if we consider the space needed for the result list (the merged intervals), the space complexity becomes O(N) because as the number of intervals increases, the space needed for the result list will also increase linearly.

// Summary
// The time complexity of the algorithm is O(N), and the space complexity is O(1) without considering the result list.
// Including the result list, the space complexity becomes O(N) due to the need to store the merged intervals.
// This explanation is geared towards an intermediate understanding of time and space complexity in algorithms.
