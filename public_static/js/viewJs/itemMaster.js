$(function(){
        let makeList=function(data)
        {
            let items=data
            console.log(items);
            $ul_savedItem.empty();
            items.forEach((item)=>{
                $ul_savedItem.append(`
                    <li class="list-group-item mt-1">
                        <div class="row">
                            <div class="col-8 h5">
                                <span class="pl-4">

                                    ${item.dataValues.itemName}
                                </span>
                            </div>
                            <div class="col-4">
                                <button class="btn-warning btn delBut" id="${item.dataValues.id}">
                                    Delete
                                </button>
                            <div>
                        </div>
                    </li>
            `)
            })
        }
         $("body").on('click','.delBut',function(event){
                console.log(event.target.id);
                if(confirm("are you sure you want to delete an item"))
                {
                    let buttonId=event.target.id;
                    ipcRenderer.send('deleteItem',{
                        itemId:buttonId
                    })
                    ipcRenderer.once('deletedItem',(event,data)=>{
                        console.log(data);
                        if(data)
                        {
                            makeList(data.data);
                        }
                    })   
                }
            })
        const {ipcRenderer,remote}=require('electron')
        const $btn=$('button'),
            $itemName=$('#itemName'),
            $ul_savedItem=$('#savedItem')
        ipcRenderer.send('getItem',{})
        ipcRenderer.once('gotItem',(event,data)=>{
            if(data.data)
            {
                makeList(data.data);
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
                    <li class="list-group-item mt-1"><div class="row">
                                <div class="col-8 h5">
                                    <span class="pl-4">

                                        ${data.item.dataValues.itemName}
                                    </span>
                                </div>
                                <div class="col-4">
                                    <button class="btn-warning btn delBut" id="${data.item.dataValues.id}">
                                        Delete
                                    </button>
                                <div>
                            </div>
                        </li>
                    `)
    
                })    
            }
            else if(e.target.id==='btnClose')
            {
                remote.getCurrentWindow().close()   
            }
            
        })
    })
