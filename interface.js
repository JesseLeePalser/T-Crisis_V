/*
Copyright 2024 By Team: "JesseLeePalser.itch.io"

Permission is hereby granted, free of charge, to any person obtaining a copy of this software
and associated documentation files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// "interface.js"...

//--------------------------------------------------------------------------------------------------------------
function CreateGUIArrowSet(index, x, y)
{
    InterfaceClassObject.GUIArrowSets[InterfaceClassObject.NumberOfOnscreenArrowSets] = index;

    InterfaceClassObject.GUIArrowSetScreenX[InterfaceClassObject.NumberOfOnscreenArrowSets] = x;
    InterfaceClassObject.GUIArrowSetScreenY[InterfaceClassObject.NumberOfOnscreenArrowSets] = y;

    InterfaceClassObject.NumberOfOnscreenArrowSets++;

    InterfaceClassObject.ArrowSetThatWasSelected = 0;
    InterfaceClassObject.ArrowSetArrowSelected = -1;
    InterfaceClassObject.ArrowSetSelectedAnimationTimer = -1;
}

//--------------------------------------------------------------------------------------------------------------
function DrawAllGUIArrowSetImages()
{
    let scaleOne = 1;
    let scaleTwo = 1;

    InitializeClassObject.ctx.save();

    for (let index = 0; index < InterfaceClassObject.NumberOfOnscreenArrowSets; index++)
    {
        scaleOne = 1;
        scaleTwo = 1;

        let computedCenterX = InterfaceClassObject.GUISelectorLineSprite.width / 2 +.5;
        let computedCenterY = InterfaceClassObject.GUISelectorLineSprite.height / 2 + .5;

        let computedCenterXtwo = InterfaceClassObject.GUIArrowsSprites[0].width / 2 + .5;
        let computedCenterYtwo = InterfaceClassObject.GUIArrowsSprites[0].height / 2 + .5;

        let x = InterfaceClassObject.GUIArrowSetScreenX[index];
        let y = InterfaceClassObject.GUIArrowSetScreenY[index];

        y-=21;

        if (index === InterfaceClassObject.ArrowSetThatWasSelected && InterfaceClassObject.ArrowSetSelectedAnimationTimer > 5)
        {
            if (InterfaceClassObject.ArrowSetArrowSelected === InterfaceClassObject.ArrowSetThatWasSelected)  scaleOne = 0.8;
            else  scaleOne = 1;

            if (InterfaceClassObject.ArrowSetArrowSelected === InterfaceClassObject.ArrowSetThatWasSelected+0.5)  scaleTwo = 0.8;
            else  scaleTwo = 1;
        }

        InitializeClassObject.ctx.globalAlpha = 0.75;

        if (index === InterfaceClassObject.ArrowSetThatWasSelected)
        {
            InitializeClassObject.ctx.drawImage(  InterfaceClassObject.GUISelectorLineSprite, (x - ((computedCenterX)) ), (y - ((computedCenterY)) )
            , (InterfaceClassObject.GUISelectorLineSprite.width), (InterfaceClassObject.GUISelectorLineSprite.height)  );
        }

        InitializeClassObject.ctx.globalAlpha = 1;

        InitializeClassObject.ctx.drawImage(  InterfaceClassObject.GUIArrowsSprites[0], ((x - (computedCenterXtwo * scaleOne)) - 375), ((y - (computedCenterYtwo * scaleOne)))
        , (InterfaceClassObject.GUIArrowsSprites[0].width * scaleOne), (InterfaceClassObject.GUIArrowsSprites[0].height * scaleOne)  );

        InitializeClassObject.ctx.drawImage(  InterfaceClassObject.GUIArrowsSprites[1], ((x - (computedCenterXtwo * scaleTwo)) + 375), ((y - (computedCenterYtwo * scaleTwo)))
        , (InterfaceClassObject.GUIArrowsSprites[0].width * scaleTwo), (InterfaceClassObject.GUIArrowsSprites[0].height * scaleTwo)  );
    }

    InitializeClassObject.ctx.globalAlpha = 1;
    InitializeClassObject.ctx.restore();
}

//--------------------------------------------------------------------------------------------------------------
function ThisArrowSetArrowWasPressed(index)
{
let returnValue = false;
   
    if (InputClassObject.DelayAllUserInput === 0)
    {
	if (InputClassObject.JoystickDirection[Any] === InputClassObject.UP)
	{
	    if (InterfaceClassObject.ArrowSetThatWasSelected > 0)  InterfaceClassObject.ArrowSetThatWasSelected--;
	    else  InterfaceClassObject.ArrowSetThatWasSelected = (InterfaceClassObject.NumberOfOnscreenArrowSets-1);

	    ScreensClassObject.ScreenIsDirty = true;

	    PlaySoundEffect(1);
	    InputClassObject.DelayAllUserInput = 10;
	}
	else if (InputClassObject.JoystickDirection[Any] === InputClassObject.DOWN)
	{
	    if ( InterfaceClassObject.ArrowSetThatWasSelected < (InterfaceClassObject.NumberOfOnscreenArrowSets-1) )  InterfaceClassObject.ArrowSetThatWasSelected++;
	    else  InterfaceClassObject.ArrowSetThatWasSelected = 0;

	    ScreensClassObject.ScreenIsDirty = true;

	    PlaySoundEffect(1);
	    InputClassObject.DelayAllUserInput = 10;
	}

	if (InputClassObject.JoystickDirection[Any] === InputClassObject.LEFT && InterfaceClassObject.ArrowSetSelectedAnimationTimer === -1)
	{
        InterfaceClassObject.ArrowSetArrowSelected = InterfaceClassObject.ArrowSetThatWasSelected;
	    InterfaceClassObject.ArrowSetSelectedAnimationTimer = 10;

	    ScreensClassObject.ScreenIsDirty = true;

	    PlaySoundEffect(0);
	    InputClassObject.DelayAllUserInput = 10;
	}
	else if (InputClassObject.JoystickDirection[Any] === InputClassObject.RIGHT && InterfaceClassObject.ArrowSetSelectedAnimationTimer === -1)
	{
        InterfaceClassObject.ArrowSetArrowSelected = InterfaceClassObject.ArrowSetThatWasSelected+.5;
	    InterfaceClassObject.ArrowSetSelectedAnimationTimer = 10;

	    ScreensClassObject.ScreenIsDirty = true;

	    PlaySoundEffect(0);
	    InputClassObject.DelayAllUserInput = 10;
	}

	let x = InterfaceClassObject.GUIArrowSetScreenX[index];
	let y = InterfaceClassObject.GUIArrowSetScreenY[index];

	let arrowOneCenterX = (x - 375);
	let arrowOneCenterY = (y-23);
	let arrowTwoCenterX = (x + 375);
	let arrowTwoCenterY = (y-23);

	if (InputClassObject.MouseButtonClicked === true && InterfaceClassObject.ArrowSetSelectedAnimationTimer === -1)
	{
	    if ( InputClassObject.MouseTouchX > (arrowOneCenterX - (46/2)) && InputClassObject.MouseTouchX < (arrowOneCenterX + (46/2))
	    && InputClassObject.MouseTouchY > (arrowOneCenterY - (38/2)) && InputClassObject.MouseTouchY < (arrowOneCenterY + (38/2)) )
	    {
            InterfaceClassObject.ArrowSetThatWasSelected = Math.floor(index);
            InterfaceClassObject.ArrowSetArrowSelected = InterfaceClassObject.ArrowSetThatWasSelected;
            InterfaceClassObject.ArrowSetSelectedAnimationTimer = 10;

            PlaySoundEffect(0);

            ScreensClassObject.ScreenIsDirty = true;
            InputClassObject.DelayAllUserInput = 10;
            }
            else if ( InputClassObject.MouseTouchX > (arrowTwoCenterX - (46/2)) && InputClassObject.MouseTouchX < (arrowTwoCenterX + (46/2))
            && InputClassObject.MouseTouchY > (arrowTwoCenterY - (38/2)) && InputClassObject.MouseTouchY < (arrowTwoCenterY + (38/2)) )
            {
            InterfaceClassObject.ArrowSetThatWasSelected = Math.floor(index);
                InterfaceClassObject.ArrowSetArrowSelected = InterfaceClassObject.ArrowSetThatWasSelected+.5;
            InterfaceClassObject.ArrowSetSelectedAnimationTimer = 10;

            PlaySoundEffect(0);

            ScreensClassObject.ScreenIsDirty = true;
            InputClassObject.DelayAllUserInput = 10;
            }
        }
    }
	
    if (InterfaceClassObject.ArrowSetSelectedAnimationTimer > 0 && index === InterfaceClassObject.ArrowSetArrowSelected)  InterfaceClassObject.ArrowSetSelectedAnimationTimer--;
    else if (InterfaceClassObject.ArrowSetSelectedAnimationTimer === 0 && index === InterfaceClassObject.ArrowSetArrowSelected)
    {
        InterfaceClassObject.ArrowSetSelectedAnimationTimer = -1;
        returnValue = true;
        ScreensClassObject.ScreenIsDirty = true;
    }

    return(returnValue);
}

//--------------------------------------------------------------------------------------------------------------
function DestroyAllGUIArrowSets()
{
    for (let index = 0; index < InterfaceClassObject.NumberOfOnscreenArrowSets; index++)
    {
        InterfaceClassObject.GUIArrowSets[index] = -1;

        InterfaceClassObject.GUIArrowSetScreenX[index] = -9999;
        InterfaceClassObject.GUIArrowSetScreenY[index] = -9999;
    }

    InterfaceClassObject.NumberOfOnscreenArrowSets = 0;

    InterfaceClassObject.ArrowSetThatWasSelected = 0;
    InterfaceClassObject.ArrowSetArrowSelected = -1;
    InterfaceClassObject.ArrowSetSelectedAnimationTimer = -1;
}

//--------------------------------------------------------------------------------------------------------------
function CreateGUIButtonsWithText()
{
    let text;

    for (let index = 0; index < 7; index++)
    {
        InterfaceClassObject.ButtonsWithTextCanvases[index] = document.createElement("canvas");
        InterfaceClassObject.ButtonsWithTextCanvases[index].width = "251";
        InterfaceClassObject.ButtonsWithTextCanvases[index].height = "40";
        InterfaceClassObject.ctxButtonsWithTextCanvases[index] = InterfaceClassObject.ButtonsWithTextCanvases[index].getContext('2d');
    }

    for (let indexTwo = 0; indexTwo < 7; indexTwo++)
    {
        if (indexTwo === 0)  text = "START!";
        else if (indexTwo === 1)  text = "Options";
        else if (indexTwo === 2)  text = "How To Play";
        else if (indexTwo === 3)  text = "High Scores";
        else if (indexTwo === 4)  text = "About";
        else if (indexTwo === 5)  text = "Exit";
        else if (indexTwo === 6)  text = "Back";

        InterfaceClassObject.ctxButtonsWithTextCanvases[indexTwo].clearRect(0, 0, 251, 40);

        InterfaceClassObject.ctxButtonsWithTextCanvases[indexTwo].drawImage(InterfaceClassObject.OriginalButtonSprite, 0, 0, 251, 40);

        InterfaceClassObject.ctxButtonsWithTextCanvases[indexTwo].font = "25px HighlandGothicFLF";
        InterfaceClassObject.ctxButtonsWithTextCanvases[indexTwo].textAlign = "center";

        InterfaceClassObject.ctxButtonsWithTextCanvases[indexTwo].fillStyle = "rgba(200, 200, 200, 1)";
        for (let yOffSet = -1; yOffSet < 2; yOffSet+=2)
        {
            for (let xOffSet = -1; xOffSet < 2; xOffSet+=2)
            {
                InterfaceClassObject.ctxButtonsWithTextCanvases[indexTwo].fillText(text, 125+xOffSet, 29+yOffSet);
            }
        }

        InterfaceClassObject.ctxButtonsWithTextCanvases[indexTwo].fillStyle = "rgba(0, 0, 0, 1)";
        InterfaceClassObject.ctxButtonsWithTextCanvases[indexTwo].fillText(text, 125, 29);
    }

    for (let indexThree = 0; indexThree < 67; indexThree++)
    {
        InterfaceClassObject.ButtonsWithCharsCanvases[indexThree] = document.createElement("canvas");
        InterfaceClassObject.ButtonsWithCharsCanvases[indexThree].width = "56";
        InterfaceClassObject.ButtonsWithCharsCanvases[indexThree].height = "43";
        InterfaceClassObject.ctxButtonsWithCharsCanvases[indexThree] = InterfaceClassObject.ButtonsWithCharsCanvases[indexThree].getContext('2d');

        VisualsClassObject.ImageSprites[indexThree+100] = document.createElement("canvas");
        VisualsClassObject.ImageSprites[indexThree+100].width = "56";
        VisualsClassObject.ImageSprites[indexThree+100].height = "43";
    }

    for (let indexFour = 1; indexFour < 67; indexFour++)
    {
        if      (indexFour ===  1)  text = "A";
        else if (indexFour ===  2)  text = "B";
        else if (indexFour ===  3)  text = "C";
        else if (indexFour ===  4)  text = "D";
        else if (indexFour ===  5)  text = "E";
        else if (indexFour ===  6)  text = "F";
        else if (indexFour ===  7)  text = "G";
        else if (indexFour ===  8)  text = "H";
        else if (indexFour ===  9)  text = "I";
        else if (indexFour === 10)  text = "J";
        else if (indexFour === 11)  text = "K";
        else if (indexFour === 12)  text = "L";
        else if (indexFour === 13)  text = "M";
        else if (indexFour === 14)  text = "N";
        else if (indexFour === 15)  text = "O";
        else if (indexFour === 16)  text = "P";
        else if (indexFour === 17)  text = "Q";
        else if (indexFour === 18)  text = "R";
        else if (indexFour === 19)  text = "S";
        else if (indexFour === 20)  text = "T";
        else if (indexFour === 21)  text = "U";
        else if (indexFour === 22)  text = "V";
        else if (indexFour === 23)  text = "W";
        else if (indexFour === 24)  text = "X";
        else if (indexFour === 25)  text = "Y";
        else if (indexFour === 26)  text = "Z";
        else if (indexFour === 27)  text = "a";
        else if (indexFour === 28)  text = "b";
        else if (indexFour === 29)  text = "c";
        else if (indexFour === 30)  text = "d";
        else if (indexFour === 31)  text = "e";
        else if (indexFour === 32)  text = "f";
        else if (indexFour === 33)  text = "g";
        else if (indexFour === 34)  text = "h";
        else if (indexFour === 35)  text = "i";
        else if (indexFour === 36)  text = "j";
        else if (indexFour === 37)  text = "k";
        else if (indexFour === 38)  text = "l";
        else if (indexFour === 39)  text = "m";
        else if (indexFour === 40)  text = "n";
        else if (indexFour === 41)  text = "o";
        else if (indexFour === 42)  text = "p";
        else if (indexFour === 43)  text = "q";
        else if (indexFour === 44)  text = "r";
        else if (indexFour === 45)  text = "s";
        else if (indexFour === 46)  text = "t";
        else if (indexFour === 47)  text = "u";
        else if (indexFour === 48)  text = "v";
        else if (indexFour === 49)  text = "w";
        else if (indexFour === 50)  text = "x";
        else if (indexFour === 51)  text = "y";
        else if (indexFour === 52)  text = "z";
        else if (indexFour === 53)  text = "0";
        else if (indexFour === 54)  text = "1";
        else if (indexFour === 55)  text = "2";
        else if (indexFour === 56)  text = "3";
        else if (indexFour === 57)  text = "4";
        else if (indexFour === 58)  text = "5";
        else if (indexFour === 59)  text = "6";
        else if (indexFour === 60)  text = "7";
        else if (indexFour === 61)  text = "8";
        else if (indexFour === 62)  text = "9";
        else if (indexFour === 63)  text = "+";
        else if (indexFour === 64)  text = "_";
        else if (indexFour === 65)  text = "<";
        else if (indexFour === 66)  text = "End";

        InterfaceClassObject.ctxButtonsWithCharsCanvases[indexFour].clearRect(0, 0, 251, 40);

        InterfaceClassObject.ctxButtonsWithCharsCanvases[indexFour].drawImage(VisualsClassObject.ImageSprites[99], 0, 0, 56, 43);

        if (indexFour < 66)  InterfaceClassObject.ctxButtonsWithCharsCanvases[indexFour].font = "28px HighlandGothicFLF";
	    else  InterfaceClassObject.ctxButtonsWithCharsCanvases[indexFour].font = "21px HighlandGothicFLF";
	
        InterfaceClassObject.ctxButtonsWithCharsCanvases[indexFour].textAlign = "center";

        InterfaceClassObject.ctxButtonsWithCharsCanvases[indexFour].fillStyle = "rgb(200,200,200)";
        for (let yOffSetTwo = -1; yOffSetTwo < 2; yOffSetTwo+=2)
        {
            for (let xOffSetTwo = -1; xOffSetTwo < 2; xOffSetTwo+=2)
            {
                InterfaceClassObject.ctxButtonsWithCharsCanvases[indexFour].fillText(text, 19+7+xOffSetTwo, 15+6+7+yOffSetTwo);
            }
        }

        InterfaceClassObject.ctxButtonsWithCharsCanvases[indexFour].fillStyle = "rgba(0, 0, 0, 1)";
        InterfaceClassObject.ctxButtonsWithCharsCanvases[indexFour].fillText(text, 19+7, 15+6+7);
    }   
}

//--------------------------------------------------------------------------------------------------------------
function CreateGUIButton(index, x, y)
{
    InterfaceClassObject.GUIButton[InterfaceClassObject.NumberOfOnscreenButtons] = index;

    InterfaceClassObject.GUIButtonScreenX[InterfaceClassObject.NumberOfOnscreenButtons] = x;
    InterfaceClassObject.GUIButtonScreenY[InterfaceClassObject.NumberOfOnscreenButtons] = y;

    InterfaceClassObject.NumberOfOnscreenButtons++;

    InterfaceClassObject.ButtonThatWasSelected = -1;
    InterfaceClassObject.ButtonSelectedAnimationTimer = -1;
    InterfaceClassObject.ButtonSelectedByKeyboard = 0;
}

//--------------------------------------------------------------------------------------------------------------
function DrawAllGUIButtonImages()
{
    let scale = 1;

    for (let index = 0; index < InterfaceClassObject.NumberOfOnscreenButtons; index++)
    {
        let computedCenterX = InterfaceClassObject.OriginalButtonSprite.width / 2;
        let computedCenterY = InterfaceClassObject.OriginalButtonSprite.height / 2;

        let x = InterfaceClassObject.GUIButtonScreenX[index];
        let y = InterfaceClassObject.GUIButtonScreenY[index];

        if (index === InterfaceClassObject.ButtonThatWasSelected && InterfaceClassObject.ButtonSelectedAnimationTimer > 5)
        {
            scale = 0.9;
        }
        else  scale = 1;

        InitializeClassObject.ctx.drawImage(  InterfaceClassObject.ButtonsWithTextCanvases[InterfaceClassObject.GUIButton[index]], (x - ((computedCenterX) * scale) ), (y - ((computedCenterY) * scale) )
        , (InterfaceClassObject.OriginalButtonSprite.width * scale), (InterfaceClassObject.OriginalButtonSprite.height * scale)  );

	if ( InitializeClassObject.Browser !== "Mobile" && index === InterfaceClassObject.ButtonSelectedByKeyboard && ScreensClassObject.ScreenToDisplay === 3 || (ScreensClassObject.ScreenToDisplay === 10 && DataClassObject.NewHighScoreCharY === 5) )
    {
        InitializeClassObject.ctx.drawImage(InterfaceClassObject.GUIArrowsSprites[0], x + 128, y - 20, InterfaceClassObject.GUIArrowsSprites[0].width, InterfaceClassObject.GUIArrowsSprites[0].height);
        InitializeClassObject.ctx.drawImage(InterfaceClassObject.GUIArrowsSprites[1], x - 175, y - 20, InterfaceClassObject.GUIArrowsSprites[1].width, InterfaceClassObject.GUIArrowsSprites[1].height);
    }
    }
}

//--------------------------------------------------------------------------------------------------------------
function ThisButtonWasPressed(index)
{
    let returnValue = false;

    if (InputClassObject.DelayAllUserInput === 0)
    {
	if (InputClassObject.JoystickDirection[Any] === InputClassObject.UP)
	{
	    if (InterfaceClassObject.ButtonSelectedByKeyboard < 1)  InterfaceClassObject.ButtonSelectedByKeyboard = (InterfaceClassObject.NumberOfOnscreenButtons-1);
	    else  InterfaceClassObject.ButtonSelectedByKeyboard--;

	    ScreensClassObject.ScreenIsDirty = true;

	    PlaySoundEffect(1);
	    InputClassObject.DelayAllUserInput = 10;
	}
	else if (InputClassObject.JoystickDirection[Any] === InputClassObject.DOWN)
	{
	    if ( InterfaceClassObject.ButtonSelectedByKeyboard > (InterfaceClassObject.NumberOfOnscreenButtons - 2) )  InterfaceClassObject.ButtonSelectedByKeyboard = 0;
	    else  InterfaceClassObject.ButtonSelectedByKeyboard++;

	    ScreensClassObject.ScreenIsDirty = true;

	    PlaySoundEffect(1);
	    InputClassObject.DelayAllUserInput = 10;
	}

    if ( ScreensClassObject.ScreenToDisplay !== 2 )
    {
        if ( (InputClassObject.JoystickButtonOne[Any] === true || InputClassObject.KeyboardCharacterPressed === "_" || InputClassObject.KeyboardCharacterPressed === "/") && ScreensClassObject.ScreenToDisplay !== 10) {
            InterfaceClassObject.ButtonThatWasSelected = InterfaceClassObject.ButtonSelectedByKeyboard;
            InterfaceClassObject.ButtonSelectedAnimationTimer = 10;

            ScreensClassObject.ScreenIsDirty = true;

            if (InputClassObject.JoystickButtonOne[2] === true) InputClassObject.FirstHumanPlayerInput = JoystickOne;
            else if (InputClassObject.JoystickButtonOne[3] === true) InputClassObject.FirstHumanPlayerInput = JoystickTwo;
            else if (InputClassObject.JoystickButtonOne[4] === true) InputClassObject.FirstHumanPlayerInput = JoystickThree;
            else if (InputClassObject.JoystickButtonOne[5] === true) InputClassObject.FirstHumanPlayerInput = JoystickFour;
            else if (InputClassObject.JoystickButtonOne[6] === true) InputClassObject.FirstHumanPlayerInput = JoystickFive;
            else InputClassObject.FirstHumanPlayerInput = Keyboard;

            PlaySoundEffect(0);
            InputClassObject.DelayAllUserInput = 10;
        }
	}
    else if (ScreensClassObject.ScreenToDisplay === 2 ) {
        if ((InputClassObject.JoystickButtonOne[Keyboard] === true || InputClassObject.KeyboardCharacterPressed === "_" || InputClassObject.KeyboardCharacterPressed === "/") && ScreensClassObject.ScreenToDisplay !== 10) {
            InterfaceClassObject.ButtonThatWasSelected = InterfaceClassObject.ButtonSelectedByKeyboard;
            InterfaceClassObject.ButtonSelectedAnimationTimer = 10;

            ScreensClassObject.ScreenIsDirty = true;

            if (InputClassObject.JoystickButtonOne[2] === true) InputClassObject.FirstHumanPlayerInput = JoystickOne;
            else if (InputClassObject.JoystickButtonOne[3] === true) InputClassObject.FirstHumanPlayerInput = JoystickTwo;
            else if (InputClassObject.JoystickButtonOne[4] === true) InputClassObject.FirstHumanPlayerInput = JoystickThree;
            else if (InputClassObject.JoystickButtonOne[5] === true) InputClassObject.FirstHumanPlayerInput = JoystickFour;
            else if (InputClassObject.JoystickButtonOne[6] === true) InputClassObject.FirstHumanPlayerInput = JoystickFive;
            else InputClassObject.FirstHumanPlayerInput = Keyboard;

            PlaySoundEffect(0);
            InputClassObject.DelayAllUserInput = 10;
        }
    }

	if (InputClassObject.MouseButtonClicked === true && InterfaceClassObject.ButtonSelectedAnimationTimer === -1)
	{
	    if ( InputClassObject.MouseTouchX > (InterfaceClassObject.GUIButtonScreenX[index] - 125) && InputClassObject.MouseTouchX < (InterfaceClassObject.GUIButtonScreenX[index] + 125)
	    && InputClassObject.MouseTouchY > (InterfaceClassObject.GUIButtonScreenY[index] - 20) &&  InputClassObject.MouseTouchY < (InterfaceClassObject.GUIButtonScreenY[index] + 20) )
	    {
            InterfaceClassObject.ButtonThatWasSelected = index;
            InterfaceClassObject.ButtonSelectedAnimationTimer = 10;
            InterfaceClassObject.ButtonSelectedByKeyboard = index;

            ScreensClassObject.ScreenIsDirty = true;

            InputClassObject.FirstHumanPlayerInput = Keyboard;

            PlaySoundEffect(0);
            InputClassObject.DelayAllUserInput = 10;
            }
        }
    }

    if (InterfaceClassObject.ButtonSelectedAnimationTimer > 0 && index === InterfaceClassObject.ButtonThatWasSelected)  InterfaceClassObject.ButtonSelectedAnimationTimer--;
    else if (InterfaceClassObject.ButtonSelectedAnimationTimer === 0 && index === InterfaceClassObject.ButtonThatWasSelected)
    {
        InterfaceClassObject.ButtonSelectedAnimationTimer = -1;
        ScreensClassObject.ScreenIsDirty = true;
        returnValue = true;
    }

    return(returnValue);
}
//--------------------------------------------------------------------------------------------------------------
function DestroyAllButtons()
{
    for (let index = 0; index < InterfaceClassObject.NumberOfOnscreenButtons; index++)
    {
        InterfaceClassObject.GUIButton[index] = -1;

        InterfaceClassObject.GUIButtonScreenX[index] = -9999;
        InterfaceClassObject.GUIButtonScreenY[index] = -9999;
    }

    InterfaceClassObject.NumberOfOnscreenButtons = 0;

    InterfaceClassObject.ButtonThatWasSelected = -1;
    InterfaceClassObject.ButtonSelectedAnimationTimer = -1;
    InterfaceClassObject.ButtonSelectedByKeyboard = 0;
}

//--------------------------------------------------------------------------------------------------------------
function CreateIcon(spriteIndex, screenX, screenY)
{
    InterfaceClassObject.IconSelectedByPlayer = -1;

    InterfaceClassObject.IconIndex[InterfaceClassObject.NumberOfOnscreenIcons] = InterfaceClassObject.NumberOfOnscreenIcons;
    InterfaceClassObject.IconSpriteIndex[InterfaceClassObject.NumberOfOnscreenIcons] = spriteIndex;
    InterfaceClassObject.IconScreenX[InterfaceClassObject.NumberOfOnscreenIcons] = screenX;
    InterfaceClassObject.IconScreenY[InterfaceClassObject.NumberOfOnscreenIcons] = screenY;
    InterfaceClassObject.IconAnimationTimer[InterfaceClassObject.NumberOfOnscreenIcons] = -1;
    InterfaceClassObject.IconScale[InterfaceClassObject.NumberOfOnscreenIcons] = 1;

    InterfaceClassObject.NumberOfOnscreenIcons++;
}

//--------------------------------------------------------------------------------------------------------------
function DrawAllIcons()
{
    for (let index = 0; index < InterfaceClassObject.NumberOfOnscreenIcons; index++)
    {
        if (InterfaceClassObject.IconIndex[index] > -1)
        {
            let scale = 1;

            const computedCenterX = VisualsClassObject.ImageSprites[InterfaceClassObject.IconSpriteIndex[index]].width / 2;
            const computedCenterY = VisualsClassObject.ImageSprites[InterfaceClassObject.IconSpriteIndex[index]].height / 2;

            const x = InterfaceClassObject.IconScreenX[index];
            const y = InterfaceClassObject.IconScreenY[index];

            if (InterfaceClassObject.IconAnimationTimer[index] > 5)
            {
                scale = 0.9;
            }
            else  scale = 1;

            InitializeClassObject.ctx.drawImage(  VisualsClassObject.ImageSprites[InterfaceClassObject.IconSpriteIndex[index]], (x - ((computedCenterX) * scale) ), (y - ((computedCenterY) * scale) )
                , (VisualsClassObject.ImageSprites[InterfaceClassObject.IconSpriteIndex[index]].width * scale), (VisualsClassObject.ImageSprites[InterfaceClassObject.IconSpriteIndex[index]].height * scale)  );
        }
    }
}

//--------------------------------------------------------------------------------------------------------------
function ProcessAllIcons()
{
    InterfaceClassObject.IconSelectedByPlayer = -1;

    for (let index = 0; index < InterfaceClassObject.NumberOfOnscreenIcons; index++)
    {
        if (InterfaceClassObject.IconIndex[index] > -1)
        {
            if (InputClassObject.MouseButtonClicked === true && InterfaceClassObject.IconAnimationTimer[index] === -1)
            {
                if (  InputClassObject.MouseTouchX > ( InterfaceClassObject.IconScreenX[index] - (VisualsClassObject.ImageSprites[InterfaceClassObject.IconSpriteIndex[index]].width/2) ) && InputClassObject.MouseTouchX < ( InterfaceClassObject.IconScreenX[index] + (VisualsClassObject.ImageSprites[InterfaceClassObject.IconSpriteIndex[index]].width/2) )
                    && InputClassObject.MouseTouchY > ( InterfaceClassObject.IconScreenY[index] - (VisualsClassObject.ImageSprites[InterfaceClassObject.IconSpriteIndex[index]].height/2) ) &&  InputClassObject.MouseTouchY < ( InterfaceClassObject.IconScreenY[index] + (VisualsClassObject.ImageSprites[InterfaceClassObject.IconSpriteIndex[index]].height/2) )  )
                {
                    InterfaceClassObject.IconAnimationTimer[index] = 10;
                    InterfaceClassObject.IconSelectedByPlayer = index;
                    PlaySoundEffect(0);
                    ScreensClassObject.ScreenIsDirty = true;
                }
            }
        }

        if (InterfaceClassObject.IconAnimationTimer[index] === 5)  ScreensClassObject.ScreenIsDirty = true;

        if (InterfaceClassObject.IconAnimationTimer[index] > -1)  InterfaceClassObject.IconAnimationTimer[index]--;
    }
}

//--------------------------------------------------------------------------------------------------------------
function DestroyAllIcons()
{
    InterfaceClassObject.IconSelectedByPlayer = -1;

    for (let index = 0; index < InterfaceClassObject.NumberOfOnscreenIcons; index++)
    {
        if (InterfaceClassObject.IconIndex[index] > -1)
        {
            InterfaceClassObject.IconIndex[index] = -1;
            InterfaceClassObject.IconSpriteIndex[index] = -1;
            InterfaceClassObject.IconScreenX[index] = -9999;
            InterfaceClassObject.IconScreenY[index] = -9999;
            InterfaceClassObject.IconAnimationTimer[index] = -1;
            InterfaceClassObject.IconScale[index] = 1;
        }
    }

    InterfaceClassObject.NumberOfOnscreenIcons = 0;
}

//--------------------------------------------------------------------------------------------------------------
function CreateGamepad(spriteIndex, screenX, screenY) {
    InterfaceClassObject.GamepadSelectedByPlayer = -1;

    InterfaceClassObject.GamepadIndex[0] = 0;
    InterfaceClassObject.GamepadSpriteIndex[0] = 0;
    InterfaceClassObject.GamepadScreenX[0] = screenX;
    InterfaceClassObject.GamepadScreenY[0] = screenY-65;
    InterfaceClassObject.GamepadAnimationTimer[0] = -1;
    InterfaceClassObject.GamepadScale[0] = 1;

    InterfaceClassObject.GamepadIndex[1] = 1;
    InterfaceClassObject.GamepadSpriteIndex[1] = 1;
    InterfaceClassObject.GamepadScreenX[1] = screenX+65;
    InterfaceClassObject.GamepadScreenY[1] = screenY;
    InterfaceClassObject.GamepadAnimationTimer[1] = -1;
    InterfaceClassObject.GamepadScale[1] = 1;

    InterfaceClassObject.GamepadIndex[2] = 2;
    InterfaceClassObject.GamepadSpriteIndex[2] = 2;
    InterfaceClassObject.GamepadScreenX[2] = screenX;
    InterfaceClassObject.GamepadScreenY[2] = screenY+65;
    InterfaceClassObject.GamepadAnimationTimer[2] = -1;
    InterfaceClassObject.GamepadScale[2] = 1;

    InterfaceClassObject.GamepadIndex[3] = 3;
    InterfaceClassObject.GamepadSpriteIndex[3] = 3;
    InterfaceClassObject.GamepadScreenX[3] = screenX-65;
    InterfaceClassObject.GamepadScreenY[3] = screenY;
    InterfaceClassObject.GamepadAnimationTimer[3] = -1;
    InterfaceClassObject.GamepadScale[3] = 1;

    InterfaceClassObject.NumberOfOnscreenGamepadButtons = 4;
}

//--------------------------------------------------------------------------------------------------------------
function DrawAllGamepad()
{
    for (let index = 0; index < InterfaceClassObject.NumberOfOnscreenGamepadButtons; index++)
    {
        if (InterfaceClassObject.GamepadIndex[index] > -1)
        {
            let scale = 1;

            const computedCenterX = VisualsClassObject.OnScreenGamepadSprites[InterfaceClassObject.GamepadSpriteIndex[index]].width / 2;
            const computedCenterY = VisualsClassObject.OnScreenGamepadSprites[InterfaceClassObject.GamepadSpriteIndex[index]].height / 2;

            const x = InterfaceClassObject.GamepadScreenX[index];
            const y = InterfaceClassObject.GamepadScreenY[index];

            if (InterfaceClassObject.GamepadAnimationTimer[index] > 5)
            {
                scale = 0.9;
            }
            else  scale = 1;

            InitializeClassObject.ctx.save();
            InitializeClassObject.ctx.globalAlpha = 0.5;

            InitializeClassObject.ctx.drawImage(  VisualsClassObject.OnScreenGamepadSprites[InterfaceClassObject.GamepadSpriteIndex[index]], (x - ((computedCenterX) * scale) ), (y - ((computedCenterY) * scale) )
                , (VisualsClassObject.OnScreenGamepadSprites[InterfaceClassObject.GamepadSpriteIndex[index]].width * scale), (VisualsClassObject.OnScreenGamepadSprites[InterfaceClassObject.GamepadSpriteIndex[index]].height * scale)  );

            InitializeClassObject.ctx.globalAlpha = 1;
            InitializeClassObject.ctx.restore();
        }
    }
}

//--------------------------------------------------------------------------------------------------------------
function ProcessAllGamepad() {
    InterfaceClassObject.GamepadSelectedByPlayer = -1;

    if (InputClassObject.MouseButtonDown === true) {
        if (InputClassObject.MouseTouchX > (InterfaceClassObject.GamepadScreenX[0] - (VisualsClassObject.OnScreenGamepadSprites[InterfaceClassObject.GamepadSpriteIndex[0]].width / 2)) && InputClassObject.MouseTouchX < (InterfaceClassObject.GamepadScreenX[0] + (VisualsClassObject.OnScreenGamepadSprites[InterfaceClassObject.GamepadSpriteIndex[0]].width / 2))
            && InputClassObject.MouseTouchY > (InterfaceClassObject.GamepadScreenY[0] - (VisualsClassObject.OnScreenGamepadSprites[InterfaceClassObject.GamepadSpriteIndex[0]].height / 2)) && InputClassObject.MouseTouchY < (InterfaceClassObject.GamepadScreenY[0] + (VisualsClassObject.OnScreenGamepadSprites[InterfaceClassObject.GamepadSpriteIndex[0]].height / 2))) {
            InterfaceClassObject.GamepadSelectedByPlayer = 0;

            InterfaceClassObject.GamepadAnimationTimer[0] = 10;

            ScreensClassObject.ScreenIsDirty = true;
        }

        if (InputClassObject.MouseTouchX > (InterfaceClassObject.GamepadScreenX[1] - (VisualsClassObject.OnScreenGamepadSprites[InterfaceClassObject.GamepadSpriteIndex[1]].width / 2)) && InputClassObject.MouseTouchX < (InterfaceClassObject.GamepadScreenX[1] + (VisualsClassObject.OnScreenGamepadSprites[InterfaceClassObject.GamepadSpriteIndex[1]].width / 2))
            && InputClassObject.MouseTouchY > (InterfaceClassObject.GamepadScreenY[1] - (VisualsClassObject.OnScreenGamepadSprites[InterfaceClassObject.GamepadSpriteIndex[1]].height / 2)) && InputClassObject.MouseTouchY < (InterfaceClassObject.GamepadScreenY[1] + (VisualsClassObject.OnScreenGamepadSprites[InterfaceClassObject.GamepadSpriteIndex[1]].height / 2))) {
            InterfaceClassObject.GamepadSelectedByPlayer = 1;

            InterfaceClassObject.GamepadAnimationTimer[1] = 6;

            ScreensClassObject.ScreenIsDirty = true;
        }
        else  InterfaceClassObject.GamepadAnimationTimer[1] = 1;

        if (InputClassObject.MouseTouchX > (InterfaceClassObject.GamepadScreenX[2] - (VisualsClassObject.OnScreenGamepadSprites[InterfaceClassObject.GamepadSpriteIndex[2]].width / 2)) && InputClassObject.MouseTouchX < (InterfaceClassObject.GamepadScreenX[2] + (VisualsClassObject.OnScreenGamepadSprites[InterfaceClassObject.GamepadSpriteIndex[2]].width / 2))
            && InputClassObject.MouseTouchY > (InterfaceClassObject.GamepadScreenY[2] - (VisualsClassObject.OnScreenGamepadSprites[InterfaceClassObject.GamepadSpriteIndex[2]].height / 2)) && InputClassObject.MouseTouchY < (InterfaceClassObject.GamepadScreenY[2] + (VisualsClassObject.OnScreenGamepadSprites[InterfaceClassObject.GamepadSpriteIndex[2]].height / 2))) {
            InterfaceClassObject.GamepadSelectedByPlayer = 2;

            InterfaceClassObject.GamepadAnimationTimer[2] = 6;

            ScreensClassObject.ScreenIsDirty = true;
        }
        else  InterfaceClassObject.GamepadAnimationTimer[2] = 1;

        if (InputClassObject.MouseTouchX > (InterfaceClassObject.GamepadScreenX[3] - (VisualsClassObject.OnScreenGamepadSprites[InterfaceClassObject.GamepadSpriteIndex[3]].width / 2)) && InputClassObject.MouseTouchX < (InterfaceClassObject.GamepadScreenX[3] + (VisualsClassObject.OnScreenGamepadSprites[InterfaceClassObject.GamepadSpriteIndex[3]].width / 2))
            && InputClassObject.MouseTouchY > (InterfaceClassObject.GamepadScreenY[3] - (VisualsClassObject.OnScreenGamepadSprites[InterfaceClassObject.GamepadSpriteIndex[3]].height / 2)) && InputClassObject.MouseTouchY < (InterfaceClassObject.GamepadScreenY[3] + (VisualsClassObject.OnScreenGamepadSprites[InterfaceClassObject.GamepadSpriteIndex[3]].height / 2))) {
            InterfaceClassObject.GamepadSelectedByPlayer = 3;

            InterfaceClassObject.GamepadAnimationTimer[3] = 6;

            ScreensClassObject.ScreenIsDirty = true;
        }
        else  InterfaceClassObject.GamepadAnimationTimer[3] = 1;
    }
    else if (PieceMovementDelay[Player] < 0){
        PieceMovementDelay[Player] = 0;
    }
    else if (PieceMovementDelay[Player] > 0){
        PieceMovementDelay[Player] = 0;
    }

    if (InputClassObject.MouseButtonDown === false) {
        for (let index = 1; index < 4; index++)  InterfaceClassObject.GamepadAnimationTimer[index] = 1;
    }

    for (let index = 0; index < 1/*InterfaceClassObject.NumberOfOnscreenGamepadButtons*/; index++) {
        if (InterfaceClassObject.GamepadAnimationTimer[index] === 5) ScreensClassObject.ScreenIsDirty = true;
        if (InterfaceClassObject.GamepadAnimationTimer[index] > -1) InterfaceClassObject.GamepadAnimationTimer[index]--;
    }
}

//--------------------------------------------------------------------------------------------------------------
function DestroyAllGamepad()
{
    InterfaceClassObject.IconSelectedByPlayer = -1;

    for (let index = 0; index < InterfaceClassObject.NumberOfOnscreenGamepadButtons; index++)
    {
        if (InterfaceClassObject.GamepadIndex[index] > -1)
        {
            InterfaceClassObject.GamepadIndex[index] = -1;
            InterfaceClassObject.GamepadSpriteIndex[index] = -1;
            InterfaceClassObject.GamepadScreenX[index] = -9999;
            InterfaceClassObject.GamepadScreenY[index] = -9999;
            InterfaceClassObject.GamepadAnimationTimer[index] = -1;
            InterfaceClassObject.GamepadScale[index] = 1;
        }
    }

    InterfaceClassObject.NumberOfOnscreenGamepadButtons = 0;
}

//--------------------------------------------------------------------------------------------------------------
function MouseOnGUI()
{
    for (let index = 0; index < InterfaceClassObject.NumberOfOnscreenArrowSets; index++)
    {
        let x = InterfaceClassObject.GUIArrowSetScreenX[index];
        let y = InterfaceClassObject.GUIArrowSetScreenY[index];

        let arrowOneCenterX = (x - 375);
        let arrowOneCenterY = (y-23);
        let arrowTwoCenterX = (x + 375);
        let arrowTwoCenterY = (y-23);

        if ( InputClassObject.MouseTouchX > (arrowOneCenterX - (46/2)) && InputClassObject.MouseTouchX < (arrowOneCenterX + (46/2))
        && InputClassObject.MouseTouchY > (arrowOneCenterY - (38/2)) && InputClassObject.MouseTouchY < (arrowOneCenterY + (38/2)) )
        {
            return true;
        }
        else if ( InputClassObject.MouseTouchX > (arrowTwoCenterX - (46/2)) && InputClassObject.MouseTouchX < (arrowTwoCenterX + (46/2))
        && InputClassObject.MouseTouchY > (arrowTwoCenterY - (38/2)) && InputClassObject.MouseTouchY < (arrowTwoCenterY + (38/2)) )
        {
            return true;
        }
    }

    for (let indexTwo = 0; indexTwo < InterfaceClassObject.NumberOfOnscreenButtons; indexTwo++)
    {
        if ( InputClassObject.MouseTouchX > (InterfaceClassObject.GUIButtonScreenX[indexTwo] - 125) && InputClassObject.MouseTouchX < (InterfaceClassObject.GUIButtonScreenX[indexTwo] + 125)
        && InputClassObject.MouseTouchY > (InterfaceClassObject.GUIButtonScreenY[indexTwo] - 20) &&  InputClassObject.MouseTouchY < (InterfaceClassObject.GUIButtonScreenY[indexTwo] + 20) )
        {
            return true;
        }
    }

    for (let indexThree = 0; indexThree < InterfaceClassObject.NumberOfOnscreenIcons; indexThree++)
    {
        if (  InputClassObject.MouseTouchX > ( InterfaceClassObject.IconScreenX[indexThree] - (VisualsClassObject.ImageSprites[InterfaceClassObject.IconSpriteIndex[indexThree]].width/2) ) && InputClassObject.MouseTouchX < ( InterfaceClassObject.IconScreenX[indexThree] + (VisualsClassObject.ImageSprites[InterfaceClassObject.IconSpriteIndex[indexThree]].width/2) )
            && InputClassObject.MouseTouchY > ( InterfaceClassObject.IconScreenY[indexThree] - (VisualsClassObject.ImageSprites[InterfaceClassObject.IconSpriteIndex[indexThree]].height/2) ) &&  InputClassObject.MouseTouchY < ( InterfaceClassObject.IconScreenY[indexThree] + (VisualsClassObject.ImageSprites[InterfaceClassObject.IconSpriteIndex[indexThree]].height/2) )  )
        {

            return true;
        }
    }

    return false;
}
