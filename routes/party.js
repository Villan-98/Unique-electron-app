const party=require('../db/models').party
const addParty=function(event,data){
    party.create({
        partyName: data.partyName,
        contactNo:data.contactNo,
        partyGst: data.partyGst,
        partyAddress: data.partyAddress,
        openingBalance: data.openingBalance,
         })
        .then((data)=>{
            event.sender.send('addedParty',{
                success:true,
                ans:"done"
            })
        })
        .catch((err)=>{
            console.log(err)
            event.sender.send('addedParty', {
                success: false,
                error: err
            })
        })
}
const fetchParty=function(event,data){
    party.findAll()
        .then((data)=>{
            event.sender.send('fetchedParty',{
                success:true,
                data:data
            })
        })
        .catch((err)=>{
            event.sender.send('fetchedParty',{
                success:false
            })
        })
}
const givenParty=function(event,data){
    party.findOne({
        where:{
            id:data.partyId
        }
    })
    .then((data)=>{
        event.sender.send('fetchedGivenParty',{
            data:data,
            success:true,
            error:null
        })
    })
    .catch((err)=>{
        event.sender.send('fetchedGivenParty',{
            data:null,
            success:false,
            error:err
        })
    })
}
/*for Report.Js*/
const getGivenParty=function(requery){
   return party.findOne({
        where:{
            id:requery.partyId
        }
    })
}
module.exports={
    addParty,fetchParty,givenParty,getGivenParty
}