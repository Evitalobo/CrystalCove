// functions to be used all throughout the game
function activateTool()
{
	if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && pickedUpTool && !dialogue && toolType > 0) 
		{
			if (toolType == 1)
			{
				scanEffect.body.x = -48;
				cutEffect.body.x = -48;

				if (face == 'U')
				{
					cutEffect.body.x = player.body.x - 12;
					cutEffect.body.y = player.body.y - 45;
					cutEffect.animations.play('cutUp');
				}
				else if (face == 'D')
				{
					cutEffect.body.x = player.body.x - 12;
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
				scanEffect.body.x = -48;
				cutEffect.body.x = -48;

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
			cutEffect.body.x = -48;
			bondEffect.body.x = -48;

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
		else if (dialogue)
		{
			cutEffect.body.x = -48;
			bondEffect.body.x = -48;
		}
		else
		{
			scanEffect.body.x = -48;
			cutEffect.body.x = -48;
			bondEffect.body.x = -48;			
		}
}

function toolToggle()
{
	if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && pickedUpTool && !dialogue)
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
	if(dialogueBox.body.y > game.height - 170 && dialogue)
	{
		dialogueBox.body.y -= 10;
	}
	else if (!dialogue && dialogueBox.body.y < game.height)
	{
		dialogueBox.body.y += 10;
	}
}