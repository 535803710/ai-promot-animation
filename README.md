# AI 动画案例集锦

✨ 探索令人惊叹的 Canvas 和 CSS 动画效果

## 🎯 项目简介

这是一个展示各种创意动画效果的项目集合，包含 4 个精选案例：

1. **Matrix Rain 2.0** - 黑客帝国风格的矩阵雨效果
2. **Neon Button** - 赛博朋克风格的霓虹按钮
3. **Sharp Glowing Card** - 锐利发光暗色卡片
4. **Particle Trail** - 交互式粒子轨道动画

## 🚀 本地开发

### 前置要求

- 任何支持静态文件服务的 Web 服务器（推荐使用 Python 或 Node.js）

### 启动步骤

**使用 Python (推荐)**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**使用 Node.js**
```bash
# 全局安装 http-server
npm install -g http-server

# 启动服务器
http-server -p 8000
```

访问 `http://localhost:8000` 即可查看项目。

## 📦 部署到 Vercel

### 方法 1: 使用 Vercel CLI (推荐)

```bash
# 1. 安装 Vercel CLI（如果尚未安装）
npm install -g vercel

# 2. 在项目根目录执行部署
vercel

# 3. 按照提示完成配置
# - 选择 scope (个人账户或团队)
# - 确认项目名称
# - 确认项目根目录
```

部署完成后，Vercel 会提供一个唯一的 URL。

### 方法 2: 使用 Vercel Dashboard

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "New Project"
3. 导入你的 Git 仓库（GitHub/GitLab/Bitbucket）
4. 无需配置，直接点击 "Deploy"
5. 等待部署完成

### 部署后验证

访问 Vercel 提供的 URL，确认：
- ✅ 首页正确显示 4 个案例卡片
- ✅ 点击卡片可进入详情页
- ✅ 详情页中的动画正常运行
- ✅ 点击返回按钮可回到首页
- ✅ 刷新页面不会 404

## 📁 项目结构

```
ai-promot-animation/
├── index.html                      # 主入口文件
├── vercel.json                     # Vercel 部署配置
├── README.md                       # 项目说明文档
├── styles/
│   └── main.css                    # 主样式表
├── scripts/
│   └── app.js                      # 应用逻辑
├── assets/
│   └── thumbnails/                 # 案例缩略图
│       ├── matrix-rain.png
│       ├── neon-button.png
│       ├── glowing-card.png
│       └── particle-trail.png
├── Matrix Rain 2.0/                # 案例 1
├── Neon button with CSS/           # 案例 2
├── SharpGlowingdarkcard/           # 案例 3
└── Trail/                          # 案例 4
```

## 🎨 技术栈

- **前端**: 纯 HTML/CSS/JavaScript (无框架)
- **路由**: 哈希路由 (Hash Router)
- **样式**: 玻璃态设计 (Glassmorphism)
- **部署**: Vercel
- **动画**: Canvas API + CSS Animations

## 🔧 配置说明

### vercel.json

项目已包含 `vercel.json` 配置文件，主要配置：

- **SPA 路由重写**: 所有路径指向 `index.html`
- **静态资源缓存**: CSS/JS/图片缓存 1 年

无需额外配置即可部署。

## 🌐 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 许可证

MIT License

## 🙏 致谢

所有动画效果均使用 AI 辅助创建。
