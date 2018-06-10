//INSIDE OF CAVE-> FINAL MAP
var crystalCt;


var GamePlay8=function(game){};
GamePlay8.prototype = {

	// preloading assets.
	preload: function() {

		// Outputting to console.
		console.log('GamePlay8: preload');

	},

	// Creating assets into game world.
	create: function() {
		console.log('GamePlay8: create');
		autumnVoyage.stop();
		wind.stop();
		dialogue=false;
		caveAmb.play('', 0, 1, true);


		// Enabling Arcade Physics system.
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Adding a backgrofund.
		map8 = game.add.sprite(0, 0, 'assets', 'scene8');
		//trail = game.add.sprite(0, 220, 'assets', 'path');
		//trail.scale.setTo(2, .5);
		
		//Adding the player sprite->Position depending on the bounds of map
		if(map == 5)
		{
			player = game.add.sprite(370, 530, 'scientist');
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

		// Creating the crystal group
		crystals = game.add.group();
		crystals.enableBody = true;


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
		restart();

		//go to beach state of near top world bound
		if(player.body.y > 550)
		{
			map = 8;
			caveOpen=true;
			game.state.start('GamePlay5');
		}
		//go to river state if player is at right world bound
		/*if(player.body.x > 750 )
		{
			map = 3;
			playerY = player.body.y;
			game.state.start('GamePlay4');
		}*/

		// Checking for an overlap and collisions
		
	
		
		//MAKE A SEPARATE COLLISION FOR THE REST OF THE WALL/ROOM
		//game.physics.arcade.collide(player, caveWall);
		
	},

}


