var topKFrequent = function (nums, k) {
  const hash = {};

  for (let i = 0; i < nums.length; i++) {
    if (hash[nums[i]]) {
      hash[nums[i]]++;
    } else {
      hash[nums[i]] = 1;
    }
  }

  const bucket = new Array(nums.length + 1);

  for (value in hash) {
    bucket[hash[value]] = bucket[hash[value]]
      ? [...bucket[hash[value]], parseInt(value)]
      : [parseInt(value)];
  }

  let result = [];
  let index = bucket.length - 1;
  for (let i = index; i >= 0; i--) {
    if (bucket[i] && k > 0) {
      for (let j = 0; j < bucket[i].length; j++) {
        result.push(bucket[i][j]);
        k--;
      }
    }
  }
  return result;
};

const result = topKFrequent([1, 1, 1, 2, 2, 3], 2);
console.log(result);
