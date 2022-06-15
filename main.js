// main.js

const testLoader  = import('./lobby_connect.js')
let test = null;




// Modules to control application life and create native browser window
const { app, BrowserWindow,Menu, Tray , Notification   } = require('electron')
const path = require('path')


var Players = [];

testLoader.then((lobby_connect) => {
    const createWindow = () => {
        // Create the browser window.
        const mainWindow = new BrowserWindow({
            width: 400,
            height: 600,
            autoHideMenuBar: true,
            //frame: false,
            icon: __dirname + '/icon.png',
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })

        // and load the index.html of the app.
        mainWindow.loadFile('index.html')

        // Open the DevTools.
        // mainWindow.webContents.openDevTools()
    }

    appIcon = new Tray( __dirname + '/icon.png')


    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.whenReady().then(() => {
        if (process.platform === 'win32') {
            app.setAppUserModelId("com.ikobit.desktop-notifications");
        }
        createWindow()

        app.on('activate', () => {
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })
    })

    // Quit when all windows are closed, except on macOS. There, it's common
    // for applications and their menu bar to stay active until the user quits
    // explicitly with Cmd + Q.
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })

    // In this file you can include the rest of your app's specific main process
    // code. You can also put them in separate files and require them here.

    // In main process.
    const { ipcMain } = require('electron')
    ipcMain.on('asynchronous-message', (event, arg) => {


        if(arg==="update")
        {
            return lobby_connect.update();
        }

        let x = lobby_connect.get();

        event.reply('asynchronous-reply', JSON.stringify(x))


        let menu = [];
        menu.push({label:'User list'});
        let newPlayers = [];

        for(key in x)
        {
            let line = x[key];
            let currentDate = new Date().getTime() / 1000;
            let online = currentDate < line.timeout;
            if(online) 
            {
                if(Players.indexOf(line.name)===-1)
                {
                    const getName =  require('./appIds.js').getName;
                    new Notification({ title: 'New player connected!', body:  line.name+' has starting playing the game '+getName(line.appID)+'!' }).show()

                }
                newPlayers.push(line.name);
                menu.push( { label: ' - '+line.name });
            }
        }
        Players = newPlayers;

        const contextMenu = Menu.buildFromTemplate(menu);
        // Call this again for Linux because we modified the context menu
        appIcon.setContextMenu(contextMenu)
        appIcon.setToolTip('Players playing: '+x.length)
        appIcon.setTitle('This is my title')


    })

    ipcMain.on('synchronous-message', (event, arg) => {
        event.returnValue = 'pong'
    })

})
