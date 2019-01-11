var Engine = (function(global) {
  var doc = global.document,
    win = global.window,
    canvas = doc.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    lastTime,
    id;

    canvas.width = 606;
    canvas.height = 606;
    doc.body.appendChild(canvas);

  function main() {
    var now = Date.now(),
      dt = (now - lastTime) / 1000.0;
      update(dt);
      render();
      lastTime = now;

      if (player.gameOver) {
        win.cancelAnimationFrame(id);
        showGameOver();
        const playAgain = document.querySelector('.playAgain');
        playAgain.addEventListener('click', function() {
          hideGameOver();
          player.reset();
          win.requestAnimationFrame(main);
        });
      } else {
        id = win.requestAnimationFrame(main);
      }
    }

    function showGameOver() {
      const gameOver = document.querySelector('.gameOver');
      gameOver.style.display = 'block';
      const gameOverHeader = document.querySelector('.gameOverHeader');
      if (player.gameWon) {
        gameOverHeader.innerHTML = '<h1>Congratulations, You Won!</h1><span class="section">Your score was ' + player.score + ' with ' + player.numLives + ' lives to spare</span>';
      } else {
        gameOverHeader.innerHTML = '<h1>Sorry, You Lost.</h1><span class="section">Your score was ' + player.score + '</span>';
      }
      document.querySelector('canvas').style.display = 'none';
      document.querySelector('.score-panel').style.display = 'none';
    }

    function hideGameOver() {
      const gameOver = document.querySelector('.gameOver');
      gameOver.style.display = 'none';
      document.querySelector('canvas').style.display = 'initial';
      document.querySelector('.score-panel').style.display = 'block';
    }

    // Initial Setup
    function init() {
      reset();
      lastTime = Date.now();
      main();
    }

    function update(dt) {
      updateEntities(dt);
    }

    function updateEntities(dt) {
      allEnemies.forEach(function(enemy) {
        enemy.update(dt);
      });
      player.update();
    }

    // Renders all the components of the game 
    function render() {
      var rowImages = [
        'images/water-block.png',   // Top row is water
        'images/stone-block.png',   // Row 1 of 3 of stone
        'images/stone-block.png',   // Row 2 of 3 of stone
        'images/stone-block.png',   // Row 3 of 3 of stone
        'images/grass-block.png',   // Row 1 of 2 of grass
        'images/grass-block.png'    // Row 2 of 2 of grass
      ],
      numRows = 6,
      numCols = 6,
      row, col;

      // Before drawing, clear existing canvas
      ctx.clearRect(0,0,canvas.width,canvas.height);

      // Draw the grid
      for (row = 0; row < numRows; row++) {
        for (col = 0; col < numCols; col++) {
          ctx.drawImage(Resources.get(rowImages[row]), col * stepSizeX, row * stepSizeY);
        }
      }
      renderEntities();
    }

    // Render all the entities on the board
    function renderEntities() {
      allEnemies.forEach(function(enemy) {
        enemy.render();
      });
      player.render();
      if (player.gameOver) {
        return;
      }
      if (allTrophies.length === 0) {
        populateTrophies();
        console.log('Trophies Re-loaded');
      }
      allTrophies.forEach(function(trophy) {
        trophy.render();
      });
    }

    function reset() {
      const score = document.querySelector('.score-panel');
      if (score) {
        score.innerHTML = '<span class="section">Lives: 3 </span><span class="section">|</span><span class="section">Score: 0</span>';
      }
    }

    // List of all the images used in the game
    Resources.load([
      'images/stone-block.png',
      'images/water-block.png',
      'images/grass-block.png',
      'images/enemy-bug.png',
      'images/char-boy.png',
      'images/Gem Blue.png',
      'images/Gem Green.png',
      'images/Gem Orange.png',
      'images/Heart.png',
      'images/Star.png',
      'images/Key.png',
    ]);
    Resources.onReady(init);

    // Assign the canvas' context object to the global variable
    global.ctx = ctx;
})(this);
