$(function(){
    console.log("connected")
    const {ipcRenderer}=require('electron')
    const $header=$('#header')
    const $footer=$('#footer')
    const $body=$('#body')
    var company
    ipcRenderer.on('takeInvoiceNo',(event,command)=>{
        console.log("takeInvoice")
        console.log(command)
        task=command.split('-')[0]
        invoiceNumber=command.split('-')[1]
        if(task==='printInvoice')
        {
            console.log("hi")
            ipcRenderer.send('getCompany',{message:"fetch company"})
            ipcRenderer.once('gotCompany',(event,data)=>{
                if(data.success)
                {
                    company=(data.data[0].dataValues)
                    $header.append(`

                        <p class="text-center mb-0">Invoice</p>
                        <div class="text-center">
                            <h4 >${company.companyName}</h4>
                            <h6>${company.companyAddress}</h6>
                        
                        </div>
                        <div class="row">
                            <div class="col-2">
                                <p>GSTIN:${company.companyGst}</p>
                            </div>
                            <div class="col-5">
                            </div>
                            <div class="col-4">
                                <p class="mb-1">Mob No:${company.contactNo1}</p>
                                <p class="mb-1">Phone No:${company.contactNo2}</p>
                            </div>
                        </div>
                        <hr class="mt-0 mb-1">
                    `)
                    

                    $footer.append(`
                        <h6 class="text-center">Thank You</h6>
                        <div class="row">
                            <div class="col">
                                <h6>    Note</h6>
                                <p class="mb-0"> 1:${company.term1}</p>
                                <p >2:${company.term2}</p>
                                
                                <h6 class="h-6"> Received:</h6>
                                
                            </div>
                            <div class="col-3">
                                <p>For</p>
                                <h6>${company.companyName}</h6>
                                <p>Authorise Signatory:</p>
                            </div>
                        </div>
                    `)


                }
            })
            ipcRenderer.send('fetchGivenInvoice',{
                invoiceDetailId:invoiceNumber
            })
            ipcRenderer.once('fetchedGivenInvoice',(event,data)=>{
                console.log(data)
            console.log(data.party)
                detail=data.data.detail.dataValues
                desc=data.data.description
                console.log(desc)
            $body.empty().append(`
                            
                            <div class="row">
                                <div class="col-8">
                                    <h5 class="h5">M/s ${detail.party.dataValues.partyName}</h5>
                                    <h6 class="h6">Address:${detail.party.dataValues.partyAddress}</h6>
                                </div>
                                <div class="col-4">
                                    <p> Party GSTIN : ${detail.party.dataValues.partyGst}</p>
                                </div>
                            </div>
                            <h6 class="h-6 text-center">Process Detail</h6>
                            <table class="table table-bordered mb-0">
                                <thead >
                                    <tr>
                                        <th scope="col">
                                                <h6 class="h6 m-0">Item/Your Ch.No.</h6>
                                        </th>
                                        <th scope="col">
                                                <h6 class="h6 m-0">Our Ch. No.</h6>
                                        </th>
                                        <th scope="col">
                                                <h6 class="h6 m-0">Job-Type</h6>
                                        </th>
                                        <th scope="col">
                                                <h6 class="h6 m-0">Status</h6>
                                        </th>
                                        <th scope="col">
                                                <h6 class="h6 m-0">color</h6>
                                        </th>
                                        <th scope="col">
                                                <h6 class="h6 m-0">Quantity</h6>
                                        </th>
                                        <th scope="col">
                                                <h6 class="h6 m-0">Unit</h6>
                                        </th>
                                        <th scope="col">
                                                <h6 class="h6 m-0">Rate</h6>
                                        </th>
                                        <th scope="col">
                                                <h6 class="h6 m-0">Amount</h6>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="tableDetail">

                                </tbody>
                            </table>
                            
                `)


                
                    data=data.data
                    console.log(data)
                    desc.forEach((des)=>{
                        des=des.dataValues
                            $('#tableDetail').append(`
                            <tr>
                            <td class="p-1">${des.particular}<br>
                            ${des.yourChallanNo}  </td>
                            <td class="p-1">${des.ourChallanNo}  </td>
                            <td class="p-1">${des.jobType}  </td>
                            <td class="p-1">${des.status}  </td>
                            <td class="p-1">${des.color}  </td>
                            <td class="p-1">${des.quantity}  </td>
                            <td class="p-1">${des.unit}  </td>
                            <td class="p-1">${des.rate}  </td>
                            <td class="p-1">${des.amount}  </td>
                            </tr>
                        `)
                    })
                console.log(company)
                $body.append(`
                            <table class="table table-bordered mb-1">
                                <thead >
                                    <tr>
                                        <th scope="col-2 pb-0">  
                                    <h6 class="m-0"> Taxable Value  </h6>
                                        </th>
                                        <th scope="col-2 pb-0">
                                                <h6 class="h6 m-0">IGST @ ${company.gstRate/2}%</h6>
                                        </th>
                                        <th scope="col-2 pb-0">
                                                <h6 class="h6 m-0">CGST @ ${company.gstRate/2}%</h6>
                                        </th>
                                        <th scope="col pb-0">
                                                <h6 class="m-0">GST on Reverse Charges</h6>
                                        </th>
                                        <th scope="col-3 pb-0">
                                        <h6 class="m-0"> ${detail.gstTotal}</h6>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="tableDetail">
                                    <tr>
                                        <td class="p-1"></td>
                                        <td class="p-1">${detail.gstTotal/2}</td>
                                        <td class="p-1">${detail.gstTotal/2}</td>
                                        <td class="p-1">Grand Total</td>
                                        <td class="p-1">${detail.totalAmount}</td>
                                    </tr>
                                </tbody>
                            </table>
                            
                `)
                
            })
            
        }
    })
    $('#printInvoice').click((event)=>{
        event.preventDefault()
        ipcRenderer.send('printPdf')
        ipcRenderer.on('wrotePdf',function(event,path){
            console.log(path)
        })
    })
})