---
title: 走进promise
---
目录：
[[toc]]

## promise简介

Promise对象用于表示一个异步操作的最终完成（或失败）以及结果值。异步方法并不会立即返回最终的值，而是会返回一个promise，以便在未来某个时候把值交给使用者。

一个promise必然处于以下几种状态之一：

- 待定(pending): 初始状态，既没有被兑现，也没有被拒绝
- 已兑现(fulfilled): 意味着操作成功完成
- 已拒绝(rejected): 意味着操作失败

## web安全汇总

### XSS(Cross-Site Scripting)

Cross-Site Scripting 跨站脚本攻击，是指通过存在安全漏洞的网站注册用户的浏览器内运行非法的HTML标签或者Javascript进行的一种攻击。

跨站脚本攻击可能造成以下影响：

- 利用虚假输入表单骗取用户的个人信息。

- 利用脚本窃取用户的Cookie值，被害者在不知情的情况下，帮助攻击者发送恶意请求。

- 显示伪造的文章或图片。

xss的原理：

    恶意攻击者往web页面里插入恶意可执行网页脚本代码，当用户浏览该页时，嵌入页面的脚本代码会被执行，从而达到攻击者盗取用户信息或者其它侵犯用户安全隐私的目的。

分类：

  反射性xss：一般是通过给别人发送带有恶意脚本代码参数的url，当url地址被打开时，特有的恶意代码参数被HTML解析、执行。有如下特征：

      1. 即时性，不经过服务器存储，直接通过HTTP的Get和Post请求就能完成一次攻击，拿到用户隐私数据
      2. 攻击者需要诱骗点击，必须要通过用户点击链接才能发现
      3. 反馈率低，所以较难发现和相应修复
      4. 主要用于盗窃用户敏感保密信息

  预防手段：

      1. web页面渲染的所有内容或者渲染的数据都必须来自于服务端
      2. 尽量不要从URL，document.referrer,document.forms等这种DOM API中获取数据直接渲染
      3. 尽量不要使用eval，new Function()，document.write()，document.writeln()，window.setInterval()，
      window.setTimeout()，innerHTML，document.createElement()等可执行字符串的方法。
      4. 如果做不到以上几点，也必须对设计DOM渲染的方法传入的字符串参数做escape转义编码

  持久型xss：持久型xss攻击不需要诱骗点击，黑客只需要在提交表单的地方完成注入即可。攻击成功需要满足以下条件：

      1. post请求提交表单后后端没做转义直接入库
      2. 后端从数据库中取出数据没做转义直接输出前端
      3. 前端拿到后端数据没做转义，直接渲染成dom

  特点：

      1. 持久性，植入在数据库中
      2. 盗取用户敏感私密信息
      3. 危害面广
  
  防御：

      1. CSP（Content-Security-Policy内容安全策略），可以设置HTTP Header中的Content-Security-Policy或者设置html文件的meta标签
      2. 转义字符，对输入输出的内容进行转义，使用白名单的方式进行转义
      3. 设置cookie时将其属性设置为HTTP Only

## 参考

- [1] [史上最最最详细的手写Promise教程](https://juejin.im/post/6844903625769091079)
- [2] [web安全](https://juejin.im/post/6844903772930441230)
