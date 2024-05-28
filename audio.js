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

// "audio.js"...

//--------------------------------------------------------------------------------------------------------------
function PlaySoundEffect(index)
{
    let soundFormat = "mp3";
    let soundFile = " ";

    if (ThinkRussianTimer > 0)  return;
    
    if (AudioClassObject.SoundVolume === 0)  return;

    if (index === 0)  soundFile = "./data/audio/effects/MenuClick."+soundFormat;
    else if (index === 1)  soundFile = "./data/audio/effects/MenuMove."+soundFormat;
    else if (index === 2)  soundFile = "./data/audio/effects/MovePiece."+soundFormat;
    else if (index === 3)  soundFile = "./data/audio/effects/PieceCollision."+soundFormat;
    else if (index === 4)  soundFile = "./data/audio/effects/PieceDrop."+soundFormat;
    else if (index === 5)  soundFile = "./data/audio/effects/PieceRotate."+soundFormat;
    else if (index === 6)  soundFile = "./data/audio/effects/LineCleared."+soundFormat;
    else if (index === 7)  soundFile = "./data/audio/effects/TetriCleared."+soundFormat;
    else if (index === 8)  soundFile = "./data/audio/effects/LevelUp."+soundFormat;
    else if (index === 9)  soundFile = "./data/audio/effects/MustThinkInRussian."+soundFormat;
    else if (index === 10)  soundFile = "./data/audio/effects/IncomingLine."+soundFormat;
    else if (index === 11)  soundFile = "./data/audio/effects/GameOver."+soundFormat;
    else if (index === 12)  soundFile = "./data/audio/effects/Crack."+soundFormat;
    else if (index === 13)  soundFile = "./data/audio/effects/ShallWePlayAGame."+soundFormat;
    else if (index === 14)  soundFile = "./data/audio/effects/Sword."+soundFormat;
    else if (index === 15)  soundFile = "./data/audio/effects/Title-Speech."+soundFormat;

    AudioClassObject.SoundArray[0] = document.createElement("Audio");
    AudioClassObject.SoundArray[0].src = soundFile;
    AudioClassObject.SoundArray[0].preLoad = "auto";

    AudioClassObject.SoundArray[0].volume = AudioClassObject.SoundVolume;
    AudioClassObject.SoundArray[0].currentTime = 0;
    AudioClassObject.SoundArray[0].play();
}

//--------------------------------------------------------------------------------------------------------------
function PlayMusic(index)
{
    let soundFormat = "mp3";

    if (AudioClassObject.MusicVolume === 0)  return;

    if (AudioClassObject.AtLeastOneMusicHasPlayed === true){
        AudioClassObject.MusicArray[0].pause();
        AudioClassObject.MusicArray[0].setAttribute('src', "./data/audio/music/Track-0"+(index+1)+"-BGM."+soundFormat);
        AudioClassObject.MusicArray[0].load();
    }
    else{
        AudioClassObject.MusicArray[0] = document.createElement("Audio");
        AudioClassObject.MusicArray[0].src = "./data/audio/music/Track-0"+(index+1)+"-BGM."+soundFormat;//soundFile;
        AudioClassObject.MusicArray[0].preLoad = "auto";
    }

    AudioClassObject.MusicArray[0].currentTime = 0;

    AudioClassObject.MusicArray[0].volume = AudioClassObject.MusicVolume;

    AudioClassObject.MusicArray[0].loop = true;
    AudioClassObject.MusicArray[0].play();
    AudioClassObject.AtLeastOneMusicHasPlayed = true;
}
