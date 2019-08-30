$(function(){
    console.log("connected")
    const $companyName=$('#companyName'),
        $companyAddress=$('#companyAddress'),
        $companyGst=$('#companyGst'),
        $gstRate=$('#gstRate'),
        $remark=$('#remark'),
        $term1=$('#term1'),
        $term2=$('#term2'),
        $signatory=$('#signatory'),
        $contactNo1=$('#contactNo1'),
        $contactNo2=$('#contactNo2'),
        $chk_changePass=$('#chk_changePass'),
        $oldPassword=$('#oldPassword'),
        $newPassword=$('#newPassword'),
        $cpassword=$('#cpassword')


    const $btn=$('button')
    const {remote}=require('electron')
    const {ipcRenderer}=require('electron')

    ipcRenderer.send('getCompany',{message:"fetch company"})
    ipcRenderer.once('gotCompany',(event,data)=>{
        if(data.success)
        {
            //console.log(data)
            if(data.data[0])
            {

                let company=(data.data[0].dataValues)
                console.log(company.companyName)
                $companyName.val(company.companyName)
                $companyGst.val(company.companyGst)
                $companyAddress.val(company.companyAddress)
                $signatory.val(company.signatory)
                $remark.val(company.remark)
                $term1.val(company.term1)
                $term2.val(company.term2)
                $contactNo2.val(company.contactNo2)
                $contactNo1.val(company.contactNo1)
                $gstRate.val(company.gstRate)
            }

        }
    })
    $btn.click((e)=>{
        e.preventDefault()
        console.log("button clicked")
        if(e.target.id==='saveDetail')
        {
            let checked,sendUpsert=1;
            if($chk_changePass.is(':checked'))
            {
                   if($newPassword.val()!==$cpassword.val())
                   {
                       $.alert("Confirm Password should be same as new Password")
                       sendUpsert=0;
                   }
                   checked=1
    
            }
            if(sendUpsert)
            {
    
                ipcRenderer.send("upsertCompany",{
                    companyName:$companyName.val(),
                    companyAddress:$companyAddress.val(),
                    gstRate:$gstRate.val(),
                    remark:$remark.val(),
                    term1:$term1.val(),
                    term2:$term2.val(),
                    companyGst:$companyGst.val(),
                    signatory:$signatory.val(),
                    contactNo1:$contactNo1.val(),
                    contactNo2:$contactNo2.val(),
                    checked:checked,
                    oldPassword:$oldPassword.val(),
                    cPassword:$cpassword.val(),
                    newPassword:$newPassword.val()
    
                })
            }
            ipcRenderer.once("upsertedCompany",(event,data)=>{
                console.log(data)
            })
    
        }
        else if(e.target.id==='btnClose')
        {
            remote.getCurrentWindow().close()
        }
        
    })

})