import type { Scene } from "../core/Scene";
import { Game } from "../core/Game";
import { Player } from "../entities/Player";
import { Pipe } from "../entities/Pipe";
import { ScoreManager } from "../managers/ScoreManager";
import { GameOverScene } from "./GameOverScene";

export class GameScene implements Scene {
  private game: Game;

  player: Player;
  pipes: Pipe[] = [];

  score = 0;
  pipeSpawnTimer = 0;

  constructor(game: Game) {
    this.game = game;
    this.player = new Player();

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
    this.player.jump();
    // TODO: swap in a jump sound later with AudioManager.play("jump");
  };

  private gameOver() {
    ScoreManager.save(this.score);
    this.destroy();
    this.game.changeScene(new GameOverScene(this.game, this.score));
  }

  private checkCollision(pipe: Pipe): boolean {
    const playerLeft = this.player.x;
    const playerRight = this.player.x + this.player.width;
    const playerTop = this.player.y;
    const playerBottom = this.player.y + this.player.height;

    const pipeLeft = pipe.x;
    const pipeRight = pipe.x + pipe.width;

    const hitsPipe = playerRight > pipeLeft && playerLeft < pipeRight;
    const hitsTop = playerTop < pipe.topHeight;
    const hitsBottom = playerBottom > pipe.topHeight + pipe.gap;

    return hitsPipe && (hitsTop || hitsBottom);
  }

  update(delta: number): void {
    this.player.update();

    this.pipeSpawnTimer += delta;

    if (this.pipeSpawnTimer >= 1500) {
      this.pipes.push(new Pipe(this.game.canvas.width));
      this.pipeSpawnTimer = 0;
    }

    if (this.player.y < 0 || this.player.y + this.player.height > this.game.canvas.height) {
      this.gameOver();
      return;
    }

    this.pipes.forEach(pipe => {
      pipe.update(this.score);

      if (this.checkCollision(pipe)) {
        this.gameOver();
        return;
      }

      if (!pipe.scored && pipe.x + pipe.width < this.player.x) {
        pipe.scored = true;
        this.score++;
        // TODO: swap in a score sound later with AudioManager.play("score");
      }
    });

    this.pipes = this.pipes.filter(pipe => pipe.x + pipe.width > 0);
  }

  render(ctx: CanvasRenderingContext2D): void {
    const width = this.game.canvas.width;
    const height = this.game.canvas.height;

    ctx.fillStyle = "#76c7ff";
    ctx.fillRect(0, 0, width, height);

    // TODO: replace this placeholder sky with a background image when available.
    ctx.fillStyle = "#dff7ff";
    ctx.fillRect(0, 0, width, height * 0.42);

    ctx.fillStyle = "#7fdc91";
    ctx.fillRect(0, height * 0.72, width, height * 0.28);
    ctx.fillStyle = "#5fbc6b";
    ctx.fillRect(0, height * 0.70, width, height * 0.05);

    this.pipes.forEach(pipe => {
      pipe.draw(ctx, height);
    });

    this.player.draw(ctx);

    ctx.fillStyle = "#111";
    ctx.font = "24px Arial";
    ctx.fillText(`Score: ${this.score}`, 12, 32);
  }
}