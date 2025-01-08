import { getRandomColor } from "../Utils";

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
canvas.addEventListener("mousemove", function (event: MouseEvent) {
  mouse.x = event.x;
  mouse.y = event.y;
  init();
});

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
    this.speedX = Math.random() * 3 - 1.8;
    this.speedY = Math.random() * 3 - 1.8;
    this.innerColor = `hsl(${hue},100%,50%)`;
    this.outerColor = `hsl(${hue},50%,50%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.1) this.size -= 0.1;
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

function init() {
  //   particlesArray = [];
  for (let index = 0; index < 5; index++) {
    particlesArray.push(new Particle(mouse.x, mouse.y));
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100 && ctx) {
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
    if (particlesArray[i].size < 1) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "rgba(0,0,0,0.1)";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    hue += 5;
    handleParticles();
    requestAnimationFrame(animate);
  }
}

animate();

export {};
