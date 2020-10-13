# 编程题篇

## 打印二叉树的所有路径

此题为leetcode原题，[传送门](https://leetcode-cn.com/problems/binary-tree-paths/?utm_source=LCUS&utm_medium=ip_redirect_q_uns&utm_campaign=transfer2china)

解析与回答：

```js
// 打印二叉树的所有路径，也就是打印出根节点到叶子节点的所有路径。
/*
* 二叉树如下：
      1
    2   3
  4 
  则打印出来: ['1->2->4', '1->3']

* 解析：最直观的就是使用深度优先遍历DFS（Depth First Search），在深度优先遍历时，我们应该考虑当前节点是否为叶子节点。
1. 如果是叶子节点，则加入路径，将路径push进路径合集中
2. 如果不是叶子节点，则加入当前路径，继续向下遍历
*/

// 递归方法实现

var binaryTreePaths = function(root) {
    const paths = [];
    function getPath(node, path){
        if (!node) {return false}
        if (!node.left && !node.right) {
            path = path ? (path + '->' + node.val) : node.val + ''
            paths.push(path)
        } else {
            path = path ? (path + '->' + node.val) : node.val + ''
            getPath(node.left, path)
            getPath(node.right, path)
        }
    }
    getPath(root, '')
    return paths
};

/*
执行用时：88 ms, 在所有 JavaScript 提交中击败了64.77%的用户
内存消耗：38.9 MB, 在所有 JavaScript 提交中击败了25.23%的用户
*/

// 非递归实现方式：
// 暂时没想好怎么写，欢迎有想法的朋友写出来之后告诉我以下，感谢。以下是一段非遍历形式打印二叉树所有节点的代码：
var printNodes = function(root) {
    const nodes = []
    const stack = [root]
    while(stack.length > 0) {
        const curNode = stack.pop()
        nodes.push(curNode.val)
        if (curNode.right) {
            stack.push(curNode.right)
        }
        if (curNode.left) {
            stack.push(curNode.left)
        }
    }
    return nodes
}

```

## 实现一个repeat方法

要求如下：
需要实现的函数repeat，使下面调用代码能正常工作
```js
const repeatFunc = repeat(console.log, 4, 3000);
repeatFunc("hellworld");//会输出4次 helloworld, 每次间隔3秒
```
解析：
```js
function repeat(fun, times, delay) {
    const wait = delay => new Promise(resolve => setTimeout(resolve, delay)) // 实现一个wait函数
    return async function(...args) {
        while (times > 0) {
            fun(...args) // 当times>0时，调用fun，并传入参数
            await wait(delay) // 等待delay时间后，执行times-- 执行循环
            times--
        }
    }
}
```

## 实现数字的货币格式化

如：6123456789 => 6,123,456,789

解析：
```js
// 循环方式
const toThousands = (num) => {
    let str = num.toString() // 将num转换为字符串
    let length = str.length // 将字符串的长度值赋给变量length
    let formatStr = '' // 创建格式化后的字符串，初始化值为''
    while (length > 3) { // 当length >3 时，执行循环。将字符串的length位置截取，加上逗号，拼接到format字符串前面
        length = length - 3
        formatStr = str.substr(length, 3) + (formatStr ? ',' + formatStr : '')
    }
    formatStr = str.substr(0, length) + (formatStr ? ',' + formatStr : '') // 最后将字符串小于3的部分拼接到format字符串前面
    return formatStr
}
```

上面是我的解法，以下是网上搜索到的其它方法：

```js
// 正则替换,只需要一行代码，正则牛逼！
function toThousands(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}
```
其实思路都差不多，就是三个为一组进行替换，实现的方法多种多样，这里就主要介绍这两种吧。