import type { Scene } from "../core/Scene";
import { Game } from "../core/Game";
import { GameScene } from "./GameScene";

export class MenuScene implements Scene {
  private game: Game;

  constructor(game: Game) {
    this.game = game;

    window.addEventListener("keydown", this.handleKey);
    window.addEventListener("pointerdown", this.handleAction);
    window.addEventListener("touchstart", this.handleAction, { passive: true });
    window.addEventListener("mousedown", this.handleAction);
  }

  destroy() {
    window.removeEventListener("keydown", this.handleKey);
    window.removeEventListener("pointerdown", this.handleAction);
    window.removeEventListener("touchstart", this.handleAction);
    window.removeEventListener("mousedown", this.handleAction);
  }

  private handleKey = (event: KeyboardEvent) => {
    if (event.code === "Space" || event.code === "ArrowUp" || event.key === " ") {
      event.preventDefault();
      this.handleAction();
    }
  };

  private handleAction = () => {
    this.destroy();
    this.game.changeScene(new GameScene(this.game));
    // TODO: play a menu start sound here once the asset exists.
  };

  update(): void {}

  render(ctx: CanvasRenderingContext2D): void {
    const width = this.game.canvas.width;
    const height = this.game.canvas.height;

    ctx.fillStyle = "#87ceeb";
    ctx.fillRect(0, 0, width, height);

    // TODO: replace the placeholder art with the final menu sprite.
    ctx.fillStyle = "#ff8bbd";
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.24, 44, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#111";
    ctx.font = "bold 40px Arial";
    ctx.fillText("Flappy Miku", 78, 220);

    ctx.font = "24px Arial";
    ctx.fillText("Press Space or Tap", 92, 300);
    ctx.font = "18px Arial";
    ctx.fillText("Avoid the pipes and flap to survive!", 28, 340);
  }
}