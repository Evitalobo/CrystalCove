// functions to be used all throughout the game
function activateTool()
{
	if (toolType == 0)
	{
		if (face == 'U')
		{
			scanEffect.body.x = player.body.x;
			scanEffect.body.y = player.body.y - 72;
			scanEffect.animations.play('scanUp');
		}
		else if (face == 'D')
		{
			scanEffect.body.x = player.body.x;
			scanEffect.body.y = player.body.y + 12;
			scanEffect.animations.play('scanDown');
		}
		else if (face == 'L')
		{
			scanEffect.body.x = player.body.x - 36;
			scanEffect.body.y = player.body.y - 24;
			scanEffect.animations.play('scanLeft');
		}
		else if (face == 'R')
		{
			scanEffect.body.x = player.body.x + 36;
			scanEffect.body.y = player.body.y - 24;
			scanEffect.animations.play('scanRight');
		}
	}
	if (toolType == 1)
	{
		if (face == 'U')
		{
			cutEffect.body.x = player.body.x;
			cutEffect.body.y = player.body.y - 72;
			cutEffect.animations.play('cutUp');
		}
		else if (face == 'D')
		{
			cutEffect.body.x = player.body.x;
			cutEffect.body.y = player.body.y + 12;
			cutEffect.animations.play('cutDown');
		}
		else if (face == 'L')
		{
			cutEffect.body.x = player.body.x - 36;
			cutEffect.body.y = player.body.y - 24;
			cutEffect.animations.play('cutLeft');
		}
		else if (face == 'R')
		{
			cutEffect.body.x = player.body.x + 36;
			cutEffect.body.y = player.body.y - 24;
			cutEffect.animations.play('cutRight');
		}
	}
	if (toolType == 2)
	{
		if (face == 'U')
		{
			bondEffect.body.x = player.body.x;
			bondEffect.body.y = player.body.y - 72;
			bondEffect.animations.play('bond');
		}
		else if (face == 'D')
		{
			bondEffect.body.x = player.body.x;
			bondEffect.body.y = player.body.y + 12;
			bondEffect.animations.play('bond');
		}
		else if (face == 'L')
		{
			bondEffect.body.x = player.body.x - 36;
			bondEffect.body.y = player.body.y - 24;
			bondEffect.animations.play('bond');
		}
		else if (face == 'R')
		{
			bondEffect.body.x = player.body.x + 36;
			bondEffect.body.y = player.body.y - 24;
			bondEffect.animations.play('bond');
		}
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