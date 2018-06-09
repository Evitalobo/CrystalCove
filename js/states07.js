//INSIDE OF LAB
var crystal1Cut = false;
var crystal1Ct=0;
var scannedCrystal1 = false;


var GamePlay7 = function(game){};
GamePlay7.prototype = {

	// preloading assets.
	preload: function() {

		// Outputting to console.
		console.log('GamePlay7: preload');

	},

	// Creating assets into game world.
	create: function() {
		console.log('GamePlay7: create');
		wind.stop();
		caveAmb = game.add.audio('caveAmb');
		caveAmb.play('', 0, 1, true);	// ('marker', start position, volume (0-1), loop)
		dialogue = false;

		// Enabling Arcade Physics system.
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Adding a backgrofund.
		map7 = game.add.sprite(0, 0, 'assets', 'scene7');
		

		note1 = game.add.sprite(200, 300, 'assets', 'Note')
		game.physics.arcade.enable(note1);
		note1.scale.setTo(.5);

		note2 = game.add.sprite(400, 400, 'assets', 'Note')
		game.physics.arcade.enable(note2);
		note2.scale.setTo(.5);
		note2.angle = 20;

		note3 = game.add.sprite(600, 500, 'assets', 'Note')
		game.physics.arcade.enable(note3);
		note3.scale.setTo(.5);
		note3.angle = 45;

		note4 = game.add.sprite(100,500, 'assets', 'Note')
		game.physics.arcade.enable(note4);
		note4.scale.setTo(.5);
		note4.angle = 100;
		
		//Adding the player sprite->Position depending on the bounds of map
		if(map == 4)
		{
			player = game.add.sprite(300, 530, 'scientist');
			player.anchor.setTo(.5);
		}
		/*else
		{
			player = game.add.sprite(50, 30, 'scientist');
			player.anchor.setTo(.5);
			labOpen = true;
		}*/


		game.physics.arcade.enable(player);
		player.body.setSize(30, 48, 9, 0);
		player.body.collideWorldBounds = true;


		// Adding the player animations, left and right.
		player.animations.add('down', [0,1,2,1],10, true);
		player.animations.add('left', [3,4,5,4],10,true);
		player.animations.add('right',[6,7,8,7],10,true);
		player.animations.add('up', [9,10,11,10],10,true);

		// Creating the hut group and house group

		//create lab
		if (!crystal1Cut)
		{
			crystal1 = game.add.sprite(390, 210, 'assets', 'crystal1');
			crystal1.angle=90;
			crystal1.scale.setTo(0.3);
			crystal1.anchor.setTo(.5, .5);
			game.physics.arcade.enable(crystal1);
			crystal1.body.immovable = true;
		}


		debris = game.add.emitter(0, 0, 200);
		debris.makeParticles('assets', 'crystal1');
		debris.maxParticleScale = .2;
		debris.minParticleScale = .1;
		debris.alpha = .7;

		createUI();
		createInventory();

		crystal1Scale = game.add.tween(crystal1.scale).to( { x : 1.5, y : 1.5 }, 1000, Phaser.Easing.Linear.None, false, 0, 500, true);
		crystal1Alpha = game.add.tween(crystal1).to( { alpha : 0 }, 1000, Phaser.Easing.Linear.None, false, 0, 2000, true);

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

		//go to beach state of near top world bound
		if(player.body.y > 550)
		{
			map = 7;
			labOpen=true;
			game.state.start('GamePlay4');
		}
		//go to river state if player is at right world bound
		/*if(player.body.x > 750 )
		{
			map = 3;
			playerY = player.body.y;
			game.state.start('GamePlay4');
		}*/

		// Checking for an overlap and collisions
		game.physics.arcade.overlap(cutEffect, crystal1, cutCrystal1, null, this);
		game.physics.arcade.overlap(scanEffect, crystal1, crystal1Flavor, null, this);
		game.physics.arcade.overlap(scanEffect, note1, note1Flavor, null, this);
		game.physics.arcade.overlap(scanEffect, note2, note2Flavor, null, this);
		game.physics.arcade.overlap(scanEffect, note3, note3Flavor, null, this);
		game.physics.arcade.overlap(scanEffect, note4, note4Flavor, null, this);
		game.physics.arcade.collide(player, crystal1);
		//MAKE A SEPARATE COLLISION FOR THE REST OF THE WALL/ROOM
		//game.physics.arcade.collide(player, labWall);
		
	},

}

function cutCrystal1(cutEffect, crystal1)
{	
		dialogue = true;

		if (scannedCrystal1)
		{
			if (line == 0 && dialogueBox.y <= game.height - 170)
				menuText.text = "Another crystal to add to the collection.";
			if (line == 1)
				menuText.text = "Why exactly are we collecting these?";
			if (line == 2)
				menuText.text = "Do you think they'll absorb some kind of bad juju or something?";
			if (line == 3)
				menuText.text = "God, I hope you're not a hippie.";
			if (line == 4)
				menuText.text = "Whatever. Let's take it and go.";
		
			if (line > 4)
			{
				menuText.text = ' ';
				dialogue = false;
				line = 0;
				cutEffect.body.x = -48;
				debris.x = crystal1.x;
				debris.y = crystal1.y;
				debris.start(true, 1000, null, 15);
				crystal1.destroy();
				shatter.play('', 0, 1, false);
				crystal1Cut = true;
				crystal1Ct = 1;
			}
		}
		else
		{
			if (line == 0 && dialogueBox.y <= game.height - 170)
				menuText.text = "Wouldn't you rather learn about this crystal first?";
			if (line == 1)
				menuText.text = "Try scanning it. I might get a sweet upgrade...";
			if (line > 1)
			{
				menuText.text = ' ';
				dialogue = false;
				line = 0;
				cutEffect.body.x = -250;
			}
		}
}

