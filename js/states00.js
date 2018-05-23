//This code has been adapted from Professor Nathan Altice's states 02.js file.

var game = new Phaser.Game(800, 600, Phaser.AUTO);

var menuText;
var line = 0;
var tutorialStart = false
var tutorialDone = false
var gameText;
var gameOverText;
var playerSpeed = 5;
var face;
var timer=0;
var playerY;
var map = 0;
var toolType = 0;
var tools = 0;
var pickedUpTool = false;
var dialogue = false;
var driftwoodTaken = false;


// define MainMenu state and methods
var MainMenu = function(game) {};
MainMenu.prototype = 
{
	preload: function() 
	{
		console.log('You are now in the Main menu state.');
		//preload assets for entire game
		game.load.atlas('assets', 'assets/img/assets.png', 'assets/img/assets.json');
		game.load.spritesheet('scientist', 'assets/img/WalkSprite.png', 48, 48);

		//MenuBG
		game.load.image('menuBG', 'assets/img/MenuBG.png');

		// load audio assets
		game.load.audio('autumnVoyage', 'assets/audio/rs_autumnVoyage.mp3');

	},
	create: function() 
	{
		console.log('MainMenu: create');
		menu = game.add.sprite(0, 0, 'menuBG');

		// loop and play background music
		autumnVoyage = game.add.audio('autumnVoyage');
		autumnVoyage.play('', 0, 1, true);	// ('marker', start position, volume (0-1), loop)

		//Adding the player controls
		controls = {
			right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
			left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
			up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
			down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
		};
	},
	update: function() 
	{
		// main menu logic
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) 
		{
			//map = 1;
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
	
	},

	// Creating assets into game world.
	create: function() 
	{
		console.log('GamePlay: create');

		// this.autumnVoyage = game.add.audio('autumnVoyage');
		// this.autumnVoyage.play('', 0, 1, true);	// ('marker', start position, volume (0-1), loop)

		// Enabling Arcade Physics system.
		game.physics.startSystem(Phaser.Physics.ARCADE);


		// Adding a background.
		backdrop = game.add.sprite(0, 0, 'assets', 'scene1');

		boundary = game.add.sprite(0, 0, 'assets', 'OceanBound');
		game.physics.arcade.enable(boundary);
		boundary.body.immovable = true;

		handitool = game.add.sprite(305, 250, 'assets', 'Handitool');
		game.physics.arcade.enable(handitool);
		handitool.scale.setTo(.5);

		note = game.add.sprite(0, game.height, 'assets', 'Note')
		game.physics.arcade.enable(note);
		note.scale.setTo(.5);

		//Adding the player sprite
		if(map == 1)
		{
			player = game.add.sprite(650, playerY, 'scientist');
			player.anchor.setTo(.5);
			pickedUpTool = true;
			tutorialDone = true;
		}
		else
		{
			player = game.add.sprite(200, 475, 'scientist');
			player.frame = 1;
			player.anchor.setTo(.5);
		}
		
		//Adding the player physics
		game.physics.arcade.enable(player);
		//game.camera.follow(player);
		player.body.collideWorldBounds = true;
		player.body.setSize(30, 48, 9, 0);

		// Adding the player animations, left and right.
		player.animations.add('down', [0,1,2,1],10, true);
		player.animations.add('left', [3,4,5,4],10,true);
		player.animations.add('right',[6,7,8,7],10,true);
		player.animations.add('up', [9,10,11,10],10,true);

		//wood physics
		woods = game.add.group();
		woods.enableBody = true;

		if (!driftwoodTaken)
		{
			driftwood = woods.create(250, Math.random()*500, 'assets', 'obj3');
			driftwood.body.collideWorldBounds = true;
			driftwood.body.setSize(250, 100, 20, 100);
			driftwood.scale.setTo(0.3,0.3);			
		}
		debris = game.add.emitter(0, 0, 20);
		debris.makeParticles('assets', 'obj3');
		debris.maxParticleScale = .1;
		debris.minParticleScale = .05;
		debris.alpha = .7

		//fern physics
		ferns = game.add.group();
		ferns.enableBody = true;

		//ADD FERN COUNTER TO UNLOCK NEXT PART OF MAP AND SET WORLD BOUND TO COLLIDE WITH PATH
		for (i = -1; i < 12; i++)
		{
			fern = ferns.create(800, i*50, 'assets', 'obj');
			fern.anchor.setTo(.5);
			fern.scale.setTo(0.5,0.5);
			fern.angle = 180;
			fern.body.setSize(100, 100, 100, 50);
			fern.body.immovable = true;
		}

		foliage = game.add.emitter(0, 0, 200);
		foliage.makeParticles('assets', 'obj');
		foliage.maxParticleScale = .2;
		foliage.minParticleScale = .1;
		foliage.alpha = .7;


		toolUI = game.add.sprite(-10, game.height, 'assets', 'Scanner');
		game.physics.arcade.enable(toolUI);
		toolUI.scale.setTo(.4);
		toolUI.animations.add('scanner', ['Scanner'], true);
		toolUI.animations.add('cutter', ['Cutter'], true);
		toolUI.animations.add('bonder', ['Bonder'], true);

		scanEffect = game.add.sprite(-48, 0, 'assets', 'Scan U 1');
		scanEffect.anchor.setTo(.5);
		game.physics.arcade.enable(scanEffect);
		scanEffect.animations.add('scanUp', ['Scan U 1', 'Scan U 2'], 18, true);
		scanEffect.animations.add('scanDown', ['Scan D 1', 'Scan D 2'], 18, true);
		scanEffect.animations.add('scanRight', ['Scan R 1', 'Scan R 2'], 18, true);
		scanEffect.animations.add('scanLeft', ['Scan L 1', 'Scan L 2'], 18, true);

		cutEffect = game.add.sprite(-48, 0, 'assets', 'Cut U 1');
		cutEffect.anchor.setTo(.5);
		game.physics.arcade.enable(cutEffect);
		cutEffect.animations.add('cutUp', ['Cut U 1', 'Cut U 2', 'Cut U 3'], 24, true);
		cutEffect.animations.add('cutDown', ['Cut D 1', 'Cut D 2', 'Cut D 3'], 24, true);
		cutEffect.animations.add('cutRight', ['Cut R 1', 'Cut R 2', 'Cut R 3'], 24, true);
		cutEffect.animations.add('cutLeft', ['Cut L 1', 'Cut L 2', 'Cut L 3'], 24, true);

		bondEffect = game.add.sprite(-48, 0, 'assets', 'Bond 1');
		bondEffect.anchor.setTo(.5);
		game.physics.arcade.enable(bondEffect);
		bondEffect.animations.add('bond', ['Bond 1', 'Bond 2', 'Bond 3', 'Bond 4'], 24, true);


		dialogueBox = game.add.sprite(2, game.height, 'assets', 'scannerDialogue');
		game.physics.arcade.enable(dialogueBox);
		dialogueBox.scale.setTo(.48, .4);
		dialogueBox.alpha = .8; 

		createInventory();

		menuText = game.add.text(15, game.height - 150,' ', {fontSize: '20px', fill: '#000' });
	},
	update: function() 
	{
		// GamePlay logic

		if(pickedUpTool)
		{
			toolUI.body.y = -30;
			handitool.kill();
		}

		if (tutorialStart && !tutorialDone)
		{
			timer += 1
		}
		if (timer > 120)
			tutorialSecondPart();

		if (tutorialDone)
		{
			note.body.x = 400;
			note.body.y = 300;
		}
					

		// If the player presses SPACEBAR, activate current tool function.
		activateTool();
		// If player presses SHIFT, change the current tool function.
		toolToggle();

		if(!dialogue)
			movement();
		else
			player.animations.stop();

		advanceText();

		scannerBoxMovement();
		showInventory();

		game.physics.arcade.collide(player, boundary);
		game.physics.arcade.collide(player, ferns);
		game.physics.arcade.collide(player, driftwood);
		game.physics.arcade.collide(ferns, driftwood);
		game.physics.arcade.overlap(player, handitool, toolTutorialFirstPart, null, this);
		game.physics.arcade.overlap(cutEffect, ferns, burnFern, null, this);
		game.physics.arcade.overlap(cutEffect, driftwood, collectDriftwood, null, this);
		game.physics.arcade.overlap(scanEffect, driftwood, driftwoodFlavor, null, this);
		game.physics.arcade.overlap(scanEffect, ferns, fernFlavor, null, this);
		game.physics.arcade.overlap(scanEffect, boundary, oceanFlavor, null, this);
		game.physics.arcade.overlap(scanEffect, note, noteFlavor, null, this);

		if(player.body.x > 750)
		{
			map = 0;
			playerY = player.body.y;
			game.state.start('GamePlay1');
		}

		if(player.body.y <= 1 || player.body.y >= 550)
			if(pickedUpTool)
				boundDialogue();
	}
}

function burnFern(cutEffect, fern)
{
	if (tutorialDone)
	{
		foliage.x = fern.body.x + 30;
		foliage.y = fern.body.y;
		foliage.start(true, 1000, null, 15);
		fern.kill();
	}
	else
	{
		dialogue = true;
		if (line == 0 && dialogueBox.y <= game.height - 170)
			menuText.text = "Hold it right there!";
		if (line == 1)
			menuText.text = "Who said you could do that?";
		if (line == 2)
			menuText.text = "Learn how the game works before trying progress, eager beaver!";
		if (line == 3)
			menuText.text = "I get it. You're smarter than most people. That's how I feel all the time.";
		if (line == 4)
			menuText.text = "But throw the devs a bone here!";
		if (line == 5)
			menuText.text = "They worked really hard to make this tutorial. The least you can do is go along \nwith it.";
		if (line > 5)
		{
			menuText.text = ' ';
			dialogue = false;
			line = 0;
			cutEffect.body.x = -48;
		}
	}
}

function collectDriftwood(cutEffect, driftwood)
{
	if(tutorialDone)
	{
		debris.x = driftwood.body.x + 30;
		debris.y = driftwood.body.y;
		debris.start(true, 1000, null, 15);
		driftwood.kill();
		driftwoodTaken = true;
		woodCt += 1;
	}
	else
	{
		dialogue = true;
		if (line == 0 && dialogueBox.y <= game.height - 170)
			menuText.text = 'Whoa whoa WHOA!';
		if (line == 1)
			menuText.text = "I didn't tell you to CUT it!";
		if (line == 2)
			menuText.text = "I told you to SCAN it!";
		if (line == 3)
			menuText.text = "Now turn off that laser cutter before you kill something!"
		if (line > 3)
		{
			menuText.text = ' ';
			dialogue = false;
			line = 0;
			cutEffect.body.x = -48;
		}
	}

}

function boundDialogue()
{
	dialogue = true;
	if (line == 0)
		menuText.text = 'Nothing interesting that way.';
	if (line == 1)
		menuText.text = "Trust me. I know more than you do.";
	if (line > 1)
		{
			menuText.text = ' ';
			dialogue = false;
			line = 0;
			if (player.body.y <= 1)
				player.body.y += 5;
			else
				player.body.y -= 5
		}

}
