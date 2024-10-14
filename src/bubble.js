let array = [];
let isSorting = false;

// Function to add input values to the array
function addItems() {
    if (isSorting) {
        return;
    }

    let inputValue = document.getElementById('inputValue').value;
    if (inputValue) {
        // Split input by comma, convert to numbers, and concatenate to the array
        let newArray = inputValue.split(',').map(Number);
        array = array.concat(newArray);

        // Display the updated array
        displayItems(array);
    } else {
        console.log("Input is empty");
    }

    // Clear the input field
    document.getElementById('inputValue').value = "";
}

// Clear the array
function clearItems() {
    array = [];
    let queueContainer = document.getElementById("queueContainer");
    queueContainer.innerHTML = ""; // Clear the visualized queue
    document.getElementById('messageBox').textContent = "";
    document.getElementById('messageBox').classList.remove('show');
}

// Function to display the array in the queue visualizer
function displayItems(array) {
    let queueContainer = document.getElementById("queueContainer");
    queueContainer.innerHTML = "";  // Clear current display

    array.forEach(item => {
        let div = document.createElement("div");
        div.classList.add("queue-item");
        div.textContent = item;
        queueContainer.appendChild(div);
    });
}

// Sorting algorithm (Bubble Sort) with visual feedback
async function sortItems() {
    if (isSorting) return;
    isSorting = true;

    let sortBtn = document.getElementById("sortBtn");
    sortBtn.disabled = true;

    let items = document.querySelectorAll(".queue-item");

    let messageBox = document.getElementById('messageBox');
    messageBox.textContent = "";
    messageBox.classList.remove('show');


    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            items = document.querySelectorAll(".queue-item");

            if (array[j] > array[j + 1]) {
                await swap(items, j, j + 1);
                [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Swapping
            }
        }
    }

    // Display success message after sorting
    messageBox.textContent = "Array sorted successfully";
    messageBox.classList.add('show'); // Show the message

    sortBtn.disabled = false;
    isSorting = false;
}

// Function to swap two items visually and in the array
// Function to swap two items visually and in the array
function swap(items, index1, index2) {
    return new Promise(resolve => {
        // Add swapping class to change color and scale
        items[index1].classList.add("swapping");
        items[index2].classList.add("swapping");

        // Set delay to allow color and scale change before swapping content
        setTimeout(() => {
            // Swap the text content between the two items
            let temp = items[index1].textContent;
            items[index1].textContent = items[index2].textContent;
            items[index2].textContent = temp;

            // Remove swapping class after transition
            setTimeout(() => {
                items[index1].classList.remove("swapping");
                items[index2].classList.remove("swapping");
                resolve(); // Continue to the next swap
            }, 500); // Duration for color change and scale down
        }, 500); // Initial duration for color change and scale up
    });
}
