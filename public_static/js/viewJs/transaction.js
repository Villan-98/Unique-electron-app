$(function(){
    console.log("connected")
    const {ipcRenderer}=require('electron')
    var {remote} = require('electron');
    const $selectParty=$('#partyId')
    const $btn=$(`button`)
    const $amount=$('#amount')
    const $paymentMode=$(`#paymentMode`)
    const $partyId=$(`#partyId`)
    const $remark=$(`#remark`)
    const $paymentDate=$(`#paymentDate`)
    const $CDNo=$('#CDNo')
    ipcRenderer.send('fetchParty')
    ipcRenderer.once('fetchedParty',(event,data)=>{
        // console.log(data.data)
         data=data.data
 
         data.forEach((party)=>{
             $selectParty.append(`<option value="${party.dataValues.id}">${party.dataValues.partyName}</option>`)
         })
 
     })
     $btn.click((event)=>{
         event.preventDefault()
         
         if(event.target.id==='btnSave')
         {
            if(parseInt($amount.val())<=0 ||$partyId.val()==='-1'||$paymentMode.val()==='Select Payment Method'||!$paymentDate.val()|| $amount.val()==='')
            {
                alert("Invalid input, Please check the input field")
            }
            else
            {

                ipcRenderer.send('createNewTransaction',{
                    partyId:$partyId.val(),
                    amount:parseFloat($amount.val()),
                    remark:$remark.val(),
                    transactionDate:$paymentDate.val(),
                    transactionMode:$paymentMode.val(),
                    CDNo:$CDNo.val()
                })

                ipcRenderer.once('newTransactionCreated',(event,data)=>{
                    console.log(data)
                    if(data.success)
                    {
                        alert("Transaction created successfully!")
                    }
                    else{
                        alert("Oops something went wrong. Please try again")
                    }
                })
            }

        }
        else if(event.target.id==='btnNewTransaction')
        {
            remote.getCurrentWindow().reload();
        }
        else{
             remote.getCurrentWindow().close(); 
        }
            
    })
        
})