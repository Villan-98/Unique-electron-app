const electron=require('electron')
const { BrowserWindow}=electron
const url=require('url')
const path=require('path')

const createWin=function(e,data){
    console.log("here")
    newWin=new BrowserWindow(({
        title:data.windowName
    }))

    newWin.loadURL(url.format({
        pathname:path.join(__dirname,'public_static/views',data.windowName),
        protocol:'file:',
        slashes:true
    }))
}
module.exports={createWin}