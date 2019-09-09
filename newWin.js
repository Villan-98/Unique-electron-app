const electron=require('electron')
const { BrowserWindow}=electron
const url=require('url')
const path=require('path')
global.addPartyWindow=null
global.itemMasterWindow=null
global.myCompanyWindow=null
global.newInvoiceWindow=null
global.printInvoiceWindow=null
global.reportWindow=null
global.savedInvoiceWindow=null
global.transactionWindow=null
global.unitMasterWindow=null
global.viewInvoiceWindow=null

let mainScreenDimensions
const windowHelper=function(title,width,height)
{
    newWin=new BrowserWindow(({
            title:title||"xyz",
            width:width,
            height:height
        }))
    newWin.loadURL(url.format({
        pathname:path.join(__dirname,'public_static/views',title),
        protocol:'file:',
        slashes:true,
    }))
    return newWin
}
const createWin=function(e,data){
    console.log("here")
    console.log(data)
    mainScreenDimensions = require('electron').screen.getPrimaryDisplay().size;
    
    if(addPartyWindow===null && data.windowName==='addParty.html')
    {
        addPartyWindow=windowHelper(data.windowName,mainScreenDimensions.width,mainScreenDimensions.height)
        addPartyWindow.on('closed',()=>{addPartyWindow=null})
    }
    else if(itemMasterWindow===null && data.windowName==='itemMaster.html')
    {
        itemMasterWindow=windowHelper(data.windowName,mainScreenDimensions.width,mainScreenDimensions.height)
        itemMasterWindow.on('closed',()=>{itemMasterWindow=null})
    }
    else if(myCompanyWindow===null && data.windowName==='myCompany.html')
    {
        myCompanyWindow=windowHelper(data.windowName,mainScreenDimensions.width,mainScreenDimensions.height)
        myCompanyWindow.on('closed',()=>{myCompanyWindow=null})
    }
    else if(newInvoiceWindow===null && data.windowName==='newInvoice.html')
    {
        newInvoiceWindow=windowHelper(data.windowName,mainScreenDimensions.width,mainScreenDimensions.height)
        newInvoiceWindow.on('closed',()=>{newInvoiceWindow=null})
    }
    else if(printInvoiceWindow===null && data.windowName==='printWindow.html')
    {
        printInvoiceWindow=windowHelper(data.windowName,mainScreenDimensions.width,mainScreenDimensions.height)
        printInvoiceWindow.on('closed',()=>{printInvoiceWindow=null})
    }
    else if(reportWindow==null && data.windowName==='report.html')
    {
        reportWindow=windowHelper(data.windowName,mainScreenDimensions.width,mainScreenDimensions.height)
        reportWindow.on('closed',()=>{reportWindow=null})
    }
    else if(savedInvoiceWindow===null && data.windowName==='savedInvoice.html')
    {
        savedInvoiceWindow=windowHelper(data.windowName,mainScreenDimensions.width,mainScreenDimensions.height)
        savedInvoiceWindow.on('closed',()=>{savedInvoiceWindow=null})
    }
    else if(transactionWindow===null && data.windowName==='transaction.html')
    {
        transactionWindow=windowHelper(data.windowName,mainScreenDimensions.width,mainScreenDimensions.height)
        transactionWindow.on('closed',()=>{transactionWindow=null})
    }   
    else if(unitMasterWindow===null && data.windowName==='unitMaster.html')
    {
        unitMasterWindow=windowHelper(data.windowName,mainScreenDimensions.width,mainScreenDimensions.height)
        unitMasterWindow.on('closed',()=>{unitMasterWindow=null})
    } 
    else if( viewInvoiceWindow===null && data.windowName==='viewInvoice.html')
    {
        viewInvoiceWindow=windowHelper(data.windowName,mainScreenDimensions.width,mainScreenDimensions.height)
        viewInvoiceWindow.on('closed',()=>{viewInvoiceWindow=null})
    }
    else
    {
        console.log("sorry repeated windows are not allowed")
    }
    console.log(data)
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