let life = document.getElementById('lives');
let score = document.getElementById('score');
// Enemies our player must avoid
let Enemy = function(x, y, pace) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.pace = pace;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // multiplies both the pace and the dt parameter on the x axis
    this.x = this.x + this.pace * dt;

    //this determines the pace and random positioning of the enemies once its off the canvas
    if (this.x > 515) {
        this.x = -55;
        this.pace = 100 + Math.floor(Math.random() * 222);
    };

    // collision detection
    if (player.x < this.x + 80
      && player.x + 80 > this.x
      && player.y < this.y + 60
      && 60 + player.y > this. y) {
      player.y = 401;
      player.x = 200;
      player.lives --;
      player.scores -= 5;
      // console.log(player.lives);
      // console.log(player.scores);
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
let Player = function (x, y) {

    // Variable for the players movement along x & y axis
    this.x = x;
    this.y = y;


    // Player sprite image added to the game
    this.player = 'images/char-boy.png';
    this.lives = 5;
    this.scores = 0;
};

// This class requires an update(), render() and
// a handleInput() method.

// Class for update()
Player.prototype.update = function(dt) {
  life.innerHTML = `Lives: ${this.lives}`;
  score.innerHTML = `Score: ${this.scores}`;
    if (this.lives === 0) {
      this.reset();
      alert('Game Over, Press OK to try again.');
    }else if(player.scores >= 170){
      this.reset();
      alert('Congratulations! You beat the game, Press OK to play again.');
    }
};

// Class for render()
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// a handleInput() method.
Player.prototype.handleInput = function (arrowKeys) {
    //Allows the to move in multiple directions (Top, Down, Left, Right)
    if (arrowKeys == 'up' && this.y > 0) {
      this.y -= 83;
    } else if (arrowKeys == 'down' && this.y < 401){
      this.y += 83;
    } else if (arrowKeys == 'left' && this.x > 0){
      this.x -= 101;
    } else if (arrowKeys == 'right' && this.x < 401) {
      this.x += 101;
    };

    // When the user reaches the top of the game (the water) they
    // will by sent back down to the bottom of the game.
    if (this.y < 0) {
      this.scores += 50;

      setTimeout(() =>{
          this.y = 401;
          this.x = 200;
      }, 500);
    };
};
//Reset the live & score
Player.prototype.reset = function (){
  this.lives = 5;
  this.scores = 0;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];

// determines the location of the three rows of enemies
let enemySpawn = [60, 140, 230];

enemySpawn.forEach(function (locateY) {
    enemy = new Enemy (0, locateY, 200);
    allEnemies.push(enemy);
});

// Place the player object in a variable called player
let player = new Player(200, 401);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
