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

### 扩展原型链的方法

#### New-initialization

  ```js
  function foo(){}
  foo.prototype = {
    foo_prop: 'foo val'
  };
  function bar(){}
  var proto = new foo;
  proto.bar_prop = 'bar val';
  bar.prototype = proto;
  var inst = new bar;
  console.log(inst.foo_prop); // foo val
  console.log(inst.bar_prop); // bar val
  ```

  优势：支持目前所有的浏览器。这种方法非常快，且符合标准，并且充分利用JIT优化（JIT优化：just in time 编译器，被大多数的浏览器引入。[相关阅读](https://github.com/cnsnake11/blog/blob/master/%E5%85%B6%E5%AE%83/WebAssembly(2-2)A%20crash%20course%20in%20just-in-time%20(JIT)%20compilers.md)）。

  缺陷：使用这个方法进行拓展的时候，必须对相关函数进行初始化。在初始化过程中，可能会将一些不需要的方法放在对象上。初始化只生成一次，可能会带来问题。

#### 使用Object.create

  ```js
  function foo(){}
  foo.prototype = {
    foo_prop: 'foo val'
  };
  function bar(){}
  var proto = Object.create(foo.prototype);
  proto.bar_prop = 'bar val';
  bar.prototype = proto;
  var inst = new bar;
  console.log(inst.foo_prop); // foo val
  console.log(inst.bar_prop); // bar val

  // 或者直接在Object.create 的第二个参数中添加
  function foo(){}
  foo.prototype = {
    foo_prop: "foo val"
  };
  function bar(){}
  var proto = Object.create(
    foo.prototype,
    {
      bar_prop: {
        value: 'bar val'
      }
    }
  );
  bar.prototype = proto;
  var inst = new bar;
  console.log(inst.foo_prop); // foo val
  console.log(inst.bar_prop); // bar val
  ```

  优势：支持当前所有非微软版本或者IE9版本以上的浏览器，允许一次性的直接设置__proto__属性，以便浏览器能更好的优化对象。同时允许通过Object.create(null) 来创建一个没有原型的对象。

  缺陷： 不支持IE8以下的版本；慢对象初始化即Object.create 在加载到的时候就会进行初始化，因此，如果第二个参数过大的话，可能会造成严重的性能问题。

#### Object.setPrototypeOf

  ```js

  function foo(){}
  foo.prototype = {
    foo_prop: "foo val"
  };
  function bar(){}
  var proto = {
    bar_prop: "bar val"
  };
  Object.setPrototypeOf(
    proto, foo.prototype
  );
  bar.prototype = proto;
  var inst = new bar;
  console.log(inst.foo_prop);
  console.log(inst.bar_prop);

  ```

  优点：支持所有现代浏览器和IE9+浏览器。允许动态操作对象的原型，甚至能强制给Object.create(null)创建出来的没有原型的对象添加一个原型

  缺陷：很多浏览器优化了原型，尝试在调用实例之前猜测方法在内存中的位置，但是这种动态设置原型干扰了所有的优化，甚至可能使浏览器为了运行成功，使用完全未经优化的代码进行重新编译，会极大的影响js的运行效率。

#### __proto__

  ```js
  var inst = {
    __proto__: {
      bar_prop: "bar val",
      __proto__: {
        foo_prop: "foo val",
        __proto__: Object.prototype
      }
    }
  };
  console.log(inst.foo_prop);
  console.log(inst.bar_prop)
  ```

  优点：支持所有现代浏览器以及IE11以上版本的浏览器。将__proto__设置为非对象的值会静默失败，并不会抛出错误。

  缺陷：该方法不具备性能可言，和setPrototypeOf一样，对浏览器运行优化不友好

### 用Js实现多重继承

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
    /* 我一开始的写法
    function S() {
        const m1 = new M1()
        const m2 = new M2()
        const obj = Object.assign({}, m1, m2)
        obj.__proto__ = Object.assign({}, M1.prototype, M2.prototype)
        return obj
    }
    */
    // 查阅相关资料的写法
    function S() {
        M1.call(this)
        M2.call(this)
    }
    // 将M1的prototype 赋给S
    S.prototype = Object.create(M1.prototype);
    // 混合M2的prototype
    Object.assign(S.prototype, M2.prototype);
    // 重新指定constructor
    S.prototype.constructor = S;
    console.log(s.hello) // hello
    console.log(s.world) // world
    s.m1() // fun m1
    s.m2() // fun m2
  ```

### 实现继承的一些方法

![关于继承](/images/extend.png)

#### 原型链继承

核心：将父类的实例作为子类的原型

```js
function Parent(name){
  this.name = name
  this.list = [1,2,3]
}
Parent.prototype.getNumber = function(index){
  console.log(this.list[index])
}

function Child(){}
Child.prototype = new Parent();
Child.prototype.constructor = Child;

const child = new Child()
console.log(child.name) // undefined 无法传参
console.log(child.list) // [1,2,3]
child.list[0] = 4

const child2 = new Child()
console.log(child2.list) // [4,2,3] 引用类型被共享了

child1.getNumber(1); // 2
child.getNumber(1); // 2 方法可复用
```

优点： 父类的方法可以复用

缺点：

  1. 父类的引用属性会被所有子类实例共享
  2. 子类构建实例时不能向父类传递参数

#### 构造函数继承

核心：将父类构造函数的内容复制给了子类的构造函数。这是所有继承中唯一一个不涉及到prototype的继承。

```js
function Parent(name){
  this.name = name
  this.list = [1,2,3]
}
Parent.prototype.getNumber = function(index){
  console.log(this.list[index])
}

function Child(name){
  Parent.call(this, name)
}

const child = new Child('child-one'); //子类构建实例时可以向父类传参数
const child2 = new Child('child-two');
const parent = new Parent('parent');
child.getName(); // child-one
child2.getName(); // child-two

console.log(child.list, child2.list) // [1,2,3] [1,2,3]
child.list[0] = 0;
console.log(child.list, child2.list) // [0,2,3] [1,2,3]引用属性不会被共享

parent.getNumber(2); // 3
child.getNumber(1); // Uncaught TypeError: child.getNumber is not a function 父类的方法不能复用

```

优点：

  1. 父类的引用属性不会被共享
  2. 子类构建实例时可以向父类传递参数

缺点：父类的方法无法被复用

#### 组合继承

核心：原型式继承和构造函数继承的组合，兼具了二者的优点。

```js
function Parent(name){
  this.name = name;
  this.list = [1,2,3];
  this.getName = function(){
    console.log(this.name);
  }
}
Parent.prototype.getNumber = function(index){
  console.log(this.list[index]);
}

function Child(name){
  Parent.call(this, name); // 将父类函数内容复制过来
}

Child.prototype = new Parent(); // 将父类实例作为子类的原型
Child.prototype.constructor = Child;

const child = new Child('child'); // 可以给父类传参
const otherChild = new Child('other')

child.getName(); // child
otherChild.getName(); // other

child.list[0] = 0;
console.log(child.list, otherChild.list); // [0,2,3] [1,2,3] 父类的引用属性不会被共享

child.getNumber(2); //3 父类的方法可以复用
```

优点：

  1. 父类的方法可以被复用
  2. 父类的引用属性不会被共享
  3. 子类构建实例时可以向父类传递参数

缺点：

  调用了两次父类的构造函数，第一次给子类的原型添加了name、list、getName等属性，第二次又给子类的构造函数添加了父类的name、list、getName属性，从而覆盖了子类原型中的同名参数。这种被覆盖的情况造成了性能上的浪费

#### 原型式继承

核心： 原型式继承的object方法本质上是对参数对象的一个浅复制。ES5通过新增Object.create()方法规范化了原型式继承。

```js
const Parent = {
  name: 'Bob',
  list: [1,2,3],
  getName(){
    console.log(this.name)
  }
};

const child = Object.create(Parent)
const child2 = Object.create(Parent)

child.getName(); // BOb 子类可以复用父类的方法和属性
child.list[0] = 0;

console.log(child.list, child2.list); // [0,2,3] [0,2,3] 子类共享父类的引用属性
```

优点：父类方法可以复用

缺点：

  1. 子类构建实例时无法传参
  2. 父类引用属性会被所有子类实例共享

#### 寄生式继承

核心：使用原型式继承获得一个目标对象的浅复制，然后增强这个浅复制的能力

```js
const Parent = {
  name: 'Bob',
  list: [1,2,3],
  getName(){
    console.log(this.name)
  }
};

const child = Object.create(Parent, {
  // 通过第二个参数，给实例增加一个方法
  getNumber: {
    value: function(index) {
      console.log(this.list[index])
    }
  }
})

child.getNumber(0) //1
```

优缺点：一种思路。可根据实际需求选择；

#### 寄生组合继承

核心：解决了组合继承中会两次调用父类的构造函数造成浪费的缺点。

```js
function Parent(name){
  this.name = name;
  this.list = [1,2,3];
  this.getName = function(){
    console.log(this.name);
  }
}
Parent.prototype.getNumber = function(index){
  console.log(this.list[index]);
}

// 实现寄生组合继承的代码 start
function Child(name){
  Parent.call(this, name); // 将父类函数内容复制过来
}

Child.prototype = Object.create(Parent.prototype) // 对父类原型进行复制，不会调用两次父类构造函数
Child.prototype.constructor = Child; // 修改prototype的constructor的指向

// 实现寄生组合继承的代码 end

const child = new Child('child'); // 可以给父类传参
const otherChild = new Child('other')

child.getName(); // child
otherChild.getName(); // other

child.list[0] = 0;
console.log(child.list, otherChild.list); // [0,2,3] [1,2,3] 父类的引用属性不会被共享

child.getNumber(2); //3 父类的方法可以复用
```

优缺点：这是一种完美的继承方式

#### ES6 Class extends

核心：ES6继承的结果和寄生组合继承相似，本质上，ES6继承是一种语法糖。但是寄生组合继承是先创建子类实例this对象，然后再对其进行增强；而ES6继承是先将父类实例对象的属性和方法加到this上面（所以必须先调用super方法，然后再用子类的构造函数修改this）。

```js
class Parent{
  constructor(name) {
    this.name = name
    this.list = [1,2,3]
  }
  // method
  getName() {
    console.log(this.name)
  }
  getNumber(index){
    console.log(this.list[index])
  }
}
const parent = new Parent('bob');
console.log(parent.name); //bob

class Child extends Parent{
  constructor(name){
    super(name) //调用超类构造函数并传入name参数
  }
  getChildName() {
    console.log(this.name)
  }
}

const child = new Child('mike');
child.getName(); // mike
child.list[0] = 0;
console.log(parent.list); // [1,2,3]
```

## 参考

- [1] [一篇文章理解JS继承——原型链/构造函数/组合/原型式/寄生式/寄生组合/Class extends](https://segmentfault.com/a/1190000015727237)
- [2] [js继承、构造函数继承、原型链继承、组合继承、组合继承优化、寄生组合继承](https://segmentfault.com/a/1190000015216289)
