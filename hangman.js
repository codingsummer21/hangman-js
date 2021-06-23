var word = ''
var wrong = []
var correct = []
var gameOver = false

function getRandomWord() {
    fetch('https://random-word-api.herokuapp.com/word?number=1')
        .then(response => response.json())
        .then(data => {
            word = data[0]
            gameOver = false
            wrong = []
            correct = []
            console.log(word)
            displaySecret()
            displayLetters()
            document.getElementById("result").innerHTML = '&nbsp;'
        })
}

function displaySecret() {
    let secret = word.charAt(0)
    for(let i = 1; i < word.length - 1; i++) {
        if(correct.includes(word.charAt(i))) {
            secret += ' ' + word.charAt(i) + ' '
        }
        else {
            secret += ' _ '
        }
    }
    secret += word.charAt(word.length-1)
    document.getElementById("secret-word").innerHTML = '<h1>' + secret + '</h1>'
    drawCanvas()
}

function displayLetters() {
    let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    let letters = ''
    let counter = 0
    alphabet.forEach(ch => {
        let disabled = ''
        counter++
        if(gameOver || wrong.includes(ch) || correct.includes(ch)) {
            disabled = 'disabled'
        }
        letters += "<button onclick='playLetter(" + ch.charCodeAt(0) + ")' "
                + disabled + ">" + ch + "</button> "
        if(counter % 9 == 0) {
            letters += "<br/>"
        }
    })
    document.getElementById("letters").innerHTML = letters
}

function checkWin() {
    if(wrong.length >= 6) {
        gameOver = true
        document.getElementById("result").innerHTML = "<h2>You Lost ...</h2>"
    }
    else {
        for(let i = 1; i < word.length - 1; i++) {
            let ch = word.charAt(i)
            if(!correct.includes(ch)) {
                return
            }
        }
        gameOver = true
        document.getElementById("result").innerHTML = "<h2>You Win!</h2>"
    }
}

function playLetter(ch) {
    let letter = String.fromCharCode(ch)
    if(word.includes(letter)) {
        correct.push(letter)
        console.log(correct)
    }
    else {
        wrong.push(letter)
        console.log(wrong)
    }
    checkWin()
    displaySecret()
    displayLetters()
    drawCanvas()
}

function drawCanvas() {
    let canvas = document.querySelector('canvas');
    let context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillRect(10, 120, 100, 10);
    context.fillRect(20, 20, 7, 100);
    context.fillRect(20, 20, 50, 7);
    context.fillRect(20, 20, 50, 7);
    context.fillRect(64, 20, 3, 15);

    let wrongLetters = wrong.length;

    switch (wrongLetters) {
        case 6:
            // Left leg
            context.beginPath();
            context.moveTo(66, 85);
            context.lineTo(52, 95);
            context.stroke();
        case 5:
            // Right leg
            context.beginPath();
            context.moveTo(66, 85);
            context.lineTo(80, 95);
            context.stroke();
        case 4:
            // Left hand
            context.beginPath();
            context.moveTo(66, 55);
            context.lineTo(52, 65);
            context.stroke();
        case 3:
            // Right hand
            context.beginPath();
            context.moveTo(66, 55);
            context.lineTo(80, 65);
            context.stroke();
        case 2:
            // Body
            context.beginPath();
            context.moveTo(66, 49);
            context.lineTo(66, 85);
            context.stroke();
        case 1:
            // Head
            context.beginPath();
            context.arc(66, 41, 8, 0, 2 * Math.PI);
            context.stroke();
    }
}