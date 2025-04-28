const inputField = document.getElementById('bit-input') as HTMLInputElement;
const output = document.getElementById('output') as HTMLElement;
const button = document.getElementById('calculate-btn') as HTMLButtonElement;
const copyField = document.getElementById('copy-field') as HTMLElement;
const copyMessage = document.getElementById('copy-message') as HTMLElement;

function displayError(message: string) {
    output.textContent = message;
    copyField.style.display = 'none';
}

function validateNumbers(numbers: number[]): number[] {
    return numbers.filter(num => num < 4 || num > 13);
}

function calculateBits(numbers: number[]): number {
    return numbers.reduce((result, num) => {
        const bitIndex = num - 1;
        if (bitIndex >= 0 && bitIndex < 32) {
            return result | (1 << bitIndex);
        }
        alert(`Invalid bit position: ${num}`);
        return result;
    }, 0);
}

button.addEventListener('click', () => {
    const input = inputField.value.trim();

    if (!input) {
        displayError('Error! Please input valid player numbers in the format: 5,6,7');
        return;
    }

    const numbers = input.split(',').map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));
    if (numbers.length === 0) {
        displayError('Error! Please input valid player numbers in the format: 5,6,7');
        return;
    }

    const invalidNumbers = validateNumbers(numbers);
    if (invalidNumbers.length > 0) {
        displayError(`Error! The following numbers are out of range (4-13): ${invalidNumbers.join(', ')}`);
        return;
    }

    const result = calculateBits(numbers);

    output.textContent = `Result: ${result} | Binary result: ${result.toString(2)}`;

    copyField.textContent = `tv_listen_voice_indices ${result}; tv_listen_voice_indices_h ${result}`;
    copyField.style.display = 'block';
    copyMessage.style.display = 'none';
});

copyField.style.display = 'none';

copyField.addEventListener('click', () => {
    const textToCopy = copyField.textContent || '';
    if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                copyMessage.style.display = 'block';
                setTimeout(() => {
                    copyMessage.style.display = 'none';
                }, 1500);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            copyMessage.style.display = 'block';
            setTimeout(() => {
                copyMessage.style.display = 'none';
            }, 1500);
        } catch (err) {
            console.error('Fallback: Failed to copy: ', err);
        }
        document.body.removeChild(textArea);
    }
});