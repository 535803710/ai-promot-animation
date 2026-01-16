/**
 * Cosmic Trails - 交互式粒子轨道动画
 * 原理：基于 Canvas 的 2D 粒子系统，使用三角函数模拟轨道运动，
 * 并通过半透明背景实现动态拖尾效果。
 */

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

var RADIUS = 70; // 基础半径
var RADIUS_SCALE = 1;
var RADIUS_SCALE_MIN = 1;
var RADIUS_SCALE_MAX = 1.5;

var QUANTITY = 25; // 粒子数量

var canvas;
var context;
var particles;

var mouseX = SCREEN_WIDTH * 0.5;
var mouseY = SCREEN_HEIGHT * 0.5;
var mouseIsDown = false;

function init() {
  canvas = document.getElementById("world");

  if (canvas && canvas.getContext) {
    context = canvas.getContext("2d");

    // 监听事件
    window.addEventListener("mousemove", documentMouseMoveHandler, false);
    window.addEventListener("mousedown", documentMouseDownHandler, false);
    window.addEventListener("mouseup", documentMouseUpHandler, false);
    document.addEventListener("touchstart", documentTouchStartHandler, false);
    document.addEventListener("touchmove", documentTouchMoveHandler, false);
    window.addEventListener("resize", windowResizeHandler, false);

    createParticles();
    windowResizeHandler();

    // 开始主循环
    setInterval(loop, 1000 / 60);
  }
}

function createParticles() {
  particles = [];

  for (var i = 0; i < QUANTITY; i++) {
    var particle = {
      size: 1,
      position: { x: mouseX, y: mouseY },
      offset: { x: 0, y: 0 },
      shift: { x: mouseX, y: mouseY },
      speed: 0.01 + Math.random() * 0.04,
      targetSize: 1,
      fillColor: "#" + ((Math.random() * 0x404040 + 0xaaaaaa) | 0).toString(16),
      orbit: RADIUS * 0.5 + RADIUS * 0.5 * Math.random(),
    };

    particles.push(particle);
  }
}

function documentMouseMoveHandler(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function documentMouseDownHandler(event) {
  mouseIsDown = true;
}

function documentMouseUpHandler(event) {
  mouseIsDown = false;
}

function documentTouchStartHandler(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouseX = event.touches[0].pageX;
    mouseY = event.touches[0].pageY;
  }
}

function documentTouchMoveHandler(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouseX = event.touches[0].pageX;
    mouseY = event.touches[0].pageY;
  }
}

function windowResizeHandler() {
  SCREEN_WIDTH = window.innerWidth;
  SCREEN_HEIGHT = window.innerHeight;

  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;
}

function loop() {
  // 轨道缩放平滑过渡
  if (mouseIsDown) {
    RADIUS_SCALE += (RADIUS_SCALE_MAX - RADIUS_SCALE) * 0.02;
  } else {
    RADIUS_SCALE -= (RADIUS_SCALE - RADIUS_SCALE_MIN) * 0.02;
  }

  RADIUS_SCALE = Math.min(RADIUS_SCALE, RADIUS_SCALE_MAX);

  // 绘制半透明层实现拖尾
  context.fillStyle = "rgba(0,0,0,0.06)";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  for (var i = 0, len = particles.length; i < len; i++) {
    var particle = particles[i];
    var lp = { x: particle.position.x, y: particle.position.y };

    // 旋转偏移更新
    particle.offset.x += particle.speed;
    particle.offset.y += particle.speed;

    // 带有延迟的跟随效果
    particle.shift.x += (mouseX - particle.shift.x) * particle.speed;
    particle.shift.y += (mouseY - particle.shift.y) * particle.speed;

    // 计算最终位置 (圆周运动)
    particle.position.x =
      particle.shift.x +
      Math.cos(i + particle.offset.x) * (particle.orbit * RADIUS_SCALE);
    particle.position.y =
      particle.shift.y +
      Math.sin(i + particle.offset.y) * (particle.orbit * RADIUS_SCALE);

    // 限制在屏幕内
    particle.position.x = Math.max(
      Math.min(particle.position.x, SCREEN_WIDTH),
      0
    );
    particle.position.y = Math.max(
      Math.min(particle.position.y, SCREEN_HEIGHT),
      0
    );

    // 尺寸平滑过渡
    particle.size += (particle.targetSize - particle.size) * 0.05;
    if (Math.round(particle.size) == Math.round(particle.targetSize)) {
      particle.targetSize = 1 + Math.random() * 7;
    }

    // 绘制粒子和连线
    context.beginPath();
    context.fillStyle = particle.fillColor;
    context.strokeStyle = particle.fillColor;
    context.lineWidth = particle.size;

    // Premium Glow: 发光效果
    context.shadowBlur = particle.size * 2;
    context.shadowColor = particle.fillColor;

    context.moveTo(lp.x, lp.y);
    context.lineTo(particle.position.x, particle.position.y);
    context.stroke();

    context.arc(
      particle.position.x,
      particle.position.y,
      particle.size / 2,
      0,
      Math.PI * 2,
      true
    );
    context.fill();

    // 重置发光
    context.shadowBlur = 0;
  }
}

window.onload = init;
