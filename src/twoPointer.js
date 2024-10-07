// Convert inputs from string to number
document.querySelector("button").addEventListener("click", takeInputs);

function takeInputs() {
    let array = document.querySelector("#array").value;
    let target = document.querySelector("#target").value;
    let arr = array.trim().split(",").map(Number);
    arr.sort((a, b) => a - b);
    target = +target;

    // Clear previous results
    clearResults();

    // Display array elements
    displayArray(arr);
    
    // Start two pointer search
    twoPointer(arr, target);
}

async function twoPointer(arr, target) {
    let i = 0;
    let j = arr.length - 1;
    let pairs = []; // Array to store found pairs

    while(i < j) {
        // Highlight the current pair being checked
        highlightElements(i, j);

        // Delay for visibility (User can see)
        await new Promise(resolve => setTimeout(resolve, 1000));
        let sum = arr[i] + arr[j];
        if(sum < target) {
            i++;
        }
        else if (sum > target){
            j--;
        }
        else{
            // Store the found pair
            pairs.push(`${arr[i]}, ${arr[j]}`);
            i++;
            j--;

            // Resetting the highlight after checking
            resetHighlights();
        }
        
        // Reset highlight after checking
        resetHighlights();
    }

    // Display found pairs or no pairs found
    if (pairs.length > 0) {
        displayAllPairs(pairs);
    } else {
        notFound();
    }
}

function highlightElements(i, j) {
    let resultContainer = document.querySelector("#results");
    let boxes = resultContainer.querySelectorAll(".number-box");
    boxes[i].classList.add("highlight-box");
    boxes[j].classList.add("highlight-box");
}

function resetHighlights() {
    let boxes = document.querySelectorAll(".number-box");
    boxes.forEach(box => box.classList.remove("highlight-box"));
}

function displayArray(arr) {
    let resultContainer = document.querySelector("#results");
    arr.forEach(num => {
        let box = document.createElement("div");
        box.className = "number-box";
        box.innerText = num;
        resultContainer.appendChild(box);
    });
}

function displayAllPairs(pairs) {
    let resultContainer = document.querySelector("#results");
    let message = document.createElement("div");
    message.className = "result-message";
    
    if (pairs.length === 1) {
        message.innerHTML = `Pair equals to the target is: {${pairs[0]}}`;
    } else {
        message.innerHTML = `Pairs equal to the target are: ${pairs.map(pair => `{${pair}}`).join(", ")}`;
    }
    
    resultContainer.appendChild(message);
}

function notFound() {
    let resultContainer = document.querySelector("#results");
    let message = document.createElement("div");
    message.className = "result-message";
    message.innerText = "No pair found in the given array.";
    resultContainer.appendChild(message);
}

function clearResults() {
    document.querySelector("#results").innerHTML = "";
}
