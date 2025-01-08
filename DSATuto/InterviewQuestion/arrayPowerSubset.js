a = [1, 2, 3, 4, 5];

function subset(nums) {
  let res = [[]];

  for (let i = 0; i < nums.length; i++) {
    const el = nums[i];
    const last = res.length;
    for (let x = 0; x < last; x++) {
      res.push([...res[x], el]);
    }
  }
  return res;
}

const result = subset([1, 2, 3, 4]);

console.log(result);

//Given an integer array nums of unique elements, return all possible
//subsets (the power set).

// Example 1:
// Input: nums = [1,2,3]
// Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

// Example 2:
// Input: nums = [0]
// Output: [[],[0]]


// we simply doing we take element and make set with already set exist in res
// when first loop reach index 2 mean 3 element we have res=[[],[1],[2],[1,2]]
//we make set 3 with existing res sets 
//3 - [] = [3]
//3-[1] = [1,3]
//3-[2]=[2,3]
//3-[1,2]=[1,2,3]
 //like this