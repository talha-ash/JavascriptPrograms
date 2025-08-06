const arr1 = [2, 3, 0, 0, 4];
const arr2 = [3, 2, 1, 0, 4];
const arr3 = [
  8, 2, 4, 4, 4, 9, 5, 2, 5, 8, 8, 0, 8, 6, 9, 1, 1, 6, 3, 5, 1, 2, 6, 6, 0, 4,
  8, 6, 0, 3, 2, 8, 7, 6, 5, 1, 7, 0, 3, 4, 8, 3, 5, 9, 0, 4, 0, 1, 0, 5, 9, 2,
  0, 7, 0, 2, 1, 0, 8, 2, 5, 1, 2, 3, 9, 7, 4, 7, 0, 0, 1, 8, 5, 6, 7, 5, 1, 9,
  9, 3, 5, 0, 7, 5,
];
const arr4 = [1, 2, 3];

let hash = {};
const canJumpLastIndex = (arr, currentIndex, ans) => {
  if (currentIndex >= arr.length - 1) {
    return true;
  }
  if (hash[currentIndex] === false) {
    return false;
  }
  for (let i = arr[currentIndex]; i >= 1; i--) {
    ans = canJumpLastIndex(arr, currentIndex + i, ans);
    if (ans) break;
  }
  hash[currentIndex] = hash[currentIndex] ? hash[currentIndex] : ans;
  return ans;
};

function improvedGreedy(nums) {
  let post = nums.length - 1;
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] + i >= post) {
      post = i;
    }
  }
  return post === 0 ? true : false;
}

function can_jump_1(nums) {
  let jumps_remaining = nums[0];
  for (let i = 0; i < nums.length; i++) {
    jumps_remaining = Math.max(jumps_remaining, nums[i]);
    if (i < nums.length - 1 && !jumps_remaining) {
      return false;
    }
    jumps_remaining -= 1;
  }
  return true;
}

function canJump_2(nums) {
  let reachable = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reachable) return false;
    reachable = Math.max(reachable, i + nums[i]);
  }
  return true;
}

let ans = false;
// const result = canJumpLastIndex(arr4, 0, ans);
debugger;
const result = letsTry(arr1);
console.log(hash);
console.log(result);
