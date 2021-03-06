---
title: 面试题精选
---
## 模拟面试题

### 异步加载js的方法

其实在红包书里，异步加载js分成了三种类别：

1. 推迟执行脚本：通过设置`script`标签元素的defer属性，表示脚本在执行的时候不会改变页面的结构。在script标签中增加defer属性，会告诉浏览器应该立即下载，但是推迟执行，且脚本按照顺序执行，执行时间为浏览器解析到结束的`</html>`标签、DOMContentLoaded事件触发之前执行。兼容性较好。

    > DOMContentLoaded 事件：当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载

2. 异步执行脚本：通过设置`script`标签元素的async属性，该属性会告诉浏览器应该立即下载，且该脚本不会阻塞html解析，也不会阻塞其它脚本文件的下载和解析。async属性的脚本无法按照顺序执行，然后一定会在页面的load事件之前执行，但是可能在DOMContentLoaded事件之前或之后，在脚本文件可用时，它会暂停html的解析，先解析脚本文件，解析完毕以后再进行html的解析。

    > 当整个页面及所有依赖资源如样式表和图片都已完成加载时，将触发load事件。它与DOMContentLoaded不同，后者只要页面DOM加载完成就触发，无需等待依赖资源的加载。

3. 动态加载脚本：创建一个script 标签，并动态添加到dom中。这种情况下的脚本默认异步加载，异步加载的脚本无法确定执行顺序，所以可以通过设置script.async = false ，将其设为同步脚本。如果为了不阻塞html的解析，可以在html文件头部进行预加载：`<link rel="proload" href="index.js" />`

### iframe的定义与它的缺点

定义：

> 表示嵌套的browsing context(浏览器上下文)。它能够将另一个HTML页面嵌入到当前页面中

缺点：

>页面上的每个`<iframe>`都需要增加内存和其它计算资源，这是因为每个浏览上下文都拥有完整的文档环境。虽然理论上来说你能够在代码中写出来无限多的`<iframe>`，但是你最好还是先看看这么做会不会导致某些性能问题

1. iframes阻塞页面加载，影响网页加载速度
2. 导致布局混乱
3. 不利于seo
4. 设备兼容性差
