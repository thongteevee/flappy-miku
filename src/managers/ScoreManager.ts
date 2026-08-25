export class ScoreManager {
  private static readonly HIGH_SCORE_KEY =
    "highscore";

  static save(score: number): void {
    const current =
      this.getHighScore();

    if (score > current) {
      localStorage.setItem(
        this.HIGH_SCORE_KEY,
        score.toString()
      );
    }
  }

  static getHighScore(): number {
    const score =
      localStorage.getItem(
        this.HIGH_SCORE_KEY
      );

    return score
      ? Number(score)
      : 0;
  }

  static reset(): void {
    localStorage.removeItem(
      this.HIGH_SCORE_KEY
    );
  }
}