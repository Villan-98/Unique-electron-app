const company=require('../db/models').company

const getCompany=function(event,data){
    console.log("req")
    company.findAll()
        .then((companyData)=>{
            event.sender.send('gotCompany',{
                success:true,
                data:companyData
            })
        })
        .catch((err)=>{
            event.sender.send('gotCompany',{
                success:false,
                err:err
            })
        })
}
const upsertCompany=function(event,data){
    console.log("upsert")
    company.findOne({
        where:{
                id:1
            }
    })

        .then((comData)=>{
            var newPass=data.newPassword
            console.log(data)
            if(comData!==null)
            {
                if(data.checked )
                {

                    if(data.oldPassword===comData.password)
                    {
                        newPass=data.newPassword
                    }
                    else
                    {
                        event.sender.send('upsertedCompany',{
                            success:false,
                            data:"old Password did not matched"
                        })
                    }
                }
                else
                {
                    newPass=comData.password
                }

            }

            company.upsert({
                    id:1,
                    companyName:data.companyName,
                    companyAddress:data.companyAddress,
                    gstRate:data.gstRate,
                    remark:data.remark,
                    companyGst:data.companyGst,
                    term1:data.term1,
                    term2:data.term2,
                    contactNo1:data.contactNo1,
                    contactNo2:data.contactNo2,
                    password:newPass,
                    signatory:data.signatory
                }

            )
                .then((data)=>{
                    event.sender.send('upsertedCompany',{
                        success:true,
                        data:"done"
                    })
                })
                .catch((err)=>{
                    event.sender.send('upsertedCompany',{
                        success:false,
                        data:"something went wrong"
                    })
                })
        })
}
/* for report.js***/
const getMyCompany=function(){
    console.log("req")
    return company.findAll()
        
}
module.exports={getCompany,upsertCompany,getMyCompany}