
var GamePlay1 = function(game) {};
var woodText;
var woodNumber = 0;
var treesScanned = 0;
var stumpsScanned = 0;
var woodCt = 0;
var crystal3Cut = false;
var crystal3Ct=0;
var scannedCrystal3 = false;


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

		bondSound.play('', 0, 0, true);
		cutSound.play('', 0, 0, true);

		// Adding a background.
		backdrop = game.add.sprite(0, 0, 'assets', 'scene2');
		trail = game.add.sprite(0, 250, 'assets', 'path');
		trail.scale.setTo(2, .4);

		
		//Adding the player sprite->Position depending on the bounds of map
		if(map < 1)
		{
			player = game.add.sprite(48, playerY, 'scientist');
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

		// Creating the wood and stump groups.
		woods = game.add.group();
		woods.enableBody = true;
		stumps = game.add.group();
		stumps.enableBody = true;

		//fern physics
		ferns = game.add.group();
		ferns.enableBody = true;

		//ADD FERN COUNTER TO UNLOCK NEXT PART OF MAP AND SET WORLD BOUND TO COLLIDE WITH PATH
		for (i = -1; i < 12; i++)
		{
			fern = ferns.create(0, i*50, 'assets', 'obj');
			fern.anchor.setTo(.5);
			fern.scale.setTo(0.3,0.3);
			fern.body.setSize(100, 100, 200, 50);
			fern.body.immovable = true;
		}

		foliage = game.add.emitter(0, 0, 200);
		foliage.makeParticles('assets', 'obj');
		foliage.maxParticleScale = .2;
		foliage.minParticleScale = .1;
		foliage.alpha = .7;


		//spawning wood
		for (i = 0; i < 12; i++){
			if (i%2 == 0)
				wood = woods.create(i*65, Math.random()*150 - 120, 'assets', 'obj5');
			else
				wood = woods.create(i*50, Math.random()*200 + 265, 'assets', 'obj5');
			wood.scale.setTo(0.3,0.3);
			wood.body.setSize(130, 100, 130, 565);
			wood.body.immovable = true;
		}

		if(crystal1Cut && crystal2Cut)
		{
			if (!crystal3Cut)
			{
				crystal3 = game.add.sprite(730, 450, 'assets', 'crystal3');
				crystal3.angle=90;
				crystal3.scale.setTo(0.3);
				crystal3.anchor.setTo(.5, .5);
				game.physics.arcade.enable(crystal3);
				crystal3.body.immovable = true;
				crystal3Alpha = game.add.tween(crystal3).to( { alpha : 0 }, 1000, Phaser.Easing.Linear.None, false, 0, 2000, true);
				resonate.play('', 0, .5, true);
			}
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
		//game.debug.physicsGroup(woods);

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

		if(crystal1Cut && crystal2Cut){
			game.physics.arcade.collide(player, crystal3);
			game.physics.arcade.overlap(cutEffect, crystal3, cutCrystal3, null, this);
		    game.physics.arcade.overlap(scanEffect, crystal3, crystal3Flavor, null, this);
		}

		// Checking for an overlap and collisions
		game.physics.arcade.overlap(cutEffect, woods, collectWood, null, this);
		game.physics.arcade.overlap(scanEffect, woods, treeFlavor, null, this);
		game.physics.arcade.overlap(scanEffect, stumps, stumpFlavor, null, this);
		game.physics.arcade.overlap(scanEffect, ferns, fernFlavor, null, this);
		game.physics.arcade.overlap(cutEffect, ferns, burnFern, null, this);
	
		
		game.physics.arcade.collide(player, ferns);
		game.physics.arcade.collide(player, woods);
		game.physics.arcade.collide(player, stumps);
	},

}


function collectWood(cutEffect, wood)
{
	//changes trees to stumps when certain conditions are met
	debris.x = wood.body.x + 10;
	debris.y = wood.body.y;
	woodCut.play('', 0, 1, false);
	debris.start(true, 1000, null, 15);
	stump = stumps.create(wood.body.x - 10, wood.body.y - 10, 'assets', 'stump');
	stump.scale.setTo(0.15,0.12);
	stump.body.immovable = true;
	wood.destroy();
	woodCt += 1;
}


function cutCrystal3(cutEffect, crystal3)
{	
		dialogue = true;
		if (!scannedCrystal3)
		{
			if (line == 0 && dialogueBox.y <= game.height - 170)
				menuText.text = "C'mon. We've done this twice now.";
			if (line == 1)
				menuText.text = "You know the drill.";
			if (line == 2)
				menuText.text = "Scan it for info.";
			if (line > 2)
			{
				menuText.text = ' ';
				dialogue = false;
				line = 0;
				cutEffect.body.x = -250;
			}
		}
		else
		{
			if (line == 0 && dialogueBox.y <= game.height - 170)
				menuText.text = "Awesome. With this we can right the wrongs we've done to this place.";
			if (line == 1)
				menuText.text = "The ones that both you and I are responsible for.";
			if (line == 2)
				menuText.text = "Well mainly you, since I didn't really ask to be born.";
			if (line == 3)
				menuText.text = "Not really my fault.";
			if (line == 4)
				menuText.text = "Do you have no shame? Take some responsibility.";
			if (line == 5)
				menuText.text = "These crystals ought to be taken back to whence the came.";
			if (line == 6)
				menuText.text = "Did I really just say 'whence'?";

			if (line > 6)
			{
				menuText.text = ' ';
				dialogue = false;
				line = 0;
				debris = game.add.emitter(0, 0, 200);
				debris.makeParticles('assets', 'crystal3');
				debris.maxParticleScale = .2;
				debris.minParticleScale = .1;
				debris.alpha = .7;
				debris.x = crystal3.x;
				debris.y = crystal3.y;
				debris.start(true, 1000, null, 15);
				crystal3.destroy();
				shatter.play('', 0, 1, false);
				crystal3Cut = true;
				crystal3Ct = 1;
				tutorialDone=true;
				cutEffect.body.x = -250;
			}

		}
}