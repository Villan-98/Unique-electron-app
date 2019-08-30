$(function(){
    const {ipcRenderer}=require('electron')
    const {remote}=require('electron')
    const $btn=$('button'),
        $unitName=$('#unitName'),
        $ul_storedUnit=$('#storedUnit')
    ipcRenderer.send('getUnit',{})
    ipcRenderer.once('gotUnit',(event,data)=>{
        console.log(data)
        if(data.data)
        {
            let units=data.data
            console.log(units)
            units.forEach((unit)=>{
                $ul_storedUnit.append(`
                <li class="list-group-item">${unit.dataValues.unitName}</li>
                `)
            })
        }
    })
    $btn.click((e)=>{
        e.preventDefault()
        if(e.target.id==='addUnit')
        {
            ipcRenderer.send('addUnit',{
                unitName:$unitName.val()
            })
            console.log("ipc")
            ipcRenderer.once('addedUnit',(event,data)=>{
                console.log(data)
               $ul_storedUnit.append(`
                    <li class="list-group-item">${data.unit.dataValues.unitName}</li>
                    `)
    
            })    
        }
        else if(e.target.id==='btnClose')
        {
            remote.getCurrentWindow().close()
        }
       
    })
})