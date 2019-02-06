const jobType=require('../db/models').jobType

module.exports={
    createJobType:function(event,data){
        jobType.create({
            type:data.jobType
        })
        .then(data=>{
                event.sender.send('createdJobType',{
                    data:data,
                    success:true,
                    error:null
                })
            
        })
        .catch(err=>{
            console.log(err)
            event.sender.send('createdJobType',{
                data:null,
                success:false,
                error:err
            })
        })
    },
    fetchJobType:function(event,data){
        jobType.findAll()
        .then(data=>{
            event.sender.send('fetchedJobType',{
                data:data,
                error:null,
                success:true
            })
        })
        .catch(err=>{
            event.sender.send('fetchedJobType',{
                data:null,
                error:error,
                success:false
            })
        })
    }
}