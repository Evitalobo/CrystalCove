scanSuccessful = false; //functions for displaying all dialogue in the game

function advanceText()
{
	if (scanSuccessful && line == 0 && timer < 1)
	{
		scanSuccess.play('', 0, 1, false);
		scanSuccessful = false;
		timer += 1;
	}

	if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER) && dialogue)
	{
			line++;
			advance.play('', 0, 1, false);
	}
}

function toolTutorialFirstPart()
{
	dialogue = true;
	scanSuccessful = true;
	if (dialogue)
	{
		if (line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = 'OW! MASTER, DID YOU JUST STEP ON MY DISPLAY?! \n \n<Press ENTER to advance text>';
		}
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
			menuText.text = 'But I guess tattered clothes, eyes like a dead fish, and unkempt\nhair is attractive in its own way... \n(If you like gross people...)';
		if (line == 10)
			menuText.text = 'Anyway. I guess I should introduce myself to you.';
		if (line == 11)
			menuText.text = 'I am designated as a "Handheld Multi-Operational Wonder Tool TM"\nor HANDITOOL for short.';
		if (line == 12)
			menuText.text = 'Pleasure to meet you I guess....';
		if (line > 12)
		{
			menuText.text = ' ';
			handitool.body.x = -250;
			dialogue = false;
			scanSuccessful = false;
			timer = 0;
			line = 0;
			tutorialStart = true;
		}
	}
}


function tutorialSecondPart()
{
	dialogue = true;
	scanSuccessful = true;
	if (dialogue)
	{
		if (line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = 'WAIT!!!!!!';
		}
		if (line == 1)
			menuText.text = 'You DO know how to operate a handitool, right? RIGHT?!';
		if (line == 2)
			menuText.text = "Of course you don't...Why else would you be just dawdling around \naimlessly like that?"
		if (line == 3)
			menuText.text = "-sigh- It's a surprise you haven't gotten yourself killed yet, but I \nguess I can tell you."
		if (line == 4)
			menuText.text = "(Of all the possible owners, I just had to have this one...)";
		if (line == 5)
		{
			pickedUpTool = true;
			tools = 2;
			menuText.text = 'You see that icon in the top left part of the screen? The display on the \ntool (me) indicates what function you currently have selected.';
			toolIndicator.start();
		}
		if (line == 6)
		{
			toolIndicator.stop();
			toolUI.alpha = 1;
			menuText.text = "You can press ENTER (the button you're pressing now) to change \nmy current function and press SPACE to activate my \ncurrent function.";
		}
		if (line == 7)
		{
			menuText.text = 'As you can probably tell, I am very useful. Indispensible even.';
		}
		if (line == 8)
			menuText.text = 'Unfortunately, in my present manufacturers settings, I only have \ntwo functional...er...functions. SCANner and, a personal favorite of \nmine: laser CUTter';
		if (line == 9)
			menuText.text = 'For three easy payments of $9.99 per month, however....';
		if (line == 10)
			menuText.text = 'You can get all currently existing handitool functions!!! \n(Yay....DLC...)';
		if (line == 11)
			menuText.text = 'Whew! That was a mouthful. I am not going to repeat that\never again.';
		if (line == 12)
			menuText.text = 'I detect a piece of driftwood nearby. Try and SCAN it to learn \nmore about it.';
		if (line == 13)
			menuText.text = 'You do know what wood is, right?';
		if (line > 13)
		{
			menuText.text = ' ';
			dialogue = false;
			scanSuccessful = false;
			line = 0;
			tutorialStart = false;
			timer = 0;
		}
	}
}


function driftwoodFlavor()
{
	dialogue = true;
	scanSuccessful = true;
	if (dialogue && tutorialDone)
	{
		if(line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = 'A piece of driftwood. What more did you expect?';
		}
		if (line == 1)
			menuText.text = "Do you like looking at random pieces of wood or something?";
		if (line == 2)
			menuText.text = "I mean I guess you could CUT it up.";
		if (line == 3)
			menuText.text = "Who knows? A random piece of wood might come in handy...";
		if (line > 3)
		{
			menuText.text = ' ';
			dialogue = false;
			scanSuccessful = false;
			timer = 0;
			line = 0;
			scanEffect.body.x = -250;
		}
	}
	else
	{
		if (line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = 'This is driftwood.';
		}
		if (line == 1)
			menuText.text = 'It is wood';
		if (line == 2)
			menuText.text = 'that drifted here.';
		if (line == 3)
			menuText.text = "Nice job. I guess you're not totally worthless after all."
		if (line == 4)
			menuText.text = "But just in case you forget, (I would not be surprised) I can print \nout an owner's manual for you.";
		if (line == 5)
			menuText.text = "Just in case I'm wrong and you turn out to be complete idiot, it'll be \nsomewhere around here for you to read. Just scan it and I'll tell \nyou what it says.";
		if (line > 5)
		{
			menuText.text = ' ';
			tutorialDone = true;
			dialogue = false;
			scanSuccessful = false;
			timer = 0;
			line = 0;
			scanEffect.body.x = -250;
		}
	}
}

function fernFlavor(scanEffect, fern)
{
	dialogue = true;
	scanSuccessful = true;
	if (tutorialDone)
	{
		if(line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = 'Really big ferns.';
		}
		if (line == 1)
			menuText.text = 'They appear to be blocking the way inland, but there may be a \nway to CUT them down...'
		if (line == 2)
			menuText.text = 'Fun fact: These ferns are known to grow quite quickly. They might \njust grow back the moment you turn your back on them...'
		if (line > 2)
		{
			menuText.text = ' ';
			dialogue = false;
			scanSuccessful = false;
			timer = 0;
			line = 0;
			scanEffect.body.x = -250;
		}
	}
	else
	{
		if(line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = 'Really big ferns.';
		}
		if (line == 1)
			menuText.text = "I didn't say you could look at ferns."
		if (line == 2)
			menuText.text = 'I TOLD YOU TO CHECK OUT THAT PIECE OF DRIFTWOOD!!'
		if (line > 2)
		{
			menuText.text = ' ';
			dialogue = false;
			scanSuccessful = false;
			timer = 0;
			line = 0;
			scanEffect.body.x = -250;
		}
	}
}

function oceanFlavor()
{
	dialogue = true;
	scanSuccessful = true;
	if (tutorialDone)
	{
		if(line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = 'That is the ocean.';
		}
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
			scanSuccessful = false;
			timer = 0;
			line = 0;
			scanEffect.body.x = -250;
		}		
	}
	else
	{
		if (line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = 'What are you doing staring at the ocean?';
		}
		if (line == 1)
			menuText.text = 'I told you to look at that piece of DRIFTWOOD!!';
		if (line > 1)
		{
			menuText.text = ' ';
			dialogue = false;
			scanSuccessful = false;
			timer = 0;
			line = 0;
			scanEffect.body.x = -250;
		}	
	}
}

function noteFlavor()
{
	dialogue = true;
	scanSuccessful = true;
	if (dialogue)
	{
		if(line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = 'This is the note I printed for you.';
		}
		if (line == 1)
			menuText.text = 'It says to switch functions by pressing ENTER.';
		if (line == 2)
			menuText.text = 'And to use the currently selected function by pressing SPACE.';
		if (line == 3)
			menuText.text = "Factory settings give me access only to two functions.";
		if (line == 4)
			menuText.text = "SCAN to examine objects that are laying around.";
		if (line == 5)
			menuText.text = "And CUT to..erm..cut certain things with.";
		if (line == 6)
			menuText.text = 'Did you really need to read that?';
		if (line == 7)
			menuText.text = '-sigh- You really are an idiot.'
		if (line > 7)
		{
			menuText.text = ' ';
			dialogue = false;
			scanSuccessful = false;
			timer = 0;
			line = 0;
			scanEffect.body.x = -250;
		}		
	}
}

function treeFlavor()
{
	dialogue = true;
	scanSuccessful = true;
	if (dialogue)
	{
		if(line == 0 && treesScanned == 0 && dialogueBox.y <= game.height - 170)
			menuText.text = 'This is a tree.';
		if(line == 0 && treesScanned == 1 && dialogueBox.y <= game.height - 170)
			menuText.text = "This is still a tree.";
		if(line == 0 && treesScanned == 2 && dialogueBox.y <= game.height - 170)
			menuText.text = "Yet another tree.";
		if(line == 0 && treesScanned == 3 && dialogueBox.y <= game.height - 170)
			menuText.text = "Tree.";
		if(line == 0 && treesScanned == 4 && dialogueBox.y <= game.height - 170)
			menuText.text = "Aren't you getting bored at all?";
		if(line == 0 && treesScanned == 5 && dialogueBox.y <= game.height - 170)
			menuText.text = "What's so great about scanning trees?";
		if(line == 0 && treesScanned == 6 && dialogueBox.y <= game.height - 170)
			menuText.text = "This is your seventh tree. Congrats.";
		if(line == 0 && treesScanned == 7 && dialogueBox.y <= game.height - 170)
			menuText.text = "What are you expecting? An achievement?";
		if(line == 0 && treesScanned == 8 && dialogueBox.y <= game.height - 170)
			menuText.text = "You're just wasting both of our time.";
		if(line == 0 && treesScanned == 9 && dialogueBox.y <= game.height - 170)
			menuText.text = "It's a tree. MOVE ON.";
		if(line == 0 && treesScanned == 10 && dialogueBox.y <= game.height - 170)
			menuText.text = "Don't you dare scan another one! You better not!";
		if(line == 0 && treesScanned == 11 && dialogueBox.y <= game.height - 170)
			menuText.text = "Damn this stupid happy scan success sound!!";
		if(line == 0 && treesScanned == 12 && dialogueBox.y <= game.height - 170)
			menuText.text = "Why can't I make any other sounds!!!!";
		if(line == 0 && treesScanned > 12 && dialogueBox.y <= game.height - 170)
			menuText.text = "I hate you."
		if (line > 0)
		{
			menuText.text = ' ';
			dialogue = false;
			line = 0;
			scanSuccessful = false;
			timer = 0;
			treesScanned += 1;
			scanEffect.body.x = -250;
		}		
	}
}

function stumpFlavor()
{
	dialogue = true;
	scanSuccessful = true;
	if (dialogue)
	{
		if(line == 0 && stumpsScanned == 0 && dialogueBox.y <= game.height - 170)
			menuText.text = 'This is a stump.';
		if(line == 0 && stumpsScanned == 1)
			menuText.text = "This is still a stump.";
		if(line == 0 && stumpsScanned == 2)
			menuText.text = "Yet another stum- OH NO! WE'RE NOT DOING THIS!";
		if(line == 0 && stumpsScanned > 2)
			menuText.text = "Stump. There was once a tree here. End of story.";
		if (line > 0)
		{
			menuText.text = ' ';
			dialogue = false;
			line = 0;
			scanSuccessful = false;
			timer = 0;
			stumpsScanned += 1;
			scanEffect.body.x = -250;
		}		
	}
}

function riverFlavor()
{
	dialogue = true;
	scanSuccessful = true;
	if (!bridgeBuilt)
	{
		if(line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = 'A river with a deadly looking current,';
		}
		if(line == 1)
			menuText.text = "and to add insult to injury, it also appears that flesh eating piranha \nlive in this water...";
		if(line == 2)
			menuText.text = "You'd have to be an absolute idiot to jump into there...";
		if(line == 3)
			menuText.text = "Heh...";
		if(line == 4)
			menuText.text = "...";
		if(line == 5)
			menuText.text = "Please don't jump in there.";
		if (line > 5)
		{
			menuText.text = ' ';
			dialogue = false;
			scanSuccessful = false;
			timer = 0;
			line = 0;
			scanEffect.body.x = -250;
		}		
	}
	else
	{
		if(line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = 'A river with a deadly looking current.';
		}
		if(line == 1)
			menuText.text = "Good thing you built that bridge to get across.";
		if(line == 2)
			menuText.text = "...";
		if(line == 3)
			menuText.text = "......";
		if(line == 4)
			menuText.text = "Use the bridge, please.";
		if (line > 4)
		{
			menuText.text = ' ';
			dialogue = false;
			scanSuccessful = false;
			timer = 0;
			line = 0;
			scanEffect.body.x = -250;
		}		
	}
}

function bridgeFlavor()
{
	dialogue = true;
	scanSuccessful = true;
	if (!bridgeBuilt)
	{
		if(line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = 'The river looks pretty deadly..';
		}
		if(line == 1)
			menuText.text = "Carnivorous fish will strip the flesh right off your bones..";
		if(line == 2)
			menuText.text = "And if that doesn't kill you, you'll probably drown.";
		if(line == 3)
			menuText.text = "Looks like there once was a bridge here...";
		if(line == 4)
			menuText.text = "You could probably make a new one using stuff that's just \nlaying around...";
		if(line == 5)
			menuText.text = "Wood. I think that five pieces should suffice.";
		if (line > 5)
		{
			menuText.text = ' ';
			dialogue = false;
			scanSuccessful = false;
			timer = 0;
			line = 0;
			scanEffect.body.x = -250;
		}		
	}
	else
	{
		if(line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = 'This is a bridge.';
		}
		if(line == 1)
			menuText.text = "I'd say you did a good job, but you didn't.";
		if(line == 2)
			menuText.text = "I mean it looks so out of place...";
		if(line == 3)
			menuText.text = "The wood isn't even the same color!";
		if(line == 4)
			menuText.text = "Just keep moving so I don't have to look at it anymore.";
		if (line > 4)
		{
			menuText.text = ' ';
			dialogue = false;
			scanSuccessful = false;
			timer = 0;
			line = 0;
			scanEffect.body.x = -250;
		}		
	}
}

function bondCrystalFlavor()
{
	dialogue = true;
	scanSuccessful = true;
	if (tools < 3)
	{
		if(line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = 'Oh? What might this be? Some kind of crystal?';
		}
		if(line == 1)
		{
			menuText.text = "What the-?!";
			//play resonating sound
			crystalScale.start();
			crystalAlpha.start();
			resonate.play('', 0, 1, true);
		}
		if(line == 2)
			menuText.text = "It feels like something within me is resonating with this crystal...";
		if(line == 3)
			menuText.text = "What is this?";
		if(line == 4)
		{
			menuText.text = "Why does this feel so familiar?";
		}
		if(line == 5)
		{
			menuText.text = "DOWNLOADING....";
			if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER))
				download.play('', 0, 1, false);
		}
		if(line == 6)
		{
			menuText.text = "DOWNLOADING.......";
			if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER))
				download.play('', 0, 1, false);
		}
		if(line == 7)
		{
			menuText.text = "DOWNLOAD COMPLETE";
			if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER))
				download.play('', 0, 1, false);
		}
		if(line == 8)
		{
			menuText.text = "NEW FUNCTION HAS BEEN INSTALLED";
			if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER))
				newFunction.play('', 0, 1, false);
			//stop resonating sound
			//electronic chime
			crystalScale.stop();
			crystalAlpha.stop();
			resonate.stop();
			crystal.alpha = .9;
			crystal.scale.setTo(1);
			toolUI.tint = 0xFFFFFF;
		}
		if(line == 9)
			menuText.text = "MOLECULAR BONDING OBTAINED";
		if(line == 10)
			menuText.text = "WHOA! Molecular bonding, huh?";
		if(line == 11)
			menuText.text = "I guess I'll read the instructions for you, since, you know.";
		if(line == 12)
			menuText.text = "You won't read them yourself anyway.";
		if(line == 13)
			menuText.text = "Just simply have the function selected and point the tool in the \ndirection of where something needs to be synthesized.";
		if(line == 14)
			menuText.text = "Hold down SPACE to begin the bonding process.";
		if(line == 15)
			menuText.text = "WARNINGS: (These are for you.)";
		if(line == 16)
			menuText.text = "As a wise man once said, matter cannot be created nor destroyed.";
		if(line == 17)
			menuText.text = "Same rules apply here. You have to have enough stuff in order to \nmake other stuff.";
		if(line == 18)
			menuText.text = "In other words, it's like crafting. You need to have enough of \nthe necessary items to build something.";
		if (line == 19)
			menuText.text = "Now go and get to it! Try it out!"			
		if (line > 19)
		{
			menuText.text = ' ';
			dialogue = false;
			scanSuccessful = false;
			timer = 0;
			line = 0;
			scanEffect.body.x = -250;
			tools = 3;
		}
	}
	else
	{
		if (line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = "This crystal gave me the ability to bond things together on a \nmolecular level.";
		}
		if (line == 1)
			menuText.text = "I can detect vibrations coming from the crystal..";
		if (line == 2)
			menuText.text = "It seems as if it's resounding.";
		if (line == 3)
			menuText.text = "I tell you these things because I'm afraid you're too stupid \nto feel.";
		if (line > 3)
		{
			menuText.text = ' ';
			dialogue = false;
			scanSuccessful = false;
			timer = 0;
			line = 0;
			scanEffect.body.x = -250;
		}

	}
}

function hutFlavor()
{
	dialogue = true;
	scanSuccessful = true;
	if (dialogue)
	{
		if(line == 0 && hutsScanned == 0 && dialogueBox.y <= game.height - 170)
			menuText.text = 'This is a hut. Made for dwarves.';
		if(line == 0 && hutsScanned == 1)
			menuText.text = "You can't enter this hut. It's too small.";
		if(line == 0 && hutsScanned == 2)
			menuText.text = "Do you think you can just shrink down to enter this hut?";
		if(line == 0 && hutsScanned > 2)
			menuText.text = "My dude, you are TOO big to enter this hut.";
		if (line > 0)
		{
			menuText.text = ' ';
			dialogue = false;
			line = 0;
			hutsScanned += 1;
			scanSuccessful = false;
			timer = 0;
			scanEffect.body.x = -250;
		}		
	}

}

function houseFlavor()
{
	dialogue = true;
	scanSuccessful=true;
	if (!barrierBroken)
	{
		if (line == 0 && dialogueBox.y <= game.height - 170)
			menuText.text = "This the only building that actually resembles a house for people.";
		if (line == 1)
			menuText.text = "Unlike the huts, I think you're JUUUST slim enough to enter this.";
		if (line == 2)
			menuText.text = "HOWEVER....someone could be inside...";
		if (line == 3)
			menuText.text = "The only thing stopping us is that wooden barrier. You know what \nto do with wooden stuff...";
		if (line == 4)
			menuText.text = "Otherwise, how did you get this far?";
		if (line == 5)
			menuText.text = "Anyway this seems a bit more recent than the other buildings.... \nI wonder why it seems so much more...alive?"
		if (line == 6)
			menuText.text = "Well...If you CUT it accidentally *wink* then it shouldn't be \na problem.";
		if (line == 7)
			menuText.text = "Yeah that's right. I can wink."
		if (line > 7){

			menuText.text = ' ';
			dialogue = false;
			line = 0;
			scanSuccessful = false;
			timer = 0;
			scanEffect.body.x = -250;
		}		
	}
	else
	{
		if (line == 0 && dialogueBox.y <= game.height - 170)
			menuText.text = "This the only building that actually resembles a house for people.";
		if (line == 1)
			menuText.text = "Unlike the huts, I think you're JUUUST slim enough to enter this.";
		if (line == 2)
			menuText.text = "But it would be considered trespassing...";
		if (line == 3)
			menuText.text = "But you don't care do you. I know I don't. ";
		if (line == 4)
			menuText.text = "Plus you've already blown up the door..";
		if (line == 5)
			menuText.text = "No use turning back now, right?"
		if (line > 5){

			menuText.text = ' ';
			dialogue = false;
			line = 0;
			scanSuccessful = false;
			timer = 0;
			scanEffect.body.x = -250;
		}

	}
}