# 提交到插件市场

市场里的条目来自精选列表 [awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin)：
一个插件一个 YAML 文件，放在那个仓库的 `data/plugins/<owner>__<repo>.yml`，提 PR 合并后
通常一天内出现在 [awesome-dsh-plugin.com](https://awesome-dsh-plugin.com) 和 `dshmarket` 里。

## 1. 先把仓库推到 GitHub

条目的 `url` 必须与仓库地址完全一致，而且仓库要**创建满 1 天**（CI 自动检查）。

本地仓库已经初始化好并完成了首个提交（作者 `Cui-chengyu <Cui-chengyu@users.noreply.github.com>`），
在 GitHub 上新建一个空的 `dsh-wechat-theme` 仓库，然后：

```sh
cd dsh-wechat-theme
git remote add origin https://github.com/Cui-chengyu/dsh-wechat-theme.git
git push -u origin main
```

然后在仓库页面上加 topic：**Settings → Topics → `dsh-plugin`**（收录要求之一）。

## 2. 提 PR

1. Fork [awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin)。
2. 新建 `data/plugins/Cui-chengyu__dsh-wechat-theme.yml`，内容用下面这份：

```yaml
url: https://github.com/Cui-chengyu/dsh-wechat-theme
name: Cui-chengyu/dsh-wechat-theme
category: theme
description:
  en: 'WeChat-style skin for the Harness web UI: grey chat list, green outgoing bubbles, white incoming bubbles, green send button and a 已归档 tag on archived sessions.'
  zh: '把 Harness 界面换成微信风格：灰白配色、绿色气泡、绿色发送键、微信字体，已归档会话带「已归档」标签。'
icon: https://raw.githubusercontent.com/Cui-chengyu/dsh-wechat-theme/main/assets/icon-180.png
```

> 英文描述里有 `: `（冒号加空格），按贡献指南必须加引号，否则 YAML 会当成嵌套键。

3. 提交 PR，标题例如 `Add dsh-wechat-theme (theme)`。CI 会检查 manifest、仓库年龄、YAML 格式。

## 3. 收录要求对照

| 要求 | 本仓库 |
| --- | --- |
| `package.json` 声明 `dsh.bundle` | ✅ `{ "patch": "./cordis.patch.yml" }` |
| 有真实可用的代码 | ✅ `client.js` 注入样式 + 空气泡探测器 |
| 仓库创建满 1 天 | ⏳ 推送后第二天再提 PR |
| 仓库带 `dsh-plugin` topic | 需在 GitHub 网页上添加 |
| 描述与实际功能一致 | ✅ 见上文 YAML，只描述已有行为 |

## 4. 可选：发到 npm

发 npm 之后市场会优先用 npm 包安装，跳过源码构建与 `allowBuilds` 授权，安装更快：

```sh
npm publish --access public
```

发布前把 `package.json` 里的仓库信息补上，并把 `name` 改成未被占用的名字
（`dsh-wechat-theme` 若已被占用，用 `@<scope>/dsh-wechat-theme`）。
