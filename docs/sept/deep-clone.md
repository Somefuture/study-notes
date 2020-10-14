---
title: 解析lodash 深拷贝函数
---
目录：
[[toc]]

### 深拷贝与浅拷贝的含义

浅拷贝：对基本数据类型进行值传递，对引用数据类型进行引用地址的拷贝

深拷贝：对基本数据类型进行值传递，对引用数据类型，创建一个新的对象，并复制其内容，此为深拷贝

### 走进lodash源码深拷贝函数

本来想写的，但是看到一篇写的很好的，[传送门](https://github.com/moyui/BlogPosts/blob/master/2018/lodash%E6%B7%B1%E6%8B%B7%E8%B4%9D%E6%BA%90%E7%A0%81%E6%8E%A2%E7%A9%B6.md)

### 一个编程题

#### 题目描述：在一个数组 nums 中除一个数字只出现一次之外，其他数字都出现了三次。请找出那个只出现一次的数字

  解析：创建一个map，记录数组中出现的数组的次数，最后返回只出现过一次的数字。

  代码：

  ```js
  var singleNumber = function(nums) {
    const map = {};
    for(let i=0; i<nums.length; i++){
        if (map[nums[i]]) {
           map[nums[i]] += 1;
        } else {
            map[nums[i]] = 1;
        }
    }
    for(let key in map) {
        if (map[key] === 1) {
            return key
        }
    }
  };
  ```

  然后es6中新的数据结构Map，也可以拿来用一哈，查找起来更加方便一些，代码：

  ```js
  var singleNumber = function(nums) {
    const map = new Map();
    for(let i=0; i<nums.length; i++){
        if (map.has(nums[i])) {
          map.set(nums[i], map.get(nums[i]) + 1)
        } else {
            map.set(nums[i], 1)
        }
    }
    for (let [key, value] of map.entries()) {
        if (value === 1) {return key}
    }
  };
  ```

### 整理一下薄弱的地方

1. js继承与原型链
2. 算法
3. 模块化
