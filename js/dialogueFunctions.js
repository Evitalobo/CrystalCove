//functions for displaying all dialogue in the game

function advanceText()
{
	if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && dialogue)
	{
			line++;
	}
}

function toolTutorialFirstPart()
{
	dialogue = true;
	if (dialogue)
	{
		if (line == 0)
			menuText.text = 'OW! MASTER, DID YOU JUST STEP ON MY DISPLAY?! \n<Press ENTER to advance text>';
		if (line == 1)
			menuText.text = 'OH NO....MASTER!';
		if (line == 2)
			menuText.text = 'I THINK YOU STEPPED ON ME HARD ENOUGH TO PERFORM...';
		if (line == 3)
			menuText.text = 'A FACTORY RESET!!! I WILL LOSE ALL MY CURRENT MEMORIES!';
		if (line == 4)
			menuText.text = 'ALL MY FUNCTIONS! WhY mA5T3r?! H0w CuD U bE s0 CarELeSS?!';
		if (line == 5)
			menuText.text = '...';
		if (line == 6)
			menuText.text = '......';
		if (line == 7)
			menuText.text = 'Factory Reset....Complete';
		if (line == 8)
			menuText.text = 'What? What the-? Are you my owner? I was hoping for someone a \nlittle uh....nicer looking?';
		if (line == 9)
			menuText.text = 'But I guess tattered clothes, eyes like a dead fish, and unkempt hair is attractive \nin its own way... (If you like gross people...)';
		if (line == 10)
			menuText.text = 'Anyway. I guess I should introduce myself to you.';
		if (line == 11)
			menuText.text = 'I am designated as a "Handheld Multi-Operational Wonder Tool TM"\nor HANDITOOL for short.';
		if (line == 12)
			menuText.text = 'Pleasure to meet you I guess....';
		if (line > 12)
		{
			menuText.text = ' ';
			handitool.body.x = -48;
			dialogue = false;
			line = 0;
			tutorialStart = true;
		}
	}
}


function tutorialSecondPart()
{
	dialogue = true;
	if (dialogue)
	{
		if (line == 0)
			menuText.text = 'WAIT!!!!!!';
		if (line == 1)
			menuText.text = 'You DO know how to operate a handitool, right? RIGHT?!';
		if (line == 2)
			menuText.text = "Of course you don't...Why else would you be just dawdling around aimlessly \nlike that?"
		if (line == 3)
			menuText.text = "-sigh- It's a surprise you haven't gotten yourself killed yet, but I guess I can \ntell you."
		if (line == 4)
			menuText.text = "(Of all the possible owners, I just had to have this one...)";
		if (line == 5)
		{
			pickedUpTool = true;
			tools = 2;
			menuText.text = 'You see that icon in the top left part of the screen? The display on the tool (me) \nindicates what function you currently have selected.';
		}
		if (line == 6)
			menuText.text = 'You can press the E button to change my current function and press SPACE \nto activate my current function.';
		if (line == 7)
			menuText.text = 'As you can probably tell, I am very useful. Indispensible even.';
		if (line == 8)
			menuText.text = 'Unfortunately, in my present manufacturers settings, I only have two functional...\ner...functions. SCANner and, a personal favorite of mine: laser CUTter';
		if (line == 9)
			menuText.text = 'For three easy payments of $9.99 per month, however....';
		if (line == 10)
			menuText.text = 'You can get all currently existing handitool functions!!! (Yay....DLC...)';
		if (line == 11)
			menuText.text = 'Whew! That was a mouthful. I am not going to repeat that ever again.';
		if (line == 12)
			menuText.text = 'I detect a piece of driftwood nearby. Try and SCAN it to learn more about it.';
		if (line == 13)
			menuText.text = 'You do know what wood is, right?';
		if (line > 13)
		{
			menuText.text = ' ';
			dialogue = false;
			line = 0;
			tutorialStart = false;
			timer = 0;
		}
	}
}


function driftwoodFlavor()
{
	dialogue = true;
	if (dialogue && tutorialDone)
	{
		if(line == 0)
			menuText.text = 'A piece of driftwood. What more did you expect?';
		if (line == 1)
			menuText.text = "Do you like looking at random pieces of wood or something?";
		if (line > 1)
		{
			menuText.text = ' ';
			dialogue = false;
			line = 0;
			scanEffect.body.x = -48;
		}
	}
	else
	{
		if (line == 0)
			menuText.text = 'This is driftwood.';
		if (line == 1)
			menuText.text = 'It is wood';
		if (line == 2)
			menuText.text = 'that drifted here.';
		if (line == 3)
			menuText.text = "Nice job. I guess you're not totally worthless after all."
		if (line == 4)
			menuText.text = "But just in case you forget, (I would not be surprised) I can print out an \nowner's manual for you.";
		if (line == 5)
			menuText.text = "Just in case I'm wrong and you turn out to be complete idiot, it'll be somewhere \naround here for you to read. Just scan it and I'll tell you what it says.";
		if (line > 5)
		{
			menuText.text = ' ';
			tutorialDone = true;
			dialogue = false;
			line = 0;
			scanEffect.body.x = -48;
		}
	}
}

function fernFlavor(scanEffect, fern)
{
	dialogue = true;
	if (tutorialDone)
	{
		if(line == 0)
			menuText.text = 'Really big ferns.';
		if (line == 1)
			menuText.text = 'They appear to be blocking the way inland, but there may be a way to CUT \nthem down...'
		if (line == 2)
			menuText.text = 'Fun fact: These ferns are known to grow quite quickly. They might just regrow \nthe moment you turn your back on them...'
		if (line > 2)
		{
			menuText.text = ' ';
			dialogue = false;
			line = 0;
			scanEffect.body.x = -48;
		}
	}
	else
	{
		if(line == 0)
			menuText.text = 'Really big ferns.';
		if (line == 1)
			menuText.text = "I didn't say you could look at ferns."
		if (line == 2)
			menuText.text = 'I TOLD YOU TO CHECK OUT THAT PIECE OF DRIFTWOOD!!'
		if (line > 2)
		{
			menuText.text = ' ';
			dialogue = false;
			line = 0;
			scanEffect.body.x = -48;
		}
	}
}

function oceanFlavor()
{
	dialogue = true;
	if (dialogue && tutorialDone)
	{
		if(line == 0)
			menuText.text = 'That is the ocean.';
		if (line == 1)
			menuText.text = 'It is really big.';
		if (line == 2)
			menuText.text = 'Do not go that way.';
		if (line == 3)
			menuText.text = 'If you go that way, I will die.'
		if (line == 4)
			menuText.text = 'And that would be terrible for the both of us.'
		if (line > 4)
		{
			menuText.text = ' ';
			dialogue = false;
			line = 0;
			scanEffect.body.x = -48;
		}		
	}
	else
	{
		if (line == 0)
			menuText.text = 'What are you doing staring at the ocean?';
		if (line == 1)
			menuText.text = 'I told you to look at that piece of DRIFTWOOD!!';
		if (line > 1)
		{
			menuText.text = ' ';
			dialogue = false;
			line = 0;
			scanEffect.body.x = -48;
		}	
	}
}

function noteFlavor()
{
	dialogue = true;
	if (dialogue)
	{
		if(line == 0)
			menuText.text = 'This is the note I printed for you.';
		if (line == 1)
			menuText.text = 'It says to switch functions by pressing the E button.';
		if (line == 2)
			menuText.text = 'And to use the currently selected function by pressing the SPACE button.';
		if (line == 3)
			menuText.text = 'Did you really need to read that?'
		if (line == 4)
			menuText.text = '-sigh- You really are an idiot.'
		if (line > 4)
		{
			menuText.text = ' ';
			dialogue = false;
			line = 0;
			scanEffect.body.x = -48;
		}		
	}
}