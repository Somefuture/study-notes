
/* 原型链继承
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

child2.getNumber(1); // 2
child.getNumber(1); // 2 方法可复用
*/

/* 构造函数继承
function Parent(name){
  this.name = name
  this.list = [1,2,3];
  this.getName = function(){
    console.log(this.name)
  }
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
*/

/* 组合继承
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
*/
/* 原型式继承 
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
*/
/* 寄生式继承
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
*/

/* 寄生组合继承

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

Child.prototype = Object.create(Parent.prototype) // 对父类原型进行复制，不会调用两次父类构造函数
Child.prototype.constructor = Child; // 修改prototype的constructor的指向

const child = new Child('child'); // 可以给父类传参
const otherChild = new Child('other')

child.getName(); // child
otherChild.getName(); // other

child.list[0] = 0;
console.log(child.list, otherChild.list); // [0,2,3] [1,2,3] 父类的引用属性不会被共享

child.getNumber(2); //3 父类的方法可以复用
 */

/* ES6 Class extends
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
*/

// 实现一个curry
function curry(fun) {
  return function temp(...args) {
    if (args.length >= fun.length) {
      fun.call(this, ...args)
    } else {
      return function(...rest){
        return temp(...args.concat(rest))
      }
    }
  }
}

function add(a,b,c){
  console.log(a+b+c);
}

const curryAdd = curry(add)
curryAdd(1,32)(3)