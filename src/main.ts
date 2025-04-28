const inputField = document.getElementById('bit-input') as HTMLInputElement;
const output = document.getElementById('output') as HTMLElement;
const button = document.getElementById('calculate-btn') as HTMLButtonElement;

button.addEventListener('click', () => {
    const input = inputField.value;
    const numbers = input.split(',').map(num => parseInt(num.trim(), 10));

    let result = 0;

    for (const num of numbers) {
        const bitIndex = num - 1;

        if (bitIndex >= 0 && bitIndex < 32) { 
            result |= (1 << bitIndex);
        } else {
            alert(`Invalid bit position: ${num}`);
        }
    }

    output.textContent = `Result: ${result} (binary: ${result.toString(2)})`;
});
