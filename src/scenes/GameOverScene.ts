import type { Scene } from "../core/Scene";
import { Game } from "../core/Game";
import { GameScene } from "./GameScene";
import { ScoreManager } from "../managers/ScoreManager";

export class GameOverScene implements Scene {
  private game: Game;
  private score: number;

  constructor(game: Game, score: number) {
    this.game = game;
    this.score = score;

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
    // TODO: play a hit sound here when the audio asset is ready.
  };

  update(): void {}

  render(ctx: CanvasRenderingContext2D): void {
    const width = this.game.canvas.width;
    const height = this.game.canvas.height;

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "white";
    ctx.font = "42px Arial";
    ctx.fillText("Game Over", 80, 220);

    ctx.font = "24px Arial";
    ctx.fillText(`Score: ${this.score}`, 130, 300);
    ctx.fillText(`High Score: ${ScoreManager.getHighScore()}`, 90, 350);
    ctx.fillText("Press Space or Tap", 88, 420);
  }
}