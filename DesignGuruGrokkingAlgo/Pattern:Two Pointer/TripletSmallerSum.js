function func(list, target) {
  list.sort((a, b) => a - b);
  let triplets = [];
  for (let i = 0; i < list.length; i++) {
    let first = list[i];
    let left = i + 1;
    let right = list.length - 1;
    while (left < right) {
      let f = list[left];
      let s = list[right];
      const sum = first + f + s;

      if (sum < target) {
        triplets.push([first, f, s]);

        let innerRight = right - 1;
        while (innerRight > left) {
          triplets.push([first, f, list[innerRight]]);
          innerRight--;
        }
        left++;
      } else {
        right--;
      }
    }
  }

  return triplets.length;
}

const nums = [-1, 4, 2, 1, 3];

const result = func(nums, 5);
console.log(result);

// Solution
// This problem follows the Two Pointers pattern and shares similarities with Triplet Sum to Zero. The only difference is that, in this problem, we need to find the triplets whose sum is less than the given target. To meet the condition i != j != k we need to make sure that each number is not used more than once.

// Following a similar approach, first, we can sort the array and then iterate through it, taking one number at a time. Let’s say during our iteration we are at number ‘X’, so we need to find ‘Y’ and ‘Z’ such that . At this stage, our problem translates into finding a pair whose sum is less than “” (as from the above equation ). We can use a similar approach as discussed in "Triplet Sum to Zero".

// Here's a detailed walkthrough of the algorithm:

// The method searchTriplets starts by sorting the input array arr in ascending order. Sorting is important as it allows us to move our pointers based on the sum we are getting and how close we are to the target sum.

// The variable count is initialized to keep track of the total number of triplets found.

// The function then iterates through arr using a for loop, stopping when it is two positions from the end of arr (arr.length - 2). This is because we are always looking for triplets and thus don't need to consider the last two positions in this loop.

// Inside the for loop, we call the searchPair function with the array, the target value minus the current element, and the current index. This function will find all pairs within the array from index first+1 to the end of the array whose sum with arr[i] is less than target. The return value, which is the count of such pairs, is added to count.

// The searchPair function initializes two pointers: left to first+1 and right to the last element in the array. It then enters a while loop that continues as long as left is less than right.

// In the loop, if the sum of the elements at the left and right indices is less than targetSum, this means we have found a valid pair, because adding arr[first] would still result in a sum less than target. Since the array is sorted, all the elements between left and right with arr[first] will also form valid triplets. So, we add all these pairs to our count by adding right - left to count.

// We then increment left to move towards higher numbers in the array.

// If the sum of the elements at left and right is not less than targetSum, we need a smaller sum. Since the array is sorted, to achieve a smaller sum, we need to reduce the value of the larger number. Hence, we decrement right.

// This process repeats until left and right cross, at which point we have examined all possible pairs for our current value of first.

// Once searchPair has processed all possible pairs for the given first index, it returns the count of valid pairs.

// The loop in searchTriplets continues until we have tried every possible starting point for our triplet.

// Once all possible triplets have been considered, the searchTriplets function returns count, the total number of triplets whose sum is less than target.

// Algorithm Walkthrough
// Let's use the input arr = [-1, 4, 2, 1, 3] and target = 5.

// Sort the Array:

// Sorted array: [-1, 1, 2, 3, 4]
// Initialize Counter:

// count = 0
// Loop Through the Array:

// i = 0, fixed element is -1:
// Target sum for pairs: 5 - (-1) = 6
// Initialize pointers: left = 1, right = 4
// Search for Pairs:

// While left < right:
// sum = arr[1] + arr[4] = 1 + 4 = 5 (less than 6)
// Add right - left = 4 - 1 = 3 to count, move left to 2
// sum = arr[2] + arr[4] = 2 + 4 = 6 (not less than 6), move right to 3
// sum = arr[2] + arr[3] = 2 + 3 = 5 (less than 6)
// Add right - left = 3 - 2 = 1 to count, move left to 3
// End of while loop: count = 4
// Next Iteration:

// i = 1, fixed element is 1:
// Target sum for pairs: 5 - 1 = 4
// Initialize pointers: left = 2, right = 4
// While left < right:
// sum = arr[2] + arr[4] = 2 + 4 = 6 (not less than 4), move right to 3
// sum = arr[2] + arr[3] = 2 + 3 = 5 (not less than 4), move right to 2
// End of while loop: count = 4
// Next Iteration:

// i = 2, fixed element is 2:
// Target sum for pairs: 5 - 2 = 3
// Initialize pointers: left = 3, right = 4
// While left < right:
// sum = arr[3] + arr[4] = 3 + 4 = 7 (not less than 3), move right to 3
// End of while loop: count = 4
// Final Count:

// Return count = 4
// Let's visualize the example 2 via diagram below.

// Complexity Analysis
// Time Complexity
// Sorting the array: The first step of the algorithm is sorting the input array, which takes , where N is the number of elements in the array.

// Outer loop: The outer loop runs from index 0 to N-3, which takes  time.

// Inner two-pointer search (searchPair): For each element in the outer loop, the two-pointer search runs. In the worst case, the two-pointer technique checks all elements between left and right, and for each pair, it iterates over the range from right to left+1 to add valid triplets. This adds additional iterations within the inner loop, making the inner loop take  in the worst case.

// Adding triplets: For each valid triplet found, the algorithm iterates over all possible pairs between left and right, which takes  time.

// Overall time complexity: The time complexity for each iteration of the outer loop is  because for each element, the two-pointer search takes , and adding valid triplets takes another . As a result, the overall time complexity is .

// Space Complexity
// Sorting the array: If the sorting operation requires additional space (such as merge sort), it adds  space complexity.

// Triplets storage: The algorithm stores all unique triplets in the triplets list. In the worst case, the algorithm can store up to  triplets if many valid triplet combinations are found.

// Extra variables: The algorithm uses a few extra variables (left, right, and first), all of which take constant space .

// Overall space complexity:  for storing the triplets and  for sorting, resulting in  total space complexity.
