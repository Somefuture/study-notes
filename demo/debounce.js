// 防抖：在时间被触发delay秒以后，再执行函数fun，如果再触发，则重新计时

// const debounce = function(fun, delay){
//   return function(...args) {
//     const _args = args
//     clearTimeout(fun.id)
//     fun.id = setTimeout(function(){
//       fun.call(this, ..._args)
//     }, delay)
//   }
// }

// // 节流：在规定的一个时间单位内，只能触发一次函数执行。如果在同一单位时间内被触发多次，只能有一次生效。

// function throttle(fun, gapTime){
//   let _lastTime = null;

//   return function(){
//     let _nowTime = +new Date();
//     if (_nowTime - _lastTime > gapTime || !_lastTime) {
//       fun();
//       _lastTime = _nowTime
//     }
//   }
// }

// let fn = (a)=>{
//   console.log(a)
// }

// const timer = setInterval(throttle(fn.bind(this, 'ssssssss'),1000),10)

// 统计正整数1 ~ n出现1的次数，暴力循环，数字过大的时候无法执行。

function findOne(n){
	let count = 0;
	for(let i=0;i<=n;i++){
		count+=String(i).split('').filter(item=>item==='1').length
	}
	return count;
}