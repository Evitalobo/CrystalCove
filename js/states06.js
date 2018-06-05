//INSIDE OF THE BIG HOUSE

var crystal2Cut = false;
var crystal2Ct=0;

var GamePlay6=function(game){};
GamePlay6.prototype = {

	// preloading assets.
	preload: function() {

		// Outputting to console.
		console.log('GamePlay6: preload');

	},

	// Creating assets into game world.
	create: function() {
		console.log('GamePlay6: create');
		autumnVoyage.stop();
		dialogue=false;
		//FIND ECHO-Y MUSIC FOR THE INSIDE OF THE HOUSE 
		wind = game.add.audio('wind');
		wind.play('', 0, 1, true);	// ('marker', start position, volume (0-1), loop)

		// Enabling Arcade Physics system.
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Adding a backgrofund.
		map6 = game.add.sprite(0, 0, 'assets', 'map8');
		//trail = game.add.sprite(0, 220, 'assets', 'path');
		//trail.scale.setTo(2, .5);
		
		//Adding the player sprite->Position depending on the bounds of map
		if(map == 3)
		{
			player = game.add.sprite(300, 550, 'scientist');
			player.anchor.setTo(.5);
		}
		/*else
		{
			player = game.add.sprite(50, 30, 'scientist');
			player.anchor.setTo(.5);
			labOpen = true;
		}*/


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
		crystals = game.add.group();
		crystals.enableBody = true;


		//create lab
		crystal2 = crystals.create(650, 500, 'assets', 'crystal2');
		crystal2.scale.setTo(0.3);
		//lab.body.setSize(270, 200, 60, 154);
		crystal2.body.immovable = true;


		debris = game.add.emitter(0, 0, 200);
		debris.makeParticles('assets', 'crystal2');
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

		//go to beach state of near top world bound
		if(player.body.y > 590)
		{
			map = 4;
			playerX = player.body.x;
			game.state.start('GamePlay3');
		}
		//go to river state if player is at right world bound
		/*if(player.body.x > 750 )
		{
			map = 3;
			playerY = player.body.y;
			game.state.start('GamePlay4');
		}*/

		// Checking for an overlap and collisions
		game.physics.arcade.overlap(cutEffect, crystal2, cutCrystal, null, this);
		//game.physics.arcade.overlap(scanEffect, labDoor, labFlavor, null, this);
		//NEED TO ADD LAB FLAVOR
		game.physics.arcade.collide(player, crystal2);
		//MAKE A SEPARATE COLLISION FOR THE REST OF THE WALL/ROOM
		//game.physics.arcade.collide(player, lab);
		
	},

}

function cutCrystal(cutEffect, crystals){

	
		dialogue = true;
		if (line == 0 && dialogueBox.y <= game.height - 170)
			menuText.text = "Hold it right there!";
		if (line == 1)
			menuText.text = "Who said you could do that?";
		if (line == 2)
			menuText.text = "Do you know what an invasion of PRIVACY is? Who do you think\nyou are, you PERV?";
		if (line == 3)
			menuText.text = "I get it. Just because no one's around, you think you own the \nwhole place.";
		if (line == 4)
			menuText.text = "I don't detect a single living thing near us but still.... This \ndoesn't seem legal.";
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
			debris.x = crystal2.body.x + 20;
			debris.y = crystal2.body.y;
			debris.start(true, 1000, null, 15);
			crystal2.destroy();
			woodCut.play('', 0, 1, false);
			crystal2Cut = true;
			crystal2Ct =1;
		}
}