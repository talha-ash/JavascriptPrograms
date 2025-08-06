function encode(strList) {
  let result = "";

  for (let i = 0; i < strList.length; i++) {
    const len = strList[i].length;
    result += len + "." + strList[i];
  }
  return result;
}

function decode(str) {
  let result = [];
  let index = 0;
  while (index < str.length) {
    let j = index;
    while (str[j] !== ".") {
      j++;
    }
    let len = parseInt(str.substring(index, j));
    index = j + 1;
    j = index + len;
    result.push(str.substring(index, j));
    index = j;
  }
  return result;
}

const result1 = encode(["we", "say", ":", "yes", "!@#$%^&*()"]);
const result = decode(result1);
console.log(result1);
console.log(result);

// 2.we3.say1.:3.yes10.!@#$%^&*()
// [ 'we', 'say', ':', 'yes', '!@#$%^&*()' ]
