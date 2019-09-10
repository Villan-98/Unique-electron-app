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

    console.log("hi")
    let invoiceNumber
    let task
    var sno=0
    var optionItem,optionUnit
    let viewInvoiceWindow = remote.getGlobal ('viewInvoiceWindow');
    if (viewInvoiceWindow) viewInvoiceWindow.webContents.send ('sendInvoiceNo', "Message from Window 1")

    ipcRenderer.on('sendInvoiceNo',(event,data)=>{
        let printInvoiceWindow=remote.getGlobal('printInvoiceWindow')
        if(printInvoiceWindow) printInvoiceWindow.webContents.send("takeInvoiceNo",{
            invoiceNumber:invoiceNumber
        })
    })
    ipcRenderer.once('takeInvoiceNumber',(event,data)=>
    {
        invoiceNumber=data.invoiceNo
        //fetch party
        //fetch given invoice
        ipcRenderer.send('fetchGivenInvoice',{
            invoiceDetailId:data.invoiceNo
        })
        ipcRenderer.once('fetchedGivenInvoice',(event,invoiceData)=>
        {
            detail=invoiceData.data.detail[0]
            desc=invoiceData.data.description
            $(`#invoiceNo`).val(invoiceNumber)
            $('#invoiceDate').val(detail.dataValues.invoiceDate)
            $(`#remark`).val(detail.dataValues.remark)
            $(`#selectparty`).val(detail.dataValues.party.dataValues.partyName) 
            $(`#gst`).val(detail.dataValues.gstTotal)
            $(`#grandTotal`).val(detail.dataValues.totalAmount)
            $(`#conveyanceCharge`).val(detail.dataValues.conveyanceCharge)
            $('#description').empty()

            ipcRenderer.send('fetchParty',{})
            ipcRenderer.once('fetchedParty',(event,party)=>
            {
                allParty=party.data
                allParty.forEach((party)=>{
                    if(party.dataValues.id===detail.dataValues.partyId)
                    $selectParty.append(`<option selected="selected" value="${party.dataValues.id}">${party.dataValues.partyName}</option>`)
                    else
                    $selectParty.append(`<option value="${party.dataValues.id}">${party.dataValues.partyName}</option>`)
                })
                // fetch Items
                ipcRenderer.send('getItem',{})
                ipcRenderer.once('gotItem',(event,allItem)=>
                {
                    allItem=allItem.data
                    allItem.forEach((item)=>{
                        optionItem+=`<option value="${item.dataValues.itemName}">${item.dataValues.itemName}</option>`
                    })
                    //fetch unit 

                    ipcRenderer.send('getUnit',{})
                    ipcRenderer.once('gotUnit',(event,allUnit)=>
                    {
                        allUnit=allUnit.data
                        allUnit.forEach((Unit)=>{
                            //console.log(Unit.dataValues.unitName)
                            optionUnit+=`<option value="${Unit.dataValues.unitName}">${Unit.dataValues.unitName}</option>`
                        })
                        desc.forEach((des)=>
                        {
                            des=des.dataValues
                            //console.log(des)
                            sno++
                            $('#description').append(
                                `
                                <div class="row mb-1" id=${sno} >
                                    <div class="col-1 p-0">
                                            <select class="form-control selectParticular " id="particular-${sno}" name="Particular">
                                                <option value="Select Particular">Select Particular</option>
                                            </select>
                                    </div>
                
                                    <div class="col-1 p-0">
                                        <input type="number" class="form-control" placeholder="No. of Colors" id="color-${sno}" value=${des.color} >
                                    </div>
                                    <div class="col-1 p-0">
                                        <input type="number" class="form-control" placeholder="Quantity" id="qty-${sno}" value=${des.quantity}>
                                    </div>
                
                                    <div class="col-1  p-0">                                                                                                                                
                
                                        <select class="form-control selectUnit" id="unit-${sno}" name="unitName">
                                            <option >Select Unit</option>                                                                                                                                                                                                                                                                                                                                               
                                        </select>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                                    </div>
                                    <div class="col-1 p-0">
                                        <input type="text" class="form-control" id="yourChallanNo-${sno}" value=${des.yourChallanNo}>
                                    </div>
                                    <div class="col-1 p-0">
                                        <input type="text" class="form-control" id="ourChallanNo-${sno}" value=${des.ourChallanNo}>
                                    </div>
                                    <div class="col-1 p-0">
                                        <div class="col pl-0">
                                            <input type="text" class="form-control" id="hsnCode-${sno}"value=${des.hsnCode}>
                                        </div>    
                                    </div>
                                    <div class="col-1 p-0">
                                        <input type="number" class="form-control" id="rate-${sno}"value=${des.rate}>
                                    </div>
                
                                    <div class="col-1 p-0">
                                        <input type="text" class="form-control" id="perClrQty-${sno}" value=${des.perClrQty}>
                                    </div>
                                    <div class="col-1 pl-0">
                                        <input type="number" class="form-control amt" id="amt-${sno}" value=${des.amount}>
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
                            if(des.perClrQty==='Color')
                            {
                                $(`#check-${sno}`).prop("checked",true)
                            }
                            allItem.forEach((item)=>{
                                if(item.dataValues.itemName===des.particular)
                                $(`#particular-${sno}`).append(`<option selected="selected" value="${item.dataValues.itemName}">${item.dataValues.itemName}</option>`)
                                else
                                $(`#particular-${sno}`).append(`<option value="${item.dataValues.itemName}">${item.dataValues.itemName}</option>`)
                            })
                            allUnit.forEach((unit)=>{
                                if(unit.dataValues.unitName===des.unit)
                                $(`#unit-${sno}`).append(`<option selected="selected" value="${unit.dataValues.unitName}">${unit.dataValues.unitName}</option>`)
                                else
                                $(`#unit-${sno}`).append(`<option value="${unit.dataValues.unitName}">${unit.dataValues.unitName}</option>`)
                            })
                                
                        })    
                    sno++
                    addNewDescRow(sno)
                    $(`#particular-${sno}`).append(optionItem)
                    $(`#unit-${sno}`).append(optionUnit)    
                    })

                })
            })  
        })
    })
    // to append an extra row

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


    $("body").on("click",".btn_total",function(event){
        event.preventDefault()
        printFlag=0
        //appending new row
        sno++
        addNewDescRow(sno)
        $(`#particular-${sno}`).append(optionItem)
        $(`#unit-${sno}`).append(optionUnit)

        let id=(event.target.id.split('-'))[1]
        //console.log(id)
        console.log()
        if(!$(`#color-${id}`).val() || !$(`#qty-${id}`).val()||!$(`#rate-${id}`).val())
        {
            alert("Please Fill all the input boxes")
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
                console.log("yup")

                $(`#amt-${id}`).val(colors*rate)
                $(`#perClrQty-${id}`).val("Color")
            }
            else{
                if($(`#unit-${id}`).val()==='Select Unit')
                alert("Please Select Unit")
                else
                {
                    $(`#amt-${id}`).val(qty*rate)
                    $(`#perClrQty-${id}`).val($(`#unit-${id}`).val())
                }
            }
        }
    })


    $("body").on("click"," #btn_saveInvoice",function(event)
    {
        event.preventDefault()
        console.log(event.target.id)
        let total=0
        let gstRate
        let conveyanceCharge=parseFloat($(`#conveyanceCharge`).val())
        for(i=1;i<=sno;i++)
        {
            let temp=parseFloat($(`#amt-${i}`).val())     

            console.log(temp)      
            total+=temp
            
        }
        total+=conveyanceCharge
       // console.log("total"+total)
        ipcRenderer.send('getCompany',{})
        ipcRenderer.once('gotCompany',(event,data)=>
        {
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
            for( i=1;i<=sno;i++)
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
                    // console.log("sdfjkljskdljflk")
                    // console.log($(`#particular-${i}`).val())
                    // console.log($(`#color-${i}`).val())
                    // console.log($(`#qty-${i}`).val())
                    // console.log($(`#unit-${i}`).val())
                    if($(`#particular-${i}`).val()==="Select Particular" || !$(`#color-${i}`).val()||!$(`#qty-${i}`).val()||$(`#unit-${i}`).val()==="Select Unit")
                    {
                        console.log("caught2")
                        alert("All input boxes in description are mandatory")
                        flag_save=0
                        break;
                    }
                    else if(!$(`#ourChallanNo-${i}`).val()||!$(`#amt-${i}`).val()||!$(`#invoiceNo`).val())
                    {
                        alert("All input boxes in description are mandatory")
                        flag_save=0;
                        break;
                    }
                    else{
                        //console.log(i,"sno")
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
                ipcRenderer.send('saveInvoice',invoiceData)
                ipcRenderer.once('invoiceSaved',function(event,data){
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

function addNewDescRow(sno,optionItem,optionUnit)
{
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
}