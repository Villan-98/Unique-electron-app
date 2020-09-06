const item=require('../db/models').item
const addItem=function(event,data)
{
    item.create({
        itemName:data.itemName
    })
        .then((data)=>{
            // console.log(data)                     //the data which was inserted comes in .then()
            event.sender.send('addedItem',{
                success:true,
                item:data
            })
        })
        .catch((err)=>{
            console.log(err)
            event.sender.send('addedItem',{
                success:false,
                error:err
            })
        })
}
const getItem=function(event,data)
{
    item.findAll()
        .then((itemData)=>{
            event.sender.send('gotItem',{
                success:true,
                data:itemData,
                error:null
            })
        })
        .catch((err)=>{
            console.log(err)
            event.sender.send('gotItem',{
                success:false,
                data:null,
                error:err
            })
        })
}
const deleteItem=function(event,data)
{
    item.destroy({
        where:{
            id:data.itemId
        }
    })
    .then(()=>{
        item.findAll()
        .then((allItem)=>{

        event.sender.send('deletedItem',{
                success:true,
                data:allItem,
                error:null
            })  
        })
        .catch((err)=>{
            event.sender.send('deletedItem',{
                success:true,
                data:null,
                error:err
            })
        })
    })
    .catch((err)=>{
        console.log(err);
        event.sender.send('deletedItem',{
                success:false,
                data:null,
                error:err
            })
    })
}
module.exports={addItem,getItem,deleteItem}