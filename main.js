const electron=require('electron')
const path=require('path')
const url =require('url')
const {BrowserWindow,app}=electron
let mainWindow
app.on('ready',()=>{
    mainWindow=new BrowserWindow({})
    //load html file
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,'mainWindow.html'),
        protocol:'file',
        slashes:true
    }))

    //quit app when main window is closed
    mainWindow.on('closed',function(){
        app.quit()
    })
})