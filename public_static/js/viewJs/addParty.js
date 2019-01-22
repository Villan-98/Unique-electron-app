/** created by Villan-98
 */

$(function(){
    const {ipcRenderer}=require('electron')
    console.log("connected")
    const $btnSave=$('#btnSaveParty')
    const $partyName=$('#partyName')
    const $partyAddress=$('#partyAddress')
    const $openingBalance=$('#openingBalance')
    const $contactNo=$('#contactNo')
    const $partyGst=$('#partyGst')

    //click function for button
    $btnSave.click((e)=>{
        e.preventDefault()
        const partyName=$partyName.val()
        const partyAddress=$partyAddress.val()
        const openingBalance=$openingBalance.val()
        const contactNo=$contactNo.val()
        const partyGst=$partyGst.val()
        console.log(partyGst,partyName,partyAddress,contactNo,openingBalance)
        if(partyName!==null && partyAddress!==null && openingBalance!=null && contactNo!=null && partyGst!==null)
        {

            ipcRenderer.send('addParty',{
                partyName:partyName,
                partyAddress:partyAddress,
                partyGst:partyGst,
                openingBalance:openingBalance,
                contactNo:contactNo
            })
            ipcRenderer.once('addedParty',(event,data)=>{
                console.log(data)
            })
        }
        else
        {
            console.log("there should not be an empty field")
        }
    })

})