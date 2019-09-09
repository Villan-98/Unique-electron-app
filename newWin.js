const electron=require('electron')
const { BrowserWindow}=electron
const url=require('url')
const path=require('path')
global.view=null;
global.savedInvoiceWindow=null
const createWin=function(e,data){
    console.log("here")
    let mainScreenDimensions = require('electron').screen.getPrimaryDisplay().size;
    let newWin
    if(data.windowName==='newInvoice.html'|| data.windowName==='myCompany.html'|| data.windowName==='viewInvoice.html'||data.windowName==='savedInvoice')
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
    if(data.windowName==='viewInvoice.html')
    {
        view=newWin;
    }
    else if(data.task==='viewSavedInvoice')
    {
        console.log("hi")
        savedInvoiceWindow=newWin
    }
    newWin.loadURL(url.format({
        pathname:path.join(__dirname,'public_static/views',data.windowName),
        protocol:'file:',
        slashes:true,
    }))
    console.log(data)
    if(data.task==='printInvoice'||data.task==='viewSavedInvoice')
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