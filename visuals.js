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

// "visuals.js'...

//--------------------------------------------------------------------------------------------------------------
function BrowserResize()
{
    let widthToHeight = 800 / 480;
    let browserWidthTemp;
    let browserHeightTemp;

    VisualsClassObject.canvasTwo = document.getElementById('ScreenCanvas');

    if ( InitializeClassObject.Browser === "Mobile" )
    {
        VisualsClassObject.BrowserWidth = window.innerWidth;
        VisualsClassObject.BrowserHeight = window.innerHeight;

        VisualsClassObject.canvasTwo.style.width = VisualsClassObject.BrowserWidth + 'px';
        VisualsClassObject.canvasTwo.style.height = VisualsClassObject.BrowserHeight + 'px';
    }
    else
    {
        VisualsClassObject.BrowserWidth = window.innerWidth;
        VisualsClassObject.BrowserHeight = window.innerHeight;
        
        let newWidthToHeight = VisualsClassObject.BrowserWidth / VisualsClassObject.BrowserHeight;
        browserWidthTemp = VisualsClassObject.BrowserWidth;
        browserHeightTemp = VisualsClassObject.BrowserHeight;
    
        if (newWidthToHeight > widthToHeight)
        {
            browserWidthTemp = browserHeightTemp * widthToHeight;
            VisualsClassObject.canvasTwo.style.height = browserHeightTemp + 'px';
            VisualsClassObject.canvasTwo.style.width = browserWidthTemp + 'px';
    	}
        else
        {
            browserHeightTemp = browserWidthTemp / widthToHeight;
            VisualsClassObject.canvasTwo.style.width = browserWidthTemp + 'px';
            VisualsClassObject.canvasTwo.style.height = browserHeightTemp + 'px';
        }

        VisualsClassObject.canvasTwo.style.marginTop = (-browserHeightTemp / 2) + 'px';
        VisualsClassObject.canvasTwo.style.marginLeft = (-browserWidthTemp / 2) + 'px';

        VisualsClassObject.BrowserWidth = browserWidthTemp;
        VisualsClassObject.BrowserHeight = browserHeightTemp;
    }
}

//--------------------------------------------------------------------------------------------------------------
function ToggleFullScreen() {
    if (VisualsClassObject.FullScreenMode === 0)  VisualsClassObject.FullScreenMode = 1;
    else  VisualsClassObject.FullScreenMode = 0;

    if (VisualsClassObject.FullScreenMode === 1) {
        let playPromise = document.documentElement.requestFullscreen();

        if (playPromise !== undefined) {
            playPromise.then(function () {
            }).catch(function () {
                VisualsClassObject.FullScreenMode = 0;
            });
        }
    } else if (VisualsClassObject.FullScreenMode === 0) {
          let playPromise = document.exitFullscreen();

            if (playPromise !== undefined) {
                playPromise.then(function () {
                }).catch(function () {
                    VisualsClassObject.FullScreenMode = 0
                });
            }
        }
}

//--------------------------------------------------------------------------------------------------------------
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//--------------------------------------------------------------------------------------------------------------
function LoadIndividualImage(index, path)
{
    VisualsClassObject.TotalNumberOfImages++;

    sleep(VisualsClassObject.Time*VisualsClassObject.Multiplier).then(() => {
        VisualsClassObject.ImageSprites[index].src = path;

        VisualsClassObject.ImageSprites[index].onload = function() {
            VisualsClassObject.NumberOfLoadedImages++;
        };
    });

    VisualsClassObject.Multiplier++;
}

//--------------------------------------------------------------------------------------------------------------
function LoadImages()
{
    let index;

    for (index = 0; index < 100; index++)
    {
        VisualsClassObject.TextCacheImageCanvas[index] = document.createElement("canvas");
        VisualsClassObject.TextCacheImageCanvas[index].width = "800";
        VisualsClassObject.TextCacheImageCanvas[index].height = "150";
        VisualsClassObject.TextCacheImageCanvasCTX[index] = VisualsClassObject.TextCacheImageCanvas[index].getContext('2d');
        VisualsClassObject.TextCacheImageCanvasCTX[index].clearRect(0, 0, 800, 150);
    }

    ClearTextCache();

    InterfaceClassObject.OriginalButtonSprite = new Image();
    InterfaceClassObject.OriginalButtonSprite.src = "data/visuals/Button.png";

    InterfaceClassObject.GUIArrowsSprites[0] = new Image();
    InterfaceClassObject.GUIArrowsSprites[0].src = "data/visuals/Button-Selector-Left.png";
    InterfaceClassObject.GUIArrowsSprites[1] = new Image();
    InterfaceClassObject.GUIArrowsSprites[1].src = "data/visuals/Button-Selector-Right.png";

    InterfaceClassObject.GUISelectorLineSprite = new Image;
    InterfaceClassObject.GUISelectorLineSprite.src = "data/visuals/Selector-Line.png";

    VisualsClassObject.PreloadedTextsBG = new Image();
    VisualsClassObject.PreloadedTextsBG.src = "data/visuals/PreLoad-Text-Image.png";

    VisualsClassObject.OnScreenGamepadSprites[0] = new Image();
    VisualsClassObject.OnScreenGamepadSprites[0].src = "data/visuals/OnScreenGamePad.png";

    VisualsClassObject.OnScreenGamepadSprites[1] = new Image();
    VisualsClassObject.OnScreenGamepadSprites[1].src = "data/visuals/OnScreenGamePad1.png";

    VisualsClassObject.OnScreenGamepadSprites[2] = new Image();
    VisualsClassObject.OnScreenGamepadSprites[2].src = "data/visuals/OnScreenGamePad2.png";

    VisualsClassObject.OnScreenGamepadSprites[3] = new Image();
    VisualsClassObject.OnScreenGamepadSprites[3].src = "data/visuals/OnScreenGamePad3.png";

    for (index = 0; index < VisualsClassObject.NumberOfSprites; index++)  VisualsClassObject.ImageSprites[index] = new Image();

    AudioClassObject.multiplier = 1;
    AudioClassObject.time = 250;
    LoadIndividualImage(0, "data/visuals/Screen-Fade-Black-Box.png");
    LoadIndividualImage(1, "data/visuals/Red-BG.png");
    LoadIndividualImage(2, "data/visuals/Green-BG.png");
    LoadIndividualImage(3, "data/visuals/Blue-BG.png");
    LoadIndividualImage(5, "data/visuals/Speaker-OFF.png");
    LoadIndividualImage(6, "data/visuals/Speaker-ON.png");
    LoadIndividualImage(7, "data/visuals/Exit2.png");
    LoadIndividualImage(9, "data/visuals/HTML5-Logo.png");

    LoadIndividualImage(10, "data/visuals/MIT-Image.png");

    LoadIndividualImage(13, "data/visuals/QRCode.png");

    LoadIndividualImage(15, "data/visuals/Download-Source-Button.png");
    LoadIndividualImage(20, "data/visuals/Title-BG.png");
    LoadIndividualImage(26, "data/visuals/Keyboard-Key-Green.png");
    LoadIndividualImage(27, "data/visuals/Keyboard-Key-Yellow.png");
    LoadIndividualImage(28, "data/visuals/Keyboard-Key-Red.png");
    LoadIndividualImage(29, "data/visuals/Keyboard-Controls.png");
    LoadIndividualImage(30, "data/visuals/TC5-Logo.png");
    LoadIndividualImage(31, "data/visuals/Logo-BG-Mask.png");
    LoadIndividualImage(32, "data/visuals/Logo-Flash.png");
    LoadIndividualImage(40, "data/visuals/Firefox-01.png");
    LoadIndividualImage(49, "data/visuals/Playfield-BG.png");
    LoadIndividualImage(50, "data/visuals/Playfield.png");

    LoadIndividualImage(51, "data/visuals/Playfield5Player.png");

    LoadIndividualImage(60, "data/visuals/Box-Black.png")
    LoadIndividualImage(61, "data/visuals/Box-White.png");
    LoadIndividualImage(62, "data/visuals/Box-Red.png");
    LoadIndividualImage(63, "data/visuals/Box-Orange.png");
    LoadIndividualImage(64, "data/visuals/Box-Cyan.png");
    LoadIndividualImage(65, "data/visuals/Box-Yellow.png");
    LoadIndividualImage(66, "data/visuals/Box-Green.png");
    LoadIndividualImage(67, "data/visuals/Box-Blue.png");
    LoadIndividualImage(68, "data/visuals/Box-Purple.png");
    LoadIndividualImage(70, "data/visuals/PlayfieldBlockAttack.png");
    LoadIndividualImage(80, "data/visuals/Crack.png");
    LoadIndividualImage(90, "data/visuals/Flag-USA.png");
    LoadIndividualImage(91, "data/visuals/Flag-USSR.png");
    LoadIndividualImage(99, "data/visuals/Letter-Tile.png");
}

//--------------------------------------------------------------------------------------------------------------
function PreloadStaffText(size, text, x, y, justification, colorR, colorG, colorB, outlineColorR, outlineColorG, outlineColorB, outlineBold)
{
let ctxPreloadedStaffTexts = new Array(250);

    VisualsClassObject.NumberOfPreloadedStaffTexts++;

    VisualsClassObject.PreloadedStaffTexts[VisualsClassObject.NumberOfPreloadedStaffTexts] = document.createElement("canvas");
    VisualsClassObject.PreloadedStaffTexts[VisualsClassObject.NumberOfPreloadedStaffTexts].width = "800";
    VisualsClassObject.PreloadedStaffTexts[VisualsClassObject.NumberOfPreloadedStaffTexts].height = "150";
    ctxPreloadedStaffTexts[VisualsClassObject.NumberOfPreloadedStaffTexts] = VisualsClassObject.PreloadedStaffTexts[VisualsClassObject.NumberOfPreloadedStaffTexts].getContext('2d');
    
    ctxPreloadedStaffTexts[VisualsClassObject.NumberOfPreloadedStaffTexts].clearRect(0, 0, 800, 150);
    ctxPreloadedStaffTexts[VisualsClassObject.NumberOfPreloadedStaffTexts].drawImage(VisualsClassObject.PreloadedTextsBG, 0, 0, 800, 150);
    
    ctxPreloadedStaffTexts[VisualsClassObject.NumberOfPreloadedStaffTexts].save();

    ctxPreloadedStaffTexts[VisualsClassObject.NumberOfPreloadedStaffTexts].font = ""+size+"px HighlandGothicFLF";

    ctxPreloadedStaffTexts[VisualsClassObject.NumberOfPreloadedStaffTexts].textAlign = justification;

    ctxPreloadedStaffTexts[VisualsClassObject.NumberOfPreloadedStaffTexts].fillStyle = "rgba("+outlineColorR+", "+outlineColorG+", "+outlineColorB+", 1)";

    if (outlineBold === 0)
    {
        ctxPreloadedStaffTexts[VisualsClassObject.NumberOfPreloadedStaffTexts].fillText(text, x, y-1);
        ctxPreloadedStaffTexts[VisualsClassObject.NumberOfPreloadedStaffTexts].fillText(text, x+1, y);
        ctxPreloadedStaffTexts[VisualsClassObject.NumberOfPreloadedStaffTexts].fillText(text, x, y+1);
        ctxPreloadedStaffTexts[VisualsClassObject.NumberOfPreloadedStaffTexts].fillText(text, x-1, y);
    }
    else if (outlineBold === 1)
    {
        for (let yOffset = -2; yOffset < 3; yOffset++)
            for (let xOffset = -2; xOffset < 3; xOffset++)
                ctxPreloadedStaffTexts[VisualsClassObject.NumberOfPreloadedStaffTexts].fillText(text, x+xOffset, y+yOffset);
    }

    ctxPreloadedStaffTexts[VisualsClassObject.NumberOfPreloadedStaffTexts].fillStyle = "rgba("+colorR+", "+colorG+", "+colorB+", 1)";
    ctxPreloadedStaffTexts[VisualsClassObject.NumberOfPreloadedStaffTexts].fillText(text, x, y);

    VisualsClassObject.PreloadedStaffTextsBlue[VisualsClassObject.NumberOfPreloadedStaffTexts] = colorB;
    
    ctxPreloadedStaffTexts[VisualsClassObject.NumberOfPreloadedStaffTexts].restore();
}

//--------------------------------------------------------------------------------------------------------------
function PreloadAllStaffTexts()
{
    PreloadStaffText(20, "TM", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
    PreloadStaffText(20, "TetriCrisis V ''Firefox'' 110% A.I.", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
    PreloadStaffText(20, "\u00A92024, By Team: ''JesseLeePalser.itch.io''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);

    PreloadStaffText(20, "Original Game Concept By:", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
    PreloadStaffText(20, "Alexey Pajitnov", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);

    PreloadStaffText(20, "Original Motion Picture Produced & Directed By:", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
    PreloadStaffText(20, "Clint Eastwood", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);

    PreloadStaffText(20, "Special Thank You To My Mentors:", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
    PreloadStaffText(20, "Garry Kitchen", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "Andre' LaMothe", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);

    PreloadStaffText(20, "Special Thank You To:", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
    PreloadStaffText(20, "Itch.io", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "(For Internet Publishing)", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);

    PreloadStaffText(20, "Game Written And Developed On:", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
    PreloadStaffText(20, "Jetbrain's ''WebStorm'' JS IDE On ''Linux Mint 21.3 Cinnamon'' OS", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);

    PreloadStaffText(20, "HTML5/JavaScript Video Playback Core By:", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
    PreloadStaffText(20, "''Daotheman''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);

    PreloadStaffText(20, "''Mustang GT 5.0 SuperCharged'' v2 HTML5/JavaScript Game Engine By:", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
    PreloadStaffText(20, "''JeZxLee''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);

    PreloadStaffText(20, "''Gift Of Sight'' Artificial Intelligence Puzzle Core By:", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
    PreloadStaffText(20, "''JeZxLee''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);

    PreloadStaffText(20, "''Neo's Kiss'' Graphical User Interface System By:", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
    PreloadStaffText(20, "''JeZxLee''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);

    PreloadStaffText(20, "Lead Game Designer:", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
    PreloadStaffText(20, "''JeZxLee''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);

    PreloadStaffText(20, "Lead Game Programmer:", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
    PreloadStaffText(20, "''JeZxLee''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);

    PreloadStaffText(20, "Lead Game Tester:", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
    PreloadStaffText(20, "''JeZxLee''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);

    PreloadStaffText(20, "Lead Graphic Artist:", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
    PreloadStaffText(20, "''JeZxLee''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);

    PreloadStaffText(20, "Music Soundtrack By:", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
    PreloadStaffText(20, "''D.J. Fading Twilight''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
//    PreloadStaffText(20, "(Paid Artificially & Intelligently Created Music)", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
//    PreloadStaffText(20, "($10 A Month For 500 Songs A Month!)", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
//    PreloadStaffText(20, "--------------------------------------------------", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
//    PreloadStaffText(20, "''YouTube.com''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
//    PreloadStaffText(20, "(Good Source Of Great BGM Music)", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);

    PreloadStaffText(20, "Support Game Designers/Programmers/Testers:", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
    PreloadStaffText(20, "''Daotheman''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''mattmatteh''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);

    PreloadStaffText(20, "Apple macOS/iOS/iPadOS Safari Internet Browser Supporters:", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
    PreloadStaffText(20, "''TheAppleFox''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''TheBunny1''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''metayeti''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''bomb''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''DnzAtWr''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);

    PreloadStaffText(20, "NewGrounds.com Emotional Support Provided By:", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
    PreloadStaffText(20, "''Czyszy''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''Flashanimator13''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);

    PreloadStaffText(20, "Video Game Built On A JeZxLee Pro-Built Linux Desktop:", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
    PreloadStaffText(20, "Desktop Code Name: ''Megatron''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "Desktop Class: Mid-Range", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "Build Date: June 11th, 2022", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "Genuine ''Linux Mint 21.3 Cinnamon'' 64Bit Linux OS", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "Silverstone Tek ATX Mid Tower Case", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "EVGA Supernova 650 GT 80 Plus Gold 650W Power Supply", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "ASUS AM4 TUF Gaming X570-Plus (Wi-Fi) Motherboard", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "AMD Ryzen 7 5800X(4.7GHz Turbo) 8-Core CPU", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "Noctua NH-U12S chromax.Black 120mm CPU Cooler", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "Corsair Vengeance LPX 32GB(2X16GB) DDR4 3200MHz RAM Memory", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "MSI Gaming nVidia GeForce RTX 3060 12GB GDDR6 OC GPU", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "SAMSUNG 980 PRO 2TB PCIe NVMe Gen 4 M.2 Drive", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "Seagate FireCuda 4TB 3.5 Inch Hard Drive", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);

    PreloadStaffText(20, "Support Game Beta Testers:", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
    PreloadStaffText(20, "''MrOzBarry''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''SnowHog''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''oshunluvr''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''hallergard''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''trintadosete''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''Diki''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''Aprime''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''raincomplex''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''CtlAltDel''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1); 
    PreloadStaffText(20, "''b10b''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''moo-_-''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''MtnDewManiac''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''WombatTurkey''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''marcgfx''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''spritelygames''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''seeker''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''JazzAceman''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''Gergely S.''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''Sylvain B.''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''Kvisle''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''rich''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''chg''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    PreloadStaffText(20, "''GBeebe''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);
    
    PreloadStaffText(20, "''You!''", 400, 75, "center", 255, 255, 255, 0, 0, 0, 1);

    PreloadStaffText(20, "''A 110% By Team: JesseLeePalser.itch.io !''", 400, 75, "center", 255, 255, 0, 0, 0, 0, 1);
}

//--------------------------------------------------------------------------------------------------------------
function DrawPreloadedStaffTextOntoCanvas(index, x, y)
{
    InitializeClassObject.ctx.save();

    InitializeClassObject.ctx.globalAlpha = VisualsClassObject.PreloadStaffTextsAlpha[index];

    let computedCenterX = Math.floor(VisualsClassObject.PreloadedStaffTexts[index].width / 2);
    let computedCenterY = Math.floor(VisualsClassObject.PreloadedStaffTexts[index].height / 2);

	InitializeClassObject.ctx.drawImage(  VisualsClassObject.PreloadedStaffTexts[index], (x - computedCenterX), (y - computedCenterY)
	, VisualsClassObject.PreloadedStaffTexts[index].width, VisualsClassObject.PreloadedStaffTexts[index].height  );

    InitializeClassObject.ctx.restore();
}

//-------------------------------------------------------------------------------------------------
function DegToRad(d)
{
    return d * 0.0174532925199432957;
}

//--------------------------------------------------------------------------------------------------------------
// "Retro Blast Tech"
function DrawSpriteOntoCanvas(index, x, y, scaleX, scaleY, rotationDegree, alpha, red, green, blue)
{
    if (scaleX === 0 || scaleY === 0)  return;

    let imageToDraw;
    let imageToDrawWidth;
    let imageToDrawHeight;

    if (index < 101 || index > 166)
    {
        imageToDraw = VisualsClassObject.ImageSprites[index];
        imageToDrawWidth = VisualsClassObject.ImageSprites[index].width;
        imageToDrawHeight = VisualsClassObject.ImageSprites[index].height;
    }
    else
    {
        imageToDraw = document.createElement("canvas");
        imageToDraw.width = 56;
        imageToDraw.height = 43;
        imageToDrawWidth = 56;
        imageToDrawHeight = 43;
        imageToDraw = InterfaceClassObject.ButtonsWithCharsCanvases[index-100];
    }

    InitializeClassObject.ctx.save();
    InitializeClassObject.ctx.globalAlpha = alpha;

    if (red !== 255 || green !== 255 || blue !== 255)
    {
        let buff = document.createElement("canvas");
        buff.width  = imageToDrawWidth;
        buff.height = imageToDrawHeight;

        if (red !== 255)
        {
            let ctxR  = buff.getContext("2d");
            ctxR.drawImage(imageToDraw, 0, 0);

            ctxR.globalAlpha = (red / 255);
            ctxR.globalCompositeOperation = 'source-atop';
            ctxR.drawImage(VisualsClassObject.ImageSprites[1], 0, 0);

            ctxR.globalAlpha = 1;

            imageToDraw = buff;
        }

        if (green !== 255)
        {
            let ctxG  = buff.getContext("2d");
            ctxG.drawImage(imageToDraw, 0, 0);

            ctxG.globalAlpha = (green / 255);
            ctxG.globalCompositeOperation = 'source-atop';
            ctxG.drawImage(VisualsClassObject.ImageSprites[2], 0, 0);

            ctxG.globalAlpha = 1;

            imageToDraw = buff;
        }

        if (blue !== 255)
        {
            let ctxB  = buff.getContext("2d");
            ctxB.drawImage(imageToDraw, 0, 0);

            ctxB.globalAlpha = (blue / 255);
            ctxB.globalCompositeOperation = 'source-atop';
            ctxB.drawImage(VisualsClassObject.ImageSprites[3], 0, 0);

            ctxB.globalAlpha = 1;

            imageToDraw = buff;
        }

        buff = null;
    }

    InitializeClassObject.ctx.translate(x, y);

    if (rotationDegree !== 0)  InitializeClassObject.ctx.rotate( DegToRad(rotationDegree) );
    
    if (scaleX !== 1 || scaleY !== 1)  InitializeClassObject.ctx.scale(scaleX, scaleY);

    InitializeClassObject.ctx.drawImage( imageToDraw, -(imageToDrawWidth / 2), -(imageToDrawHeight / 2) );

    InitializeClassObject.ctx.globalAlpha = 1;
    InitializeClassObject.ctx.restore();
}
//                                                                                            "Retro Blast Tech"

//--------------------------------------------------------------------------------------------------------------
function ClearTextCache()
{
    for (let index = 0; index < 100; index++)
    {
        VisualsClassObject.TextCacheImageCanvasCTX[index].clearRect(0, 0, 800, 150);
        VisualsClassObject.TextCacheText[index] = " ";
        VisualsClassObject.TextCacheJustification[index] = " ";
        VisualsClassObject.TextCacheScreenXOriginal[index] = -999;
        VisualsClassObject.TextCacheScreenX[index] = -999;
        VisualsClassObject.TextCacheScreenY[index] = -999;
        VisualsClassObject.TextCacheIndex = 0;
    }
}

//--------------------------------------------------------------------------------------------------------------
function DrawTextOntoCanvas(size, text, x, y, justification, colorR, colorG, colorB, outlineColorR, outlineColorG, outlineColorB, outlineBold)
{
        let computedCenterX;
        let computedCenterY;

        for (let indexToCheck = 0; indexToCheck < 100; indexToCheck++) {
            if (text === VisualsClassObject.TextCacheText[indexToCheck]
                && y === VisualsClassObject.TextCacheScreenY[indexToCheck] && x === VisualsClassObject.TextCacheScreenXOriginal[indexToCheck]) {
                InitializeClassObject.ctx.save();

                computedCenterX = Math.floor(VisualsClassObject.TextCacheImageCanvas[indexToCheck].width / 2);
                computedCenterY = Math.floor(VisualsClassObject.TextCacheImageCanvas[indexToCheck].height / 2);

                InitializeClassObject.ctx.drawImage(VisualsClassObject.TextCacheImageCanvas[indexToCheck], (VisualsClassObject.TextCacheScreenX[indexToCheck] - computedCenterX)
                    , (VisualsClassObject.TextCacheScreenY[indexToCheck] - computedCenterY)
                    , VisualsClassObject.TextCacheImageCanvas[indexToCheck].width, VisualsClassObject.TextCacheImageCanvas[indexToCheck].height);

                InitializeClassObject.ctx.restore();

                return;
            }
        }

        if (VisualsClassObject.TextCacheIndex < 99) VisualsClassObject.TextCacheIndex++;
        else VisualsClassObject.TextCacheIndex = 0;

        VisualsClassObject.TextCacheImageCanvasCTX[VisualsClassObject.TextCacheIndex].clearRect(0, 0, 800, 150);
        VisualsClassObject.TextCacheImageCanvasCTX[VisualsClassObject.TextCacheIndex].drawImage(VisualsClassObject.PreloadedTextsBG, 0, 0, 800, 150);
        VisualsClassObject.TextCacheText[VisualsClassObject.TextCacheIndex] = text;
        VisualsClassObject.TextCacheJustification[VisualsClassObject.TextCacheIndex] = justification;
        VisualsClassObject.TextCacheScreenXOriginal[VisualsClassObject.TextCacheIndex] = x;
        VisualsClassObject.TextCacheScreenX[VisualsClassObject.TextCacheIndex] = 400;
        VisualsClassObject.TextCacheScreenY[VisualsClassObject.TextCacheIndex] = y;

        VisualsClassObject.TextCacheImageCanvasCTX[VisualsClassObject.TextCacheIndex].save();

        VisualsClassObject.TextCacheImageCanvasCTX[VisualsClassObject.TextCacheIndex].font = "" + size + "px HighlandGothicFLF";

        VisualsClassObject.TextCacheImageCanvasCTX[VisualsClassObject.TextCacheIndex].textAlign = justification;

        VisualsClassObject.TextCacheImageCanvasCTX[VisualsClassObject.TextCacheIndex].fillStyle = "rgba(" + outlineColorR + ", " + outlineColorG + ", " + outlineColorB + ", 1)";

        y = 75;

        if (outlineBold === 0) {
            VisualsClassObject.TextCacheImageCanvasCTX[VisualsClassObject.TextCacheIndex].fillText(text, x, y - 1);
            VisualsClassObject.TextCacheImageCanvasCTX[VisualsClassObject.TextCacheIndex].fillText(text, x + 1, y);
            VisualsClassObject.TextCacheImageCanvasCTX[VisualsClassObject.TextCacheIndex].fillText(text, x, y + 1);
            VisualsClassObject.TextCacheImageCanvasCTX[VisualsClassObject.TextCacheIndex].fillText(text, x - 1, y);
        } else if (outlineBold === 1) {
            for (let yOffset = -2; yOffset < 3; yOffset++)
                for (let xOffset = -2; xOffset < 3; xOffset++)
                    VisualsClassObject.TextCacheImageCanvasCTX[VisualsClassObject.TextCacheIndex].fillText(text, x + xOffset, y + yOffset);
        }

        VisualsClassObject.TextCacheImageCanvasCTX[VisualsClassObject.TextCacheIndex].fillStyle = "rgba(" + colorR + ", " + colorG + ", " + colorB + ", 1)";
        VisualsClassObject.TextCacheImageCanvasCTX[VisualsClassObject.TextCacheIndex].fillText(text, x, y);

        VisualsClassObject.TextCacheImageCanvasCTX[VisualsClassObject.TextCacheIndex].restore();

        InitializeClassObject.ctx.save();

        computedCenterX = Math.floor(VisualsClassObject.TextCacheImageCanvas[VisualsClassObject.TextCacheIndex].width / 2);
        computedCenterY = Math.floor(VisualsClassObject.TextCacheImageCanvas[VisualsClassObject.TextCacheIndex].height / 2);

        InitializeClassObject.ctx.drawImage(VisualsClassObject.TextCacheImageCanvas[VisualsClassObject.TextCacheIndex], (VisualsClassObject.TextCacheScreenX[VisualsClassObject.TextCacheIndex] - computedCenterX)
            , (VisualsClassObject.TextCacheScreenY[VisualsClassObject.TextCacheIndex] - computedCenterY)
            , VisualsClassObject.TextCacheImageCanvas[VisualsClassObject.TextCacheIndex].width, VisualsClassObject.TextCacheImageCanvas[VisualsClassObject.TextCacheIndex].height);

        InitializeClassObject.ctx.restore();
}
