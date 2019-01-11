class Trophy {
  constructor(x, y, type, image) {
    this.x = x;
    this.y = y + 55;
    this.sprite = image;
    this.type = type; // Identifies if a trophy is a Gem or a Life boost
  }

  // Render the trophy
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}