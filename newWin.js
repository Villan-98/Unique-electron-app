const electron=require('electron')
const { BrowserWindow}=electron
const url=require('url')
const path=require('path')

const createWin=function(e,data){
    console.log("here")
    let mainScreenDimensions = require('electron').screen.getPrimaryDisplay().size;
    let newWin
    if(data.windowName==='newInvoice.html')
    {
        console.log("Yes")
        newWin=new BrowserWindow(({
            title:data.windowName,

            width:mainScreenDimensions.width,
            height:mainScreenDimensions.height
        }))

    }
    else
    {
        newWin=new BrowserWindow(({
            title:data.windowName
        }))
    }

    newWin.loadURL(url.format({
        pathname:path.join(__dirname,'public_static/views',data.windowName),
        protocol:'file:',
        slashes:true
    }))
    console.log(data.invoiceNo)
    if(data.invoiceNo)
    {
        newWin.webContents.on('did-finish-load', () => {
            console.log("skdfja")
            newWin.webContents.send('takeInvoiceNo',data.invoiceNo)
          })
    }
}
module.exports={createWin}