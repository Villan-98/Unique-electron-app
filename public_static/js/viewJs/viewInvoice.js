$(function(){
    console.log("connected")
    const detailList=$('#detail')
    const $btn=$('button')
    const {ipcRenderer}=require('electron')
    const {remote}=require('electron')
    let invoiceNo
    ipcRenderer.send('getAllInvoiceDetail')
    ipcRenderer.once('gotAllInvoiceDetail',(event,data)=>{
        //console.log(data)
        let gst=0;
        let total=0;
        data.data.forEach((data)=>{
            //console.log(data)
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
                            ${data.party.dataValues.partyName}
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
                            <button class="btn btn-info btnEdit" id=${data.id} > Edit</button>
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
    $btn.click((e)=>{
        console.log(e)
        if(e.target.id==='btnClose')
        {
            let window = remote.getCurrentWindow();
            window.close()
        }
    })

    ipcRenderer.on ('sendInvoiceNo', (event, message) => { 
    let window2 = remote.getGlobal ('savedInvoiceWindow');
            if (window2) 
            {
                window2.webContents.send ('takeInvoiceNumber', {
                invoiceNo:invoiceNo
                })
            }
            else
            {
                console.log("sorry")
            }
             
             
         });
    $("body").on("click",".btnEdit",function(event){
        console.log(event.target.id)
        invoiceNo=event.target.id
        ipcRenderer.send('openNewWindow',{
            invoiceNo:event.target.id,
            windowName:'savedInvoice.html',
            task:'viewSavedInvoice'
        })
    })
})