/* created by Villan_98 on 29 Aug 2019 */
$(function(){
    const {ipcRenderer}=require('electron')
    const {remote}=require('electron')
    console.log("connected")
    const $btn=$('button')
    const $password=$('#password')

    //click function for button
    $btn.click((e)=>{
        e.preventDefault()
        console.log("clicked") 
        console.log(e.target.id)
        if(e.target.id==="btnClose")
        {

        }
        else if(e.target.id==="btnLogin")
        {
            console.log("login")
            const password=$password.val()
            console.log(password)
          //  ipcRenderer.send('goingToHome',{message:"successfully logged in"})
            if(! password)
            {
                alert("Please Fill the input box")
            }
            else
            {

                ipcRenderer.send('checkCredential',{message:"check Password",password:password})
                ipcRenderer.once('loginResult',(event,data)=>{
                    if(data.success)
                    {
                        console.log("hahaha")
                    ipcRenderer.send('goingToHome',{message:"successfully logged in"})

                    }
                    else{
                        alert(data.message)
                        remote.getCurrentWindow().reload()
                    }
                })
            }
        }
    })
    
})