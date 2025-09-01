export class Obstacle {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private speed: number;
  private obstacleType: 'tall' | 'medium' | 'short';

  constructor(x: number, groundY: number, speed: number) {
    this.x = x;
    this.speed = speed;
    
    // 随机选择障碍物类型和大小
    const rand = Math.random();
    if (rand < 0.33) {
      this.obstacleType = 'short';
      this.width = 18;
      this.height = 25;
    } else if (rand < 0.66) {
      this.obstacleType = 'medium';
      this.width = 22;
      this.height = 35;
    } else {
      this.obstacleType = 'tall';
      this.width = 25;
      this.height = 50;
    }
    
    this.y = groundY - this.height;
  }

  update(deltaTime: number): void {
    // 从右向左移动
    this.x -= this.speed * (deltaTime / 16.67); // 60fps normalized
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    
    // 根据障碍物类型调整颜色
    let mainColor = '#228B22';
    let spineColor = '#654321';
    
    if (this.obstacleType === 'short') {
      mainColor = '#32CD32'; // 浅绿色
    } else if (this.obstacleType === 'tall') {
      mainColor = '#006400'; // 深绿色
    }
    
    // 计算尺寸比例
    const scale = this.height / 40; // 基于原始高度40的比例
    const centerX = this.x + this.width / 2;
    
    // 绘制仙人掌主体
    ctx.fillStyle = mainColor;
    const bodyWidth = Math.max(6, 8 * scale);
    const bodyHeight = this.height - 10;
    ctx.fillRect(centerX - bodyWidth/2, this.y + 10, bodyWidth, bodyHeight);
    
    // 根据大小绘制仙人掌臂（只有中等和大型有臂）
    if (this.obstacleType !== 'short') {
      // 左臂
      const leftArmWidth = Math.max(8, 10 * scale * 0.8);
      const leftArmHeight = Math.max(4, 6 * scale * 0.8);
      const leftArmY = this.y + this.height * 0.4;
      ctx.fillRect(centerX - leftArmWidth, leftArmY, leftArmWidth, leftArmHeight);
      ctx.fillRect(centerX - leftArmWidth, leftArmY, Math.max(3, 4 * scale * 0.8), Math.max(10, 15 * scale * 0.8));
      
      // 右臂（只有大型仙人掌有右臂）
      if (this.obstacleType === 'tall') {
        const rightArmWidth = Math.max(8, 10 * scale * 0.7);
        const rightArmHeight = Math.max(4, 6 * scale * 0.7);
        const rightArmY = this.y + this.height * 0.5;
        ctx.fillRect(centerX, rightArmY, rightArmWidth, rightArmHeight);
        ctx.fillRect(centerX + rightArmWidth - Math.max(3, 4 * scale * 0.7), rightArmY, Math.max(3, 4 * scale * 0.7), Math.max(8, 10 * scale * 0.7));
      }
    }
    
    // 绘制仙人掌刺
    ctx.fillStyle = spineColor;
    const spineRows = Math.max(2, Math.floor(this.height / 8));
    const spineCols = Math.max(2, Math.floor(this.width / 8));
    
    for (let i = 0; i < spineCols; i++) {
      for (let j = 0; j < spineRows; j++) {
        const spineX = this.x + (i * this.width / spineCols) + 3;
        const spineY = this.y + 12 + (j * this.height / spineRows);
        ctx.fillRect(spineX, spineY, 1, Math.max(1, 2 * scale));
        ctx.fillRect(spineX + 2, spineY + 2, 1, Math.max(1, 2 * scale));
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