function Foo() {
    getName = function() { alert(1) };
    return this;
}

Foo.getName = function() { alert(2) };
Foo.prototype.getName = function() {
    alert(3)
};

var getName = function() { alert(4) };

function getName() {
    alert(5);
}

Foo.getName(); // 2
getName(); // 4
Foo().getName(); //1
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3
new new Foo().getName(); // 3

/*
解析：
1. 首先变量提升：声明一个Foo函数，存储函数语句“getName = function() { alert(1) };return this;”；声明一个getName变量；
声明一个getName函数覆盖刚刚声明的getName变量，存入函数语句“alert(5);”；
2.在堆储存里找出一块地址，存入语句“alert(2)”，将其地址赋给Foo函数的getName属性；
3.堆储存里找出一块地址，存入语句“alert(3)”，将其地址赋给Foo的原型上的getName属性；
4.堆储存里找出一块地址，存入语句“alert(4)”，将其赋给全局的getName变量；

执行阶段：
1. Foo.getName(), 访问函数Foo的getName属性，弹出字符串2；
2. getName(), 执行全局的getName变量，弹出字符串4；
3. 执行Foo().getName(): getName = function() { alert(1) };return this; 
    3.1 函数内未定义getName，直接找到全局的getName，将其指向语句“alert(1)”
    3.2 返回this，这里在全局作用域下执行，this指向window，因此返回window
    3.3 也就是执行window下的getName属性指向的函数，即getName全部变量，弹出字符串1；
4. 执行getName()，同3.3 执行全局的getName，弹出字符串1；
5. 执行new Foo.getName():相当于普通函数执行，于是普通的执行Foo.getName()，同1，弹出字符串2；
6. 执行new Foo().getName()：
    6.1 先执行 new Foo(),创建一个Foo函数的实例，然后调用实例的getName方法，
    6.2 因为实例中并没有getName属性，因此会调用构造函数原型上的方法，因此弹出字符串3
7. 执行new new Foo().getName(); new运算符先执行右边的，再执行左边的（类似typeof运算符），因此相当于普通的执行new Foo().getName()，所以和6一样，弹出字符串3。
因此弹出的顺序是：2411233
*/