const electron=require('electron')
const { BrowserWindow}=electron
const url=require('url')
const path=require('path')

const createWin=function(e,data){
    console.log("here")
    let mainScreenDimensions = require('electron').screen.getPrimaryDisplay().size;
    let newWin
    if(data.windowName==='newInvoice.html'|| data.windowName==='myCompany.html'|| data.windowName==='viewInvoice.html')
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
            title:data.windowName,
        }))
    }

    newWin.loadURL(url.format({
        pathname:path.join(__dirname,'public_static/views',data.windowName),
        protocol:'file:',
        slashes:true,
    }))
        if(data.task==='printInvoice')
        {
            newWin.webContents.on('did-frame-finish-load', () => {
            var d = new Date();
            var n = d.getTime();
            console.log(n)
            console.log("skdfja")
            console.log(data.invoiceNo)
            newWin.webContents.send('takeInvoiceNo',`${data.task}-${data.invoiceNo}`)
          })   
        }
}
module.exports={createWin}