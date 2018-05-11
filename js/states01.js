var GamePlay1 = function(game) {};
var woodText;
var woodNumber = 0;
var score =0;
var i;
var wood;
var woodSpawnX;
var woodSpawnY;

GamePlay1.prototype = {

	// preloading assets.
	preload: function() {

		// Outputting to console.
		console.log('GamePlay1: preload');

		// preloading assets
		game.load.spritesheet('scientist', 'assets/img/WalkSprite.png', 48, 48);
		game.load.image('scene2', 'assets/img/scene2.png');
		//wood pre chopping
		game.load.image('wood', 'assets/img/obj5.png');
		//wood post chopping
		game.load.image('wood', 'assets/img/obj4.png');

	},

	// Creating assets into game world.
	create: function() {
		console.log('GamePlay: create');

		// Enabling Arcade Physics system.
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Adding a backgrofund.
		map1 = game.add.sprite(0, 0, 'scene2');

		
		//Adding the player sprite->Position depending on the bounds of map
		if(mapCt>1){
			player = game.add.sprite(690, 475, 'scientist');
			player.anchor.setTo(.5);
		}
		else{
		player = game.add.sprite(25, 475, 'scientist');
		player.anchor.setTo(.5);
		}


		game.physics.arcade.enable(player);
		//game.camera.follow(player);
		player.body.collideWorldBounds = true;

		// Adding the player animations, left and right.
		player.animations.add('down', [0,1,2,1],10, true);
		player.animations.add('left', [3,4,5,4],10,true);
		player.animations.add('right',[6,7,8,7],10,true);
		player.animations.add('up', [9,10,11,10],10,true);

		// Creating the stars group.
		woods = game.add.group();
		woods.enableBody = true;


		//spawning wood
		for (i = 0; i < 12; i++){
			j = i+1;
			//Create a star inside of the 'stars"'group
			woodSpawnX = (i*50);
			woodSpawnY = (Math.random()* 500);

			wood = woods.create(i*50,Math.random()*500,'wood');
			wood.scale.setTo(0.3,0.3);
		}

		//GUI status text
		menuText = game.add.text(75,250,'           You are in the gameplay state. \nPress SPACEBAR to go to the next state.', {fontSize: '32px', fill: '#999' });
		woodText = game.add.text(16,16,'Wood: ' +woodNumber, {fontSize: '32px', fill: '#111' });

	},
	update: function() {
		// GamePlay logic

		// If the player presses SPACEBAR, go to next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay2');
		}

		//controls movement of character
		if(controls.right.isDown)
		{
			player.body.x += playerSpeed;
			player.animations.play('right');
			faceUp = false;
			faceDown = false;
			faceLeft = false;
			faceRight = true;
		}

		else if(controls.left.isDown)
		{
			player.body.x -= playerSpeed;
			player.animations.play('left');
			faceUp = false;
			faceDown = false;
			faceLeft = true;
			faceRight = false;
		}
		else if(controls.up.isDown)
		{
			player.body.y -= playerSpeed;
			player.animations.play('up');
			faceUp = true;
			faceDown = false;
			faceLeft = false;
			faceRight = false;
		}
		else if(controls.down.isDown)
		{
			player.body.y += playerSpeed;
			player.animations.play('down');
			faceUp = false;
			faceDown = true;
			faceLeft = false;
			faceRight = false;
		}
		else
		{
			player.animations.stop();
			if(faceUp)
				player.frame = 10;
			if(faceDown)
				player.frame = 1;
			if(faceLeft)
				player.frame = 4;
			if(faceRight)
				player.frame = 7;
		}

		//go to beach state of near left world bound
		if(player.body.x < 1){
			game.state.start('GamePlay');
		}
		//go to river state if player is at lower right world bound
		if(player.body.x > 699 ){
			mapCt= mapCt +1;
			game.state.start('GamePlay2');
		}

		// Checking for an overlap between the player and any wood in the woods group.
		// If yes, pass onto collectWood function.
		game.physics.arcade.overlap(player, woods, collectWood, null, this);
	},

}

	function collectWood(player, wood){
		//remove the star from the screen
		wood.kill();
		//instead of killing wood-> Just change sprite from OBJ 5 to OBJ4
		woodNumber += 1;
		woodText.text =  'Wood: ' +woodNumber;

	}