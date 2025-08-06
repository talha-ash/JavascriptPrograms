const c = { c: 200 };
const a = { a: 109, b: 20, __proto__: c };

console.log(a.c);
console.log(Object.getPrototypeOf(a));
console.log(Object.getPrototypeOf(Object.getPrototypeOf(c)));

console.log(Object.keys(a));

const parent = {
  value: 10,
  method() {
    return this.value + 1;
  },
};

const child = {
  // value: 12,
  __proto__: parent,
};

console.log(child.method());

function Box(value) {
  this.value = value;
  // return {};
}

Box.prototype.getValue = function () {
  return this.value;
};

const box1 = new Box(1);
console.log(box1.getValue());
console.log(Object.getPrototypeOf(Box));

// Box.__proto__ → Function.prototype (the prototype of the constructor
// function)
// Box.prototype → the object that becomes myBox.__proto__ when you
// do const myBox = new Box()

// These lines are explaining why reassigning the entire
// Constructor.prototype object is problematic. Let me break it down:
// When you reassign Constructor.prototype (like Box.prototype =
//   someOtherObject), two main issues arise:

// You break the prototype chain for existing instances:

// Instances created before reassignment: Their [[Prototype]]
// still points to the original prototype object
// Instances created after reassignment: Their [[Prototype]]
// points to your new object
// This means changes to one prototype no longer affect instances
// using the other prototype

// You lose the constructor property:

// By default, Constructor.prototype.constructor points back to
// the constructor
// When you completely replace the prototype object, this link is lost
// This breaks the expectation that instance.constructor refers
// to the function that created it
// Some JavaScript operations rely on the constructor property
// being correctly set
