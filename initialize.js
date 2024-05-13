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

// "initialize.js"...

//--------------------------------------------------------------------------------------------------------------
function iOS() {
    return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

//--------------------------------------------------------------------------------------------------------------
function iPhone() {
    return [
            'iPhone'
        ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

//--------------------------------------------------------------------------------------------------------------
function InitSettings()
{
    if ( navigator.userAgent.toLowerCase().indexOf('android') > -1
        || navigator.userAgent.toLowerCase().indexOf('mobile') > -1
        || ( iOS() === true ) ) {
            InitializeClassObject.Browser = "Mobile";
        InterfaceClassObject.UseOnscreenGamepad = true;
    }
    else  InitializeClassObject.Browser = "Desktop";

    let canvas = document.createElement('canvas');
    let canvasFallingLetters = document.createElement('canvas');

    if ( iOS() === true )  InitializeClassObject.BrowserMobileSSafari = true;

    //Browser = "Mobile";
    //UseOnscreenGamepad = true;

    //InterfaceClassObject.UseOnscreenGamepad = true;

    canvas.id = "ScreenCanvas";
    canvas.width = 800;
    canvas.height = 480;
    canvas.style.zIndex = "0";
    canvas.style.position = "absolute";
    canvas.style.border = "0px solid";

   if ( InitializeClassObject.Browser === "Mobile" )
   {     
        canvas.style.top = "0%";
        canvas.style.left = "0%";
   }
   else
   {
        canvas.style.top = "50%";
        canvas.style.left = "50%";
    }
    document.body.appendChild(canvas);
    document.body.appendChild(canvasFallingLetters);

    InitializeClassObject.ctxCanvas = document.getElementById("ScreenCanvas");
    InitializeClassObject.ctx = InitializeClassObject.ctxCanvas.getContext("2d");

    VisualsClassObject.screenWidth = 800;
    VisualsClassObject.screenHeight = 480;

    InputClassObject.USBGamepadsSupported = true;//navigator.getGamepads || !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;

    for (let index = 0; index < 5; index++)  InputClassObject.GameControllerInitialized[index] = false;

//    if (InitializeClassObject.Browser === "Mobile")
//    {
//        ToggleFullScreen();
//    }
}

//--------------------------------------------------------------------------------------------------------------
function AppLostFocus()
{
    if (InitializeClassObject.AppHasFocus === false)  return;
    InitializeClassObject.AppHasFocus = false;

    if (ScreensClassObject.ScreenToDisplay > 1 && AudioClassObject.MusicVolume > 0)  AudioClassObject.MusicArray[0].pause();
}

//--------------------------------------------------------------------------------------------------------------
function AppGainedFocus()
{
    if (InitializeClassObject.AppHasFocus === true)  return;
    InitializeClassObject.AppHasFocus = true;

    if (ScreensClassObject.ScreenToDisplay > 1 && AudioClassObject.MusicVolume > 0)  AudioClassObject.MusicArray[0].play();
}

//--------------------------------------------------------------------------------------------------------------
function HandleVisibilityChange()
{
    if (document.hidden)
    {
	    AppLostFocus();
    }
    else
    {
	    AppGainedFocus();
    }
}

//--------------------------------------------------------------------------------------------------------------
function Init()
{
    if (InitializeClassObject.InitLoaded === true)  return;
    InitializeClassObject.InitLoaded = true;
    
    let test_canvas = document.createElement("canvas");
    let canvascheck=!!(test_canvas.getContext);
    if (canvascheck === false)  alert("This browser does not support HTML5, get Mozilla Firefox or Google Chrome!");

    for (let index = 0; index < 5; index++) {
        InputClassObject.GamepadUP[index] = InputClassObject.GamepadButtonZero+12;
        InputClassObject.GamepadRIGHT[index] = InputClassObject.GamepadButtonZero+15;
        InputClassObject.GamepadDOWN[index] = InputClassObject.GamepadButtonZero+13;
        InputClassObject.GamepadLEFT[index] = InputClassObject.GamepadButtonZero+14;
        InputClassObject.GamepadBUTTONONE[index] = InputClassObject.GamepadButtonZero+3;
        InputClassObject.GamepadBUTTONTWO[index] = InputClassObject.GamepadButtonZero+2;
    }

    InitializeHighScores();

    InitSettings();

    for (let index = 0; index < 5; index++)  InputClassObject.GamepadsOLD[index] = " ";

    LoadOptions();

    LoadImages();
    LoadSound();

    let canvas = document.getElementById("ScreenCanvas");

    if (InitializeClassObject.Browser !== "Mobile") {
        canvas.addEventListener("mousemove", function (event) {
            let canvas = document.getElementById("ScreenCanvas");

            let rect = canvas.getBoundingClientRect();

            InputClassObject.MouseTouchX = Math.floor(event.clientX - rect.left);
            InputClassObject.MouseTouchX = (Math.floor(InputClassObject.MouseTouchX * (800 / VisualsClassObject.BrowserWidth)));

            InputClassObject.MouseTouchY = Math.floor(event.clientY - rect.top);
            InputClassObject.MouseTouchY = (Math.floor(InputClassObject.MouseTouchY * (480 / VisualsClassObject.BrowserHeight)));
        });
    }

    if (InitializeClassObject.Browser === "Mobile")
    {
        canvas.addEventListener("touchstart", function(event) {
            let canvas = document.getElementById("ScreenCanvas");

            let rect = canvas.getBoundingClientRect();

            InputClassObject.MouseButtonDown = true;

            InputClassObject.MouseTouchX = Math.floor(event.touches[0].clientX/*event.clientX*/ - rect.left);
            InputClassObject.MouseTouchX = (Math.floor(InputClassObject.MouseTouchX * (800 / VisualsClassObject.BrowserWidth)));

            InputClassObject.MouseTouchY = Math.floor(event.touches[0].clientY/*event.clientY*/ - rect.top);
            InputClassObject.MouseTouchY = (Math.floor(InputClassObject.MouseTouchY * (480 / VisualsClassObject.BrowserHeight)));
        });

        canvas.addEventListener("touchend", function(event) {
            let canvas = document.getElementById("ScreenCanvas");

            let rect = canvas.getBoundingClientRect();

            InputClassObject.MouseButtonDown = false;

            //InterfaceClassObject.GamepadSelectedByPlayer = -1;
            //InterfaceClassObject.GamepadAnimationTimer[1] = -1;
            //InterfaceClassObject.GamepadAnimationTimer[2] = -1;
            //InterfaceClassObject.GamepadAnimationTimer[3] = -1;

            InputClassObject.MouseTouchX = Math.floor(event.touches[0].clientX/*event.clientX*/ - rect.left);
            InputClassObject.MouseTouchX = (Math.floor(InputClassObject.MouseTouchX * (800 / VisualsClassObject.BrowserWidth)));

            InputClassObject.MouseTouchY = Math.floor(event.touches[0].clientY/*event.clientY*/ - rect.top);
            InputClassObject.MouseTouchY = (Math.floor(InputClassObject.MouseTouchY * (480 / VisualsClassObject.BrowserHeight)));
        });

        canvas.addEventListener("touchmove", function(event) {
            let canvas = document.getElementById("ScreenCanvas");

            let rect = canvas.getBoundingClientRect();

            InputClassObject.MouseButtonDown = true;

            InputClassObject.MouseTouchX = Math.floor(event.touches[0].clientX/*event.clientX*/ - rect.left);
            InputClassObject.MouseTouchX = (Math.floor(InputClassObject.MouseTouchX * (800 / VisualsClassObject.BrowserWidth)));

            InputClassObject.MouseTouchY = Math.floor(event.touches[0].clientY/*event.clientY*/ - rect.top);
            InputClassObject.MouseTouchY = (Math.floor(InputClassObject.MouseTouchY * (480 / VisualsClassObject.BrowserHeight)));
        });
    }

    window.addEventListener('resize', BrowserResize, false);
    BrowserResize();

    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if([' ', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].indexOf(e.key) > -1) {
            e.preventDefault();
        }
    }, false);

    canvas.addEventListener("click", CheckForMouseButtonClick, false);
    canvas.addEventListener("mousedown", CheckForMouseButtonDown);
    canvas.addEventListener("mouseup", CheckForMouseButtonUp);

    document.addEventListener("keypress", CheckForKeyPress, true);
    document.addEventListener("keydown", CheckForKeyDown, true);
    document.addEventListener("keyup", CheckForKeyRelease, true);

    document.addEventListener("visibilitychange", HandleVisibilityChange, false);

    document.body.style.backgroundColor = "Black";

    for (let index = 0; index < 8; index++)
    {
        InputClassObject.JoystickDirection[index] = InputClassObject.CENTER;
        InputClassObject.JoystickButtonOne[index] = false;
        InputClassObject.JoystickButtonTwo[index] = false;
    }

    InitializeClassObject.NextSecond = new Date().getTime()+1000;

    draw();
}

//--------------------------------------------------------------------------------------------------------------
function RequestAnimFrame(func, fps)
{
	window.setTimeout(func, 1000 / fps);
}

//--------------------------------------------------------------------------------------------------------------
function draw()
{
    GameLoop();

    RequestAnimFrame(draw, InitializeClassObject.Framerate);
}
