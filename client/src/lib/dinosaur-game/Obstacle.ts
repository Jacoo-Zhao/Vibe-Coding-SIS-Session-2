export class Obstacle {
  private x: number;
  private y: number;
  private width: number = 20;
  private height: number = 40;
  private speed: number;

  constructor(x: number, groundY: number, speed: number) {
    this.x = x;
    this.y = groundY - this.height;
    this.speed = speed;
  }

  update(deltaTime: number): void {
    // 从右向左移动
    this.x -= this.speed * (deltaTime / 16.67); // 60fps normalized
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    
    // 绘制仙人掌主体
    ctx.fillStyle = '#228B22';
    ctx.fillRect(this.x + 6, this.y + 10, 8, this.height - 10);
    
    // 绘制仙人掌左臂
    ctx.fillRect(this.x, this.y + 15, 10, 6);
    ctx.fillRect(this.x, this.y + 15, 4, 15);
    
    // 绘制仙人掌右臂
    ctx.fillRect(this.x + 10, this.y + 20, 10, 6);
    ctx.fillRect(this.x + 16, this.y + 20, 4, 10);
    
    // 绘制仙人掌刺
    ctx.fillStyle = '#654321';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 5; j++) {
        ctx.fillRect(this.x + 3 + i * 6, this.y + 12 + j * 6, 1, 2);
        ctx.fillRect(this.x + 5 + i * 6, this.y + 14 + j * 6, 1, 2);
      }
    }
    
    ctx.restore();
  }

  // 判断障碍物是否已经移出屏幕左侧
  isOffScreen(): boolean {
    return this.x + this.width < 0;
  }

  // 获取碰撞箱
  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  // 检查与玩家的碰撞
  checkCollision(playerBounds: { x: number; y: number; width: number; height: number }): boolean {
    const obstacleBounds = this.getBounds();
    
    return (
      playerBounds.x < obstacleBounds.x + obstacleBounds.width &&
      playerBounds.x + playerBounds.width > obstacleBounds.x &&
      playerBounds.y < obstacleBounds.y + obstacleBounds.height &&
      playerBounds.y + playerBounds.height > obstacleBounds.y
    );
  }
}