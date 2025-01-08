var productExceptSelf = function (nums) {
  let prefix = [];
  let postfix = [];
  let res = [];

  prefix[0] = nums[0];
  postfix[nums.length - 1] = nums[nums.length - 1];

  for (let i = 1; i < nums.length; i++) {
    prefix[i] = nums[i] * prefix[i - 1];
  }

  for (let i = nums.length - 2; i >= 0; i--) {
    postfix[i] = nums[i] * postfix[i + 1];
  }

  for (let i = 0; i < nums.length; i++) {
    if (i == 0) {
      res[i] = postfix[i + 1];
    } else if (i == nums.length - 1) {
      res[i] = prefix[i - 1];
    } else {
      res[i] = prefix[i - 1] * postfix[i + 1];
    }
  }

  console.log(prefix);
  console.log(postfix);
  console.log(res);
};

const result = productExceptSelf([1, 2, 3, 4]);
console.log(result);

//Problem solved using addition of postfix and prefix of
//the given number like 3 we can add 2 * 4  = 8
// input[(1, 2, 3, 4)];
// prefix[(1, 2, 6, 24)];
// postfix[(24, 24, 12, 4)];
// output[(24, 12, 8, 6)];
