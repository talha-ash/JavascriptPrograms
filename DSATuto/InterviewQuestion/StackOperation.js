const arr = ["5", "2", "C", "D", "+"];
const arr2 = ["5", "-2", "4", "C", "D", "9", "+", "+"];
function stackOpearationExe(operations) {
  let stack = [];
  let result = 0;
  let OperationalHandler = {
    C: () => {
      let ele = stack.pop();
      if (ele) {
        result = result - ele;
      }
    },
    D: () => {
      if (stack.length) {
        let ps = stack[stack.length - 1];
        let value = ps * 2;
        stack.push(value);
        result = result + value;
      }
    },
    "+": () => {
      if (stack.length >= 2) {
        let ps = stack[stack.length - 1] + stack[stack.length - 2];
        stack.push(ps);
        result = result + ps;
      }
    },
  };

  operations.map((operation) => {
    if (OperationalHandler[operation]) {
      OperationalHandler[operation]();
      return;
    }
    let number = +operation;
    result = result + number;
    stack.push(number);
  });
  return result;
}

const result = stackOpearationExe(arr);

console.log(result);
