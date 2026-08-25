export class AssetManager {
  private static images =
    new Map<string, HTMLImageElement>();

  private static loaded = false;

  static async load(): Promise<void> {
    if (this.loaded) return;

    const assets = [
      {
        key: "miku",
        src: "/sprites/miku.png"
      },
      {
        key: "background",
        src: "/sprites/background.png"
      },
      {
        key: "pipe",
        src: "/sprites/pipe.png"
      }
    ];

    await Promise.all(
      assets.map(asset =>
        this.loadImage(
          asset.key,
          asset.src
        )
      )
    );

    this.loaded = true;
  }

  private static loadImage(
    key: string,
    src: string
  ): Promise<void> {
    return new Promise(
      (resolve, reject) => {
        const image = new Image();

        image.src = src;

        image.onload = () => {
          this.images.set(
            key,
            image
          );

          resolve();
        };

        image.onerror = () => {
          reject(
            new Error(
              `Failed to load ${src}`
            )
          );
        };
      }
    );
  }

  static getImage(
    key: string
  ): HTMLImageElement {
    const image =
      this.images.get(key);

    if (!image) {
      throw new Error(
        `Image '${key}' not loaded`
      );
    }

    return image;
  }
}