// setTimeout(function() {
//     console.log("setTimeout1");
//     new Promise(function(resolve) {
//         console.log("promise1-1");
//         resolve();
//     }).then(function() {
//         console.log("promise1-2");
//     });
// }, 0);
// setTimeout(function() {
//     console.log("setTimeout2");
//     new Promise(function(resolve) {
//         console.log("promise2-1");
//         resolve();
//     }).then(function() {
//         console.log("promise2-2");
//     });
// }, 0);

// function repeat(fun, times, delay) {
//     const wait = delay => new Promise(resolve => setTimeout(resolve, delay)) // 实现一个wait函数
//     return async function(...args) {
//         while (times > 0) {
//             fun(...args, times)
//             await wait(delay)
//             times--
//         }
//     }
// }
// const repeatFunc = repeat(console.log, 4, 3000);
// repeatFunc("hellworld");

//实现数字的货币格式化123456 => 123,456
// const currencyFormat = (num) => {
//     let str = num.toString()
//     let length = str.length
//     let formatStr = ''
//     while (length > 3) {
//         length = length - 3
//         formatStr = str.substr(length, 3) + (formatStr ? ',' + formatStr : '')
//     }
//     formatStr = str.substr(0, length) + (formatStr ? ',' + formatStr : '')
//     return formatStr
// }
// console.log(currencyFormat(1234567))

// js实现多重继承

function M1() {
    this.hello = 'hello';
  }
  M1.prototype.m1 = ()=>{
      console.log('fun m1')
  }
  function M2() {
    this.world = 'world';
  }
  M2.prototype.m2 = ()=>{
    console.log('fun m2')
  }

  function S() {
      const m1 = new M1()
      const m2 = new M2()
      const obj = Object.assign({}, m1, m2)
      obj.__proto__ = Object.assign({}, M1.prototype, M2.prototype)
      return obj
  }
  let s =  new S()
  console.log(s.hello)
  console.log(s.world)
  s.m1()
  s.m2()