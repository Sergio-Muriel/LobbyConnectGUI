# Lobby connect GUI

This is a really simple interface for [Goldberg Emu lobby_connect](https://gitlab.com/Mr_Goldberg/goldberg_emulator)

##  Preview:
![image](https://user-images.githubusercontent.com/3207785/173781518-b17c7d93-a980-4af5-a2e4-138e96a29dda.png)



## Dependencies:
1. Have [git-bash](https://www.atlassian.com/git/tutorials/git-bash "git-bash") installed
2. Have [node-js](https://nodejs.org/en/download/ "node-js") installed.
3. Get the lobby_connect.exe executable file from GoldenBerg Emu.

## Build:
1. Open git-bash and clone the repository:
`$ git clone https://github.com/Sergio-Muriel/LobbyConnectGUI`

2. Enter the cloned directory:
`$ cd LobbyConnectGUI`

3. Install the dependencies:
`$ npm install`

4. Copy the lobby_connect.exe file in the root folder of LobbyConnectGUI

5. Run the build:
`npm run make`

6. Get the result that is in the folder **out/**

## Add new games:
To add new games, you should edit the [appIds.js](https://github.com/Sergio-Muriel/LobbyConnectGUI/blob/main/appIds.js) file, and add the corresponding name / id of the game.
