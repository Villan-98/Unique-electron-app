const invoice=require('./invoice')
const company=require('./company')
const transaction=require('./transaction')
const party=require('./party')
const getInvoiceOnly=function(event,data){
    company.getMyCompany()
    .then(company=>{
        let reportData={}
        reportData['company']=company
        party.getGivenParty(data)
        .then(party=>{
            reportData['party']=party
            invoice.partywiseInvoiceDetail(data)
            .then(invoice=>{
                reportData['invoiceData']=invoice
                event.sender.send('gotReportInvoiceOnly',{
                    data:reportData,
                    err:null,
                    success:true
                })
            })
        }) 
    })
    .catch(err=>{
        console.log(err)
        event.reply('gotReportInvoiceOnly',{
            data:null,
            err:err,
            success:false
        })
    })
}
const getPaymentOnly=function(event,data){
    company.getMyCompany()
    .then(company=>{
        let reportData={}
        reportData['company']=company
        party.getGivenParty(data)
        .then(party=>{
            reportData['party']=party
            transaction.getPartywiseTransaction(data)
            .then(transaction=>{
                reportData['transactionData']=transaction    
                event.sender.send('gotReportPaymentOnly',{
                    data:reportData,
                    err:null,
                    success:true
                })
            })
        })
    }) 
    .catch(err=>{
        console.log(err)
        event.sender.send('gotReportPaymentOnly',{
            data:null,
            err:err,
            success:false
        })
    })
}
const getReportAll=function(event,data){
    company.getMyCompany()
    .then(company=>{
        let reportData={}
        reportData['company']=company
        party.getGivenParty(data)
        .then(party=>{
            reportData['party']=party
            invoice.partywiseInvoiceDetail(data)
            .then(invoice=>{
                reportData['invoiceData']=invoice
                transaction.getPartywiseTransaction(data)
                .then(transaction=>{
                    reportData['transactionData']=transaction    
                    event.sender.send('gotReportAll',{
                        data:reportData,
                        err:null,
                        success:true
                    })
                })
            })
        }) 
    })
    .catch(err=>{
        console.log(err)
        event.sender.send('gotReportAll',{
            data:null,
            err:err,
            success:false
        })
    })
}
module.exports={getInvoiceOnly,getReportAll,getPaymentOnly}