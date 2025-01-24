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
    const base = baseInput.value.trim();
    if (base) {
        selectedBase = parseInt(base); 
    }
}

function generateCount() {
    updateBase();  

    const count = countInput.value.trim();
    if (count === "" || parseInt(count) < 0) {
        alert("Please enter a valid positive number.");
        return;
    }

    countValue = parseInt(count);

    const symbols = generateSymbols(selectedBase)
    const base = selectedBase;

    let counts = [];
    for (let i = 0; i < countValue; i++) {
        counts.push(getSymbol(i, symbols, base));
    }

    countOutput.innerHTML = `<p><strong>Count Sequence:</strong> ${counts.join(" ")}</p>`;
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

    const symbolValue = symbolInput.value.trim();
    if (symbolValue === "" || parseInt(symbolValue) < 0) {
        alert("Please enter a valid positive number.");
        return;
    }

    const symbolNumber = parseInt(symbolValue);

    
    if (symbolNumber === 0) {
        symbolOutput.innerHTML = `<p><strong>Symbol:</strong> 0</p>`;
        return;
    }

    const symbol = getSymbol(symbolNumber - 1, symbols, base);

    symbolOutput.innerHTML = `<p><strong>Symbol:</strong> ${symbol}</p>`;
}


function generateSymbols(base) {
    const symbols = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
    return symbols.substring(0, base); 
}

function getSymbol(index, symbols, base) {
    if (index < base) {
        return symbols[index];
    } else {
        let result = '';
        while (index >= base) {
            result = symbols[index % base] + result;
            index = Math.floor(index / base);
        }
        return symbols[index] + result;
    }
}
