

const {getBalance, getTransactions, createTransaction, clearTransactions, init} = require("./financeTracker")

describe("Testing the finance Tracker" , ()=>{
    beforeEach(()=>{
        init()
    })


    test("Create Txn", ()=>{
        txn = createTransaction(100,"02/04/2026")
        expect(txn).toEqual({amount:100, date:new Date("02/04/2026")})
        expect(txn).toHaveProperty("amount")
        expect(txn).toHaveProperty("date")
    })


    test("Create Multiple Transaction", ()=>{
        createTransaction(100,"02/04/2026")
        createTransaction(200,"02/04/2026")
        createTransaction(300,"02/04/2026")
        var txns = getTransactions()
        expect(txns).toHaveLength(3)
        expect(txns).toContainEqual({amount: 100, date:new Date("02/04/2026")})
        expect(txns).toContainEqual({amount: 200, date:new Date("02/04/2026")})
        expect(txns).toContainEqual({amount: 300, date:new Date("02/04/2026")})
    })

    test("Clearing Transactions", ()=>{
        createTransaction(100,"02/04/2026")
        createTransaction(200,"02/04/2026")
        var txns = getTransactions()
        expect(txns).toHaveLength(2)
        clearTransactions()
        txns = getTransactions()
        expect(txns).not.toContainEqual({amount: 100, date:new Date("02/04/2026")})
        expect(txns).toHaveLength(0)
    })

    test("get balance", ()=>{
        createTransaction(100,"02/04/2026")
        createTransaction(200,"02/04/2026")
        var balance = getBalance()
        expect(balance).toBe(300)
    })

    test.each([[100,"02/04/2026",100],[200,"02/04/2026",200],[300,"02/04/2026",300]])("Testing Parametirized Balance", (amount,date,expectedBalance)=>{
        var txn = createTransaction(amount, date)
        expect(txn).toHaveProperty("amount")
        expect(txn).toHaveProperty("date")
        expect(txn).toEqual({amount:amount, date: new Date(date)})
        expect(getBalance()).toBe(expectedBalance)

    })

    test("invalid txn, negative balance", ()=>{
        createTransaction(100,"02/04/2026")
        
        var balance = getBalance()
        expect(balance).toBe(100)
        
        txns = getTransactions()
        expect(txns).toHaveLength(1)

        expect(()=>createTransaction(-101,"02/04/2026")).toThrow(Error)
        expect(()=>createTransaction(-101,"02/04/2026")).toThrow("Balance cannot be negative")
    })


    test("Older Txn", ()=>{
        createTransaction(100,"02/04/2026")
        txns = getTransactions()
        expect(txns).toHaveLength(1)

        expect(()=> createTransaction(100,"02/03/2026")).toThrow(Error)
    })


    

    // test.each([[100,"02/04/2026"],[200,"02/04/2026"],[300,"02/04/2026"]])("Testing Multiple")
})



