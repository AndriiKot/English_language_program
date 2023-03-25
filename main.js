console.log(`Text
 on 2 line`)

let a = 7;
console.log(`a = ${a}`);

console.log("Text\non 2 line " + a);
console.log(Math.random())              // 0.78............

console.log(Math.max(3,4,0,1,7,2))      // 7

console.log(Math.pow(16,0.5))           // 4
console.log(Math.pow(4,2))              // 16
console.log(Math.pow(3,3))              // 27

console.log(Math.sqrt(64))              // 8
console.log(Math.sqrt(25))              // 5
console.log(Math.sqrt(7))               // 2.654.............

console.log(Math.floor(3.9))            // 3
console.log(Math.ceil(3.1))             // 4
console.log(Math.round(3.5))            // 4
console.log(Math.round(3.1))            // 3
console.log(Math.trunc(3.9))            // 3
console.log(4.758.toFixed(2))           // 4.76 
console.log(typeof(4.5555.toFixed(2)))  // string

let b = "5"
console.log(b+5)                        // 55
console.log(typeof(b+5))                // string
console.log(+b+5)                       // 10
console.log(typeof(+b+5))               // number

function isNumber(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n-0)
}
function randomInteger(min,max){
  let rand = min + Math.rendom() * (max + 1 - min);
  return Math.floor(rand);
}


