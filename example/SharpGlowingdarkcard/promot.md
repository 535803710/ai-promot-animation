🎨 提示词 (Prompt)：锐利发光暗色卡片效果还原
任务目标： 请使用纯 HTML 和 CSS（允许使用现代 CSS 特性如 @property）创建一个具有高级视觉效果的“锐利发光暗色卡片”。

1. 核心视觉设计：

深色调主题： 基础底色使用深紫色/黑色调 hsl(260deg 100% 3%)。
字体： 使用 "Mona Sans" (可变字体)，字重范围 100-1000。
卡片规格： 宽度约为 35vw（最大 480px），长宽比为 1.5/1。
圆角： 大圆角设计，半径约为 3.6vw。
2. 关键技术实现 (CSS @property)： 为了实现平滑的属性动画，必须注册以下 CSS 自定义属性（Custom Properties）：

--hue: 数值类型，用于色彩循环。
--rotate, --bg-x, --bg-y, --bg-size: 用于背景和光晕的位置与大小控制。
--glow-opacity, --glow-blur, --glow-scale, --glow-radius, --glow-translate-y: 专门用于控制外部发光层的细节属性。
--white-shadow: 用于悬停时的投影脉冲效果。
3. HTML 结构：

一个主容器 card-container。
内部包含一个 glow 元素（用于外部重影及发光）。
内部包含一个 content 容器（用于显示文字，并带有动态渐变背景）。
文字中包含一个 badge 样式（带背景色的加粗标签）。
4. 动画与交互细节：

背景旋转动画 (rotate-bg)： 卡片内部背景通过 radial-gradient 实现，其中心点 (--bg-x, --bg-y) 沿着卡片边缘呈矩形轨迹平滑移动。
色相循环动画 (hue-animation)： 全局色彩在 0 到 360 度之间循环旋转。
光晕旋转 (rotate)： 外部发光元素 .glow 围绕中心旋转，并带有位移偏移。
悬停效果 (Hover)：
外部光晕 (.glow) 停止旋转，缩放比例增大，模糊度降低，呈现出更锐利、更明亮的边框感。
卡片内部背景缩放比例增加，动画暂停。
文字颜色变白。
触发一个名为 shadow-pulse 的关键帧动画，使卡片产生不规则频率的白色投影闪烁（模拟电力感）。
使用 mix-blend-mode: color-burn 和 darken 处理层级融合。
5. 渲染细节：

利用伪元素 (::before, ::after) 实现多层重叠效果。
光晕层需要使用 filter: blur() 进行羽化处理。
卡片投影采用多重阴影，结合 box-shadow 增强立体感。