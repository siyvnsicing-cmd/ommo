document.addEventListener('DOMContentLoaded', function () {

    /* ═══════════════════════════
       Elements
       ═══════════════════════════ */

    var openingLayer = document.getElementById('opening-layer');
    var openingVideo = document.getElementById('opening-video');
    var gogogoLayer  = document.getElementById('gogogo-layer');
    var gogogoBtn    = document.getElementById('gogogo-btn');
    var redTestLayer = document.getElementById('red-test-layer');
    var narrativeSt  = document.getElementById('narrative-stage');

    var questionArea = document.getElementById('test-question-area');
    var questionText = document.getElementById('test-question-text');
    var ansBtns      = document.querySelectorAll('.test-ans-btn');
    var commentArea  = document.getElementById('test-comment-area');
    var commentText  = document.getElementById('test-comment-text');
    var finishArea   = document.getElementById('test-finish-area');
    var enterBtn     = document.getElementById('test-enter-btn');
    var dots         = document.querySelectorAll('#test-progress-bar .progress-dot');

    /* ═══════════════════════════
       Test Data
       ═══════════════════════════ */

    var QUESTIONS = [
        { q: '在拥挤的地铁车厢里，你通常会怎么做？', a: '戴上耳机，把音量开到最大，与世隔绝。', b: '观察周围人的表情和动作，猜测他们的故事。', comment: '选A的人用噪音对抗噪音，选B的人用冷漠伪装好奇。本质都一样——你们都不属于这里。' },
        { q: '你更倾向于如何理解这个世界？', a: '用自己的直觉和感受去冲撞它。', b: '保持距离，像研究者一样冷静地分析它。', comment: '冲撞者迟早会疲惫，分析者永远在岸上。没有一种方式能让你真正触碰真实。' },
        { q: '关于爱，你更认同哪一种描述？', a: '爱是纯粹的，容不下任何世俗的妥协。', b: '爱需要经营，相互理解才是常态。', comment: '纯粹是危险的偏执，妥协是温和的麻木。你们对爱的想象，都窄得可怜。' }
    ];

    var currentQ = 0;

    /* ═══════════════════════════
       Step 1: Video → GOGOGO
       ═══════════════════════════ */

    function showGogogo() {
        openingLayer.style.display = 'none';
        gogogoLayer.classList.add('show');
    }

    openingVideo.addEventListener('ended', showGogogo);
    openingVideo.addEventListener('error', showGogogo);

    setTimeout(function () {
        if (!gogogoLayer.classList.contains('show')) showGogogo();
    }, 7000);

    var playPromise = openingVideo.play();
    if (playPromise) {
        playPromise.catch(showGogogo);
    }

    /* ═══════════════════════════
       Step 2: GOGOGO → Red Test
       ═══════════════════════════ */

    gogogoBtn.addEventListener('click', function () {
        gogogoLayer.classList.remove('show');
        redTestLayer.classList.add('show');
        currentQ = 0;
        showQuestion(0);
    });

    function showQuestion(index) {
        var q = QUESTIONS[index];
        dots.forEach(function (d, i) { d.classList.toggle('active', i <= index); });
        questionText.textContent = q.q;
        ansBtns[0].textContent = 'A. ' + q.a;
        ansBtns[1].textContent = 'B. ' + q.b;
        ansBtns.forEach(function (b) { b.disabled = false; b.classList.remove('selected'); });
        commentArea.classList.remove('show');
        finishArea.classList.remove('show');
        questionArea.classList.remove('hidden');
    }

    function showComment(index) {
        commentText.textContent = QUESTIONS[index].comment;
        questionArea.classList.add('hidden');
        commentArea.classList.add('show');
    }

    function showFinish() {
        commentArea.classList.remove('show');
        finishArea.classList.add('show');
    }

    ansBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (btn.disabled) return;
            ansBtns.forEach(function (b) { b.disabled = true; });
            btn.classList.add('selected');
            showComment(currentQ);
            setTimeout(function () {
                currentQ++;
                if (currentQ < QUESTIONS.length) showQuestion(currentQ);
                else showFinish();
            }, 2200);
        });
    });

    /* ═══════════════════════════
       Step 3: Enter → Narrative
       ═══════════════════════════ */

    enterBtn.addEventListener('click', function () {
        redTestLayer.classList.remove('show');
        narrativeSt.classList.add('show');
        showScene1();
    });

    /* ═══════════════════════════
       Narrative: Scene 1
       ═══════════════════════════ */

    var scene1       = document.getElementById('scene-1');
    var scene1Text   = document.querySelector('#scene-1 .scene-text-block');
    var scene1Btn    = document.getElementById('scene1-btn');
    var scene1Ready  = false;

    function showScene1() {
        document.querySelectorAll('.narrative-scene').forEach(function (s) { s.classList.remove('active'); });
        scene1.classList.add('active');
        scene1Text.classList.remove('show');
        scene1Btn.classList.remove('show');
        scene1Ready = false;
    }

    /* first click on scene 1 → reveal text + button */
    scene1.addEventListener('click', function (e) {
        if (scene1Ready) return;
        if (e.target === scene1Btn) return;
        scene1Ready = true;
        scene1Text.classList.add('show');
        scene1Btn.classList.add('show');
    });

    /* button click → erase transition → scene 2 */
    scene1Btn.addEventListener('click', function () {
        scene1.classList.add('erase-out');
        setTimeout(function () {
            scene1.classList.remove('active', 'erase-out');
            showScene2();
        }, 700);
    });

    /* ═══════════════════════════
       Narrative: Scene 2
       ═══════════════════════════ */

    var scene2       = document.getElementById('scene-2');
    var scene2Text   = document.querySelector('#scene-2 .scene-text-block');
    var scene2Btn    = document.getElementById('scene2-btn');
    var scene2Locked = true;

    function showScene2() {
        scene2.classList.add('active');
        scene2Text.classList.add('show');
        scene2Btn.disabled = true;
        scene2Btn.textContent = '请等待 8 秒';
        scene2Btn.classList.add('show');
        scene2Locked = true;

        setTimeout(function () {
            scene2Btn.disabled = false;
            scene2Btn.textContent = '下一页 →';
            scene2Locked = false;
        }, 8000);
    }

    scene2Btn.addEventListener('click', function () {
        if (scene2Locked) return;
        scene2.classList.add('erase-out');
        setTimeout(function () {
            scene2.classList.remove('active', 'erase-out');
            showScene3();
        }, 700);
    });

    /* ═══════════════════════════
       Narrative: Scene 3
       ═══════════════════════════ */

    function showScene3() {
        document.getElementById('scene-3').classList.add('active');
    }

});
