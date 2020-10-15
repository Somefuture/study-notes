
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

/* 构造函数继承 */
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
