function func(list, target) {
  let l = 0;
  let r = list.length - 1;
  for (let i = 0; i < list.length; i++) {
    const sum = list[l] + list[r];
    if (target > sum) {
      l++;
    } else if (target < sum) {
      r--;
    } else {
      return l == r ? [-1, -1] : [l, r];
    }
  }
}

const nums = [1, 2, 3, 4, 6];

const result = func(nums, 6);
console.log(result);

// Step-by-Step Algorithm
// Initialize two pointers: Start with one pointer (left) at the beginning (index 0)
// and the other pointer (right) at the end (last index) of the array.
// Loop until pointers meet: Continue the loop until left is less than right.
// Calculate current sum: Add the elements at the left and right pointers.
// Check if the sum matches the target:
// If currentSum equals the target sum, return the indices [left, right].
// If currentSum is less than the target sum, increment the left pointer to
// increase the sum.
// If currentSum is more than the target sum, decrement the right pointer to
// decrease the sum.
// Return default values: If no pair is found, return [-1, -1].

function search(arr, targetSum) {
  let left = 0,
    right = arr.length - 1;
  while (left < right) {
    const currentSum = arr[left] + arr[right];
    if (currentSum === targetSum) {
      return [left, right];
    }

    if (targetSum > currentSum) {
      left += 1; // we need a pair with a bigger sum
    } else {
      right -= 1; // we need a pair with a smaller sum
    }
  }
  return [-1, -1];
}

//Can be solve with twosum solution using hash
function pairWithTargetSum(arr, targetSum) {
  const nums = {}; // to store numbers and their indices
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    if (targetSum - num in nums) {
      return [nums[targetSum - num], i];
    }
    nums[num] = i;
  }
  return [-1, -1];
}
// Since the given array is sorted, a brute-force solution could be to iterate
// through the array, taking one number at a time and searching for the second
// number through Binary Search. The time complexity of this algorithm will be .
//   Can we do better than this?

// To solve this problem, we can use a two-pointer approach. This approach
// is efficient because it takes advantage of the sorted nature of the array.
//   By starting with one pointer at the beginning and the other at the end,
// we can adjust their positions based on the sum of the elements they point to.
//   This allows us to find the pair that adds up to the target without needing
// to check all possible pairs, which saves time.
