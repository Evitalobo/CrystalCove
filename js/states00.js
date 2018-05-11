//This code has been adapted from Professor Nathan Altice's states 02.js file.

var game = new Phaser.Game(800, 600, Phaser.AUTO);

var menuText;
var gameText;
var gameOverText;
var playerSpeed = 5;
var faceUp = false;
var faceDown = false;
var faceLeft = false;
var faceRight = false;
var fernCt=0;
var j=1;
var mapCt;

// define MainMenu state and methods
var MainMenu = function(game) {};
MainMenu.prototype = 
{
	preload: function() 
	{
		console.log('You are now in the Main menu state.');
	},
	create: function() 
	{
		console.log('MainMenu: create');
		game.stage.backgroundColor = "#999999";
	},
	update: function() 
	{
		// main menu logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) 
		{
			game.state.start('GamePlay');
		}
	}
}

// define GamePlay state and methods
var GamePlay = function(game) {};
GamePlay.prototype = {

	// preloading assets.
	preload: function() {

		// Outputting to console.
		console.log('GamePlay: preload');

		// preloading assets
		game.load.spritesheet('scientist', 'assets/img/WalkSprite.png', 48, 48);
		game.load.image('scene1', 'assets/img/scene1.png');

		//driftwood = 1 wood
		game.load.image('driftwood', 'assets/img/obj3.png');
		//fern = must clear to pass to next side of map
		game.load.image('fern', 'assets/img/obj.png');
		//boat = 2 wood
		game.load.image('boat', 'assets/img/obj2.png');
	
	},

	// Creating assets into game world.
	create: function() 
	{
		console.log('GamePlay: create');

		// Enabling Arcade Physics system.
		game.physics.startSystem(Phaser.Physics.ARCADE);


		// Adding a backgrofund.
		map = game.add.sprite(0, 0, 'scene1');
		// Setting the background color to a dark gray.
		//game.stage.backgroundColor = "#454545";

		//Adding the player sprite
		if(mapCt>=1){
			player = game.add.sprite(650, 475, 'scientist');
			player.anchor.setTo(.5);
		}
		else{
		player = game.add.sprite(25, 475, 'scientist');
		player.anchor.setTo(.5);
		}
		//Adding the player physics
		game.physics.arcade.enable(player);
		//game.camera.follow(player);
		player.body.collideWorldBounds = true;

		// Adding the player animations, left and right.
		player.animations.add('down', [0,1,2,1],10, true);
		player.animations.add('left', [3,4,5,4],10,true);
		player.animations.add('right',[6,7,8,7],10,true);
		player.animations.add('up', [9,10,11,10],10,true);

		//Adding the player controls
		controls = {
			right: game.input.keyboard.addKey(Phaser.Keyboard.D),
			left: game.input.keyboard.addKey(Phaser.Keyboard.A),
			up: game.input.keyboard.addKey(Phaser.Keyboard.W),
			down: game.input.keyboard.addKey(Phaser.Keyboard.S),
		};

		//wood physics
		woods = game.add.group();
		woods.enableBody = true;

		driftwood = woods.create((j+ 200)*3,Math.random()*500,'driftwood');
		driftwood.scale.setTo(0.3,0.3);

		//fern physics
		ferns = game.add.group();
		ferns.enableBody = true;

		//ADD FERN COUNTER TO UNLOCK NEXT PART OF MAP AND SET WORLD BOUND TO COLLIDE WITH PATH

		fern = ferns.create(650,400,'fern');
		fern.scale.setTo(0.5,0.5);

		//GUI status text
		menuText = game.add.text(75,250,'           You are in the gameplay state. \nPress SPACEBAR to go to the next state.', {fontSize: '32px', fill: '#999' });
		//woodText = game.add.text(16,16,'Wood: ' +woodNumber, {fontSize: '32px', fill: '#111' });

	},
	update: function() 
	{
		// GamePlay logic

		// If the player presses SPACEBAR, go to next state.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay1');
		}

		//Resets player velocity

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

		if(player.body.x > 690 && player.body.y > 400){
			mapCt=1;
			game.state.start('GamePlay1');
		}
	}
}



