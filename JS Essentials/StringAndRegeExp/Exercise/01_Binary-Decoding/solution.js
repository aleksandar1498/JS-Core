function solve() {
    let text = document.getElementById('input').value;
    let textDigits = text;

    while (textDigits.length > 1) {
        textDigits = textDigits.split('').map(Number)
            .reduce((a, b) => a + b, 0).toString();
    }

    let removeSum = Number(textDigits);
    let length = text.length - removeSum * 2;

    let output = text
        .substr(removeSum, length)
        .split(/(\d{8})/)
        .map((x) => parseInt(x, 2))
        .map((x) => String.fromCharCode(x))
        .filter((x) => /[A-Za-z ]+/g.test(x))
        .join('');

    if (output) {
        document.querySelector('div.boxes').style.display = 'block';
        document.getElementById('resultOutput').textContent = output;
    }
}