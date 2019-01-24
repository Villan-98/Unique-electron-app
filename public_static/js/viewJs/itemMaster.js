$(function(){
        const {ipcRenderer}=require('electron')
        console.log("connected")
        const $btn_addItem=$('#addItem'),
            $itemName=$('#itemName'),
            $ul_savedItem=$('#savedItem')
        ipcRenderer.send('getItem',{})
        ipcRenderer.once('gotItem',(event,data)=>{
            console.log(data)
            if(data.data)
            {
                let items=data.data
                console.log(items)
                items.forEach((item)=>{
                    $ul_savedItem.append(`
                <li class="list-group-item">${item.dataValues.itemName}</li>
                `)
                })
            }
        })
        $btn_addItem.click((e)=>{
            e.preventDefault()
            console.log($itemName.val())
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

        })
    })
