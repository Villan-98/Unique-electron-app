const transaction=require('../db/models').transaction
const Op=require('sequelize').Op
const newTransaction=function(event,requery){
    //console.log(requery)
    transaction.create({
        partyId:requery.partyId,
        amount:requery.amount,
        remark:requery.remark,
        transactionDate:requery.transactionDate,
        transactionMode:requery.transactionMode
    })
    .then((data)=>{
       // console.log(data)
        event.sender.send('newTransactionCreated',{
            success:true,
            err:null,
            data:data
        })
    })
    .catch((err)=>{
        //console.log(err)
        event.sender.send('newTransactionCreated',{
            success:false,
            err:err,
            data:null
        })
    })

}
const partywiseTransaction=function(event,data){
    transaction.findAll({
        where:{
            partyId:data.partyId
        }
    })
    .then(data=>{
        event.sender.send('fetchedPartywisePayment',{
            success:true,
            err:null,
            data:data
         })
    })
    .catch(err=>{
        event.sender.send('fetchedPartywisePayment',{
            success:false,
            err:err,
            data:null
         })
    })
}
const getPartywiseTransaction=function(requery){
    return transaction.findAll({
        where:{
            partyId:requery.partyId,
            transactionDate:{
                [Op.between]:[requery.startDate,requery.endDate]
            }
        }
    })
}
module.exports={
    newTransaction,partywiseTransaction,getPartywiseTransaction
}
