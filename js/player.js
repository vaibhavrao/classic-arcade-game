class Player {
  constructor() {
    this.offsetY = 55;
    this.startPosX = stepSizeX * 2;
    this.startPosY = (stepSizeY * 4) + this.offsetY;
    this.sprite = 'images/char-boy.png';
    this.reset();
  }
  
  // Render the player object
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // Detects collisions with enemies & trophies 
  // and updates the score and remaining lives accordingly
  update() {
    // check if player collided with an enemy
    for (let enemy of allEnemies) {
      if (this.y === enemy.y && ((enemy.x + (enemy.stepSize * 3/4) > this.x) && (enemy.x < this.x + (stepSizeX * 3/4)))) {
        // collision detected - reduce num of lives
        alert('collision');
        this.numLives--;
        if (this.score > 0) {
          this.score -= 100;
        }
        this.updateScore();
        console.log('collision detected', this.numLives);
        if (this.numLives) {
          this.resetPosition();
        } else {
          this.gameOver = true;
        }
      }
      if (this.y === this.offsetY) {
        this.gameOver = true;
        this.gameWon = true;
      }
    }
    // check if player claimed a trophy
    for (let trophy of allTrophies) {
      if (this.x === trophy.x && trophy.y === (this.y + offsetY)) {
        console.log('trophy hit', trophy.sprite, pointsMap(trophy.sprite));
        if (trophy.type === TYPE_POINTS_BOOST) {
          this.score += pointsMap(trophy.sprite);
        } else {
          this.numLives++;
        }
        this.updateScore(trophy);
      }
    }
  }

  // Update score
  updateScore(trophy) {
    const score = document.querySelector('.score-panel');
    if (score) {
      score.innerHTML = '<span class="section">Lives: ' + this.numLives + '</span><span class="section">|</span><span class="section">Score: ' + this.score + '</span>';
    }
    // if trophy object is passed, remove it from 'allTrophies' (since its been claimed)
    if (trophy) {
      const index = allTrophies.indexOf(trophy);
      allTrophies.splice(index, 1);
      console.log('num Trophies: ', allTrophies.length);
    }
  }

  // Reset Player position on the board
  resetPosition() {
    this.x = this.startPosX;
    this.y = this.startPosY;
  }

  // Reset Game stats (score, lives, etc.) and Player position
  reset() {
    this.resetPosition();
    this.gameOver = false;
    this.gameWon = false;
    this.numLives = 3;
    this.score = 0;
    allTrophies = [];
    this.updateScore();
  }

  // Handle movement of the user based on the keyboard inputs
  handleInput(direction) {
    switch (direction) {
      case 'up':
        this.y = this.y > stepSizeY ? this.y - stepSizeY : this.y;
        break;
      case 'down':
        this.y = (this.y < (stepSizeY * 4)) ? this.y + stepSizeY : this.y;
        break;
      case 'left':
        this.x = this.x > 0 ? this.x - stepSizeX : this.x;
        break;
      case 'right':
        this.x = (this.x < stepSizeX * 5) ? this.x + stepSizeX : this.x;
        break;
    }
  }
}