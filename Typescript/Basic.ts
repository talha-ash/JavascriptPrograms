//Structural Typing

type Point2d = { x: number; y: number };
type Point3d = { x: number; y: number; z: number };

let point2d = { x: 10, y: 10 };
let point3d = { x: 10, y: 10, z: 10 };

// we can assign 3d to 2d because 3d have all info need for 2d duck typing
point2d = point3d;
function takePoint2d(point: Point2d) {}
takePoint2d(point3d);

//but we can assign 2d to 3d because 2d dont have all info 3d need so property z required in 3d
// point3d = point2d;
// function takePoint3d(point: Point3d) {}
// takePoint3d(point2d);

/////////////////////////////////////////////////
