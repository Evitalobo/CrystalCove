var bridgeBuilt = false;

// define GamePlay state and methods
var GamePlay2 = function(game) {};
GamePlay2.prototype = {

	// preloading assets.
	preload: function() {

		// Outputting to console.
		console.log('GamePlay: preload');

		// preloading assets
		game.load.spritesheet('scientist', 'assets/img/WalkSprite.png', 48, 48);
		
	},

	// Creating assets into game world.
	create: function() 
	{
		console.log('GamePlay: create');

		// Enabling Arcade Physics system.
		game.physics.startSystem(Phaser.Physics.ARCADE);


		// Adding a background.
		backdrop = game.add.sprite(0, 0, 'assets', 'scene3');

		riverTop = game.add.sprite(172, 0, 'assets', 'RiverTop');
		game.physics.arcade.enable(riverTop);
		riverTop.body.setSize(357, 260, 0, 0);
		riverTop.body.immovable = true;

		riverBot = game.add.sprite(170, 389, 'assets', 'RiverBot');
		game.physics.arcade.enable(riverBot);
		riverBot.body.immovable = true;
		riverBot.body.setSize(290, 211, 26, 0);

		bridge = game.add.sprite(360, 330, 'assets', 'obj1');
		bridge.anchor.setTo(.5);
		game.physics.arcade.enable(bridge);
		bridge.angle = 180;
		bridge.scale.setTo(.5, .4);
		bridge.alpha = 0;

		riverMid = game.add.sprite(253, 289, 'assets', 'RiverMid');
		game.physics.arcade.enable(riverMid);
		riverMid.body.immovable = true;

		//Adding the player sprite
		//Adding the player sprite->Position depending on the bounds of map
		if(map == 1)
		{
			player = game.add.sprite(25, playerY, 'scientist');
			player.anchor.setTo(.5);
		}
		else
		{
			player = game.add.sprite(690, playerY, 'scientist');
			player.anchor.setTo(.5);
			bridgeBuilt = true;
		}

		//Adding the player physics
		game.physics.arcade.enable(player);
		//game.camera.follow(player);
		player.body.setSize(30, 48, 9, 0);
		player.body.collideWorldBounds = true;


		// Adding the player animations, left and right.
		player.animations.add('down', [0,1,2,1],10, true);
		player.animations.add('left', [3,4,5,4],10,true);
		player.animations.add('right',[6,7,8,7],10,true);
		player.animations.add('up', [9,10,11,10],10,true);


		post = game.add.sprite(0, 0, 'assets', 'bridgePost');

		crystal = game.add.sprite(78, 375, 'assets', 'Crystal02');
		game.physics.arcade.enable(crystal);
		crystal.body.setSize(69, 110, 20, 66);
		crystal.body.immovable = true;

		//GUI status text
		menuText = game.add.text(300,60,' Press M to go to menu', {fontSize: '32px', fill: '#999' });

		createUI();
		createInventory();
	},
	update: function() 
	{
		// GamePlay logic
		//game.debug.body(crystal);

		// If the player presses SPACEBAR, activate current tool function.
		activateTool();
		// If player presses SHIFT, change the current tool function.
		toolToggle();

		if(!dialogue)
			movement();
		else
			player.animations.stop();

		advanceText();

		scannerBoxMovement();
		showInventory();

		if (bridgeBuilt)
		{
			bridge.alpha = 1;
			riverMid.kill();
		}

		game.physics.arcade.collide(player, riverTop);
		game.physics.arcade.collide(player, riverBot);
		game.physics.arcade.collide(player, riverMid);
		game.physics.arcade.collide(player, crystal);
		game.physics.arcade.overlap(scanEffect, riverTop, riverFlavor, null, this);
		game.physics.arcade.overlap(scanEffect, riverBot, riverFlavor, null, this);
		game.physics.arcade.overlap(scanEffect, bridge, bridgeFlavor, null, this);
		//game.physics.arcade.overlap(bondEffect, riverMid, buildBridge, null, this);


		//go to beach state of near left world bound
		if(player.body.x < 1)
		{
			map = 2;
			playerY = player.body.y;
			game.state.start('GamePlay1');
		}
		//go to river state if player is at right world bound
		/*if(player.body.x > 750)
		{
			map = 2;
			playerY = player.body.y;
			game.state.start('GamePlay3');
		}*/

		//menustateswitch
		if(game.input.keyboard.justPressed(Phaser.Keyboard.M))
		{
			game.state.start('MainMenu');

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


