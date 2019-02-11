$(function(){
    const {ipcRenderer}=require('electron')
    const {remote}=require('electron')
    const $selectParty=$('#partyId')
    const $button=$('button')
    ipcRenderer.send('fetchParty')
    ipcRenderer.on('fetchedParty',(event,data)=>{
        data=data.data
        data.forEach((party)=>{
            $selectParty.append(`<option value="${party.dataValues.id}">${party.dataValues.partyName}</option>`)
        })

    })
    $button.click((event,target)=>{
        event.preventDefault()
        if(event.target.id==='refresh')
        {
            remote.getCurrentWindow().reload()
        }
        else
        {

        }
    })
})