import { add } from "./calc";

describe("calculator", function () {
  it("should be able to add two numbers", function () {
    expect(add(1, 2)).toEqual(3);
  });
});
