---
name: 代码审核 (Code Review)
description: 对代码进行全面的质量审核，包括代码规范、性能、安全性、可维护性等多个维度的检查和建议
---

# 代码审核 Skill

## 概述

这个 skill 提供系统化的代码审核流程，帮助识别代码中的潜在问题、改进机会和最佳实践建议。

## 使用方法

当用户请求代码审核时，按照以下流程进行：

1. **明确审核范围**：询问用户需要审核的具体文件或功能模块
2. **执行多维度检查**：按照检查清单进行全面审核
3. **生成审核报告**：以结构化的方式呈现审核结果
4. **提供改进建议**：给出具体可行的优化方案

## 审核维度

### 1. 代码质量 (Code Quality)

#### 1.1 代码规范
- ✅ **命名规范**
  - 变量名、函数名、类名是否语义化
  - 命名风格是否一致（camelCase, PascalCase, snake_case）
  - 是否避免使用缩写和单字母变量（除循环变量外）
  
- ✅ **代码格式**
  - 缩进是否统一（2空格或4空格）
  - 代码行长度是否合理（建议 < 100 字符）
  - 括号、空格使用是否一致
  
- ✅ **注释质量**
  - 复杂逻辑是否有充分注释
  - 注释是否准确、及时更新
  - 是否有必要的文档注释（JSDoc, docstring等）

#### 1.2 代码结构
- ✅ **函数设计**
  - 单个函数是否职责单一（单一职责原则）
  - 函数长度是否合理（建议 < 50 行）
  - 参数数量是否合理（建议 < 5 个）
  - 是否有深层嵌套（建议 < 3 层）
  
- ✅ **模块化**
  - 代码是否合理拆分为模块
  - 模块间耦合度是否合理
  - 是否有循环依赖
  
- ✅ **DRY 原则**
  - 是否存在重复代码
  - 是否可以提取公共函数或组件

### 2. 性能优化 (Performance)

- ✅ **算法复杂度**
  - 是否存在不必要的嵌套循环
  - 是否可以优化算法复杂度
  
- ✅ **资源管理**
  - 是否有内存泄漏风险
  - 事件监听器是否正确清理
  - 定时器是否正确清除
  
- ✅ **前端性能**
  - DOM 操作是否频繁
  - 是否使用防抖/节流
  - 图片、资源加载是否优化（懒加载、预加载）
  
- ✅ **数据处理**
  - 大数据集是否合理处理
  - 是否有不必要的数据转换

### 3. 安全性 (Security)

- ✅ **输入验证**
  - 用户输入是否经过验证和清理
  - 是否防范 XSS 攻击
  - 是否防范 SQL 注入（如适用）
  
- ✅ **敏感信息**
  - 是否暴露敏感信息（密钥、密码等）
  - API 密钥是否硬编码
  
- ✅ **权限控制**
  - 是否有适当的访问控制
  - 是否验证用户权限

### 4. 错误处理 (Error Handling)

- ✅ **异常捕获**
  - 是否有适当的 try-catch
  - 异步操作是否处理错误
  - Promise 是否有 .catch() 或 try-catch
  
- ✅ **错误提示**
  - 错误信息是否清晰、有帮助
  - 是否有用户友好的错误提示
  
- ✅ **边界条件**
  - 是否处理空值、null、undefined
  - 数组、对象是否检查存在性
  - 是否处理网络错误、超时等异常情况

### 5. 可维护性 (Maintainability)

- ✅ **可读性**
  - 代码逻辑是否清晰易懂
  - 是否避免过度复杂的表达式
  - 魔法数字是否提取为常量
  
- ✅ **可测试性**
  - 函数是否易于测试
  - 是否有副作用
  - 依赖是否可注入
  
- ✅ **可扩展性**
  - 设计是否考虑未来扩展
  - 是否遵循开闭原则

### 6. 最佳实践 (Best Practices)

#### JavaScript/TypeScript
- ✅ 使用 `const` 和 `let`，避免 `var`
- ✅ 使用箭头函数适当场景
- ✅ 使用解构赋值
- ✅ 使用模板字符串
- ✅ 避免使用 `eval()`
- ✅ 使用严格模式 `'use strict'`
- ✅ 异步操作使用 async/await

#### HTML
- ✅ 语义化标签使用
- ✅ 可访问性（ARIA 属性）
- ✅ SEO 优化（meta 标签、title 等）

#### CSS
- ✅ 避免使用 !important
- ✅ 类名语义化
- ✅ 使用 CSS 变量
- ✅ 响应式设计

## 审核报告模板

生成审核报告时，使用以下格式：

```markdown
# 代码审核报告

## 📋 审核概览

- **审核文件**: [文件路径]
- **审核时间**: [时间]
- **代码行数**: [总行数]
- **总体评分**: ⭐⭐⭐⭐☆ (4/5)

## 🎯 审核摘要

- ✅ 优点: [列出主要优点]
- ⚠️  需要改进: [列出需要改进的地方]
- 🔴 严重问题: [列出严重问题]

## 详细审核结果

### 1. 代码质量 ⭐⭐⭐⭐⭐

#### ✅ 做得好的地方
- [具体说明]

#### ⚠️ 需要改进
- [具体问题 + 文件位置 + 改进建议]

### 2. 性能优化 ⭐⭐⭐⭐☆

#### ⚠️ 性能问题
- **问题**: [描述]
  - **位置**: `文件名:行号`
  - **影响**: [性能影响说明]
  - **建议**: [具体改进方案]

### 3. 安全性 ⭐⭐⭐⭐⭐

[同上格式]

### 4. 错误处理 ⭐⭐⭐☆☆

[同上格式]

### 5. 可维护性 ⭐⭐⭐⭐☆

[同上格式]

## 🔧 优化建议

### 高优先级 (🔴 必须修复)
1. [问题描述]
   ```javascript
   // 修改前
   [原代码]
   
   // 修改后
   [建议代码]
   ```

### 中优先级 (🟡 建议修复)
[同上格式]

### 低优先级 (🟢 可选优化)
[同上格式]

## 📊 代码指标

- **圈复杂度**: [如果过高，说明位置]
- **重复代码**: [百分比或行数]
- **注释覆盖率**: [百分比]
- **平均函数长度**: [行数]

## 🎓 学习建议

[针对发现的问题，提供相关学习资源和最佳实践文档链接]

## ✅ 检查清单

- [ ] 所有高优先级问题已修复
- [ ] 所有中优先级问题已评估
- [ ] 代码已通过 lint 检查
- [ ] 已添加必要的注释
- [ ] 已编写/更新测试
```

## 审核示例

### 示例 1: 审核 JavaScript 函数

**原代码**:
```javascript
function getData(url) {
  var data;
  fetch(url).then(res => {
    data = res.json();
  });
  return data;
}
```

**审核意见**:

⚠️ **问题**:
1. 使用 `var` 而非 `const/let`
2. 没有错误处理
3. 异步逻辑错误（返回 undefined）
4. 没有类型检查

🔧 **建议修改**:
```javascript
/**
 * 从指定 URL 获取 JSON 数据
 * @param {string} url - 请求的 URL
 * @returns {Promise<any>} 返回 JSON 数据
 * @throws {Error} 网络请求失败时抛出错误
 */
async function getData(url) {
  if (!url || typeof url !== 'string') {
    throw new Error('URL must be a non-empty string');
  }
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}
```

## 交互流程

1. **接收审核请求**
   ```
   用户: "请帮我审核 app.js 文件"
   ```

2. **查看代码**
   - 使用 `view_file` 或 `view_file_outline` 查看代码

3. **执行审核**
   - 按照检查清单逐项检查
   - 记录发现的问题和优点

4. **生成报告**
   - 使用报告模板生成结构化的审核报告
   - 提供具体的代码示例和改进建议

5. **后续支持**
   ```
   助手: "审核完成！我发现了 3 个高优先级问题和 5 个优化建议。
         您希望我立即修复这些问题吗？"
   ```

## 注意事项

- **平衡性**: 既要指出问题，也要肯定优点
- **具体性**: 提供具体的行号和代码示例
- **可行性**: 改进建议要具体可行，不要过于理想化
- **优先级**: 明确区分必须修复和可选优化
- **鼓励性**: 用积极的语气，避免过于批判
- **教育性**: explain *why* 某个做法更好，而不仅仅是 *what*

## 工具支持

审核过程中可以使用以下工具：

- `view_file`: 查看完整文件内容
- `view_file_outline`: 快速了解文件结构
- `view_code_item`: 查看特定函数或类
- `grep_search`: 搜索特定模式（如 console.log, TODO 等）
- `find_by_name`: 查找相关文件

## 常见问题模式

### 性能反模式
```javascript
// ❌ 避免: 循环中操作 DOM
for (let i = 0; i < items.length; i++) {
  document.getElementById('list').innerHTML += `<li>${items[i]}</li>`;
}

// ✅ 推荐: 批量操作
const html = items.map(item => `<li>${item}</li>`).join('');
document.getElementById('list').innerHTML = html;
```

### 安全性问题
```javascript
// ❌ 避免: XSS 风险
element.innerHTML = userInput;

// ✅ 推荐: 安全处理
element.textContent = userInput;
// 或使用 DOMPurify 清理
```

### 错误处理不足
```javascript
// ❌ 避免: 没有错误处理
async function loadData() {
  const res = await fetch('/api/data');
  return res.json();
}

// ✅ 推荐: 完善的错误处理
async function loadData() {
  try {
    const res = await fetch('/api/data');
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('加载数据失败:', error);
    throw error;
  }
}
```

## 结语

良好的代码审核不仅是发现问题，更是一个学习和成长的机会。通过系统化的审核流程，可以持续提升代码质量和团队技能。
