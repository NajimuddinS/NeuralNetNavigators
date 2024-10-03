
let array=[]

       
let form=document.querySelector("form")
form.addEventListener("submit",function(event){
    event.preventDefault()
    let inputNumber=document.getElementById("inputNumber").value;
    if(inputNumber){
        let ar= inputNumber.split(',').map(Number);
        // console.log(stack)
        array=array.concat(ar)
       displaySorting(array)
    }
    else{
        console.log("stack is empty")
    }
                          
    form.reset()
    // console.log(stack)
   

})

function displaySorting(ar){
    let ul=document.querySelector("ul")
    for(let i=1;i<ar.length;i++){
        let li=document.createElement("li")
        for(let j=0;j<ar.length-i;j++){
            let innerLi1=document.createElement("li")
            let innerLi2=document.createElement("li")
            if(ar[j]>ar[j+1]){
                let v=ar[j]
                ar[j]=ar[j+1]
                ar[j+1]=v
                // li.innerText=ar[j+1]
                // innerLi1.innerText=ar[j]
                // innerLi2.innerText=ar[j+1]
            }
            // li.append(innerLi1,innerLi2)
        }
        ul.append(li)
    }
   
    console.log(ar)
}