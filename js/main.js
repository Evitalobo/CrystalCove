var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var map;
var map1;
var map2;
var layer;
var player;
var controls = {};
var playerSpeed = 150;
var jumpTimer = 0;
var score = 0;
var scoreText;
var forcePortrait = 1;
var platforms;

function preload() {
	// preload assets
	game.load.image('scene1', 'assets/img/scene1.png');
	game.load.image('ground', 'assets/img/platform.png');
	game.load.image('star', 'assets/img/star.png');
	game.load.image('diamond', 'assets/img/diamond.png');
	game.load.image('poo', 'assets/img/poo.png');
	//game.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
	//game.load.spritesheet('baddie', 'assets/img/baddie.png', 32, 32);
	game.load.spritesheet('scientist', 'assets/img/WalkSprite.png', 48, 48);
}

// place your assets
function create() {
	// Enabling the Arcade Physics system
	game.physics.startSystem(Phaser.Physics.ARCADE);


	// Adding a backgrofund.
	//map = game.add.sprite(0, 0, 'scene1');


	//Adding the player sprite
	player = game.add.sprite(25, 400, 'scientist');
	player.anchor.setTo(0.5, 0.5);

	//Adding the player physics
	game.physics.arcade.enable(player);
	game.camera.follow(player);
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 600;
	player.body.collideWorldBounds = true;

	// Adding the player animations, left and right.
	player.animations.add('down', [0,1,2,1],10, true);
	player.animations.add('left', [3,4,54,],10,true);
	player.animations.add('right',[6,7,8,7],10,true);
	player.animations.add('up', [9,10,11,10],10,true);

	//Adding the player controls
	controls = {
		right: game.input.keyboard.addKey(Phaser.Keyboard.D),
		left: game.input.keyboard.addKey(Phaser.Keyboard.A),
		up: game.input.keyboard.addKey(Phaser.Keyboard.W),
		down: game.input.keyboard.addKey(Phaser.Keyboard.S),

	};
	
	// Creating a platforms group.
	platforms = game.add.group();
	platforms.enableBody = true;

	// Creating the ground.
	var ground = platforms.create(0, game.world.height - 64, 'ground'); // Put the ground on the bottom of the playspace.
	ground.scale.setTo(2,2); // increase the scale of the ground.
	ground.body.immovable = true;

	// Creating ledges.
	var ledge = platforms.create(400, 400, 'ground');
	ledge.body.immovable = true;
	ledge = platforms.create(-150,150,'ground');
	ledge.body.immovable = true;
	ledge = platforms.create(-150,450,'ground');
	ledge.body.immovable = true;
	ledge = platforms.create(450, 300, 'ground');
	ledge.scale.setTo(0.5,1);
	ledge.body.immovable = true;
	ledge = platforms.create(325, 210, 'ground');
	ledge.scale.setTo(0.5,1);
	ledge.body.immovable = true;
	ledge = platforms.create(70, 325, 'ground');
	ledge.scale.setTo(0.5,1);
	ledge.body.immovable = true;

	// Creating the stars group.
	stars = game.add.group();
	stars.enableBody = true;

	// Using a for loop to create 12 stars
	for (var i = 0; i < 12; i++){

		//Create a star inside of the 'stars"'group
		var star = stars.create(i*50,Math.random()*500,'star');

		//Inflicting gravity onto the star
		star.body.gravity.y = 50;

		//Adding some bounce to the stars.
		star.body.bounce.y = 0.7 + Math.random()*0.2;
	}

	//Creating the diamond group.
	diamonds = game.add.group();
	diamonds.enableBody = true;

	var diamond = diamonds.create(Math.random()*550, Math.random()*500, 'diamond');

	// Setting up scoreText.
	scoreText = game.add.text(16,16,'Score: 0', {fontSize: '32px', fill: '#000' });
	
}

function update() {
	// run game loop

	var hitPlatform = game.physics.arcade.collide(player,platforms);
	// Handling player collisions
	game.physics.arcade.collide(player,layer);

	//Resets player velocity
	player.body.velocity.x = 0;

	if(controls.right.isDown){
		player.body.velocity.x += playerSpeed;
		player.animations.play('right');
	}

	else if(controls.left.isDown){
		player.body.velocity.x -= playerSpeed;
		player.animations.play('left');
	}
	else if(controls.up.isDown){
		player.body.velocity.y -= playerSpeed;
		player.animations.play('up');
	}
	else if(controls.down.isDown){
		player.animations.velocity.y += playerSpeed;
		player.animations.play('down');
	}
	else{
		player.animations.stop();
		player.frame=1;
	}

	// Allow the player to jump if they are touching the ground.
	if(controls.up.isDown && player.body.touching.down && hitPlatform){
		player.body.velocity.y = -350;
		//jumpTimer = game.time.now + 750;
	}

	// if(controls.down.isDown && game.time.now > jumpTimer){
	// 	player.body.velocity.y += playerSpeed;
	// 	//jumpTimer = game.time.now + 750;
	// }

	// Collision of stars/diamonds with platforms.
	game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.collide(diamonds, platforms);

	// Checking for an overlap between the player and any star in the stars group.
	// If yes, pass onto collectStar function.
	game.physics.arcade.overlap(player, stars, collectStar, null, this);
	game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this);
}

function collectStar(player, star){
	//remove the star from the screen
	star.kill();

	score += 10;
	scoreText.text =  'Wood: ' +score;
}

function collectDiamond(player, diamond){
	diamond.kill();

	score += 25;
	scoreText.text = 'Score: ' +score;
}
function  forcePortraitOrientation(forceLandscape, forcePortrait) {

        if (forcePortrait === undefined) { forcePortrait = false; }

        game.forceLandscape = forceLandscape;
        game.forcePortrait = forcePortrait;

        game.queueUpdate(true);

    }
