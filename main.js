const electron=require('electron')
const path=require('path')
const url =require('url')
const {BrowserWindow,app,ipcMain}=electron
const newWin=require('./newWin').createWin
const db=require('./db/models')
const routes=require('./routes')
const fs=require('fs')
const os=require('os')
const shell =electron.shell

let mainWindow
app.on('ready',()=>{
    let mainScreenDimensions = require('electron').screen.getPrimaryDisplay().size;
    mainWindow=new BrowserWindow({
        width:600,
        height:600
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
ipcMain.on('addUnit',routes.unit.addUnit)
ipcMain.on('getUnit',routes.unit.getUnit)
ipcMain.on('addItem',routes.item.addItem)
ipcMain.on('getItem',routes.item.getItem)
ipcMain.on('fetchParty',routes.party.fetchParty)
ipcMain.on('saveInvoice',routes.invoice.createInvoice)
ipcMain.on('fetchInvoiceNo',routes.invoice.fetchInvoiceNo)
ipcMain.on('getAllInvoiceDetail',routes.invoice.getAllInvoiceDetail)
ipcMain.on('createJobType',routes.jobType_status.createJobType)
ipcMain.on('fetchJobType',routes.jobType_status.fetchJobType)
ipcMain.on('fetchGivenInvoice',routes.invoice.fetchGivenInvoice)
ipcMain.on('createNewTransaction',routes.transaction.newTransaction)
ipcMain.on('fetchPartywiseInvoiceDetail',routes.invoice.partywiseInvoiceDetail)
ipcMain.on('fetchPartywisePayment',routes.transaction.partywiseTransaction)
ipcMain.on('fetchGivenParty',routes.party.givenParty)
ipcMain.on('getReportInvoiceOnly',routes.report.getInvoiceOnly)
ipcMain.on('getReportPaymentOnly',routes.report.getPaymentOnly)
ipcMain.on('getReportAll',routes.report.getReportAll)
ipcMain.on('printPdf',function(event){
    const pdfPath=path.join(os.tmpdir(),'printPdf')
    const win=BrowserWindow.fromWebContents(event.sender)
    win.webContents.printToPDF({},function(error,data){
        if(error){
            return console.log(error)
        }
        fs.writeFile(pdfPath,data,function(error){
            if(error)
            {
                return console.log(error.message)
            }
            shell.openExternal('file://'+pdfPath)
            event.sender.send('wrotePdf',pdfPath)
        })
    })
})