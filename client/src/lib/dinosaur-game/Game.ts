import { Player } from './Player';
import { Ground } from './Ground';
import { InputHandler } from './InputHandler';
import { Obstacle } from './Obstacle';

export class Game {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private player: Player;
  private ground: Ground;
  private inputHandler: InputHandler;
  private obstacles: Obstacle[] = [];
  private isRunning: boolean = false;
  private isGameOver: boolean = false;
  private gameSpeed: number = 2;
  private obstacleSpawnTimer: number = 0;
  private obstacleSpawnInterval: number = 2000; // 2 seconds
  private score: number = 0;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    
    // Initialize game objects
    this.ground = new Ground(width, height);
    this.player = new Player(100, this.ground.getGroundY() - 50);
    this.inputHandler = new InputHandler();
    
    console.log('Game initialized with dimensions:', width, 'x', height);
  }

  start(): void {
    this.isRunning = true;
    this.isGameOver = false;
    this.obstacles = [];
    this.score = 0;
    this.obstacleSpawnTimer = 0;
    console.log('Game started');
  }

  jump(): void {
    if (this.isRunning && !this.isGameOver) {
      this.player.jump();
    }
  }

  update(deltaTime: number): void {
    if (!this.isRunning || this.isGameOver) return;

    // Update game speed gradually
    this.gameSpeed += 0.001;
    
    // Update score
    this.score += this.gameSpeed * 0.1;
    
    // Update player
    this.player.update(deltaTime, this.ground.getGroundY());
    
    // Update ground
    this.ground.update(deltaTime, this.gameSpeed);
    
    // Update obstacles
    this.updateObstacles(deltaTime);
    
    // Check collisions
    this.checkCollisions();
  }

  render(): void {
    // Clear canvas
    this.ctx.fillStyle = '#f7f7f7';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Render ground
    this.ground.render(this.ctx);
    
    // Render obstacles
    this.obstacles.forEach(obstacle => obstacle.render(this.ctx));
    
    // Render player
    this.player.render(this.ctx);
    
    // Render UI
    this.renderUI();
    
    // Render game over screen
    if (this.isGameOver) {
      this.renderGameOver();
    }
  }

  private renderUI(): void {
    // Score
    this.ctx.fillStyle = '#333';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(`得分: ${Math.floor(this.score)}`, this.width - 150, 30);
    
    // Game speed indicator
    this.ctx.font = '16px Arial';
    this.ctx.fillText(`速度: ${this.gameSpeed.toFixed(1)}`, 10, 30);
    
    // Player state debug info
    const playerState = this.player.isJumping() ? 'Jumping' : 'Running';
    this.ctx.fillText(`状态: ${playerState}`, 10, 50);
  }

  private updateObstacles(deltaTime: number): void {
    // Spawn new obstacles
    this.obstacleSpawnTimer += deltaTime;
    if (this.obstacleSpawnTimer >= this.obstacleSpawnInterval) {
      this.spawnObstacle();
      this.obstacleSpawnTimer = 0;
      // 随着游戏进行，障碍物生成间隔逐渐缩短
      this.obstacleSpawnInterval = Math.max(1000, this.obstacleSpawnInterval - 50);
    }

    // Update existing obstacles
    this.obstacles.forEach(obstacle => obstacle.update(deltaTime));

    // Remove obstacles that are off-screen
    this.obstacles = this.obstacles.filter(obstacle => !obstacle.isOffScreen());
  }

  private spawnObstacle(): void {
    const obstacle = new Obstacle(this.width, this.ground.getGroundY(), this.gameSpeed + 2);
    this.obstacles.push(obstacle);
    console.log('Obstacle spawned');
  }

  private checkCollisions(): void {
    const playerBounds = this.player.getBounds();
    
    for (const obstacle of this.obstacles) {
      if (obstacle.checkCollision(playerBounds)) {
        this.gameOver();
        break;
      }
    }
  }

  private gameOver(): void {
    this.isGameOver = true;
    console.log('Game Over! Score:', Math.floor(this.score));
  }

  private renderGameOver(): void {
    // Semi-transparent overlay
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Game Over text
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '48px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('游戏结束!', this.width / 2, this.height / 2 - 60);
    
    // Final score
    this.ctx.font = '24px Arial';
    this.ctx.fillText(`最终得分: ${Math.floor(this.score)}`, this.width / 2, this.height / 2 - 20);
    
    // Restart instruction
    this.ctx.font = '18px Arial';
    this.ctx.fillText('按空格键重新开始', this.width / 2, this.height / 2 + 20);
    
    // Reset text align
    this.ctx.textAlign = 'left';
  }

  isGameOverState(): boolean {
    return this.isGameOver;
  }

  destroy(): void {
    this.isRunning = false;
    console.log('Game destroyed');
  }
}
