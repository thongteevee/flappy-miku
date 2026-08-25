import { type Scene } from "./Scene";
import { MenuScene } from "../scenes/MenuScene";

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  currentScene: Scene;

  private lastTime = 0;

  constructor() {
    this.canvas = document.createElement("canvas");

    this.canvas.width = 400;
    this.canvas.height = 600;

    document.body.appendChild(this.canvas);

    const context = this.canvas.getContext("2d");

    if (!context) {
      throw new Error("Could not create canvas context");
    }

    this.ctx = context;

    this.currentScene = new MenuScene(this);

    requestAnimationFrame(this.loop);
  }

  changeScene(scene: Scene) {
    this.currentScene.destroy?.();
    this.currentScene = scene;
  }

  private loop = (timestamp: number) => {
    const delta = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.currentScene.update(delta);

    this.ctx.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    this.currentScene.render(this.ctx);

    requestAnimationFrame(this.loop);
  };
}