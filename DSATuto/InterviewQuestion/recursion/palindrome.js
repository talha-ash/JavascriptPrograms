function isPalindrome(str) {
  function recurse(str, l, r) {
    if (l >= r) {
      return true;
    }

    let result = recurse(str, ++l, --r);
    if (str[l] == str[r]) {
      return result;
    } else {
      return false;
    }
  }
  function recurseImproved(str, l, r) {
    if (l >= r) {
      return true;
    }
    if (str[l] !== str[r]) {
      return false;
    }
    return recurseImproved(str, ++l, --r);
  }
  return recurseImproved(str, 0, str.length - 1);
}
debugger;
const result = isPalindrome("saas");

console.log(result);

// time complexity is O(n)
// Space complexity is O(n)
