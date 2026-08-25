export class Pipe {
  x: number;

  readonly width = 70;
  readonly gap = 180;

  topHeight: number;

  speed = 4;
  scored = false;

  constructor(canvasWidth: number) {
    this.x = canvasWidth;
    this.topHeight = Math.random() * 240 + 70;
  }

  update(score: number) {
    this.speed = Math.min(10, 4 + Math.floor(score / 10));
    this.x -= this.speed;
  }

  draw(ctx: CanvasRenderingContext2D, canvasHeight: number) {
    ctx.fillStyle = "#31a24c";
    ctx.fillRect(this.x, 0, this.width, this.topHeight);
    ctx.fillRect(this.x, this.topHeight + this.gap, this.width, canvasHeight - this.topHeight - this.gap);

    ctx.fillStyle = "#1d6f34";
    ctx.fillRect(this.x - 4, 0, this.width + 8, 16);
    ctx.fillRect(this.x - 4, this.topHeight - 16, this.width + 8, 16);
    ctx.fillRect(this.x - 4, this.topHeight + this.gap, this.width + 8, 16);
    ctx.fillRect(this.x - 4, canvasHeight - 16, this.width + 8, 16);

    // TODO: swap in a pipe sprite when the art asset is ready.
  }
}