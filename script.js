document.addEventListener('DOMContentLoaded', () => {
    const openingLayer = document.getElementById('opening-layer');
    const openingVideo = document.getElementById('opening-video');
    const flashLayer = document.getElementById('flash-text-layer');
    const storyContainer = document.getElementById('story-container');

    // 监听开场动画结束
    openingVideo.addEventListener('ended', () => {
        // 1. 动画视频瞬间消失
        openingLayer.style.opacity = '0';
        
        setTimeout(() => {
            openingLayer.style.display = 'none';
            
            // 2. 瞬间弹显“我不讨厌你”全屏黑底白字层
            flashLayer.style.display = 'flex';
            
            // 3. 严格强制停留 1 秒（1000毫秒）后，没有任何过渡，直接抹除
            setTimeout(() => {
                flashLayer.style.display = 'none'; // 一下子消失
                
                // 4. 显示后面的场景主页，露出无毛玻璃的纯净背景图
                storyContainer.style.opacity = '1';
            }, 1000); 

        }, 300); // 给动画层留一点点丝滑淡出的残影时间
    });
});