const canvas = <HTMLCanvasElement>document.getElementById("canvas1");

const ctx = canvas.getContext("2d");
const particlesArray: Array<Particle> = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", function () {
  canvas.width = this.window.innerWidth;
  canvas.height = this.window.innerHeight;
  drwaingRect();
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
canvas.addEventListener("mousemove", function (event: MouseEvent) {
  mouse.x = event.x;
  mouse.y = event.y;
  // drwaingArc();
});
// drwaingRect();

function drwaingArc() {
  if (ctx) {
    ctx.fillStyle = "brown";
    ctx.strokeStyle = "red";
    //arc are like line or path we need to tell javascript about it by using
    ctx.lineWidth = 3 * 2;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
    //we also need to fill or stroke the arc
    ctx.fill();
    ctx.stroke();
  }
}
function drwaingRect() {
  if (ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(10, 220, 150, 50);
    
    ctx.fillStyle = "orange";
    ctx.fillRect(220, 220, 150, 50);
  }
}

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  constructor() {
    // this.x = mouse.x;
    // this.y = mouse.y;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw() {
    if (ctx) {
      ctx.fillStyle = "brown";
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3 * 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }
}

function init() {
  for (let index = 0; index < 100; index++) {
    particlesArray.push(new Particle());
  }
}

function handleParticles() {
  for (let index = 0; index < particlesArray.length; index++) {
    particlesArray[index].update();
    particlesArray[index].draw();
  }
}
init();
function animate() {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drwaingArc();
    handleParticles();
    requestAnimationFrame(animate);
  }
}
animate();
export {};
