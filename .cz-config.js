module.exports = {
  // type 类型
  types: [
    { value: 'feat', name: 'feat:     引入新功能' },
    { value: 'fix', name: 'fix:      修复 bug' },
    { value: 'style', name: 'style:    更新 UI 样式' },
    { value: 'format', name: 'format:   格式化代码' },
    { value: 'docs', name: 'docs:     添加/更新文档' },
    { value: 'build', name: 'build:     项目构建' },
    { value: 'perf', name: 'perf:     提高性能/优化' },
    { value: 'init', name: 'init:     初次提交/初始化项目' },
    { value: 'test', name: 'test:     增加测试代码' },
    { value: 'refactor', name: 'refactor: 改进代码结构/代码格式' },
    { value: 'patch', name: 'patch:    添加重要补丁' },
    { value: 'file', name: 'file:     添加新文件' },
    { value: 'publish', name: 'publish:  发布新版本' },
    { value: 'tag', name: 'tag:      发布新版本Tag' },
    { value: 'config', name: 'config:   修改配置文件' },
    { value: 'git', name: 'git:      添加或修改.gitignore 文件' },
  ],

  // allowTicketNumber: false,
  // isTicketNumberRequired: false,git
  // ticketNumberPrefix: 'TICKET-',
  // ticketNumberRegExp: '\\d{1,5}',

  // 可以设置 scope 的类型跟 type 的类型匹配项，例如: 'fix'
  // scopeOverrides: {
  //   config: [
  //     { name: 'merge' },
  //     { name: 'style' },
  //     { name: 'e2eTest' },
  //     { name: 'unitTest' }
  //   ]
  // },
  // 覆写提示的信息
  messages: {
    type: '选择你要提交的类型:',
    scope: '\n选择一个 scope (可选):',
    // 选择 scope: custom 时会出下面的提示
    customScope: '请输入自定义的 scope (可选):',
    subject: '填写一个简短精炼的描述语句 (必填):\n',
    body: '添加一个更加详细的描述，可以附上新增功能的描述或 bug 链接、截图链接 (可选)。使用 "|" 换行:\n',
    breaking: '列举非兼容性重大的变更 (可选):\n',
    footer: '列举出所有变更的 ISSUES CLOSED (可选)。 例如.: #31, #34:\n',
    confirmCommit: '确认提交?（y/n）',
  },

  scopes: [{ name: '管理端' }, { name: 'packages' }, { name: '其他' }],
  // 是否允许自定义填写 scope ，设置为 true ，会自动添加两个 scope 类型 [{ name: 'empty', value: false },{ name: 'custom', value: 'custom' }]
  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],
  // 跳过问题
  //   skipQuestions: ['body', 'footer'],

  // subject 限制长度
  subjectLimit: 100,
  // breaklineChar: '|', // 支持 body 和 footer
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst: true,
}
