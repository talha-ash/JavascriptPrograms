// 97-122
// 65-90

// a,e,i,o,u
//
function reverseVowels(str) {
  let input = str.split("");
  const vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
  let l = 0;
  let r = str.length - 1;
  let temp = "";
  while (l <= r) {
    if (vowels.includes(input[l]) && vowels.includes(input[r])) {
      temp = input[l];
      input[l] = input[r];
      input[r] = temp;
      l++;
      r--;
    } else if (vowels.includes(input[l])) {
      r--;
    } else if (vowels.includes(input[r])) {
      l++;
    } else {
      l++;
      r--;
    }
  }
  return input.join("");
}

const input = "DesignGUrus";
const result = reverseVowels(input);
console.log(result);
