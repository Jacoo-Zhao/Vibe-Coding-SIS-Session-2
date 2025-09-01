import { Player } from './Player';
import { Ground } from './Ground';
import { InputHandler } from './InputHandler';

export class Game {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private player: Player;
  private ground: Ground;
  private inputHandler: InputHandler;
  private isRunning: boolean = false;
  private gameSpeed: number = 2;

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
    console.log('Game started');
  }

  jump(): void {
    if (this.isRunning) {
      this.player.jump();
    }
  }

  update(deltaTime: number): void {
    if (!this.isRunning) return;

    // Update game speed gradually
    this.gameSpeed += 0.001;
    
    // Update player
    this.player.update(deltaTime, this.ground.getGroundY());
    
    // Update ground
    this.ground.update(deltaTime, this.gameSpeed);
  }

  render(): void {
    // Clear canvas
    this.ctx.fillStyle = '#f7f7f7';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Render ground
    this.ground.render(this.ctx);
    
    // Render player
    this.player.render(this.ctx);
    
    // Render UI
    this.renderUI();
  }

  private renderUI(): void {
    // Game speed indicator
    this.ctx.fillStyle = '#333';
    this.ctx.font = '16px Arial';
    this.ctx.fillText(`Speed: ${this.gameSpeed.toFixed(1)}`, 10, 30);
    
    // Player state debug info
    const playerState = this.player.isJumping() ? 'Jumping' : 'Running';
    this.ctx.fillText(`State: ${playerState}`, 10, 50);
  }

  destroy(): void {
    this.isRunning = false;
    console.log('Game destroyed');
  }
}
