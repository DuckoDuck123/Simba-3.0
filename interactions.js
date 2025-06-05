// interactions.js - 鼠标互动效果

// 节流函数
function throttle(fn, wait) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= wait) {
            fn.apply(this, args);
            lastTime = now;
        }
    };
}

// 点击涟漪效果
document.addEventListener('click', function(e) {
    const ripple = document.createElement('div');
    ripple.classList.add('click-ripple');
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
});

// 视差效果（节流优化）
document.addEventListener('mousemove', throttle(function(e) {
    const moveX = (e.clientX - window.innerWidth / 2) / 30;
    const moveY = (e.clientY - window.innerHeight / 2) / 30;
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        gsap.to(heroContent, {
            x: moveX,
            y: moveY,
            duration: 1
        });
    }
    
    const gridItems = document.querySelectorAll('.portfolio-item, .about-item');
    gridItems.forEach(item => {
        const depth = parseFloat(item.getAttribute('data-depth') || Math.random() * 0.5 + 0.3);
        gsap.to(item, {
            x: moveX * depth,
            y: moveY * depth,
            duration: 2
        });
    });
}, 100));

// 添加页面过渡效果
const pageTransition = document.createElement('div');
pageTransition.classList.add('page-transition');
document.body.appendChild(pageTransition);

document.querySelectorAll('a').forEach(link => {
    if (link.hostname === window.location.hostname) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') || href.startsWith('javascript')) return;
            
            e.preventDefault();
            gsap.to(pageTransition, {
                y: 0,
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: () => {
                    window.location.href = href;
                }
            });
        });
    }
});

window.addEventListener('load', () => {
    gsap.to(pageTransition, {
        y: '100%',
        duration: 0.5,
        ease: 'power2.inOut'
    });
});

// 添加3D卡片倾斜效果
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".portfolio-item, .about-item"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        scale: 1.05
    });
}

// 添加滚动动画
const animateOnScroll = throttle(() => {
    const elements = document.querySelectorAll('.portfolio-item, .about-item, .hero-content, h1, h2');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight * 0.8 && elementBottom > 0) {
            element.classList.add('visible');
            
            if (element.classList.contains('portfolio-item') || element.classList.contains('about-item')) {
                if (!element.style.animationDelay) {
                    const delay = Math.random() * 0.5;
                    element.style.animationDelay = `${delay}s`;
                }
            }
        }
    });
}, 100);

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// 添加手机端震动反馈
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('nav ul li a');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        if ('vibrate' in navigator) {
            navigator.vibrate(50); // 短促震动 50ms
        }
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            if ('vibrate' in navigator) {
                navigator.vibrate(30); // 更短促震动 30ms
            }
        }
    });
});
