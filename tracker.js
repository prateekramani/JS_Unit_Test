
var balance = 0;
var transactions = []

function init(){
    balance = 0
    transactions = []
}

function createTransaction(amount, date){
    date = new Date(date)
    if (balance + amount < 0) throw Error("Balance cannot be negative")
    
    if (transactions.length > 0){
        lastDate = transactions[transactions.length-1].date
        if (date < lastDate)
            throw Error("Older Transaction Cannot be Inserted")
    }
    balance += amount
    transactions.push({amount, date})
    return {amount, date}
}

function getTransactions(){
    return [...transactions]
}

function clearTransactions(){
    transactions.length = 0;
}

function getBalance() {
    return balance
}



module.exports = {init, createTransaction, getBalance, getTransactions, clearTransactions}
