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
		riverTop = game.add.sprite(172, 0, 'assets', 'RiverTop');
		game.physics.arcade.enable(riverTop);
		riverTop.body.setSize(357, 260, 0, 0);
		riverTop.body.immovable = true;

		riverBot = game.add.sprite(170, 389, 'assets', 'RiverBot');
		game.physics.arcade.enable(riverBot);
		riverBot.body.immovable = true;
		riverBot.body.setSize(290, 211, 26, 0);

		riverMid = game.add.sprite(253, 289, 'assets', 'RiverMid');
		game.physics.arcade.enable(riverMid);
		riverMid.body.immovable = true;

		backdrop = game.add.sprite(0, 0, 'assets', 'scene3');

		bridge = game.add.sprite(390, 340, 'assets', 'bridge');
		bridge.anchor.setTo(.5);
		game.physics.arcade.enable(bridge);
		bridge.scale.setTo(.7, .8);
		bridge.alpha = 0;


		trail = game.add.sprite(40, 340, 'assets', 'path');
		trail.anchor.setTo(.5);
		trail.scale.setTo(.63, .27);

		trail1 = game.add.sprite(591, 360, 'assets', 'path3');
		trail1.anchor.setTo(.5);
		trail1.scale.setTo(.35, .345);


		trail2 = game.add.sprite(588, 490, 'assets', 'path 1');
		trail2.anchor.setTo(.5);
		trail2.scale.setTo(.35, .32);

		trail3 = game.add.sprite(730, 500, 'assets', 'path');
		trail3.anchor.setTo(.5);
		trail3.scale.setTo(.4, .33);

		//Adding the player sprite
		//Adding the player sprite->Position depending on the bounds of map
		if(map == 1)
		{
			player = game.add.sprite(25, playerY, 'scientist');
			player.anchor.setTo(.5);
		}
		else
		{
			player = game.add.sprite(750, playerY, 'scientist');
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

		crystal = game.add.sprite(150, 472, 'assets', 'bondCrystal');
		game.physics.arcade.enable(crystal);
		crystal.anchor.setTo(.5);
		crystal.body.setSize(69, 110, 20, 66);
		crystal.body.immovable = true;
		crystal.alpha = .8;

		createUI();
		createInventory();

		crystalScale = game.add.tween(crystal.scale).to( { x : 1.5, y : 1.5 }, 1000, Phaser.Easing.Linear.None, false, 0, 500, true);
		crystalAlpha = game.add.tween(crystal).to( { alpha : 0 }, 1000, Phaser.Easing.Linear.None, false, 0, 2000, true);
	},
	update: function() 
	{
		// GamePlay logic

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
		game.physics.arcade.overlap(scanEffect, crystal, bondCrystalFlavor, null, this);
		game.physics.arcade.overlap(bondEffect, riverMid, buildBridge, null, this);


		//go to beach state of near left world bound
		if(player.body.x < 1)
		{
			map = 2;
			playerY = player.body.y;
			game.state.start('GamePlay1');
		}
		if(player.body.x > 750)
		{
			map = 2;
			playerY = player.body.y;
			game.state.start('GamePlay3');
		}

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
		if(game.input.keyboard.justPressed(Phaser.Keyboard.M)) 
		{
			game.state.start('MainMenu');
		}
	}
}


