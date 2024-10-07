// 1 second delay
let delay = 1000;
  
function startQuickSort() {
    let input = document.getElementById('arrayInput').value;
    let array = input.split(',').map(Number);
    displayArray(array, "Initial Array");
    quickSort(array, 0, array.length - 1).then(() => {
        displayArray(array, "Sorted Array", true);
    });
}

function displayArray(arr, message, final = false) {
    let container = document.getElementById("array-container");
    container.innerHTML += `<p>${message}: ${arr.join(", ")}</p>`;
    let div = document.createElement("div");
    arr.forEach((num, index) => {
        let element = document.createElement("span");
        element.className = "array-element";
        element.innerText = num;
        div.appendChild(element);
    });
    if (final) {
        div.style.fontWeight = "bold";
    }
    container.appendChild(div);
}

async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    highlightPivot(high);

    for (let j = low; j < high; j++) {
        highlightCompare(j);
        await delayPromise();

        if (arr[j] < pivot) {
            i++;
            highlightSwap(i, j);
            [arr[i], arr[j]] = [arr[j], arr[i]];
            await displayStep(arr, `Pivot: ${pivot}, Low: ${low}, High: ${high}`);
        } else {
            clearHighlight(j);
        }
    }
    highlightSwap(i + 1, high);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    await displayStep(arr, `Pivot: ${pivot}, Low: ${low}, High: ${high}`);

    return i + 1;
}

async function quickSort(arr, low, high) {
    if (low < high) {
        let pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
}

function highlightPivot(index) {
    let elements = document.querySelectorAll(".array-element");
    elements.forEach(element => element.classList.remove("pivot", "compare", "swap"));
    elements[index].classList.add("pivot");
}

function highlightCompare(index) {
    let elements = document.querySelectorAll(".array-element");
    elements[index].classList.add("compare");
}

function highlightSwap(index1, index2) {
    let elements = document.querySelectorAll(".array-element");
    elements[index1].classList.add("swap");
    elements[index2].classList.add("swap");
}

function clearHighlight(index) {
    let elements = document.querySelectorAll(".array-element");
    elements[index].classList.remove("compare");
}

function displayStep(arr, message) {
    return new Promise(resolve => {
        setTimeout(() => {
            displayArray(arr, message);
            resolve();
        }, delay);
    });
}

function delayPromise() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, delay);
    });
}
