---
title: 继承与原型链
---
目录：
[[toc]]

## 原型链的概念

每一个实例对象(object) 都有一个私有属性（`__proto__`）指向它的构造函数的原型对象（`prototype`）。该原型对象也有一个自己的原型对象（`__proto__`），层层向上直到一个对象的原型对象为null。根据定义，null没有原型，并作为这个原型链中的最后一个环节。

## 基于原型链的继承

### 继承属性

js对象有一个指向一个原型对象的链。当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象原型的原型，一次层层向上搜索，直到找到一个名字匹配的属性或者到达原型链的末尾。

```js
// we create a function
let f = function() {
  this.a = 1;
  this.b = 2;
}
// and it is like this:
function f() {
  this.a=1;
  this.b=2;
}
// create a object o
let o = new f() // {a: 1, b:2}

// define some properties in function f
f.prototype.b = 3;
f.prototype.c = 4;

// 综上 整个原型链：{a:1, b:2}--->{b:3, c:4}--->Object.prototype---->null
o.a // 1
o.b // 2
o.c // 4
o.d // undefined
```

### 继承方法

函数的继承和属性的继承没有区别，唯一需要注意的就是：当继承的函数被调用时，this指向的时当前继承的对象，而不是继承的函数所在的原型对象

```js
var o = {
  a:2,
  m: function(){
    return this.a + 1
  }
}
console.log(o.m()); // 3 当调用o.m时，this指向o

var p = Object.create(o);
// p 是一个继承自o的对象

p.a = 4; // 创建p的自身属性‘a’
console.log(p.m()); // 5
// 调用 p.m 时，'this' 指向了 p
// 又因为 p 继承了 o 的 m 函数
// 所以，此时的 'this.a' 即 p.a，就是 p 的自身属性 'a'
```

### 总结

1. 所有的对象的`__proto__`都指向`Object.prototype`
2. 所有构造函数创建的实例对象的`__proto__`，都指向它的构造函数的`prototype`
3. 所有构造函数的`__proto__`，都指向`Function.prototype`
4. `Function.prototype.__proto__`指向`Object.prototype`
5. `Object.prototype`的`__proto__` 为null

```js
  function Fun() {
    this.funName = 'fun';
  }
  const fun = new Fun(); // 创建Fun构造函数的实例fun
  console.log(fun.__proto__ === Fun.prototype) // true
  console.log(Fun.__proto__ === Function.prototype) // true
  console.log(Function.__proto__ === Function.prototype) // true
  console.log(Function.prototype.__proto__ === Object.prototype) // true

  const obj = {};
  console.log(obj.__proto__ === Object.prototype) // true
  console.log(Object.__proto__ === Function.prototype) // true
  console.log(Object.prototype.__proto__) // null
```

### 实现继承

1. 用Js实现多重继承

    ```js
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

      // 就很奇怪，哎，打算好好把红宝书相关的部分看一看

      function S() {
          const m1 = new M1()
          const m2 = new M2()
          const obj = Object.assign({}, m1, m2)
          obj.__proto__ = Object.assign({}, M1.prototype, M2.prototype)
          return obj
      }
      function S() {
          M1.call(this)
          M2.call(this)
      }
      // 为S的prototype 提供M1的Prototype的__proto__
      S.prototype = Object.create(M1.prototype);
      // 混合其它的prototype
      Object.assign(S.prototype, M2.prototype);
      // 重新指定constructor
      S.prototype.constructor = S;
      console.log(s.hello) // hello
      console.log(s.world) // world
      s.m1() // fun m1
      s.m2() // fun m2
    ```

### Object.create

1. 如上面的例子，使用Object.create 实现类式继承

2. 使用Object.create 的propertyObject 参数

    ```js
    var o；

    // 创建一个原型为null的空对象
    o = Object.create(null);

    // 以字面量形式创建一个空对象
    o = {}
    // 实际上等价于
    o = Object.create(Object.prototype);

    o = Object.create(Object.prototype, {
      foo: {
        writable:true,
        configurable:true,
        value: "hello"
      },
      // bar会成为所创建对象的访问器属性
      bar: {
        configurable: false,
        get: function() { return 10 },
        set: function(value) {
          console.log("Setting `o.bar` to", value);
        }
      }
    })
    ```

3. 实现一个Object.create()

  ```js
  if (typeof Object.create !== "function") {
    Object.create = function (proto, propertiesObject) {
        if (typeof proto !== 'object' && typeof proto !== 'function') {
            throw new TypeError('Object prototype may only be an Object: ' + proto);
        } else if (proto === null) {
            throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
        }

        if (typeof propertiesObject !== 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");

        function F() {}
        F.prototype = proto;

        return new F();
    };
  }
  ```
