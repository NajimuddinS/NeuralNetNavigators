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
  let selectionContainer = document.getElementById("selectionContainer");
  selectionContainer.innerHTML = ""; // Clear the visualized array
  document.getElementById('messageBox').textContent = "";
  document.getElementById('messageBox').classList.remove('show');
}

// Function to display the array in the selection visualizer
function displayItems(array) {
  let selectionContainer = document.getElementById("selectionContainer");
  selectionContainer.innerHTML = "";  // Clear current display

  array.forEach(item => {
    let div = document.createElement("div");
    div.classList.add("queue-item");
    div.textContent = item;
    selectionContainer.appendChild(div);
  });
}

// Sorting algorithm (Selection Sort) with visual feedback
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
    let minIndex = i;
    items[i].style.backgroundColor = "#ffcc00"; // Highlight current item

    for (let j = i + 1; j < array.length; j++) {
      items[j].style.backgroundColor = "#ff6b6b"; // Highlight item being compared

      await new Promise(resolve => setTimeout(resolve, 500)); // Delay for visualization

      if (array[j] < array[minIndex]) {
        if (minIndex !== i) {
          items[minIndex].style.backgroundColor = "#48ff00"; // Reset previous min
        }
        minIndex = j;
        items[minIndex].style.backgroundColor = "#ff00ff"; // Highlight new min
      } else {
        items[j].style.backgroundColor = "#48ff00"; // Reset if not min
      }
    }

    if (minIndex !== i) {
      await swap(items, i, minIndex);
      [array[i], array[minIndex]] = [array[minIndex], array[i]]; // Swap in array
    }

    items[i].style.backgroundColor = "#48ff00"; // Reset color after swap
  }

  items[array.length - 1].style.backgroundColor = "#48ff00"; // Color the last item

  // Display success message after sorting
  messageBox.textContent = "Array sorted successfully";
  messageBox.classList.add('show'); // Show the message

  sortBtn.disabled = false;
  isSorting = false;
}

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