// promise是一个类，因此我们用es6的calss方法来生成
class MyPromise{
  // 需要一个executor执行函数
  constructor(executor){
    // 初始化state 为等待状态
    this.state = 'pending';
    // 初始化成功的值
    this.value = undefined;
    // 初始化失败的原因
    this.reason = undefined;
    // 成功存放的数组
    this.onResolvedCallbacks = [];
    // 失败存放的数组
    this.onRejectedCallbacks = [];

    // 成功调用的函数
    let resolve = value => {
      // 在等待状态时处理
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        // 一旦resolve执行，调用成功数组的函数
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    // 失败调用的函数
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        // 一旦reject执行，调用失败数组的函数
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }
    
    // 如果excutor执行报错，就直接执行reject
    try{
      executor(resolve, reject);
    }catch(err){
      reject(err);
    }
  }

  // then 方法，接收两个参数：onFulfilled,onRejected
  then(onFulfilled, onRejected) {
    // 当状态为fulfilled时 传入成功的值
    if (this.state === 'fulfilled') {
      onFulfilled(this.value)
    }

    // 当状态为rejected时，传入失败的原因
    if(this.state === 'rejected') {
      onRejected(this.reason)
    }

    // 当状态state为pending时
    if (this.state === 'pending') {
      // onFulfilled传入到成功数组
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)
      })

      // onRejected传入到失败数组
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}

// 创建一个promise实例
new MyPromise((resolve, reject) => {
  console.log('promise start')
  resolve(500)
  reject('test reject')
}).then(
  res => {
    console.log(res)
  }, 
  err => {
    console.log(err)
  }
)