import PointParticles from "./ParticlesOnPoint";

const canvas = <HTMLCanvasElement>document.getElementById("canvas1");

const ctx = canvas.getContext("2d");
const pointParticles = new PointParticles(ctx!, canvas);
let box1: Box;
let box2: Box;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", function () {
  canvas.width = this.window.innerWidth;
  canvas.height = this.window.innerHeight;
});
//ctx!.
interface IMouse {
  x: number;
  y: number;
}
const mouse: IMouse = {
  x: 0,
  y: 0,
};
class Box {
  x: number;
  y: number;
  color: string;
  width: number;
  height: number;
  constructor(color: string) {
    // this.x = mouse.x;
    // this.y = mouse.y;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.width = 150;
    this.height = 50;
    this.color = color;
  }

  update() {
    this.x = mouse.x - this.width / 2;
    this.y = mouse.y - this.height / 2;
  }
  draw() {
    if (ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
canvas.addEventListener("mousemove", function (event: MouseEvent) {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mouse.x = event.x;
    mouse.y = event.y;
  }
});

function init() {
  box1 = new Box("orange");
  box2 = new Box("red");
}

function collisionDetection(first: Box, second: Box) {
  if (
    first.x + first.width > second.x &&
    first.x < second.x + second.width &&
    first.y + first.height > second.y &&
    first.y < second.y + second.height
  ) {
    pointParticles.blow((first.x + second.x) / 2, (first.y + second.y) / 2);
  }
}

function animate() {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    box2.draw();
    box1.update();
    box1.draw();
    collisionDetection(box1, box2);
    requestAnimationFrame(animate);
  }
}
init();
animate();
export {};
