var hutsScanned = 0;
var hutCt = 0;

var GamePlay3 = function(game) {};
GamePlay3.prototype = {

	// preloading assets.
	preload: function() {

		// Outputting to console.
		console.log('GamePlay3: preload');

	},

	// Creating assets into game world.
	create: function() {
		console.log('GamePlay3: create');
		autumnVoyage.stop();

		// Enabling Arcade Physics system.
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Adding a backgrofund.
		backdrop = game.add.sprite(0, 0, 'assets', 'scene2');
		//trail = game.add.sprite(0, 220, 'assets', 'path');
		//trail.scale.setTo(2, .5);
		
		//Adding the player sprite->Position depending on the bounds of map
		if(map == 2)
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

		// Creating the hut group and house group
		huts = game.add.group();
		huts.enableBody = true;


		//spawning huts
		hut = huts.create(50, 25, 'assets', 'smallHouse');
		hut.scale.setTo(0.4);
		hut.body.setSize(310, 260, 60, 154);
		hut.body.immovable = true;

		hut1 = huts.create(600, 100, 'assets', 'smallHouse');
		hut1.scale.setTo(0.4);
		hut1.body.setSize(310, 260, 60, 154);
		hut1.body.immovable = true;

		hut2 = huts.create(475, 390, 'assets', 'smallHouse');
		hut2.scale.setTo(0.4);
		hut2.body.setSize(310, 230, 60, 184);
		hut2.body.immovable = true;

		house = game.add.sprite(400, 220, 'assets', 'bigHouse');
		house.anchor.set(.5, .5);
		house.scale.setTo(.5);
		game.physics.arcade.enable(house);
		house.body.setSize(420, 470, 50, 240);
		house.body.immovable = true;

		barrier = game.add.sprite(370, 285, 'assets', 'barricade');
		barrier.scale.setTo(.25);
		game.physics.arcade.enable(barrier);
		barrier.body.setSize(320, 450, 10, 0);
		barrier.body.immovable = true;

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
		game.debug.body(barrier);

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
			map = 3;
			playerY = player.body.y;
			game.state.start('GamePlay2');
		}
		//go to river state if player is at right world bound
		/*if(player.body.x > 750 )
		{
			map = 3;
			playerY = player.body.y;
			game.state.start('GamePlay4');
		}*/

		// Checking for an overlap and collisions
		game.physics.arcade.overlap(cutEffect, barrier, cutBarrier, null, this);
		//game.physics.arcade.overlap(scanEffect, house, houseFlavor, null, this);
		//game.physics.arcade.overlap(scanEffect, huts, hutFlavor, null, this);
		game.physics.arcade.collide(player, huts);
		game.physics.arcade.collide(player, house);
		game.physics.arcade.collide(player, barrier);
		
	},

}

function cutBarrier(cutEffect, barrier){

	
		dialogue = true;
		if (line == 0 && dialogueBox.y <= game.height - 170)
			menuText.text = "Hold it right there!";
		if (line == 1)
			menuText.text = "Who said you could do that?";
		if (line == 2)
			menuText.text = "Do you know what an invasion of PRIVACY is? Who do you think you are, you PERV?";
		if (line == 3)
			menuText.text = "I get it. Just because no one's around, you think you own the whole place.";
		if (line == 4)
			menuText.text = "I don't detect a single living thing near us but still. This doesn't seem legal.";
		if (line == 5)
			menuText.text = "Well...I guess we could take a peek...";
		if (line == 6)
			menuText.text = "But don't come crying to me if the cops come after you...";
		if (line > 6)
		{
			menuText.text = ' ';
			dialogue = false;
			line = 0;
			cutEffect.body.x = -48;
			debris.x = wood.body.x + 20;
			debris.y = wood.body.y;
			debris.start(true, 1000, null, 15);
			wood.destroy();
		}
}
