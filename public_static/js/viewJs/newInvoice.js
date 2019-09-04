$(function(){
    //console.log("connected")
    const {ipcRenderer,remote}=require('electron')
    let $selectParty=$('#selectParty')
    let $selectParticular=$('.selectParticular')
    let $selectUnit=$('.selectUnit')
    const $btnTotal=$('.btn_total')
    const $buttonTag=$('button')
    const $inputTag=$('input')
    let printFlag=0

    $buttonTag.click((event)=>{
        event.preventDefault()
        if(event.target.id==='btn_printInvoice')
        {
             if(printFlag===0)
             {
                alert("Please save invoice first!")
             }  
             else{
                ipcRenderer.send('openNewWindow',{
                    windowName:'printWindow.html',
                    invoiceNo:$(`#invoiceNo`).val(),
                    task:"printInvoice"
                }) 
             }
        }
        else if(event.target.id==='btn_close')
        {
            remote.getCurrentWindow().close()
        }
        else if(event.target.id==='btn_newInvoice')
        {
            remote.getCurrentWindow().reload()
        }
    })

    var optionItem,optionUnit
    ipcRenderer.send('fetchParty',{})
    ipcRenderer.once('fetchedParty',(event,data)=>{
       // console.log(data.data)
        data=data.data

        data.forEach((party)=>{
            $selectParty.append(`<option value="${party.dataValues.id}">${party.dataValues.partyName}</option>`)
        })

    })
    ipcRenderer.send('fetchInvoiceNo')
    ipcRenderer.once('fetchedInvoiceNo',(event,data)=>{
        console.log(data)
        let invoiceId=1
        if(data.data)
        {
            invoiceId=data.data.dataValues.id+1
        }
        console.log(data.dataValues)
        $(`#invoiceNo`).val(invoiceId)
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
                    `
                    <div class="row mb-1" id=${sno} >
                        <div class="col-1 p-0">
                                <select class="form-control selectParticular " id="particular-${sno}" name="Particular">
                                    <option value="Select Particular">Select Particular</option>
                                </select>
                        </div>

                        <div class="col-1 p-0">
                            <input type="number" class="form-control" placeholder="No. of Colors" id="color-${sno}">
                        </div>
                        <div class="col-1 p-0">
                            <input type="number" class="form-control" placeholder="Quantity" id="qty-${sno}">
                        </div>

                        <div class="col-1  p-0">

                            <select class="form-control selectUnit" id="unit-${sno}" name="unitName">
                                <option >Select Unit</option>
                            </select>
                        </div>
                        <div class="col-1 p-0">
                            <input type="text" class="form-control" id="yourChallanNo-${sno}" placeholder="Your Challan No">
                        </div>
                        <div class="col-1 p-0">
                            <input type="text" class="form-control" id="ourChallanNo-${sno}" placeholder="Our Challan No.">
                        </div>
                        <div class="col-1 p-0">
                            <div class="col pl-0">
                                <input type="text" class="form-control" id="hsnCode-${sno}" placeholder="HSN Code">
                            </div>    
                        </div>
                        <div class="col-1 p-0">
                            <input type="number" class="form-control" id="rate-${sno}" placeholder="rate">
                        </div>

                        <div class="col-1 p-0">
                            <input type="text" class="form-control" id="perClrQty-${sno}" placeholder="Per Qty/Clr">
                        </div>
                        <div class="col-1 pl-0">
                            <input type="number" class="form-control amt"  placeholder="amt" value=0 id="amt-${sno}">
                        </div>

                        <div class="col-2 ">
                            <div class="row">
                                <div class="col-2">
                                    <input type="checkbox" class="form-check-input" id="check-${sno}">
                                </div>
                                <div class="col">
                                    <button class="btn btn-block btn_total" id="total-${sno}"> Total</button>
                                </div>
                            </div>
                        </div>                       

                    </div>

                    `
        )

        $(`#particular-${sno}`).append(optionItem)
        $(`#unit-${sno}`).append(optionUnit)

    })
    $("body").on("click",".btn_total",function(event){
            event.preventDefault()
            printFlag=0
            //console.log(console.log(event))
            //console.log(event.target.id)
            let id=(event.target.id.split('-'))[1]
            //console.log(id)
            console.log()
            if(!$(`#color-${id}`).val() || !$(`#qty-${id}`).val()||!$(`#rate-${id}`).val())
            {
                alert("Please Fill all the input boxes")
                console.log("hi")
            }
            else if(parseFloat($(`#rate-${id}`).val())<0 ||parseFloat($(`#qty-${id}`).val())<=0||parseFloat($(`#color-${id}`).val())<=0)
            {
                alert("Quantity,Color and Rate should be greater than Zero!")
            }
            else
            {

                let colors=parseInt($(`#color-${id}`).val())
                let qty=parseFloat($(`#qty-${id}`).val())
                let rate=parseFloat($(`#rate-${id}`).val())
                let checkbox=$(`#check-${id}`)
                if(checkbox.is(":checked"))
                {

                    $(`#amt-${id}`).val(colors*rate)
                    $(`#perClrQty-${id}`).val("Per Color")
                }
                else{
                    if($(`#unit-${id}`).val()==='Select Unit')
                    alert("Please Select Unit")
                    $(`#amt-${id}`).val(qty*rate)
                    $(`#perClrQty-${id}`).val("Per "+$(`#unit-${id}`).val())
                }
            }
    })
    $("body").on("click"," #btn_saveInvoice",function(event){
        event.preventDefault()
        console.log(event.target.id)
        let total=0
        let gstRate
        let conveyanceCharge=parseFloat($(`#conveyanceCharge`).val())
        for(i=0;i<=sno;i++)
        {
            let temp=parseFloat($(`#amt-${i}`).val())           
            total+=temp
            
        }
        total+=conveyanceCharge
        ipcRenderer.send('getCompany',{})
        ipcRenderer.once('gotCompany',(event,data)=>{
            gstRate=data.data[0].dataValues.gstRate

        $('#iGst').val(parseInt(gstRate)*total/200)
        $('#cGst').val(gstRate*total/200)
        $('#gst').val(gstRate*total/100)
        $('#grandTotal').val(total+gstRate*total/100+conveyanceCharge)
        let flag_save=0
        // fetching data from input boxes and drop down (assuming only an extra input box)
        console.log("party val",$(`#selectParty`).val())
        let invoiceData={detail:{
            partyId:$(`#selectParty`).val(),
            remark:$(`#remark`).val(),
            invoiceDate:$(`#invoiceDate`).val(),
            invoiceNo:parseInt($(`#invoiceNo`).val()),
            gstTotal:parseFloat($(`#gst`).val()),
            totalAmount:parseFloat($(`#grandTotal`).val()),
            conveyanceCharge:parseFloat($(`#conveyanceCharge`).val())
            
        },
                        description:[]}
        for( i=0;i<=sno;i++)
        {
                // to leave last row
            if(!$(`#rate-${i}`).val() && !$(`#qty`).val())
            {

                if($(`#selectParty`).val()=='Select Party'||!$(`#invoiceDate`).val())
                {
                    alert("Please Select PartyName and Date")
                    flag_save=0
                    break;
                }
                 else
                {
                    flag_save=1;
                    break;
                }
            }
            else
            {
                //check for empty input field
                console.log("sdfjkljskdljflk")
                console.log($(`#particular-${i}`).val())
                console.log($(`#color-${i}`).val())
                console.log($(`#qty-${i}`).val())
                console.log($(`#unit-${i}`).val())
                if($(`#particular-${i}`).val()==="Select Particular" || !$(`#color-${i}`).val()||!$(`#qty-${i}`).val()||$(`#unit-${i}`).val()==="Select Unit")
                {
                    console.log("caught2")
                    alert("All input boxes in description are mandatory")
                    flag_save=0
                    break;
                }
                else if(!$(`#ourChallanNo-${i}`).val()||!$(`#amt-${i}`).val()||!$(`#invoiceNo`).val())
                {
                    console.log("caught3")
                    
                    alert("All input boxes in description are mandatory")
                    flag_save=0;
                    break;
                }
                else{
                    console.log(i,"sno")
                    invoiceData.description.push({
                        particular:$(`#particular-${i}`).val(),
                        color:parseInt($(`#color-${i}`).val()),
                        quantity:parseFloat($(`#qty-${i}`).val()),
                        unit:$(`#unit-${i}`).val(),
                        perClrQty:$(`#perClrQty-${i}`).val(),
                        yourChallanNo:$(`#yourChallanNo-${i}`).val(),
                        ourChallanNo:$(`#ourChallanNo-${i}`).val(),
                        rate:parseFloat($(`#rate-${i}`).val()),
                        amount:parseInt($(`#amt-${i}`).val()),
                        invoiceDetailId:parseInt($(`#invoiceNo`).val()),
                        hsnCode:$(`#hsnCode-${i}`).val()
                    })
                }
            }
        }
        if(flag_save===1)
        {
            console.log(invoiceData)
            ipcRenderer.send('saveInvoice',invoiceData)
            ipcRenderer.once('invoiceSaved',function(event,data){
                console.log(data.success)
                if(data.success)
                {

                    alert("Invoice Saved Successfully!")
                    printFlag=1;
                }
                else
                    alert("Oops Invoice cannot be saved !")
            })
        }
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