$(function(){
    //console.log("connected")
    const {ipcRenderer}=require('electron')
    let $selectParty=$('#selectParty')
    let $selectParticular=$('.selectParticular')
    let $selectUnit=$('.selectUnit')
    const $btnTotal=$('.btn_total')
    const $buttonTag=$('button')




    var optionItem,optionUnit
    ipcRenderer.send('fetchParty',{})
    ipcRenderer.once('fetchedParty',(event,data)=>{
       // console.log(data.data)
        data=data.data

        data.forEach((party)=>{
            $selectParty.append(`<option value="${party.dataValues.partyName}">${party.dataValues.partyName}</option>`)
        })

    })
    ipcRenderer.send('getItem',{})
    ipcRenderer.once('gotItem',(event,data)=>{
        //console.log(data.data)
        data=data.data
        data.forEach((item)=>{
            optionItem+=`<option value="${item.dataValues.itemName}">${item.dataValues.itemName}</option>`
        })

        data.forEach((item)=>{
           // console.log(item.dataValues.itemName)
            $selectParticular.append(`<option value="${item.dataValues.itemName}">${item.dataValues.itemName}</option>`)
        })
    })
    ipcRenderer.send('getUnit',{})
    ipcRenderer.once('gotUnit',(event,data)=>{
        //console.log(data.data)
    data=data.data

        data.forEach((Unit)=>{
            //console.log(Unit.dataValues.unitName)
            optionUnit+=`<option value="${Unit.dataValues.unitName}">${Unit.dataValues.unitName}</option>`
        })
        data.forEach((Unit)=>{
            //console.log(Unit.dataValues.unitName)
            $selectUnit.append(`<option value="${Unit.dataValues.unitName}">${Unit.dataValues.unitName}</option>`)
        })

    })

    var sno=0
    $("body").on('click','.selectParticular',function(event){
        //console.log(`${optionItem}`)
        
        sno++
        console.log("clicked")
      //  console.log(event)
        $('#description').append(
            `<div class="row mb " id=${sno}>
                        <div class="col-1 p-0">
                                <select class="form-control selectParticular " id="particular-${sno}" name="Particular"></select>

                        </div>
                        <div class="col-3 p-0 ml-3">
                            <div class="row">

                                <div class="col p-0">
                                    <input type="number" class="form-control" placeholder="No. of Colors" id="color-${sno}">
                                </div>

                                <div class="col p-0">
                                    <input type="number" class="form-control" placeholder="Quantity" id="qty-${sno}">
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
                            <input type="text" class="form-control" placeholder="rate" id="rate-${sno}">
                        </div>
                        <div class="col-1 p-0">
                            <input type="text" class="form-control amt" placeholder="amt" value=0 id="amt-${sno}">
                        </div>
                        <div class="col-2">

                            <div class="form-group row">
                                <div class="col p-1">
                                    <button class="btn btn-block btn_total" id="total-${sno}"> Total</button>
                                </div>
                                <div class="col p-1">
                                    <button class="btn btn-alert " id="delete"> Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>

`
        )

        $(`#particular-${sno}`).empty().append(optionItem)
        $('.selectUnit').empty().append(optionUnit)

    })
    $("body").on("click",".btn_total",function(event){
            event.preventDefault()
            //console.log(console.log(event))
            //console.log(event.target.id)
            let id=(event.target.id.split('-'))[1]
            //console.log(id)
            let colors=parseInt($(`#color-${id}`).val())
            let qty=parseInt($(`#qty-${id}`).val())

            let rate=parseInt($(`#rate-${id}`).val())
            let amt=parseInt($(`#amt-${id}`).val())
            //console.log(qty,rate,colors)
           // console.log(typeof(qty))
            rQty=(rate*qty)
            rColor=(rate*colors)
            $(`#amt-${id}`).val(rQty >rColor ? rQty:rColor)
    })
    $("body").on("click"," #btn_saveInvoice",function(event){
        event.preventDefault()
        console.log(event.target.id)
        let grandTotal=0
        let gstRate
        for(i=0;i<=sno;i++)
        {
            let temp=parseInt($(`#amt-${i}`).val())           
            grandTotal+=temp
            
        }
        ipcRenderer.send('getCompany',{})
        ipcRenderer.once('gotCompany',(event,data)=>{
            gstRate=data.data[0].dataValues.gstRate

        $('#iGst').val(parseInt(gstRate)*grandTotal/200)
        $('#cGst').val(gstRate*grandTotal/200)
        $('#gst').val(gstRate*grandTotal/100)

        $('#grandTotal').val(grandTotal+gstRate*grandTotal/100)

        /****format of query to be send to the backend  ****/
        /*ipcRenderer.send('saveInvoice',{
            detail:{
                gstTotal:25,
                remark:"ajdfkl",
                totalAmount:2500
            },
            description:[{
                particular:"sdklj",
                color:1,
                quantity:25,
                unit:"meter",
                jobType:"sampling",
                status:"redyeing",
                yourChallanNo:"skd32",
                ourChallanNo:"sjkldf3224",
                rate:3,
                amount:32},
                {
                    particular:"ssjdfkdsjdklj",
                    color:1,
                    quantity:25,
                    unit:"meter",
                    jobType:"production",
                    status:"redyeafter dyeing",
                    yourChallanNo:"skd32",
                    ourChallanNo:"sjkldf3224",
                    rate:3,
                    amount:32}]
            
        })*/
        })
    })

})