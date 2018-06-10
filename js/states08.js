//INSIDE OF CAVE-> FINAL MAP
var crystalsCorrect = 0;
var crystalsPlaced = false;
var midColor;
var leftColor;
var rightColor;

var GamePlay8=function(game){};
GamePlay8.prototype = {

	// preloading assets.
	preload: function() {

		// Outputting to console.
		console.log('GamePlay8: preload');

	},

	// Creating assets into game world.
	create: function() {
		console.log('GamePlay8: create');
		bondSound.play('', 0, 0, true);
		cutSound.play('', 0, 0, true);
		autumnVoyage.stop();
		wind.stop();
		dialogue=false;
		caveAmb.play('', 0, 1, true);


		// Enabling Arcade Physics system.
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Adding a backgrofund.
		ceiling = game.add.sprite(0, 0, 'assets', 'scene8ceiling');
		game.physics.arcade.enable(ceiling);
		ceiling.body.immovable = true;

		map8 = game.add.sprite(0, 0, 'assets', 'scene8');

		midCrystal = game.add.sprite(375, 180, 'assets', 'midCrystalPurple');
		game.physics.arcade.enable(midCrystal);
		midCrystal.anchor.setTo(.5);
		midColor = 'P';
		midCrystal.animations.add('purple', ['midCrystalPurple'], 1, true);
		midCrystal.animations.add('red', ['midCrystalRed'], 1, true);
		midCrystal.animations.add('green', ['midCrystalGreen'], 1, true);

		leftCrystal = game.add.sprite(295, 210, 'assets', 'leftCrystalGreen');
		game.physics.arcade.enable(leftCrystal);
		leftCrystal.anchor.setTo(.5);
		leftColor = 'G';
		leftCrystal.animations.add('purple', ['leftCrystalPurple'], 1, true);
		leftCrystal.animations.add('red', ['leftCrystalRed'], 1, true);
		leftCrystal.animations.add('green', ['leftCrystalGreen'], 1, true);

		rightCrystal = game.add.sprite(470, 215, 'assets', 'rightCrystalRed');
		game.physics.arcade.enable(rightCrystal);
		rightCrystal.anchor.setTo(.5);
		rightColor = 'R';
		rightCrystal.animations.add('purple', ['rightCrystalPurple'], 1, true);
		rightCrystal.animations.add('red', ['rightCrystalRed'], 1, true);
		rightCrystal.animations.add('green', ['rightCrystalGreen'], 1, true);

		if(!crystalsPlaced)
		{
			midCrystal.alpha = 0;
			rightCrystal.alpha = 0;
			leftCrystal.alpha = 0;
		}
		
		//Adding the player sprite->Position depending on the bounds of map
		if (map == 5)
		{
			player = game.add.sprite(370, 530, 'scientist');
			player.anchor.setTo(.5);
		}

		game.physics.arcade.enable(player);
		//game.camera.follow(player);
		player.body.setSize(30, 48, 9, 0);
		player.body.collideWorldBounds = true;


		// Adding the player animations, left and right.
		player.animations.add('down', [0,1,2,1],10, true);
		player.animations.add('left', [3,4,5,4],10,true);
		player.animations.add('right',[6,7,8,7],10,true);
		player.animations.add('up', [9,10,11,10],10,true);

		crystals = game.add.group();
		crystals.enableBody = true;

		leftCluster = crystals.create(87, 461, 'assets', 'scene8crystal');
		leftCluster.anchor.setTo(.5);
		leftCluster.alpha = .9;
		leftCluster.body.setSize(120, 117, 37, 100);
		leftCluster.body.immovable = true;

		rightCluster = crystals.create(625, 400, 'assets', 'scene8crystal2');
		rightCluster.anchor.setTo(.5);
		rightCluster.alpha = .9;
		rightCluster.body.setSize(150, 120, 10, 135);
		rightCluster.body.immovable = true;

		createUI();
		createInventory();

		whiteScreen = game.add.sprite(0, 0, 'assets', 'WhiteScreen');
		whiteScreen.alpha = 0;

		crystalRScale = game.add.tween(leftCluster.scale).to( { x : 1.5, y : 1.5 }, 1000, Phaser.Easing.Linear.None, false, 0, 500, true);
		crystalRAlpha = game.add.tween(leftCluster).to( { alpha : 0 }, 1000, Phaser.Easing.Linear.None, false, 0, 2000, true);

		crystalLScale = game.add.tween(rightCluster.scale).to( { x : 1.5, y : 1.5 }, 1000, Phaser.Easing.Linear.None, false, 0, 500, true);
		crystalLAlpha = game.add.tween(rightCluster).to( { alpha : 0 }, 1000, Phaser.Easing.Linear.None, false, 0, 2000, true);

		whiteFadeIn = game.add.tween(whiteScreen).to( { alpha : 0 }, 1000, Phaser.Easing.Linear.None, false, 0, 1000, true);

	},
	update: function() 
	{
		// GamePlay logic
		
		// If the player presses SPACEBAR, activate current tool function.
		activateTool();
		// If player presses E, change the current tool function.
		toolToggle();

		if(!dialogue)
			movement();
		else
			player.animations.stop();

		advanceText();

		scannerBoxMovement();
		showInventory();

		if(leftColor == 'R')
			leftCrystal.animations.play('red');
		else if (leftColor == 'G')
			leftCrystal.animations.play('green');
		else
			leftCrystal.animation.play('purple');

		if(midColor == 'R')
			midCrystal.animations.play('red');
		else if (midColor == 'G')
			midCrystal.animations.play('green');
		else
			midCrystal.animation.play('purple');

		if(rightColor == 'R')
			rightCrystal.animations.play('red');
		else if (rightColor == 'G')
			rightCrystal.animations.play('green');
		else
			rightCrystal.animation.play('purple');

		//go to beach state of near top world bound
		if(player.body.y > 550 && player.body.x > 300 && player.body.x < 430)
		{
			map = 8;
			caveOpen=true;
			game.state.start('GamePlay5');
		}
		//go to river state if player is at right world bound
		/*if(player.body.x > 750 )
		{
			map = 3;
			playerY = player.body.y;
			game.state.start('GamePlay4');
		}*/

		// Checking for an overlap and collisions
		
	
		
		//MAKE A SEPARATE COLLISION FOR THE REST OF THE WALL/ROOM
		game.physics.arcade.collide(player, ceiling);
		game.physics.arcade.collide(player, crystals);
		game.physics.arcade.overlap(bondEffect, leftCrystal, placeCrystals, null, this);
		game.physics.arcade.overlap(bondEffect, rightCrystal, placeCrystals, null, this);
		game.physics.arcade.overlap(bondEffect, midCrystal, placeCrystals, null, this);
		
	},

}


