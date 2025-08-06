var findSubsets = function (nums, k) {
  const subsets = [];
  nums.sort((a, b) => a - b); // Sort the array (optional, but good practice)
  backtrack(subsets, [], nums, 0, k);
  return subsets;
};

function backtrack(subsets, tempList, nums, start, k) {
  if (tempList.length == k) {
    subsets.push([...tempList]); // Add a copy of the current tempList to the subsets
    return;
  }
  for (let i = start; i < nums.length; i++) {
    tempList.push(nums[i]);
    backtrack(subsets, tempList, nums, i + 1, k);
    tempList.pop(); // Remove the last element to backtrack
  }
}

const result = findSubsets([1, 2, 3], 2);
console.log(result);
