import { getRandomColor, getRandomNumber } from "../Utils";

const canvas = <HTMLCanvasElement>document.getElementById("canvas1");
let hue = 0;
const ctx = canvas.getContext("2d");
let particlesArray: Array<Particle> = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const mouse = {
  x: 0,
  y: 0,
};

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  innerColor: string;
  outerColor: string;
  constructor(x?: number, y?: number) {
    this.x = x || Math.random() * canvas.width;
    this.y = y || Math.random() * canvas.height;
    this.size = Math.random() * 8 + 1;
    // this.speedX = Math.random() * 5 - 2.8;
    // this.speedY = Math.random() * 5 - 2.8;
    this.speedX = getRandomNumber(0.5, 2);
    this.speedY = getRandomNumber(0.5, 2);
    this.innerColor = "white";
    this.outerColor = this.innerColor;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw() {
    if (ctx) {
      ctx.fillStyle = this.innerColor;
      ctx.strokeStyle = this.outerColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }
}

function detectOutside(x: number, y: number) {
  if (x <= 1 || x >= canvas.width || y <= 1 || y >= canvas.height) {
    return true;
  }
  return false;
}
function init() {
  for (let index = 0; index < 30; index++) {
    particlesArray.push(new Particle(mouse.x, mouse.y));
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    if (detectOutside(particlesArray[i].x, particlesArray[i].y)) {
      particlesArray[i].speedX = -particlesArray[i].speedX;
      particlesArray[i].speedY = -particlesArray[i].speedY;
    }
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 200 && ctx) {
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
      const mouseDx = particlesArray[i].x - mouse.x;
      const mouseDy = particlesArray[i].y - mouse.y;
      const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
      if (mouseDist < 600 && ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hue += 5;
    handleParticles();
    requestAnimationFrame(animate);
  }
}

animate();
init();
canvas.addEventListener("mousemove", function (event: MouseEvent) {
  mouse.x = event.x;
  mouse.y = event.y;
});
export {};
