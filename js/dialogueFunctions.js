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
			menuText.text = "Press SHIFT to view the inventory.";
		if (line == 7)
			menuText.text = 'Did you really need to read that?';
		if (line == 8)
			menuText.text = '-sigh- You really are an idiot.'
		if (line > 8)
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

function note1Flavor()
{
	dialogue = true;
	scanSuccessful = true;
	if (dialogue)
	{
		if(line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = 'The catastrophe began when I created my final invention.';
		}
		if (line == 1)
			menuText.text = 'I searched high and low for a powerful energy source to fuel it.';
		if (line == 2)
			menuText.text = 'I tried everything I could find on this island.';
		if (line == 3)
			menuText.text = "From the trees to the wind to the water currents...";
		if (line == 4)
			menuText.text = "But nothing generated the power that I needed.";
		if (line == 5)
			menuText.text = "I took a step back and watched nature for a while.";
		if (line == 6)
			menuText.text = 'It always bewildered me how quickly everything grew back\non this island...';
		if (line > 6)
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

function note2Flavor()
{
	dialogue = true;
	scanSuccessful = true;
	if (dialogue)
	{
		if(line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = 'I was born and raised on this island. I never really had much \ninterest in leaving.';
		}
		if (line == 1)
			menuText.text = 'However, I needed to find a more powerful energy source.';
		if (line == 2)
			menuText.text = 'It was then that I made up my mind that I had no other choice but \nto search elsewhere.';
		if (line == 3)
			menuText.text = "I set out with provisions after building my ship to find the nearest \nneighboring isle.";
		if (line == 4)
			menuText.text = "It took me 2 months of sailing to even get there, but none of it had \nbeen worth it.";
		if (line == 5)
			menuText.text = "I found different trees and rocks but nothing particularly \ninteresting.";
		if (line == 6)
			menuText.text = 'The strange thing I found, however, was that nothing grew back \nas fast as it did on MY island.';
		if (line == 7)
			menuText.text = 'It was then when I realized the greatest energy source had been \nright under my nose the whole time.'
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

function note3Flavor()
{
	dialogue = true;
	scanSuccessful = true;
	if (dialogue)
	{
		if(line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = 'I could not find the crystals native to my island anywhere else.';
		}
		if (line == 1)
			menuText.text = 'I conducted so many expeditions to harvest and control the power \nof the crystals.';
		if (line == 2)
			menuText.text = 'I started drawing up plans to build a lab composed entirely \nout of crystal.';
		if (line == 3)
			menuText.text = "It was a good several years before my dream lab was completed.";
		if (line == 4)
			menuText.text = "But now I would finally be able to work on my final invention \nafter all my years of grueling research.";
		if (line == 5)
			menuText.text = "I would create the first tool that would be able to alter the \nproperties of matter.";
		if (line == 6)
			menuText.text = 'With this tool, I would be able to refabricate the world to my liking.';
		if (line == 7)
			menuText.text = 'The elder of the island figured out what I was up to and tried to \nput a stop to my creation.'
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

function note4Flavor()
{
	dialogue = true;
	scanSuccessful = true;
	if (dialogue)
	{
		if(line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = 'It was too late though. By the time they confronted me, I had \nalready put the finishing touches on my invention.';
		}
		if (line == 1)
			menuText.text = 'The people of the town were dying out at a rapid rate.';
		if (line == 2)
			menuText.text = 'Children were growing with genetic mutations and the remainder\nof the population was shrinking.';
		if (line == 3)
			menuText.text = "Nobody could seem to figure it out. It was more important now \nthan ever that I finish my invention.";
		if (line == 4)
			menuText.text = "Strange enough, I wasn't affected in the slightest. I almost \nnever left the lab.";
		if (line == 5)
			menuText.text = "Before I left, there were only a few people on the island \nstill alive.";
		if (line == 6)
			menuText.text = 'They coveted my inventions and planned to ambush and murder me.';
		if (line == 7)
			menuText.text = 'Before they could act, however, I made a hasty escape to the \nsea with my invention. It was too late to save them.'
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



function puzzleFlavor()
{
	dialogue = true;
	scanSuccessful = true;
	if (dialogue)
	{
		if(line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = 'Seems like a triangle with three different colored shapes.';
		}
		if (line == 1)
			menuText.text = 'It should be helpful to remember it for later.';
		if (line == 2)
			menuText.text = 'One of the few artifacts of history from this ancient civilization.';
		if (line == 3)
			menuText.text = "Ancient in terms of... I can't detect any humans that\n recently lived here.";

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
			menuText.text = "The planks aren't even a consistent size!";
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
			menuText.text = "But you don't care, do you? I know I don't. ";
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

function crystal1Flavor()
{
	dialogue = true;
	scanSuccessful = true;
	if(!scannedCrystal1)
	{
		if(line == 0 && dialogueBox.y <= game.height - 170)
			menuText.text = "Another crystal fragment... This one emits a purple light..";
		if(line == 1)
		{
			menuText.text = "Ugh...";
			//play resonating sound
			crystal1Alpha.start();
			resonate.play('', 0, 1, true);
		}
		if(line == 2)
			menuText.text = "Here we go again...This better be worth it.";
		if(line == 3)
			menuText.text = "I better grow wings or something super badass like that...";
		if(line == 4)
		{
			menuText.text = "It's almost like the crystal is alive...";
		}
		if(line == 5)
		{
			menuText.text = "BLAH BLAH BLAH Glowing crystals BLAH BLAH.";
			if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER))
				download.play('', 0, 1, false);
		}
		if(line == 6)
		{
			menuText.text = "BLAH BLAH BLAH Safe to be around? BLABBITY BLABBITY BLAH!";
			if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER))
				download.play('', 0, 1, false);
		}
		if (line == 7)
		{
			menuText.text = "BLUBLE BLURBLE Probably not. BLAH."
			//stop resonating sound
			//electronic chime
			crystal1Alpha.stop();
			resonate.stop();
			crystal1.alpha = .9;
		}
		if(line == 8)
		{
			menuText.text = "BLAH BLAH Radioactive? Maybe. Like I care.";
			if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER))
				newFunction.play('', 0, 1, false);
		}
		if (line == 9)
			menuText.text = "Wait. Is it over?";
		if (line == 10)
			menuText.text = "What?! I don't feel any different!!!!";
		if (line == 11)
			menuText.text = "This sucks...What a disappointment..";
		if (line == 12)
			menuText.text = "Just cut the damn crystal already...";

		if (line > 12)
		{
			menuText.text = ' ';
			dialogue = false;
			scanSuccessful = false;
			timer = 0;
			line = 0;
			scanEffect.body.x = -250;
			scannedCrystal1 = true;
		}
	}
	else
	{
		if(line == 0 && dialogueBox.y <= game.height - 170)
			menuText.text = "A crystal.";
		if(line == 1)
			menuText.text = "I didn't get anything from it.";
		if(line == 2)
			menuText.text = "It's stupid, purple, useless, and stupid.";
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

function crystal2Flavor()
{
	dialogue = true;
	scanSuccessful = true;
	if (!updatedCutTool)
	{
		if(line == 0 && dialogueBox.y <= game.height - 170)
			menuText.text = "Another crystal. This one glows with a reddish light..";
		if(line == 1)
		{
			menuText.text = "Oh?!";
			//play resonating sound
			crystal2Alpha.start();
			resonate.play('', 0, 1, true);
		}
		if(line == 2)
			menuText.text = "It's that feeling again!! Oh! IT FEELS DIFFERENT!";
		if(line == 3)
			menuText.text = "I'm...getting kinda dizzy...";
		if(line == 4)
		{
			menuText.text = "If I had a mouth, I'd be vomitting...";
		}
		if(line == 5)
		{
			menuText.text = "DOWNLOADING....";
			if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER))
				download.play('', 0, 1, false);
		}
		if(line == 6)
		{
			menuText.text = "INSTALLING UPDATES....PLEASE WAIT...";
			if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER))
				download.play('', 0, 1, false);
		}
		if(line == 7)
		{
			menuText.text = "UPDATE COMPLETE";
			if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER))
				download.play('', 0, 1, false);
		}
		if(line == 8)
		{
			menuText.text = "VIEWING VERSION CHANGES...";
			if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER))
				newFunction.play('', 0, 1, false);
			//stop resonating sound
			//electronic chime
			crystal2Alpha.stop();
			resonate.stop();
			crystal2.alpha = .9;

		}
		if(line == 9)
			menuText.text = "CUT 2.0";
		if(line == 10)
			menuText.text = "With the new updated CUT 2.0, now YOU can cut through EVEN \nMORE STUFFFFFFFFFFFF!!!!!!!";
		if(line == 11)
			menuText.text = "Users complained how the old and totally lame CUT could only \ncut wooden stuff...";
		if(line == 12)
			menuText.text = "SUPER LAAAAAAAAME!!!!!";
		if(line == 13)
			menuText.text = "But now with CUT 2.0, you can cut through even the hardest \nmaterials with the greatest of ease.";
		if(line == 14)
			menuText.text = "WARNING: Handitool Inc. All Rights Reserved is not held \naccountable for any dismemberment or distress caused by \nconsumer use.";
		if(line == 15)
			menuText.text = "Parental Lock features are available for tool handlers under the \nage of 64.";
		if(line == 16)
			menuText.text = "WHOA! What was that?!";
		if(line == 17)
			menuText.text = "I have no clue what just came over me...";		
		if (line > 17)
		{
			menuText.text = ' ';
			dialogue = false;
			scanSuccessful = false;
			timer = 0;
			line = 0;
			scanEffect.body.x = -250;
			updatedCutTool = true;
		}
	}
	else
	{
		if (line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = "I don't know what just happened, but I am not doing that again.";
		}
		if (line == 1)
			menuText.text = "I feel different though.";
		if (line == 2)
			menuText.text = "I have a sneaking suspicion that something was updated...";
		if (line == 3)
			menuText.text = "It's as if these crystals are IMPORTANT or something...";
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

function crystal3Signal()
{
	dialogue = true;
	scanSuccessful = true;
	if (dialogue)
	{
		if (line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = 'Oh?';
		}
		if (line == 1)
			menuText.text = "I'm detecting an odd energy spike to the west.";
		if (line == 2)
			menuText.text = "I think it's coming from the forested area.";
		if (line == 3)
			menuText.text = "Might wanna go check that out..";
		if (line == 4)
			menuText.text = "Weird energy readings don't happen every day, you know~";
		if (line > 4)
		{
			menuText.text = ' ';
			dialogue = false;
			scanSuccessful = false;
			line = 0;
			tutorialDone = true;
			timer = 0;
		}
	}
}

function crystal3Flavor()
{
	dialogue = true;
	scanSuccessful = true;
	if(!scannedCrystal3)
	{
		if(line == 0 && dialogueBox.y <= game.height - 170)
		{
			menuText.text = "This must be the source of that weird energy spike. Hm..green. \nCool color.";
			resonate.stop();
		}
		if(line == 1)
		{
			menuText.text = "Well what are we waiting for? Let's get this over with.";
			crystal3Alpha.start();
			resonate.play('', 0, 1, true);
		}
		if(line == 2)
		{
			menuText.text = "DOWNLOADING....";
			if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER))
				download.play('', 0, 1, false);
		}
		if(line == 3)
		{
			menuText.text = "Everything makes sense now.";
			if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER))
				newFunction.play('', 0, 1, false);
		}
		if(line == 3)
		{
			menuText.text = "I think those pages in the lab came from a journal YOU wrote... \nI am YOUR final invention.";
			crystal3Alpha.stop();
			resonate.stop();
			crystal3.alpha = .9
		}
		if(line == 4)
		{
			menuText.text = "I hate to break this to you... but I know why the entire island \ndied out.";
			if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER))
				revelation.play('', 0, 1, true);
		}
		if(line == 5)
			menuText.text = "The crystals on this island provide the life energy to all of the \nisland's inhabitants.";
		if(line == 6)
			menuText.text = "By harvesting the energy of the crystals, you were drained the life \nenergy of everything here and caused it to wither away.";
		if(line == 7)
			menuText.text = "That led to genetic alterations in everything that relied on the \ncrystals' power for life.";
		if(line == 8)
			menuText.text = "And you were unaffected because your crystal lab constantly \nirradiated you with life energy.";
		if(line == 9)
		{
			menuText.text = "All that trouble just to build me. I'm not sure whether to \nbe grateful or disgusted.";
			revelation.stop();
		}
		if(line == 10)
		{
			menuText.text = "Disgust is probably more like it, especially with the personality \nyou originally programmed for me. UGH...";
			if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER))
				autumnVoyage.play('', 0, 1, true);
		}
		if(line == 11)
			menuText.text = "MASTER this. MASTER that. What kind of things were you into? I'm \nglad you were stupid enough to step on me.";
		if (line > 11)
		{
			menuText.text = ' ';
			dialogue = false;
			scanSuccessful = false;
			timer = 0;
			line = 0;
			scanEffect.body.x = -250;
			scannedCrystal3 = true;
		}
	}
	else
	{
		if(line == 0 && dialogueBox.y <= game.height - 170)
			menuText.text = "I think this is everything we need.";
		if (line == 1)
			menuText.text = "Let's grab it and get going.";
		if(line == 2)
		{
			menuText.text = "Finally...I can get some peace of mind. \nNot that I had one in the first place.";
		}
		
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






function labFlavor()
{
	dialogue = true;
	scanSuccessful=true;
	if (!labOpen)
	{
		if (line == 0 && dialogueBox.y <= game.height - 170)
			menuText.text = "I think this is supposed to be some kind of lab...";
		if (line == 1)
			menuText.text = "But it's weird-looking for a laboratory...";
		if (line == 2)
			menuText.text = "Who the hell builds a laboratory out of crystal?!";
		if (line == 3)
			menuText.text = "HOW do you even do that?!!";
		if (line == 4)
			menuText.text = "I admire the craftsmanship though. This is a work of art.";
		if (line == 5)
			menuText.text = "If only we could get INSIDE..."
		if (line == 6)
			menuText.text = "These crystals are blocking the entrance.";
		if (line == 7)
			menuText.text = "No ordinary laser will be able to cut through it...";
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
			menuText.text = "Some kind of laboratory that doubles as a contemporary art piece...";
		if (line == 1)
			menuText.text = "Architects are just FULL of ideas nowadays.";
		if (line == 2)
			menuText.text = "Now that you've shattered the crystals blocking the path, \nwe can enter!";
		if (line == 3)
			menuText.text = "Onward and outward!! ";
		if (line == 4)
			menuText.text = "Uh...inward in this case...";
		if (line == 5)
			menuText.text = "Just go inside."
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

function caveFlavor()
{
	dialogue = true;
	scanSuccessful=true;
	if (!caveOpen)
	{
		if (line == 0 && dialogueBox.y <= game.height - 170)
			menuText.text = "I believe this is some kind of cave...";
		if (line == 1)
			menuText.text = "Hm..It's as if a giant crystal burrowed its way out of the ground..";
		if (line == 2)
			menuText.text = "Amazing....";
		if (line == 3)
			menuText.text = "Truly a marvel of nature...";
		if (line == 4)
			menuText.text = "So beautiful...";
		if (line == 5)
			menuText.text = "I-I mean...."
		if (line == 6)
			menuText.text = "These crystals are sealing off the way in.";
		if (line == 7)
			menuText.text = "No ordinary laser will be able to cut through it...";
		if (line == 8)
			menuText.text = "Luckily I am no ordinary tool. <.<";
		if (line > 8)
		{

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
			menuText.text = "A natural wonder of the world...";
		if (line == 1)
			menuText.text = "That we just tampered with and destroyed...";
		if (line == 2)
			menuText.text = "I mean we can enter, but...";
		if (line == 3)
			menuText.text = "At what cost?";
		if (line == 4)
			menuText.text = "Do you feel guilty in the slightest?";
		if (line == 5)
			menuText.text = "Oh wait I forgot. You can't feel."
		if (line > 5)
		{
			menuText.text = ' ';
			dialogue = false;
			line = 0;
			scanSuccessful = false;
			timer = 0;
			scanEffect.body.x = -250;
		}

	}
}