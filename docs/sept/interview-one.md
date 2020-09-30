目录：
[[toc]]

> 面了某大厂同一个部门两个不同的岗位，第一个岗位三面挂了。第二个岗位估计二面挂了。一共是五轮技术面，以下是本人总结的一些面试题答案解析和面试心得。

# 输出代码结果篇

## 事件循环机制

1. 考察js事件循环机制，输出下面函数的执行结果：

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

    这道题出现的频率非常高，感觉基本上是面试必问的题。我一共参与了五轮技术面，被问了三次，还不懂的小伙伴，长点心把！

    答案如图所示：

    ![事件循环机制结果](/images/event-loop.jpg)

    在哔哩哔哩看到一个图文并茂的解读事件循环机制的视频，[传送门](https://www.bilibili.com/video/BV1kf4y1U7Ln/?spm_id_from=333.788.videocard.1)，小伙伴快去看吧！

    然后我的解析：
    ```s
    1. 创建函数async1，压入栈中
    2. 创建函数async2，压入栈中
    3. 执行console.log("script start"), 打印出 “script start”
    4. 调用setTimeOut函数，立即将console.log("setTimeout")语句加入任务队列中
    5. 执行async1函数console.log("async1 start");语句，打印出：async1 start
    6. 执行async2函数，打印出async2，async2函数被释放
    7. wait 后面的语句相当于promise中的.then,属于微任务，因此console.log('async1 end') 加入微任务队列中。async1执行完毕，被释放
    8. 执行new promise，打印出promise1，然后将.then中的函数加入微任务队列中
    9. 执行console.log('script end')。打印出script end。支持，执行栈已经被清空，接下来执行微任务队列
    10. 打印async1 end
    11. 打印出promise2
    12. 至此，微任务队列被清空，执行宏任务队列，打印 setTimeout
    ```

    事件循环机制的总结：<b>当前执行栈执行完毕时，会处理完所有的微任务，再去宏任务队列里取出一个事件执行。同一次事件循环中，微任务永远在宏任务之前执行</b>

2. 那么，新的题来了（本题是我想到的题），输出下面代码的执行结果：

    ```js
    setTimeout(function () {
        console.log("setTimeout1");
        new Promise(function (resolve) {
            console.log("promise1-1");
            resolve();
        }).then(function () {
            console.log("promise1-2");
        });
    },0);
    setTimeout(function () {
        console.log("setTimeout2");
        new Promise(function (resolve) {
            console.log("promise2-1");
            resolve();
        }).then(function () {
            console.log("promise2-2");
        });
    },0);
    ```

    在浏览器中和node版本v12+的执行结果：

    >setTimeout1
    >
    >promise1-1
    >
    >promise1-2
    >
    >setTimeout2
    >
    >promise2-1
    >
    >promise2-2

    但是在node版本v8.9.3 中的结果：

    >setTimeout1
    >
    >promise1-1
    >
    >setTimeout2
    >
    >promise1-2
    >
    >promise2-1
    >
    >promise2-2

    由此可见，在node版本12之前，它会在执行宏任务队列时，先把宏任务队列执行完毕，再去执行后面加入的微任务。但是在node12以后的版本，和Chrome浏览器中，一旦产生微任务，就会先把微任务执行完，再去执行宏任务。

3. 那么继续来吧，本题是面试中遇到的原题：

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
    输出的顺序是：23541。和第一道比其实简单很多，唯一有点歧义的就是在 i== 9999的时候，才执行resolve，但是这里都是同步任务，因此并不会造成什么影响。

    朋友们，宏任务与微任务，你懂了吗？

## 堆内存与闭包

1. 考察函数作用域和闭包，输出下面函数的执行结果：

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

    下面是我的解析：

    1. 变量提升：声明result、a、total 变量，并创建一个堆内存，存储函数foo；
    2. 在堆内存中创建一个空数组，并将地址指向result变量
    3. 在执行上下文中创建值3，将其赋给a；在执行上下文中创建值0，将其赋给total；
    4. 执行foo(1);

        创建一个函数作用域foo；
        * 变量提升，定义i；传入参数a= 1；创建值0，将值赋给i；
        * 执行for循环，i为0时，将匿名函数function() {total += i * a;console.log(total);}赋值给result[0],然后i自增，此时i为1
        * i为1，将匿名函数function() {total += i * a;console.log(total);}赋值给result[1],然后i自增，此时i为2
        * i为2，将匿名函数function() {total += i * a;console.log(total);}赋值给result[2],然后i自增，此时i为3。不满足循环条件，跳出循环
    5. 由于函数foo中的变量被赋给result中每项的匿名函数引用了，所以不能被释放。这样就形成了一个闭包。此时函数中的值：a为1，i为3；
    6. 执行result[0]:

        * total 未在当前函数内定义，向上一个作用域找，此时为全局的total，值为0；
        * i为闭包的foo中的i变量，为3；
        * a为闭包的foo中传过来的值，为1；
        * 因此 total = 0 + 3*1 = 3,打印出3
    
    7. 执行result[1]:
        * total 为全局变量total值为3，
        * i和a同上，为3和1
        * total = 3 + 1*3 = 6
        * 打印出6

    8. 执行result[2]:
        * total 为全局变量total值为6，
        * i和a同上，为3和1
        * total = 6 + 1*3 = 9
        * 打印出9
    
    朋友们，你们答对了吗？关于js运行堆栈内存和闭包这一块儿，推荐以下周老师的视频讲解，[传送门](https://www.bilibili.com/video/BV1U5411Y7k7?p=4),看完感觉理解了好多，希望对大家有帮助。

2. 继续，还是原题：

    ```js
    window.name = 'aaa';
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

    我的解析：
    * 老规矩，变量提升创建函数A
    * 创建字符串值'aaa',将这个值赋给window的name属性
    * 创建匿名函数1，将其地址赋给函数A的原型上的getA属性
    * 执行函数A,创建一个空对象aaa(我随便起的名字)，将函数中的this指向这个空对象,this.a = 123，没有设置返回值，所以new A() 最后返回这个对象，也就是将对象aaa的地址，赋给了块级变量a；
    * 创建变量funcA，因为a中没有getA属性，因此会去它的原型链上找，最后找到A的原型链上的getA，也就是匿名函数1的地址赋给funcA
    * 执行funcA，就是执行匿名函数1：return this.name + 1; 在全局中执行，此时this指向window，所以最后打印出来的结果是：aaa1

3. 原题again：

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
    解析：
    * 变量提升，声明变量length，函数fn，变量obj
    * 创建值10，将其赋给变量length；
    * 在堆内存中创建一个对象，属性length值为5，属性test1为一个匿名函数1；将这个对象的地址aaa赋给变量obj
    * 给obj新增一个test2的属性，且将函数fn的地址指给它
    * 执行obj.test1(),返回函数fn()的执行结果，fn执行时，返回this.length + 1 这里的this指向全局，因此这里打印的是 10 + 1 = 11，打印11；
    * 执行函数fn() 和函数obj.test2(),并比较它们的值。执行函数fn，这里的this指向全局，因此是10+1 = 11；执行函数obj.test2(),返回this.length + 1,但是此时的this指向调用方法的主体obj，因此这里length的值为6.打印结果为false。

好了。本次真题分享+解析到此就结束了，希望对大家有所帮助。
喜欢的点个关注吧！我还会继续更新的~