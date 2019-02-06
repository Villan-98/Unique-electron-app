$(function(){
    const{ipcRenderer}=require('electron')
    console.log("connected")
    const button=$('button')
    const inpAddJob=$('#inpAddJob')
    const modalList=$('#modalList')
    const openWin=function(name)
    {
        ipcRenderer.send('openNewWindow',{
            windowName:name
        })
    }
    button.click((e)=>{
        console.log(e.target.id)
        if(e.target.id==='addParty')
        {
            ipcRenderer.send('openNewWindow',{
                windowName:'addParty.html'
            })
        }
        else if(e.target.id==='myCompany')
        {
            openWin('myCompany.html')
        }
        else if(e.target.id==='unitMaster')
        {
            openWin('unitMaster.html')
        }

        else if(e.target.id==='itemMaster')
        {
            openWin('itemMaster.html')
        }
        else if(e.target.id==='newInvoice')
        {
            openWin('newInvoice.html')
        }
        else if(e.target.id==='viewInvoice')
        {
            openWin('viewInvoice.html')
        }
        else if(e.target.id==='addJobType')
        {
            if(inpAddJob.val()==="")
            alert('Please fill the input box')
            else
            {
                ipcRenderer.send('createJobType',{
                    jobType:inpAddJob.val()
                })
                ipcRenderer.once('createdJobType',(event,data)=>{
                    //console.log(data)
                    if(data.success)
                    {
                        alert("Job-Type added successfully!")
                        ipcRenderer.send('fetchJobType')
                        ipcRenderer.once('fetchedJobType',(event,data)=>{
                            //console.log(data)
                            data=data.data
                            updateList(modalList,data)
                        })
                    }
                    else{
                        alert("Oops something went wrong.Please try again!")
                    }
                })
            }
        }
        else if(e.target.id==='jobType')
        {
            ipcRenderer.send('fetchJobType')
            ipcRenderer.once('fetchedJobType',(event,data)=>{
                //console.log(data)
                data=data.data
                updateList(modalList,data) 
            })
        }
    })
})
const updateList=function(List,data)
{
    List.empty()
    console.log("update")
    data.forEach(data=>{
        data=data.dataValues
        List.append(`
        <li class="list-group-item">
        ${data.type}
        </li>
        `)
    })
}