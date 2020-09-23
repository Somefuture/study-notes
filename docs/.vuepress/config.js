module.exports = {
  title: 'My Study Notes',
  description: 'Just playing around',
  themeConfig: {
    logo: '/xm.png',
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Github', link: 'https://github.com/Somefuture' },
    ],
    sidebar: [
      {
        path: '/',
        title: '首页'
      },
      {
        title: '九月',   // 必要的
        // path: '/sept/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          {path:'/sept/day-one', title: '第一篇'}
        ]
      },
    ]
  }
}