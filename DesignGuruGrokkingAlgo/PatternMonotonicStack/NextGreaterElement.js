function func(nums1, nums2) {
  let stack = [];
  let hash = {};
  let i = 0;
  while (i < nums2.length) {
    const ele = nums2[i];

    while (stack.length && ele > stack[stack.length - 1]) {
      let popEle = stack.pop();
      hash[popEle] = ele;
    }

    stack.push(ele);

    i++;
  }
  let result = [];
  for (let i = 0; i < nums1.length; i++) {
    result.push(hash[nums1[i]]);
  }
  return result;
}

const result = func([4, 2, 6], [6, 2, 4, 5, 3, 7]);
console.log(result);

// Solution
// This problem requires us to find the next greater element for each element in nums1 by searching nums2. The output array contains either the next greater element or -1 if no such element exists.

// This problem can be solved using a Monotonic Stack and Hashmap. The Monotonic Stack helps to find the next greater element for each element in nums2. The Hashmap then maps each element to its next greater element.

// Algorithm Walkthrough

// Initialize an empty stack and an empty hashmap.
// Loop through the nums2 array from left to right.
// For each number in nums2, while the stack is not empty and the current number is greater than the top element of the stack:
// Pop the element from the stack and add an entry to the hashmap with the popped element as the key and the current number as the value.
// Push the current number onto the stack.
// After the loop, any numbers remaining on the stack do not have a next greater element, so for each of these numbers, add an entry to the hashmap with the number as the key and -1 as the value.
// Finally, create an output array by mapping each number in nums1 to its corresponding value in the hashmap.

//   Time and Space Complexity
//   Explanation
//   Time Complexity:

//   Time complexity refers to the amount of time taken by an algorithm to run as a function of the size of its input.
//   In this algorithm, the time complexity is represented as O(N), where N is the length of nums2, the input array. This means that the time taken by the algorithm grows linearly with the size of nums2.
//   Each element in nums2 is pushed and popped from the stack exactly once, contributing to the linear time complexity.
//   Space Complexity:

//   Space complexity refers to the amount of memory used by an algorithm as a function of the size of its input.
//   In this algorithm, the space complexity is represented as O(N) as well.
//   The additional space needed for the stack and the hashmap contributes to the linear space complexity.
//   Example:
//   def exampleAlgorithm(nums2):
//       stack = []
//       hashmap = {}
//       for num in nums2:
//           if num not in hashmap:
//               stack.append(num)
//               hashmap[num] = True
//           else:
//               stack.remove(num)
//       return stack
//   Conclusion
//   Understanding time and space complexity is important in analyzing the efficiency and performance of algorithms. It allows programmers to make informed decisions when choosing the appropriate algorithms for different scenarios.
