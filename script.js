document.addEventListener('DOMContentLoaded', function () {

    /* ── Elements ── */

    var openingLayer  = document.getElementById('opening-layer');
    var openingVideo  = document.getElementById('opening-video');
    var gogogoLayer   = document.getElementById('gogogo-layer');
    var gogogoBtn     = document.getElementById('gogogo-btn');
    var redTestLayer  = document.getElementById('red-test-layer');
    var storyCont     = document.getElementById('story-container');

    var questionArea  = document.getElementById('test-question-area');
    var questionText  = document.getElementById('test-question-text');
    var ansBtns       = document.querySelectorAll('.test-ans-btn');
    var commentArea   = document.getElementById('test-comment-area');
    var commentText   = document.getElementById('test-comment-text');
    var finishArea    = document.getElementById('test-finish-area');
    var enterBtn      = document.getElementById('test-enter-btn');
    var dots          = document.querySelectorAll('#test-progress-bar .progress-dot');

    /* ── Test Questions ── */

    var QUESTIONS = [
        {
            q: '在拥挤的地铁车厢里，你通常会怎么做？',
            a: '戴上耳机，把音量开到最大，与世隔绝。',
            b: '观察周围人的表情和动作，猜测他们的故事。',
            comment: '选A的人用噪音对抗噪音，选B的人用冷漠伪装好奇。本质都一样——你们都不属于这里。'
        },
        {
            q: '你更倾向于如何理解这个世界？',
            a: '用自己的直觉和感受去冲撞它。',
            b: '保持距离，像研究者一样冷静地分析它。',
            comment: '冲撞者迟早会疲惫，分析者永远在岸上。没有一种方式能让你真正触碰真实。'
        },
        {
            q: '关于爱，你更认同哪一种描述？',
            a: '爱是纯粹的，容不下任何世俗的妥协。',
            b: '爱需要经营，相互理解才是常态。',
            comment: '纯粹是危险的偏执，妥协是温和的麻木。你们对爱的想象，都窄得可怜。'
        }
    ];

    var currentQ      = 0;

    /* ── Step 1: Video → GOGOGO ── */

    openingVideo.addEventListener('ended', function () {
        openingLayer.style.display = 'none';
        gogogoLayer.classList.add('show');
    });

    /* fallback: if video fails, show gogogo after 6s */
    openingVideo.addEventListener('error', function () {
        openingLayer.style.display = 'none';
        gogogoLayer.classList.add('show');
    });
    setTimeout(function () {
        if (gogogoLayer.classList.contains('show')) return;
        openingLayer.style.display = 'none';
        gogogoLayer.classList.add('show');
    }, 7000);

    var playPromise = openingVideo.play();
    if (playPromise) {
        playPromise.catch(function () {
            openingLayer.style.display = 'none';
            gogogoLayer.classList.add('show');
        });
    }

    /* ── Step 2: GOGOGO → Red Test ── */

    gogogoBtn.addEventListener('click', function () {
        gogogoLayer.classList.remove('show');
        redTestLayer.classList.add('show');
        currentQ = 0;
        showQuestion(0);
    });

    /* ── Test Logic ── */

    function showQuestion(index) {
        var q = QUESTIONS[index];

        /* update progress dots */
        dots.forEach(function (dot, i) {
            dot.classList.toggle('active', i <= index);
        });

        questionText.textContent = q.q;
        ansBtns[0].textContent = 'A. ' + q.a;
        ansBtns[1].textContent = 'B. ' + q.b;

        /* reset button states */
        ansBtns.forEach(function (btn) {
            btn.disabled = false;
            btn.classList.remove('selected');
        });

        /* hide comment and finish, show question */
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

    /* ── Answer click ── */

    ansBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (btn.disabled) return;

            /* lock & highlight */
            ansBtns.forEach(function (b) {
                b.disabled = true;
            });
            btn.classList.add('selected');

            showComment(currentQ);

            /* auto-advance after 2s to next question or finish */
            setTimeout(function () {
                currentQ++;
                if (currentQ < QUESTIONS.length) {
                    showQuestion(currentQ);
                } else {
                    showFinish();
                }
            }, 2200);
        });
    });

    /* ── Step 3: Enter Studio → Story ── */

    enterBtn.addEventListener('click', function () {
        redTestLayer.classList.remove('show');
        storyCont.classList.add('show');
        document.body.style.overflow = 'auto';
    });

});
