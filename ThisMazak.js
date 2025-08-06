const protoObject = {
    incremment: () => {
      console.log(this);
      this.age++;
      // function add() {
      //   this.age++;
      // }
      // add();
    },
  };
  
  const createUser = (name, age) => {
    const user = Object.create(protoObject);
    user.name = name;
    user.age = age;
    return user;
  };
  let user1 = createUser("jeff", 10);
  
  user1.incremment();
  user1.incremment();
  console.log(user1.age);
  