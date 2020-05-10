window.onpageshow = function (event) {
    if (event.persisted) {
        window.location.reload();
    }
};

function removeGame() {
    let gameId = this.getAttribute("gameId")
    
    fetch('/api/shopping-cart/game', {
        method: 'DELETE',
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
                changeWindowLocation(res.redirectUrl)
            }
        })
}

var removeFromCartButtons = document.querySelectorAll('button[gameid]');
for (let i = 0; i < removeFromCartButtons.length; i++) {
    removeFromCartButtons[i].addEventListener('click', removeGame, false);
}


function removeAllGames() {
    fetch('/api/shopping-cart/games', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => {
            if (res.redirectUrl) {
                changeWindowLocation(res.redirectUrl)
            }
        })
}

var removeButton = document.getElementById("cleanCart")
if (removeButton) {
    removeButton.addEventListener('click', removeAllGames, false)
}


function buyGames() {
    fetch('/api/shopping-cart/games', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => {
            if (res.redirectUrl) {
                changeWindowLocation(res.redirectUrl)
            }
        })
}

var buttonBuyGames = document.getElementById("buyGames")
if (buttonBuyGames) {
    buttonBuyGames.addEventListener('click', buyGames, false)
}


function removeMessage() {
    document.getElementById("message").remove()
}

var buttonMessage = document.getElementById("dissmissMessage")
if (buttonMessage) {
    buttonMessage.addEventListener('click', removeMessage, false)
}








function changeWindowLocation(url) {
    if (window.location.href == url) {
        window.location.reload()
    } else {
        window.location.href = url
    }
}