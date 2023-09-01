export class StylerError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "StylerError";
  }
}
