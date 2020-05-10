function addGameToCart() {
    let gameId = this.getAttribute("gameId")
    fetch('/api/shopping-cart/game', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Id: gameId
        }),
    })
        .then(res => res.json())
        .then(res => {
            if (res.redirectUrl) {
                windowReload(res.redirectUrl)
            }
        })
}

var addToCartButtons = document.querySelectorAll('button[gameid]');
for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', addGameToCart, false);
}

function removeMessage() {
    document.getElementById("message").remove()
}

var buttonMessage = document.getElementById("dissmissMessage")
if (buttonMessage) {
    buttonMessage.addEventListener('click', removeMessage, false)
}

function windowReload(url) {
    if (window.location.href == url) {
        window.location.reload()
    } else {
        window.location.href = url
    }
}
