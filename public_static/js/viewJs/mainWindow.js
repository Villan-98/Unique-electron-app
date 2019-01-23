$(function(){
    const{ipcRenderer}=require('electron')
    console.log("connected")
    let button=$('button')
    const openWin=function(name)
    {
        ipcRenderer.send('openNewWindow',{
            windowName:name
        })
    }
    button.click((e)=>{
        console.log(e.target.id)
        if(e.target.id==='addParty')
        {
            ipcRenderer.send('openNewWindow',{
                windowName:'addParty.html'
            })
        }
        else if(e.target.id==='myCompany')
        {
            openWin('myCompany.html')
        }
        else if(e.target.id==='unitMaster')
        {
            openWin('unitMaster.html')
        }
    })
})