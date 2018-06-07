//INSIDE OF LAB
var crystal1Cut = false;
var crystal1Ct=0;
var updatedCutTool = false;


var GamePlay7=function(game){};
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
		//FIND ECHO-Y MUSIC FOR THE INSIDE OF THE HOUSE 

		// Enabling Arcade Physics system.
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Adding a backgrofund.
		map7 = game.add.sprite(0, 0, 'assets', 'scene7');
		//trail = game.add.sprite(0, 220, 'assets', 'path');
		//trail.scale.setTo(2, .5);
		
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
			crystal1 = game.add.sprite(330, 170, 'assets', 'crystal1');
			crystal1.scale.setTo(0.3);
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
		//game.physics.arcade.overlap(scanEffect, crystal1, crystal1Flavor, null, this);
		//NEED TO ADD LAB FLAVOR
		game.physics.arcade.collide(player, crystal1);
		//MAKE A SEPARATE COLLISION FOR THE REST OF THE WALL/ROOM
		//game.physics.arcade.collide(player, lab);
		
	},

}

function cutCrystal1(cutEffect, crystal1)
{	
		dialogue = true;

		if (updatedCutTool)
		{
			if (line == 0 && dialogueBox.y <= game.height - 170)
				menuText.text = "And now you're damaging property. Great.";
			if (line == 1)
				menuText.text = "So you want to get charged with vandalism too, huh?!!";
			if (line == 2)
				menuText.text = "Well it's not like I'LL get in trouble. I'm just a tool at YOUR disposal.";
			if (line == 3)
				menuText.text = "Well, let's hope THIS comes in handy at some point.";
			if (line == 4)
				menuText.text = "For your own sake, of course. I'm just here for the ride.";
			if (line == 5)
				menuText.text = "I actually can't care less about whatever happens to you.";
		
			if (line > 5)
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
				menuText.text = "Hm...";
			if (line == 1)
				menuText.text = "It appears that I'm not able to cut through this.";
			if (line == 2)
				menuText.text = "At least not in my CURRENT state...";
			if (line == 3)
				menuText.text = "Why do you want some crystals anyways? What a hippy.";
			if (line == 4)
				menuText.text = "I might be able to CUT through more than just WOOD.";
			if (line == 5)
				menuText.text = "How did I get updated last time....";
			if (line > 5)
			{
				menuText.text = ' ';
				dialogue = false;
				scanSuccessful = false;
				timer = 0;
				line = 0;
				scanEffect.body.x = -250;
			}

		}
}

