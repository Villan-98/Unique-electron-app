$(function(){
    console.log("connected")
    const $div_descrition=$('#description'),
        $particular=$('.particular')
    $particular.click((e)=>{
        console.log("partcular clicked")
        $div_descrition.append(
            `<div class="row  ">
                    <div class="col-1 p-0 mr-3">
                        <input type="text" class="form-control particular" placeholder="Particular">
                    </div>
                    <div class="col-1 p-0">
                        <div class="row">

                            <div class="col p-0">
                                <input type="number" class="form-control" placeholder="No. of Colors">
                            </div>

                            <div class="col p-0">
                                <input type="text" class="form-control" placeholder="Quantity">
                            </div>
                        </div>
                    </div>
                    <div class="col-1 ml-3 p-0">
                        <input type="text" class="form-control" placeholder="Job-type">
                    </div>

                    <div class="col-1 p-0">
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
                            <div class="col">
                                <button class="btn btn-block" id="total1"> Total</button>
                            </div>
                            <div class="col">
                                <button class="btn btn-alert" id="delete"> Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
`
        )
    })
})