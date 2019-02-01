const detail=require('../db/models').invoiceDetail
const description=require('../db/models').invoiceDiscription
const db=require('../db/models').db
const Sequelize=require('sequelize')
const createInvoice=function(event,requery){
    db.transaction(function(t){
        return  detail.create({
            gstTotal:requery.detail.gstTotal,
            totalAmount:requery.detail.totalAmount,
            remark:requery.detail.remark,
            partyId:1,
            id:requery.detail.invoiceNo
        },{transaction:t})        
    .then((data)=>{
        return description.bulkCreate(requery.description,{transaction:t})
     })
    }).then((data)=>{
        console.log(data)
        event.sender.send('invoiceSaved',{
            success:true,
            data:data,
            err:null
        })
    })
    .catch((err)=>{
        console.log(err)
        event.sender.send('invoiceSaved',{
            success:false,
            data:null,
            err:err
        })
    })
    
}
const fetchInvoiceNo=function(event,data){
    detail.findOne({
        order:[['id','DESC']]
    }).then((data)=>{
        //console.log(data)
        event.sender.send('fetchedInvoiceNo',{
           data: data,
           success:true,
           error:null
        })
    }).catch((err)=>{
        //console.log(error)
        event.sender.send('fetchedInvoiceNo',{
            data: data,
            success:false,
            error:err
         })  
    })
}

module.exports={createInvoice,fetchInvoiceNo}