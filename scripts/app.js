/**
 * AI Animation Gallery - Main Application
 * 案例数据配置、路由管理和页面渲染
 */

// ==========================================
// 配置
// ==========================================
const GITHUB_REPO = "https://github.com/535803710/ai-promot-animation";

// 当前语言（默认中文）
let currentLang = localStorage.getItem("preferred-lang") || "zh";

// ==========================================
// 案例数据配置（中英文）
// ==========================================
const CASES = [
  {
    id: "matrix-rain",
    title: { zh: "矩阵雨 2.0", en: "Matrix Rain 2.0" },
    description: {
      zh: "经典黑客帝国矩阵雨效果，包含动态下落字符流、渐变色彩和发光效果",
      en: "Classic Matrix rain effect with falling characters, gradients and glowing effects",
    },
    tags: ["Canvas", "Animation", "3D"],
    thumbnail: "./assets/thumbnails/matrix-rain.png",
    path: "./Matrix Rain 2.0/index.html",
    promotPath: "./Matrix Rain 2.0/promot.md",
    folder: "Matrix Rain 2.0",
    color: "#9bff9b",
    colorRGB: "155, 255, 155",
  },
  {
    id: "neon-button",
    title: { zh: "霓虹按钮", en: "Neon Button" },
    description: {
      zh: "赛博朋克风格霓虹按钮，带地面反射和光影填充效果",
      en: "Cyberpunk style neon button with ground reflection and light fill effects",
    },
    tags: ["CSS", "Interactive", "Hover"],
    thumbnail: "./assets/thumbnails/neon-button.png",
    path: "./Neon button with CSS/index.html",
    promotPath: "./Neon button with CSS/promot.md",
    folder: "Neon button with CSS",
    color: "hsl(317, 100%, 54%)",
    colorRGB: "255, 20, 147",
  },
  {
    id: "glowing-card",
    title: { zh: "锐利发光卡片", en: "Sharp Glowing Card" },
    description: {
      zh: "锐利发光暗色卡片，使用 CSS @property 实现平滑属性动画",
      en: "Sharp glowing dark card with smooth property animations using CSS @property",
    },
    tags: ["CSS", "@property", "Card"],
    thumbnail: "./assets/thumbnails/glowing-card.png",
    path: "./SharpGlowingdarkcard/index.html",
    promotPath: "./SharpGlowingdarkcard/promot.md",
    folder: "SharpGlowingdarkcard",
    color: "hsl(280, 100%, 60%)",
    colorRGB: "187, 0, 255",
  },
  {
    id: "particle-trail",
    title: { zh: "粒子轨道", en: "Particle Trail" },
    description: {
      zh: "交互式粒子轨道动画，25个彩色粒子围绕鼠标圆周运动",
      en: "Interactive particle trail animation with 25 colorful particles orbiting around mouse",
    },
    tags: ["Canvas", "Interactive", "Particles"],
    thumbnail: "./assets/thumbnails/particle-trail.png",
    path: "./Trail/index.html",
    promotPath: "./Trail/promot.md",
    folder: "Trail",
    color: "#eeeeee",
    colorRGB: "238, 238, 238",
  },
];

// ==========================================
// 工具函数
// ==========================================

/**
 * 获取当前语言的文本
 */
function t(textObj) {
  if (typeof textObj === "string") return textObj;
  return textObj[currentLang] || textObj.zh || textObj.en;
}

/**
 * 切换语言
 */
function toggleLanguage() {
  currentLang = currentLang === "zh" ? "en" : "zh";
  localStorage.setItem("preferred-lang", currentLang);
  // 重新渲染当前页面
  window.dispatchEvent(new Event("hashchange"));
}

/**
 * 复制文本到剪贴板
 */
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // 降级方案
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
}

/**
 * 获取 GitHub 源码链接
 */
function getGitHubLink(folder) {
  return `${GITHUB_REPO}/tree/main/${encodeURIComponent(folder)}`;
}

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

    this.searchQuery = "";
    this.filteredCases = CASES;

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
   * 搜索案例
   */
  handleSearch(query) {
    this.searchQuery = query.toLowerCase().trim();

    if (!this.searchQuery) {
      this.filteredCases = CASES;
    } else {
      this.filteredCases = CASES.filter((caseItem) => {
        const title = t(caseItem.title).toLowerCase();
        const description = t(caseItem.description).toLowerCase();
        const tags = caseItem.tags.join(" ").toLowerCase();

        return (
          title.includes(this.searchQuery) ||
          description.includes(this.searchQuery) ||
          tags.includes(this.searchQuery)
        );
      });
    }

    // 重新渲染卡片网格
    this.updateCaseGrid();
  }

  /**
   * 更新案例网格（不重新渲染整个页面）
   */
  updateCaseGrid() {
    const grid = document.querySelector(".case-grid");
    if (!grid) return;

    if (this.filteredCases.length === 0) {
      grid.innerHTML = `
        <div class="no-results">
          <p>😕 没有找到匹配的案例</p>
          <p class="no-results-hint">尝试其他关键词</p>
        </div>
      `;
    } else {
      grid.innerHTML = this.filteredCases
        .map((caseItem) => this.renderCaseCard(caseItem))
        .join("");

      // 重新绑定点击事件
      this.filteredCases.forEach((caseItem) => {
        const card = document.getElementById(`card-${caseItem.id}`);
        if (card) {
          card.addEventListener("click", () => {
            this.navigate(`/detail/${caseItem.id}`);
          });
        }
      });
    }
  }

  /**
   * 渲染首页
   */
  renderHomePage() {
    const app = document.getElementById("app");

    // 重置搜索
    this.searchQuery = "";
    this.filteredCases = CASES;

    app.innerHTML = `
      <div class="home-page">
        <div class="case-grid">
          ${this.filteredCases
            .map((caseItem) => this.renderCaseCard(caseItem))
            .join("")}
        </div>
      </div>
    `;

    // 绑定搜索事件
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.handleSearch(e.target.value);
      });
    }

    // 绑定卡片点击事件
    this.filteredCases.forEach((caseItem) => {
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
             alt="${t(caseItem.title)}" 
             class="card-thumbnail"
             loading="lazy"
             onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 250%22%3E%3Crect width=%22400%22 height=%22250%22 fill=%22%231a1a2e%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2224%22 fill=%22%23b4b4b4%22%3E${t(
               caseItem.title
             )}%3C/text%3E%3C/svg%3E'">
        <div class="card-content">
          <h3 class="card-title">${t(caseItem.title)}</h3>
          <p class="card-description">${t(caseItem.description)}</p>
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
        <div class="detail-header">
          <button class="back-button" id="back-btn">
            返回首页
          </button>
          
          <div class="detail-actions">
            <button class="action-button" id="view-promot-btn">
              📝 查看 Promot
            </button>
            <a href="${getGitHubLink(
              caseItem.folder
            )}" target="_blank" rel="noopener" class="action-button github-link">
              💻 查看源码
            </a>
          </div>
        </div>
        
        <div class="iframe-container">
          <iframe 
            src="${caseItem.path}" 
            title="${t(caseItem.title)}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy">
          </iframe>
        </div>
        
        <!-- Promot Modal -->
        <div class="modal" id="promot-modal">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Promot 内容</h3>
              <button class="modal-close" id="close-modal">×</button>
            </div>
            <div class="modal-body">
              <div class="promot-content" id="promot-content">
                <div class="loading-spinner"></div>
                <p>加载中...</p>
              </div>
            </div>
            <div class="modal-footer">
              <button class="copy-button" id="copy-promot-btn">
                📋 复制 Promot
              </button>
            </div>
          </div>
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

    // 绑定查看 Promot 按钮
    const viewPromotBtn = document.getElementById("view-promot-btn");
    if (viewPromotBtn) {
      viewPromotBtn.addEventListener("click", () => {
        this.showPromotModal(caseItem);
      });
    }
  }

  /**
   * 显示 Promot 弹窗
   */
  async showPromotModal(caseItem) {
    const modal = document.getElementById("promot-modal");
    const promotContent = document.getElementById("promot-content");
    const closeBtn = document.getElementById("close-modal");
    const copyBtn = document.getElementById("copy-promot-btn");

    // 显示弹窗
    modal.classList.add("active");

    // 加载 Promot 内容
    try {
      const response = await fetch(caseItem.promotPath);
      if (!response.ok) throw new Error("Promot file not found");

      const text = await response.text();

      // 简单的 Markdown 渲染（替换为 HTML）
      const html = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/^### (.*$)/gim, "<h3>$1</h3>")
        .replace(/^## (.*$)/gim, "<h2>$1</h2>")
        .replace(/^# (.*$)/gim, "<h1>$1</h1>")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/\n\n/g, "</p><p>")
        .replace(/\n/g, "<br>");

      promotContent.innerHTML = `<div class="promot-text"><p>${html}</p></div>`;

      // 绑定复制按钮
      copyBtn.onclick = async () => {
        const success = await copyToClipboard(text);
        if (success) {
          copyBtn.textContent = "✅ 已复制！";
          setTimeout(() => {
            copyBtn.textContent = "📋 复制 Promot";
          }, 2000);
        } else {
          copyBtn.textContent = "❌ 复制失败";
        }
      };
    } catch (error) {
      promotContent.innerHTML = `
        <p class="error-message">
          ❌ 无法加载 Promot 文件
        </p>
      `;
    }

    // 绑定关闭按钮
    closeBtn.onclick = () => {
      modal.classList.remove("active");
    };

    // 点击背景关闭
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    };
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
