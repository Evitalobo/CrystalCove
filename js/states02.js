//This code has been adapted from Professor Nathan Altice's states 02.js file.

var game = new Phaser.Game(800, 600, Phaser.AUTO);

var menuText;
var gameText;
var gameOverText;
var playerSpeed = 5;

// define MainMenu state and methods
var MainMenu = function(game) {};
MainMenu.prototype = 
{
	preload: function() 
	{
		console.log('You are now in the Main menu state.');
	},
	create: function() 
	{
		console.log('MainMenu: create');
		game.stage.backgroundColor = "#999999";
	},
	update: function() 
	{
		// main menu logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) 
		{
			game.state.start('GamePlay');
		}
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
		game.load.spritesheet('scientist', 'assets/img/WalkSprite.png', 48, 48);
		game.load.image('scene1', 'assets/img/scene1.png');
	
	},

	// Creating assets into game world.
	create: function() 
	{
		console.log('GamePlay: create');

		// Enabling Arcade Physics system.
		game.physics.startSystem(Phaser.Physics.ARCADE);


		// Adding a backgrofund.
		map = game.add.sprite(0, 0, 'scene1');
		// Setting the background color to a dark gray.
		//game.stage.backgroundColor = "#454545";

		//Adding the player sprite
		player = game.add.sprite(25, 475, 'scientist');
		player.anchor.setTo(.5);

		//Adding the player physics
		game.physics.arcade.enable(player);
		//game.camera.follow(player);
		player.body.collideWorldBounds = true;

		// Adding the player animations, left and right.
		player.animations.add('down', [0,1,2,1],10, true);
		player.animations.add('left', [3,4,5,4],10,true);
		player.animations.add('right',[6,7,8,7],10,true);
		player.animations.add('up', [9,10,11,10],10,true);

		//Adding the player controls
		controls = {
			right: game.input.keyboard.addKey(Phaser.Keyboard.D),
			left: game.input.keyboard.addKey(Phaser.Keyboard.A),
			up: game.input.keyboard.addKey(Phaser.Keyboard.W),
			down: game.input.keyboard.addKey(Phaser.Keyboard.S),
		};

		//GUI status text
		menuText = game.add.text(75,250,'           You are in the gameplay state. \nPress SPACEBAR to go to the next state.', {fontSize: '32px', fill: '#999' });

	},
	update: function() 
	{
		// GamePlay logic

		// If the player presses SPACEBAR, go to next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay1');
		}

		//Resets player velocity

		if(controls.right.isDown)
		{
			player.body.x += playerSpeed;
			player.animations.play('right');
		}

		else if(controls.left.isDown)
		{
			player.body.x -= playerSpeed;
			player.animations.play('left');
		}
		else if(controls.up.isDown)
		{
			player.body.y -= playerSpeed;
			player.animations.play('up');
		}
		else if(controls.down.isDown)
		{
			player.body.y += playerSpeed;
			player.animations.play('down');
		}
		else
		{
			player.animations.stop();
			player.frame=1;
		}
	}
}

// define GamePlay state and methods
var GamePlay1 = function(game) {};
GamePlay1.prototype = {

	// preloading assets.
	preload: function() {

		// Outputting to console.
		console.log('GamePlay1: preload');

		// preloading assets
		game.load.spritesheet('scientist', 'assets/img/WalkSprite.png', 48, 48);
		game.load.image('scene2', 'assets/img/scene2.png');
	
	},

	// Creating assets into game world.
	create: function() 
	{
		console.log('GamePlay: create');

		// Enabling Arcade Physics system.
		game.physics.startSystem(Phaser.Physics.ARCADE);


		// Adding a backgrofund.
		map1 = game.add.sprite(0, 0, 'scene2');
		// Setting the background color to a dark gray.
		//game.stage.backgroundColor = "#454545";

		//Adding the player sprite
		player = game.add.sprite(25, 475, 'scientist');
		player.anchor.setTo(.5);

		//Adding the player physics
		game.physics.arcade.enable(player);
		//game.camera.follow(player);
		player.body.collideWorldBounds = true;

		// Adding the player animations, left and right.
		player.animations.add('down', [0,1,2,1],10, true);
		player.animations.add('left', [3,4,5,4],10,true);
		player.animations.add('right',[6,7,8,7],10,true);
		player.animations.add('up', [9,10,11,10],10,true);

		//Adding the player controls
		controls = {
			right: game.input.keyboard.addKey(Phaser.Keyboard.D),
			left: game.input.keyboard.addKey(Phaser.Keyboard.A),
			up: game.input.keyboard.addKey(Phaser.Keyboard.W),
			down: game.input.keyboard.addKey(Phaser.Keyboard.S),
		};

		//GUI status text
		menuText = game.add.text(75,250,'           You are in the gameplay state. \nPress SPACEBAR to go to the next state.', {fontSize: '32px', fill: '#999' });

	},
	update: function() 
	{
		// GamePlay logic

		// If the player presses SPACEBAR, go to next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay2');
		}

		//Resets player velocity

		if(controls.right.isDown)
		{
			player.body.x += playerSpeed;
			player.animations.play('right');
		}

		else if(controls.left.isDown)
		{
			player.body.x -= playerSpeed;
			player.animations.play('left');
		}
		else if(controls.up.isDown)
		{
			player.body.y -= playerSpeed;
			player.animations.play('up');
		}
		else if(controls.down.isDown)
		{
			player.body.y += playerSpeed;
			player.animations.play('down');
		}
		else
		{
			player.animations.stop();
			player.frame=1;
		}
	}
}


// define GamePlay state and methods
var GamePlay2 = function(game) {};
GamePlay2.prototype = {

	// preloading assets.
	preload: function() {

		// Outputting to console.
		console.log('GamePlay: preload');

		// preloading assets
		game.load.spritesheet('scientist', 'assets/img/WalkSprite.png', 48, 48);
		game.load.image('scene3', 'assets/img/scene3.png');
		
	},

	// Creating assets into game world.
	create: function() 
	{
		console.log('GamePlay: create');

		// Enabling Arcade Physics system.
		game.physics.startSystem(Phaser.Physics.ARCADE);


		// Adding a backgrofund.
		map2 = game.add.sprite(0, 0,'scene3');
		// Setting the background color to a dark gray.
		//game.stage.backgroundColor = "#454545";

		//Adding the player sprite
		player = game.add.sprite(25, 475, 'scientist');
		player.anchor.setTo(.5);

		//Adding the player physics
		game.physics.arcade.enable(player);
		//game.camera.follow(player);
		player.body.collideWorldBounds = true;

		// Adding the player animations, left and right.
		player.animations.add('down', [0,1,2,1],10, true);
		player.animations.add('left', [3,4,5,4],10,true);
		player.animations.add('right',[6,7,8,7],10,true);
		player.animations.add('up', [9,10,11,10],10,true);

		//Adding the player controls
		controls = {
			right: game.input.keyboard.addKey(Phaser.Keyboard.D),
			left: game.input.keyboard.addKey(Phaser.Keyboard.A),
			up: game.input.keyboard.addKey(Phaser.Keyboard.W),
			down: game.input.keyboard.addKey(Phaser.Keyboard.S),
		};

		//GUI status text
		menuText = game.add.text(75,250,'           You are in the gameplay state. \nPress SPACEBAR to go to the next state.', {fontSize: '32px', fill: '#999' });

	},
	update: function() 
	{
		// GamePlay logic

		// If the player presses SPACEBAR, go to next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GameOver');
		}

		//Resets player velocity

		if(controls.right.isDown)
		{
			player.body.x += playerSpeed;
			player.animations.play('right');
		}

		else if(controls.left.isDown)
		{
			player.body.x -= playerSpeed;
			player.animations.play('left');
		}
		else if(controls.up.isDown)
		{
			player.body.y -= playerSpeed;
			player.animations.play('up');
		}
		else if(controls.down.isDown)
		{
			player.body.y += playerSpeed;
			player.animations.play('down');
		}
		else
		{
			player.animations.stop();
			player.frame=1;
		}
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
		// GUI status text.
		menuText = game.add.text(75,250,'        You are in the game over state. \nPress SPACEBAR to go to the next state.', {fontSize: '32px', fill: '#FFFFFF' });
	},
	update: function() {
		// GameOver logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) 
		{
			game.state.start('MainMenu');
		}
	}
}

// add states to StateManager and start MainMenu
game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GamePlay1', GamePlay1 );
game.state.add('GamePlay2', GamePlay2);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');

