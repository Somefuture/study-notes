## 一面

1. 进程和线程？

2. http缓存策略？

3. https

4. cdn

5. 下面函数的执行结果
```js
async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
}
async function async2() {
    console.log( 'async2');
}
console.log("script start");
setTimeout(function () {
    console.log("setTimeout");
},0);
async1();
new Promise(function (resolve) {
    console.log("promise1");
    resolve();
}).then(function () {
    console.log("promise2");
});
console.log('script end');
```
6. 下面函数的执行结果
```js
var result = [];
var a = 3;
var total = 0;
function foo(a) {
    var i = 0;
    for (; i < 3; i++) {
        result[i] = function() {
            total += i * a;
            console.log(total);
        }
    }
}

foo(1);
result[0]();
result[1]();
result[2]();
```

6. csrf

7. 打印二叉树的所有路径

node: { left: node, right: node, name: string }
function print(root) {
    // 打印所有的路径
}
    1
2        3
4 5    6 7

124，125，136，137



## 二面
1. 实现一个repeat方法，要求如下：
需要实现的函数repeat，使下面调用代码能正常工作
const repeatFunc = repeat(console.log, 4, 3000);
repeatFunc("hellworld");//会输出4次 helloworld, 每次间隔3秒

2. 
```js
// 下面代码输出的结果是什么？
var length = 10;
function fn() {
 return this.length+1;
}
var obj = {
 length: 5,
 test1: function() {
  return fn();
 }
};
obj.test2=fn;
//下面代码输出是什么
console.log(obj.test1())
console.log(fn()===obj.test2())
```

3. 标题：用Js实现多重继承
```js
function M1() {
  this.hello = 'hello';
}
M1.prototype.m1 = ()=>{}
function M2() {
  this.world = 'world';
}
M2.prototype.m2 = ()=>{}

function S() {
    
}
let s =  new S()
s.hello
s.world
s.m1()
s.m2()
```
4. 如何用原生JS实现数字的货币格式化，例如数字6123456789格式化后为6,123,456,789，不低于两种方法。

## 另一个的一面
1. 判断为数组类型的方法
2. call apply bind的区别
3. 
```js
window.name = 'ByteDance';
function A() {
    this.name = 123;
}
A.prototype.getA = function () {
    return this.name + 1;
}
let a = new A();
let funcA = a.getA;
console.log(funcA()); 
```
4. 
```js
setTimeout(function () {
    console.log(1)
}, 0);
new Promise(function executor(resolve) {
    console.log(2);
    for (var i = 0; i < 10000; i++) {
        i == 9999 && resolve();
    }
    console.log(3);
}).then(function () {
    console.log(4);
});
console.log(5);
```
5. requestAnimationframe \ setTimeout有了解吗，有什么区别
6. 手写节流函数的实现
7. const add = (a, b, c) => {
    return a + b + c;
};

const curry = (fn) => {
    ...
};
const sum = curry(add);
console.log(sum(1)(2)(3));
8. https  http 的区别
9. 有一个栅栏，它有 n 个柱子，现在要给柱子染色，有 k 种颜色可以染。
必须保证不存在超过2个相邻的柱子颜色相同，求有多少种染色方案