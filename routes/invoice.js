const detail=require('../db/models').invoiceDetail
const description=require('../db/models').invoiceDiscription
const db=require('../db/models').db
const createInvoice=function(event,requery){
    db.transaction(function(t){
    return description.bulkCreate(requery.description,{transaction:t})
    .then((data)=>{
        return  detail.create({
            gstTotal:requery.detail.gstTotal,
            totalAmount:requery.detail.totalAmount,
            remark:requery.detail.remark,
            partyId:1
        },{transaction:t})
       
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
      //  console.log(err)
        event.sender.send('invoiceSaved',{
            success:false,
            data:null,
            err:err
        })
    })
    
}

module.exports={createInvoice}