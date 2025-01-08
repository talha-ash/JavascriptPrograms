function twoSum(nums, target) {
  const indices = {};

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (indices[complement] >= 0) {
      return [indices[complement], i];
    }

    indices[nums[i]] = i;
  }
}

const target = 9;
const nums = [7, 11, 12, 2, 5, 10];

const result = twoSum(nums, target);
console.log(result);
