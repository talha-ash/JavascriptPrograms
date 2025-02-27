const combinationSum = (nums, target) => {
  const list = [];
  nums.sort((a, b) => a - b); // Sort the array in ascending order
  backtrack(list, [], nums, target, 0);
  return list;
};

const backtrack = (list, tempList, nums, remain, start) => {
  if (remain < 0) return;
  else if (remain === 0) {
    list.push([...tempList]); // Important: Create a copy of tempList before adding to the list
  } else {
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] == nums[i - 1]) continue; // skip duplicates
      tempList.push(nums[i]);
      backtrack(list, tempList, nums, remain - nums[i], i); // Use 'i' instead of 'i + 1' for reuse of elements
      tempList.pop();
    }
  }
};

const result = combinationSum([1, 2, 3], 2);
console.log(result);
