// 用法: node bake.mjs <github-owner>
// 把仓库里所有 <owner> 占位符换成真实 GitHub 用户名，并生成投稿用的 YAML。
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

const owner = process.argv[2]
if (!owner || !/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(owner)) {
  console.error('用法: node bake.mjs <github-owner>')
  process.exit(1)
}

const repo = 'dsh-wechat-theme'
const home = `https://github.com/${owner}/${repo}`

// package.json：补上仓库信息，这样 npm 页面和市场卡片都能指回来
const pkgPath = 'package.json'
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
pkg.repository = { type: 'git', url: `git+${home}.git` }
pkg.homepage = home
pkg.bugs = { url: `${home}/issues` }
writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)

// 文档里的占位符
for (const file of ['PUBLISH.md']) {
  const text = readFileSync(file, 'utf8')
  writeFileSync(file, text.replaceAll('<owner>', owner))
}

// 投稿条目：一个插件一个文件
const yaml = `url: ${home}
name: ${owner}/${repo}
category: theme
description:
  en: 'WeChat-style skin for the Harness web UI: grey chat list, green outgoing bubbles, white incoming bubbles, a green send button, and a 已归档 tag on archived sessions.'
  zh: '把 Harness 界面换成微信风格：灰白配色、绿色气泡、绿色发送键、微信字体，已归档会话带「已归档」标签。'
icon: https://raw.githubusercontent.com/${owner}/${repo}/main/assets/icon-180.png
`
mkdirSync('submission', { recursive: true })
writeFileSync(`submission/${owner}__${repo}.yml`, yaml)

console.log(`已写入仓库信息与 submission/${owner}__${repo}.yml`)
