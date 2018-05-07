//This code has been adapted from Professor Nathan Altice's states 02.js file.

var game = new Phaser.Game(800, 600, Phaser.AUTO);

var menuText;
var gameText;
var gameOverText;
var playerSpeed = 150;
var jumpTimer =0;

// define MainMenu state and methods
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		console.log('You are now in the Main menu state.');
	},
	create: function() {
		console.log('MainMenu: create');
		game.stage.backgroundColor = "#999999";
	},
	update: function() {
		// main menu logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay');
		}

		// GUI status text
		menuText = game.add.text(75,250,'              You are in the menu state. \nPress SPACEBAR to go to the next state.', {fontSize: '32px', fill: '#000' });
	}
}

// define GamePlay state and methods
var GamePlay = function(game) {};
GamePlay.prototype = {

	// preloading assets.
	preload: function() {

		// Outputting to console.
		console.log('GamePlay: preload');

		// preloading assets
		game.load.image('whiteGround', 'assets/img/whiteGround.png');
		game.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
		game.load.spritesheet('scientist', 'assets/img/WalkSprite.png', 15, 50);
	},

	// Creating assets into game world.
	create: function() {
		console.log('GamePlay: create');

		// Enabling Arcade Physics system.
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Setting the background color to a dark gray.
		game.stage.backgroundColor = "#454545";

		//Adding the player sprite
		player = game.add.sprite(25, 475, 'scientist');
		player.anchor.setTo(0, 0);

		//Adding the player physics
		game.physics.arcade.enable(player);
		game.camera.follow(player);
		//player.body.bounce.y = 0.2;
		//player.body.gravity.y = 600;
		player.body.collideWorldBounds = true;

		// Adding the player animations, left and right.
		player.animations.add('down', [0,2],10, true);
		player.animations.add('left', [3,5],10,true);
		player.animations.add('right',[6,8],10,true);
		player.animations.add('up', [9,11],10,true);

		//Adding the player controls
		controls = {
			right: game.input.keyboard.addKey(Phaser.Keyboard.D),
			left: game.input.keyboard.addKey(Phaser.Keyboard.A),
			up: game.input.keyboard.addKey(Phaser.Keyboard.W),
			down: game.input.keyboard.addKey(Phaser.Keyboard.S),
		};


		// Creating a platforms group.
		platforms = game.add.group();
		platforms.enableBody = true;

		// Creating the ground.
		var ground = platforms.create(0, game.world.height - 64, 'whiteGround'); // Put the ground on the bottom of the playspace.
		ground.scale.setTo(2,2); // increase the scale of the ground.
		ground.body.immovable = true;

	},
	update: function() {
		// GamePlay logic

		// Have player collide with platforms.
		var hitPlatform = game.physics.arcade.collide(player,platforms);

		// If the player presses SPACEBAR, go to next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GameOver');
		}

		//Resets player velocity
		player.body.velocity.x = 0;

	if(controls.right.isDown){
		player.body.velocity.x += playerSpeed;
		player.animations.play('right');
	}

	else if(controls.left.isDown){
		player.body.velocity.x -= playerSpeed;
		player.animations.play('left');
	}
	else if(controls.up.isDown){
		player.body.velocity.y -= playerSpeed;
		player.animations.play('up');
	}
	else if(controls.down.isDown){
		player.animations.velocity.y += playerSpeed;
		player.animations.play('down');
	}
	else{
		player.animations.stop();
		player.frame=1;
	}
		// Allow the player to jump if they are touching the ground.
		if(controls.up.isDown && player.body.touching.down && hitPlatform){
			player.body.velocity.y = -350;
			//jumpTimer = game.time.now + 750;
		}


		//GUI status text
		menuText = game.add.text(75,250,'           You are in the gameplay state. \nPress SPACEBAR to go to the next state.', {fontSize: '32px', fill: '#999' });
	}
}

// define GameOver state and methods
var GameOver = function(game) {};
GameOver.prototype = {
	preload: function() {
		console.log('GameOver: preload');
	},
	create: function() {
		console.log('GameOver: create');
		game.stage.backgroundColor = "#000000";
	},
	update: function() {
		// GameOver logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('MainMenu');
		}

		// GUI status text.
		menuText = game.add.text(75,250,'        You are in the game over state. \nPress SPACEBAR to go to the next state.', {fontSize: '32px', fill: '#FFFFFF' });
	}
}

// add states to StateManager and start MainMenu
game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');

