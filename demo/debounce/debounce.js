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

// function findOne(n){
// 	let count = 0;
// 	for(let i=0;i<=n;i++){
// 		count+=String(i).split('').filter(item=>item==='1').length
// 	}
// 	return count;
// }

// 节流

const throttle = (fun, delay) => {
	// 节流的概念 技能CD,在cd时间内，你怎么按技能都没用，只有cd时间过了才会有效。
	let last = null;
	return function(...args) {
		const that = this;
		let now = + new Date();
		if (!last || now - last > delay) {
			fun.call(that, ...args);
			last = now
		}
	}
}

let timeee = null

const func = () => {
	console.log(new Date().toTimeString())
}

const funAfter = throttle(func, 3000)
timeee = setInterval(funAfter, 20)

// 防抖

const debounce = (fun, delay) => {
	// 防抖的概念 按技能后有一个命中时间，在这个技能时间到达之前，重新按技能，就会重新计时，一直到到达时间过了之后，技能才会生效。
	return function(...args) {
		const that = this;
		clearTimeout(fun.id);
		fun.id = setTimeout(() => {
			fun.call(that, ...args);
		}, delay)
	}
}

function ajax(content) {
  console.log('ajax request ' + content)
}
let inputb = document.getElementById('debounce')

let debounceAjax = debounce(ajax, 3000)

inputb.addEventListener('keyup', function (e) {
    debounceAjax(e.target.value)
})