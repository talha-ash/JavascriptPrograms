const nums = [3, 2, 3];
const nums1 = [2, 2, 1, 1, 1, 2, 2];
function MajorityElement(nums) {
  let hash = {};
  let max = nums[0];
  for (let i = 0; i < nums.length; i++) {
    const ele = nums[i];
    if (!hash[ele]) {
      hash[ele] = 1;
      max = hash[ele] > hash[max] ? ele : max;
    } else {
      hash[ele] = hash[ele] + 1;
      max = hash[ele] > hash[max] ? ele : max;
    }
  }
  return max;
}
//Moore's Voting algorithm
function MajorityElementImproved(nums) {
  let count = 0;
  let res = nums[0];

  for (let i = 0; i < nums.length; i++) {
    if (count === 0) {
      res = nums[i];
    }
    if (nums[i] != res) {
      count--;
    } else {
      count++;
    }
  }
  return res;
}
const result = MajorityElementImproved(nums1);
console.log(result);

//we store elemene as key and +1 in value on each ocurrence as value in hash
// we also set max as first element of list
//as we iterate and element reocurre we compare hash[max] with hash current element if current big then replace it with maxi
