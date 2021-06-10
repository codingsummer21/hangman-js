var word = ''
var wrong = []
var correct = []
var currentLetter = ' '

function getRandomWord() {
    fetch('https://random-word-api.herokuapp.com/word?number=1')
        .then(response => response.json())
        .then(data => {
            word = data[0]
            console.log(word)
            displaySecret()
            displayLetters()
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
}

function displayLetters() {
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    let letters = ''
    alphabet.forEach(ch => {
        letters += "<button onclick='playLetter(" + ch.charCodeAt(0) + ")'>" + ch + "</button> "
    })
    document.getElementById("letters").innerHTML = letters
}

function playLetter(ch) {
    let letter = String.fromCharCode(ch)
    if(word.includes(letter)) {
        correct.push(letter)
        displaySecret()
    }
    else {
        wrong.push(letter)
    }
}