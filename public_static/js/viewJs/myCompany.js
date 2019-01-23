$(function(){
    console.log("connected")
    const $companyName=$('#companyName'),
        $companyAddress=$('#companyAddress'),
        $companyGst=$('#companyGst'),
        $gstRate=$('#gstRate'),
        $remark=$('#remark'),
        $term1=$('#term1'),
        $term2=$('#term2'),
        $password=$('#password'),
        $signatory=$('#signatory'),
        $contactNo1=$('#contactNo1'),
        $contactNo2=$('#contactNo2')
    const $saveDetail=$('#saveDetail')
    const {ipcRenderer}=require('electron')

    ipcRenderer.send('getCompany',{message:"fetch company"})
    ipcRenderer.once('gotCompany',(event,data)=>{
        if(data.success)
        {
            //console.log(data)
            let company=(data.data[0].dataValues)
            console.log(company.companyName)
            $companyName.val(company.companyName)
            $companyGst.val(company.companyGst)
            $companyAddress.val(company.companyAddress)
            $password.val(company.password)
            $signatory.val(company.signatory)
            $remark.val(company.remark)
            $term1.val(company.term1)
            $term2.val(company.term2)
            $contactNo2.val(company.contactNo2)
            $contactNo1.val(company.contactNo1)
            $gstRate.val(company.gstRate)
        }
    })
    $saveDetail.click((e)=>{
        e.preventDefault()
        console.log("button clicke")
        ipcRenderer.send("upsertCompany",{
            companyName:$companyName.val(),
            companyAddress:$companyAddress.val(),
            gstRate:$gstRate.val(),
            remark:$remark.val(),
            term1:$term1.val(),
            term2:$term2.val(),
            companyGst:$companyGst.val(),
            password:$password.val(),
            signatory:$signatory.val(),
            contactNo1:$contactNo1.val(),
            contactNo2:$contactNo2.val()
        })
    })
    ipcRenderer.once("upsertedCompany",(event,data)=>{
        console.log(data)
    })
})