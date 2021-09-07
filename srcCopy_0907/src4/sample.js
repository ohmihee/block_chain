// 코드는 위에서 아래로
let a = 1
let b = 2
let fn = () => {
    console.log('a')
}

function fn2(){
    console.log(b)
    // Object
}

let c = 10

let o = {
    a:1,
    b:2
}

console.log(a)  // 1
console.log(b)  // 2
console.log(fn,'a') //[Function: fn]   
                    // a
console.log(fn2)    //[Function" fn2]
console.log(c)      // 10
console.log(o)      // {a:1 ,b:2}
console.log(fn())  // undefined
fn()               // a


