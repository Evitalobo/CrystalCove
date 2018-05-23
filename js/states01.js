var GamePlay1 = function(game) {};
var woodText;
var woodNumber = 0;
var treesScanned = 0;
var stumpsScanned = 0;
var woodCt = 0;

GamePlay1.prototype = {

	// preloading assets.
	preload: function() {

		// Outputting to console.
		console.log('GamePlay1: preload');

	},

	// Creating assets into game world.
	create: function() {
		console.log('GamePlay: create');

		// Enabling Arcade Physics system.
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Adding a backgrofund.
		map1 = game.add.sprite(0, 0, 'assets', 'scene2');
		trail = game.add.sprite(0, 220, 'assets', 'path');
		trail.scale.setTo(2, .5);

		
		//Adding the player sprite->Position depending on the bounds of map
		if(map < 1)
		{
			player = game.add.sprite(25, playerY, 'scientist');
			player.anchor.setTo(.5);
		}
		else
		{
			player = game.add.sprite(690, playerY, 'scientist');
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

		// Creating the stars group.
		woods = game.add.group();
		woods.enableBody = true;
		stumps = game.add.group();
		stumps.enableBody = true;


		//spawning wood
		for (i = 0; i < 12; i++){
			if (i%2 == 0)
				wood = woods.create(i*65, Math.random()*150 - 120, 'assets', 'obj5');
			else
				wood = woods.create(i*50, Math.random()*200 + 225, 'assets', 'obj5');
			wood.scale.setTo(0.3,0.3);
			wood.body.setSize(130, 100, 140, 575);
			wood.body.immovable = true;
		}

		debris = game.add.emitter(0, 0, 200);
		debris.makeParticles('assets', 'obj3');
		debris.maxParticleScale = .2;
		debris.minParticleScale = .1;
		debris.alpha = .7;

		createUI();
		createInventory();

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

		//go to beach state of near left world bound
		if(player.body.x < 1)
		{
			map = 1;
			playerY = player.body.y;
			game.state.start('GamePlay');
		}
		//go to river state if player is at right world bound
		if(player.body.x > 750 )
		{
			map = 1
			playerY = player.body.y;
			game.state.start('GamePlay2');
		}

		// Checking for an overlap and collisions
		game.physics.arcade.overlap(cutEffect, woods, collectWood, null, this);
		game.physics.arcade.overlap(scanEffect, woods, treeFlavor, null, this);
		game.physics.arcade.overlap(scanEffect, stumps, stumpFlavor, null, this);
		game.physics.arcade.collide(player, woods);
		game.physics.arcade.collide(player, stumps);
	},

}

function collectWood(cutEffect, wood)
{
	//changes trees to stumps when certain conditions are met
	debris.x = wood.body.x + 20;
	debris.y = wood.body.y;
	debris.start(true, 1000, null, 15);
	stump = stumps.create(wood.body.x, wood.body.y - 5, 'assets', 'stump');
	stump.scale.setTo(0.1,0.08);
	stump.body.immovable = true;
	wood.destroy();
	woodCt += 1;
}