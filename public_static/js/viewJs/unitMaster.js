$(function(){
    const {ipcRenderer}=require('electron')
    console.log("connected")
    const $btn_addUnit=$('#addUnit'),
        $unitName=$('#unitName')

    $btn_addUnit.click((e)=>{
        e.preventDefault()
        ipcRenderer.send('addUnit',{
            unitName:$unitName.val()
        })
        console.log("ipc")
        ipcRenderer.once('addedUnit',(event,data)=>{
            console.log(data)
        })

    })
})