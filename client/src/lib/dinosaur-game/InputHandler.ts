export class InputHandler {
  private keys: Set<string> = new Set();

  constructor() {
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    window.addEventListener('keydown', (event) => {
      this.keys.add(event.code);
    });

    window.addEventListener('keyup', (event) => {
      this.keys.delete(event.code);
    });
  }

  isKeyPressed(keyCode: string): boolean {
    return this.keys.has(keyCode);
  }

  isSpacePressed(): boolean {
    return this.isKeyPressed('Space');
  }
}
