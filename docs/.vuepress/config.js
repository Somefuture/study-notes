module.exports = {
    title: '学习笔记',
    description: '学习笔记',
    head: [
        ['link', { rel: 'icon', href: '/xm.png' }]
    ],
    plugins: ['@vuepress/back-to-top'],
    themeConfig: {
        logo: '/xm.png',
        lastUpdated: 'Last Updated',
        nav: [
            { text: '主页', link: '/' },
            { text: 'Github', link: 'https://github.com/Somefuture' },
        ],
        sidebar: [{
                path: '/',
                title: '首页'
            },
            {
                title: '九月', // 必要的
                // path: '/sept/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 1, // 可选的, 默认值是 1
                children: [
                    { path: '/sept/url-action', title: '第一篇：从浏览器地址栏输入url开始' },
                    { path: '/sept/deep-clone', title: '第二篇：走进lodash深拷贝' },
                    { path: '/sept/interview-one', title: '第三篇：面试题解之输出代码结果篇' },
                    { path: '/sept/interview-two', title: '第四篇：面试题解之编程题' }
                ]
            },
        ]
    }
}