1. 视觉风格与配色方案 (Visual Style & Palette):

背景色: 深暗色调 (推荐 hsl(323, 21%, 16%))，营造出夜晚或赛博朋克的氛围。
霓虹主色: 极高饱和度的色彩 (推荐 hsl(317, 100%, 54%))。
整体氛围: 梦幻、复古赛博、具有发光感。
2. 核心元素设计 (Core Element Design):

按钮本体:
边框应使用霓虹主色，厚度约为 0.125em。
字体大小较大（约 4rem），并带有圆角。
使用 text-shadow 和 box-shadow（同时包含内外发光 inset）来模拟按钮本身的辉光。
地面反射效果 (The Floor Reflection):
使用 ::before 伪元素创建一个位于按钮下方的光斑。
关键技术: 结合 perspective(1em)、rotateX(40deg) 和 scale(1, 0.35) 进行三维形变，使其看起来像投射在地面上的反射影。
使用 filter: blur(1em) 增加光晕的柔和感。
3. 交互与动画细节 (Interaction & Animation):

光影填充 (The Fill Effect):
使用 ::after 伪元素作为背景遮罩，初始透明度为 0。
当悬停 (Hover) 或获得焦点 (Focus) 时，文字颜色变为背景色，且 ::after 的透明度迅速变为 1，实现颜色瞬间充满按钮的效果。
亮度增强:
悬停时，地面反射光斑（::before）的透明度应增加，模拟灯光增强的效果。
文字的 text-shadow 在填充后应移除，以保证在明亮背景下的可读性。
过渡效果: 填充过程应具有极短的线性过渡（约 100ms），模拟灯光开启的干脆感。
4. 布局与技术要求 (Technical Requirements):

使用 CSS 自定义属性 (--variables) 管理颜色。
采用 grid 或 flex 布局使按钮在页面正中央展示。
确保所有的尺寸使用 em 单位，以便按钮能够根据字号大小等比例缩放发光效果。
移除默认的 outline，并在交互态（:focus）下保持与悬停一致的视觉反馈。