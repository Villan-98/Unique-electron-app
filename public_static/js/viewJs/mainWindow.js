$(function(){
    const{ipcRenderer}=require('electron')
    console.log("connected")
    let button=$('button')
    button.click((e)=>{
        console.log(e.target.id)
        if(e.target.id==='addParty')
        {
            ipcRenderer.send('openNewWindow',{
                windowName:'addParty'
            })
        }
    })

})