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
		player.body.setSize(48, 24, 0, 24);


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
		menuText = game.add.text(100,40,' Move to right edge to change states', {fontSize: '32px', fill: '#ffffff' });
		woodText = game.add.text(16,16,'Wood: ' +woodNumber, {fontSize: '32px', fill: '#111' });

		toolUI = game.add.sprite(0, game.height - 100, 'assets', 'Scanner');
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

	},
	update: function() {
		// GamePlay logic
		game.debug.physicsGroup(woods);
		game.debug.body(player);

		// If the player presses SPACEBAR, activate current tool function.
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) 
		{
			activateTool();
		}
		else
		{
			scanEffect.body.x = -48;
			cutEffect.body.x = -48;
			bondEffect.body.x = -48;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.E))
		{
			if (toolType < tools)
				toolType += 1;
			if (toolType >= tools)
				toolType = 0;
		}

		if (toolType == 0)
			toolUI.animations.play('scanner');
		else if (toolType == 1)
			toolUI.animations.play('cutter');
		else if (toolType == 2)
			toolUI.animations.play('bonder');

		if(controls.right.isDown && !game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
			player.body.x += playerSpeed;
			player.animations.play('right');
			face = 'R';
		}

		else if(controls.left.isDown && !game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
			player.body.x -= playerSpeed;
			player.animations.play('left');
			face = 'L';
		}
		else if(controls.up.isDown && !game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
			player.body.y -= playerSpeed;
			player.animations.play('up');
			face = 'U';
		}
		else if(controls.down.isDown && !game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
			player.body.y += playerSpeed;
			player.animations.play('down');
			face = 'D';
		}
		else if(controls.right.isDown && game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
			player.body.x += playerSpeed;
			if (face == 'U')
				player.animations.play('up');
			else if (face == 'D')
				player.animations.play('down');
			else if (face == 'L')
				player.animations.play('left');
			else if (face == 'R')
				player.animations.play('right');
		}

		else if(controls.left.isDown && game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
			player.body.x -= playerSpeed;
			if (face == 'U')
				player.animations.play('up');
			else if (face == 'D')
				player.animations.play('down');
			else if (face == 'L')
				player.animations.play('left');
			else if (face == 'R')
				player.animations.play('right');
		}
		else if(controls.up.isDown && game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
			player.body.y -= playerSpeed;
			if (face == 'U')
				player.animations.play('up');
			else if (face == 'D')
				player.animations.play('down');
			else if (face == 'L')
				player.animations.play('left');
			else if (face == 'R')
				player.animations.play('right');
		}
		else if(controls.down.isDown && game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
			player.body.y += playerSpeed;
			if (face == 'U')
				player.animations.play('up');
			else if (face == 'D')
				player.animations.play('down');
			else if (face == 'L')
				player.animations.play('left');
			else if (face == 'R')
				player.animations.play('right');
		}
		else
		{
			player.animations.stop();
			if(face == 'U')
				player.frame = 10;
			else if(face == 'D')
				player.frame = 1;
			else if(face == 'L')
				player.frame = 4;
			if(face == 'R')
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