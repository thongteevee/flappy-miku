export interface Scene {
  update(delta: number): void;
  render(ctx: CanvasRenderingContext2D): void;
  destroy?(): void;
}