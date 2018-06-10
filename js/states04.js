
var labOpen = false;

var GamePlay4=function(game){};
GamePlay4.prototype = {

	// preloading assets.
	preload: function() {

		// Outputting to console.
		console.log('GamePlay4: preload');

	},

	// Creating assets into game world.
	create: function() {
		console.log('GamePlay4: create');
		bondSound.play('', 0, 0, true);
		cutSound.play('', 0, 0, true);
		autumnVoyage.stop();
		caveAmb.stop();
		wind.play('', 0, 1, true);

		// Enabling Arcade Physics system.
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Adding a backgrofund.
		map4 = game.add.sprite(0, 0, 'assets', 'scene2');

		trail = game.add.sprite(390, 220, 'assets', 'path');
		trail.angle = 90;
		trail.anchor.setTo(.5);
		trail.scale.setTo(1.1, .3);
	

		trail1 = game.add.sprite(388, 515, 'assets', 'path 1');
		trail1.anchor.setTo(.5);
		trail1.scale.setTo(.335, .32);

		trail2 = game.add.sprite(527, 526, 'assets', 'path4');
		trail2.anchor.setTo(.5);
		trail2.scale.setTo(.44, .36);

	

		// Creating the hut group and house group
		labs = game.add.group();
		labs.enableBody = true;

		//bounds for lab
		labL = labs.create(680, 600, 'assets', 'labL');
		labL.body.setSize(87, 87, 0, 0);

		labR = labs.create(900, 600, 'assets', 'labR');
		//labR.scale.setTo(0.65);
		labR.body.setSize(79, 79, 0, 0);

		labTop = labs.create(665, 400, 'assets', 'labTop');
		//labs.scale.setTo(0.65);
		labTop.body.setSize(265, 134, 0, 0);
		
		//lab.body.setSize(270, 200, 60, 154);
		labs.scale.setTo(0.65);
		labs.setAll('body.immovable' ,true);



		//Adding the player sprite->Position depending on the bounds of map
		if(map == 3)
		{
			player = game.add.sprite(playerX, 30, 'scientist');
			player.anchor.setTo(.5);
		}
		else if(map == 7)
		{
			player = game.add.sprite(555, 510, 'scientist');
			player.anchor.setTo(.5);
			labOpen = true;
		}
		else
		{
			player = game.add.sprite(50, 30, 'scientist');
			player.anchor.setTo(.5);
			//labOpen = true;
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


		//create lab
		lab = game.add.sprite(400, 10, 'assets', 'lab');
		lab.scale.setTo(0.65);

		entrance = game.add.sprite(569, 430, 'assets', 'labEntrance');
		entrance.anchor.set(.5, .5);
		entrance.scale.setTo(.65, .65);		
		game.physics.arcade.enable(entrance);
		//entrance.body.setSize(124, 150, 0, 0);
		entrance.body.immovable = true;
		


		labDoor = game.add.sprite(490, 360, 'assets', 'crystalcluster');
		labDoor.scale.setTo(.5);
		game.physics.arcade.enable(labDoor);
		//labDoor.body.setSize(200, 300, 20, 0);
		labDoor.body.immovable = true;

		if(labOpen!=false){
			labDoor.kill();
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

		//go to houses state near top world bound
		if(player.body.y < 1)
		{
			map = 4;
			playerX = player.x;
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
		game.physics.arcade.overlap(cutEffect, labDoor, cutLabDoor, null, this);
		game.physics.arcade.overlap(scanEffect, labDoor, labFlavor, null, this);
		game.physics.arcade.overlap(scanEffect, labs, labFlavor, null, this);
		game.physics.arcade.overlap(scanEffect, entrance, labFlavor, null, this);
		game.physics.arcade.overlap(player, entrance, enterLab, null, this);
		game.physics.arcade.collide(player, labDoor);
		game.physics.arcade.collide(player, labs);
		
	},

}

function enterLab(player, entrance) 
{
	 map=4;
	 dialogue=false;
	 this.game.state.start('GamePlay7');
}

function cutLabDoor(cutEffect, labDoor)
{	
	dialogue = true;
	if(updatedCutTool)
	{
		if (line == 0 && dialogueBox.y <= game.height - 170)
			menuText.text = "At this point, I guess nothing is stopping you.";
		if (line == 1)
			menuText.text = "Does this stuff even concern you at all?";
		if (line == 2)
			menuText.text = "Why the hell are you even doing all this?";
		if (line == 3)
			menuText.text = "What do you have to gain from cutting down this wall?";
		if (line == 4)
			menuText.text = "You're a pretty interesting guy, I guess.";
		if (line == 5)
			menuText.text = "Welp, no point in stopping now.";
		if (line > 5)
		{
			menuText.text = ' ';
			dialogue = false;
			line = 0;
			timer = 0;
			cutEffect.body.x = -250;
			debris.x = labDoor.x;
			debris.y = labDoor.y;
			debris.start(true, 1000, null, 15);
			labDoor.destroy();
			shatter.play('', 0, 1, false);
			labOpen = true;
		}
	}
	else
	{
		if (line == 0 && dialogueBox.y <= game.height - 170)
			menuText.text = "WHOA! Jeez! Slow down there, buddy!";
		if (line == 1)
			menuText.text = "You think I can just cut crystal out of the box?!";
		if (line == 2)
			menuText.text = "You're gonna need to BUY the upgrade!";
		if (line == 3)
			menuText.text = "Or pirate it somehow...";
		if (line == 4)
			menuText.text = "Pfft! But how would you do that? It's not like there's \ninternet here...";
		if (line == 5)
			menuText.text = "Good luck getting around this PAY WALL!";
		if (line == 6)
			menuText.text = "Heh! Get it? WALL?";
		if (line == 7)
			menuText.text = "Ahem...There's an actual wall here."
		if (line > 4)
		{
			menuText.text = ' ';
			dialogue = false;
			line = 0;
			timer = 0;
			cutEffect.body.x = -250;
		}
	}
}
