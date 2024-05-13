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

// "classes.js"...
// (Say NO To Global Variables!)

class AudioClass {
    constructor() {
        this.SoundVolume = 0.5;
        this.MusicVolume = 0.5;
        this.SoundArray = new Array(15);
        this.MusicArray = new Array(1);
        this.Time = 0.75;
        this.Multiplier = 0.75;
        this.NumberOfLoadedSounds = 0;
        this.TotalNumberOfSounds = -1;
        this.NumberOfLoadedMusics = 0;
        this.TotalNumberOfMusics = 1;
        this.AtLeastOneMusicHasPlayed = false;
    }
}
const AudioClassObject = new AudioClass();

class DataClass {
    constructor() {
        this.GameName = 'TC5-Retail3ze-';
        this.Version = 5.37;
        this.NewHighScoreRank = 999;
        this.PlayerWithHighestScore = 2;
        this.NewHighScoreNameIndex = 0;
        this.NewHighScoreTempName = new Array(20);
        this.HighScoresName = new Array(7);
        this.HighScoresName[0] = new Array(10);
        this.HighScoresName[1] = new Array(10);
        this.HighScoresName[2] = new Array(10);
        this.HighScoresName[3] = new Array(10);
        this.HighScoresName[4] = new Array(10);
        this.HighScoresName[5] = new Array(10);
        this.HighScoresName[6] = new Array(10);
        this.HighScoresLevel = new Array(7);
        this.HighScoresLevel[0] = new Array(10);
        this.HighScoresLevel[1] = new Array(10);
        this.HighScoresLevel[2] = new Array(10);
        this.HighScoresLevel[3] = new Array(10);
        this.HighScoresLevel[4] = new Array(10);
        this.HighScoresLevel[5] = new Array(10);
        this.HighScoresLevel[6] = new Array(10);
        this.HighScoresScore = new Array(7);
        this.HighScoresScore[0] = new Array(10);
        this.HighScoresScore[1] = new Array(10);
        this.HighScoresScore[2] = new Array(10);
        this.HighScoresScore[3] = new Array(10);
        this.HighScoresScore[4] = new Array(10);
        this.HighScoresScore[5] = new Array(10);
        this.HighScoresScore[6] = new Array(10);
        this.NewHighScoreCharX = 0;
        this.NewHighScoreCharY = 0;
    }
}
const DataClassObject = new DataClass();

class InitializeClass {
    constructor() {
        this.InitLoaded = false;
        this.Browser = "null";
        this.BrowserMobileSSafari = false;
        this.AppHasFocus = true;
        this.NextSecond = 0;
        this.Framerate = 45;
        this.ctxCanvas = 0;
        this.ctx = 0;
    }
}
const InitializeClassObject = new InitializeClass();

class InputClass {
    constructor() {
        this.MouseTouchX = 0;
        this.MouseTouchY = 0;
        this.DelayAllUserInput = 0;
        this.MouseButtonClicked = false;
        this.MouseButtonDown = false;
        this.KeyboardCharacterPressed = " ";
        this.CENTER = 0;
        this.UP     = 1;
        this.RIGHT  = 2;
        this.DOWN   = 3;
        this.LEFT   = 4;
        this.JoystickDirection = new Array(8);
        this.JoystickButtonOne = new Array(8);
        this.JoystickButtonTwo = new Array(8);
        this.KeyboardSpaceBarFunction = 1;
        this.USBGamepadsSupported = false;
        this.Gamepads = new Array(10);
        this.GamepadsOLD = new Array(10);
        this.FirstHumanPlayerInput = 0;
        this.GamepadConfigPadIndex = -1;
        this.GamepadConfigGetInput = 0;
        this.GamepadAxisZero = 0;
        this.GamepadButtonZero = 10;
        this.GamepadUP = new Array(10);
        this.GamepadRIGHT = new Array(10);
        this.GamepadDOWN = new Array(10);
        this.GamepadLEFT = new Array(10);
        this.GamepadBUTTONONE = new Array(10);
        this.GamepadBUTTONTWO = new Array(10);
        this.GameControllerInitialized = new Array(10);
        this.controllerIndex = 0;
        this.GameWasQuit = false;
        this.HighScoreUseKeyboard            = 0;
        this.HighScoreUseMouse               = 1;
        this.HighScoreUseKeyboardAndMouse    = 2;
        this.HighScoreNameInputDevice        = 0;
        this.HighScoreJoyCharIndex = 0;
        this.ControlScheme = 0;
    }
}
const InputClassObject = new InputClass();

class InterfaceClass {
    constructor() {
        this.NumberOfOnscreenButtons = 0;
        this.OriginalButtonSprite = 0;
        this.ButtonsWithTextCanvases = [];
        this.ctxButtonsWithTextCanvases = [];
        this.GUIArrowsSprites = [];
        this.GUIButton = [];
        this.GUIButtonScreenX = [];
        this.GUIButtonScreenY = [];
        this.NumberOfOnscreenArrowSets = 0;
        this.GUISelectorLineSprite = 0;
        this.ArrowSetSelectedByKeyboard = -1;
        this.GUIArrowSets = [];
        this.ArrowSetThatWasSelected = -1;
        this.ArrowSetSelectedAnimationTimer = -1;
        this.GUIArrowSetScreenX = [];
        this.GUIArrowSetScreenY = [];
        this.ButtonThatWasSelected = -1;
        this.ButtonSelectedAnimationTimer = -1;
        this.ButtonSelectedByKeyboard = 0;
        this.ButtonsWithCharsCanvases = [];
        this.ctxButtonsWithCharsCanvases = [];
        this.NumberOfOnscreenIcons = 0
        this.IconIndex = [];
        this.IconSpriteIndex = [];
        this.IconScreenX = [];
        this.IconScreenY = [];
        this.IconAnimationTimer = [];
        this.IconScale = [];
        this.IconSelectedByPlayer = -1;
        this.characters = ["?", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"
            , "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
            , "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m"
            , "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
            , "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", " "];
        this.NewHighScoreCharButtonScreenX = new Array(67);
        this.NewHighScoreCharButtonScreenY = new Array(67);
        this.NewHighScoreCharButtonScale = new Array(67);
        this.NewHighScoreCharButtonGreenHue = new Array(67);
        this.NumberOfOnscreenGamepadButtons = 0;
        this.GamepadIndex = [];
        this.GamepadSpriteIndex = [];
        this.GamepadScreenX = [];
        this.GamepadScreenY = [];
        this.GamepadAnimationTimer = [];
        this.GamepadScale = [];
        this.GamepadSelectedByPlayer = -1;
        this.UseOnscreenGamepad = false;
        this.CursorIsArrow = true;
    }
}
const InterfaceClassObject = new InterfaceClass();

class LogicClass {
    constructor() {

    }
}
const LogicClassObject = new LogicClass();

// LogicClassObject.

class ScreensClass {
    constructor() {
        this.RemoveStoryVideo = false;
        this.Video = 0;
        this.DEBUG = false;
        this.ScreenIsDirty = true;
        this.ScreenFadeAlpha = 1;
        this.ScreenFadeStatus = 0;
        this.ScreenToDisplay = 0;
        this.NextScreenToDisplay = 1;
        this.frameCount = 0;
        this.FPS = 0;
        this.FirefoxOneScreenX = 0;
        this.FirefoxOneScreenY = 0;
        this.FirefoxOneScale = 0;
        this.FirefoxTwoScreenX = 0;
        this.FirefoxTwoScreenY = 0;
        this.FirefoxTwoScale = 0;
        this.StaffFirefoxSceneTimer = 0;
        this.LogoFlashScreenX = 0;
    }
}
const ScreensClassObject = new ScreensClass();

class VisualsClass {
    constructor() {
        this.screenWidth = 800;
        this.screenHeight = 480;
        this.canvasTwo = 0;
        this.NumberOfSprites = 200;
        this.ImageSprites = new Array(200);
        this.NumberOfLoadedImages = 0;
        this.TotalNumberOfImages = 0;
        this.BrowserWidth = 800;
        this.BrowserHeight = 480;
        this.NumberOfPreloadedStaffTexts = -1;
        this.PreloadedTextsBG = 0;
        this.PreloadedStaffTexts = new Array(250);
        this.PreloadedStaffTextsBlue = new Array(250);
        this.PreloadedStaffTextsScreenY = new Array(250);
        this.PreloadStaffTextsAlpha = new Array(250);
        this.TextCacheImageCanvas = new Array(250);
        this.TextCacheImageCanvasCTX = new Array(250);
        this.TextCacheText = new Array(250);
        this.TextCacheJustification = new Array(250);
        this.TextCacheScreenXOriginal = new Array(250);
        this.TextCacheScreenX = new Array(250);
        this.TextCacheScreenY = new Array(250);
        this.TextCacheIndex = 0;
        this.FullScreenMode = 0;
        this.OnScreenGamepadSprites = new Array(4);
    }
}
const VisualsClassObject = new VisualsClass();
