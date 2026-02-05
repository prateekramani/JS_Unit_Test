
const { createDeck, shuffle, init , drawCards, computeValue, decideWinner, swap, pass, hit} = require("./blackjackadv.js")

describe("Test black jack", () => {

    beforeEach(()=>{
        init()
    })

    test("swap", ()=>{
        arr = [1,2]
        swap(arr,0,1)
        expect(arr).toEqual([2,1])
    })

    test("Create Deck", () => {
        deck = createDeck()
        expect(deck).toHaveLength(52)
        expect(deck).toContainEqual("AS")
        expect(["AC", "JD", "QH"].every((card) => deck.includes(card))).toBeTruthy()
    })

    test("Shuffle the Deck", () => {
        deck = createDeck()
        shuffledDeck = shuffle([...deck])
        expect(deck).toHaveLength(52)
        expect(shuffledDeck).toHaveLength(52)
        expect(shuffledDeck).not.toBe(deck)
        expect(shuffledDeck).not.toEqual(deck)
    })


    test("Shuffle the Deck by Mocking", ()=>{
        jest.spyOn(global.Math, "random").mockReturnValueOnce(.1).mockReturnValueOnce(.9).mockReturnValue(0) // 5,46
        deck1 = createDeck()
        shuffle(deck1)

        deck2 = createDeck()
        swap(deck2, 5, 46)
        expect(deck1).toEqual(deck2)
    })

    test("Draw Cards", ()=>{
        deck = createDeck()
        shuffledDeck = shuffle(deck)
        cards = drawCards(2, deck)
        expect(cards).toHaveLength(2)
    })

    test("Draw Invalid Cards", ()=>{
        deck = createDeck()
        shuffledDeck = shuffle(deck)
        
        expect(()=>drawCards(0)).toThrow(Error)
        expect(()=>drawCards(53)).toThrow("Invalid Number of Cards Drawn")
    })

    test("compute Value", ()=>{
        expect(computeValue(["AS", "AD"])).toBe(12)
        expect(computeValue(["1S", "4D"])).toBe(5)
        expect(computeValue(["AS", "JD"])).toBe(21)
    })

    test("Decide the winner", ()=>{
        winner = decideWinner(22,17)
        expect(winner).toBe("Player 2")
    })

    test.each([[22,17,"Player 2"], [17,22,"Player 1"], [19,17, "Player 1"],[19,19,"Tie"]])("Check Winners", 
        (val1, val2, expectedWinner)=>{
            winner = decideWinner(val1, val2)
            expect(winner).toBe(expectedWinner) 
    })


    test("end to end game", ()=>{
        jest.spyOn(global.Math, "random").mockReturnValue(0.1)
        deck = createDeck()
        console.log(shuffle(deck))
        playerHand = drawCards(3, deck)
        opponentHand = drawCards(2, deck)
        expect(decideWinner(computeValue(playerHand),computeValue(opponentHand))).toBe("Player 2")
    })


    test("player hit pass", ()=>{
        jest.spyOn(global.Math, "random").mockReturnValue(0)
        deck = createDeck()
        shuffle(deck)
        playerHand = drawCards(2,deck) // 2 3
        dealerHand = drawCards(2,deck) // 4,5, 6, 7

        winner = pass(playerHand, dealerHand, deck)
        expect(playerHand).toHaveLength(2)
        expect(dealerHand).toHaveLength(4)
        expect(winner).toBe("Player 1")

    })
    
    test("player hits", ()=>{
        jest.spyOn(global.Math, "random").mockReturnValue(0)
        deck = createDeck()
        shuffle(deck)
        playerHand = drawCards(2,deck) // 2 3, 6, 7
        dealerHand = drawCards(2,deck) // 4,5,

        hit(playerHand, deck)
        hit(playerHand, deck)

        expect(dealerHand).toHaveLength(2)
        expect(playerHand).toHaveLength(4)
        winner = decideWinner(computeValue(playerHand), computeValue(dealerHand))
        expect(winner).toBe("Player 1")
    })

    

})


