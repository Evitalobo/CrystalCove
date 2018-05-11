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

		//controls movement of character
		if(controls.right.isDown)
		{
			player.body.x += playerSpeed;
			player.animations.play('right');
			faceUp = false;
			faceDown = false;
			faceLeft = false;
			faceRight = true;
		}

		else if(controls.left.isDown)
		{
			player.body.x -= playerSpeed;
			player.animations.play('left');
			faceUp = false;
			faceDown = false;
			faceLeft = true;
			faceRight = false;
		}
		else if(controls.up.isDown)
		{
			player.body.y -= playerSpeed;
			player.animations.play('up');
			faceUp = true;
			faceDown = false;
			faceLeft = false;
			faceRight = false;
		}
		else if(controls.down.isDown)
		{
			player.body.y += playerSpeed;
			player.animations.play('down');
			faceUp = false;
			faceDown = true;
			faceLeft = false;
			faceRight = false;
		}
		else
		{
			player.animations.stop();
			if(faceUp)
				player.frame = 10;
			if(faceDown)
				player.frame = 1;
			if(faceLeft)
				player.frame = 4;
			if(faceRight)
				player.frame = 7;


			if(player.body.x < 1){
			game.state.start('GamePlay1');
			}
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

