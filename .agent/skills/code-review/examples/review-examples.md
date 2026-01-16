# 代码审核示例

## 示例 1: JavaScript 函数审核

### 原始代码
```javascript
// user-service.js
function getUsers() {
  var users = [];
  fetch('/api/users').then(function(response) {
    users = response.json();
  });
  return users;
}
```

### 审核报告

#### 问题清单

1. **🔴 高优先级 - 异步逻辑错误**
   - **问题**: 函数立即返回空数组，不等待异步操作完成
   - **影响**: 功能完全无法正常工作
   - **位置**: `user-service.js:4-6`

2. **🟡 中优先级 - 使用 var**
   - **问题**: 使用过时的 `var` 声明变量
   - **建议**: 使用 `const` 或 `let`

3. **🟡 中优先级 - 缺少错误处理**
   - **问题**: 网络请求没有错误处理
   - **风险**: 请求失败时用户无法获得反馈

4. **🟢 低优先级 - 缺少注释**
   - **建议**: 添加 JSDoc 注释

#### 改进方案

```javascript
/**
 * 获取用户列表
 * @returns {Promise<Array<User>>} 用户数组
 * @throws {Error} 当请求失败时抛出错误
 */
async function getUsers() {
  try {
    const response = await fetch('/api/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('获取用户列表失败:', error);
    throw error;
  }
}
```

---

## 示例 2: React 组件审核

### 原始代码
```javascript
// UserList.jsx
import React from 'react';

function UserList() {
  const [users, setUsers] = React.useState([]);
  
  fetch('/api/users')
    .then(res => res.json())
    .then(data => setUsers(data));
  
  return (
    <div>
      <h1>Users</h1>
      {users.map(user => 
        <div onClick={() => alert(user.name)}>
          {user.name} - {user.email}
        </div>
      )}
    </div>
  );
}
```

### 审核报告

#### 问题清单

1. **🔴 高优先级 - 无限循环**
   - **问题**: 每次渲染都会发起新的 fetch 请求
   - **影响**: 导致无限循环，严重性能问题
   - **位置**: `UserList.jsx:6-8`

2. **🔴 高优先级 - 缺少 key 属性**
   - **问题**: map 渲染列表没有 key
   - **影响**: React 性能问题，可能导致渲染错误

3. **🟡 中优先级 - 缺少加载状态**
   - **问题**: 没有处理加载和错误状态
   - **影响**: 用户体验差

4. **🟡 中优先级 - 不符合可访问性标准**
   - **问题**: 使用 div 作为可点击元素
   - **建议**: 使用 button 标签

#### 改进方案

```javascript
import React, { useState, useEffect } from 'react';

/**
 * 用户列表组件
 */
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        
        if (!response.ok) {
          throw new Error('获取用户列表失败');
        }
        
        const data = await response.json();
        
        if (isMounted) {
          setUsers(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    fetchUsers();
    
    // 清理函数，防止内存泄漏
    return () => {
      isMounted = false;
    };
  }, []); // 空依赖数组，仅在组件挂载时执行
  
  const handleUserClick = (userName) => {
    alert(userName);
  };
  
  if (loading) {
    return <div className="loading">加载中...</div>;
  }
  
  if (error) {
    return <div className="error">错误: {error}</div>;
  }
  
  return (
    <div className="user-list">
      <h1>用户列表</h1>
      {users.length === 0 ? (
        <p>暂无用户数据</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <button 
                onClick={() => handleUserClick(user.name)}
                className="user-item"
              >
                <span className="user-name">{user.name}</span>
                <span className="user-email">{user.email}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
```

---

## 示例 3: CSS 审核

### 原始代码
```css
/* styles.css */
.card {
  width: 300px;
  height: 200px;
  background-color: white;
  margin: 10px;
}

.card:hover {
  background-color: lightblue !important;
}

.title {
  font-size: 20px;
  color: black;
  margin: 5px;
}
```

### 审核报告

#### 问题清单

1. **🟡 中优先级 - 使用 !important**
   - **问题**: 滥用 !important 降低可维护性
   - **位置**: `styles.css:9`

2. **🟡 中优先级 - 硬编码值**
   - **问题**: 没有使用 CSS 变量，难以主题化
   - **建议**: 使用 CSS 自定义属性

3. **🟢 低优先级 - 缺少响应式设计**
   - **建议**: 添加媒体查询或使用相对单位

#### 改进方案

```css
/* 定义 CSS 变量 */
:root {
  --card-width: 300px;
  --card-height: 200px;
  --color-bg: #ffffff;
  --color-bg-hover: #add8e6;
  --color-text: #000000;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --font-size-title: 1.25rem;
  --transition-normal: 0.3s ease;
}

.card {
  width: var(--card-width);
  height: var(--card-height);
  background-color: var(--color-bg);
  margin: var(--spacing-md);
  transition: background-color var(--transition-normal);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card:hover {
  background-color: var(--color-bg-hover);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.title {
  font-size: var(--font-size-title);
  color: var(--color-text);
  margin: var(--spacing-sm);
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .card {
    width: 100%;
    margin: var(--spacing-sm);
  }
  
  .title {
    font-size: 1rem;
  }
}
```

---

## 审核技巧

### 1. 查找常见问题

使用 grep 搜索潜在问题：

```bash
# 查找 console.log（生产环境应移除）
grep -r "console.log" src/

# 查找 TODO 注释
grep -r "TODO" src/

# 查找使用 var
grep -r "var " src/

# 查找 !important
grep -r "!important" src/
```

### 2. 检查文件结构

```bash
# 查看项目结构
tree -L 3 -I 'node_modules|dist|build'

# 查找大文件
find . -type f -size +100k
```

### 3. 代码复杂度检查

复杂度过高的函数（嵌套超过3层）：
```javascript
// ❌ 复杂度过高
function processData(data) {
  if (data) {
    if (data.items) {
      for (let item of data.items) {
        if (item.active) {
          if (item.value > 0) {
            // 处理逻辑
          }
        }
      }
    }
  }
}

// ✅ 重构后
function processData(data) {
  if (!data?.items) return;
  
  const activeItems = data.items.filter(item => item.active && item.value > 0);
  activeItems.forEach(processItem);
}

function processItem(item) {
  // 处理逻辑
}
```
