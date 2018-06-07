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
		wind.stop();
		dialogue=false;
		crystalSong = game.add.audio('crystalSong');
		crystalSong.play('', 0, 1, true);	// ('marker', start position, volume (0-1), loop)

		// Enabling Arcade Physics system.
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Adding a backgrofund.
		map6 = game.add.sprite(0, 0, 'assets', 'map8');
		//trail = game.add.sprite(0, 220, 'assets', 'path');
		//trail.scale.setTo(2, .5);
		
		//Adding the player sprite
		player = game.add.sprite(400, 530, 'scientist');
		player.anchor.setTo(.5);


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


		//create lab
		crystal2 = game.add.sprite(639, 405, 'assets', 'crystal2');
		game.physics.arcade.enable(crystal2);
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

		crystal2Scale = game.add.tween(crystal2.scale).to( { x : 1.5, y : 1.5 }, 1000, Phaser.Easing.Linear.None, false, 0, 500, true);
		crystal2Alpha = game.add.tween(crystal2).to( { alpha : 0 }, 1000, Phaser.Easing.Linear.None, false, 0, 2000, true);

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
			map = 6;
			barrierBroken=true;
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
		game.physics.arcade.overlap(cutEffect, crystal2, cutCrystal2, null, this);
		game.physics.arcade.overlap(scanEffect, crystal2, crystal2Flavor, null, this);
		//NEED TO ADD LAB FLAVOR
		game.physics.arcade.collide(player, crystal2);
		//MAKE A SEPARATE COLLISION FOR THE REST OF THE WALL/ROOM
		//game.physics.arcade.collide(player, lab);
		
	},

}

function cutCrystal2(cutEffect, crystal2)
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
				debris.x = crystal2.x;
				debris.y = crystal2.y;
				debris.start(true, 1000, null, 15);
				crystal2.destroy();
				shatter.play('', 0, 1, false);
				crystal2Cut = true;
				crystal2Ct = 1;
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
				menuText.text = "If you can somehow UPDATE my current state,";
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