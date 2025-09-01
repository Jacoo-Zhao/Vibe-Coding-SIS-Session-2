export class Player {
  private x: number;
  private y: number;
  private velocityY: number = 0;
  private groundY: number;
  private isOnGround: boolean = true;
  private width: number = 40;
  private height: number = 50;
  
  // Physics constants
  private readonly GRAVITY = 0.8;
  private readonly JUMP_FORCE = -15;
  
  // Animation
  private animationFrame: number = 0;
  private animationSpeed: number = 0.2;

  constructor(x: number, groundY: number) {
    this.x = x;
    this.groundY = groundY;
    this.y = groundY;
  }

  jump(): void {
    if (this.isOnGround) {
      this.velocityY = this.JUMP_FORCE;
      this.isOnGround = false;
      console.log('Player jumped!');
    }
  }

  update(deltaTime: number, groundY: number): void {
    this.groundY = groundY;
    
    // Apply gravity
    if (!this.isOnGround) {
      this.velocityY += this.GRAVITY;
      this.y += this.velocityY;
      
      // Check ground collision
      if (this.y >= this.groundY) {
        this.y = this.groundY;
        this.velocityY = 0;
        this.isOnGround = true;
      }
    }
    
    // Update running animation
    this.animationFrame += this.animationSpeed * (deltaTime / 16.67); // 60fps normalized
    if (this.animationFrame >= 2) {
      this.animationFrame = 0;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    
    // Add glow effect
    ctx.shadowColor = '#9CA3AF';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // Draw dinosaur body with glow
    ctx.fillStyle = '#4a5568';
    ctx.fillRect(this.x, this.y - this.height, this.width, this.height);
    
    // Draw dinosaur head with glow
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(this.x + 25, this.y - this.height - 15, 20, 20);
    
    // Reset shadow for eye (don't want glowing eye)
    ctx.shadowBlur = 0;
    
    // Draw eye
    ctx.fillStyle = '#fff';
    ctx.fillRect(this.x + 35, this.y - this.height - 10, 6, 6);
    ctx.fillStyle = '#000';
    ctx.fillRect(this.x + 37, this.y - this.height - 8, 2, 2);
    
    // Restore glow for legs and tail
    ctx.shadowColor = '#9CA3AF';
    ctx.shadowBlur = 10;
    
    // Draw legs (animated when running)
    ctx.fillStyle = '#4a5568';
    if (this.isOnGround) {
      const legOffset = Math.floor(this.animationFrame) * 3;
      // Left leg
      ctx.fillRect(this.x + 8 + legOffset, this.y, 6, 15);
      // Right leg
      ctx.fillRect(this.x + 20 - legOffset, this.y, 6, 15);
    } else {
      // Legs together when jumping
      ctx.fillRect(this.x + 10, this.y, 6, 15);
      ctx.fillRect(this.x + 18, this.y, 6, 15);
    }
    
    // Draw tail
    ctx.fillStyle = '#4a5568';
    ctx.fillRect(this.x - 10, this.y - this.height + 10, 15, 8);
    
    ctx.restore();
  }

  isJumping(): boolean {
    return !this.isOnGround;
  }

  getBounds() {
    return {
      x: this.x,
      y: this.y - this.height,
      width: this.width,
      height: this.height
    };
  }
}
