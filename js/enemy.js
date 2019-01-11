class Enemy {
  constructor(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.stepSize = stepSizeX;
    this.boundary = this.stepSize * 5;
    this.resetPos = -this.stepSize;
  }

  // Update the enemy's position
  update(dt) {
    if (this.x < this.boundary) {
      this.x += this.speed * dt;
    } else {
      this.x = this.resetPos;
    }
  }

  // Render the enemy object
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}