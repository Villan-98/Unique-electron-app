$(function(){
    console.log("connected")
    const {ipcRenderer}=require('electron')
    const $selectParty=$('#partyName')
    ipcRenderer.send('fetchParty')
    ipcRenderer.once('fetchedParty',(event,data)=>{
        // console.log(data.data)
         data=data.data
 
         data.forEach((party)=>{
             $selectParty.append(`<option value="${party.dataValues.id}">${party.dataValues.partyName}</option>`)
         })
 
     })
})