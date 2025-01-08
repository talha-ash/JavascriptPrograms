function func(list, target) {
  let r = 1;
  let lastSum = 0;
  let result = [];
  for (let i = 0; i < list.length; i++) {
    const ele = list[i];
    result.push([ele]);
    lastSum = ele;
    r = i + 1;
    while (lastSum * list[r] < target && i < list.length - 1) {
      const s = list[r];
      lastSum *= s;
      const lastSub = result[result.length - 1];
      lastSub.push(s);
      result.push(lastSub);
      r++;
    }
  }
  return result;
}

const nums = [8, 2, 6, 5];

const result = func(nums, 50);
console.log(result);

// Solution
// This problem follows the Sliding Window and the Two Pointers pattern and shares similarities with Triplets with Smaller Sum with two differences:

// In this problem, the input array is not sorted.
// Instead of finding triplets with sum less than a target, we need to find all subarrays having a product less than the target.
// The implementation will be quite similar to Triplets with Smaller Sum. Here is a step-by-step explanation of the algorithm:

// The goal of this algorithm is to find all subarrays of a given integer array where the product of the numbers in the subarray is less than a specified target value.

// The algorithm uses a sliding window approach combined with a two-pointer method. A "window" of subarray is defined between the indices pointed to by two pointers, left and right.

// The window starts from the leftmost side of the array (both left and right at position 0) and slides to the right one element at a time, expanding the window. This expansion is represented by incrementing right.

// As we add a new element into the window (the right element), we multiply our current product with this new element.

// If at any point the product of the numbers within the window (from left to right) becomes greater than or equal to the target, we need to make the product smaller. This is achieved by moving the left pointer to the right (incrementing left), effectively excluding the left element from our window, and dividing our product by this removed element. We keep doing this until our product is less than target again.

// For each position of right, we create all possible subarrays that end at right, and that have a product less than the target. We do this by starting with a subarray that only includes the right element, then progressively adding the element to its left, and so on, until we reach the left pointer. All of these subarrays are added to the result.

// This process is repeated for each element in the array (each position of right), with the left boundary being adjusted as necessary.

// At the end of this process, result will contain all possible subarrays that have a product less than the target.

// Outer loop: The outer loop runs from right = 0 to right = N - 1, where N is the length of the input array. This loop runs  times.

// Inner while loop: For each iteration of the outer loop, the inner while loop adjusts the left boundary of the subarray whenever the product is greater than or equal to the target. In the worst case, the while loop moves the left pointer through all elements of the array, but this happens only once per element. Therefore, moving the left pointer takes an amortized  time in total.

// Nested subarray generation: For every element added in the result subarray, a new subarray is created and added to the result. The number of subarrays generated grows with each iteration of the outer loop. Specifically, for each value of right, the algorithm creates subarrays by moving from right to left, adding all valid subarrays.

// In the worst case, this generates  subarrays.
// Overall time complexity: The total time complexity is dominated by the generation of subarrays, which is .

// The total number of contiguous subarrays in an array with n elements can be calculated by considering all possible combinations of indices i and j, where i <= j. The total number of contiguous subarrays is the sum of the choices of j for all possible values of i.

// When i = 0, j can have any value from 0 to n-1, giving a total of n choices. When i = 1, j can have any value from 1 to n-1, giving a total of n-1 choices. Similarly, when i = 2, j can have n-2 choices, and so on. When i = n-1, j can only have 1 choice.

// Combining all these choices gives us a total of n*(n+1)/2.

// Therefore, the algorithm needs space for at most O(n^2) output lists. At worst, each subarray can take O(n) space, resulting in an overall space complexity of O(n^3).
//
//
// Space Complexity:
// The space complexity O(n³) comes from multiplying these factors:

// Number of subarrays: n(n+1)/2 ≈ O(n²)
// Maximum size of each subarray: O(n)

// For example, with array [1,2,3,4]:

// We have O(n²) subarrays: [1], [1,2], [1,2,3], [1,2,3,4], [2], [2,3], [2,3,4], [3], [3,4], [4]
// Each subarray can be up to length n (like [1,2,3,4])
// Multiplying these: O(n²) * O(n) = O(n³)
