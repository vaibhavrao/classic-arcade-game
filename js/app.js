// Size constants
const stepSizeX = 101;
const stepSizeY = 83;
const offsetY = 20;

// Type constants
const TYPE_LIFE_BOOST = 'life';
const TYPE_POINTS_BOOST = 'points';

// Constants for trophy assets
const blueGem = 'images/Gem Blue.png';
const greenGem = 'images/Gem Green.png';
const orangeGem = 'images/Gem Orange.png';
const heart = 'images/Heart.png';
const star = 'images/Star.png';
const key = 'images/Key.png';

// Array constants used for randomization
const gemsArray = [blueGem, greenGem, orangeGem];
const boostArray = [heart, star, key];
const speedArray = [150, 200, 250, 300];
const randomIndex = [0, 1, 2, 3, 4, 5];

// Row constants
const row1 = 1;
const row2 = 2;

// Mapping function to get points corresponding to each Gem
function pointsMap(value) {
  switch (value) {
    case blueGem:
      return 100;
    case greenGem:
      return 200;
    case orangeGem:
      return 300;
  }
}

// Generates a Random Gem element
function randomGem() {
  return gemsArray[Math.floor(Math.random() * gemsArray.length)];
}

// Generates a Random Boost element
function randomBoost() {
  return boostArray[Math.floor(Math.random() * boostArray.length)];
}

// Generates a Random Trophy location
function randomTrophyLocationIndex() {
  return randomIndex[Math.floor(Math.random() * randomIndex.length)];
}

// Generates a Random Speed
function randomSpeed() {
  return speedArray[Math.floor(Math.random() * speedArray.length)];
}

// Instantiates Trophies and loads them in the 'allTrophies' array
function populateTrophies() {
  const trophy1 = new Trophy((stepSizeX * randomTrophyLocationIndex()), ((stepSizeY * row1) + offsetY), TYPE_POINTS_BOOST ,randomGem());
  const trophy2 = new Trophy((stepSizeX * randomTrophyLocationIndex()), ((stepSizeY * row1) + offsetY), TYPE_LIFE_BOOST, randomBoost());
  const trophy3 = new Trophy((stepSizeX * randomTrophyLocationIndex()), ((stepSizeY * row2) + offsetY), TYPE_POINTS_BOOST ,randomGem());
  allTrophies.push(trophy1);
  allTrophies.push(trophy2);
  allTrophies.push(trophy3);
}

// Instantiate Trophies
let allTrophies = [];
populateTrophies();

// Instantiate Player
const player = new Player();

// Instantiate Enemies
const allEnemies = [];
const bug1 = new Enemy(0, 0, randomSpeed());
const bug2 = new Enemy(-(stepSizeX * 2), stepSizeY, randomSpeed());
const bug3 = new Enemy(-(stepSizeX * 3), (stepSizeY * 2), randomSpeed());

allEnemies.push(bug1);
allEnemies.push(bug2);
allEnemies.push(bug3);

// Key press listener - triggers player.handleInput to move player
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
