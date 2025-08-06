const str = "()";
const str2 = "()[]{}";
const str3 = "(]";
const str4 = "[";
function validateParentheses(s) {
  let stack = [];
  let validDetail = { ")": "(", "}": "{", "]": "[" };
  let closeBrackets = [")", "]", "}"];
  debugger;
  for (let i = 0; i < s.length; i++) {
    const element = s[i];
    if (closeBrackets.includes(element)) {
      if (validDetail[element] !== stack.pop()) {
        return false;
      }
    } else {
      stack.push(element);
    }
  }
  return stack.length ? false : true;
}

const result = validateParentheses(str);

console.log(result);
