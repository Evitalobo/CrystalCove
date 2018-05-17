// define GamePlay state and methods
var GamePlay2 = function(game) {};
GamePlay2.prototype = {

	// preloading assets.
	preload: function() {

		// Outputting to console.
		console.log('GamePlay: preload');

		// preloading assets
		game.load.spritesheet('scientist', 'assets/img/WalkSprite.png', 48, 48);
		game.load.image('scene3', 'assets/img/scene3.png');
		
	},

	// Creating assets into game world.
	create: function() 
	{
		console.log('GamePlay: create');

		// Enabling Arcade Physics system.
		game.physics.startSystem(Phaser.Physics.ARCADE);


		// Adding a backgrofund.
		map2 = game.add.sprite(0, 0,'scene3');

		//Adding the player sprite
		player = game.add.sprite(25, 475, 'scientist');
		player.anchor.setTo(.5);

		//Adding the player physics
		game.physics.arcade.enable(player);
		//game.camera.follow(player);
		player.body.collideWorldBounds = true;
		player.body.setSize(48, 24, 0, 24);


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

		post = game.add.sprite(0, 0, 'assets', 'bridgePost');

		//GUI status text
		menuText = game.add.text(300,60,' Press M to go to menu', {fontSize: '32px', fill: '#999' });

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
	update: function() 
	{
		// GamePlay logic

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
			
		if(player.body.x < 1)
		{
			game.state.start('GamePlay1');
		}

		//menustateswitch
		if(game.input.keyboard.isDown(Phaser.Keyboard.M)){
			this.autumnVoyage.stop();
			game.state.start('MainMenu');

		}


	}
}


// define GameOver state and methods
var GameOver = function(game) {};
GameOver.prototype = {
	preload: function() {
		console.log('GameOver: preload');
	},
	create: function() {
		console.log('GameOver: create');
		game.stage.backgroundColor = "#000000";
		// GUI status text.
		menuText = game.add.text(75,250,'        You are in the game over state. \nPress SPACEBAR to go to the next state.', {fontSize: '32px', fill: '#FFFFFF' });
	},
	update: function() {
		// GameOver logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) 
		{
			game.state.start('MainMenu');
		}
	}
}


