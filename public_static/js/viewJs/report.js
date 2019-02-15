$(function(){
    const {ipcRenderer}=require('electron')
    const {remote}=require('electron')
    const $selectParty=$('#partyId')
    const $button=$('button')
    const $reportType=$('#reportType')
    const $container=$(`.container`)
    const $body=$('#body')
    const $header=$('#header')
    const $footer=$('#footer')
    let gstTotal=0
    let totalInvoiceAmount=0
    let openingBalance
    let totalPayment=0
    let startDate
    let endDate
    /*function to display report data*/
    const printCompanyName=function(data)
    {
        console.log(data)
        company=(data[0].dataValues)
        $header.append(`

            <p class="text-center mb-0">Report</p>
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
        
    }
    const printPartyName=function(data)
    {
        openingBalance=data.dataValues.openingBalance
        $header.append(`
            <div class="row">
                <div class="col-8">
                    <h5 class="h5">M/s ${data.dataValues.partyName}</h5>
                    <h6 class="h6">Address:${data.dataValues.partyAddress}</h6>
                </div>
                <div class="col-4">
                    <p> Party GSTIN : ${data.dataValues.partyGst}</p>
                </div>
            </div>
            <h5 class="h-6 text-center">Report From ${startDate} To ${startDate} </h6>   
        `)
    
    }
    const printInvoiceDetail=function(data)
    {
        //console.log("PrintInvoice")
        //console.log(data)
                 
        $body.append(`
                <hr>        
            <h5 class="text-center">Invoice Report</h5
            <div class="row">
                <table class="table">
                    <thead >
                        <tr>
                        <th scope="col" class="text-center" >Invoice No.</th>
                        <th scope="col" class="text-center" >Invoice Date</th>
                        <th scope="col" class="text-right ">Conveyance Charge</th>
                        <th scope="col" class="text-right">GST</th>
                        <th scope="col" class="text-right">Amount</th> 
                        </tr>
                    </thead>
                    <tbody id="invoiceReportTable">
                        
                    </tbody>
                </table>
            </div>
        `)
        data.forEach((invoice)=>{
            invoice=invoice.dataValues
            //console.log(invoice)
            gstTotal+=invoice.gstTotal
            totalInvoiceAmount+=invoice.totalAmount
            $('#invoiceReportTable').append(`
            <tr>
                <th scope="row" class="text-center py-2">${invoice.id}</th>
                <td class="text-center py-2">${invoice.invoiceDate}</td>
                <td class="text-right py-2">${invoice.conveyanceCharge.toFixed(2)}</td>
                <td class="text-right py-2">${invoice.gstTotal.toFixed(2)}</td>
                <td class="text-right py-2">${invoice.totalAmount.toFixed(2)}</td>
            </tr>
            `)
        })
        $('#invoiceReportTable').append(`
            <tr>
                <th scope="row" class="text-center py-2"></th>
                <td class="text-center py-2"></td>
                <td class="text-right py-2 font-weight-bold">Total</td>
                <td class="text-right py-2 font-weight-bold">${(gstTotal).toFixed(2)}</td>
                <td class="text-right py-2 font-weight-bold">${(totalInvoiceAmount).toFixed(2)}</td>
            </tr>
            `)
        
    }
    const printPaymentDetail=function(data){
        console.log(data)
        $body.append(`
            <div class="row">
                <div class="col">
                    <hr>
                    <h5 class="text-center">Payment Report</h5>
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col" class="text-center">Sno.</th>
                            <th scope="col" class="text-center">Payment Date</th>
                            <th scope="col" class="text-center">Payment Mode</th>
                            <th scope="col" class="text-center">Remark</th>
                            <th scope="col" class="text-right">Amount</th> 
                            </tr>
                        </thead>
                        <tbody id="paymentReportTable">
                            
                        </tbody>
                    </table>
                
                </div>
            </div>
            
        `)
        data.forEach((detail)=>{
            detail=detail.dataValues
            //console.log(detail)
            totalPayment+=detail.amount
            $('#paymentReportTable').append(`
            <tr>
                <th class="text-center py-2" scope="row">${detail.id}</th>
                <td class="text-center py-2">${detail.transactionDate}</td>
                <td class="text-center py-2">${detail.transactionMode}</td>
                <td class="text-center py-2">${detail.remark}</td>
                <td class="text-right py-2">${(detail.amount).toFixed(2)}</td>
            </tr>
            `)
        })
        $('#paymentReportTable').append(`
            <tr>
                <th class="text-center py-2" scope="row"></th>
                <td class="text-center py-2"></td>
                <td class="text-center py-2"></td>
                <td class="text-center py-2 font-weight-bold">Total</td>
                <td class="text-right py-2 font-weight-bold">${(totalPayment).toFixed(2)}</td>
            </tr>
            `)
    }
    const printBalanceData=function()
    {
        $footer.append(`
            <div class="row">
                <div class="col-2">
                </div>
                <div class="col border pb-2">
                <h5 class="h5">Balance Detail</h5>
                    <div class="row">
                        <div class="col text-right">
                            Opening balance:
                        </div>
                        <div class="col text-right" >
                            <input type="number" readonly class="form-control-plaintext py-0  " id="openingBalance" value="">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col text-right">
                            Total Invoice Amount:
                        </div>
                        <div class="col text-right">
                            
                        <input type="number" readonly class="form-control-plaintext py-0  " id="invoiceAmount" value="">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col text-right">
                            Total Payment Amount:
                        </div>
                        <div class="col text-right">
                        
                        <input type="number" readonly class="form-control-plaintext py-0" id="paymentAmount" value="">
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col text-right">
                        Balance:
                        </div>
                        <div class="col text-right">
                            <input type="number" readonly class="form-control-plaintext py-0" id="balance" value="0">
                        </div>
                    </div>
                </div>
                <div class="col-2">
                </div>
            </div>
            `)
        $('#openingBalance').val(openingBalance.toFixed(2))
        $('#invoiceAmount').val(totalInvoiceAmount.toFixed(2))
        $('#paymentAmount').val(totalPayment.toFixed(2))
        $(`#balance`).val((totalInvoiceAmount+openingBalance-totalPayment).toFixed(2))
    }
    /**** 
     * for Original Report Page **/
    ipcRenderer.send('fetchParty')
    ipcRenderer.on('fetchedParty',(event,data)=>{
        data=data.data
        data.forEach((party)=>{
            $selectParty.append(`<option value="${party.dataValues.id}">${party.dataValues.partyName}</option>`)
        })

    })
    /*
        For Printing the Report
        Different type of listener for different type of page
    */
    ipcRenderer.on('gotReportInvoiceOnly',(event,data)=>{
        console.log(data)
        $body.empty()
        printCompanyName(data.data.company)
        printPartyName(data.data.party)
        printInvoiceDetail(data.data.invoiceData)
    })

    ipcRenderer.on('gotReportPaymentOnly',(event,data)=>{
        $body.empty()
        printCompanyName(data.data.company)
        printPartyName(data.data.party)
        printPaymentDetail(data.data.transactionData)
    })
    ipcRenderer.on('gotReportAll',(event,data)=>{
        $body.empty()
        printCompanyName(data.data.company)
        printPartyName(data.data.party)
        printInvoiceDetail(data.data.invoiceData)
        printPaymentDetail(data.data.transactionData)
        printBalanceData()
    })
    $button.click((event,target)=>{
        event.preventDefault()
        if(event.target.id==='refresh')
        {
            remote.getCurrentWindow().reload()
        }
        else if(event.target.id==='close')
        {
            remote.getCurrentWindow().close()
        }
        else if(event.target.id==='print')
        {
            ipcRenderer.send('printPdf')
            ipcRenderer.on('wrotePdf',function(event,path){
                console.log(path)
            })
        }
        else
        {
            console.log($reportType.val())
            let printData={}
            startDate=$(`#startDate`).val()
            endDate=$(`#endDate`).val()
            ipcRenderer.send('getCompanySync')
            ipcRenderer.send('fetchGivenParty',{
                partyId:$selectParty.val()
            })
            if($selectParty.val()==='-1' || startDate==='' || endDate===''||$reportType.val()==='-1')
            {
                alert("Please select valid input!")
            }
            else
            {
                
                if($reportType.val()==='Invoice Only')
                {
                    ipcRenderer.send('getReportInvoiceOnly',{
                        partyId:$selectParty.val(),
                        startDate:startDate,
                        endDate:endDate
                    })
                }
                else if($reportType.val()==='Payment Only')
                {
                    ipcRenderer.send('getReportPaymentOnly',{
                        partyId:$selectParty.val(),
                        startDate:startDate,
                        endDate:endDate
                    }) 
                }
                else if($reportType.val()==='Report All')
                {
                    ipcRenderer.send('getReportAll',{
                        partyId:$selectParty.val(),
                        startDate:startDate,
                        endDate:endDate
                    })
                    
                    
                }
            }
        }
    })
})
