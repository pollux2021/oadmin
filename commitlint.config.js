module.exports = {
  // 继承规则
  extends: ['@commitlint/config-conventional'],
  // 定义规则
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'style',
        'format',
        'docs',
        'perf',
        'init',
        'test',
        'refactor',
        'patch',
        'file',
        'publish',
        'tag',
        'config',
        'git',
        'build',
      ],
    ],
    'type-case': [0],
    'subject-empty': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
}
