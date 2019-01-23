const electron=require('electron')
const path=require('path')
const url =require('url')
const {BrowserWindow,app,ipcMain}=electron
const newWin=require('./newWin').createWin
const db=require('./db/models')
const routes=require('./routes')
let mainWindow
app.on('ready',()=>{
    let mainScreenDimensions = require('electron').screen.getPrimaryDisplay().size;
    mainWindow=new BrowserWindow({
        width:mainScreenDimensions.width,
        height:mainScreenDimensions.height
    })
    //load html file
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,'public_static','mainWindow.html'),
        protocol:'file',
        slashes:true
    }))

    //quit app when main window is closed
    mainWindow.on('closed',function(){
        app.quit()
    })
})
ipcMain.on('openNewWindow',newWin)
ipcMain.on('addParty',routes.party.addParty)
ipcMain.on('getCompany',routes.company.getCompany)
ipcMain.on('upsertCompany',routes.company.upsertCompany)