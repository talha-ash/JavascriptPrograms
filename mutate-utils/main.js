import { List } from "./List/index.js";

const list = List.newList([1, 2, 3]);
const list2 = List.push(list, 4);
const list3 = List.map(list2, (item) => item + 1);
const list4 = List.filter(list2, (item) => item % 2 == 0);
console.log(list);
console.log(list2);
console.log(list2 == list);
console.log(list3);
console.log(list2 == list3);
console.log(list4);
console.log(list4 == list3);
