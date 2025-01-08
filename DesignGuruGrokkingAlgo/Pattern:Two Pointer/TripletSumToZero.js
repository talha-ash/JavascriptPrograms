function func(list) {
  list.sort((a, b) => a - b);
  let triplet = [];
  for (let i = 0; i < list.length; i++) {
    if (i > 0 && list[i] == list[i - 1]) {
      continue;
    }
    searchPair(list, -list[i], i + 1);
  }

  function searchPair(arr, target, left) {
    let right = arr.length - 1;
    while (left < right) {
      let f = arr[left];
      let s = arr[right];

      if (f + s > target) {
        right--;
      } else if (f + s < target) {
        left++;
      } else {
        triplet.push([-target, f, s]);
        left++;
        right--;
        while (left < right && arr[left] == arr[left + 1]) {
          left++;
        }
        while (left < right && arr[right] == arr[right - 1]) {
          right--;
        }
      }
    }
  }

  return triplet;
}

const nums = [-3, 0, 1, 2, -1, 1, -2];

const result = func(nums);
console.log(result);

// Solution
// This problem follows the Two Pointers pattern and
// shares similarities with Pair with Target Sum. A
// couple of differences are that the input array is not
// sorted and instead of a pair we need to find triplets
// with a target sum of zero.

// To follow a similar approach, first, we will sort the
// array and then iterate through it taking one number at
// a time. Let’s say during our iteration we are at number
// ‘X’, so we need to find ‘Y’ and ‘Z’ such that . At this
// stage, our problem translates into finding a pair whose
// sum is equal to “-X” (as from the above equation ).

// Another difference from Pair with Target Sum is that we
// need to find all the unique triplets. To handle this,
// we have to skip any duplicate number. Since we will be
// sorting the array, so all the duplicate numbers will be
// next to each other and are easier to skip.

// Step-by-Step Algorithm
// Sort the Array:

// Sort the input array in non-decreasing order. This
// helps in easily skipping duplicate elements and applying
// the two-pointer technique.
// Iterate through the Array:

// Use a for loop to iterate through the array, stopping at
// the third-to-last element.
// For each element, check if it's the same as the previous
// one to avoid duplicates.
// If it's the same, skip to the next iteration.
// Fix the Current Element and Find Pairs:

// Fix the current element and use two pointers to find pairs
// whose sum is the negative of the fixed element
//   (targetSum = -arr[i]).
// The left pointer starts from the next element (i + 1)
// and the right pointer starts from the end of the array.
// Find Pairs with Two Pointers:

// Calculate the sum of the left pointer and the right
// pointer (currentSum = arr[left] + arr[right]).
// If the currentSum equals targetSum, add the triplet
// to the list ([-targetSum, arr[left], arr[right]]) and move
// both pointers to the next unique elements.
// If currentSum is less than targetSum, move the left
// pointer to the right to increase the sum.
// If currentSum is greater than targetSum, move the right
// pointer to the left to decrease the sum.
// Skip Duplicates:

// Ensure that the left and right pointers skip duplicate
// elements to avoid counting the same triplet multiple times.
// Return the Result:

// After processing all elements, return the list of
// unique triplets.
// Algorithm Walkthrough
// Let's walk through the algorithm with the input
//   [-5, 2, -1, -2, 3].

// Sort the Array:

// Input: [-5, 2, -1, -2, 3]
// Sorted: [-5, -2, -1, 2, 3]
// Fix -5 (index 0), left pointer at -2 (index 1), and right
// pointer at 3 (index 4):

// Target Sum: -(-5) = 5
// Sum = -2 + 3 = 1 (less than targetSum), move left to -1 (index 2)
// Sum = -1 + 3 = 2 (less than targetSum), move left to 2 (index 3)
// Sum = 2 + 3 = 5, found triplet [-5, 2, 3]
// Move left to 4 and right to 3 (end of this iteration)
// Fix -2 (index 1), left pointer at -1 (index 2), and right
// pointer at 3 (index 4):

// Target Sum: -(-2) = 2
// Sum = -1 + 3 = 2, found triplet [-2, -1, 3]
// Move left to 2 and right to 3
// Fix -1 (index 2), left pointer at 2 (index 3), and right
// pointer at 3 (index 4):

// Target Sum: -(-1) = 1
// Sum = 2 + 3 = 5 (greater than targetSum), move right to 2
//   (end of this iteration)
// End of loop since all elements are processed.

// Output: [[ -5, 2, 3], [ -2, -1, 3]]

// Let's visualize the example 2 via below diagram.

// Complexity Analysis:
// Time Complexity
// Sorting the array: The first step in the algorithm is to
// sort the input array, which takes , where N is the number
// of elements in the input array.

// Outer loop: The main loop runs for each element in the
// array, excluding the last two, as those will be processed
// during the pair search. The loop runs approximately  times,
// which is .

// Inner loop (pair search): For each element processed by
// the outer loop, the algorithm uses the two-pointer
// technique to search for pairs that sum to the target value.
//   The two-pointer search for each element takes  time since
// the pointers traverse the entire array in a linear fashion.

// Overall time complexity: The total time complexity is the
// sum of the time spent sorting the array and the time spent in
// the two-pointer search for each element. This gives us a total
// time complexity of . Since  dominates  for large values
// of N, the overall time complexity is .

// Space Complexity
// Sorting the array: Sorting the array requires additional
// space, and this adds  space complexity.

// Triplets storage: The space used to store the resulting
// triplets is , where K is the number of triplets found.
//   In the worst case, this could be proportional to ,
// especially if there are many valid triplets.

// Additional variables: The algorithm uses constant
// extra space for variables like left, right, and
// currentSum, so this adds  to the space complexity.

// Overall space complexity:  for storing the output
// triplets and  for extra variables, resulting in  overall.
