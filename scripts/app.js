/**
 * AI Animation Gallery - Main Application
 * 案例数据配置、路由管理和页面渲染
 */

// ==========================================
// 案例数据配置
// ==========================================
const CASES = [
  {
    id: "matrix-rain",
    title: "Matrix Rain 2.0",
    description:
      "经典黑客帝国矩阵雨效果，包含动态下落字符流、渐变色彩和发光效果",
    tags: ["Canvas", "Animation", "3D"],
    thumbnail: "./assets/thumbnails/matrix-rain.png",
    path: "./Matrix Rain 2.0/index.html",
    color: "#9bff9b",
    colorRGB: "155, 255, 155",
  },
  {
    id: "neon-button",
    title: "Neon Button",
    description: "赛博朋克风格霓虹按钮，带地面反射和光影填充效果",
    tags: ["CSS", "Interactive", "Hover"],
    thumbnail: "./assets/thumbnails/neon-button.png",
    path: "./Neon button with CSS/index.html",
    color: "hsl(317, 100%, 54%)",
    colorRGB: "255, 20, 147",
  },
  {
    id: "glowing-card",
    title: "Sharp Glowing Card",
    description: "锐利发光暗色卡片，使用 CSS @property 实现平滑属性动画",
    tags: ["CSS", "@property", "Card"],
    thumbnail: "./assets/thumbnails/glowing-card.png",
    path: "./SharpGlowingdarkcard/index.html",
    color: "hsl(280, 100%, 60%)",
    colorRGB: "187, 0, 255",
  },
  {
    id: "particle-trail",
    title: "Particle Trail",
    description: "交互式粒子轨道动画，25个彩色粒子围绕鼠标圆周运动",
    tags: ["Canvas", "Interactive", "Particles"],
    thumbnail: "./assets/thumbnails/particle-trail.png",
    path: "./Trail/index.html",
    color: "#eeeeee",
    colorRGB: "238, 238, 238",
  },
];

// ==========================================
// 路由管理器
// ==========================================
class Router {
  constructor() {
    this.routes = {
      home: this.renderHomePage.bind(this),
      detail: this.renderDetailPage.bind(this),
      404: this.render404Page.bind(this),
    };

    // 监听路由变化
    window.addEventListener("hashchange", () => this.handleRoute());
    window.addEventListener("DOMContentLoaded", () => this.handleRoute());
  }

  /**
   * 解析当前 URL 哈希
   * @returns {Object} { route, params }
   */
  parseHash() {
    const hash = window.location.hash.slice(1) || "/home";
    const parts = hash.split("/").filter((p) => p);

    if (parts.length === 0 || parts[0] === "home") {
      return { route: "home", params: {} };
    }

    if (parts[0] === "detail" && parts[1]) {
      return { route: "detail", params: { id: parts[1] } };
    }

    return { route: "404", params: {} };
  }

  /**
   * 处理路由变化
   */
  handleRoute() {
    const { route, params } = this.parseHash();
    const handler = this.routes[route] || this.routes["404"];
    handler(params);
  }

  /**
   * 导航到指定路由
   * @param {string} path - 路由路径（如 '/detail/matrix-rain'）
   */
  navigate(path) {
    window.location.hash = path;
  }

  /**
   * 渲染首页
   */
  renderHomePage() {
    const app = document.getElementById("app");

    app.innerHTML = `
            <div class="home-page">
                <header class="page-header">
                    <h2 class="page-title">动画案例集锦</h2>
                    <p class="page-subtitle">
                        探索令人惊叹的 Canvas 和 CSS 动画效果，每个案例都展示了前端技术的无限可能
                    </p>
                </header>
                
                <div class="case-grid">
                    ${CASES.map((caseItem, index) =>
                      this.renderCaseCard(caseItem)
                    ).join("")}
                </div>
            </div>
        `;

    // 绑定点击事件
    CASES.forEach((caseItem) => {
      const card = document.getElementById(`card-${caseItem.id}`);
      if (card) {
        card.addEventListener("click", () => {
          this.navigate(`/detail/${caseItem.id}`);
        });
      }
    });
  }

  /**
   * 渲染案例卡片
   * @param {Object} caseItem - 案例数据
   * @returns {string} HTML 字符串
   */
  renderCaseCard(caseItem) {
    return `
            <div class="case-card" 
                 id="card-${caseItem.id}"
                 style="--card-color: ${caseItem.color}; --card-color-rgb: ${
      caseItem.colorRGB
    };">
                <img src="${caseItem.thumbnail}" 
                     alt="${caseItem.title}" 
                     class="card-thumbnail"
                     loading="lazy"
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 250%22%3E%3Crect width=%22400%22 height=%22250%22 fill=%22%231a1a2e%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2224%22 fill=%22%23b4b4b4%22%3E${
                       caseItem.title
                     }%3C/text%3E%3C/svg%3E'">
                <div class="card-content">
                    <h3 class="card-title">${caseItem.title}</h3>
                    <p class="card-description">${caseItem.description}</p>
                    <div class="card-tags">
                        ${caseItem.tags
                          .map((tag) => `<span class="tag">${tag}</span>`)
                          .join("")}
                    </div>
                </div>
            </div>
        `;
  }

  /**
   * 渲染详情页
   * @param {Object} params - 路由参数 { id }
   */
  renderDetailPage(params) {
    const caseItem = CASES.find((c) => c.id === params.id);

    if (!caseItem) {
      this.render404Page();
      return;
    }

    const app = document.getElementById("app");

    app.innerHTML = `
            <div class="detail-page">
                <button class="back-button" id="back-btn">
                    返回首页
                </button>
                
                <div class="iframe-container">
                    <iframe 
                        src="${caseItem.path}" 
                        title="${caseItem.title}"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        loading="lazy">
                    </iframe>
                </div>
            </div>
        `;

    // 绑定返回按钮
    const backBtn = document.getElementById("back-btn");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        this.navigate("/home");
      });
    }
  }

  /**
   * 渲染 404 页面
   */
  render404Page() {
    const app = document.getElementById("app");

    app.innerHTML = `
            <div class="error-page">
                <h1 class="error-code">404</h1>
                <p class="error-message">页面未找到</p>
                <a href="#/home" class="home-link">返回首页</a>
            </div>
        `;
  }
}

// ==========================================
// 应用初始化
// ==========================================
const app = new Router();
