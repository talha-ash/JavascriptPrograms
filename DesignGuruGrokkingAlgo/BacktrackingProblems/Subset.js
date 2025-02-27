var findSubsets = function (nums) {
  const subsets = [];
  nums.sort((a, b) => a - b); // Sort the array (optional, but good practice)
  backtrack(subsets, [], nums, 0);
  return subsets;
};

function backtrack(subsets, tempList, nums, start) {
  subsets.push([...tempList]); // Add a copy of the current tempList to the subsets
  for (let i = start; i < nums.length; i++) {
    tempList.push(nums[i]);
    backtrack(subsets, tempList, nums, i + 1);

    tempList.pop(); // Remove the last element to backtrack
  }
}

const result = findSubsets([1, 2, 3]);
console.log(result);
