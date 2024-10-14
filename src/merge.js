let array = [];

function enterArray() {
  const inputValue = document.getElementById('array-input').value;
  array = inputValue.split(',').map(Number);
  displayArray();
  document.getElementById('message').style.display = 'none'; // Hide message
}

function displayArray() {
  const visualizer = document.getElementById('visualizer');
  visualizer.innerHTML = '';
  array.forEach(value => {
    const div = document.createElement('div');
    div.classList.add('array-element');
    div.textContent = value;
    visualizer.appendChild(div);
  });
}

function clearArray() {
  array = [];
  document.getElementById('array-input').value = '';
  document.getElementById('visualizer').innerHTML = '';
  document.getElementById('message').style.display = 'none'; // Hide message
}

function swapAnimation(element1, element2) {
  return new Promise(resolve => {
    element1.classList.add('swapping');
    element2.classList.add('swapping');

    setTimeout(() => {
      element1.classList.remove('swapping');
      element2.classList.remove('swapping');
      resolve();
    }, 500);
  });
}

function compareAnimation(element1, element2) {
  return new Promise(resolve => {
    element1.classList.add('comparing');
    element2.classList.add('comparing');

    setTimeout(() => {
      element1.classList.remove('comparing');
      element2.classList.remove('comparing');
      resolve();
    }, 500);
  });
}

async function mergeSortHandler() {
  await mergeSort(array, 0, array.length - 1);
  document.getElementById('message').style.display = 'block'; // Show message after sorting
}

async function mergeSort(arr, left, right) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);
  await mergeSort(arr, left, mid);
  await mergeSort(arr, mid + 1, right);
  await merge(arr, left, mid, right);
}

async function merge(arr, left, mid, right) {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;
  const elements = document.getElementsByClassName('array-element');

  while (i < leftArr.length && j < rightArr.length) {
    await compareAnimation(elements[k], elements[mid + 1 + j]);

    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      elements[k].textContent = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      elements[k].textContent = rightArr[j];
      j++;
    }

    elements[k].classList.add('sorted'); // Add sorted class to turn it green
    await swapAnimation(elements[k], elements[k]);
    k++;
  }

  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    elements[k].textContent = leftArr[i];
    elements[k].classList.add('sorted'); // Add sorted class for remaining elements
    await swapAnimation(elements[k], elements[k]);
    i++;
    k++;
  }

  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    elements[k].textContent = rightArr[j];
    elements[k].classList.add('sorted'); // Add sorted class for remaining elements
    await swapAnimation(elements[k], elements[k]);
    j++;
    k++;
  }
}