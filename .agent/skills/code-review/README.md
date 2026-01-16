# 代码审核 Skill 使用指南

## 📖 简介

这是一个全面的代码审核 skill，帮助 AI 助手系统化地审核代码质量，发现潜在问题，并提供专业的改进建议。

## 🎯 功能特点

- ✅ **多维度审核**：涵盖代码规范、性能、安全性、错误处理、可维护性等6大维度
- ✅ **结构化报告**：生成专业的审核报告，包含问题清单和改进建议
- ✅ **实用示例**：提供大量真实代码示例和改进方案
- ✅ **快速检查**：提供快速检查清单，高效完成审核任务
- ✅ **优先级标记**：明确区分高/中/低优先级问题

## 📁 文件结构

```
code-review/
├── SKILL.md              # 主要 skill 指令和审核流程
├── README.md             # 使用指南（本文件）
├── checklist.md          # 快速检查清单
└── examples/
    └── review-examples.md # 审核示例和最佳实践
```

## 🚀 使用方法

### 1. 基础使用

用户可以通过以下方式触发代码审核：

```
用户: "请帮我审核 app.js 文件"
用户: "帮我做一个代码审核"
用户: "检查一下这段代码的质量"
```

### 2. AI 助手响应流程

当用户请求代码审核时，AI 助手应该：

1. **查看文件内容**
   ```
   使用 view_file 或 view_file_outline 查看代码
   ```

2. **执行系统化审核**
   - 按照 SKILL.md 中的审核维度进行检查
   - 使用 checklist.md 确保全面覆盖
   - 参考 examples/ 中的示例

3. **生成审核报告**
   - 使用 SKILL.md 中的报告模板
   - 明确标注优先级（🔴🟡🟢）
   - 提供具体的代码示例

4. **提供后续支持**
   ```
   助手: "审核完成！我发现了 2 个高优先级问题需要修复。
         您希望我帮您修复这些问题吗？"
   ```

### 3. 高级用法

#### 审核特定维度
```
用户: "帮我检查一下这段代码的性能问题"
用户: "审核一下安全性"
```

#### 审核多个文件
```
用户: "审核 src/components/ 目录下的所有文件"
```

#### 对比审核
```
用户: "对比审核修改前后的代码"
```

## 📊 审核示例

### 示例 1: 简单函数审核

**用户请求**：
```
请审核这个函数：
function getUser(id) {
  return fetch('/api/users/' + id).then(r => r.json());
}
```

**AI 响应**：
```markdown
## 代码审核结果

### 发现的问题

🟡 **中优先级问题**：
1. 缺少错误处理
2. 没有输入验证
3. 使用字符串拼接而非模板字符串

### 改进建议

​```javascript
/**
 * 获取用户信息
 * @param {string|number} id - 用户ID
 * @returns {Promise<User>} 用户对象
 * @throws {Error} 当请求失败或ID无效时抛出错误
 */
async function getUser(id) {
  if (!id) {
    throw new Error('用户ID不能为空');
  }
  
  try {
    const response = await fetch(`/api/users/${id}`);
    
    if (!response.ok) {
      throw new Error(`获取用户失败: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('获取用户信息失败:', error);
    throw error;
  }
}
​```

您希望我应用这些改进吗？
```

## 🎓 审核维度说明

### 1. 代码质量 (Code Quality)
- 命名规范
- 代码格式
- 注释质量
- 函数设计
- 模块化
- DRY 原则

### 2. 性能优化 (Performance)
- 算法复杂度
- 资源管理
- 前端性能
- 数据处理

### 3. 安全性 (Security)
- 输入验证
- 敏感信息保护
- 权限控制

### 4. 错误处理 (Error Handling)
- 异常捕获
- 错误提示
- 边界条件

### 5. 可维护性 (Maintainability)
- 可读性
- 可测试性
- 可扩展性

### 6. 最佳实践 (Best Practices)
- 语言特性使用
- 框架约定
- 行业标准

## 💡 审核技巧

### 1. 优先级判断

- **🔴 高优先级（必须修复）**
  - 功能性 bug
  - 安全漏洞
  - 严重性能问题

- **🟡 中优先级（建议修复）**
  - 代码规范问题
  - 可维护性问题
  - 轻微性能问题

- **🟢 低优先级（可选优化）**
  - 代码风格改进
  - 最佳实践建议

### 2. 审核顺序

1. **快速扫描**（2-3分钟）
   - 文件大小和结构
   - 明显的问题
   - 代码风格

2. **深度审核**（10-15分钟）
   - 逻辑正确性
   - 错误处理
   - 性能问题
   - 安全风险

3. **细节优化**（5-10分钟）
   - 命名改进
   - 注释补充
   - 最佳实践

### 3. 报告撰写

- **具体性**：提供具体的行号和代码片段
- **可行性**：改进建议要具体可行
- **教育性**：解释为什么这样做更好
- **鼓励性**：既指出问题也肯定优点

## 🛠️ 工具辅助

审核过程中可以使用的命令：

```bash
# 查找常见问题
grep -r "console.log" src/          # 调试代码
grep -r "TODO" src/                 # 待办事项
grep -r "var " src/                 # 废弃的 var
grep -r "!important" src/           # CSS 问题

# 文件分析
find . -type f -size +100k          # 大文件
wc -l src/**/*.js                   # 代码行数
```

## 📈 评分标准

每个维度使用 1-5 星评分：

| 评分  | 说明                   |
| ----- | ---------------------- |
| ⭐     | 严重问题，需要重构     |
| ⭐⭐    | 多处问题，需要改进     |
| ⭐⭐⭐   | 基本可用，有优化空间   |
| ⭐⭐⭐⭐  | 质量良好，少量改进     |
| ⭐⭐⭐⭐⭐ | 优秀代码，符合最佳实践 |

**总体评分** = 各维度平均分

## 📚 相关资源

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)
- [Google Style Guides](https://google.github.io/styleguide/)
- [OWASP Security Guidelines](https://owasp.org/)
- [Web.dev Best Practices](https://web.dev/)

## 🔄 更新日志

### v1.0.0 (2026-01-16)
- ✅ 初始版本
- ✅ 完整的审核维度和检查清单
- ✅ 丰富的示例和最佳实践
- ✅ 结构化的报告模板

## 📝 反馈与改进

如果您有任何建议或发现问题，欢迎：
- 提出改进建议
- 补充审核维度
- 添加更多示例
- 优化检查清单

---

**祝您审核愉快！编写高质量代码！** 🚀
