function func(list, target) {
  list.sort((a, b) => a - b);
  let triplet = [];
  for (let i = 0; i < list.length - 3; i++) {
    if (i > 0 && list[i] == list[i - 1]) {
      continue;
    }
    for (let j = i + 1; j < list.length - 2; j++) {
      if (j > i + 1 && list[j] == list[j - 1]) {
        continue;
      }

      searchPair(list, target - (list[i] + list[j]), j + 1, i, j);
    }
  }

  function searchPair(arr, newTarget, left, i, j) {
    let right = arr.length - 1;
    while (left < right) {
      let f = arr[left];
      let s = arr[right];
      let sum = f + s;
      if (sum > newTarget) {
        right--;
      } else if (sum < newTarget) {
        left++;
      } else {
        triplet.push([list[i], list[j], f, s]);

        while (left < right && arr[left] == arr[left + 1]) {
          left++;
        }
        while (left < right && arr[right] == arr[right - 1]) {
          right--;
        }
        left++;
        right--;
      }
    }
  }

  return triplet;
}

const nums = [0, 0, 0, 0, 0, 0];

const result = func(nums, 0);
console.log(result);

// Solution
// This problem follows the Two Pointers pattern and shares similarities with "Triplet Sum to Zero".

// We can follow a similar approach to iterate through the array, taking one number at a time. At every step during the iteration, we will search for the quadruplets similar to Triplet Sum to Zero whose sum is equal to the given target.

// Here's a detailed walkthrough of the algorithm:

// In searchQuadruplets, the array is first sorted in ascending order. Sorting is important as it allows us to navigate our pointers based on the sum we're calculating and ensures that the generated quadruplets are in a predictable order.

// A List named quadruplets is created to store all the quadruplets found.

// The algorithm then loops over the array, stopping when there are less than four elements remaining (since we need groups of four).

// If the current element is the same as the previous one (and it's not the first), we skip this iteration to avoid duplicate quadruplets.

// A nested loop is initiated from the next index of the outer loop. This loop also ensures that the current element isn't the same as the previous one to avoid duplicates.

// The searchPairs function is called with the array, target value, indices of the first two elements, and the quadruplets list. This function will find pairs in the array (from second+1 index to the end) whose sum with arr[first] and arr[second] equals the target. Any valid quadruplets found are added to the quadruplets list.

// In searchPairs, two pointers left and right are initialized: left to second+1, and right to the last element of the array. It then enters a while loop that continues until left is less than right.

// Inside this loop, the sum of the elements at the current four indices (first, second, left, right) is calculated. If this sum equals targetSum, a valid quadruplet is found.

// This quadruplet is added to the quadruplets list, and both left and right pointers are moved inward. If the next elements are the same as the current elements of left and right respectively, they are skipped to avoid duplicates.

// If the calculated sum is less than targetSum, left is incremented to increase the sum (as the array is sorted), and if the sum is greater than targetSum, right is decremented to decrease the sum.

// This process repeats until left and right cross, by which point all possible pairs for the given first and second indices have been examined.

// Once searchPairs has processed all possible pairs for the given first and second indices, it returns, and the nested loop in searchQuadruplets continues until all possible starting points for quadruplets have been tried.

// Once all possible quadruplets have been considered, searchQuadruplets returns the quadruplets list.

// The main function in the code demonstrates usage of the searchQuadruplets function with two test cases. It runs searchQuadruplets with specified arrays and target sums, printing the results to the console.

// Algorithm Walkthrough
// Let's walk through the algorithm using the example input [4, 1, 2, -1, 1, -3] with a target of 1.

// Sort the Array:

// Input: [4, 1, 2, -1, 1, -3]
// Sorted Array: [-3, -1, 1, 1, 2, 4]
// Initialize Result List:

// quadruplets = []
// First Loop (i = 0):

// Current Element (arr[i] = -3)
// Second Loop (j = 1):
// Current Element (arr[j] = -1)
// Two Pointers: left = 2, right = 5
// Two-Pointer Process:

// First Sum Calculation:
// sum = arr[0] + arr[1] + arr[2] + arr[5]
// sum = -3 + (-1) + 1 + 4 = 1
// Matches Target: Add [-3, -1, 1, 4] to quadruplets
// Update Pointers:
// left = 3
// right = 4
// Check Duplicates:
// Skip duplicates by moving pointers:
// left moves to 4
// right moves to 4
// Second Sum Calculation:
// Pointers Overlap: End of this pair search
// Second Loop (j = 2):

// Current Element (arr[j] = 1)
// Two Pointers: left = 3, right = 5
// First Sum Calculation:
// sum = arr[0] + arr[2] + arr[3] + arr[5]
// sum = -3 + 1 + 1 + 4 = 3
// Greater Than Target: Move right pointer left
// right = 4
// Second Sum Calculation:
// sum = arr[0] + arr[2] + arr[3] + arr[4]
// sum = -3 + 1 + 1 + 2 = 1
// Matches Target: Add [-3, 1, 1, 2] to quadruplets
// Update Pointers:
// left = 4
// right = 3
// Check Duplicates:
// Skip duplicates by moving pointers:
// left moves to 4
// right moves to 3
// Pointers Overlap: End of this pair search
// Second Loop (j = 3):

// Current Element (arr[j] = 1) (Duplicate)
// Skip this element to avoid duplicates.
// First Loop (i = 1):

// Current Element (arr[i] = -1)
// Second Loop (j = 2):
// Current Element (arr[j] = 1)
// Two Pointers: left = 3, right = 5
// First Sum Calculation:
// sum = arr[1] + arr[2] + arr[3] + arr[5]
// sum = -1 + 1 + 1 + 4 = 5
// Greater Than Target: Move right pointer left
// right = 4
// Second Sum Calculation:
// sum = arr[1] + arr[2] + arr[3] + arr[4]
// sum = -1 + 1 + 1 + 2 = 3
// Greater Than Target: Move right pointer left
// right = 3
// Pointers Overlap: End of this pair search
// Second Loop (j = 3):

// Current Element (arr[j] = 1) (Duplicate)
// Skip this element to avoid duplicates.
// First Loop (i = 2):

// Current Element (arr[i] = 1)
// Second Loop (j = 3):
// Current Element (arr[j] = 1) (Duplicate)
// Skip this element to avoid duplicates.
// Final Result: The unique quadruplets are [[ -3, -1, 1, 4], [-3, 1, 1, 2]].
// Let's walkthrough the example 1 through diagram below.

// Complexity Analysis
// Time Complexity
// Sorting the array: The algorithm begins by sorting the input array, which takes , where N is the number of elements in the array.

// Outer loop (i): The first loop runs from i = 0 to i = N-4 (i.e., up to the fourth-to-last element in the array). This loop runs  times.

// Second loop (j): The second loop runs from j = i + 1 to j = N-3 (i.e., up to the third-to-last element in the array). This loop also runs  times for each iteration of the first loop.

// Two-pointer search (left and right): For each iteration of the second loop, the two-pointer technique is used to find the remaining two numbers. The two-pointer search takes  time in the worst case.

// Overall time complexity: The total time complexity is  because we have three nested loops and each one runs in linear time. Thus, the overall time complexity is .

// Space Complexity
// Sorting the array: Sorting requires additional space which is uses .

// Resultant quadruplets storage: The algorithm uses a list quadruplets to store the resulting quadruplets. In the worst case, there can be  quadruplets if many valid quadruplets are found.

// Auxiliary space: A few additional variables (i, j, left, right, etc.) are used, which require constant space .

// Overall space complexity: The space complexity for storing the result is , where K is the number of quadruplets, and  can be as large as . Adding the space for sorting, the total space complexity becomes  in the worst case.
