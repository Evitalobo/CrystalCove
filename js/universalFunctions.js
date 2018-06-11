// functions to be used all throughout the game

function addSounds()
{
		advance = game.add.audio('advance');
		bondSound = game.add.audio('bondSound');
		cutSound = game.add.audio('cutSound');
		scanSound = game.add.audio('scanSound');
		scanSuccess = game.add.audio('scanSuccess');
		toggleFunction = game.add.audio('toggle');
		woodCut = game.add.audio('woodCut');
		download = game.add.audio('download');
		newFunction = game.add.audio('newFunction');
		resonate = game.add.audio('resonate');
		autumnVoyage = game.add.audio('autumnVoyage');
		wind = game.add.audio('wind');
		shatter = game.add.audio('shatter');
		vibrate = game.add.audio('vibrate');
		caveAmb = game.add.audio('caveAmb');
		revelation = game.add.audio('revelation');
		placeStone = game.add.audio('placeStone');
}
function createUI()
{
	toolUI = game.add.sprite(-10, -30, 'assets', 'Scanner');
	toolUI.scale.setTo(.4);
	toolUI.animations.add('scanner', ['Scanner'], true);
	toolUI.animations.add('cutter', ['Cutter'], true);
	toolUI.animations.add('bonder', ['Bonder'], true);

	scanEffect = game.add.sprite(-250, 0, 'assets', 'Scan U 1');
	scanEffect.anchor.setTo(.5);
	game.physics.arcade.enable(scanEffect);
	scanEffect.animations.add('scanUp', ['Scan U 1', 'Scan U 2'], 18, true);
	scanEffect.animations.add('scanDown', ['Scan D 1', 'Scan D 2'], 18, true);
	scanEffect.animations.add('scanRight', ['Scan R 1', 'Scan R 2'], 18, true);
	scanEffect.animations.add('scanLeft', ['Scan L 1', 'Scan L 2'], 18, true);

	cutEffect = game.add.sprite(-250, 0, 'assets', 'Cut U 1');
	cutEffect.anchor.setTo(.5);
	game.physics.arcade.enable(cutEffect);
	cutEffect.animations.add('cutUp', ['Cut U 1', 'Cut U 2', 'Cut U 3'], 24, true);
	cutEffect.animations.add('cutDown', ['Cut D 1', 'Cut D 2', 'Cut D 3'], 24, true);
	cutEffect.animations.add('cutRight', ['Cut R 1', 'Cut R 2', 'Cut R 3'], 24, true);
	cutEffect.animations.add('cutLeft', ['Cut L 1', 'Cut L 2', 'Cut L 3'], 24, true);

	bondEffect = game.add.sprite(-250, 0, 'assets', 'Bond 1');
	bondEffect.anchor.setTo(.5);
	game.physics.arcade.enable(bondEffect);
	bondEffect.animations.add('bond', ['Bond 1', 'Bond 2', 'Bond 3', 'Bond 4'], 24, true);

	dialogueBox = game.add.sprite(2, game.height, 'assets', 'scannerDialogue');
	dialogueBox.scale.setTo(.48, .4);
	dialogueBox.alpha = .85;

	menuText = game.add.bitmapText(15, game.height - 150, 'pixel', ' ', 24);
}

function activateTool()
{
	if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && pickedUpTool && !dialogue && toolType > 0) 
		{
			if (toolType == 1)
			{
				scanEffect.body.x = -250;
				bondEffect.body.x = -250;

				if (face == 'U')
				{
					cutEffect.body.x = player.body.x - 8;
					cutEffect.body.y = player.body.y - 45;
					cutEffect.animations.play('cutUp');
				}
				else if (face == 'D')
				{
					cutEffect.body.x = player.body.x - 8;
					cutEffect.body.y = player.body.y + 36;
					cutEffect.animations.play('cutDown');
				}
				else if (face == 'L')
				{
					cutEffect.body.x = player.body.x - 48;
					cutEffect.body.y = player.body.y;
					cutEffect.animations.play('cutLeft');
				}
				else if (face == 'R')
				{
					cutEffect.body.x = player.body.x + 24;
					cutEffect.body.y = player.body.y;
					cutEffect.animations.play('cutRight');
				}
			}
			if (toolType == 2)
			{
				scanEffect.body.x = -250;
				cutEffect.body.x = -250;

				if (face == 'U')
				{
					bondEffect.body.x = player.body.x - 12;
					bondEffect.body.y = player.body.y - 45;
					bondEffect.animations.play('bond');
				}
				else if (face == 'D')
				{
					bondEffect.body.x = player.body.x - 12;
					bondEffect.body.y = player.body.y + 36;
					bondEffect.animations.play('bond');
				}
				else if (face == 'L')
				{
					bondEffect.body.x = player.body.x - 48;
					bondEffect.body.y = player.body.y;
					bondEffect.animations.play('bond');
				}
				else if (face == 'R')
				{
					bondEffect.body.x = player.body.x + 24;
					bondEffect.body.y = player.body.y;
					bondEffect.animations.play('bond');
				}
			}
		}
		else if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && toolType == 0 && pickedUpTool && !dialogue)
		{
			cutEffect.body.x = -250;
			bondEffect.body.x = -250;

			if (face == 'U')
			{
				scanEffect.body.x = player.body.x - 12;
				scanEffect.body.y = player.body.y - 45;
				scanEffect.animations.play('scanUp');
			}
			else if (face == 'D')
			{
				scanEffect.body.x = player.body.x - 12;
				scanEffect.body.y = player.body.y + 36;
				scanEffect.animations.play('scanDown');
			}
			else if (face == 'L')
			{
				scanEffect.body.x = player.body.x - 48;
				scanEffect.body.y = player.body.y;
				scanEffect.animations.play('scanLeft');
			}
			else if (face == 'R')
			{
				scanEffect.body.x = player.body.x + 24;
				scanEffect.body.y = player.body.y;
				scanEffect.animations.play('scanRight');
			}
		}
		else if (dialogue && toolType == 0)
		{
			cutEffect.body.x = -250;
			bondEffect.body.x = -250;
		
		}
		else if (dialogue && toolType == 1)
		{
			scanEffect.body.x = -250;
			bondEffect.body.x = -250;
		
		}
		else if (dialogue && toolType == 2)
		{
			scanEffect.body.x = -250;
			cutEffect.body.x = -250;	
	
		}
		else
		{
			scanEffect.body.x = -250;
			cutEffect.body.x = -250;
			bondEffect.body.x = -250;		
		}

		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && toolType == 1 && !dialogue)
		{
			cutSound.volume = 1;
			bondSound.volume = 0;
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && toolType == 2 && !dialogue)
		{
			bondSound.volume = .5;
			cutSound.volume = 0;
		}
		else
		{
			cutSound.volume = 0;
			bondSound.volume = 0;
		}

		if ( game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && toolType == 0 && !dialogue)
			scanSound.play('', 0, 1, false)
}

function toolToggle()
{
	if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER) && pickedUpTool && !dialogue)
	{
		toggleFunction.play('', 0, 1, false);
		if (toolType < tools)
			toolType += 1;
		if (toolType >= tools)
			toolType = 0;
	}

	if (toolType == 0)
	{
		toolUI.animations.play('scanner');
	}
	else if (toolType == 1)
	{
		toolUI.animations.play('cutter');
	}
	else if (toolType == 2)
	{
		toolUI.animations.play('bonder');
	}
}

function movement()
{
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
}

function scannerBoxMovement()
{
	if(dialogueBox.y > game.height - 170 && dialogue)
	{
		dialogueBox.y -= 20;
	}
	else if (!dialogue && dialogueBox.y < game.height)
	{
		dialogueBox.y += 20;
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT) && inventoryBox.y < 0 && pickedUpTool)
		inventoryBox.y += 20;
	else if (!game.input.keyboard.isDown(Phaser.Keyboard.SHIFT) && inventoryBox.y > -200)
		inventoryBox.y -= 20;
}

function createInventory()
{
	inventoryBox = game.add.sprite(200, -200, 'assets', 'scannerDialogue');
	inventoryBox.alpha = .8;
	inventoryBox.scale.setTo(.35, .5);
	game.physics.arcade.enable(inventoryBox);
	woodIcon = game.add.sprite(210, 0, 'assets', 'obj3');
	woodIcon.scale.setTo( .15, .2);
	woodText = game.add.bitmapText(255, 15, 'pixel', 'x 0', 20);
	crystal2Icon = game.add.sprite(305, 15, 'assets', 'crystal2');
	crystal2Icon.scale.setTo( .1, .1);
	crystal2Text = game.add.bitmapText(355, 15, 'pixel', 'x 0', 20);
	crystal1Icon = game.add.sprite(405, 15, 'assets', 'crystal1');
	crystal1Icon.scale.setTo( .1, .1);
	crystal1Text = game.add.bitmapText(455, 15, 'pixel', 'x 0', 20);
	crystal3Icon = game.add.sprite(505, 15, 'assets', 'crystal3');
	crystal3Icon.scale.setTo( .1, .1);
	crystal3Text = game.add.bitmapText(555, 15, 'pixel', 'x 0', 20);
}

function showInventory()
{
	if (woodCt > 0 && inventoryBox.body.y >= 0)
	{
		woodIcon.alpha = 1;
		woodText.text = 'x ' + woodCt;
	}	
	else if (inventoryBox.body.y >= 0 && woodCt == 0 && crystal2Ct == 0 && crystal1Ct == 0)
	{
		woodText.text = 'INVENTORY IS EMPTY';
	}
	else
	{
		woodIcon.alpha = 0;
		woodText.text = ' ';
	}

	if (crystal2Ct > 0 && inventoryBox.body.y >= 0)
	{
		crystal2Icon.alpha = 1;
		crystal2Text.text = 'x ' + crystal2Ct;
	}	
	else
	{
		crystal2Icon.alpha = 0;
		crystal2Text.text = ' ';
	}

	if (crystal1Ct > 0 && inventoryBox.body.y >= 0)
	{
		crystal1Icon.alpha = 1;
		crystal1Text.text = 'x ' + crystal1Ct;
	}	
	else
	{
		crystal1Icon.alpha = 0;
		crystal1Text.text = ' ';
	}

	if (crystal3Ct > 0 && inventoryBox.body.y >= 0)
	{
		crystal3Icon.alpha = 1;
		crystal3Text.text = 'x ' + crystal3Ct;
	}	
	else
	{
		crystal3Icon.alpha = 0;
		crystal3Text.text = ' ';
	}
}

function buildBridge()
{
	if (!bridgeBuilt && woodCt >= 5)
	{
		bridge.alpha += .01;
		riverMid.alpha -= .01;
	}
	else if (woodCt < 5)
	{
		dialogue = true;
		scanSuccessful = true;
		if(line == 0 && dialogueBox.y <= game.height - 170)
			menuText.text = 'Hmm....';
		if(line == 1)
			menuText.text = "Doesn't seem to be working...";
		if(line == 2)
			menuText.text = "You sure you can make a bridge yet?";
		if(line == 3)
			menuText.text = "You don't seem to have enough wood to make it.";
		if(line == 4)
			menuText.text = "Remember, you can hold SHIFT to check what's in your inventory.";
		if (line > 4)
		{
			menuText.text = ' ';
			dialogue = false;
			line = 0;
			scanSuccessful = false;
			timer = 0;
			bondEffect.body.x = -48;
		}		
	}
	if (bridge.alpha > 1)
	{
		bridge.alpha = 1;
	}
	if (bridge.alpha == 1 && !bridgeBuilt)
	{
		woodCt -= 5;
		bridgeBuilt = true;
	}
}


function placeCrystals()
{
	if (!crystalsPlaced && crystal1Ct == 1 && crystal2Ct == 1 && crystal3Ct == 1)
	{
		midCrystal.alpha += .01;
		leftCrystal.alpha += .01;
		rightCrystal.alpha += .01;
	}
	else if (!crystalsPlaced)
	{
		dialogue = true;
		scanSuccessful = true;
		if(line == 0 && dialogueBox.y <= game.height - 170)
			menuText.text = 'Hmm....';
		if(line == 1)
			menuText.text = "Doesn't seem to be working...";
		if(line == 2)
			menuText.text = "Can't place things down that I don't have.";
		if(line == 3)
			menuText.text = "I think we're missing something...";
		if(line == 4)
			menuText.text = "Remember, you can hold SHIFT to check your inventory.";
		if (line > 4)
		{
			menuText.text = ' ';
			dialogue = false;
			line = 0;
			scanSuccessful = false;
			timer = 0;
			bondEffect.body.x = -250;
		}		
	}
	if (midCrystal.alpha > 1 && leftCrystal.alpha > 1 && rightCrystal.alpha > 1)
	{
		midCrystal.alpha = 1;
		leftCrystal.alpha = 1;
		rightCrystal.alpha = 1;
	}
	if (midCrystal.alpha == 1 && !crystalsPlaced)
	{
		crystal1Ct = 0;
		crystal2Ct = 0;
		crystal3Ct = 0;
		crystalsPlaced = true;
	}
}

function switchLR()
{
	if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && crystalsPlaced)
	{
		var temp = leftColor;
		leftColor = rightColor;
		rightColor = temp;
		placeStone.play('', 0, 1, false);
	}
}

function switchML()
{
	if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && crystalsPlaced)
	{
		var temp = leftColor;
		leftColor = midColor;
		midColor = temp;
		placeStone.play('', 0, 1, false);
	}
}

function switchMR()
{
	if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && crystalsPlaced)
	{
		var temp = rightColor;
		rightColor = midColor;
		midColor = temp;
		placeStone.play('', 0, 1, false);
	}
}

function rollCredits()
{
	game.state.start('GameOver');
}
  
function restart()
{

  if (game.input.keyboard.justPressed(Phaser.Keyboard.R))
	{
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
		var playerX;
		var map = 0;
		var toolType = 0;
		var tools = 0;
		var pickedUpTool = false;
		var dialogue = false;
		var driftwoodTaken = false;
		caveAmb.stop();
		wind.stop();
		autumnVoyage.stop();
		revelation.stop();
		game.state.start('MainMenu');
	}
}