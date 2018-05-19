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
		else
		{
			player = game.add.sprite(25, 475, 'scientist');
			player.anchor.setTo(.5);
		}


		game.physics.arcade.enable(player);
		//game.camera.follow(player);
		player.body.setSize(24, 48, 12, 0);
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
			wood = woods.create(i*50,Math.random()*400,'wood');
			wood.scale.setTo(0.3,0.3);
			wood.body.setSize(110, 100, 140, 575);
			wood.body.immovable = true;
		}

		//GUI status text
		woodText = game.add.text(16,16,'Wood: ' +woodNumber, {fontSize: '32px', fill: '#111' });

		toolUI = game.add.sprite(0, -30, 'assets', 'Scanner');
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

		menuText = game.add.text(15, game.height - 150,' ', {fontSize: '20px', fill: '#000' });
	},
	update: function() {
		// GamePlay logic

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
		game.physics.arcade.overlap(cutEffect, woods, collectWood, null, this);
		game.physics.arcade.collide(player, woods);
	},

}

	function collectWood(cutEffect, wood){
		//changes trees to stumps when certain conditions are met
		stump = game.add.sprite(wood.body.x, wood.body.y, 'assets', 'stump');
		stump.enableBody = true;
		stump.scale.setTo(0.1,0.1);
		wood.destroy();
		woodNumber += 1;
		woodText.text =  'Wood: ' + woodNumber;

	}