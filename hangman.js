var word = ''

function getRandomWord() {
    fetch('https://random-word-api.herokuapp.com/word?number=1')
        .then(response => response.json())
        .then(data => {
            word = data[0]
            console.log(word)
            displaySecret()
        })
}

function displaySecret() {
    let secret = word.charAt(0)
    for(let i = 1; i < word.length - 1; i++) {
        secret += ' _ '
    }
    secret += word.charAt(word.length-1)
    document.getElementById("secret-word").innerHTML = '<h1>' + secret + '</h1>'
}