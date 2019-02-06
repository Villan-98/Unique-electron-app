$(function(){
    console.log("connected")
    const detailList=$('#detail')
    const btnClose=$('#close')
    const {ipcRenderer}=require('electron')
    const {remote}=require('electron')
    ipcRenderer.send('getAllInvoiceDetail')
    ipcRenderer.once('gotAllInvoiceDetail',(event,data)=>{
        //console.log(data)
        let gst=0;
        let total=0;
        data.data.forEach((data)=>{
            data=data.dataValues
            gst+=data.gstTotal
            total+=data.totalAmount
            detailList.append(
                `<li class="list-group-item text-center ">
                    <div class="row ">
                        <div class="col-2 ">
                            ${data.id}
                        </div>
                        <div class="col-2">
                            ${data.invoiceDate}
                        </div>
                        <div class="col-3">
                            ${data.partyId}
                        </div>
                        <div class="col-1">
                            ${data.remark}
                        </div>
                        <div class="col-1 text-right">
                            ${data.gstTotal}
                        </div>
                        <div class="col-2 text-right">
                            ${data.totalAmount}
                        </div>
                        <div class="col-1 text-right">
                            <button class="btn btn-info"> Edit</button>
                        </div>
                    </div>
                </li>
                `
            )
        
        })
        detailList.append(
            `<li class="list-group-item text-center ">
            <div class="row ">
            <div class="col-8 text-bold">
               <h3> Total</h3>
            </div>
            <div class="col-1 text-right">
                ${parseInt(gst)}
            </div>
            <div class="col-2 text-right">
                ${parseInt(total)}
            </div>
        </div>
    </li>
            `
        )
    })
    btnClose.click((event)=>{
        var window = remote.getCurrentWindow();
        window.close()
    })
})