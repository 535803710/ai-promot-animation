# 代码审核快速检查清单

快速参考指南，用于系统化地审核代码质量。

## 🚀 快速开始检查（5分钟）

在深入审核前，先进行这些快速检查：

- [ ] 文件大小是否合理（< 500 行）
- [ ] 是否有明显的语法错误或 lint 警告
- [ ] 是否有大量注释掉的代码
- [ ] 是否有 console.log 或调试代码
- [ ] 变量命名是否语义化
- [ ] 是否有明显的代码重复

---

## 📋 详细检查清单

### 1️⃣ 代码规范（5分钟）

#### 命名规范
- [ ] 变量名使用 camelCase（JavaScript）
- [ ] 类名使用 PascalCase
- [ ] 常量使用 UPPER_SNAKE_CASE
- [ ] CSS 类名使用 kebab-case 或 BEM
- [ ] 文件名一致性（kebab-case 或 PascalCase）
- [ ] 避免单字母变量（除 i, j, k 在循环中）
- [ ] 布尔变量使用 is/has/should 前缀

#### 格式规范
- [ ] 缩进统一（2或4空格）
- [ ] 行尾无多余空格
- [ ] 文件末尾有空行
- [ ] 大括号风格一致
- [ ] 引号使用一致（单引号或双引号）

#### 注释
- [ ] 复杂逻辑有注释说明
- [ ] 公共函数有 JSDoc/docstring
- [ ] 注释内容准确、简洁
- [ ] 无注释掉的废代码
- [ ] TODO 注释有责任人和时间

---

### 2️⃣ 函数质量（10分钟）

#### 函数设计
- [ ] 单一职责（一个函数做一件事）
- [ ] 函数名清楚表明其功能
- [ ] 函数长度 < 50 行
- [ ] 参数数量 < 5 个
- [ ] 避免使用布尔参数（考虑拆分函数）
- [ ] 嵌套层级 < 3 层

#### 参数处理
- [ ] 参数有默认值（如适用）
- [ ] 参数类型检查（JavaScript）
- [ ] 解构赋值使用恰当
- [ ] 参数顺序合理（必需 → 可选）

#### 返回值
- [ ] 返回类型一致
- [ ] 避免返回 null（考虑空对象模式）
- [ ] 异步函数返回 Promise
- [ ] 明确的返回值文档

**检查示例**：
```javascript
// ❌ 不好：参数过多，职责不单一
function createUser(name, email, age, address, phone, role, department) {
  // 创建用户并发送邮件并记录日志...
}

// ✅ 好：使用对象参数，职责单一
function createUser({ name, email, age, contact, profile }) {
  validateUserData({ name, email, age });
  return buildUserObject({ name, email, age, contact, profile });
}
```

---

### 3️⃣ 错误处理（10分钟）

#### 异常处理
- [ ] try-catch 使用恰当
- [ ] 不吞没错误（空 catch）
- [ ] 异步函数有错误处理
- [ ] Promise 有 .catch() 或 await 有 try-catch
- [ ] fetch 请求检查 response.ok

#### 输入验证
- [ ] 用户输入经过验证
- [ ] 检查 null/undefined
- [ ] 数组操作前检查是否为数组
- [ ] 对象属性访问前检查存在性
- [ ] 使用可选链 ?.（如适用）

#### 边界情况
- [ ] 空数组/对象处理
- [ ] 零值处理
- [ ] 极大/极小值处理
- [ ] 网络错误处理
- [ ] 超时处理

**检查示例**：
```javascript
// ❌ 缺少错误处理
async function loadUser(id) {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}

// ✅ 完善的错误处理
async function loadUser(id) {
  if (!id) {
    throw new Error('用户 ID 不能为空');
  }
  
  try {
    const res = await fetch(`/api/users/${id}`);
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('加载用户失败:', error);
    throw new Error(`加载用户 ${id} 失败: ${error.message}`);
  }
}
```

---

### 4️⃣ 性能优化（15分钟）

#### 算法效率
- [ ] 避免嵌套循环（O(n²)）
- [ ] 使用高效数据结构（Map, Set）
- [ ] 避免不必要的计算
- [ ] 缓存计算结果
- [ ] 提前返回（early return）

#### DOM 操作（前端）
- [ ] 批量 DOM 操作
- [ ] 避免循环中操作 DOM
- [ ] 使用 DocumentFragment
- [ ] 事件委托代替多个监听器
- [ ] 防抖/节流处理高频事件

#### React 性能（如适用）
- [ ] 使用 useMemo/useCallback 适当
- [ ] 避免内联函数作为 props
- [ ] key 属性正确使用
- [ ] 组件拆分合理
- [ ] 避免不必要的重渲染

#### 资源加载
- [ ] 图片懒加载
- [ ] 代码分割
- [ ] 按需加载
- [ ] 使用 Web Workers（CPU 密集任务）

**性能检查点**：
```javascript
// ❌ 性能问题：循环中操作 DOM
items.forEach(item => {
  list.innerHTML += `<li>${item}</li>`;
});

// ✅ 优化：批量操作
const html = items.map(item => `<li>${item}</li>`).join('');
list.innerHTML = html;

// 📊 更好：使用模板和 Fragment
const fragment = document.createDocumentFragment();
items.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  fragment.appendChild(li);
});
list.appendChild(fragment);
```

---

### 5️⃣ 安全性（10分钟）

#### 输入安全
- [ ] XSS 防护（使用 textContent 而非 innerHTML）
- [ ] SQL 注入防护（参数化查询）
- [ ] 命令注入防护
- [ ] 路径遍历防护
- [ ] 输入长度限制

#### 敏感信息
- [ ] 无硬编码密码/密钥
- [ ] API 密钥使用环境变量
- [ ] 敏感日志已清理
- [ ] 用户数据加密存储

#### 权限控制
- [ ] 访问控制检查
- [ ] 权限验证
- [ ] CSRF 防护
- [ ] CORS 配置正确

**安全检查示例**：
```javascript
// ❌ XSS 风险
element.innerHTML = userInput;

// ✅ 安全
element.textContent = userInput;
// 或使用 DOMPurify
element.innerHTML = DOMPurify.sanitize(userInput);

// ❌ 硬编码密钥
const API_KEY = 'sk-1234567890abcdef';

// ✅ 使用环境变量
const API_KEY = process.env.API_KEY;
```

---

### 6️⃣ 可维护性（15分钟）

#### 代码组织
- [ ] 模块化合理
- [ ] 单一职责原则
- [ ] 依赖关系清晰
- [ ] 无循环依赖
- [ ] 文件夹结构清晰

#### DRY 原则
- [ ] 无重复代码
- [ ] 公共逻辑已提取
- [ ] 配置集中管理
- [ ] 魔法数字提取为常量

#### 可读性
- [ ] 代码自解释（无需过多注释）
- [ ] 复杂表达式拆分
- [ ] 三元运算符使用适度
- [ ] 提前返回避免嵌套

#### 可测试性
- [ ] 函数易于测试
- [ ] 依赖可注入
- [ ] 副作用少
- [ ] 输入输出明确

**可维护性示例**：
```javascript
// ❌ 魔法数字，难以维护
if (user.age > 18 && user.score > 60) {
  // ...
}

// ✅ 使用常量
const MIN_ADULT_AGE = 18;
const PASS_SCORE = 60;

if (user.age > MIN_ADULT_AGE && user.score > PASS_SCORE) {
  // ...
}

// 📊 更好：封装逻辑
function isEligible(user) {
  return user.age > MIN_ADULT_AGE && user.score > PASS_SCORE;
}

if (isEligible(user)) {
  // ...
}
```

---

## 🎯 按文件类型的专项检查

### JavaScript/TypeScript

- [ ] 使用 `const`/`let`，避免 `var`
- [ ] 使用箭头函数（适当场景）
- [ ] 使用模板字符串
- [ ] 使用解构赋值
- [ ] async/await 代替 Promise 链
- [ ] 可选链操作符 `?.`
- [ ] 空值合并运算符 `??`
- [ ] 严格相等 `===`
- [ ] 避免 `eval()`

### React/Vue 组件

- [ ] 组件职责单一
- [ ] Props 类型定义
- [ ] 事件处理函数命名（handleXxx）
- [ ] useEffect 依赖正确
- [ ] 清理副作用
- [ ] 状态最小化
- [ ] 避免 prop drilling

### CSS

- [ ] 避免 !important
- [ ] 使用 CSS 变量
- [ ] BEM 命名或其他规范
- [ ] 移动优先响应式设计
- [ ] 避免行内样式
- [ ] 使用语义化类名
- [ ] 浏览器兼容性考虑

### HTML

- [ ] 语义化标签
- [ ] alt 属性（图片）
- [ ] ARIA 属性（可访问性）
- [ ] meta 标签（SEO）
- [ ] 表单 label 关联
- [ ] 有效的 HTML 结构

---

## 📊 评分标准

为每个维度打分（1-5星）：

| 维度     | ⭐        | ⭐⭐       | ⭐⭐⭐      | ⭐⭐⭐⭐   | ⭐⭐⭐⭐⭐      |
| -------- | -------- | -------- | -------- | ------ | ---------- |
| 代码规范 | 混乱     | 较差     | 一般     | 良好   | 优秀       |
| 性能     | 严重问题 | 多处问题 | 可接受   | 良好   | 优化很好   |
| 安全性   | 严重漏洞 | 有风险   | 基本安全 | 安全   | 非常安全   |
| 错误处理 | 无处理   | 部分处理 | 基本完善 | 完善   | 非常全面   |
| 可维护性 | 难以维护 | 较难     | 一般     | 易维护 | 非常易维护 |

**总体评分** = 各维度平均分

---

## 🚨 关键问题标记

使用优先级标记审核发现的问题：

- 🔴 **高优先级（必须修复）**
  - 功能性 bug
  - 安全漏洞
  - 严重性能问题
  - 导致崩溃的错误

- 🟡 **中优先级（建议修复）**
  - 代码规范问题
  - 轻微性能问题
  - 可维护性问题
  - 缺少错误处理

- 🟢 **低优先级（可选优化）**
  - 代码风格改进
  - 注释补充
  - 重构建议
  - 最佳实践建议

---

## ✅ 审核完成标准

代码审核完成后，应该能回答以下问题：

- [ ] 代码是否实现了预期功能？
- [ ] 代码是否有明显的 bug 或错误？
- [ ] 代码是否安全（无安全漏洞）？
- [ ] 代码性能是否可接受？
- [ ] 代码是否易于理解和维护？
- [ ] 是否遵循了项目的编码规范？
- [ ] 是否有充分的错误处理？
- [ ] 是否有改进空间？

---

## 📝 输出清单

审核报告应包含：

- [ ] 审核概览（文件、行数、评分）
- [ ] 优点总结
- [ ] 问题清单（按优先级）
- [ ] 代码示例（修改前后对比）
- [ ] 改进建议（具体可行）
- [ ] 学习资源推荐

---

## 💡 审核技巧

1. **先整体后局部**：先看文件结构，再看具体实现
2. **关注关键路径**：重点审核核心逻辑和用户交互部分
3. **使用工具辅助**：ESLint, Prettier, 性能分析工具
4. **保持客观**：基于标准而非个人偏好
5. **积极鼓励**：既指出问题也肯定优点
6. **提供理由**：解释为什么某个做法更好
7. **给出示例**：用代码示例说明改进方案

---

## 🔍 常用搜索命令

快速发现潜在问题：

```bash
# 查找调试代码
grep -r "console.log\|debugger" src/

# 查找 TODO
grep -r "TODO\|FIXME\|XXX" src/

# 查找废弃的 var
grep -r "\bvar\b" src/

# 查找 !important
grep -r "!important" src/

# 查找硬编码的 URL
grep -r "http://\|https://" src/

# 查找大文件
find src/ -type f -size +100k
```

---

## 📚 相关资源

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web.dev Performance](https://web.dev/performance/)
