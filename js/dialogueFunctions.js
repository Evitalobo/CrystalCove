//functions for displaying all dialogue in the game

function advanceText()
{
	if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && dialogue)
	{
			line++;
	}
}

function toolTutorial()
{
	dialogue = true;
	if (dialogue)
	{
		if (line == 0)
			menuText.text = 'OW! MASTER, DID YOU JUST STEP ON MY DISPLAY?! \n<Press SPACE to advance text>';
		if (line == 1)
		{
			menuText.text = 'OH NO....MASTER!';
		}
		if (line == 2)
		{
			menuText.text = 'I THINK YOU STEPPED ON ME HARD ENOUGH TO PERFORM...';
		}
		if (line == 3)
		{
			menuText.text = 'A FACTORY RESET!!! I WILL LOSE ALL MY CURRENT MEMORIES!';
		}
		if (line == 4)
		{
			menuText.text = 'ALL MY FUNCTIONS! WHY MASTER?! HOW COULD YOU BE s0 CarELeSS?!';
		}
		if (line == 5)
		{
			menuText.text = 'gooD BYe MAstER! I W17L ALw-';
		}
		if (line == 6)
		{
			menuText.text = '...';
		}
		if (line == 7)
		{
			menuText.text = '......';
		}
		if (line == 8)
		{
			menuText.text = '...........';
		}
		if (line == 9)
		{
			menuText.text = 'Factory Reset....Complete';
		}
		if (line == 10)
		{
			menuText.text = 'What? What the-? Are you my owner?';
		}
		if (line == 11)
		{
			menuText.text = 'I was hoping for someone a little uh....nicer looking?';
		}
		if (line == 12)
		{
			menuText.text = 'But I guess tattered clothes, eyes like a dead fish, and unkempt hair is attractive \nin its own way... (If you like gross people...)';
		}
		if (line == 13)
		{
			menuText.text = 'Anyway. I guess I should introduce myself to you.';
		}
		if (line == 14)
		{
			menuText.text = 'I am designated as a "Handheld Multi-Operational Wonder Tool TM"\nor HANDITOOL for short.';
		}
		if (line == 15)
		{
			menuText.text = 'How to use me? You must really be an idiot, but fine, I guess I can tell you.\n(Ugh...just break me now...Like honestly. How have you survived this long?)';
		}
		if (line == 16)
		{
			pickedUpTool = true;
			tools = 2;
			menuText.text = 'You see that icon in the top left part of the screen? The display on me indicates \nwhat function you currently have selected.';
		}
		if (line == 17)
		{
			menuText.text = 'You can press the E button change my current function and press SPACE \nto activate my current function.';
		}
		if (line == 18)
		{
			menuText.text = 'As you can probably tell, I am very useful. Indispensible even.';
		}
		if (line == 19)
		{
			menuText.text = 'Unfortunately, in my present manufacturers settings, I only have two functional...\ner...functions. SCANner and, a personal favorite of mine: laser CUTter';
		}
		if (line == 20)
		{
			menuText.text = 'For three easy payments of $9.99 per month, however....';
		}
		if (line == 21)
			menuText.text = 'You can get all currently existing handitool functions!!! (Yay....)';
		if (line == 22)
			menuText.text = 'Buy now and you can get a stylish Handitool holster for absolutely free!!!\n(Just pay separate shipping and handling.)';
		if (line == 23)
			menuText.text = 'Alternatively, if you just wait long enough and just do things, you might just get \nnew functions for no money at all...';
		if (line == 24)
			menuText.text = 'Whew! That was a mouthful. I am not going to repeat that ever again.';
		if (line == 25)
			menuText.text = 'Go on now. Use your newfound knowledge and go SCAN that piece of driftwood \nover there to learn more about it';
		if (line == 26)
			menuText.text = 'Just have the SCAN function selected and press SPACE to activate it.';
		if (line == 27)
			menuText.text = 'In case you forget, (I would not be surprised) I can print out a note with \ninstructions on it.';
		if (line == 28)
			menuText.text = 'Just in case you turn out to be complete idiot, it will be here for you to read. \nJust scan it and I will tell you what it says.';
		if (line > 28)
		{
			menuText.text = ' ';
			dialogue = false;
			line = 0;
			note.body.x = 305;
			note.body.y = 250;
			handitool.body.x = -48;
		}
	}
}

function driftwoodFlavor()
{
	dialogue = true;
	if (dialogue)
		if(line == 0)
			menuText.text = 'A piece of driftwood.';
		if (line == 1)
			menuText.text = 'What more did you expect?';
		if (line > 1)
		{
			menuText.text = ' ';
			dialogue = false;
			line = 0;
			scanEffect.body.x = -48;
		}
}

function fernFlavor(scanEffect, fern)
{
	dialogue = true;
	if (dialogue)
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
}

function oceanFlavor()
{
	dialogue = true;
	if (dialogue)
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