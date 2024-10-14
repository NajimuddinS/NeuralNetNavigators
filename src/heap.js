class Heap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(i) {
        return Math.floor((i - 1) / 2);
    }

    getLeftChildIndex(i) {
        return 2 * i + 1;
    }

    getRightChildIndex(i) {
        return 2 * i + 2;
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    heapifyUp(i) {
        let currentIndex = i;
        while (currentIndex > 0 && this.heap[currentIndex] > this.heap[this.getParentIndex(currentIndex)]) {
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    }

    removeMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return max;
    }

    heapifyDown(i) {
        let currentIndex = i;
        let maxIndex = currentIndex;
        const leftChild = this.getLeftChildIndex(currentIndex);
        const rightChild = this.getRightChildIndex(currentIndex);

        if (leftChild < this.heap.length && this.heap[leftChild] > this.heap[maxIndex]) {
            maxIndex = leftChild;
        }

        if (rightChild < this.heap.length && this.heap[rightChild] > this.heap[maxIndex]) {
            maxIndex = rightChild;
        }

        if (currentIndex !== maxIndex) {
            this.swap(currentIndex, maxIndex);
            this.heapifyDown(maxIndex);
        }
    }
}

const heap = new Heap();
const container = document.getElementById('heap-container');

function drawHeap() {
    container.innerHTML = '';
    const levelHeight = 120;
    const nodeSize = 60;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    function getNodePosition(index) {
        const level = Math.floor(Math.log2(index + 1));
        const nodesInLevel = Math.pow(2, level);
        const position = index - (Math.pow(2, level) - 1);
        const totalLevels = Math.floor(Math.log2(heap.heap.length)) + 1;
        const totalWidth = Math.min(containerWidth, nodesInLevel * (nodeSize + 120));

        const leftOffset = (position + 0.5) * (totalWidth / nodesInLevel);

        return {
            x: leftOffset + (containerWidth - totalWidth) / 2,
            y: level * levelHeight + nodeSize / 2 + (containerHeight - totalLevels * levelHeight) / 2
        };
    }

    function drawEdge(startX, startY, endX, endY) {
        const edge = document.createElement('div');
        edge.className = 'edge';
        const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const angle = Math.atan2(endY - startY, endX - startX);

        edge.style.width = `${length}px`;
        edge.style.left = `${startX}px`;
        edge.style.top = `${startY - 15}px`;
        edge.style.transform = `rotate(${angle}rad)`;

        container.appendChild(edge);
    }

    heap.heap.forEach((value, index) => {
        const node = document.createElement('div');
        node.className = 'node';
        node.textContent = value;

        const position = getNodePosition(index);
        node.style.left = `${position.x - nodeSize / 2}px`;
        node.style.top = `${position.y - nodeSize / 2}px`;

        container.appendChild(node);

        if (index > 0) {
            const parentIndex = heap.getParentIndex(index);
            const parentPosition = getNodePosition(parentIndex);
            drawEdge(parentPosition.x, parentPosition.y, position.x, position.y);
        }
    });
}

function insertValue() {
    const input = document.getElementById('insert-value');
    const value = parseInt(input.value);
    if (!isNaN(value)) {
        heap.insert(value);
        input.value = '';
        drawHeap();
    }
}

function removeMax() {
    heap.removeMax();
    drawHeap();
}