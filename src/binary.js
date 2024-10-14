function startVisualization() {
    const arrayInput = document.getElementById("arrayInput").value.trim();
    const targetInput = document.getElementById("targetInput").value.trim();

    // Validate the input
    if (!arrayInput || !targetInput) {
        document.getElementById('message').textContent = 'Please enter a valid array and target value.';
        return;
    }

    const target = parseInt(targetInput);

    // Parse and sort the input array
    const array = arrayInput.split(',').map(Number).sort((a, b) => a - b);

    // Clear previous visualization
    document.getElementById('message').innerHTML = '';
    displayHistogram(array);

    binarySearchHistogramVisualizer(array, target);
}

function displayHistogram(array, left = -1, mid = -1, right = -1) {
    const histogram = document.getElementById("histogram");
    histogram.innerHTML = ''; // Clear existing bars

    const barWidth = Math.min(50, Math.max(30, 800 / array.length - 10)); // Dynamically calculate bar width

    array.forEach((num, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${Math.max(num * 5, 30)}px`; // Ensure a minimum height of 30px
        bar.textContent = num;
        bar.style.width = `${barWidth}px`; // Dynamically set bar width

        if (index === mid) {
            bar.classList.add('mid');
        } else if (index === left) {
            bar.classList.add('left');
        } else if (index === right) {
            bar.classList.add('right');
        }

        histogram.appendChild(bar);
    });
}

function binarySearchHistogramVisualizer(array, target) {
    let left = 0;
    let right = array.length - 1;
    let step = 0;

    function visualizeStep() {
        if (left <= right) {
            const mid = Math.floor((left + right) / 2);
            displayHistogram(array, left, mid, right);

            if (array[mid] === target) {
                document.getElementById('message').textContent = `Target ${target} found at index ${mid}`;
                return;
            } else if (array[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }

            step++;
            setTimeout(visualizeStep, 1000); // 1-second delay for each step
        } else {
            document.getElementById('message').textContent = `Target ${target} not found in the array.`;
        }
    }

    visualizeStep();
}