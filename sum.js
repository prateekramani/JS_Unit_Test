function sum(a,b) {
    return a + b;
}

function substract(...args) {

    if (arguments.length !== 2) {
    throw new Error("substract function requires exactly two arguments");
    }
    a = args[0];
    b = args[1];
    return a - b;
}



function promiseReturningFunction(){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res("This is a promise");
        }, 2000)
})
}


module.exports = {sum , substract, promiseReturningFunction};
