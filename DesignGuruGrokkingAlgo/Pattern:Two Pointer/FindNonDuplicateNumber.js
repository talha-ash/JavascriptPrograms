function func(list, target) {
  let l = 0;
  let r = 0;
  for (let i = 0; i < list.length; i++) {
    const f = list[l];
    const s = list[r];
    if (s > f) {
      l++;
      list[l] = s;
      r++;
    } else if (s <= f) {
      r++;
    }
  }
  return l + 1;
}

const nums = [2, 2, 2, 11];

const result = func(nums);
console.log(result);

// Algorithm Walkthrough
//
// Let's walk through the algorithm with the array [2, 3, 3, 3, 6, 9, 9]:

// Initialization: Set nextNonDuplicate to 1.

// Initial Array: [2, 3, 3, 3, 6, 9, 9]
// nextNonDuplicate = 1
// Iteration:

// i = 1:
// Compare arr[0] (2) with arr[1] (3)
// They are different, so copy arr[1] to arr[1] (no actual change)
// Increment nextNonDuplicate to 2
// Array: [2, 3, 3, 3, 6, 9, 9]
// i = 2:
// Compare arr[1] (3) with arr[2] (3)
// They are the same, do nothing
// nextNonDuplicate remains 2
// i = 3:
// Compare arr[1] (3) with arr[3] (3)
// They are the same, do nothing
// nextNonDuplicate remains 2
// i = 4:
// Compare arr[1] (3) with arr[4] (6)
// They are different, so copy arr[4] to arr[2]
// Increment nextNonDuplicate to 3
// Array: [2, 3, 6, 3, 6, 9, 9]
// i = 5:
// Compare arr[2] (6) with arr[5] (9)
// They are different, so copy arr[5] to arr[3]
// Increment nextNonDuplicate to 4
// Array: [2, 3, 6, 9, 6, 9, 9]
// i = 6:
// Compare arr[3] (9) with arr[6] (9)
// They are the same, do nothing
// nextNonDuplicate remains 4
// Result: The number of unique elements is nextNonDuplicate,
// which is 4. The modified array is [2, 3, 6, 9, 6, 9, 9], and
// the first four elements [2, 3, 6, 9] are the unique elements.

// Similar Questions
//
// Problem 1: Given an unsorted array of numbers and a target
// ‘key’, remove all instances of ‘key’ in-place and return
// the new length of the array.

// Example 1:

// Input: [3, 2, 3, 6, 3, 10, 9, 3], Key=3
// Output: 4
// Explanation: The first four elements after removing every
// 'Key' will be [2, 6, 10, 9].
// Example 2:

// Input: [2, 11, 2, 2, 1], Key=2
// Output: 2
// Explanation: The first two elements after removing every
// 'Key' will be [11, 1].
