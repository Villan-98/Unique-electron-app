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
    company.upsert({
        companyName:data.companyName,
        companyAddress:data.companyAddress,
        gstRate:data.gstRate,
        remark:data.remark,
        companyGst:data.companyGst,
        term1:data.term1,
        term2:data.term2,
        contactNo1:data.contactNo1,
        contactNo2:data.contactNo2,
        password:data.password,
        signatory:data.signatory
    },{
        where:{
            id:1
        }
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
                data:"no"
            })
        })
}
module.exports={getCompany,upsertCompany}