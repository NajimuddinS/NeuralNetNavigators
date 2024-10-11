let array = [1, 3, 2, 5, 8, 7];
let windowSize = 3;
let currentStart = 0;
let animationInterval;

function createArrayElements() {
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = ''; // Clear existing elements
    array.forEach((num, index) => {
        const element = document.createElement('div');
        element.className = 'array-element';
        element.textContent = num;
        element.id = `element-${index}`;
        arrayContainer.appendChild(element);
    });
}

function updateWindow() {
    for (let i = 0; i < array.length; i++) {
        const element = document.getElementById(`element-${i}`);
        if (i >= currentStart && i < currentStart + windowSize) {
            element.classList.add('window');
        } else {
            element.classList.remove('window');
        }
    }
}

function slideWindow() {
    if (currentStart + windowSize < array.length) {
        currentStart++;
    } else {
        currentStart = 0;
    }
    updateWindow();
}

function toggleAutoAnimation() {
    if (!animationInterval) {
        animationInterval = setInterval(slideWindow, 1000);
        document.getElementById('auto-btn').textContent = 'Stop Animation';
    } else {
        clearInterval(animationInterval);
        animationInterval = null;
        document.getElementById('auto-btn').textContent = 'Auto Animate';
    }
}

function submit() {
    const input = document.getElementById('array-input').value;
    array = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    const newSize = parseInt(document.getElementById('window-size-input').value);

    if (newSize > 0 && newSize <= array.length) {
        windowSize = newSize;
        currentStart = 0;
        createArrayElements();
        updateWindow();
    } else {
        alert('Invalid window size. Please enter a number between 1 and the array length.');
    }
}

// Initialize the visualizer
createArrayElements();
updateWindow();