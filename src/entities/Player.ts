export class Player {
  x = 100;
  y = 250;

  width = 54;
  height = 54;

  velocity = 0;

  gravity = 0.45;
  jumpForce = -8;

  rotation = 0;

  image = new Image();
  private hasImage = false;

  constructor() {
    this.image.src = "/sprites/miku.png";
    this.image.onload = () => {
      this.hasImage = true;
    };
    this.image.onerror = () => {
      this.hasImage = false;
    };
  }

  jump() {
    this.velocity = this.jumpForce;
    // TODO: swap in a jump sound later with AudioManager.play("jump");
  }

  update() {
    this.velocity += this.gravity;
    this.velocity = Math.min(this.velocity, 10);
    this.y += this.velocity;
    this.rotation = Math.min(this.velocity * 4, 90);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate((this.rotation * Math.PI) / 180);

    if (this.hasImage && this.image.complete && this.image.naturalWidth > 0) {
      // TODO: replace this placeholder sprite with the final Miku art later.
      ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
    } else {
      ctx.fillStyle = "#ff7ac6";
      ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(-this.width / 6, -this.height / 8, 4, 0, Math.PI * 2);
      ctx.arc(this.width / 6, -this.height / 8, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#111";
      ctx.fillRect(-this.width / 8, this.height / 6, this.width / 4, 4);
      ctx.fillStyle = "#ffe7a3";
      ctx.fillRect(this.width / 4, -this.height / 8, this.width / 8, this.height / 8);
    }

    ctx.restore();
  }
}