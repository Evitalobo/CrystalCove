

var hutsScanned = 0;
var hutCt = 0;
var barrierBroken = false;

var GamePlay3=function(game){};
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
		wind.play('', 0, 1, true);	// ('marker', start position, volume (0-1), loop)

		// Enabling Arcade Physics system.
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Adding a background.
		backdrop = game.add.sprite(0, 0, 'assets', 'scene2');

		trail = game.add.sprite(420, 500, 'assets', 'path');
		trail.angle = 90;
		trail.anchor.setTo(.5);
		trail.scale.setTo(1, .27);
		trail.alpha = .9;

		

		// Creating the hut group and house group
		huts = game.add.group();
		huts.enableBody = true;

		house = game.add.group();
		house.enableBody = true;


		//spawning huts
		hut = huts.create(50, 25, 'assets', 'smallHouse');
		hut.scale.setTo(0.3);
		hut.body.setSize(270, 200, 60, 154);
		hut.body.immovable = true;

		hut1 = huts.create(600, 100, 'assets', 'smallHouse');
		hut1.scale.setTo(0.3);
		hut1.body.setSize(270, 200, 60, 154);
		hut1.body.immovable = true;

		hut2 = huts.create(500, 400, 'assets', 'smallHouse');
		hut2.scale.setTo(0.3);
		hut2.body.setSize(270, 200, 60, 154);
		hut2.body.immovable = true;

		roof = house.create(400, 220, 'assets', 'houseRoof');
		roof.anchor.set(.5, .5);
		roof.scale.setTo(.5);
		roof.body.setSize(420, 300, 50, 240);
		roof.body.immovable = true;

		leftWall = house.create(332, 398, 'assets', 'houseLeftWall');
		leftWall.anchor.set(.5, .5);
		leftWall.scale.setTo(.5);
		leftWall.body.setSize(170, 221, 51, 0);
		leftWall.body.immovable = true;

		rightWall = house.create(486, 398, 'assets', 'houseRightWall');
		rightWall.anchor.set(.5, .5);
		rightWall.scale.setTo(.5);
		rightWall.body.setSize(126, 221, 0, 0);
		rightWall.body.immovable = true;

		entrance = game.add.sprite(418, 398, 'assets', 'bigHouseEntrance');
		entrance.anchor.set(.5, .5);
		entrance.scale.setTo(.51, .5);		
		game.physics.arcade.enable(entrance);
		entrance.body.setSize(114, 100, 0, 0);
		entrance.body.immovable = true;

		barrier = game.add.sprite(368, 328, 'assets', 'barricade');
		barrier.scale.setTo(.4);
		game.physics.arcade.enable(barrier);
		barrier.body.setSize(200, 300, 20, 0);
		barrier.body.immovable = true;

		if(barrierBroken!=false){
			barrier.kill();
		}
		
		//Adding the player sprite->Position depending on the bounds of map
		if(map == 2)
		{
			player = game.add.sprite(25, playerY, 'scientist');
			player.anchor.setTo(.5);
		}
		else if(map == 4)
		{
			player = game.add.sprite(playerX, 560, 'scientist');
			player.anchor.setTo(.5);
		}
		else if(map == 6)
		{
			player = game.add.sprite(418, 430, 'scientist');
			player.anchor.setTo(.5);
			barrierBroken = true;
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
			map = 3;
			playerY = player.y;
			game.state.start('GamePlay2');
		}

		if(player.body.x > 770)
		{
			map = 3;
			playerY = player.y;
			game.state.start('GamePlay5');
		}
		//go to river state if player is at right world bound
		if(player.body.y > 550 )
		{
			map = 3;
			playerX = player.x;
			game.state.start('GamePlay4');
		}
		


		// Checking for an overlap and collisions
		game.physics.arcade.overlap(cutEffect, barrier, cutBarrier, null, this);
		game.physics.arcade.overlap(player, entrance, enterHouse, null, this);
		game.physics.arcade.overlap(scanEffect, house, houseFlavor, null, this);
		game.physics.arcade.overlap(scanEffect, barrier, houseFlavor, null, this);
		game.physics.arcade.overlap(scanEffect, huts, hutFlavor, null, this);
		game.physics.arcade.collide(player, huts);
		game.physics.arcade.collide(player, house);
		game.physics.arcade.collide(player, barrier);
		
	},

}

function enterHouse(player, entrance) 
{
 	map=3;
 	game.state.start('GamePlay6');
    dialogue=false;
}

function cutBarrier(cutEffect, barrier){

	
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
			debris.x = barrier.body.x + 40;
			debris.y = barrier.body.y + 40;
			debris.start(true, 1000, null, 15);
			barrier.destroy();
			woodCut.play('', 0, 1, false);
			barrierBroken = true;
		}
}
