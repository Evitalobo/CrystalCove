var GamePlay1 = function(game) {};
var woodText;
var woodNumber = 0;
var treesScanned = 0;
var stumpsScanned = 0;
var wood;

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
		if(map == 0)
		{
			player = game.add.sprite(25, playerY, 'scientist');
			player.anchor.setTo(.5);
		}
		else
		{
			player = game.add.sprite(690, playerY, 'scientist');
			player.anchor.setTo(.5);
		}
		map = 1;


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

		//GUI status text
		woodText = game.add.text(16,16,'Wood: ' +woodNumber, {fontSize: '32px', fill: '#111' });

		toolUI = game.add.sprite(0, -30, 'assets', 'Scanner');
		toolUI.scale.setTo(.4);
		toolUI.animations.add('scanner', ['Scanner'], true);
		toolUI.animations.add('cutter', ['Cutter'], true);
		toolUI.animations.add('bonder', ['Bonder'], true);

		scanEffect = game.add.sprite(-48, 0, 'assets', 'Scan U 1');
		scanEffect.anchor.setTo(.5);
		game.physics.arcade.enable(scanEffect);
		scanEffect.animations.add('scanUp', ['Scan U 1', 'Scan U 2'], 18, true);
		scanEffect.animations.add('scanDown', ['Scan D 1', 'Scan D 2'], 18, true);
		scanEffect.animations.add('scanRight', ['Scan R 1', 'Scan R 2'], 18, true);
		scanEffect.animations.add('scanLeft', ['Scan L 1', 'Scan L 2'], 18, true);

		cutEffect = game.add.sprite(-48, 0, 'assets', 'Cut U 1');
		cutEffect.anchor.setTo(.5);
		game.physics.arcade.enable(cutEffect);
		cutEffect.animations.add('cutUp', ['Cut U 1', 'Cut U 2', 'Cut U 3'], 24, true);
		cutEffect.animations.add('cutDown', ['Cut D 1', 'Cut D 2', 'Cut D 3'], 24, true);
		cutEffect.animations.add('cutRight', ['Cut R 1', 'Cut R 2', 'Cut R 3'], 24, true);
		cutEffect.animations.add('cutLeft', ['Cut L 1', 'Cut L 2', 'Cut L 3'], 24, true);

		bondEffect = game.add.sprite(-48, 0, 'assets', 'Bond 1');
		bondEffect.anchor.setTo(.5);
		game.physics.arcade.enable(bondEffect);
		bondEffect.animations.add('bond', ['Bond 1', 'Bond 2', 'Bond 3', 'Bond 4'], 24, true);

		dialogueBox = game.add.sprite(2, game.height, 'assets', 'scannerDialogue');
		game.physics.arcade.enable(dialogueBox);
		dialogueBox.scale.setTo(.48, .4);

		menuText = game.add.text(15, game.height - 150,' ', {fontSize: '20px', fill: '#000' });
	},
	update: function() 
	{
		// GamePlay logic
		game.debug.physicsGroup(woods);
		game.debug.body(player);

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

		//go to beach state of near left world bound
		if(player.body.x < 1)
		{
			playerY = player.body.y;
			game.state.start('GamePlay');
		}
		//go to river state if player is at right world bound
		if(player.body.x > 699 )
		{
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
	stump = stumps.create(wood.body.x, wood.body.y, 'assets', 'stump');
	stump.scale.setTo(0.1,0.1);
	stump.body.immovable = true;
	wood.destroy();
	woodNumber += 1;
	woodText.text =  'Wood: ' + woodNumber;
}