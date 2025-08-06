class Solution {
  compare(str1, str2) {
    // use two pointer approach to compare the strings
    let index1 = str1.length - 1,
      index2 = str2.length - 1;
    while (index1 >= 0 || index2 >= 0) {
      let i1 = this.get_next_valid_char_index(str1, index1),
        i2 = this.get_next_valid_char_index(str2, index2);
      console.log("Helo----------");
      console.log("i", i1);
      console.log("r", i2);
      if (i1 < 0 && i2 < 0) {
        // reached the end of both the strings
        return true;
      }
      if (i1 < 0 || i2 < 0) {
        // reached the end of one of the strings
        return false;
      }
      if (str1[i1] !== str2[i2]) {
        // check if the characters are equal
        return false;
      }

      index1 = i1 - 1;
      index2 = i2 - 1;
    }
    return true;
  }

  get_next_valid_char_index(str, index) {
    let backspaceCount = 0;
    while (index >= 0) {
      if (str[index] === "#") {
        // found a backspace character
        backspaceCount += 1;
      } else if (backspaceCount > 0) {
        // a non-backspace character
        backspaceCount -= 1;
      } else {
        break;
      }

      index -= 1; // skip a backspace or a valid character
    }

    return index;
  }
}

const str1 = "xy##";
const str2 = "x#y#";

const result = new Solution().compare(str1, str2);
console.log(result);

//My Solution was wrong
// Solution
// To compare the given strings, first, we need to apply the backspaces. An efficient way to do this would be from the end of both the strings. We can have separate pointers, pointing to the last element of the given strings. We can start comparing the characters pointed out by both the pointers to see if the strings are equal. If, at any stage, the character pointed out by any of the pointers is a backspace (’#’), we will skip and apply the backspace until we have a valid character available for comparison.

// Here's a detailed walkthrough of the algorithm:

// In the compare function, two pointers are initialized, index1 and index2, to the last index of str1 and str2, respectively.

// A while loop is started which continues until both pointers are less than zero, that is, both have traversed their strings completely in a reverse manner.

// Inside this loop, for each string, the getNextValidCharIndex function is called with the current pointer. This function returns the index of the next valid character in the string (traversing from back to front) by taking into account the backspace characters. i1 and i2 point to the index of the next valid character in the two strings.

// If both i1 and i2 are less than zero, it means the end of both strings has been reached, and the strings are considered equal.

// If only one of i1 or i2 is less than zero, it means the end of one string has been reached, but not the other, and the strings are not equal.

// If the characters at indices i1 and i2 are not the same, the strings are not equal.

// If none of the above conditions are met, the loop continues to the next valid characters in both strings.

// The getNextValidCharIndex function accepts a string and an index, and uses a backspace count to keep track of how many backspaces have been encountered. It then loops through the string backwards from the provided index until it encounters a valid character or reaches the beginning of the string.

// If a backspace character is found, the backspace count is incremented. If a non-backspace character is found and there are any counted backspaces, one backspace is subtracted from the count (to simulate the removal of the previous character), and the loop continues. If a non-backspace character is found and there are no backspaces left to account for, the loop breaks and the index of the valid character is returned.

// Algorithm Walkthrough
// Input: str1 = "xp#", str2 = "xyz##"

// Initial pointers: index1 = 2, index2 = 4
// Process str1 (xp#):
// index1 = 2 (points to #): increment backspaceCount = 1, move index1 to 1
// index1 = 1 (points to p): decrement backspaceCount = 0, move index1 to 0
// index1 = 0 (points to x): valid character found
// Process str2 (xyz##):
// index2 = 4 (points to #): increment backspaceCount = 1, move index2 to 3
// index2 = 3 (points to #): increment backspaceCount = 2, move index2 to 2
// index2 = 2 (points to z): decrement backspaceCount = 1, move index2 to 1
// index2 = 1 (points to y): decrement backspaceCount = 0, move index2 to 0
// index2 = 0 (points to x): valid character found
// Compare characters:
// Both characters are x (equal), move index1 to -1 and index2 to -1
// End of strings: Both pointers are less than zero, strings are equal.

// The time complexity of the given algorithm is as follows:

// Outer while loop: The compare() method runs a while loop as long as either index1 or index2 is greater than or equal to 0. This loop processes each character in both strings from right to left. Each iteration of the loop involves finding the next valid character using getNextValidCharIndex().

// getNextValidCharIndex() method: This method processes each character of the string at most once. When encountering a # (backspace), it increments the backspaceCount, and when it encounters a valid character after processing backspaces, it returns the index of the valid character. Each character is either counted or skipped exactly once. Therefore, the time complexity of this method is O(N), where N is the length of the string.

// Overall, the two strings are processed independently, so the overall time complexity is O(N + M), where N and M are the lengths of the two strings str1 and str2, respectively.

// The space complexity of the algorithm is as follows:

// Constant space usage: The algorithm uses a few integer variables (index1, index2, backspaceCount) to track positions and counts. These variables take up constant space.

// No additional data structures: The algorithm does not use any data structures that scale with the input size, as it works directly on the strings and uses only a fixed amount of space for the pointers and counts.

// Overall space complexity: O(1), since only a constant amount of extra space is used.
