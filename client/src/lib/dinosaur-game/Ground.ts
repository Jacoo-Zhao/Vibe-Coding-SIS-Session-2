export class Ground {
  private width: number;
  private height: number;
  private groundHeight: number = 20;
  private groundY: number;
  private groundOffset: number = 0;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.groundY = height - this.groundHeight;
  }

  update(deltaTime: number, speed: number): void {
    // Move ground for scrolling effect
    this.groundOffset += speed * (deltaTime / 16.67); // 60fps normalized
    if (this.groundOffset >= 20) {
      this.groundOffset = 0;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    // Draw ground
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, this.groundY, this.width, this.groundHeight);
    
    // Draw ground pattern/texture
    ctx.fillStyle = '#A0522D';
    for (let x = -this.groundOffset; x < this.width; x += 20) {
      ctx.fillRect(x, this.groundY + 5, 10, 5);
    }
    
    // Draw grass on top
    ctx.fillStyle = '#228B22';
    for (let x = -this.groundOffset; x < this.width; x += 8) {
      ctx.fillRect(x, this.groundY - 3, 4, 3);
      ctx.fillRect(x + 2, this.groundY - 5, 2, 2);
    }
    
    // Draw horizon line
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, this.groundY);
    ctx.lineTo(this.width, this.groundY);
    ctx.stroke();
  }

  getGroundY(): number {
    return this.groundY;
  }
}
