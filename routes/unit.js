const unit=require('../db/models').unit
const addUnit=function(event,data)
{
    unit.create({
        unitName:data.unitName
        })
        .then((data)=>{
            console.log(data)
            event.sender.send('addedUnit',{
                success:true
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
module.exports={addUnit}