var caveOpen = false;

var GamePlay5=function(game){};
GamePlay5.prototype = {

	// preloading assets.
	preload: function() {

		// Outputting to console.
		console.log('GamePlay5: preload');

	},

	// Creating assets into game world.
	create: function() {
		console.log('GamePlay5: create');
		autumnVoyage.stop();
		caveAmb.stop();
		wind.play('', 0, 1, true);

		// Enabling Arcade Physics system.
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Adding a backgrofund.
		map5 = game.add.sprite(0, 0, 'assets', 'scene2');
		//trail = game.add.sprite(0, 220, 'assets', 'path');
		//trail.scale.setTo(2, .5);

		//create cave
		cave = game.add.sprite(325, 20, 'assets', 'cave');
		cave.scale.setTo(0.92);

		trail = game.add.sprite(210, 520, 'assets', 'path');
		trail.anchor.setTo(.5);
		trail.scale.setTo(1, .3);
		trail.alpha = .9;


	

		// Creating the hut group and house group
		caves = game.add.group();
		caves.enableBody = true;

		//bounds for cave
		caveL = caves.create(406, 326, 'assets', 'caveL');
		caveL.body.setSize(118, 134, 0, 0);

		caveR = caves.create(639, 298, 'assets', 'caveR');
		caveR.body.setSize(196, 275, 0, 0);

		caveMid = caves.create(374, 184, 'assets', 'cavemid');
		caveMid.body.setSize(455, 163, 0, 0);

		caveTop = caves.create(495, 77, 'assets', 'caveTop');
		caveTop.body.setSize(332, 110, 0, 0);

		caves.scale.setTo(0.92);
		caves.setAll('body.immovable' , true);

		caveEntrance = game.add.sprite(543, 350, 'assets', 'caveEntrance');
		caveEntrance.anchor.set(.5, .5);
		caveEntrance.scale.setTo(.92);		
		game.physics.arcade.enable(caveEntrance);
		caveEntrance.body.setSize(92, 77, 0, 0);
		caveEntrance.body.immovable = true;

		caveDoor = game.add.sprite(470, 285, 'assets', 'crystalcluster');
		caveDoor.scale.setTo(.5);
		game.physics.arcade.enable(caveDoor);
		//labDoor.body.setSize(200, 300, 20, 0);
		caveDoor.body.immovable = true;

		//Adding the player sprite->Position depending on the bounds of map
		if(map == 3)
		{
			player = game.add.sprite(30, playerY, 'scientist');
			player.anchor.setTo(.5);
		}
		else if(map == 8)
		{
			player = game.add.sprite(499, 428, 'scientist');
			player.anchor.setTo(.5);
		}

		else
		{
			player = game.add.sprite(50, 500, 'scientist');
			player.anchor.setTo(.5);
			//caveOpen = true;
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

		if(caveOpen!=false){
			caveDoor.kill();
		}

		debris = game.add.emitter(0, 0, 200);
		debris.makeParticles('assets', 'crystalcluster');
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

		//go to housemap
		if(player.body.x < 3)
		{
			map = 5;
			playerY = player.body.y;
			game.state.start('GamePlay3');
		}
		//go into cave
		/*if(player.body.x > 750 )
		{
			map = 3;
			playerY = player.body.y;
			game.state.start('GamePlay4');
		}*/

		// Checking for an overlap and collisions
		game.physics.arcade.overlap(cutEffect, caveDoor, cutCaveDoor, null, this);
		game.physics.arcade.overlap(player, caveEntrance, enterCave, null, this);
		game.physics.arcade.overlap(scanEffect, caveDoor, caveFlavor, null, this);
		game.physics.arcade.overlap(scanEffect, caves, caveFlavor, null, this);
		game.physics.arcade.collide(player, caveDoor);
		game.physics.arcade.collide(player, caves);
		
	},

}

function enterCave(player, caveEntrance) {
	if(caveOpen=true){
	 	map=5;
	 	this.game.state.start('GamePlay8');
	    dialogue=false;
	}
}

function cutCaveDoor(cutEffect, caveDoor){

	
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
			debris.x = caveDoor.body.x + 50;
			debris.y = caveDoor.body.y + 50;
			debris.start(true, 1000, null, 15);
			caveDoor.destroy();
			shatter.play('', 0, 1, false);
			caveOpen = true;
		}
}

