// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // defined the Enemy function and told them where to start and how fast to go 
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = 62 + (82.5 * (Math.floor(Math.random() * 3)));
    this.speed = (Math.random() * 500) + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var endOfStone = 550;

    if (this.x <= endOfStone) {
        this.x += this.speed * dt;
    } else {
        this.x = -2;
    }
    // Reset the game if player hits a bug proximity by 30px
    if (player.x >= this.x - 30 && player.x <= this.x + 30) {
        if (player.y >= this.y - 30 && player.y <= this.y + 30) {
            alert('Play again?');
            // I tried to make the changes that were suggested by the reviewer. When I did my game broke.
            // I decided to think again and this is the solution I came up with. It uses less code in the end.
            // I just thought this was easier.             
            player.x = 200;
            player.y = 400;
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Tells the player where to start
var Player = function() {
    this.sprite = 'images/char-princess-girl.png';
    this.x = 200;
    this.y = 400;
    this.runsCompleted = 0;
};

//tells the player where the water is located
Player.prototype.update = function() {
    if (this.y <= 0) {
        this.runsCompleted += 1;
        alert('You won!');
        this.y = 400;
    };
    //keeps the princess from running off the screen
    if (this.x <= 0) {
        this.x = 0;
    }
    if (this.x >= 404) {
        this.x = 404;
    }
    if (this.y >= 404) {
        this.y = 404;
    };
};

// draws the player on he canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//this adds the movement in the keys so that the princess will actually move
Player.prototype.handleInput = function(key) {
    var direction = {
        'left': [-101, 0],
        'up': [0, -85.5],
        'right': [101, 0],
        'down': [0, 85.5]
    };
    this.x += direction[key][0];
    this.y += direction[key][1];
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

allEnemies[0] = new Enemy();
allEnemies[1] = new Enemy();
allEnemies[2] = new Enemy();
allEnemies[3] = new Enemy();

var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});