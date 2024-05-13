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

// "data.js"...

//--------------------------------------------------------------------------------------------------------------
function CreateCookie(name, value, days)
{
    let expires;

    if (days)
    {
        let date = new Date();

        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toUTCString();
    }
    else  expires = "";

    document.cookie = name+"="+value+expires+"; path=/";
}

//--------------------------------------------------------------------------------------------------------------
function ReadCookie(name)
{
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');

    for (let i=0; i < ca.length; i++)
    {
        let c = ca[i];

        while (c.charAt(0)===' ') c = c.substring(1,c.length);

        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
}

//--------------------------------------------------------------------------------------------------------------
function CheckHTML5LocalStorage()
{
    try
    {
	    return 'localStorage' in window && window['localStorage'] !== null;
    }
    catch (e)
    {
	    return false;
    }
}

//--------------------------------------------------------------------------------------------------------------
function LoadOptions()
{
let temp = null;
let tempTwo = null;
let tempThree = null;

    if ( CheckHTML5LocalStorage() === false )
    {
        temp = ReadCookie(DataClassObject.GameName+'MusicVolume');
        if (temp)  AudioClassObject.MusicVolume = parseFloat(temp);

        temp = ReadCookie(DataClassObject.GameName+'SoundVolume');
        if (temp)  AudioClassObject.SoundVolume = parseFloat(temp);

        temp = ReadCookie(DataClassObject.GameName+'FullScreenMode');
        if (temp)  VisualsClassObject.FullScreenMode = parseInt(temp);

        temp = ReadCookie(DataClassObject.GameName+'GameMode');
        if (temp)  GameMode = parseInt(temp);

        temp = ReadCookie(DataClassObject.GameName+'CPUPlayerEnabled');
        if (temp)  CPUPlayerEnabled = parseInt(temp);

        temp = ReadCookie(DataClassObject.GameName+'DisplayDropShadow');
        if (temp)  DisplayDropShadow = parseInt(temp);

        temp = ReadCookie(DataClassObject.GameName+'PressingUPAction');
        if (temp)  PressingUPAction = parseInt(temp);

        temp = ReadCookie(DataClassObject.GameName+'KeyboardSpaceBarFunction');
        if (temp)  InputClassObject.KeyboardSpaceBarFunction = parseInt(temp);

        for (let gameModeTwo = 0; gameModeTwo < 7; gameModeTwo++)
        {
            for (let rankTwo = 0; rankTwo < 10; rankTwo++)
            {
            temp = ReadCookie(DataClassObject.GameName+'HighScoresName'+gameModeTwo+''+rankTwo+'');
            if (temp)  DataClassObject.HighScoresName[gameModeTwo][rankTwo] = temp;

            tempTwo = ReadCookie(DataClassObject.GameName+'HighScoresLevel'+gameModeTwo+''+rankTwo+'');
            if (tempTwo)  DataClassObject.HighScoresLevel[gameModeTwo][rankTwo] = parseInt(tempTwo);

            tempThree = ReadCookie(DataClassObject.GameName+'HighScoresScore'+gameModeTwo+''+rankTwo+'');
            if (tempThree)  DataClassObject.HighScoresScore[gameModeTwo][rankTwo] = parseInt(tempThree);
            }
        }

        for (let index = 0; index < 5; index++) {
            temp = ReadCookie(DataClassObject.GameName + 'GamepadUP'+index);
            if (temp) InputClassObject.GamepadUP[index] = parseInt(temp);

            temp = ReadCookie(DataClassObject.GameName + 'GamepadRIGHT'+index);
            if (temp) InputClassObject.GamepadRIGHT[index] = parseInt(temp);

            temp = ReadCookie(DataClassObject.GameName + 'GamepadDOWN'+index);
            if (temp) InputClassObject.GamepadDOWN[index] = parseInt(temp);

            temp = ReadCookie(DataClassObject.GameName + 'GamepadLEFT'+index);
            if (temp) InputClassObject.GamepadLEFT[index] = parseInt(temp);

            temp = ReadCookie(DataClassObject.GameName + 'GamepadBUTTONONE'+index);
            if (temp) InputClassObject.GamepadBUTTONONE[index] = parseInt(temp);

            temp = ReadCookie(DataClassObject.GameName + 'GamepadBUTTONTWO'+index);
            if (temp) InputClassObject.GamepadBUTTONTWO[index] = parseInt(temp);

            temp = ReadCookie(DataClassObject.GameName + 'ControllerID'+index);
            if (temp) InputClassObject.GamepadsOLD[index] = temp;
        }

        temp = ReadCookie(DataClassObject.GameName+'Version');
        if (temp)  DataClassObject.Version = parseInt(temp);
    }
    else if ( CheckHTML5LocalStorage() === true ) {
        temp = localStorage.getItem(DataClassObject.GameName + 'MusicVolume');
        if (temp)  AudioClassObject.MusicVolume = parseFloat(temp);

        temp = localStorage.getItem(DataClassObject.GameName + 'SoundVolume');
        if (temp)  AudioClassObject.SoundVolume = parseFloat(temp);

        temp = localStorage.getItem(DataClassObject.GameName + 'FullScreenMode');
        if (temp) VisualsClassObject.FullScreenMode = parseInt(temp);

        temp = localStorage.getItem(DataClassObject.GameName + 'GameMode');
        if (temp) GameMode = parseInt(temp);

        temp = localStorage.getItem(DataClassObject.GameName + 'CPUPlayerEnabled');
        if (temp) CPUPlayerEnabled = parseInt(temp);

        temp = localStorage.getItem(DataClassObject.GameName + 'DisplayDropShadow');
        if (temp) DisplayDropShadow = parseInt(temp);

        temp = localStorage.getItem(DataClassObject.GameName + 'PressingUPAction');
        if (temp) PressingUPAction = parseInt(temp);

        temp = localStorage.getItem(DataClassObject.GameName + 'KeyboardSpaceBarFunction');
        if (temp) InputClassObject.KeyboardSpaceBarFunction = parseInt(temp);

        for (let gameMode = 0; gameMode < 7; gameMode++) {
            for (let rank = 0; rank < 10; rank++) {
                temp = localStorage.getItem(DataClassObject.GameName + 'HighScoresName' + gameMode + '' + rank + '');
                if (temp) DataClassObject.HighScoresName[gameMode][rank] = temp;

                tempTwo = localStorage.getItem(DataClassObject.GameName + 'HighScoresLevel' + gameMode + '' + rank + '');
                if (tempTwo) DataClassObject.HighScoresLevel[gameMode][rank] = parseInt(tempTwo);

                tempThree = localStorage.getItem(DataClassObject.GameName + 'HighScoresScore' + gameMode + '' + rank + '');
                if (tempThree) DataClassObject.HighScoresScore[gameMode][rank] = parseInt(tempThree);
            }
        }

        for (let index = 0; index < 5; index++)
        {
            temp = localStorage.getItem(DataClassObject.GameName + 'GamepadUP'+index);
            if (temp) InputClassObject.GamepadUP[index] = parseInt(temp);

            temp = localStorage.getItem(DataClassObject.GameName + 'GamepadRIGHT'+index);
            if (temp) InputClassObject.GamepadRIGHT[index] = parseInt(temp);

            temp = localStorage.getItem(DataClassObject.GameName + 'GamepadDOWN'+index);
            if (temp) InputClassObject.GamepadDOWN[index] = parseInt(temp);

            temp = localStorage.getItem(DataClassObject.GameName + 'GamepadLEFT'+index);
            if (temp) InputClassObject.GamepadLEFT[index] = parseInt(temp);

            temp = localStorage.getItem(DataClassObject.GameName + 'GamepadBUTTONONE'+index);
            if (temp) InputClassObject.GamepadBUTTONONE[index] = parseInt(temp);

            temp = localStorage.getItem(DataClassObject.GameName + 'GamepadBUTTONTWO'+index);
            if (temp) InputClassObject.GamepadBUTTONTWO[index] = parseInt(temp);

            temp = localStorage.getItem(DataClassObject.GameName + 'ControllerID'+index);
            if (temp) InputClassObject.GamepadsOLD[index] = temp;
        }

        temp = localStorage.getItem(DataClassObject.GameName+'Version');
        if (temp)  DataClassObject.Version = parseInt(temp);
    }
}

//--------------------------------------------------------------------------------------------------------------
function SaveOptions()
{
    if ( CheckHTML5LocalStorage() === false )
    {
        CreateCookie(DataClassObject.GameName+'MusicVolume', AudioClassObject.MusicVolume, 9999);

        CreateCookie(DataClassObject.GameName+'SoundVolume', AudioClassObject.SoundVolume, 9999);

        CreateCookie(DataClassObject.GameName+'FullScreenMode', VisualsClassObject.FullScreenMode, 9999);

        CreateCookie(DataClassObject.GameName+'GameMode', GameMode, 9999);

        CreateCookie(DataClassObject.GameName+'CPUPlayerEnabled', CPUPlayerEnabled, 9999);

        CreateCookie(DataClassObject.GameName+'DisplayDropShadow', DisplayDropShadow, 9999);

        CreateCookie(DataClassObject.GameName+'PressingUPAction', PressingUPAction, 9999);

        CreateCookie(DataClassObject.GameName+'KeyboardSpaceBarFunction', InputClassObject.KeyboardSpaceBarFunction, 9999);

        for (let gameMode = 0; gameMode < 7; gameMode++)
        {
            for (let rank = 0; rank < 10; rank++)
            {
            CreateCookie(DataClassObject.GameName+'HighScoresName'+gameMode+''+rank+'', DataClassObject.HighScoresName[gameMode][rank], 9999);

            CreateCookie(DataClassObject.GameName+'HighScoresLevel'+gameMode+''+rank+'', DataClassObject.HighScoresLevel[gameMode][rank], 9999);

            CreateCookie(DataClassObject.GameName+'HighScoresScore'+gameMode+''+rank+'', DataClassObject.HighScoresScore[gameMode][rank], 9999);
            }
        }

        for (let index = 0; index < 5; index++) {
            CreateCookie(DataClassObject.GameName + 'GamepadUP'+index, InputClassObject.GamepadUP[index], 9999);

            CreateCookie(DataClassObject.GameName + 'GamepadRIGHT'+index, InputClassObject.GamepadRIGHT[index], 9999);

            CreateCookie(DataClassObject.GameName + 'GamepadDOWN'+index, InputClassObject.GamepadDOWN[index], 9999);

            CreateCookie(DataClassObject.GameName + 'GamepadLEFT'+index, InputClassObject.GamepadLEFT[index], 9999);

            CreateCookie(DataClassObject.GameName + 'GamepadBUTTONONE'+index, InputClassObject.GamepadBUTTONONE[index], 9999);

            CreateCookie(DataClassObject.GameName + 'GamepadBUTTONTWO'+index, InputClassObject.GamepadBUTTONTWO[index], 9999);

            if (InputClassObject.GameControllerInitialized[index] === true)  CreateCookie(DataClassObject.GameName + 'ControllerID'+index, InputClassObject.Gamepads[index].id, 9999);
        }

        CreateCookie(DataClassObject.GameName+'Version', DataClassObject.Version, 9999);
    }
    else if ( CheckHTML5LocalStorage() === true )

    {
        localStorage.setItem(DataClassObject.GameName+'MusicVolume', AudioClassObject.MusicVolume.toString());

        localStorage.setItem(DataClassObject.GameName+'SoundVolume', AudioClassObject.SoundVolume.toString());

        localStorage.setItem(DataClassObject.GameName+'FullScreenMode', VisualsClassObject.FullScreenMode.toString());

        localStorage.setItem(DataClassObject.GameName+'GameMode', GameMode.toString());

        localStorage.setItem(DataClassObject.GameName+'CPUPlayerEnabled', CPUPlayerEnabled.toString());

        localStorage.setItem(DataClassObject.GameName+'DisplayDropShadow', DisplayDropShadow.toString());

        localStorage.setItem(DataClassObject.GameName+'PressingUPAction', PressingUPAction.toString());

        localStorage.setItem(DataClassObject.GameName+'KeyboardSpaceBarFunction', InputClassObject.KeyboardSpaceBarFunction.toString());
        
        for (let gameModeTwo = 0; gameModeTwo < 7; gameModeTwo++)
	    {
            for (let rankTwo = 0; rankTwo < 10; rankTwo++)
            {
                localStorage.setItem(DataClassObject.GameName+'HighScoresName'+gameModeTwo+''+rankTwo+'', DataClassObject.HighScoresName[gameModeTwo][rankTwo]);

                localStorage.setItem(DataClassObject.GameName+'HighScoresLevel'+gameModeTwo+''+rankTwo+'', DataClassObject.HighScoresLevel[gameModeTwo][rankTwo]);

                localStorage.setItem(DataClassObject.GameName+'HighScoresScore'+gameModeTwo+''+rankTwo+'', DataClassObject.HighScoresScore[gameModeTwo][rankTwo]);
            }
        }

        for (let index = 0; index < 5; index++) {
            localStorage.setItem(DataClassObject.GameName + 'GamepadUP'+index, InputClassObject.GamepadUP[index]);

            localStorage.setItem(DataClassObject.GameName + 'GamepadRIGHT'+index, InputClassObject.GamepadRIGHT[index]);

            localStorage.setItem(DataClassObject.GameName + 'GamepadDOWN'+index, InputClassObject.GamepadDOWN[index]);

            localStorage.setItem(DataClassObject.GameName + 'GamepadLEFT'+index, InputClassObject.GamepadLEFT[index]);

            localStorage.setItem(DataClassObject.GameName + 'GamepadBUTTONONE'+index, InputClassObject.GamepadBUTTONONE[index]);

            localStorage.setItem(DataClassObject.GameName + 'GamepadBUTTONTWO'+index, InputClassObject.GamepadBUTTONTWO[index]);

            if (InputClassObject.GameControllerInitialized[index] === true)  localStorage.setItem(DataClassObject.GameName + 'ControllerID'+index, InputClassObject.Gamepads[index].id);
        }

        localStorage.setItem(DataClassObject.GameName+'Version', DataClassObject.Version);
    }
}

//--------------------------------------------------------------------------------------------------------------
function InitializeHighScores()
{
    for (let gameMode = 0; gameMode < 7; gameMode++)
    {
        DataClassObject.HighScoresName[gameMode][0] = "JeZxLee";
        DataClassObject.HighScoresName[gameMode][1] = "Doatheman";
        DataClassObject.HighScoresName[gameMode][2] = "mattmatteh";

        for (let index = 3; index < 10; index++) {
            DataClassObject.HighScoresName[gameMode][index] = "You!";
        }

        let lvl = 10;
        for (let index = 0; index < 10; index++) {
            DataClassObject.HighScoresLevel[gameMode][index] = lvl;
            lvl-=1;
        }

        let scr = 5000;
        for (let index = 0; index < 10; index++) {
            DataClassObject.HighScoresScore[gameMode][index] = scr;
            scr-=500;
        }
    }

    DataClassObject.HighScoresLevel[6][0] = 31;
    DataClassObject.HighScoresLevel[6][1] = 31;
    DataClassObject.HighScoresLevel[6][2] = 30;
    DataClassObject.HighScoresLevel[6][3] = 25;
    DataClassObject.HighScoresLevel[6][4] = 25;
    DataClassObject.HighScoresLevel[6][5] = 20;
    DataClassObject.HighScoresLevel[6][6] = 15;
    DataClassObject.HighScoresLevel[6][7] = 10;
    DataClassObject.HighScoresLevel[6][8] = 5;
    DataClassObject.HighScoresLevel[6][9] = 1;
}

//--------------------------------------------------------------------------------------------------------------
function CheckForNewHighScores()
{
    if (InputClassObject.GameWasQuit === true)  return;

    let human = new Array(5);
    
    for (let index = 0; index < 5; index++)
    {
        human[index] = PlayerInput[index] !== CPU;
    }

    DataClassObject.NewHighScoreRank = 999;

    if (GameMode === FirefoxStoryMode) DataClassObject.PlayerWithHighestScore = 0;
    else
    {
        DataClassObject.PlayerWithHighestScore = 0;
        for (let indexTwo = 0; indexTwo < 5; indexTwo++)
        {
            if (human[indexTwo] === true && Score[indexTwo] >= Score[DataClassObject.PlayerWithHighestScore])  DataClassObject.PlayerWithHighestScore = indexTwo;
        }
    }

    for (let rankTwo = 9; rankTwo > -1; rankTwo--)
    {
	    if ( Score[DataClassObject.PlayerWithHighestScore] >= parseInt(DataClassObject.HighScoresScore[GameMode][rankTwo]) )  DataClassObject.NewHighScoreRank = rankTwo;
    }

    if (DataClassObject.NewHighScoreRank < 999)
    {
        for (let rankThree = 8; rankThree > DataClassObject.NewHighScoreRank-1; rankThree--)
        {
            DataClassObject.HighScoresName[GameMode][rankThree+1] = DataClassObject.HighScoresName[GameMode][rankThree];
            DataClassObject.HighScoresLevel[GameMode][rankThree+1] = DataClassObject.HighScoresLevel[GameMode][rankThree];
            DataClassObject.HighScoresScore[GameMode][rankThree+1] = DataClassObject.HighScoresScore[GameMode][rankThree];
        }

        DataClassObject.HighScoresName[GameMode][DataClassObject.NewHighScoreRank] = " ";

        DataClassObject.HighScoresLevel[GameMode][DataClassObject.NewHighScoreRank] = ""+Level[DataClassObject.PlayerWithHighestScore]+"";

        DataClassObject.HighScoresScore[GameMode][DataClassObject.NewHighScoreRank] = ""+Score[DataClassObject.PlayerWithHighestScore]+"";


    }   
}	
