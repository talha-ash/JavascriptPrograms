const permute = (nums) => {
  const list = [];
  backtrack(list, [], nums);
  return list;
};

const backtrack = (list, tempList, nums) => {
  if (tempList.length === nums.length) {
    list.push([...tempList]); // Create a copy to avoid modification issues
  } else {
    for (let i = 0; i < nums.length; i++) {
      if (tempList.includes(nums[i])) continue; // Check if element already exists
      tempList.push(nums[i]);
      backtrack(list, tempList, nums);
      tempList.pop();
    }
  }
};

const result = permute([1, 2, 3]);
console.log(result);
