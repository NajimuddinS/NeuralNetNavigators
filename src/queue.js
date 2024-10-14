class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
        this.addQueueItem(element);
    }

    dequeue() {
        if (!this.isEmpty()) {
            const removedElement = this.items.shift();
            this.removeFirstItem();
            return removedElement;
        }
        return null;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    peek() {
        if (!this.isEmpty()) {
            return this.items[0];
        }
        return null;
    }

    addQueueItem(element) {
        const queueContainer = document.getElementById("queueContainer");
        const div = document.createElement("div");
        div.className = "queue-item slide-in";
        div.innerText = element;
        queueContainer.appendChild(div);

        setTimeout(() => {
            div.classList.remove('slide-in');
        }, 100);
    }

    removeFirstItem() {
        const queueContainer = document.getElementById("queueContainer");
        const firstItem = queueContainer.firstChild;
        if (firstItem) {
            firstItem.classList.add('slide-out');
            setTimeout(() => {
                queueContainer.removeChild(firstItem);
            }, 500); 
        }
    }
}

const queue = new Queue();

function showFunctions() {
    const buttons = document.querySelectorAll('.button-container button');
    buttons.forEach(button => button.style.display = 'inline');
}

function enqueue() {
    const input = document.getElementById("inputValue").value;
    if (input) {
        queue.enqueue(input);
        showMessage(`Enqueued: ${input}`);
        document.getElementById("inputValue").value = '';
    }
}

function dequeue() {
    const dequeuedValue = queue.dequeue();
    if (dequeuedValue !== null) {
        showMessage(`Dequeued: ${dequeuedValue}`);
    } else {
        showMessage("Queue is empty.");
    }
}

function isEmpty() {
    const message = queue.isEmpty() ? "Queue is empty." : "Queue is not empty.";
    showMessage(message);
}

function size() {
    showMessage(`Size of queue: ${queue.size()}`);
}

function peek() {
    const peekedValue = queue.peek();
    if (peekedValue !== null) {
        showMessage(`Front of queue: ${peekedValue}`);
    } else {
        showMessage("Queue is empty.");
    }
}

function showMessage(msg) {
    const msgbox = document.getElementById("msgbox");
    msgbox.innerText = msg;
}