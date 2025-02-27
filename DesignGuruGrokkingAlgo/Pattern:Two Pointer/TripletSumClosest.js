function func(list, sourceTarget) {
  list.sort((a, b) => a - b);
  let smallest = Infinity;
  let resultSum = 0;
  for (let i = 0; i < list.length; i++) {
    let target = list[i];
    let left = i + 1;
    let right = list.length - 1;
    while (left < right) {
      let f = list[left];
      let s = list[right];
      const sum = target + f + s;

      if (sum == sourceTarget) {
        return sourceTarget;
      }
      if (sum < sourceTarget) {
        left++;
      } else {
        right--;
      }

      const newDiff = Math.abs(sourceTarget - sum);

      if (newDiff == smallest) {
        if (sum > sourceTarget) {
          resultSum = resultSum;
          smallest = smallest;
        } else {
          resultSum = sum;
          smallest = smallest;
        }
      } else if (newDiff < smallest) {
        resultSum = sum;
        smallest = newDiff;
      }
    }
  }

  return resultSum;
}

const nums = [0, 0, 1, 1, 2, 6];

const result = func(nums, 5);
console.log(result);

//Its A mixture of find small and three sum leet problem

// we get sum of every triplet and find difference between
// target to sum and replace with small if it small then previous

// Time Complexity O(N^2)
// Sorting the array: The algorithm first sorts the input array, which takes  time, where N is the number of elements in the array.

// Outer loop: The main loop runs  times (from index 0 to N-3), which gives us .

// Two-pointer search: For each iteration of the outer loop, the two-pointer search runs  to find the closest sum. Hence, the time complexity for the two-pointer search is  for each iteration of the outer loop.

// Overall time complexity: The total time complexity is , and since  dominates , the overall time complexity is .

// Space Complexity
// Sorting the array: Sorting the array requires additional space, and this adds  space complexity.

// Constant extra space: Apart from the space used by sorting, the algorithm only uses a few variables (left, right, smallestDifference), which take constant space .

// Overall space complexity: O(N) due to the space required by the sorting operation.
