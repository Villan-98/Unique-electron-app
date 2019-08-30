$(function(){
        const {ipcRenderer,remote}=require('electron')
        const $btn=$('button'),
            $itemName=$('#itemName'),
            $ul_savedItem=$('#savedItem')
        ipcRenderer.send('getItem',{})
        ipcRenderer.once('gotItem',(event,data)=>{
            if(data.data)
            {
                let items=data.data
                items.forEach((item)=>{
                    $ul_savedItem.append(`
                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-8 h5">
                                    <span class="pl-4">

                                        ${item.dataValues.itemName}
                                    </span>
                                </div>
                                <div class="col-4">
                                    <button class="btn-warning btn">
                                        Delete
                                    </button>
                                <div>
                            </div>
                        </li>
                `)
                })
            }
        })
        $btn.click((e)=>{
            e.preventDefault()
            console.log($itemName.val())
            if(e.target.id==='addItem')
            {
                ipcRenderer.send('addItem',{
                    itemName:$itemName.val()
                })
                console.log("ipc")
                ipcRenderer.once('addedItem',(event,data)=>{
                    $itemName.val('')
                    console.log(data)
                    $ul_savedItem.append(`
                    <li class="list-group-item">${data.item.dataValues.itemName}</li>
                    `)
    
                })    
            }
            else if(e.target.id==='btnClose')
            {
                remote.getCurrentWindow().close()   
            }
            
        })
    })
