document.getElementById("inputArray").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        visualizeSort();
    }
});

function visualizeSort() {
    const input = document.getElementById("inputArray").value;
    const array = input.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    const container = document.getElementById("array-container");
    const message = document.getElementById("message");
    container.innerHTML = ''; // Clear previous bars
    message.textContent = ''; // Clear previous messages
    array.forEach(num => {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = `${num * 5}px`; // Adjust height for visibility
        bar.textContent = num; // Display the number inside the bar
        container.appendChild(bar);
    });

    // Perform Insertion Sort Visualization
    insertionSort(array);
}

function insertionSort(arr) {
    const bars = document.querySelectorAll(".bar");
    const message = document.getElementById("message");
    let sorted = false; // Flag to track if sorting is complete

    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        bars[i].style.backgroundColor = "orange"; // Highlight key element
        setTimeout(() => {
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
                updateBars(arr, bars);
            }
            arr[j + 1] = key;
            updateBars(arr, bars);
            bars[j + 1].style.backgroundColor = "green"; // Highlight sorted position

            // Check if sorting is complete
            if (i === arr.length - 1) {
                sorted = true;
                message.textContent = "Sorting complete!";
            }
        }, i * 1000); // Delay for visualization
    }
}

function updateBars(arr, bars) {
    arr.forEach((num, index) => {
        bars[index].style.height = `${num * 5}px`;
        bars[index].textContent = num; // Update text content
    });
}

function clearInput() {
    document.getElementById("inputArray").value = '';
    document.getElementById("array-container").innerHTML = '';
    document.getElementById("message").textContent = ''; // Clear message
}