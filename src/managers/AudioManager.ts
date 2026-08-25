export class AudioManager {
  private static sounds = new Map<
    string,
    HTMLAudioElement
  >();

  static load() {
    this.sounds.set(
      "jump",
      new Audio("/audio/jump.wav")
    );

    this.sounds.set(
      "score",
      new Audio("/audio/score.wav")
    );

    this.sounds.set(
      "hit",
      new Audio("/audio/hit.wav")
    );
  }

  static play(sound: string) {
    const audio =
      this.sounds.get(sound);

    if (!audio) {
      console.warn(
        `Sound '${sound}' not found`
      );
      return;
    }

    audio.currentTime = 0;
    audio.play();
  }

  static setVolume(volume: number) {
    this.sounds.forEach(audio => {
      audio.volume = volume;
    });
  }
}