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

// "input.js"...

//--------------------------------------------------------------------------------------------------------------
function CheckForMouseButtonClick()
{
    if (InputClassObject.DelayAllUserInput === 0)  InputClassObject.MouseButtonClicked = true;
}

//--------------------------------------------------------------------------------------------------------------
function CheckForMouseButtonDown()
{
    InputClassObject.MouseButtonDown = true;
}

//--------------------------------------------------------------------------------------------------------------
function CheckForMouseButtonUp()
{
    InputClassObject.MouseButtonDown = false;
    InterfaceClassObject.GamepadSelectedByPlayer = -1;
}

//--------------------------------------------------------------------------------------------------------------
function CheckForKeyPress(evt)
{
    if (InputClassObject.DelayAllUserInput === 0)
    {
        if (String.fromCharCode(evt.keyCode) !== " ")  InputClassObject.KeyboardCharacterPressed =  String.fromCharCode(evt.which || evt.keyCode);
	
        switch (evt.keyCode)
        {
            case 8:
            InputClassObject.KeyboardCharacterPressed = "=";
            break;

            case 13:
            InputClassObject.KeyboardCharacterPressed = "/";
            break;

            case 27:
            InputClassObject.KeyboardCharacterPressed = "~";
            InputClassObject.GameWasQuit = true;
            break;

            default:
            break;
        }
    }
}

//--------------------------------------------------------------------------------------------------------------
function CheckForKeyDown(evt)
{
    if (InputClassObject.DelayAllUserInput === 0)
    {
	if (evt.keyCode === 8)  InputClassObject.KeyboardCharacterPressed = "=";
	else if (evt.keyCode === 13)  InputClassObject.KeyboardCharacterPressed = "/";
	else if (evt.keyCode === 27)  InputClassObject.KeyboardCharacterPressed = "~";
	else if (evt.keyCode === 32)  InputClassObject.KeyboardCharacterPressed = "_";
	
        if (evt.keyCode === 38)  InputClassObject.JoystickDirection[Keyboard] = InputClassObject.UP;
        else if (evt.keyCode === 39)  InputClassObject.JoystickDirection[Keyboard] = InputClassObject.RIGHT;
        else if (evt.keyCode === 40)  InputClassObject.JoystickDirection[Keyboard] = InputClassObject.DOWN;
        else if (evt.keyCode === 37)  InputClassObject.JoystickDirection[Keyboard] = InputClassObject.LEFT;

	if (evt.keyCode === 90)  InputClassObject.JoystickButtonOne[Keyboard] = true;
	else if (evt.keyCode === 88)  InputClassObject.JoystickButtonTwo[Keyboard] = true;
    }
}

//--------------------------------------------------------------------------------------------------------------
function CheckForKeyRelease(evt)
{
    if (evt.keyCode === 38)       InputClassObject.JoystickDirection[Keyboard] = InputClassObject.CENTER;
    else if (evt.keyCode === 39)  InputClassObject.JoystickDirection[Keyboard] = InputClassObject.CENTER;
    else if (evt.keyCode === 40)  InputClassObject.JoystickDirection[Keyboard] = InputClassObject.CENTER;
    else if (evt.keyCode === 37)  InputClassObject.JoystickDirection[Keyboard] = InputClassObject.CENTER;

    if (evt.keyCode === 90)  InputClassObject.JoystickButtonOne[Keyboard] = false;
    else if (evt.keyCode === 88)  InputClassObject.JoystickButtonTwo[Keyboard] = false;
}

//--------------------------------------------------------------------------------------------------------------
function CheckForGamepadInput(index)
{
    let axis = new Array(6);
    let button = new Array(21);
    let axisIndex;
    let buttonIndex;

    if (InputClassObject.GameControllerInitialized[index] === false)  return;

    if (InputClassObject.GamepadConfigPadIndex !== -1)  return;

    if (InputClassObject.DelayAllUserInput > 0)  return;
    
    for (axisIndex = 0; axisIndex < 6; axisIndex++)  axis[axisIndex] = 0;
    for (buttonIndex = 0; buttonIndex < 21; buttonIndex++)  button[buttonIndex] = 0;

    for (axisIndex = 0; axisIndex < 6; axisIndex++)
    {
        if (InputClassObject.Gamepads[index])
        {
            if (InputClassObject.Gamepads[index].axes[axisIndex])
            {
                axis[axisIndex] = InputClassObject.Gamepads[index].axes[axisIndex];
            }
        }
    }

    for (buttonIndex = 0; buttonIndex < 21; buttonIndex++)
    {
        if (InputClassObject.Gamepads[index])
        {               
            if (InputClassObject.Gamepads[index].buttons[buttonIndex])
            {
                button[buttonIndex] = InputClassObject.Gamepads[index].buttons[buttonIndex].pressed;
            }
        }
    }

    InputClassObject.JoystickDirection[index+2] = InputClassObject.CENTER;
    for (axisIndex = 0; axisIndex < 6; axisIndex++)
    {
        if (InputClassObject.GamepadUP[index] === axisIndex)
        {
            if (axis[axisIndex] < -0.75)  InputClassObject.JoystickDirection[index+2] = InputClassObject.UP;
        }

        if (InputClassObject.GamepadDOWN[index] === axisIndex)
        {
            if (axis[axisIndex] > 0.75)  InputClassObject.JoystickDirection[index+2] = InputClassObject.DOWN;
        }

        if (InputClassObject.GamepadLEFT[index] === axisIndex)
        {
            if (axis[axisIndex] < -0.75)  InputClassObject.JoystickDirection[index+2] = InputClassObject.LEFT;
        }
        
        if (InputClassObject.GamepadRIGHT[index] === axisIndex)
        {
            if (axis[axisIndex] > 0.75)  InputClassObject.JoystickDirection[index+2] = InputClassObject.RIGHT;
        }
    }

    for (buttonIndex = 0; buttonIndex < 21; buttonIndex++)
    {
        if ( InputClassObject.GamepadUP[index] === (10+buttonIndex) )
        {
            if (button[buttonIndex] >.75)  InputClassObject.JoystickDirection[index+2] = InputClassObject.UP;
        }

        if ( InputClassObject.GamepadDOWN[index] === (10+buttonIndex) )
        {
            if (button[buttonIndex] > .75)  InputClassObject.JoystickDirection[index+2] = InputClassObject.DOWN;
        }

        if ( InputClassObject.GamepadLEFT[index] === (10+buttonIndex) )
        {
            if (button[buttonIndex] > .75)  InputClassObject.JoystickDirection[index+2] = InputClassObject.LEFT;
        }

        if ( InputClassObject.GamepadRIGHT[index] === (10+buttonIndex) )
        {
            if (button[buttonIndex] > .75)  InputClassObject.JoystickDirection[index+2] = InputClassObject.RIGHT;
        }
    }

    InputClassObject.JoystickButtonOne[index+2] = false;
    InputClassObject.JoystickButtonTwo[index+2] = false;
    for (buttonIndex = 0; buttonIndex < 21; buttonIndex++)
    {
        if ( InputClassObject.GamepadBUTTONONE[index] === (10+buttonIndex) )
        {
            if (button[buttonIndex] > .5)  InputClassObject.JoystickButtonOne[index+2] = true;
        }
        if ( InputClassObject.GamepadBUTTONTWO[index] === (10+buttonIndex) )
        {
            if (button[buttonIndex] > .5)  InputClassObject.JoystickButtonTwo[index+2] = true;
        }
    }
}

//--------------------------------------------------------------------------------------------------------------
function QueryGamepadsForInput(index)
{
    let axisIndex;
    let buttonIndex;

    if (InputClassObject.DelayAllUserInput > 0)  return(-1);

    for (axisIndex = 0; axisIndex < 6; axisIndex++)
    {
        if (InputClassObject.Gamepads[index])
        {
            if (InputClassObject.Gamepads[index].axes[axisIndex])
            {
                if (InputClassObject.Gamepads[index].axes[axisIndex] < -.75 || InputClassObject.Gamepads[index].axes[axisIndex] > .75) {
                    InputClassObject.GameControllerInitialized[index] = true;
                    return (InputClassObject.GamepadAxisZero + axisIndex);
                }
            }
        }
    }

    for (buttonIndex = 0; buttonIndex < 21; buttonIndex++)
    {
        if (InputClassObject.Gamepads[index])
        {               
            if (InputClassObject.Gamepads[index].buttons[buttonIndex])
            {
                if (InputClassObject.Gamepads[index].buttons[buttonIndex].pressed === true) {
                    InputClassObject.GameControllerInitialized[index] = true;
                    return (InputClassObject.GamepadButtonZero + buttonIndex);
                }
            }
        }
    }
    
    return(-1);
}
