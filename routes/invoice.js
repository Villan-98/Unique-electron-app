const detail=require('../db/models').invoiceDetail
const description=require('../db/models').invoiceDiscription
const db=require('../db/models').db
const party=require('../db/models').party
const createInvoice=function(event,requery){
    db.transaction(function(t){
        console.log(requery)
        return  detail.upsert({
            gstTotal:requery.detail.gstTotal,
            totalAmount:requery.detail.totalAmount,
            remark:requery.detail.remark,
            partyId:requery.detail.partyId,
            id:requery.detail.invoiceNo,
            invoiceDate:requery.detail.invoiceDate,
            conveyanceCharge:requery.detail.conveyanceCharge
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
    include:[{model:party}]
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
const fetchGivenInvoice=function(event,data){
    console.log("route",data)
    detail.find({
        where:{
            id:data.invoiceDetailId
        },
        include:[{model:party}]
    })
    .then(detailData=>{
        console.log("detail")
        
        description.findAll({
            where:{
                invoiceDetailId:data.invoiceDetailId
            }
        })
        .then(discriptionData=>{
                //console.log(discription)
                //console.log(detail)
                data={
                    detail:detailData,
                    description:discriptionData
                }
                event.sender.send('fetchedGivenInvoice',{
                    data:data,
                    success:"lkdjf",
                    error:null
                })
            
        })
        .catch(err=>{
            console.log(err)
            event.sender.send('fetchedGivenInvoice',{
                data:null,
                error:err,
                success:"sdklfj"
            })
        })
    })
}
module.exports={createInvoice,fetchInvoiceNo,getAllInvoiceDetail,fetchGivenInvoice}