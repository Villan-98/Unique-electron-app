const transaction=require('../db/models').transaction
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
module.exports={
    newTransaction
}
