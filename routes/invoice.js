const detail=require('../db/models').invoiceDetail
const description=require('../db/models').invoiceDiscription
const db=require('../db/models').db
const createInvoice=function(event,requery){
    db.transaction(function(t){
        return  detail.upsert({
            gstTotal:requery.detail.gstTotal,
            totalAmount:requery.detail.totalAmount,
            remark:requery.detail.remark,
            partyId:1,
            id:requery.detail.invoiceNo,
            invoiceDate:requery.detail.invoiceDate
        },{transaction:t})        
        .then((data)=>{
            return description.destroy({
                where:{
                invoiceDetailId:requery.detail.invoiceNo
                }
                },{transaction:t})
                .then((data)=>{
                    return description.bulkCreate(requery.description,{transaction:t})
            
                })
            })
    }).then((data)=>{
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
const getAllInvoiceDetail=function(event,data){
    detail.findAll({
    })
    .then((data)=>{
        event.sender.send('gotAllInvoiceDetail',{data:data})
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

module.exports={createInvoice,fetchInvoiceNo,getAllInvoiceDetail}