let array=[]
let isSorting = false;
let form=document.querySelector("form")

// form for geting input value
form.addEventListener("submit",function(event){
   event.preventDefault()
   if(isSorting){
    return
   }
   let inputNumber=document.getElementById("inputNumber").value;
  
   if(inputNumber){
       let ar= inputNumber.split(',').map(Number);
       array=array.concat(ar)
       Dispalyitems(array)
   }
   else{
       console.log("array is empty")
   }
                         
   form.reset()
})
// Diplay items of the array

function Dispalyitems(array){
   let array_items=document.getElementById("array_items")
   array_items.innerHTML = "";
    for(let i=0;i<array.length;i++){
    let li=document.createElement("li")
    li.innerText=array[i]
    array_items.append(li)
   }
}

// sorting algorithm
async function sortItems(){
  if(isSorting){
    return;
  } 
  isSorting = true;
  let sortBtn = document.getElementById("sortBtn");
  sortBtn.disabled = true;
//    console.log(array)
   for(let i=0;i<array.length-1;i++){
    let items = document.querySelectorAll("#array_items li");

       for(let j=0;j<array.length-i-1;j++){
           if(array[j]>array[j+1]){
              await swap(items, j, j + 1); 
              [array[j], array[j + 1]] = [array[j + 1], array[j]];  //swaping
            
           }
       }
   }
   sortBtn.disabled = false;
   isSorting = false;
//    Dispalyitems(array)  
}

function swap(items,index1,index2) {
return new Promise(resolve=> {
// Add swapping highlight
items[index1].classList.add("swapping");
items[index2].classList.add("swapping");

// Create a delay for the animation
setTimeout(()=> {
    // Visually swap elements by changing their text and values
    let temp=items[index1].innerText;
    items[index1].innerText = items[index2].innerText;
    items[index2].innerText = temp;

    // Remove the swapping highlight
    setTimeout(() => {
        items[index1].classList.remove("swapping");
        items[index2].classList.remove("swapping");
        resolve();
    }, 500);
}, 500);
});
}