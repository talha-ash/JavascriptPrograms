function func(nums) {
  let hash = {};

  for (let i = 0; i < nums.length; i++) {
    const ele = nums[i];
    hash[ele] = hash[ele] ? hash[ele] + 1 : 1;
  }

  let result = 0;
  for (let val in hash) {
    let count = hash[val];
    result += (count * (count - 1)) / 2;
  }
  return result;
}

const nums = [1, 1, 1, 1, 1, 1];

let result = func(nums);
console.log(result);

function numGoodPairs(nums) {
  let pairCount = 0;
  let map = {}; // Use an object instead of Map
  for (let n of nums) {
    map[n] = (map[n] || 0) + 1; // increment the count of 'n' in the map
    // every new occurrence of a number can be paired with every previous occurrence
    // so if a number has already appeared 'p' times, we will have 'p-1' new pairs
    pairCount += map[n] - 1;
  }
  return pairCount;
}
//store number of occurrence in hash
// then find number of pair formula and sum all
// like if we have 3 element we can make 3 pair
// in our example we sum = 3(1)+ 2(3) = 4
result = numGoodPairs(nums);
console.log(result);

// n(n-1)/2 formula to get how many pair can be formed
// form n items of list
