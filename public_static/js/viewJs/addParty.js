/** created by Villan-98
 */

$(function(){
    const {ipcRenderer}=require('electron')
    const {remote}=require('electron')
    console.log("connected")
    const $btn=$('button')
    const $partyName=$('#partyName')
    const $partyAddress=$('#partyAddress')
    const $openingBalance=$('#openingBalance')
    const $contactNo=$('#contactNo')
    const $partyGst=$('#partyGst')

    //click function for button
    $btn.click((e)=>{
        e.preventDefault()
        if(e.target.id==='btnClose')
        {
            remote.getCurrentWindow().close()
        }
        else if(e.target.id==='btnSave')
        {
            const partyName=$partyName.val()
            const partyAddress=$partyAddress.val()
            const openingBalance=$openingBalance.val()
            const contactNo=$contactNo.val()
            const partyGst=$partyGst.val()
            console.log(partyGst,partyName,partyAddress,contactNo,openingBalance)
            if(!partyName ||! partyAddress ||!openingBalance||! contactNo||!partyGst)
            {
                alert("Please Fill the input box")
            }
            else
            {

                ipcRenderer.send('addParty',{
                    partyName:partyName,
                    partyAddress:partyAddress,
                    partyGst:partyGst,
                    openingBalance:openingBalance,
                    contactNo:contactNo
                })
                ipcRenderer.once('addedParty',(event,data)=>{
                    if(data.success)
                    {
                    alert("New Party added successfullly!")
                    

                    }
                    else{
                        alert("Oops somthing went wrong!\n Please try again")
                    }
                    remote.getCurrentWindow().reload()
                })
            }
        }
        
    })

})