const countInput = document.getElementById("count-input");
const countOutput = document.getElementById("count-output");
const inputPage = document.getElementById("input-pages");
const symbolPage = document.getElementById("symbol-page");
const symbolInput = document.getElementById("symbol-input");
const symbolOutput = document.getElementById("symbol-output");
const baseInput = document.getElementById("base-input");

let countValue = 0;
let selectedBase = 10;

function updateBase() {
    const base = baseInput.value;
    if (base) {
        const parsedBase = parseInt(base);

        if (parsedBase > 36) {
            alert("Base exceeds the maximum supported value (36). Please enter a base between 2 to 36.");
            baseInput.value = "";  
            return false;
        }

        selectedBase = parsedBase;
    }
    return true;  
}

function generateCount() {
    if (!updateBase()) {
        countOutput.innerHTML = ''; 
        return; 
    }

    const count = countInput.value;
    if (count === "" || parseInt(count) < 0) {
        alert("Please enter a valid positive number.");
        return;
    }

    countValue = parseInt(count);

    // Dynamically change the max-width of the container, but not for the symbol page
    document.querySelector(".container").style.maxWidth = "900px"; // Increase width when count is generated

    const symbols = generateSymbols(selectedBase);
    const base = selectedBase;

    let counts = [];
    for (let i = 0; i <= countValue; i++) {
        counts.push(getSymbol(i, symbols, base));
    }

    countOutput.innerHTML = counts.map(symbol => `<div class="count-box">${symbol}</div>`).join("");
}

function next() {
    if (countValue <= 0) {
        alert("Please generate the count sequence before proceeding.");
        return;
    }
    inputPage.classList.add("hidden");
    symbolPage.classList.remove("hidden");
}

function generateSymbol() {
    updateBase();

    const symbols = generateSymbols(selectedBase);
    const base = selectedBase;

    const symbolValue = symbolInput.value;
    if (symbolValue === "" || parseInt(symbolValue) < 0) {
        alert("Please enter a valid positive number.");
        return;
    }

    const symbolNumber = parseInt(symbolValue);

    const symbol = getSymbol(symbolNumber, symbols, base);

    symbolOutput.innerHTML = `<p><strong>Symbol:</strong> ${symbol}</p>`;
}

function generateSymbols(base) {
    const symbols = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return symbols.substring(0, base);
}

function getSymbol(index, symbols, base) {
    let result = '';
    if (index === 0) return symbols[0];

    while (index >= base) {
        result = symbols[index % base] + result;
        index = Math.floor(index / base);
    }
    result = symbols[index] + result;
    return result;
}

