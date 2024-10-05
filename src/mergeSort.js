document.getElementById('start-button').addEventListener('click', startMergeSort);

function startMergeSort() {
    let input = document.getElementById('array-input').value;
    let array = input.split(',').map(Number);
    if (array.length === 0) {
        alert('Please enter a valid array');
        return;
    }
    document.getElementById('tree-container').innerHTML = '';
    mergeSort(array, 0, array.length - 1, document.getElementById('tree-container'));
}

function mergeSort(arr, start, end, container) {
    if (start === end) {
        let node = document.createElement('div');
        node.className = 'node';
        node.textContent = arr[start];
        container.appendChild(node);
        return [arr[start]];
    }

    let mid = Math.floor((start + end) / 2);
    
    // Creating left and right containers for subarrays
    let leftContainer = document.createElement('div');
    leftContainer.className = 'tree';
    container.appendChild(leftContainer);
    let left = mergeSort(arr, start, mid, leftContainer);

    let rightContainer = document.createElement('div');
    rightContainer.className = 'tree';
    container.appendChild(rightContainer);
    let right = mergeSort(arr, mid + 1, end, rightContainer);

    // Adding an arrow between the nodes
    let arrow = document.createElement('div');
    arrow.className = 'arrow';
    arrow.textContent = '↓';
    container.appendChild(arrow);

    // Creating a new node for the merged array
    let mergedContainer = document.createElement('div');
    mergedContainer.className = 'node';
    mergedContainer.textContent = `[${left.join(', ')}] + [${right.join(', ')}] = [${merge(left, right).join(', ')}]`;
    container.appendChild(mergedContainer);

    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    while (i < left.length) {
        result.push(left[i++]);
    }
    while (j < right.length) {
        result.push(right[j++]);
    }
    return result;
}
