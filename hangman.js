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
}

function displayLetters() {
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    let letters = ''
    alphabet.forEach(ch => {
        let disabled = ''
        if(gameOver || wrong.includes(ch) || correct.includes(ch)) {
            disabled = 'disabled'
        }
        letters += "<button onclick='playLetter(" + ch.charCodeAt(0) + ")' "
                + disabled + ">" + ch + "</button> "
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
            ch = word.charAt(i)
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
}