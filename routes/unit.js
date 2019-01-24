const unit=require('../db/models').unit
const addUnit=function(event,data)
{
    unit.create({
        unitName:data.unitName
        })
        .then((data)=>{
           // console.log(data)                     //the data which was inserted comes in .then()
            event.sender.send('addedUnit',{
                success:true,
                unit:data
            })
        })
        .catch((err)=>{
            console.log(err)
            event.sender.send('addedUnit',{
                success:false,
                error:err
            })
        })
}
const getUnit=function(event,data)
{
    unit.findAll()
        .then((unitData)=>{
            event.sender.send('gotUnit',{
                success:true,
                data:unitData,
                error:null
            })
        })
        .catch((err)=>{
            console.log(err)
            event.sender.send('gotUnit',{
                success:false,
                data:null,
                error:err
            })
        })
}
module.exports={addUnit,getUnit}