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
    newWin=new BrowserWindow({
            title:title||"xyz",
            width:width,
            height:height,
            webPreferences:{
            nodeIntegration:true
            }
        })
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
    let width=800
    let height=700
    if(addPartyWindow===null && data.windowName==='addParty.html')
    {
        addPartyWindow=windowHelper(data.windowName,width,height)
        addPartyWindow.on('closed',()=>{addPartyWindow=null})
    }
    else if(itemMasterWindow===null && data.windowName==='itemMaster.html')
    {
        height=900
        width=800
        itemMasterWindow=windowHelper(data.windowName,width,height)
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
        reportWindow=windowHelper(data.windowName,width,height)
        reportWindow.on('closed',()=>{reportWindow=null})
    }
    else if(savedInvoiceWindow===null && data.windowName==='savedInvoice.html')
    {
        savedInvoiceWindow=windowHelper(data.windowName,mainScreenDimensions.width,mainScreenDimensions.height)
        savedInvoiceWindow.on('closed',()=>{savedInvoiceWindow=null})
    }
    else if(transactionWindow===null && data.windowName==='transaction.html')
    {
        transactionWindow=windowHelper(data.windowName,width,height)
        transactionWindow.on('closed',()=>{transactionWindow=null})
    }   
    else if(unitMasterWindow===null && data.windowName==='unitMaster.html')
    {
        unitMasterWindow=windowHelper(data.windowName,width,height)
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
    //console.log(data)
    
}
module.exports={createWin}