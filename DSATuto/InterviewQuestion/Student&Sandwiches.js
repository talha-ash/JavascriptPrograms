function countStudents(students, sandwiches) {
    let numStudentsUnableEat = 0;
    while (students.length && numStudentsUnableEat < students.length) {
      let student = students.shift();
      let sandwiche = sandwiches[0];
  
      if (student === sandwiche) {
        sandwiches.shift();
        numStudentsUnableEat = 0;
      } else {
        students.push(student);
        numStudentsUnableEat++;
      }
    }
    return students.length;
  }
  debugger;
  // const result = countStudents([1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1]);
  const result = countStudents([1, 1, 0, 0], [0, 1, 0, 1]);
  // const result = countStudents(
  //   [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  //   [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0]
  // );
  
  // const result = countStudents(
  //   [
  //     0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0,
  //     0, 0, 0, 0, 1, 1, 1,
  //   ],
  //   [
  //     1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1,
  //     0, 1, 1, 1, 0, 1, 0,
  //   ]
  // );
  console.log(result);
  