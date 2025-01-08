const s = "kayak";
function isPalindrome(s) {
  // Replace this placeholder return statement with your code
  let right = s.length - 1;
  let left = 0;
  while (left <= right) {
    if (s[left] !== s[right]) {
      return false;
    }
    right--;
    left++;
  }
  return true;
}

const result = isPalindrome(s);
console.log(result);
