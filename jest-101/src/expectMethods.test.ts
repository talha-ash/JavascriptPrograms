import jsonpath from "jsonpath";

interface User {
  name: string;
  address: string;
  projects: Project[];
}
interface Project {
  name: string;
}

const user: User = {
  name: "Juntao Qiu",
  address: "Xian, Shaanxi, China",
  projects: [
    { name: "ThoughtWorks University" },
    { name: "ThoughtWorks Core Business Beach" },
  ],
};

//For whatever reason, in our test we don’t care about address at all. We
//do care if the name field contains Juntao and the project.name contains
//ThoughtWorks

const matcher = expect.objectContaining({
  name: expect.stringContaining("Juntao"),
  projects: expect.arrayContaining([
    { name: expect.stringContaining("ThoughtWorks") },
  ]),
});

describe("user", function () {
  it("match user", function () {
    expect(user).toEqual(matcher);
  });
});

//build our own matchers
const result = jsonpath.query(user, "$.projects");
const result1 = jsonpath.query(user, "$.projects[0].name");
//query return [] if path not match

expect.extend({
  toMatchJsonPath(received, argument) {
    const result = jsonpath.query(received, argument);
    if (result.length > 0) {
      return { pass: true, message: () => "matched" };
    } else {
      return {
        pass: false,
        message: () => `expected ${JSON.stringify(received)} to match
                jsonpath ${argument}`,
      };
    }
  },
});

// So internally, Jest would pass two parameters to the customizing
// matcher. The first one is the actual result – the one you pass to function
// expect(). The second one, on the other hand, is the expected value you
// passed to the matcher, which in our case is toMatchJsonPath.
// For the return value, it’s a simple JavaScript object that contains pass,
// which is a boolean value that indicates whether the test passes or not, and
// a message field to describe the reason for the pass or fail, respectively.
// Once defined, you can use it in your test just like any other built-in
// matchers:

describe("jsonpath", () => {
  it("matches jsonpath", () => {
    const user = {
      name: "Juntao",
    };
    expect(user).toMatchJsonPath("$.name");
  });
  it("does not match jsonpath", () => {
    const user = {
      name: "Juntao",
      address: "ThoughtWorks",
    };
    expect(user).not.toMatchJsonPath("$.age");
  });
});

// Impressive, isn’t it? This technique can be very handy in making
// your matcher more readable, especially when you want to use a Domain-­
// Specific Language.
// For example:
const employee = {};
expect(employee).toHaveName("Juntao");
expect(employee).toBelongToDepartment("Product Halo");
