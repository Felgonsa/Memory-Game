const FRONT = "front"
const BACK = "back"
const CARD = "card"
const ICON = "icon"

startGame()

function startGame() {
    cards = game.createCard()

    inicializateCards(game.cards)

}

function inicializateCards(cards) {
    let board = document.getElementById("board")
    board.innerHTML = ""

    game.cards.forEach(card => {
        let cardElement = document.createElement("div")

        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)


        cardElement.addEventListener("click", flip)
        board.appendChild(cardElement)
    })

}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement("div")
    cardElementFace.classList.add(face)

    if (face === FRONT) {
        let iconFront = document.createElement("img")
        iconFront.classList.add(ICON)
        iconFront.src = "./assets/images/" + card.icon + ".png"
        cardElementFace.appendChild(iconFront)

    } else {
        let iconBack = document.createElement("img")
        iconBack.classList.add(ICON)
        iconBack.src = "./assets/images/csgo.png"
        cardElementFace.appendChild(iconBack)
    }

    element.appendChild(cardElementFace)

}

function flip() {

    if (game.setCard(this.id)) {
        this.classList.add("flip")
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards()
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById("gameOver")

                    gameOverLayer.style.display = "flex"
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)

                    firstCardView.classList.remove("flip")
                    secondCardView.classList.remove("flip")
                    game.unflipCards()
                }, 1000)
            }
        }
    }
    this.classList.add("flip")
}

function restart() {
    game.clearCards()
    startGame()
    let gameOverLayer = document.getElementById("gameOver")
    gameOverLayer.style.display = "none"
}