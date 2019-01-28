$(function(){
    //console.log("connected")
    const {ipcRenderer}=require('electron')
    let $selectParty=$('#selectParty')
    let $selectParticular=$('.selectParticular')
    let $selectUnit=$('.selectUnit')
    const $btnTotal=$('.btn_total')
    var optionItem,optionUnit
    ipcRenderer.send('fetchParty',{})
    ipcRenderer.once('fetchedParty',(event,data)=>{
        console.log(data.data)
        data=data.data

        data.forEach((party)=>{
            $selectParty.append(`<option value="${party.dataValues.partyName}">${party.dataValues.partyName}</option>`)
        })

    })
    ipcRenderer.send('getItem',{})
    ipcRenderer.once('gotItem',(event,data)=>{
        console.log(data.data)
        data=data.data
        data.forEach((item)=>{
            optionItem+=`<option value="${item.dataValues.itemName}">${item.dataValues.itemName}</option>`
        })

        data.forEach((item)=>{
            console.log(item.dataValues.itemName)
            $selectParticular.append(`<option value="${item.dataValues.itemName}">${item.dataValues.itemName}</option>`)
        })
    })
    ipcRenderer.send('getUnit',{})
    ipcRenderer.once('gotUnit',(event,data)=>{
        console.log(data.data)
    data=data.data

        data.forEach((Unit)=>{
            console.log(Unit.dataValues.unitName)
            optionUnit+=`<option value="${Unit.dataValues.unitName}">${Unit.dataValues.unitName}</option>`
        })
        data.forEach((Unit)=>{
            console.log(Unit.dataValues.unitName)
            $selectUnit.append(`<option value="${Unit.dataValues.unitName}">${Unit.dataValues.unitName}</option>`)
        })

    })

    var sno=0
    $("body").on('click','.selectParticular',function(event){
        console.log(`${optionItem}`)
        
        sno++
        console.log("clicked")
      //  console.log(event)
        $('#description').append(
            `<div class="row mb " id=${sno}>
                        <div class="col-1 p-0">
                                <select class="form-control selectParticular " name="Particular"></select>

                        </div>
                        <div class="col-3 p-0 ml-3">
                            <div class="row">

                                <div class="col p-0">
                                    <input type="number" class="form-control" placeholder="No. of Colors">
                                </div>

                                <div class="col p-0">
                                    <input type="number" class="form-control" placeholder="Quantity">
                                </div>

                                <div class="col  p-0">

                                    <select class="form-control selectUnit" name="unitName"></select>
                                </div>
                                <div class="col  p-0">
                                    <input type="text" class="form-control" placeholder="Job-Type">
                                </div>

                            </div>
                        </div>


                        <div class="col-1 ml-3 p-0">
                            <input type="text" class="form-control" placeholder="status">
                        </div>
                        <div class="col-1 p-0">
                            <input type="text" class="form-control" placeholder="Your Challan No">
                        </div>
                        <div class="col-1 p-0">
                            <input type="text" class="form-control" placeholder="Our Challan No.">
                        </div>
                        <div class="col-1 p-0">
                            <input type="text" class="form-control" placeholder="rate">
                        </div>
                        <div class="col-1 p-0">
                            <input type="text" class="form-control" placeholder="amt">
                        </div>
                        <div class="col-2">

                            <div class="form-group row">
                                <div class="col p-1">
                                    <button class="btn btn-block btn_total" id="total1"> Total</button>
                                </div>
                                <div class="col p-1">
                                    <button class="btn btn-alert " id="delete"> Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>

`
        )

        $('.selectParticular').empty().append(optionItem)
        $('.selectUnit').empty().append(optionUnit)

    })




})