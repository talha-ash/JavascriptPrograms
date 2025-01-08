class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.size = Math.random() * 10 + 1;
    this.speedX = Math.random() * 3 - 1.2;
    this.speedY = Math.random() * 3 - 1.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.1) this.size -= 0.1;
  }
  draw() {
    if (this.ctx) {
      this.ctx.fillStyle = "brown";
      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = 3 * 2;
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
    }
  }
}

class PointParticles {
  particles: Array<Particle> = [];
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  pointX: number;
  pointY: number;
  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.initParticles();
    this.animate = this.animate.bind(this);
    this.pointX = 0;
    this.pointY = 0;
  }
  initParticles() {
    for (let i = 0; i < 100; i++) {
      this.particles.push(new Particle(this.ctx, this.pointX, this.pointY));
    }
  }
  blow(x: number, y: number) {
    this.pointX = x;
    this.pointY = y;
    this.initParticles();
    this.animate();
  }

  handleParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      particle.update();
      particle.draw();
      if (particle.size < 1) {
        this.particles.splice(i, 1);
        i--;
      }
    }
  }

  animate() {
    if (this.ctx) {
      // drwaingArc();
      this.handleParticles();
      if (this.particles.length >= 1) {
        console.log("Looping");
        requestAnimationFrame(this.animate);
      }
    }
  }
}

export default PointParticles;
