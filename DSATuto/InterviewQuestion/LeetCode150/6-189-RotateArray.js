const nums = [1, 2, 3, 4, 5, 6, 7];
const k = 3;

//remember in this problem we have two portion in list 0 to k and k to end
// what if rotate list we get something better then rotate again two part that mention earliar
function rotateArrayImproved(nums, k) {
  //if k > thern list length so thats why we use modlus becuase rotation repeat if k  > list length and we dont want to go out of list length we repeat
  k = k % nums.length;
  nums.reverse();
  let r = 0;
  let l = k - 1;
  let temp = 0;
  while (r < l) {
    temp = nums[r];
    nums[r] = nums[l];
    nums[l] = temp;
    r++;
    l--;
  }
  r = k;
  l = nums.length - 1;
  while (r < l) {
    temp = nums[r];
    nums[r] = nums[l];
    nums[l] = temp;
    r++;
    l--;
  }
  return nums;
}

//just shifting solution
function rotateArray(nums, k) {
  if (k === 0) {
    return nums;
  }
  for (let i = 0; i < k; i++) {
    const currentElement = nums[nums.length - 1];
    for (let a = nums.length - 1; a >= 1; a--) {
      nums[a] = nums[a - 1];
    }
    nums[0] = currentElement;
  }
  return nums;
}
//newArray with Math formula
//shift element to from current index to k step in new result array
//then put back all element in nums array
function rotateArrayNewArray(nums, k) {
  let result = [];

  for (let i = 0; i < nums.length; i++) {
    const index = (i + k) % nums.length;
    result[index] = nums[i];
  }
  for (let i = 0; i < nums.length; i++) {
    nums[i] = result[i];
  }
  return nums;
}

const result = rotateArrayImproved(nums, k);

console.log(result);
