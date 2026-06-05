document.addEventListener('DOMContentLoaded', () => {
    const openingLayer = document.getElementById('opening-layer');
    const openingVideo = document.getElementById('opening-video');
    const flashLayer = document.getElementById('flash-text-layer');
    const storyContainer = document.getElementById('story-container');

    // 监听开场动画结束
    openingVideo.addEventListener('ended', () => {
        // 1. 动画视频瞬间消失
        openingLayer.style.display = 'none';
        
        // 2. 瞬间弹显“我不讨厌你”全屏黑底白字层
        flashLayer.style.display = 'flex';
        
        // 3. 严格强制停留 1 秒（1000毫秒）后，彻底毁灭闪现层
        setTimeout(() => {
            // 【核心修复】不仅隐藏，还要彻底从布局中抹去，绝不阻挡鼠标
            flashLayer.style.display = 'none'; 
            
            // 4. 让后面的场景主页显现
            storyContainer.style.opacity = '1';
            
            // 【核心修复】重新激活滚动和点击功能
            document.body.style.overflow = 'auto'; 
            storyContainer.style.pointerEvents = 'auto';
            
        }, 1000); 
    });
});