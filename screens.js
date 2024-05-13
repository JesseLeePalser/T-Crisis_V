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

// "screens.js"...

//--------------------------------------------------------------------------------------------------------------
function ApplyScreenFade()
{
    if (ScreensClassObject.ScreenFadeStatus === -1)  return;

    if (ScreensClassObject.ScreenFadeStatus === 0)
    {
        ScreensClassObject.ScreenFadeAlpha-=.33;

        ScreensClassObject.ScreenIsDirty = true;

        if (ScreensClassObject.ScreenFadeAlpha < 0)
        {
            ScreensClassObject.ScreenFadeStatus = -1;
            ScreensClassObject.ScreenFadeAlpha = 0;

            if (ScreensClassObject.ScreenToDisplay === 3)  SaveOptions();
        }
    }
    else if (ScreensClassObject.ScreenFadeStatus === 1)
    {
        ScreensClassObject.ScreenFadeAlpha+=.33;

        if (ScreensClassObject.ScreenFadeAlpha > 1)  ScreensClassObject.ScreenIsDirty = true;

        if (ScreensClassObject.ScreenFadeAlpha > 1)
        {
            ScreensClassObject.ScreenFadeStatus = 0;
            ScreensClassObject.ScreenFadeAlpha = 1;
            ScreensClassObject.ScreenToDisplay = ScreensClassObject.NextScreenToDisplay;
            InterfaceClassObject.NumberOfOnscreenButtons = 0;
            InterfaceClassObject.NumberOfOnscreenArrowSets = 0;
            InterfaceClassObject.NumberOfOnscreenIcons = 0;

            DestroyAllButtons();
            DestroyAllGUIArrowSets();
            DestroyAllIcons();
            DestroyAllGamepad();

            ClearTextCache();
        }
    }

    DrawSpriteOntoCanvas(0, 400, 240, 1, 1, 0, ScreensClassObject.ScreenFadeAlpha, 255, 255, 255)
}

//--------------------------------------------------------------------------------------------------------------
function GameLoop()
{
let index;

    ScreensClassObject.frameCount++;

    let CurrentTime = new Date().getTime();
    if (CurrentTime > InitializeClassObject.NextSecond)
    {
        ScreensClassObject.FPS = ScreensClassObject.frameCount;
        ScreensClassObject.frameCount = 0;
        InitializeClassObject.NextSecond = CurrentTime+1000;
    }

    InputClassObject.Gamepads = navigator.getGamepads();
    for (let index = 0; index < 5; index++)  CheckForGamepadInput(index);

    if (ScreensClassObject.DEBUG === true)  ScreensClassObject.ScreenIsDirty = true;

    if (ScreensClassObject.ScreenToDisplay === 0)  DisplayLoadingNowScreen();
    else if (ScreensClassObject.ScreenToDisplay === 1)  DisplayLicenseScreen();
    else if (ScreensClassObject.ScreenToDisplay === 2)  DisplayGameControllerScreen();
    else if (ScreensClassObject.ScreenToDisplay === 3)  DisplayTitleScreen();
    else if (ScreensClassObject.ScreenToDisplay === 4)  DisplayOptionsScreen();
    else if (ScreensClassObject.ScreenToDisplay === 5)  DisplayHowToPlayScreen();
    else if (ScreensClassObject.ScreenToDisplay === 6)  DisplayHighScoresScreen();
    else if (ScreensClassObject.ScreenToDisplay === 7)  DisplayAboutScreen();
    else if (ScreensClassObject.ScreenToDisplay === 8)  DisplayPlayingGameScreen();
    else if (ScreensClassObject.ScreenToDisplay === 9)  DisplayPlayingStoryGameScreen();
    else if (ScreensClassObject.ScreenToDisplay === 10)  DisplayNewHighScoreNameInputScreen();
    else if (ScreensClassObject.ScreenToDisplay === 11)  DisplayStoryVideo();
	else if (ScreensClassObject.ScreenToDisplay === 12)  DisplayAITestScreen();

    DrawAllGUIButtonImages();
    DrawAllIcons();
    DrawAllGamepad();
	
    if (ScreensClassObject.DEBUG === true && PAUSEgame === false)// && ScreensClassObject.ScreenToDisplay !== 9)
    {
        DrawTextOntoCanvas(10, "FPS="+ScreensClassObject.FPS, 13, 480-13, "left", 255, 255, 255, 0, 0, 0, 1);
    }

    ScreensClassObject.ScreenIsDirty = false;

    if (InterfaceClassObject.CursorIsArrow === true)  document.body.style.cursor = "default";
    else if (InterfaceClassObject.CursorIsArrow === false)  document.body.style.cursor = "pointer";
    
    ApplyScreenFade();

    if (InputClassObject.DelayAllUserInput > 0)
    {
        InputClassObject.DelayAllUserInput--;
        
        for (index = 0; index < 8; index++)
        {
            InputClassObject.JoystickDirection[index] = InputClassObject.CENTER;
            InputClassObject.JoystickButtonOne[index] = false;
            InputClassObject.JoystickButtonTwo[index] = false;
        }
    }
    else
    {
        InputClassObject.JoystickDirection[Any] = InputClassObject.CENTER;
        InputClassObject.JoystickButtonOne[Any] = false;
        InputClassObject.JoystickButtonTwo[Any] = false;
        for (index = 7; index > -1; index--)
        {
            if (InputClassObject.JoystickDirection[index] !== InputClassObject.CENTER)  InputClassObject.JoystickDirection[Any] = InputClassObject.JoystickDirection[index];
            if (InputClassObject.JoystickButtonOne[index] !== false)  InputClassObject.JoystickButtonOne[Any] = InputClassObject.JoystickButtonOne[index];
            if (InputClassObject.JoystickButtonTwo[index] !== false)  InputClassObject.JoystickButtonTwo[Any] = InputClassObject.JoystickButtonTwo[index];
        }
    }

    if (InputClassObject.KeyboardCharacterPressed === "~" && ScreensClassObject.ScreenToDisplay !== 11)
    {
        for (index = 0; index < 5; index++)
        {
            PlayerStatus[index] = GameOver;
        }

        InputClassObject.GameWasQuit = true;

        ScreensClassObject.NextScreenToDisplay = 3;
        ScreensClassObject.ScreenFadeStatus = 1;
    }
    
    if (InputClassObject.KeyboardCharacterPressed === "D" && ScreensClassObject.ScreenToDisplay === 3)
    {
        ScreensClassObject.DEBUG = !ScreensClassObject.DEBUG;
        PlaySoundEffect(0);
        InputClassObject.DelayAllUserInput = 50;
        ScreensClassObject.ScreenIsDirty = true;
    }

    if ( InputClassObject.MouseButtonClicked === true && (InputClassObject.MouseTouchX > 800-30 && InputClassObject.MouseTouchX < 800
    && InputClassObject.MouseTouchY > 480-30 &&  InputClassObject.MouseTouchY < 480) )
    {
        ScreensClassObject.DEBUG = !ScreensClassObject.DEBUG;
        PlaySoundEffect(0);
        InputClassObject.DelayAllUserInput = 50;
        ScreensClassObject.ScreenIsDirty = true;
    }

    InputClassObject.KeyboardCharacterPressed = "";
    InputClassObject.MouseButtonClicked = false;
}

//--------------------------------------------------------------------------------------------------------------
function DisplayLoadingNowScreen() {
    let percent;

    let numberOfLoaded = (VisualsClassObject.NumberOfLoadedImages + AudioClassObject.NumberOfLoadedSounds + AudioClassObject.NumberOfLoadedMusics);
    let totalNumber = (VisualsClassObject.TotalNumberOfImages + AudioClassObject.TotalNumberOfSounds + (AudioClassObject.TotalNumberOfMusics));

    percent = ((numberOfLoaded / totalNumber) * 100);
    percent = Math.floor(percent);

    if (percent === 100 && (InputClassObject.JoystickButtonOne[Any] === true || InputClassObject.MouseButtonClicked === true || InputClassObject.KeyboardCharacterPressed === "_" || InputClassObject.KeyboardCharacterPressed === "/")) {

        if (InitializeClassObject.Browser !== "Mobile")  ScreensClassObject.NextScreenToDisplay = 2;
        else if (InitializeClassObject.Browser === "Mobile")  ScreensClassObject.NextScreenToDisplay = 3;

        ScreensClassObject.ScreenFadeStatus = 1;
    }

//    if (ScreensClassObject.ScreenIsDirty === true)
    {
        InitializeClassObject.ctx.clearRect(0, 0, VisualsClassObject.screenWidth, VisualsClassObject.screenHeight);

        //InitializeClassObject.Browser = "Mobile";

        if (InitializeClassObject.BrowserMobileSSafari === true){
            DrawTextOntoCanvas(17, "HTML5 On Apple iPhone iOS/iPad iPadOS Is Junk!", 400, 480 - 35, "center", 255, 255, 255, 100, 100, 100, 1);
        }

        if (percent < 100) {
            DrawTextOntoCanvas(25, "Loading now...Please wait!", 400, 240 - 20, "center", 255, 255, 255, 100, 100, 100, 1);
        } else {
            if (InitializeClassObject.Browser !== "Mobile") DrawTextOntoCanvas(25, "Click on screen with your mouse!", 400, 240 - 20, "center", 255, 255, 255, 100, 100, 100, 1);
            else DrawTextOntoCanvas(25, "Tap on screen with your finger!", 400, 240 - 20, "center", 255, 255, 255, 100, 100, 100, 1);
        }

        DrawTextOntoCanvas(25, "" + percent + "%", 400, 240 + 20, "center", 255, 255, 255, 100, 100, 100, 1);

        if (InitializeClassObject.BrowserMobileSSafari === true)  DrawTextOntoCanvas(25, "NOTE: Game Runs Best On Google Android Mobile Devices", 400, 480-(480/4), "center", 255, 255, 255, 100, 100, 100, 1);

        if (ScreensClassObject.ScreenFadeAlpha === .99 && ScreensClassObject.ScreenFadeStatus === 1) {
            CreateGUIButtonsWithText();
            PreloadAllStaffTexts();

            InputClassObject.GamepadConfigPadIndex = -1;
            InputClassObject.GamepadConfigGetInput = 0;

            SetupTetrisCore();

            ScreensClassObject.NextScreenToDisplay = 1;

            InputClassObject.DelayAllUserInput = 25;

            InterfaceClassObject.CursorIsArrow = true;

//            if (InitializeClassObject.Browser === "Mobile"){
//                PlayMusic(0);

//                ToggleFullScreen();
//            }
        }
    }
}

//--------------------------------------------------------------------------------------------------------------
function DisplayLicenseScreen()
{
    if (ScreensClassObject.ScreenFadeAlpha === 1 && ScreensClassObject.ScreenFadeStatus === 0)
    {
        CreateGUIButton(5, 400, 455);
    }

    InterfaceClassObject.CursorIsArrow = MouseOnGUI() !== true;

    if (ThisButtonWasPressed(0) === true)
    {
        ScreensClassObject.NextScreenToDisplay = 2;
        ScreensClassObject.ScreenFadeStatus = 1;
    }

//    if (ScreensClassObject.ScreenIsDirty === true)
    {
        DrawSpriteOntoCanvas(0, 400, 240, 1, 1, 0, 1, 255, 255, 255);

        DrawTextOntoCanvas(25, "G A M E  L I C E N S E:", 400, 26, "center", 255, 255, 0, 0, 0, 0, 1);
        DrawTextOntoCanvas(25, "________________________________________________", 400, 30, "center", 255, 255, 0, 0, 0, 0, 1);

        DrawSpriteOntoCanvas(10, 400, 240-10, 0.75, 0.75, 0, 1, 255, 255, 255);

        DrawTextOntoCanvas(25, "________________________________________________", 400, 424, "center", 255, 255, 0, 0, 0, 0, 1);
    }

    if (ScreensClassObject.ScreenFadeAlpha === .99 && ScreensClassObject.ScreenFadeStatus === 1)
    {
        InputClassObject.DelayAllUserInput = 25;
    }
}

//--------------------------------------------------------------------------------------------------------------
function DisplayGameControllerScreen()
{
    if (ScreensClassObject.ScreenFadeAlpha === 1 && ScreensClassObject.ScreenFadeStatus === 0)
    {
        CreateGUIButton(5, 400, 455);

        for (let index = 0; index < 5; index++)  InputClassObject.GameControllerInitialized[index] = false;
    }

    InterfaceClassObject.CursorIsArrow = MouseOnGUI() !== true;

    if (ThisButtonWasPressed(0) === true)
    {
        ScreensClassObject.NextScreenToDisplay = 3;
        ScreensClassObject.ScreenFadeStatus = 1;
    }

//    if (ScreensClassObject.ScreenIsDirty === true)
    {
        DrawSpriteOntoCanvas(0, 400, 240, 1, 1, 0, 1, 255, 255, 255);

        DrawTextOntoCanvas(25, "G A M E   C O N T R O L L E R   S E T U P:", 400, 26, "center", 255, 255, 0, 0, 0, 0, 1);
        DrawTextOntoCanvas(25, "________________________________________________", 400, 30, "center", 255, 255, 0, 0, 0, 0, 1);

        DrawTextOntoCanvas(25, "USB game controller(s) must be plugged in", 400, 26+45-10, "center", 255, 255, 255, 0, 0, 0, 1);
        DrawTextOntoCanvas(25, "before starting your Internet browser.", 400, 26+45+30-10, "center", 255, 255, 255, 0, 0, 0, 1);
        DrawTextOntoCanvas(17, "(NOTE: Not all Internet browsers/USB game controllers are supported)", 400, 26+45+30+30-10, "center", 255, 255, 255, 0, 0, 0, 1);

        DrawTextOntoCanvas(25, "________________________________________________", 400, 26+45+30+30-10+20, "center", 255, 255, 255, 0, 0, 0, 1);

        DrawTextOntoCanvas(25, "Press a button on all plugged in USB game controllers", 400, 26+45+30+30+75-15, "center", 155, 255, 155, 0, 0, 0, 1);
        DrawTextOntoCanvas(25, "to initialize controller(s) for use with this video game.", 400, 26+45+30+30+75+30-15, "center", 155, 255, 155, 0, 0, 0, 1);

        DrawTextOntoCanvas(25, "________________________________________________", 400, 26+45+30+30+75+30-15+20, "center", 255, 255, 255, 0, 0, 0, 1);

        for (let index = 0; index < 5; index++) {
            QueryGamepadsForInput(index);
            if (InputClassObject.GameControllerInitialized[index] === true)  DrawTextOntoCanvas(25, "''" + InputClassObject.Gamepads[index].id + "''", 400, 26 + 45 + 30 + 30 + 50 + 30 - 15 + 110 + (index * 25), "center", 255, 255, 255, 0, 0, 0, 1);
        }

        DrawTextOntoCanvas(25, "________________________________________________", 400, 424, "center", 255, 255, 0, 0, 0, 0, 1);
    }

    if (ScreensClassObject.ScreenFadeAlpha === .99 && ScreensClassObject.ScreenFadeStatus === 1)
    {
        InputClassObject.GamepadConfigPadIndex = -1;
        InputClassObject.GamepadConfigGetInput = 0;

        InputClassObject.DelayAllUserInput = 25;

        PlayMusic(0);

        InterfaceClassObject.CursorIsArrow = true;
    }
}

//--------------------------------------------------------------------------------------------------------------
function DisplayTitleScreen()
{
    if (ScreensClassObject.ScreenFadeAlpha === 1 && ScreensClassObject.ScreenFadeStatus === 0)
    {
        let startScreenY = 195+28+40;
        let screenYOffset = 42;

        CreateGUIButton(0, 400, startScreenY);
        CreateGUIButton( 1, 400, startScreenY+(screenYOffset) );
        CreateGUIButton( 2, 400, startScreenY+(2*screenYOffset) );
        CreateGUIButton( 3, 400, startScreenY+(3*screenYOffset) );
        CreateGUIButton( 4, 400, startScreenY+(4*screenYOffset) );

        CreateIcon(15, 64+15, 415-15);

        ScreensClassObject.LogoFlashScreenX = -50;
        
        FirefoxStoryModeStarted = false;
	}

    InterfaceClassObject.CursorIsArrow = MouseOnGUI() !== true;

    if (InputClassObject.KeyboardCharacterPressed === "T")
    {
        ScreensClassObject.NextScreenToDisplay = 12;
        ScreensClassObject.ScreenFadeStatus = 1;
    }

    if (ThisButtonWasPressed(0) === true)
    {
        if (GameMode !== FirefoxStoryMode)
        {
            ScreensClassObject.NextScreenToDisplay = 8;
        }
        else
        {
            Level[0] = 0;
            ScreensClassObject.NextScreenToDisplay = 11;
        }

        ScreensClassObject.ScreenFadeStatus = 1;
    }     
    else if (ThisButtonWasPressed(1) === true)
    {
        ScreensClassObject.NextScreenToDisplay = 4;
        ScreensClassObject.ScreenFadeStatus = 1;
    }     
    else if (ThisButtonWasPressed(2) === true)
    {
        ScreensClassObject.NextScreenToDisplay = 5;
        ScreensClassObject.ScreenFadeStatus = 1;
    }     
    else if (ThisButtonWasPressed(3) === true)
    {
        ScreensClassObject.NextScreenToDisplay = 6;
        ScreensClassObject.ScreenFadeStatus = 1;
    }     
    else if (ThisButtonWasPressed(4) === true)
    {
        ScreensClassObject.NextScreenToDisplay = 7;
        ScreensClassObject.ScreenFadeStatus = 1;
    }     

    ProcessAllIcons();

    if (InterfaceClassObject.IconSelectedByPlayer === 0)  window.open('https://bitbucket.org/jesseleepalser/t-crisis_v_firefox_110percent_ai/src/main/','_blank');

    if (ScreensClassObject.LogoFlashScreenX < 950)  { ScreensClassObject.LogoFlashScreenX+=15; ScreensClassObject.ScreenIsDirty = true; }

    if (ScreensClassObject.ScreenIsDirty === true)
    {
        DrawSpriteOntoCanvas(20, 400, 240, 1, 1, 0, 1, 255, 255, 255);

        DrawSpriteOntoCanvas(30, 400, 90, 1, 1, 0, 1, 255, 255, 255);
        DrawSpriteOntoCanvas(32, ScreensClassObject.LogoFlashScreenX, 90, 1, 1, 0, .75, 255, 255, 255);
        DrawSpriteOntoCanvas(31, 400, 89, 1, 1, 0, 1, 255, 255, 255);

        DrawTextOntoCanvas(25, "________________________________________________", 400, 180-3, "center", 255, 255, 255, 0, 0, 0, 1);

        DrawTextOntoCanvas(25, "''"+DataClassObject.HighScoresName[GameMode][0]+"'' Scored: "+DataClassObject.HighScoresScore[GameMode][0]+"", 400, 197+20-3, "center", 255, 255, 0, 0, 0, 0, 1);

        DrawTextOntoCanvas(25, "________________________________________________", 400, 185+40, "center", 255, 255, 255, 0, 0, 0, 1);

        DrawSpriteOntoCanvas(9, 800-40, 410, 1, 1, 0, 1, 255, 255, 255);
        DrawTextOntoCanvas(15, "Retail 3 110% v5.0", 800-5, 475, "right", 255, 255, 255, 0, 0, 0, 1);

        DrawTextOntoCanvas(20, "\u00A92024, By Team: ''JesseLeePalser.itch.io''", 400, 475, "center", 255, 255, 255, 0, 0, 0, 1);
    }
    
    if (ScreensClassObject.ScreenFadeAlpha === .99 && ScreensClassObject.ScreenFadeStatus === 1)
    {
        InterfaceClassObject.CursorIsArrow = true;

        DestroyAllButtons();

        if (ScreensClassObject.NextScreenToDisplay === -1)  window.open('https://fallenangelsoftware.com','_self');
    }
}

//--------------------------------------------------------------------------------------------------------------
function DisplayOptionsScreen()
{
    if (ScreensClassObject.ScreenFadeAlpha === 1 && ScreensClassObject.ScreenFadeStatus === 0)
    {
        CreateGUIArrowSet(0, 400, 85-8);
        CreateGUIArrowSet(1, 400, 125-8);
        CreateGUIArrowSet(2, 400, 125-8+40);

        CreateGUIArrowSet(3, 400, 180+25+4+4+2);
        CreateGUIArrowSet(4, 400, 220+25+4+4+2);
        CreateGUIArrowSet(5, 400, 260+25+4+4+2);

        CreateGUIArrowSet(6, 400, 315+25+4);
        CreateGUIArrowSet(7, 400, 355+25+4);

		CreateGUIButton(6, 400, 455);
        
        InputClassObject.GamepadConfigPadIndex = -1;
        InputClassObject.GamepadConfigGetInput = 0;

        InputClassObject.controllerIndex = 0;
    }

    InterfaceClassObject.CursorIsArrow = MouseOnGUI() !== true;

    if (InputClassObject.GamepadConfigPadIndex === -1)
    {
        if (ThisArrowSetArrowWasPressed(0) === true)
        {
            if (AudioClassObject.MusicVolume > 0)  AudioClassObject.MusicVolume-=.25;
            else  AudioClassObject.MusicVolume = 1;

            AudioClassObject.MusicArray[0].volume = AudioClassObject.MusicVolume;
            if (AudioClassObject.MusicVolume > 0)  AudioClassObject.MusicArray[0].play();
            else if (AudioClassObject.MusicVolume === 0)  AudioClassObject.MusicArray[0].pause();
        }
        else if (ThisArrowSetArrowWasPressed(.5) === true)
        {
            if (AudioClassObject.MusicVolume < 1)  AudioClassObject.MusicVolume+=.25;
            else  AudioClassObject.MusicVolume = 0;

            AudioClassObject.MusicArray[0].volume = AudioClassObject.MusicVolume;
            if (AudioClassObject.MusicVolume > 0)  AudioClassObject.MusicArray[0].play();
            else if (AudioClassObject.MusicVolume === 0)  AudioClassObject.MusicArray[0].pause();
        }
        else if (ThisArrowSetArrowWasPressed(1) === true)
        {
            if (AudioClassObject.SoundVolume > 0)  AudioClassObject.SoundVolume-=.25;
            else  AudioClassObject.SoundVolume = 1;

            PlaySoundEffect(0);
        }
        else if (ThisArrowSetArrowWasPressed(1.5) === true)
        {
            if (AudioClassObject.SoundVolume < 1)  AudioClassObject.SoundVolume+=.25;
            else  AudioClassObject.SoundVolume = 0;

            PlaySoundEffect(0);
        }
        else if (ThisArrowSetArrowWasPressed(2) === true)
        {
            if (InitializeClassObject.Browser !== "Mobile")  ToggleFullScreen();
        }
        else if (ThisArrowSetArrowWasPressed(2.5) === true)
        {
            if (InitializeClassObject.Browser !== "Mobile")  ToggleFullScreen();
        }
        else if (ThisArrowSetArrowWasPressed(3) === true)
        {
            if (GameMode > 0)  GameMode--;
            else  GameMode = 6;
        }
        else if (ThisArrowSetArrowWasPressed(3.5) === true)
        {
            if (GameMode < 6)  GameMode++;
            else  GameMode = 0;
        }
         else if (ThisArrowSetArrowWasPressed(4) === true)
        {
            if (GameMode !== FirefoxStoryMode)
            {
                if (CPUPlayerEnabled > 0)  CPUPlayerEnabled--;
                else  CPUPlayerEnabled = 4;
            }
        }
        else if (ThisArrowSetArrowWasPressed(4.5) === true)
        {
            if (GameMode !== FirefoxStoryMode)
            {
                if (CPUPlayerEnabled < 4)  CPUPlayerEnabled++;
                else  CPUPlayerEnabled = 0;
            }
        }
        else if (ThisArrowSetArrowWasPressed(5) === true)
        {
            if (DisplayDropShadow > 0)  DisplayDropShadow--;
            else  DisplayDropShadow = 1;
        }
        else if (ThisArrowSetArrowWasPressed(5.5) === true)
        {
            if (DisplayDropShadow < 1)  DisplayDropShadow++;
            else  DisplayDropShadow = 0;
        }
        else if (ThisArrowSetArrowWasPressed(6) === true)
        {
            if (InitializeClassObject.Browser !== "Mobile") {
                if (PressingUPAction > 0) PressingUPAction--;
                else PressingUPAction = 3;
            }
        }
        else if (ThisArrowSetArrowWasPressed(6.5) === true)
        {
            if (InitializeClassObject.Browser !== "Mobile") {
                if (PressingUPAction < 3) PressingUPAction++;
                else PressingUPAction = 0;
            }
        }
        else if (ThisArrowSetArrowWasPressed(7) === true)
        {
            if (InitializeClassObject.Browser !== "Mobile") {
                if (InputClassObject.KeyboardSpaceBarFunction > 0) InputClassObject.KeyboardSpaceBarFunction--;
                else InputClassObject.KeyboardSpaceBarFunction = 1;
            }
        }
        else if (ThisArrowSetArrowWasPressed(7.5) === true)
        {
            if (InitializeClassObject.Browser !== "Mobile") {
                if (InputClassObject.KeyboardSpaceBarFunction < 1) InputClassObject.KeyboardSpaceBarFunction++;
                else InputClassObject.KeyboardSpaceBarFunction = 0;
            }
        }

        if (ThisButtonWasPressed(0) === true)
        {
            ScreensClassObject.NextScreenToDisplay = 3;
            ScreensClassObject.ScreenFadeStatus = 1;
        }     
    }

    if (InputClassObject.KeyboardCharacterPressed === "c")
    {
        if (InputClassObject.GamepadConfigPadIndex === -1)
        {
            if (InputClassObject.Gamepads[0])
            {
                InputClassObject.GamepadConfigPadIndex = 0;
                
                InputClassObject.GamepadConfigGetInput = 0;

                InputClassObject.controllerIndex = 0;
            }
            else  InputClassObject.GamepadConfigPadIndex = -1;
        }
        else
        {
            for (let index = 0; index < 5; index++) {
                InputClassObject.GamepadUP[index] = InputClassObject.GamepadButtonZero+12;
                InputClassObject.GamepadRIGHT[index] = InputClassObject.GamepadButtonZero+15;
                InputClassObject.GamepadDOWN[index] = InputClassObject.GamepadButtonZero+13;
                InputClassObject.GamepadLEFT[index] = InputClassObject.GamepadButtonZero+14;
                InputClassObject.GamepadBUTTONONE[index] = InputClassObject.GamepadButtonZero+3;
                InputClassObject.GamepadBUTTONTWO[index] = InputClassObject.GamepadButtonZero+2;
            }

            InputClassObject.GamepadConfigPadIndex = -1;
        }

        PlaySoundEffect(0);
        InputClassObject.DelayAllUserInput = 20;
        ScreensClassObject.ScreenIsDirty = true;
    }

    if (InputClassObject.GamepadConfigPadIndex > -1)
    {    
        let gamepadInput = QueryGamepadsForInput(InputClassObject.controllerIndex);
        if ( gamepadInput !== -1)
        {
            if (InputClassObject.GamepadConfigGetInput === 0)
            {
                InputClassObject.GamepadUP[InputClassObject.controllerIndex] = gamepadInput;
                InputClassObject.GamepadConfigGetInput++;

                InputClassObject.DelayAllUserInput = 20;
            }
            else if (InputClassObject.GamepadConfigGetInput === 1)
            {
                InputClassObject.GamepadRIGHT[InputClassObject.controllerIndex] = gamepadInput;
                InputClassObject.GamepadConfigGetInput++;

                InputClassObject.DelayAllUserInput = 20;
            }
            else if (InputClassObject.GamepadConfigGetInput === 2)
            {
                InputClassObject.GamepadDOWN[InputClassObject.controllerIndex] = gamepadInput;
                InputClassObject.GamepadConfigGetInput++;

                InputClassObject.DelayAllUserInput = 20;
            }
            else if (InputClassObject.GamepadConfigGetInput === 3)
            {
                InputClassObject.GamepadLEFT[InputClassObject.controllerIndex] = gamepadInput;
                InputClassObject.GamepadConfigGetInput++;

                InputClassObject.DelayAllUserInput = 20;
            }
            else if (InputClassObject.GamepadConfigGetInput === 4)
            {
                InputClassObject.GamepadBUTTONONE[InputClassObject.controllerIndex] = gamepadInput;
                InputClassObject.GamepadConfigGetInput++;
 
                InputClassObject.DelayAllUserInput = 20;
           }
            else if (InputClassObject.GamepadConfigGetInput === 5)
            {
                InputClassObject.GamepadBUTTONTWO[InputClassObject.controllerIndex] = gamepadInput;

                if (InputClassObject.controllerIndex === 4) {
                    InputClassObject.GamepadConfigPadIndex = -1
                    InputClassObject.GamepadConfigGetInput = -1;
                    InputClassObject.controllerIndex = -1;
                }
                else if (InputClassObject.controllerIndex < 4 && InputClassObject.Gamepads[InputClassObject.controllerIndex+1]) {
                    InputClassObject.GamepadConfigPadIndex = 0;
                    InputClassObject.GamepadConfigGetInput = 0;
                    InputClassObject.controllerIndex++;
                }
                else {
                    InputClassObject.GamepadConfigPadIndex = -1
                    InputClassObject.GamepadConfigGetInput = -1;
                    InputClassObject.controllerIndex = -1;
                }

                InputClassObject.DelayAllUserInput = 20;
            }
        }
    }

//    if (ScreensClassObject.ScreenIsDirty === true)
    {
        DrawSpriteOntoCanvas(20, 400, 240, 1, 1, 0, 1, 255, 255, 255);
        DrawSpriteOntoCanvas(0, 400, 240, 1, 1, 0, .5, 255, 255, 255);

        DrawTextOntoCanvas(25, "O P T I O N S:", 400, 26, "center", 255, 255, 0, 0, 0, 0, 1);
        DrawTextOntoCanvas(25, "________________________________________________", 400, 30, "center", 255, 255, 0, 0, 0, 0, 1);

	    DrawAllGUIArrowSetImages();

        DrawTextOntoCanvas(20, "Music Volume:", 65, 85-15-8, "left", 255, 255, 255, 0, 0, 0, 1);
        if (AudioClassObject.MusicVolume === 0)  DrawTextOntoCanvas(20, "OFF", 800-65, 85-15-8, "right", 255, 255, 255, 0, 0, 0, 1);
        else if (AudioClassObject.MusicVolume === .25)  DrawTextOntoCanvas(20, "25%", 800-65, 85-15-8, "right", 255, 255, 255, 0, 0, 0, 1);
        else if (AudioClassObject.MusicVolume === .5)  DrawTextOntoCanvas(20, "50%", 800-65, 85-15-8, "right", 255, 255, 255, 0, 0, 0, 1);
        else if (AudioClassObject.MusicVolume === .75)  DrawTextOntoCanvas(20, "75%", 800-65, 85-15-8, "right", 255, 255, 255, 0, 0, 0, 1);
        else if (AudioClassObject.MusicVolume === 1)  DrawTextOntoCanvas(20, "100%", 800-65, 85-15-8, "right", 255, 255, 255, 0, 0, 0, 1);
	 
        DrawTextOntoCanvas(20, "Sound Effects Volume:", 65, 125-15-8, "left", 255, 255, 255, 0, 0, 0, 1);
        if (AudioClassObject.SoundVolume === 0)  DrawTextOntoCanvas(20, "OFF", 800-65, 125-15-8, "right", 255, 255, 255, 0, 0, 0, 1);
        else if (AudioClassObject.SoundVolume === .25)  DrawTextOntoCanvas(20, "25%", 800-65, 125-15-8, "right", 255, 255, 255, 0, 0, 0, 1);
        else if (AudioClassObject.SoundVolume === .5)  DrawTextOntoCanvas(20, "50%", 800-65, 125-15-8, "right", 255, 255, 255, 0, 0, 0, 1);
        else if (AudioClassObject.SoundVolume === .75)  DrawTextOntoCanvas(20, "75%", 800-65, 125-15-8, "right", 255, 255, 255, 0, 0, 0, 1);
        else if (AudioClassObject.SoundVolume === 1)  DrawTextOntoCanvas(20, "100%", 800-65, 125-15-8, "right", 255, 255, 255, 0, 0, 0, 1);
	 
        DrawTextOntoCanvas(20, "Full Screen Mode:", 65, 165-15-8, "left", 255, 255, 255, 0, 0, 0, 1);
        if (VisualsClassObject.FullScreenMode === 0)  DrawTextOntoCanvas(20, "OFF", 800-65, 165-15-8, "right", 255, 255, 255, 0, 0, 0, 1);
        else if (VisualsClassObject.FullScreenMode === 1)  DrawTextOntoCanvas(20, "ON", 800-65, 165-15-8, "right", 255, 255, 255, 0, 0, 0, 1);

        DrawTextOntoCanvas(25, "________________________________________________", 400, 127-8+25+4+4+2+4+4, "center", 255, 255, 255, 0, 0, 0, 1);

        DrawTextOntoCanvas(20, "Game Mode:", 65, 180-15+25+4+4+2, "left", 255, 255, 255, 0, 0, 0, 1);
        if (GameMode === 0)  DrawTextOntoCanvas(20, "Original Mode", 800-65, 180-15+25+4+4+2, "right", 255, 255, 255, 0, 0, 0, 1);
        else if (GameMode === 1)  DrawTextOntoCanvas(20, "Time Attack 30 Mode", 800-65, 180-15+25+4+4+2, "right", 255, 255, 255, 0, 0, 0, 1);
        else if (GameMode === 2)  DrawTextOntoCanvas(20, "Time Attack 60 Mode", 800-65, 180-15+25+4+4+2, "right", 255, 255, 255, 0, 0, 0, 1);
        else if (GameMode === 3)  DrawTextOntoCanvas(20, "Time Attack 120 Mode", 800-65, 180-15+25+4+4+2, "right", 255, 255, 255, 0, 0, 0, 1);
        else if (GameMode === 4)  DrawTextOntoCanvas(20, "Twenty Line Challenge Mode", 800-65, 180-15+25+4+4+2, "right", 255, 255, 255, 0, 0, 0, 1);
        else if (GameMode === 5)  DrawTextOntoCanvas(20, "''Crisis+Mode''", 800-65, 180-15+25+4+4+2, "right", 255, 255, 255, 0, 0, 0, 1);
        else if (GameMode === 6)  DrawTextOntoCanvas(20, "''Firefox'' Story Mode", 800-65, 180-15+25+4+4+2, "right", 255, 255, 255, 0, 0, 0, 1);

        DrawTextOntoCanvas(20, "C.P.U. Player's A.I.(Difficulty):", 65, 220-15+25+4+4+2, "left", 255, 255, 255, 0, 0, 0, 1);
        if (GameMode !== FirefoxStoryMode)
        {
            if (CPUPlayerEnabled === 0)  DrawTextOntoCanvas(20, "OFF", 800-65, 220-15+25+4+4+2, "right", 255, 255, 255, 0, 0, 0, 1);
            else if (CPUPlayerEnabled === 1)  DrawTextOntoCanvas(20, "Easy Dumb A.I.", 800-65, 220-15+25+4+4+2, "right", 255, 255, 255, 0, 0, 0, 1);
            else if (CPUPlayerEnabled === 2)  DrawTextOntoCanvas(20, "Normal Average A.I.", 800-65, 220-15+25+4+4+2, "right", 255, 255, 255, 0, 0, 0, 1);
            else if (CPUPlayerEnabled === 3)  DrawTextOntoCanvas(20, "Expert Smart A.I.", 800-65, 220-15+25+4+4+2, "right", 255, 255, 255, 0, 0, 0, 1);
            else if (CPUPlayerEnabled === 4)  DrawTextOntoCanvas(20, "Grand Master Genius A.I.", 800-65, 220-15+25+4+4+2, "right", 255, 255, 255, 0, 0, 0, 1);
        }
        else  DrawTextOntoCanvas(20, "Not Available (Change Game Mode)", 800-65, 220-15+25+4+4+2, "right", 255, 255, 255, 0, 0, 0, 1);

        DrawTextOntoCanvas(20, "Display Drop Shadow:", 65, 260-15+25+4+4+2, "left", 255, 255, 255, 0, 0, 0, 1);
        if (DisplayDropShadow === 0)  DrawTextOntoCanvas(20, "OFF", 800-65, 260-15+25+4+4+2, "right", 255, 255, 255, 0, 0, 0, 1);
        else if (DisplayDropShadow === 1)  DrawTextOntoCanvas(20, "ON", 800-65, 260-15+25+4+4+2, "right", 255, 255, 255, 0, 0, 0, 1);

        DrawTextOntoCanvas(25, "________________________________________________", 400, 262+25+4+4, "center", 255, 255, 255, 0, 0, 0, 1);

        DrawTextOntoCanvas(20, "Pressing [UP] Action:", 65, 315-15+25+4, "left", 255, 255, 255, 0, 0, 0, 1);
        if (InitializeClassObject.Browser === "Mobile")  DrawTextOntoCanvas(20, "Disabled On Mobile", 800-65, 315-15+25+4, "right", 255, 255, 255, 0, 0, 0, 1);
        else if (PressingUPAction === 0)  DrawTextOntoCanvas(20, "OFF", 800-65, 315-15+25+4, "right", 255, 255, 255, 0, 0, 0, 1);
        else if (PressingUPAction === 1)  DrawTextOntoCanvas(20, "Quick Drop", 800-65, 315-15+25+4, "right", 255, 255, 255, 0, 0, 0, 1);
        else if (PressingUPAction === 2)  DrawTextOntoCanvas(20, "Smart Rotate", 800-65, 315-15+25+4, "right", 255, 255, 255, 0, 0, 0, 1);
		else if (PressingUPAction === 3)  DrawTextOntoCanvas(20, "Drop & Drag", 800-65, 315-15+25+4, "right", 255, 255, 255, 0, 0, 0, 1);

        DrawTextOntoCanvas(20, "[SpaceBar] Key Assignment:", 65, 355-15+25+4, "left", 255, 255, 255, 0, 0, 0, 1);
        if (InitializeClassObject.Browser === "Mobile")  DrawTextOntoCanvas(20, "Disabled On Mobile", 800-65, 355-15+25+4, "right", 255, 255, 255, 0, 0, 0, 1);
        else if (InputClassObject.KeyboardSpaceBarFunction === 0)  DrawTextOntoCanvas(20, "Pause Game", 800-65, 355-15+25+4, "right", 255, 255, 255, 0, 0, 0, 1);
        else if (InputClassObject.KeyboardSpaceBarFunction === 1)  DrawTextOntoCanvas(20, "Quick Drop / Pause = [P]", 800-65, 355-15+25+4, "right", 255, 255, 255, 0, 0, 0, 1);

        DrawTextOntoCanvas(25, "________________________________________________", 400, 357+25+4, "center", 255, 255, 255, 0, 0, 0, 1);

        if (InitializeClassObject.Browser !== "Mobile")
            if (InputClassObject.GameControllerInitialized[0] === true || InputClassObject.GameControllerInitialized[1] === true || InputClassObject.GameControllerInitialized[2] === true || InputClassObject.GameControllerInitialized[3] === true || InputClassObject.GameControllerInitialized[4] === true)
                DrawTextOntoCanvas(25, "U.S.B. Gamepad[s] Detected - Press [c] To Configure!", 400, 390+25, "center", 255, 255, 255, 0, 0, 0, 1);

        DrawTextOntoCanvas(25, "________________________________________________", 400, 424, "center", 255, 255, 0, 0, 0, 0, 1);

        if (InputClassObject.GamepadConfigPadIndex !== -1)
        {
            DrawSpriteOntoCanvas(0, 400, 240, 1, 1, 0, .95, 255, 255, 255);

            DrawTextOntoCanvas(20, "''"+InputClassObject.Gamepads[InputClassObject.controllerIndex].id+"''", 400, 80, "center", 255, 255, 255, 0, 0, 0, 1);

            if (InputClassObject.GamepadConfigGetInput === 0)  DrawTextOntoCanvas(55, "Press [UP] Now!", 400, 250, "center", 255, 255, 255, 0, 0, 0, 1);
            else if (InputClassObject.GamepadConfigGetInput === 1)  DrawTextOntoCanvas(55, "Press [RIGHT] Now!", 400, 250, "center", 255, 255, 255, 0, 0, 0, 1);
            else if (InputClassObject.GamepadConfigGetInput === 2)  DrawTextOntoCanvas(55, "Press [DOWN] Now!", 400, 250, "center", 255, 255, 255, 0, 0, 0, 1);
            else if (InputClassObject.GamepadConfigGetInput === 3)  DrawTextOntoCanvas(55, "Press [LEFT] Now!", 400, 250, "center", 255, 255, 255, 0, 0, 0, 1);
            else if (InputClassObject.GamepadConfigGetInput === 4)  DrawTextOntoCanvas(55, "Press [BUTTON1] Now!", 400, 250, "center", 255, 255, 255, 0, 0, 0, 1);
            else if (InputClassObject.GamepadConfigGetInput === 5)  DrawTextOntoCanvas(55, "Press [BUTTON2] Now!", 400, 250, "center", 255, 255, 255, 0, 0, 0, 1);
        
            DrawTextOntoCanvas(25, "Press [c] To Cancel And Use Default Mappings", 400, 435-45, "center", 255, 255, 255, 0, 0, 0, 1);
        }
    }
    
    if (ScreensClassObject.ScreenFadeAlpha === .99 && ScreensClassObject.ScreenFadeStatus === 1)
    {
	InterfaceClassObject.CursorIsArrow = true;
	
        InputClassObject.GamepadConfigPadIndex = -1;
        InputClassObject.GamepadConfigGetInput = 0;

        DestroyAllGUIArrowSets();
        DestroyAllButtons();
    }
}    

//--------------------------------------------------------------------------------------------------------------
function DisplayHowToPlayScreen()
{
    if (ScreensClassObject.ScreenFadeAlpha === 1 && ScreensClassObject.ScreenFadeStatus === 0)
    {
        //InitializeClassObject.Browser = "Mobile";

        CreateGUIButton(6, 400, 455);

        if (InitializeClassObject.Browser !== "Mobile")  CreateGUIArrowSet(0, 400, 79);

        InputClassObject.ControlScheme = -1;
        if (PressingUPAction !== Fall)
        {
            if (InputClassObject.KeyboardSpaceBarFunction === 0 && PressingUPAction === Rotate)  InputClassObject.ControlScheme = 1;
            else if (InputClassObject.KeyboardSpaceBarFunction === 1 && PressingUPAction === Rotate) InputClassObject.ControlScheme = 0;
        }
        else if (InputClassObject.KeyboardSpaceBarFunction === 0)  InputClassObject.ControlScheme = 2;
    }
    
    InterfaceClassObject.CursorIsArrow = MouseOnGUI() !== true;

    if (InitializeClassObject.Browser !== "Mobile") {
        if (ThisArrowSetArrowWasPressed(0) === true) {
            if (InitializeClassObject.Browser !== "Mobile") {
                if (InputClassObject.ControlScheme > 0) InputClassObject.ControlScheme--;
                else InputClassObject.ControlScheme = 2;

                if (InputClassObject.ControlScheme === 0) {
                    InputClassObject.KeyboardSpaceBarFunction = 1;
                    PressingUPAction = Rotate;
                } else if (InputClassObject.ControlScheme === 1) {
                    InputClassObject.KeyboardSpaceBarFunction = 0;
                    PressingUPAction = Rotate;
                } else if (InputClassObject.ControlScheme === 2) {
                    InputClassObject.KeyboardSpaceBarFunction = 0;
                    PressingUPAction = Fall;
                }
            }
        } else if (ThisArrowSetArrowWasPressed(.5) === true) {
            if (InitializeClassObject.Browser !== "Mobile") {
                if (InputClassObject.ControlScheme < 2) InputClassObject.ControlScheme++;
                else InputClassObject.ControlScheme = 0;

                if (InputClassObject.ControlScheme === 0) {
                    InputClassObject.KeyboardSpaceBarFunction = 1;
                    PressingUPAction = Rotate;
                } else if (InputClassObject.ControlScheme === 1) {
                    InputClassObject.KeyboardSpaceBarFunction = 0;
                    PressingUPAction = Rotate;
                } else if (InputClassObject.ControlScheme === 2) {
                    InputClassObject.KeyboardSpaceBarFunction = 0;
                    PressingUPAction = Fall;
                }
            }
        }
    }

    if (ThisButtonWasPressed(0) === true)
    {
        ScreensClassObject.NextScreenToDisplay = 3;
        ScreensClassObject.ScreenFadeStatus = 1;
    }     

    if (ScreensClassObject.ScreenIsDirty === true)
    {
        DrawSpriteOntoCanvas(20, 400, 240, 1, 1, 0, 1, 255, 255, 255);
        DrawSpriteOntoCanvas(0, 400, 240, 1, 1, 0, .5, 255, 255, 255);

        DrawTextOntoCanvas(25, "H O W   T O   P L A Y:", 400, 26, "center", 255, 255, 0, 0, 0, 0, 1);
        DrawTextOntoCanvas(25, "________________________________________________", 400, 30, "center", 255, 255, 0, 0, 0, 0, 1);

        DrawAllGUIArrowSetImages();

        if (InitializeClassObject.Browser !== "Mobile") {
            if (InputClassObject.ControlScheme === -1) DrawTextOntoCanvas(20, "Custom Control", 400, 79 - 15, "center", 255, 255, 255, 0, 0, 0, 1);
            else if (InputClassObject.ControlScheme === 0) DrawTextOntoCanvas(20, "Original P.C. Control", 400, 79 - 15, "center", 255, 255, 255, 0, 0, 0, 1);
            else if (InputClassObject.ControlScheme === 1) DrawTextOntoCanvas(20, "New Control", 400, 79 - 15, "center", 255, 255, 255, 0, 0, 0, 1);
            else if (InputClassObject.ControlScheme === 2) DrawTextOntoCanvas(20, "JeZxLee's Preferred Control", 400, 79 - 15, "center", 255, 255, 255, 0, 0, 0, 1);

            let offsetY = 20;

            DrawSpriteOntoCanvas(29, 400, 220 + offsetY, 1, 1, 0, 1, 255, 255, 255);

            DrawTextOntoCanvas(15, "Quit!", 53, 145 + offsetY - 20, "center", 255, 0, 0, 0, 0, 0, 1);
            DrawSpriteOntoCanvas(28, 53, 145 + offsetY, 1, 1, 0, .5, 255, 255, 255);

            if (PressingUPAction === None) DrawTextOntoCanvas(15, "OFF", 585, 286 + offsetY - 20, "center", 0, 255, 0, 0, 0, 0, 1);
            else if (PressingUPAction === Fall) DrawTextOntoCanvas(15, "Quick Drop", 585, 286 + offsetY - 20, "center", 0, 255, 0, 0, 0, 0, 1);
            else if (PressingUPAction === Rotate) DrawTextOntoCanvas(15, "Smart Rotate", 585, 286 + offsetY - 20, "center", 0, 255, 0, 0, 0, 0, 1);
            else if (PressingUPAction === DropAndDrag) DrawTextOntoCanvas(15, "Drop & Drag", 585, 286 + offsetY - 20, "center", 0, 255, 0, 0, 0, 0, 1);
            DrawSpriteOntoCanvas(26, 585, 286 + offsetY, 1, 1, 0, .5, 255, 255, 255);
            DrawSpriteOntoCanvas(26, 585, 286 + offsetY + 33, 1, 1, 0, .5, 255, 255, 255);
            DrawSpriteOntoCanvas(26, 585 - 32, 286 + offsetY + 33, 1, 1, 0, .5, 255, 255, 255);
            DrawSpriteOntoCanvas(26, 585 + 32, 286 + offsetY + 33, 1, 1, 0, .5, 255, 255, 255);

            DrawTextOntoCanvas(15, "Rotate", 124 + 16, 286 + offsetY - 20, "center", 0, 255, 0, 0, 0, 0, 1);
            DrawSpriteOntoCanvas(26, 124, 286 + offsetY, 1, 1, 0, .5, 255, 255, 255);
            DrawSpriteOntoCanvas(26, 124 + 33, 286 + offsetY, 1, 1, 0, .5, 255, 255, 255);

            if (InputClassObject.KeyboardSpaceBarFunction === 1) {
                DrawTextOntoCanvas(25, "Quick Drop", 260, 333 + offsetY, "center", 255, 255, 0, 0, 0, 0, 1);

                DrawTextOntoCanvas(15, "Pause", 395, 222 + offsetY - 20, "center", 255, 255, 0, 0, 0, 0, 1);
                DrawSpriteOntoCanvas(27, 395, 222 + offsetY, 1, 1, 0, .5, 255, 255, 255);
            } else if (InputClassObject.KeyboardSpaceBarFunction === 0) {
                DrawTextOntoCanvas(25, "P A U S E", 260, 333 + offsetY, "center", 255, 255, 0, 0, 0, 0, 1);
            }
        }
        else {
            DrawSpriteOntoCanvas(13, 800/2, (480/2)-10, 0.8, 0.8, 0, 1, 255, 255, 255);
        }


        DrawTextOntoCanvas(25, "________________________________________________", 400, 424, "center", 255, 255, 0, 0, 0, 0, 1);
    }

    if (ScreensClassObject.ScreenFadeAlpha === .99 && ScreensClassObject.ScreenFadeStatus === 1)
    {
        InterfaceClassObject.CursorIsArrow = true;

        DestroyAllGUIArrowSets();
        DestroyAllButtons();
    }
}

//--------------------------------------------------------------------------------------------------------------
function DisplayHighScoresScreen()
{
    if (ScreensClassObject.ScreenFadeAlpha === 1 && ScreensClassObject.ScreenFadeStatus === 0)
    {
        CreateGUIArrowSet(0, 400, 85);

        CreateGUIButton(6, 400, 455);
    }
    
    InterfaceClassObject.CursorIsArrow = MouseOnGUI() !== true;
        
    if (ThisArrowSetArrowWasPressed(0) === true)
    {
        if (GameMode > 0)  GameMode--;
        else  GameMode = 6;
    }
    else if (ThisArrowSetArrowWasPressed(.5) === true)
    {
        if (GameMode < 6)  GameMode++;
        else  GameMode = 0;
    }

    if (InputClassObject.KeyboardCharacterPressed === "C")
    {
        InitializeHighScores();
        InputClassObject.DelayAllUserInput = 20;
        PlaySoundEffect(7);
        ScreensClassObject.ScreenIsDirty = true;
    }
    
    if (ThisButtonWasPressed(0) === true)
    {
        ScreensClassObject.NextScreenToDisplay = 3;
        ScreensClassObject.ScreenFadeStatus = 1;
    }     
        
    if (ScreensClassObject.ScreenIsDirty === true)
    {
        DrawSpriteOntoCanvas(20, 400, 240, 1, 1, 0, 1, 255, 255, 255);
        DrawSpriteOntoCanvas(0, 400, 240, 1, 1, 0, .5, 255, 255, 255);

        DrawTextOntoCanvas(25, "H I G H   S C O R E S:", 400, 26, "center", 255, 255, 0, 0, 0, 0, 1);
        DrawTextOntoCanvas(25, "________________________________________________", 400, 30, "center", 255, 255, 0, 0, 0, 0, 1);

        DrawAllGUIArrowSetImages();

        if (GameMode === 0)  DrawTextOntoCanvas(20, "Original Mode", 400, 85-15, "center", 255, 255, 255, 0, 0, 0, 1);
        else if (GameMode === 1)  DrawTextOntoCanvas(20, "Time Attack 30 Mode", 400, 85-15, "center", 255, 255, 255, 0, 0, 0, 1);
        else if (GameMode === 2)  DrawTextOntoCanvas(20, "Time Attack 60 Mode", 400, 85-15, "center", 255, 255, 255, 0, 0, 0, 1);
        else if (GameMode === 3)  DrawTextOntoCanvas(20, "Time Attack 120 Mode", 400, 85-15, "center", 255, 255, 255, 0, 0, 0, 1);
        else if (GameMode === 4)  DrawTextOntoCanvas(20, "Twenty Line Challenge Mode", 400, 85-15, "center", 255, 255, 255, 0, 0, 0, 1);
        else if (GameMode === 5)  DrawTextOntoCanvas(20, "''Crisis+Mode''", 400, 85-15, "center", 255, 255, 255, 0, 0, 0, 1);
        else if (GameMode === 6)  DrawTextOntoCanvas(20, "''Firefox'' Story Mode", 400, 85-15, "center", 255, 255, 255, 0, 0, 0, 1);

        DrawTextOntoCanvas(20, "NAME:", 36, 106, "left", 255, 255, 255, 0, 0, 0, 1);
        DrawTextOntoCanvas(20, "LEVEL:", 500, 106, "left", 255, 255, 255, 0, 0, 0, 1);
        DrawTextOntoCanvas(20, "SCORE:", 630, 106, "left", 255, 255, 255, 0, 0, 0, 1);

        let greenBlue = 255;
        let y = 130;
        for (let index = 1; index < 11; index++)
        {
            let indexAdjusted = index - 1;

            if ( Score[0] === parseInt(DataClassObject.HighScoresScore[GameMode][indexAdjusted]) && Level[0] === parseInt(DataClassObject.HighScoresLevel[GameMode][indexAdjusted]) )
            {
                greenBlue = 0;
            }
            else if ( Score[1] === parseInt(DataClassObject.HighScoresScore[GameMode][indexAdjusted]) && Level[1] === parseInt(DataClassObject.HighScoresLevel[GameMode][indexAdjusted]) )
            {
                greenBlue = 0;
            }
            else if ( Score[2] === parseInt(DataClassObject.HighScoresScore[GameMode][indexAdjusted]) && Level[2] === parseInt(DataClassObject.HighScoresLevel[GameMode][indexAdjusted]) )
            {
                greenBlue = 0;
            }
            else if ( Score[3] === parseInt(DataClassObject.HighScoresScore[GameMode][indexAdjusted]) && Level[3] === parseInt(DataClassObject.HighScoresLevel[GameMode][indexAdjusted]) )
            {
                greenBlue = 0;
            }
            else if ( Score[4] === parseInt(DataClassObject.HighScoresScore[GameMode][indexAdjusted]) && Level[4] === parseInt(DataClassObject.HighScoresLevel[GameMode][indexAdjusted]) )
            {
                greenBlue = 0;
            }
            else
            {
                greenBlue = 255;
            }

            DrawTextOntoCanvas(20, ""+index+".", 6, y, "left", 255, 255, 255, 0, 0, 0, 1);

            DrawTextOntoCanvas(20, DataClassObject.HighScoresName[GameMode][indexAdjusted], 36, y, "left", 255, greenBlue, greenBlue, 0, 0, 0, 1);

            if (GameMode === CrisisMode && DataClassObject.HighScoresLevel[GameMode][indexAdjusted] > 9)
        	    DrawTextOntoCanvas(20, "Won!", 500, y, "left", 255, greenBlue, greenBlue, 0, 0, 0, 1);
            else if (GameMode === FirefoxStoryMode && DataClassObject.HighScoresLevel[GameMode][indexAdjusted] > 29)
                DrawTextOntoCanvas(20, "Won!", 500, y, "left", 255, greenBlue, greenBlue, 0, 0, 0, 1);
            else
        	    DrawTextOntoCanvas(20, ""+DataClassObject.HighScoresLevel[GameMode][indexAdjusted]+"", 500, y, "left", 255, greenBlue, greenBlue, 0, 0, 0, 1);

            DrawTextOntoCanvas(20, ""+DataClassObject.HighScoresScore[GameMode][indexAdjusted]+"", 630, y, "left", 255, greenBlue, greenBlue, 0, 0, 0, 1);

            y+=32;
        }

        DrawTextOntoCanvas(25, "________________________________________________", 400, 424, "center", 255, 255, 0, 0, 0, 0, 1);
    }

    if (ScreensClassObject.ScreenFadeAlpha === .99 && ScreensClassObject.ScreenFadeStatus === 1)
    {
        InterfaceClassObject.CursorIsArrow = true;

        DestroyAllGUIArrowSets();
        DestroyAllButtons();
    }
}

//--------------------------------------------------------------------------------------------------------------
function SetupStaffTextsScreenY()
{
let screenY = 450;

    for (let index = 0; index < (VisualsClassObject.NumberOfPreloadedStaffTexts+1); index++)
    {
        VisualsClassObject.PreloadStaffTextsAlpha[index] = 1;
        
        if (VisualsClassObject.PreloadedStaffTextsBlue[index] === 0)
        {
            screenY+=(70+40);
            VisualsClassObject.PreloadedStaffTextsScreenY[index] = screenY;
        }
        else if (VisualsClassObject.PreloadedStaffTextsBlue[index] === 255)
        {
            screenY+=30;
            VisualsClassObject.PreloadedStaffTextsScreenY[index] = screenY;
        }

        VisualsClassObject.PreloadedStaffTextsScreenY[VisualsClassObject.NumberOfPreloadedStaffTexts]+=240;
    }
}

//--------------------------------------------------------------------------------------------------------------
function DisplayAboutScreen()
{
let index;

    if (ScreensClassObject.ScreenFadeAlpha === 1 && ScreensClassObject.ScreenFadeStatus === 0)
    {
		SetupStaffTextsScreenY();
        
        ScreensClassObject.FirefoxOneScreenX = 850;
        ScreensClassObject.FirefoxOneScreenY = 770;
        ScreensClassObject.FirefoxOneScale = 1;
        ScreensClassObject.FirefoxTwoScreenX = 850+275;
        ScreensClassObject.FirefoxTwoScreenY = 770+125;
        ScreensClassObject.FirefoxTwoScale = 1;
        ScreensClassObject.StaffFirefoxSceneTimer = 0;
    }

    if (ScreensClassObject.StaffFirefoxSceneTimer === 0)
    {
        if (ScreensClassObject.FirefoxOneScreenX > 330)
        {
            ScreensClassObject.FirefoxOneScreenX-=15;
            ScreensClassObject.FirefoxOneScreenY-=15;
            ScreensClassObject.FirefoxOneScale-=.02;

            ScreensClassObject.FirefoxTwoScreenX-=15;
            ScreensClassObject.FirefoxTwoScreenY-=15;
            ScreensClassObject.FirefoxTwoScale-=.005;
        }
        else  ScreensClassObject.StaffFirefoxSceneTimer = 1;

    }
    else if (ScreensClassObject.StaffFirefoxSceneTimer === 1)
    {
        let speedY = 1.25;
        if (InputClassObject.JoystickDirection[Any] === InputClassObject.UP)  speedY = (1.25*7);

        for (index = 0; index < (VisualsClassObject.NumberOfPreloadedStaffTexts+1); index++)
        {
            VisualsClassObject.PreloadedStaffTextsScreenY[index]-=speedY;
        }
        
        if (VisualsClassObject.PreloadedStaffTextsScreenY[VisualsClassObject.NumberOfPreloadedStaffTexts] < -30 || InputClassObject.JoystickButtonOne[Any] === true || InputClassObject.MouseButtonClicked === true || InputClassObject.KeyboardCharacterPressed === "_" || InputClassObject.KeyboardCharacterPressed === "/")
        {
            for (index = 0; index < (VisualsClassObject.NumberOfPreloadedStaffTexts+1); index++)
            {
                VisualsClassObject.PreloadStaffTextsAlpha[index]-=0.01;
            }   
        }
    }
    else if (ScreensClassObject.StaffFirefoxSceneTimer === 2)
    {
        if (ScreensClassObject.FirefoxOneScale > .011)
        {
            ScreensClassObject.FirefoxOneScreenX-=6;
            ScreensClassObject.FirefoxOneScreenY-=6;
            ScreensClassObject.FirefoxOneScale-=.011;
        }
        else  ScreensClassObject.FirefoxOneScale = 0;

        if (ScreensClassObject.FirefoxTwoScale > .013)
        {
            ScreensClassObject.FirefoxTwoScreenX-=7;
            ScreensClassObject.FirefoxTwoScreenY-=5;
            ScreensClassObject.FirefoxTwoScale-=.013;
        }
        else
        {
            ScreensClassObject.FirefoxTwoScale = 0;

            ScreensClassObject.StaffFirefoxSceneTimer = 3;

            ScreensClassObject.NextScreenToDisplay = 3;
            ScreensClassObject.ScreenFadeStatus = 1;
        }
    }

    if (VisualsClassObject.PreloadStaffTextsAlpha[0] < 1)
    {
        for (index = 0; index < (VisualsClassObject.NumberOfPreloadedStaffTexts+1); index++)
        {
            VisualsClassObject.PreloadStaffTextsAlpha[index]-=0.01;
        }
    }

    if (VisualsClassObject.PreloadStaffTextsAlpha[0] < 0.05)  ScreensClassObject.StaffFirefoxSceneTimer = 2;

//    if (ScreensClassObject.ScreenIsDirty === true)
    {
        DrawSpriteOntoCanvas(20, 400, 240, 1, 1, 0, 1, 255, 255, 255);
    
        DrawSpriteOntoCanvas(40, ScreensClassObject.FirefoxOneScreenX, ScreensClassObject.FirefoxOneScreenY, ScreensClassObject.FirefoxOneScale, ScreensClassObject.FirefoxOneScale, 0, 1, 255, 255, 255);
        DrawSpriteOntoCanvas(40, ScreensClassObject.FirefoxTwoScreenX, ScreensClassObject.FirefoxTwoScreenY, ScreensClassObject.FirefoxTwoScale, ScreensClassObject.FirefoxTwoScale, 0, 1, 255, 255, 255);
        
        if (ScreensClassObject.StaffFirefoxSceneTimer === 1)
        {
            DrawSpriteOntoCanvas(0, 400, 240, 1, 1, 0, .5, 255, 255, 255);

            DrawPreloadedStaffTextOntoCanvas(0, 570, VisualsClassObject.PreloadedStaffTextsScreenY[0]+50+40);
            for (index = 1; index < (VisualsClassObject.NumberOfPreloadedStaffTexts+1); index++)  DrawPreloadedStaffTextOntoCanvas(index, 400, VisualsClassObject.PreloadedStaffTextsScreenY[index]);
        }
    }

    if (ScreensClassObject.ScreenFadeAlpha === .99 && ScreensClassObject.ScreenFadeStatus === 1)
    {
        if (CrisisWon === true)
        {
            if (DataClassObject.NewHighScoreRank < 10)  ScreensClassObject.NextScreenToDisplay = 10;
            else  ScreensClassObject.NextScreenToDisplay = 6;
        }

        CrisisWon = false;

	    InterfaceClassObject.CursorIsArrow = true;
    }
}

//--------------------------------------------------------------------------------------------------------------
function CheckIfControllerUsed(index) {
    if (InputClassObject.GameControllerInitialized[index] === true) {
        for (let indexJoy = 0; indexJoy < 5; indexJoy++) {
            if ( PlayerInput[indexJoy] === (2+index) ) {
                return true;

            }
        }
    }

    return false;
}

//--------------------------------------------------------------------------------------------------------------
function DisplayPlayingGameScreen()
{
let player;
let boxScreenX;
let boxScreenY;
let y;
let x;

    if (ScreensClassObject.ScreenFadeAlpha === 1 && ScreensClassObject.ScreenFadeStatus === 0)
    {
        if (GameMode === CrisisMode)  PlayMusic(2);
        else  PlayMusic(1);

        SetupForNewGame();

        GameOverDisplayTimer = 150;

        PlayerInput[2] = InputClassObject.FirstHumanPlayerInput

        if (InitializeClassObject.Browser === "Mobile")  PlayerInput[2] = Mouse;
                
        if (InitializeClassObject.Browser !== "Mobile") {
            PlayerInput[0] = Mouse;

            if (PlayerInput[2] > 1 && PlayerInput[2] < 7)  PlayerInput[1] = Keyboard;

            for (let index = 0; index < 5; index++) {
                if (InputClassObject.GameControllerInitialized[index] === true){

                    if (CheckIfControllerUsed(index) === false && PlayerInput[1] === CPU){
                        PlayerInput[1] = JoystickOne+index;
                    }
                    else if (CheckIfControllerUsed(index) === false && PlayerInput[3] === CPU){
                        PlayerInput[3] = JoystickOne+index;
                    }
                    else if (CheckIfControllerUsed(index) === false && PlayerInput[4] === CPU){
                        PlayerInput[4] = JoystickOne+index;
                    }
                    else if (CheckIfControllerUsed(index) === false && PlayerInput[0] === Mouse){
                        PlayerInput[0] = JoystickOne+index;
                    }
                    else if (CheckIfControllerUsed(index) === false && PlayerInput[1] === Keyboard){
                        PlayerInput[1] = JoystickOne+index;
                    }
                }
            }
        }

        if (InterfaceClassObject.UseOnscreenGamepad === true)  CreateGamepad(0, 75+25, 480-75-25);
    }
    
    if (PAUSEgame === false)
    {
        RunTetriGameEngine();

        if (InterfaceClassObject.UseOnscreenGamepad === true)  ProcessAllGamepad();
    }

    if (InputClassObject.KeyboardCharacterPressed === "_" && PlayerStatus[2] !== GameOver && InputClassObject.KeyboardSpaceBarFunction === 0)
    {
        if (PAUSEgame === false)
        {
            PAUSEgame = true;
            AudioClassObject.MusicArray[0].pause();
        }
        else
        {
            PAUSEgame = false;
            AudioClassObject.MusicArray[0].play();
        }

        PlaySoundEffect(0);
    }
    else if (InputClassObject.KeyboardCharacterPressed === "p" && PlayerStatus[2] !== GameOver && InputClassObject.KeyboardSpaceBarFunction === 1)
    {
        if (PAUSEgame === false)
        {
            PAUSEgame = true;
            AudioClassObject.MusicArray[0].pause();
        }
        else
        {
            PAUSEgame = false;
            AudioClassObject.MusicArray[0].play();
        }

        PlaySoundEffect(0);
    }

    for (player = 0; player < NumberOfPlayers; player++)
    {
        Player = player;

        if (PlayerStatus[Player] !== FlashingCompletedLines && PlayerStatus[Player] !== ClearingCompletedLines)
        {
            DeletePieceFromPlayfieldMemory(Current);
            AddPieceToPlayfieldMemory(DropShadow);
            AddPieceToPlayfieldMemory(Current);
        }
    }

    ScreensClassObject.ScreenIsDirty = true;
    if (ScreensClassObject.ScreenIsDirty === true)
    {
        GameDisplayChanged = false;
        
        DrawSpriteOntoCanvas(20, 400, 240, 1, 1, 0, 1, 255, 255, 255);

        DrawSpriteOntoCanvas(50 , PlayersPlayfieldScreenX[0], PlayersPlayfieldScreenY[0], 1, 1, 0, 1, 100, 255, 255);
        DrawSpriteOntoCanvas(49 , PlayersPlayfieldScreenX[0], PlayersPlayfieldScreenY[0], 1, 1, 0, .75, 255, 255, 255);
        DrawSpriteOntoCanvas(50 , PlayersPlayfieldScreenX[1], PlayersPlayfieldScreenY[1], 1, 1, 0, 1, 100, 100, 255);
        DrawSpriteOntoCanvas(49 , PlayersPlayfieldScreenX[1], PlayersPlayfieldScreenY[1], 1, 1, 0, .75, 255, 255, 255);
        DrawSpriteOntoCanvas(50 , PlayersPlayfieldScreenX[2], PlayersPlayfieldScreenY[2], 1, 1, 0, 1, 255, 100, 255);
        DrawSpriteOntoCanvas(49 , PlayersPlayfieldScreenX[2], PlayersPlayfieldScreenY[2], 1, 1, 0, .75, 255, 255, 255);
        DrawSpriteOntoCanvas(50 , PlayersPlayfieldScreenX[3], PlayersPlayfieldScreenY[3], 1, 1, 0, 1, 255, 255, 100);
        DrawSpriteOntoCanvas(49 , PlayersPlayfieldScreenX[3], PlayersPlayfieldScreenY[3], 1, 1, 0, .75, 255, 255, 255);
        DrawSpriteOntoCanvas(50 , PlayersPlayfieldScreenX[4], PlayersPlayfieldScreenY[4], 1, 1, 0, 1, 100, 255, 100);
        DrawSpriteOntoCanvas(49 , PlayersPlayfieldScreenX[4], PlayersPlayfieldScreenY[4], 1, 1, 0, .75, 255, 255, 255);

        for (player = 0; player < NumberOfPlayers; player++)
        {
            DrawTextOntoCanvas(20, ""+Score[player]+"", PlayersPlayfieldScreenX[player], 25, "center", 255, 255, 255, 0, 0, 0, 0);
            DrawTextOntoCanvas(12, ""+Lines[player]+"", PlayersPlayfieldScreenX[player]-59, 75, "center", 255, 255, 255, 0, 0, 0, 0);
            DrawTextOntoCanvas(12, ""+Level[player]+"", PlayersPlayfieldScreenX[player]+59, 75, "center", 255, 255, 255, 0, 0, 0, 0);

            if (PlayerInput[player] === Keyboard)
                DrawTextOntoCanvas(20, "Keyboard", PlayersPlayfieldScreenX[player], 475, "center", 255, 255, 255, 0, 0, 0, 0);
            else if (PlayerInput[player] === Mouse) {
                if (InitializeClassObject.Browser !== "Mobile") DrawTextOntoCanvas(20, "Mouse", PlayersPlayfieldScreenX[player], 475, "center", 255, 255, 255, 0, 0, 0, 0);
                else DrawTextOntoCanvas(20, "Touch", PlayersPlayfieldScreenX[player], 475, "center", 255, 255, 255, 0, 0, 0, 0);
            }
            else if (PlayerInput[player] === CPU)
                DrawTextOntoCanvas(20, "C.P.U.", PlayersPlayfieldScreenX[player], 475, "center", 255, 255, 255, 0, 0, 0, 0);
            else
                DrawTextOntoCanvas(20, "Gamepad", PlayersPlayfieldScreenX[player], 475, "center", 255, 255, 255, 0, 0, 0, 0);
            
            boxScreenX = PlayersPlayfieldScreenX[player]-59;
            boxScreenY = PlayersPlayfieldScreenY[player]-212;
            for (y = 0; y < 26; y++)
            {
                for (x = 2; x < 12; x++)
                {
                    if (Playfield[player][x][y] === 1)
                    {
                            DrawSpriteOntoCanvas(61, boxScreenX, boxScreenY, 1, 1, 0, .5, 255, 255, 255);
                    }
                    else if (Playfield[player][x][y] > 10 && Playfield[player][x][y] < 20)
                    {
                            DrawSpriteOntoCanvas(51+Playfield[player][x][y], boxScreenX, boxScreenY, 1, 1, 0, 1, 255, 255, 255);
                    }
                    else if (Playfield[player][x][y] > 20 && Playfield[player][x][y] < 30)
                    {
                            DrawSpriteOntoCanvas(61, boxScreenX, boxScreenY, 1, 1, 0, 1, 255, 255, 255);
                    }

                    boxScreenX+=13;
                }

                boxScreenX = PlayersPlayfieldScreenX[player]-59;
                boxScreenY+=18;
            }
            
            if (InitializeClassObject.Browser !== "Mobile" && InterfaceClassObject.UseOnscreenGamepad === false && PlayerInput[player] === Mouse && PlayerStatus[player] === PieceFalling)
            {
                boxScreenX = PlayersPlayfieldScreenX[player]-59;
                boxScreenY = PlayersPlayfieldScreenY[player]-212;
                for (y = 0; y < 26; y++)
                {
                    for (x = 2; x < 12; x++)
                    {
                        let offsetX = 0;
                        let offsetY = 0;
                        for (let boxIndex = 1; boxIndex < 17; boxIndex++)
                        {
                            if ( PieceData [ Piece[player] ] [ PieceRotation[player] ] [boxIndex] === 1
                            && MouseMovePlayfieldX+offsetX === x && MouseMovePlayfieldY+offsetY === y )
                                if (MouseMovePlayfieldY >= PiecePlayfieldY[player])
                                    DrawSpriteOntoCanvas(61, boxScreenX, boxScreenY, 1, 1, 0, .5, 255, 255, 255);
                    
                            offsetX++;
                            if (offsetX > 3)
                            {
                                offsetX = 0;
                                offsetY++;
                            }
                        }

                        boxScreenX+=13;
                    }

                    boxScreenX = PlayersPlayfieldScreenX[player]-59;
                    boxScreenY+=18;
                }
            
                if ( (MouseMovePlayfieldY < PiecePlayfieldY[player]) || (PiecePlayfieldX[player] === MouseMovePlayfieldX && PiecePlayfieldY[player] === MouseMovePlayfieldY) )
                    DrawTextOntoCanvas(12, "Rotate", PieceMouseScreenX+13, PieceMouseScreenY-18, "center", 255, 255, 255, 0, 0, 0, 0);
                else
                    DrawTextOntoCanvas(12, "Move", PieceMouseScreenX+13, PieceMouseScreenY-18, "center", 255, 255, 255, 0, 0, 0, 0);
            }
        }

        if (GameMode === CrisisMode && Level[2] > 6)
        {
            for (player = 0; player < NumberOfPlayers; player++)
            {
                DrawSpriteOntoCanvas(80 , PlayersPlayfieldScreenX[player], PlayersPlayfieldScreenY[player], 1, 1, 0, .75, 255, 255, 255);
            }
        }

        for (player = 0; player < NumberOfPlayers; player++)
        {
            if (BlockAttackTransparency[player] > 0)  
                DrawSpriteOntoCanvas(70 , PlayersPlayfieldScreenX[player], PlayersPlayfieldScreenY[player], 1, 1, 0, BlockAttackTransparency[player], 255, 255, 255);
            
            if (GameMode === TimeAttack30Mode || GameMode === TimeAttack60Mode || GameMode === TimeAttack120Mode)
            {
                let taTimer = (TimeAttackTimer / 200);
                taTimer = Math.floor(taTimer);
                DrawTextOntoCanvas(12, ""+taTimer+"", PlayersPlayfieldScreenX[player], 454, "center", 255, 255, 255, 0, 0, 0, 1);
            }
            else if (GameMode === TwentyLineChallengeMode)
            {
                DrawTextOntoCanvas(12, ""+TwentyLineCounter[player]+"", PlayersPlayfieldScreenX[player], 454, "center", 255, 255, 255, 0, 0, 0, 1);
            }
        }

        let mouseInputAvailable = true;

        for (player = 0; player < 5; player++)
        {
            if (player !== 2 && PlayerStatus[player] === GameOver)
            {
                DrawSpriteOntoCanvas(49 , PlayersPlayfieldScreenX[player], PlayersPlayfieldScreenY[player], 1, 1, 0, .75, 255, 255, 255);

                if (PlayersCanJoin === true)
                {
                    if (PlayerInput[player] === Keyboard && InitializeClassObject.Browser !== "Mobile")
                    {
                        DrawTextOntoCanvas(25, "Keyboard", PlayersPlayfieldScreenX[player], 260-15, "center", 255, 255, 255, 0, 0, 0, 0);
                        DrawTextOntoCanvas(25, "Join In!", PlayersPlayfieldScreenX[player], 260+15, "center", 255, 255, 255, 0, 0, 0, 0);
                        DrawTextOntoCanvas(25, "(Press [z])", PlayersPlayfieldScreenX[player], 260+45, "center", 255, 255, 255, 0, 0, 0, 0);

                        if (InputClassObject.JoystickButtonOne[Keyboard] === true)
                        {
                            PlayerStatus[player] = NewPieceDropping;
                        }
                    }
                    else if (PlayerInput[player] === Mouse && mouseInputAvailable === true && MousePlaying === false && InitializeClassObject.Browser !== "Mobile")
                    {
                        DrawTextOntoCanvas(25, "Mouse", PlayersPlayfieldScreenX[player], 260-15, "center", 255, 255, 255, 0, 0, 0, 0);
                        DrawTextOntoCanvas(25, "Join In!", PlayersPlayfieldScreenX[player], 260+15, "center", 255, 255, 255, 0, 0, 0, 0);

                        mouseInputAvailable = false;

                        if (  InputClassObject.MouseTouchY > ( (PlayersPlayfieldScreenY[player])-230 ) && InputClassObject.MouseTouchY < ( (PlayersPlayfieldScreenY[player])+230 )
                            && InputClassObject.MouseTouchX > ( (PlayersPlayfieldScreenX[player])-80 ) && InputClassObject.MouseTouchX < ( (PlayersPlayfieldScreenX[player])+80 )  )
                        {
                            if (InputClassObject.MouseButtonClicked === true && MousePlaying === false)
                            {
                                PlayerStatus[player] = NewPieceDropping;

                                MousePlaying = true;
                            }
                        }
                    }
                    else if (PlayerInput[player] > 1 && PlayerInput[player] < 7)
                    {
                        DrawTextOntoCanvas(25, "Gamepad", PlayersPlayfieldScreenX[player], 260-15, "center", 255, 255, 255, 0, 0, 0, 0);
                        DrawTextOntoCanvas(25, "Join In!", PlayersPlayfieldScreenX[player], 260+15, "center", 255, 255, 255, 0, 0, 0, 0);

                        for (let gamepadIndex = 0; gamepadIndex < 5; gamepadIndex++)
                        {
                            if (InputClassObject.JoystickButtonOne[PlayerInput[player]] === true)
                            {
                                PlayerStatus[player] = NewPieceDropping;
                            }
                        }
                    }
                }
                else  DrawTextOntoCanvas(25, "Game Over!", PlayersPlayfieldScreenX[player], 260, "center", 255, 255, 255, 0, 0, 0, 0);
            }
        }

        if (PlayerStatus[2] === GameOver)  DrawTextOntoCanvas(25, "Game Over!", PlayersPlayfieldScreenX[2], 260, "center", 255, 255, 255, 0, 0, 0, 0);

        let humanStillPlaying = false;
        if (PlayerInput[0] !== CPU && PlayerStatus[0] !== GameOver)  humanStillPlaying = true;
        if (PlayerInput[1] !== CPU && PlayerStatus[1] !== GameOver)  humanStillPlaying = true;
        if (PlayerInput[2] !== CPU && PlayerStatus[2] !== GameOver)  humanStillPlaying = true;
        if (PlayerInput[3] !== CPU && PlayerStatus[3] !== GameOver)  humanStillPlaying = true;
        if (PlayerInput[4] !== CPU && PlayerStatus[4] !== GameOver)  humanStillPlaying = true;
        if (humanStillPlaying === false)
        {
            if (GameOverDisplayTimer > -1)
            {
                GameOverDisplayTimer--;
            }
            else
            {
                ScreensClassObject.NextScreenToDisplay = 3;
                ScreensClassObject.ScreenFadeStatus = 1;
            }
        }
     
        if (PAUSEgame === true && ScreensClassObject.DEBUG === false && InputClassObject.KeyboardSpaceBarFunction === 0)
        {
            DrawSpriteOntoCanvas(0, 400, 240, 1, 1, 0, .75, 255, 255, 255);
            
            DrawTextOntoCanvas(55, "P A U S E D", PlayersPlayfieldScreenX[2], 270, "center", 255, 255, 255, 0, 0, 0, 0);
            DrawTextOntoCanvas(25, "Press [SpaceBar] On Keyboard To Continue!", PlayersPlayfieldScreenX[2], 300, "center", 255, 255, 255, 0, 0, 0, 0);
        }
        else if (PAUSEgame === true && ScreensClassObject.DEBUG === false && InputClassObject.KeyboardSpaceBarFunction === 1)
        {
            DrawSpriteOntoCanvas(0, 400, 240, 1, 1, 0, .75, 255, 255, 255);
            
            DrawTextOntoCanvas(55, "P A U S E D", PlayersPlayfieldScreenX[2], 270, "center", 255, 255, 255, 0, 0, 0, 0);
            DrawTextOntoCanvas(25, "Press [P] On Keyboard To Continue!", PlayersPlayfieldScreenX[2], 300, "center", 255, 255, 255, 0, 0, 0, 0);
        }
    }

    for (player = 0; player < NumberOfPlayers; player++)
    {
        Player = player;

        if (PlayerStatus[Player] !== FlashingCompletedLines && PlayerStatus[Player] !== ClearingCompletedLines)
        {
            DeletePieceFromPlayfieldMemory(Current);
            DeletePieceFromPlayfieldMemory(DropShadow);
        }
    }

    let allPlayersAreDead = true;
    for (player = 0; player < NumberOfPlayers; player++)
    {
        if (PlayerStatus[player] !== GameOver)  allPlayersAreDead = false;
    }

    if (ScreensClassObject.ScreenFadeAlpha === .99 && ScreensClassObject.ScreenFadeStatus === 1)
    {
        ThinkRussianTimer = 0;
        
        PlayMusic(0);

        if (InputClassObject.GameWasQuit !== true) {
            CheckForNewHighScores();

            if (CrisisWon === true) {
                PlayMusic(5);
                ScreensClassObject.NextScreenToDisplay = 7;
            } else if (DataClassObject.NewHighScoreRank < 10) ScreensClassObject.NextScreenToDisplay = 10;
            else ScreensClassObject.NextScreenToDisplay = 6;
        }
        else  ScreensClassObject.NextScreenToDisplay = 3;
    }
}

//--------------------------------------------------------------------------------------------------------------
function DisplayPlayingStoryGameScreen()
{
let player;

    if (ScreensClassObject.ScreenFadeAlpha === 1 && ScreensClassObject.ScreenFadeStatus === 0)
    {
        SetupForNewGame();

        if (InitializeClassObject.Browser === "Mobile") {
            PlayerInput[4] = Mouse;
        }
        else  PlayerInput[4] = InputClassObject.FirstHumanPlayerInput;

        FirefoxStoryModeStarted = true;

        PlayMusic(3);

        if (InterfaceClassObject.UseOnscreenGamepad === true)  CreateGamepad(0, 75+25, 480-75-25);
    }

    if (PAUSEgame === false){
        RunTetriGameEngine();

        if (InterfaceClassObject.UseOnscreenGamepad === true)  ProcessAllGamepad();
    }

    if (InputClassObject.KeyboardCharacterPressed === "_" && PlayerStatus[0] !== GameOver && InputClassObject.KeyboardSpaceBarFunction === 0)
    {
        if (PAUSEgame === false)
        {
            PAUSEgame = true;
            AudioClassObject.MusicArray[0].pause();
        }
        else
        {
            PAUSEgame = false;
            AudioClassObject.MusicArray[0].play();
        }

        PlaySoundEffect(0);
    }
    else if (InputClassObject.KeyboardCharacterPressed === "p" && PlayerStatus[0] !== GameOver && InputClassObject.KeyboardSpaceBarFunction === 1)
    {
        if (PAUSEgame === false)
        {
            PAUSEgame = true;
            AudioClassObject.MusicArray[0].pause();
        }
        else
        {
            PAUSEgame = false;
            AudioClassObject.MusicArray[0].play();
        }

        PlaySoundEffect(0);
    }

    for (player = 0; player < NumberOfPlayers; player++)
    {
        Player = player;

        if (PlayerStatus[Player] !== FlashingCompletedLines && PlayerStatus[Player] !== ClearingCompletedLines)
        {
            DeletePieceFromPlayfieldMemory(Current);
            AddPieceToPlayfieldMemory(DropShadow);
            AddPieceToPlayfieldMemory(Current);
        }
    }

    ScreensClassObject.ScreenIsDirty = true;
    if (ScreensClassObject.ScreenIsDirty === true)
    {
        GameDisplayChanged = false;

        PlayersPlayfieldScreenX[0] = 290;
        PlayersPlayfieldScreenX[4] = 800-290;

        DrawSpriteOntoCanvas(20, 400, 240, 1, 1, 0, 1, 255, 255, 255);

        DrawSpriteOntoCanvas(50 , PlayersPlayfieldScreenX[0], PlayersPlayfieldScreenY[0], 1, 1, 0, 1, 255, 255, 255);
        DrawSpriteOntoCanvas(49 , PlayersPlayfieldScreenX[0], PlayersPlayfieldScreenY[0], 1, 1, 0, .75, 255, 255, 255);

        DrawSpriteOntoCanvas(50 , PlayersPlayfieldScreenX[4], PlayersPlayfieldScreenY[4], 1, 1, 0, 1, 255, 255, 255);
        DrawSpriteOntoCanvas(49 , PlayersPlayfieldScreenX[4], PlayersPlayfieldScreenY[4], 1, 1, 0, .75, 255, 255, 255);

        DrawSpriteOntoCanvas(90 , 800-105, 240-35, 1, 1, 0, 1, 255, 255, 255);
        DrawSpriteOntoCanvas(91 , 105, 240-35, 1, 1, 0, 1, 255, 255, 255);

        for (player = 0; player < NumberOfPlayers; player+=4)
        {
            DrawTextOntoCanvas(20, ""+Score[player]+"", PlayersPlayfieldScreenX[player], 25, "center", 255, 255, 255, 0, 0, 0, 0);
            DrawTextOntoCanvas(12, ""+Lines[player]+"", PlayersPlayfieldScreenX[player]-59, 75, "center", 255, 255, 255, 0, 0, 0, 0);
            DrawTextOntoCanvas(12, ""+Level[player]+"", PlayersPlayfieldScreenX[player]+59, 75, "center", 255, 255, 255, 0, 0, 0, 0);

            if (PlayerInput[player] === Keyboard)
                DrawTextOntoCanvas(20, "Keyboard", PlayersPlayfieldScreenX[player], 475, "center", 255, 255, 255, 0, 0, 0, 0);
            else if (PlayerInput[player] === Mouse) {
                if (InitializeClassObject.Browser !== "Mobile") DrawTextOntoCanvas(20, "Mouse", PlayersPlayfieldScreenX[player], 475, "center", 255, 255, 255, 0, 0, 0, 0);
                else DrawTextOntoCanvas(20, "Touch", PlayersPlayfieldScreenX[player], 475, "center", 255, 255, 255, 0, 0, 0, 0);
            }
            else if (PlayerInput[player] === CPU)
                DrawTextOntoCanvas(20, "C.P.U.", PlayersPlayfieldScreenX[player], 475, "center", 255, 255, 255, 0, 0, 0, 0);
            else
                DrawTextOntoCanvas(20, "Gamepad", PlayersPlayfieldScreenX[player], 475, "center", 255, 255, 255, 0, 0, 0, 0);

            let boxScreenX = PlayersPlayfieldScreenX[player]-59;
            let boxScreenY = PlayersPlayfieldScreenY[player]-212;
            for (let y = 0; y < 26; y++)
            {
                for (let x = 2; x < 12; x++)
                {
                    if (Playfield[player][x][y] === 1)
                    {
                            DrawSpriteOntoCanvas(61, boxScreenX, boxScreenY, 1, 1, 0, .5, 255, 255, 255);
                    }
                    else if (Playfield[player][x][y] > 10 && Playfield[player][x][y] < 20)
                    {
                            DrawSpriteOntoCanvas(51+Playfield[player][x][y], boxScreenX, boxScreenY, 1, 1, 0, 1, 255, 255, 255);
                    }
                    else if (Playfield[player][x][y] > 20 && Playfield[player][x][y] < 30)
                    {
                            DrawSpriteOntoCanvas(61, boxScreenX, boxScreenY, 1, 1, 0, 1, 255, 255, 255);
                    }

                    boxScreenX+=13;
                }

                boxScreenX = PlayersPlayfieldScreenX[player]-59;
                boxScreenY+=18;
            }
        }

        for (player = 0; player < NumberOfPlayers; player+=4)
        {
            if (BlockAttackTransparency[player] > 0)
                DrawSpriteOntoCanvas(70 , PlayersPlayfieldScreenX[player], PlayersPlayfieldScreenY[player], 1, 1, 0, BlockAttackTransparency[player], 255, 255, 255);

            if (GameMode === TimeAttack30Mode || GameMode === TimeAttack60Mode || GameMode === TimeAttack120Mode)
            {
                let taTimer = (TimeAttackTimer / 200);
                taTimer = Math.floor(taTimer);
                DrawTextOntoCanvas(12, ""+taTimer+"", PlayersPlayfieldScreenX[player], 454, "center", 255, 255, 255, 0, 0, 0, 1);
            }
            else if (GameMode === TwentyLineChallengeMode)
            {
                DrawTextOntoCanvas(12, ""+TwentyLineCounter[player]+"", PlayersPlayfieldScreenX[player], 454, "center", 255, 255, 255, 0, 0, 0, 1);
            }
        }

        for (player = 0; player < NumberOfPlayers; player+=4)
        {
            if (PlayerStatus[player] === GameOver)
            {

                DrawSpriteOntoCanvas(49 , PlayersPlayfieldScreenX[player], PlayersPlayfieldScreenY[player], 1, 1, 0, .75, 255, 255, 255);

                DrawTextOntoCanvas(25, "Game Over!", PlayersPlayfieldScreenX[player], 260, "center", 255, 255, 255, 0, 0, 0, 0);
            }
        }

        DrawTextOntoCanvas(12, ""+TwentyLineCounter[4]+"", PlayersPlayfieldScreenX[4], 454, "center", 255, 255, 255, 0, 0, 0, 1);

        if (PlayerStatus[4] === GameOver)
            if (GameOverDisplayTimer === -1)
                GameOverDisplayTimer = 100;

        if (PAUSEgame === true && ScreensClassObject.DEBUG === false && InputClassObject.KeyboardSpaceBarFunction === 0)
        {
            DrawSpriteOntoCanvas(0, 400, 240, 1, 1, 0, .75, 255, 255, 255);

            DrawTextOntoCanvas(55, "P A U S E D", PlayersPlayfieldScreenX[2], 270, "center", 255, 255, 255, 0, 0, 0, 0);
            DrawTextOntoCanvas(25, "Press [SpaceBar] On Keyboard To Continue!", PlayersPlayfieldScreenX[2], 300, "center", 255, 255, 255, 0, 0, 0, 0);
        }
        else if (PAUSEgame === true && ScreensClassObject.DEBUG === false && InputClassObject.KeyboardSpaceBarFunction === 1)
        {
            DrawSpriteOntoCanvas(0, 400, 240, 1, 1, 0, .75, 255, 255, 255);

            DrawTextOntoCanvas(55, "P A U S E D", PlayersPlayfieldScreenX[2], 270, "center", 255, 255, 255, 0, 0, 0, 0);
            DrawTextOntoCanvas(25, "Press [P] On Keyboard To Continue!", PlayersPlayfieldScreenX[2], 300, "center", 255, 255, 255, 0, 0, 0, 0);
        }
    }

    for (player = 0; player < NumberOfPlayers; player+=4)
    {
        Player = player;

        if (PlayerStatus[Player] !== FlashingCompletedLines && PlayerStatus[Player] !== ClearingCompletedLines)
        {
            DeletePieceFromPlayfieldMemory(Current);
            DeletePieceFromPlayfieldMemory(DropShadow);
        }
    }

    let allPlayersAreDead = true;
    for (player = 0; player < NumberOfPlayers; player++)
    {
        if (PlayerStatus[player] !== GameOver)  allPlayersAreDead = false;
    }

    if (allPlayersAreDead === true && GameOverDisplayTimer === -1)
    {
        GameOverDisplayTimer = 100;
    }
    else if (GameOverDisplayTimer > 1)
    {
        GameOverDisplayTimer--;
    }
    else if (GameOverDisplayTimer === 1)
    {
        ScreensClassObject.ScreenFadeStatus = 1;
        GameOverDisplayTimer = 0;
    }

    if (ScreensClassObject.ScreenFadeAlpha === .99 && ScreensClassObject.ScreenFadeStatus === 1)
    {
        if (InputClassObject.GameWasQuit !== true)
        {
            if (PlayerStatus[4] !== GameOver)
            {
                if (Level[0] === 5 || Level[0] === 10 || Level[0] === 15 || Level[0] === 20 || Level[0] === 25 || Level[0] === 30)
                    ScreensClassObject.NextScreenToDisplay = 11;

                if (Level[0] === 30)
                {
                    PlayerStatus[0] = GameOver;
                    PlayerStatus[4] = GameOver;

                    Level[0] = 31;

                    CrisisWon = true;
                }
            }
            else
            {
                Score[2] = Score[0];
                Level[2] = Level[0];
                Lines[2] = Lines[0];

                CheckForNewHighScores();
                if (DataClassObject.NewHighScoreRank < 10)  ScreensClassObject.NextScreenToDisplay = 10;
                else  ScreensClassObject.NextScreenToDisplay = 6;

                PlayMusic(0);
            }
        }
        else
        {
            ScreensClassObject.NextScreenToDisplay = 3;
            PlayMusic(0);

        }
    }
}

//--------------------------------------------------------------------------------------------------------------
function DisplayNewHighScoreNameInputScreen()
{
let screenX;
let index;

    if (ScreensClassObject.ScreenFadeAlpha === 1 && ScreensClassObject.ScreenFadeStatus === 0)
    {
        CreateGUIButton(5, 400, 455);

        DataClassObject.NewHighScoreNameIndex = 0;
        DataClassObject.NewHighScoreTempName = " ";

        DataClassObject.NewHighScoreCharX = 1;
        DataClassObject.NewHighScoreCharY = 0;

        InputClassObject.HighScoreJoyCharIndex = 1;

        //let screenXfix = 30;

        let offsetX = 61;
        screenX = 33;//+screenXfix
        let offsetY = 50;
        let screenY = 200-10;
        for (index = 1; index < 14; index++) // A-M
        {
            InterfaceClassObject.NewHighScoreCharButtonScreenX[index] = screenX;
            InterfaceClassObject.NewHighScoreCharButtonScreenY[index] = screenY;

            screenX+=offsetX;
        }

        screenX = 33;//+screenXfix;
        screenY += offsetY;
        for (index = 14; index < 27; index++) // N-Z
        {
            InterfaceClassObject.NewHighScoreCharButtonScreenX[index] = screenX;
            InterfaceClassObject.NewHighScoreCharButtonScreenY[index] = screenY;

            screenX+=offsetX;
        }

        screenX = 33;//+screenXfix;
        screenY += offsetY;
        for (index = 27; index < 40; index++) // a-m
        {
            InterfaceClassObject.NewHighScoreCharButtonScreenX[index] = screenX;
            InterfaceClassObject.NewHighScoreCharButtonScreenY[index] = screenY;

            screenX+=offsetX;
        }

        screenX = 33;//+screenXfix;
        screenY += offsetY;
        for (index = 40; index < 53; index++) // n-z
        {
            InterfaceClassObject.NewHighScoreCharButtonScreenX[index] = screenX;
            InterfaceClassObject.NewHighScoreCharButtonScreenY[index] = screenY;

            screenX+=offsetX;
        }

        screenX = 33;//+screenXfix;
        screenY += offsetY;
        for (index = 53; index < 66; index++) // 0-9
        {
            InterfaceClassObject.NewHighScoreCharButtonScreenX[index] = screenX;
            InterfaceClassObject.NewHighScoreCharButtonScreenY[index] = screenY;

            screenX+=offsetX;
        }

        for (index = 0; index < 66; index++)
        {
            InterfaceClassObject.NewHighScoreCharButtonScale[index] = 1;
            InterfaceClassObject.NewHighScoreCharButtonGreenHue[index] = 255;
        }

        if (InitializeClassObject.Browser === "Desktop")
        {
            if (PlayerInput[DataClassObject.PlayerWithHighestScore] === Keyboard || PlayerInput[DataClassObject.PlayerWithHighestScore] === Mouse)
            {
                InputClassObject.HighScoreNameInputDevice = InputClassObject.HighScoreUseKeyboardAndMouse;
            }
            else
            {
                InputClassObject.HighScoreNameInputDevice = -1;
                InterfaceClassObject.NewHighScoreCharButtonGreenHue[InputClassObject.HighScoreJoyCharIndex] = 150;
            }
        }
        else if (InitializeClassObject.Browser === "Mobile")
        {
            InputClassObject.HighScoreNameInputDevice = InputClassObject.HighScoreUseKeyboardAndMouse;
        }
    }

    InterfaceClassObject.CursorIsArrow = MouseOnGUI() !== true;

    if (PlayerInput[DataClassObject.PlayerWithHighestScore] !== Keyboard && PlayerInput[DataClassObject.PlayerWithHighestScore] !== Mouse)
    {
        if (InputClassObject.JoystickDirection[ PlayerInput[DataClassObject.PlayerWithHighestScore] ] === InputClassObject.UP)
        {
            InterfaceClassObject.NewHighScoreCharButtonGreenHue[InputClassObject.HighScoreJoyCharIndex] = 255;

            if (DataClassObject.NewHighScoreCharY > 0) DataClassObject.NewHighScoreCharY--;
            else  DataClassObject.NewHighScoreCharY = 5;

            PlaySoundEffect(1);

            InputClassObject.DelayAllUserInput = 10;

            ScreensClassObject.ScreenIsDirty = true;
        }
        else if (InputClassObject.JoystickDirection[ PlayerInput[DataClassObject.PlayerWithHighestScore] ] === InputClassObject.DOWN)
        {
            InterfaceClassObject.NewHighScoreCharButtonGreenHue[InputClassObject.HighScoreJoyCharIndex] = 255;

            if (DataClassObject.NewHighScoreCharY < 5) DataClassObject.NewHighScoreCharY++;
            else  DataClassObject.NewHighScoreCharY = 0;

            PlaySoundEffect(1);

            InputClassObject.DelayAllUserInput = 10;

            ScreensClassObject.ScreenIsDirty = true;
        }
        else if (InputClassObject.JoystickDirection[ PlayerInput[DataClassObject.PlayerWithHighestScore] ] === InputClassObject.LEFT)
        {
            InterfaceClassObject.NewHighScoreCharButtonGreenHue[InputClassObject.HighScoreJoyCharIndex] = 255;

            if (DataClassObject.NewHighScoreCharX > 1) DataClassObject.NewHighScoreCharX--;
            else  DataClassObject.NewHighScoreCharX = 13;

            PlaySoundEffect(1);

            InputClassObject.DelayAllUserInput = 10;

            ScreensClassObject.ScreenIsDirty = true;
        }
        else if (InputClassObject.JoystickDirection[ PlayerInput[DataClassObject.PlayerWithHighestScore] ] === InputClassObject.RIGHT)
        {
            InterfaceClassObject.NewHighScoreCharButtonGreenHue[InputClassObject.HighScoreJoyCharIndex] = 255;

            if (DataClassObject.NewHighScoreCharX < 13) DataClassObject.NewHighScoreCharX++;
            else  DataClassObject.NewHighScoreCharX = 1;

            PlaySoundEffect(1);

            InputClassObject.DelayAllUserInput = 10;

            ScreensClassObject.ScreenIsDirty = true;
        }

        InputClassObject.HighScoreJoyCharIndex = ( DataClassObject.NewHighScoreCharX + (13 * DataClassObject.NewHighScoreCharY) );

        if (DataClassObject.NewHighScoreCharY === 5)  InputClassObject.HighScoreJoyCharIndex = 66;

        InterfaceClassObject.NewHighScoreCharButtonGreenHue[InputClassObject.HighScoreJoyCharIndex] = 150;


        if (InputClassObject.JoystickButtonOne[ PlayerInput[DataClassObject.PlayerWithHighestScore] ] === true)
        {
            if (DataClassObject.NewHighScoreCharY < 5) {
                InterfaceClassObject.NewHighScoreCharButtonScale[InputClassObject.HighScoreJoyCharIndex] = 0.75;

                PlaySoundEffect(1);

                InputClassObject.DelayAllUserInput = 10;

                ScreensClassObject.ScreenIsDirty = true;
            }
            else {
                InterfaceClassObject.ButtonThatWasSelected = 0;
                InterfaceClassObject.ButtonSelectedAnimationTimer = 10;
                InterfaceClassObject.ButtonSelectedByKeyboard = 0;
            }
        }
    }

    if (InputClassObject.HighScoreNameInputDevice > InputClassObject.HighScoreUseKeyboard)
    {
        for (index = 1; index < 67; index++)
        {
            if ( InputClassObject.MouseTouchY > (InterfaceClassObject.NewHighScoreCharButtonScreenY[index]-24)
            && InputClassObject.MouseTouchY < (InterfaceClassObject.NewHighScoreCharButtonScreenY[index]+24)
            && InputClassObject.MouseTouchX > (InterfaceClassObject.NewHighScoreCharButtonScreenX[index]-29)
            && InputClassObject.MouseTouchX < (InterfaceClassObject.NewHighScoreCharButtonScreenX[index]+29) )
            {
                InterfaceClassObject.CursorIsArrow = false;

                if (InputClassObject.MouseButtonClicked === true)
                {
                    InterfaceClassObject.NewHighScoreCharButtonScale[index] = 0.75;

                    PlaySoundEffect(0);
                    ScreensClassObject.ScreenIsDirty = true;
                }
            }
        }
    }

    for (index = 0; index < 67; index++)
    {
        if (InterfaceClassObject.NewHighScoreCharButtonScale[index] < 0.95)  InterfaceClassObject.NewHighScoreCharButtonScale[index]+=0.05;
        else if (InterfaceClassObject.NewHighScoreCharButtonScale[index] < 1)
        {
            if (index === 66)  ScreensClassObject.ScreenFadeStatus = 1;
            else if (index === 65)
            {
                DataClassObject.NewHighScoreTempName = DataClassObject.NewHighScoreTempName.substring(0, DataClassObject.NewHighScoreTempName.length - 1);
            if (DataClassObject.NewHighScoreNameIndex > 0)  DataClassObject.NewHighScoreNameIndex--;
            }

            if (index > 0 && index < 65 && DataClassObject.NewHighScoreNameIndex < 13)
            {
                if (index > 0 && index < 27)  DataClassObject.NewHighScoreTempName += String.fromCharCode(65+index-1);
                else if (index > 26 && index < 53)  DataClassObject.NewHighScoreTempName += String.fromCharCode(97+index-26-1);
                else if (index > 52 && index < 63)  DataClassObject.NewHighScoreTempName += String.fromCharCode(48+index-52-1);
                else if (index === 63)  DataClassObject.NewHighScoreTempName += "+";
                else if (index === 64)  DataClassObject.NewHighScoreTempName += " ";

                if (DataClassObject.NewHighScoreNameIndex < 13)  DataClassObject.NewHighScoreNameIndex++;
            }

            InterfaceClassObject.NewHighScoreCharButtonScale[index] = 1;

            ScreensClassObject.ScreenIsDirty = true;
        }
    }

    if (InputClassObject.HighScoreNameInputDevice === InputClassObject.HighScoreUseKeyboard || InputClassObject.HighScoreNameInputDevice === InputClassObject.HighScoreUseKeyboardAndMouse)
    {
        if (InputClassObject.KeyboardCharacterPressed !== "")
        {
            if (InputClassObject.KeyboardCharacterPressed === "/")  ScreensClassObject.ScreenFadeStatus = 1;
            else if (InputClassObject.KeyboardCharacterPressed === "_")
            {
                InterfaceClassObject.NewHighScoreCharButtonScale[64] = 0.75;
            }
            else if (InputClassObject.KeyboardCharacterPressed === "=")
            {
                InterfaceClassObject.NewHighScoreCharButtonScale[65] = 0.75;
            }

            for (index = 1; index < 66; index++)
            {
                if (InputClassObject.KeyboardCharacterPressed === InterfaceClassObject.characters[index])  InterfaceClassObject.NewHighScoreCharButtonScale[index] = 0.75;
            }

            PlaySoundEffect(0);
            ScreensClassObject.ScreenIsDirty = true;
        }
    }

    if (ThisButtonWasPressed(0) === true)
    {
        ScreensClassObject.ScreenFadeStatus = 1;
    }

    if (ScreensClassObject.ScreenIsDirty === true)
    {
        DrawSpriteOntoCanvas(20, 400, 240, 1, 1, 0, 1, 255, 255, 255);
        DrawSpriteOntoCanvas(0, 400, 240, 1, 1, 0, .5, 255, 255, 255);

        DrawTextOntoCanvas(25, "N E W   H I G H   S C O R E   N A M E   I N P U T:", 400, 26, "center", 255, 255, 0, 0, 0, 0, 1);
        DrawTextOntoCanvas(25, "________________________________________________", 400, 30, "center", 255, 255, 0, 0, 0, 0, 1);

        DrawTextOntoCanvas(20, "You achieved a new high score!", 400, 60, "center", 255, 255, 255, 0, 0, 0, 1);

        if (InputClassObject.HighScoreNameInputDevice === InputClassObject.HighScoreUseKeyboardAndMouse)
            DrawTextOntoCanvas(20, "Please enter your name using the mouse or keyboard:", 400, 85, "center", 255, 255, 255, 0, 0, 0, 1);
        else if (InputClassObject.HighScoreNameInputDevice === InputClassObject.HighScoreUseKeyboard)
            DrawTextOntoCanvas(20, "Please enter your name using the keyboard:", 400, 85, "center", 255, 255, 255, 0, 0, 0, 1);
        else if (InputClassObject.HighScoreNameInputDevice === InputClassObject.HighScoreUseMouse)
            DrawTextOntoCanvas(20, "Please enter your name using the mouse:", 400, 85, "center", 255, 255, 255, 0, 0, 0, 1);
        else
            DrawTextOntoCanvas(20, "Please enter your name using the gamepad:", 400, 85, "center", 255, 255, 255, 0, 0, 0, 1);

        if (DataClassObject.NewHighScoreTempName[0] !== "")  DrawTextOntoCanvas(55, ""+DataClassObject.NewHighScoreTempName+"", 400, 148, "center", 255, 255, 255, 0, 0, 0, 1);

        for (index = 1; index < 66; index++)
        {
            if ( InitializeClassObject.Browser === "Mobile")  InterfaceClassObject.NewHighScoreCharButtonGreenHue[index] = 255
            DrawSpriteOntoCanvas(100+index, InterfaceClassObject.NewHighScoreCharButtonScreenX[index], InterfaceClassObject.NewHighScoreCharButtonScreenY[index], InterfaceClassObject.NewHighScoreCharButtonScale[index], InterfaceClassObject.NewHighScoreCharButtonScale[index], 0, 1, 255, InterfaceClassObject.NewHighScoreCharButtonGreenHue[index], 255);
        }

        DrawTextOntoCanvas(25, "________________________________________________", 400, 424, "center", 255, 255, 0, 0, 0, 0, 1);
    }

    if (ScreensClassObject.ScreenFadeAlpha === .99 && ScreensClassObject.ScreenFadeStatus === 1)
    {
        DataClassObject.HighScoresName[GameMode][DataClassObject.NewHighScoreRank] = DataClassObject.NewHighScoreTempName;

        DestroyAllButtons();

        InterfaceClassObject.CursorIsArrow = true;

        ScreensClassObject.NextScreenToDisplay = 6;
    }
}

//--------------------------------------------------------------------------------------------------------------
function DisplayStoryVideo()
{
    let videoFile = 1;

    if (ScreensClassObject.ScreenFadeAlpha === 1 && ScreensClassObject.ScreenFadeStatus === 0)
    {
        videoFile = document.createElement("video");
        videoFile.setAttribute('playsinline', 'playsinline');

        if (Level[0] === 0)  videoFile.src = "data/videos/0.mp4";
        else if (Level[0] === 5)  videoFile.src = "data/videos/5.mp4";
        else if (Level[0] === 10)  videoFile.src = "data/videos/10.mp4";
        else if (Level[0] === 15)  videoFile.src = "data/videos/15.mp4";
        else if (Level[0] === 20)  videoFile.src = "data/videos/20.mp4";
        else if (Level[0] === 25)  videoFile.src = "data/videos/25.mp4";
        else if (Level[0] === 31)  videoFile.src = "data/videos/30.mp4";

        ScreensClassObject.Video = videoFile;

        ScreensClassObject.Video.style.zIndex = "9999";
        ScreensClassObject.Video.style.position = "absolute";
        ScreensClassObject.Video.style.width = "100%";
        ScreensClassObject.Video.style.height = "100%";
        ScreensClassObject.Video.style.left = "0px";
        ScreensClassObject.Video.style.top = "0px";

        document.body.appendChild(ScreensClassObject.Video);
        AudioClassObject.MusicArray[0].pause();
        ScreensClassObject.Video.load();
        if (AudioClassObject.MusicVolume > 0 || AudioClassObject.SoundVolume > 0)  ScreensClassObject.Video.volume = 1;
        else  ScreensClassObject.Video.volume = 0.005;

        let playPromise = ScreensClassObject.Video.play();

        if (playPromise !== undefined) {
            playPromise.then(function() {
                // Automatic playback started!
            }).catch(function() {
                // Automatic playback failed.
                // Show a UI element to let the user manually start playback.
            });
        }

        ScreensClassObject.Video.addEventListener("ended", function(){
            ScreensClassObject.NextScreenToDisplay = 9;
            ScreensClassObject.ScreenFadeStatus = 1;
            ScreensClassObject.RemoveStoryVideo = true;
        });

        ScreensClassObject.Video.addEventListener("click", function(){
            ScreensClassObject.Video.pause();
            ScreensClassObject.NextScreenToDisplay = 9;
            ScreensClassObject.ScreenFadeStatus = 1;
            ScreensClassObject.RemoveStoryVideo = true;
        });
    }

    if (InputClassObject.JoystickButtonOne[Any] === true || InputClassObject.MouseButtonClicked === true || InputClassObject.KeyboardCharacterPressed === "_" || InputClassObject.KeyboardCharacterPressed === "/")
    {
        ScreensClassObject.Video.pause();
        ScreensClassObject.NextScreenToDisplay = 9;
        ScreensClassObject.ScreenFadeStatus = 1;
        ScreensClassObject.RemoveStoryVideo = true;
    }

    if (ScreensClassObject.ScreenFadeAlpha === .99 && ScreensClassObject.ScreenFadeStatus === 1)
    {
        if (Level[0] === 31)
        {
            PlayMusic(0);

            CheckForNewHighScores();

            if (CrisisWon === true)
            {
                PlayMusic(7);

                ScreensClassObject.NextScreenToDisplay = 7;
            }
            else if (DataClassObject.NewHighScoreRank < 10)  ScreensClassObject.NextScreenToDisplay = 10;
            else  ScreensClassObject.NextScreenToDisplay = 6;
        }
    }

    if(ScreensClassObject.RemoveStoryVideo === true){
        ScreensClassObject.Video.style.zIndex = "-9999";
        ScreensClassObject.Video.currentTime  = 0;
        ScreensClassObject.RemoveStoryVideo = false;
    }
}

//--------------------------------------------------------------------------------------------------------------
function DisplayAITestScreen() {
    let player;

    if (ScreensClassObject.ScreenFadeAlpha === 1 && ScreensClassObject.ScreenFadeStatus === 0) {
        AudioClassObject.MusicVolume = 0.0;
        AudioClassObject.MusicArray[0].volume = AudioClassObject.MusicVolume;
        AudioClassObject.SoundVolume = 0.0;

        ShowFullGraphicsTestAI = false;

        SetupForNewGameAITest();
    }

    RunTetriGameEngine();

    if (InputClassObject.KeyboardCharacterPressed === "T") {
        ShowFullGraphicsTestAI = !ShowFullGraphicsTestAI;
        PlaySoundEffect(0);
        InputClassObject.DelayAllUserInput = 50;
        ScreensClassObject.ScreenIsDirty = true;
    }

    if (ShowFullGraphicsTestAI === true)
    {
        for (player = 0; player < NumberOfPlayers; player++) {
            Player = player;

            if (PlayerStatus[Player] !== FlashingCompletedLines && PlayerStatus[Player] !== ClearingCompletedLines) {
                DeletePieceFromPlayfieldMemory(Current);
                AddPieceToPlayfieldMemory(DropShadow);
                AddPieceToPlayfieldMemory(Current);
            }
        }

        ScreensClassObject.ScreenIsDirty = true;
        if (ScreensClassObject.ScreenIsDirty === true) {
            InitializeClassObject.ctx.clearRect(0, 0, VisualsClassObject.screenWidth, VisualsClassObject.screenHeight);

            GameDisplayChanged = false;

            DrawSpriteOntoCanvas(20, 400, 240, 1, 1, 0, 1, 255, 255, 255);

            DrawSpriteOntoCanvas(50, PlayersPlayfieldScreenX[0], PlayersPlayfieldScreenY[0], 1, 1, 0, 1, 100, 255, 255);
            DrawSpriteOntoCanvas(49, PlayersPlayfieldScreenX[0], PlayersPlayfieldScreenY[0], 1, 1, 0, .75, 255, 255, 255);
            DrawSpriteOntoCanvas(50, PlayersPlayfieldScreenX[1], PlayersPlayfieldScreenY[1], 1, 1, 0, 1, 100, 100, 255);
            DrawSpriteOntoCanvas(49, PlayersPlayfieldScreenX[1], PlayersPlayfieldScreenY[1], 1, 1, 0, .75, 255, 255, 255);
            DrawSpriteOntoCanvas(50, PlayersPlayfieldScreenX[2], PlayersPlayfieldScreenY[2], 1, 1, 0, 1, 255, 100, 255);
            DrawSpriteOntoCanvas(49, PlayersPlayfieldScreenX[2], PlayersPlayfieldScreenY[2], 1, 1, 0, .75, 255, 255, 255);
            DrawSpriteOntoCanvas(50, PlayersPlayfieldScreenX[3], PlayersPlayfieldScreenY[3], 1, 1, 0, 1, 255, 255, 100);
            DrawSpriteOntoCanvas(49, PlayersPlayfieldScreenX[3], PlayersPlayfieldScreenY[3], 1, 1, 0, .75, 255, 255, 255);
            DrawSpriteOntoCanvas(50, PlayersPlayfieldScreenX[4], PlayersPlayfieldScreenY[4], 1, 1, 0, 1, 100, 255, 100);
            DrawSpriteOntoCanvas(49, PlayersPlayfieldScreenX[4], PlayersPlayfieldScreenY[4], 1, 1, 0, .75, 255, 255, 255);

            for (let player = 0; player < NumberOfPlayers; player++) {
                DrawTextOntoCanvas(20, "" + Score[player] + "", PlayersPlayfieldScreenX[player], 25, "center", 255, 255, 255, 0, 0, 0, 0);
                DrawTextOntoCanvas(12, "" + Lines[player] + "", PlayersPlayfieldScreenX[player] - 59, 75, "center", 255, 255, 255, 0, 0, 0, 0);
                DrawTextOntoCanvas(12, "" + Level[player] + "", PlayersPlayfieldScreenX[player] + 59, 75, "center", 255, 255, 255, 0, 0, 0, 0);

                if (PlayerInput[player] === Keyboard)
                    DrawTextOntoCanvas(20, "Keyboard", PlayersPlayfieldScreenX[player], 475, "center", 255, 255, 255, 0, 0, 0, 0);
                else if (PlayerInput[player] === Mouse)
                    DrawTextOntoCanvas(20, "Mouse", PlayersPlayfieldScreenX[player], 475, "center", 255, 255, 255, 0, 0, 0, 0);
                else if (PlayerInput[player] === CPU)
                    DrawTextOntoCanvas(20, "C.P.U.", PlayersPlayfieldScreenX[player], 475, "center", 255, 255, 255, 0, 0, 0, 0);
                else
                    DrawTextOntoCanvas(20, "Gamepad", PlayersPlayfieldScreenX[player], 475, "center", 255, 255, 255, 0, 0, 0, 0);

                let boxScreenX = PlayersPlayfieldScreenX[player] - 59;
                let boxScreenY = PlayersPlayfieldScreenY[player] - 212;
                for (let y = 0; y < 26; y++) {
                    for (let x = 2; x < 12; x++) {
                        if (Playfield[player][x][y] === 1) {
                            DrawSpriteOntoCanvas(61, boxScreenX, boxScreenY, 1, 1, 0, .5, 255, 255, 255);
                        } else if (Playfield[player][x][y] > 10 && Playfield[player][x][y] < 20) {
                            DrawSpriteOntoCanvas(51 + Playfield[player][x][y], boxScreenX, boxScreenY, 1, 1, 0, 1, 255, 255, 255);
                        } else if (Playfield[player][x][y] > 20 && Playfield[player][x][y] < 30) {
                            DrawSpriteOntoCanvas(61, boxScreenX, boxScreenY, 1, 1, 0, 1, 255, 255, 255);
                        }

                        boxScreenX += 13;
                    }

                    boxScreenX = PlayersPlayfieldScreenX[player] - 59;
                    boxScreenY += 18;
                }

            }
    }

    for (let player = 0; player < NumberOfPlayers; player++) {
        Player = player;

        if (PlayerStatus[Player] !== FlashingCompletedLines && PlayerStatus[Player] !== ClearingCompletedLines) {
            DeletePieceFromPlayfieldMemory(Current);
            DeletePieceFromPlayfieldMemory(DropShadow);
        }
    }
}

    for (let playerTemp = 0; playerTemp < NumberOfPlayers; playerTemp++)
    {
        if (PlayerStatus[playerTemp] === GameOver)  AITestSetupComputerPlayer(playerTemp);
    }

	let totalLines = (Lines[0]+Lines[1]+Lines[2]+Lines[3]+Lines[4]);

    if (ShowFullGraphicsTestAI === false)  InitializeClassObject.ctx.clearRect(0, 0, VisualsClassObject.screenWidth, VisualsClassObject.screenHeight);

	DrawTextOntoCanvas(30, "Total Games:"+NumberOfCPUGames+"", 400, 150, "center", 255, 255, 255, 0, 0, 0, 0);
	DrawTextOntoCanvas(30, "Total Lines:"+totalLines/*TotalCPUPlayerLines*/+"", 400, 150+30, "center", 255, 255, 255, 0, 0, 0, 0);
	DrawTextOntoCanvas(30, "Total Singles:"+TotalOneLines+"", 400, 150+(30*2), "center", 255, 255, 255, 0, 0, 0, 0);
	DrawTextOntoCanvas(30, "Total Doubles:"+TotalTwoLines+"", 400, 150+(30*3), "center", 255, 255, 255, 0, 0, 0, 0);
	DrawTextOntoCanvas(30, "Total Triples:"+TotalThreeLines+"", 400, 150+(30*4), "center", 255, 255, 255, 0, 0, 0, 0);
	DrawTextOntoCanvas(30, "Total Quadruples:"+TotalFourLines+"", 400, 150+(30*5), "center", 255, 255, 255, 0, 0, 0, 0);
	DrawTextOntoCanvas(45, "Average Lines:"+Math.floor(totalLines/NumberOfCPUGames)+"", 400, 150+(30*6)+50, "center", 255, 255, 255, 0, 0, 0, 0);

    if (ScreensClassObject.ScreenFadeAlpha === .99 && ScreensClassObject.ScreenFadeStatus === 1)
    {

    }
}
