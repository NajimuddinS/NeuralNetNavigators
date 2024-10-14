function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSieve() {
    let range = 100;
    let primes = Array(range + 1).fill(true);
    primes[0] = primes[1] = false;

    let gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = "";

    for(let i = 1; i <= range; i++) {
        let element = document.createElement("div");
        element.className = "grid-item";
        element.textContent = i;
        element.id = `item-${i}`;
        gridContainer.appendChild(element);
    }

    for(let i = 2; i * i <= range; i++) {
        if (primes[i]) {
            document.getElementById(`item-${i}`).classList.add("processing");
            await sleep(500);

            for(let j = i * i; j <= range; j += i) {
                primes[j] = false;
                document.getElementById(`item-${j}`).classList.add("not-prime");
                await sleep(100);
            }

            document.getElementById(`item-${i}`).classList.remove("processing");
            document.getElementById(`item-${i}`).classList.add("prime");
        }
    }

    for(let i = 2; i <= range; i++) {
        if (primes[i]) {
            document.getElementById(`item-${i}`).classList.add("prime");
        }
    }
}
