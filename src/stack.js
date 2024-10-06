let stack=[]
       
let form=document.querySelector("form")
form.addEventListener("submit",function(event){
    event.preventDefault()
    let inputNumber=document.getElementById("inputNumber").value;
    if(inputNumber){
        let ar= inputNumber.split(',');
        // console.log(stack)
        stack=stack.concat(ar)
        Dispalystackitem(stack)
    }
    else{
        console.log("stack is empty")
    }
                          
    form.reset()
    // console.log(stack)
   

})

// console.log(stack)

function Dispalystackitem(stack){
let ul=document.querySelector("ul")
ul.innerHTML = "";
  for(let i=0;i<stack.length;i++){
  let li=document.createElement("li")
  li.innerText=stack[i]
  ul.append(li)
 }
}



function popItems(){
let peek=document.getElementById("peek")
    if (stack.length > 0) {
        stack.pop()
        peek.style.visibility="hidden"
        Dispalystackitem(stack);

    } 
    else {
        peek.style.visibility="hidden"
        alert("Stack is empty")
        console.log("Stack is already empty");
    }
    
}

function peekItem(){
let peek=document.getElementById("peek")
peek.style.visibility="visible"
 if(stack.length>0){
    peek.innerText=stack[stack.length-1]
    console.log(stack.length)
 }
 else{
     peek.style.visibility="hidden"
    console.log("stack is empty")
 }
}