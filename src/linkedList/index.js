class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    // Append: Insert a new node at the end of the linked list
    append(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.printList()
    }

    // Prepend: Insert a new node at the beginning of the linked list
    prepend(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
        this.printList()
    }

    // Delete: Remove the first occurrence of a node with the given data
    delete(data) { debugger
        if (!this.head) {
            return; // List is empty
        }
        if (this.head.data === data) {
            this.head = this.head.next;
            this.printList()
            return;
        }
        let current = this.head;
        while (current.next !== null) {
            if (current.next.data === data) {
                current.next = current.next.next;
                this.printList()
                return;
            }
            current = current.next;
        }
        this.printList()
    }

    // Search: Find the first occurrence of a node with the given data
    search(data) {
        let current = this.head;
        while (current !== null) {
            if (current.data === data) {
                return true; // Data found
            }
            current = current.next;
        }
        return false; // Data not found

    }

    // Print: Display the elements of the linked list
    printList() {
        let current = this.head;
        const elements = [];
        let items =`<span class='arrow'>Head ===> </span>`
        while (current !== null) {
            elements.push(current.data);
            
            items += `
                        <div class="nodeBody">
                            <div class="data">${current.data}</div>
                            <div class="next"></div>
                        </div>        <span class='arrow'> ===> </span>
                    `
                    current = current.next;
        }
        items += `Null`
        console.log(elements.join(' -> '));
        document.getElementById('linkedListContainer').innerHTML = items;
    }

}

// Example usage:
const linkedList = new LinkedList();
linkedList.append('10');
linkedList.append('20');
linkedList.append('30');
linkedList.prepend('5');
linkedList.printList(); // Output: 5 -> 10 -> 20 -> 30
linkedList.delete('20');
linkedList.printList(); // Output: 5 -> 10 -> 30
console.log(linkedList.search(10)); // Output: true
console.log(linkedList.search(50)); // Output: false

document.getElementById('addToEnd').addEventListener('click',()=>{
    let item = document.getElementById('item').value
    linkedList.append(item)
})

document.getElementById('addToStart').addEventListener('click',()=>{
    let item = document.getElementById('item').value
    linkedList.prepend(item)
})

document.getElementById('deleteItem').addEventListener('click',()=>{
    let item = document.getElementById('item').value
    linkedList.delete(item)
})