
const ranks = []
const faceCards = ["Q", "K", "J", "A"]
const suits = ["H","S","D","C"]

for (let index=2;index<=9;index++) ranks.push(index)
ranks.push("T")
ranks.push(...faceCards) 


function init(){
    deck = []
}

function createDeck() {
    var deck = []
    suits.forEach((suit=>{
        ranks.forEach((rank)=>{
            deck.push(rank+suit)
        })
    }))

    return deck;
}


function shuffle(deck){
    for (var i=0;i<deck.length;i++){
        cardIndex1 = Math.floor(Math.random()*deck.length)
        cardIndex2 = Math.floor(Math.random()*deck.length)
        swap(deck, cardIndex1, cardIndex2)
    }

    return deck
}

function swap(deck, cardIndex1, cardIndex2){
    var temp = deck[cardIndex1]
    deck[cardIndex1] = deck[cardIndex2]
    deck[cardIndex2] = temp
}

function drawCards(n, deck){
    if (n <= 0 || n> 52) throw Error("Invalid Number of Cards Drawn")
    return deck.splice(0,n)
}

function computeValue(cards){
    let fixedValueCards = ["Q", "K", "J", "T"]
    value = 0
    aceCount = 0
    cards.forEach((card)=>{
        if (fixedValueCards.includes(card[0])) value += 10
        else if (card[0] == "A") aceCount += 1
        else value += parseInt(card[0]) 
    })

    while (aceCount > 0){
        if (value + 11 <= 21) value += 11
        else value += 1

        aceCount--
    }

    return value   
}


function decideWinner(val1, val2){
    if (val1 > 21) return "Player 2"
    if (val2 > 21) return "Player 1"
    if (val1 == val2) return "Tie"
    return val1 > val2 ? "Player 1" : "Player 2"
}

function pass(player, dealer, deck){
    while (computeValue(dealer) < 21) dealer.push(...drawCards(1, deck))
    return decideWinner(computeValue(player), computeValue(dealer))
}

function hit(player, deck){
    player.push(...drawCards(1,deck))
}

module.exports = {createDeck, shuffle, init, drawCards, computeValue, decideWinner, swap, pass, hit}

