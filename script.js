(function () {

    "use strict";

    /* ════════════════════════════════════════
       Video → Main Stage Transition
       ════════════════════════════════════════ */

    var video       = document.getElementById('opening-video');
    var videoShell  = document.getElementById('video-splash');
    var skipHint    = document.getElementById('skip-hint');
    var transFired  = false;

    function transitionToMain() {
        if (transFired) return;
        transFired = true;
        videoShell.classList.add('fade-out');
    }

    video.addEventListener('ended', transitionToMain);

    video.addEventListener('error', function () {
        setTimeout(transitionToMain, 600);
    });

    var hintTimer = setTimeout(function () {
        if (!transFired) {
            skipHint.classList.add('show');
        }
    }, 2500);

    skipHint.addEventListener('click', function () {
        transitionToMain();
    });

    setTimeout(function () {
        clearTimeout(hintTimer);
        transitionToMain();
    }, 7000);

    var playPromise = video.play();
    if (playPromise) {
        playPromise.catch(function () {
            skipHint.classList.add('show');
        });
    }

    /* ════════════════════════════════════════
       Cat Point — alert
       ════════════════════════════════════════ */

    var CAT_QUOTES = [
        "[默黑猫]: 它离我远点，也离你远点。我们各玩各的。",
        "[默黑猫]: 房间收拾得再井井有条，也只是看起来美而已。这里没有生活，只有我对自己无处安放的控制欲。",
        "[默黑猫]: 我喜欢它，因为它不需要我随时去夸赞，我也讨厌被别人夸赞。"
    ];

    document.getElementById('cat-point').addEventListener('click', function () {
        alert(CAT_QUOTES[Math.floor(Math.random() * CAT_QUOTES.length)]);
    });

    /* ════════════════════════════════════════
       Overlay Panels — Dialog Monologues
       ════════════════════════════════════════ */

    var PANEL_MONOLOGUES = {
        flag: "[默黑猫]: 别用你们那套贫瘠的繁衍逻辑来审视我。我的爱和我的恨一样，只向最纯粹的灵魂开放。这面旗帜是我在这口枯井里，唯一允许保留的、刺眼的浪漫。",
        books: "[默黑猫]: 我在看人类学，因为只有把自己抽离成一个\u201C田野调查者\u201D，我才能忍受你们的愚蠢和聒噪。在我的眼里，你们所谓的社会秩序，不过是一场充满原始巫术和现代虚伪的集体降神会。",
        speaker: "[默黑猫]: 房间很安静？不，我把摇滚乐开到了最大声，只不过它只在我的脑子里轰鸣。吉他的失真和鼓点的暴烈，是我对这个无聊世界唯一的、合法的砸碎仪式。"
    };

    var panelDialog      = document.getElementById('panel-dialog');
    var panelDialogText  = document.getElementById('panel-dialog-text');
    var panelDialogClose = document.getElementById('panel-dialog-close');

    function openPanelDialog(text) {
        panelDialogText.textContent = text;
        panelDialog.classList.add('active');
    }

    function closePanelDialog() {
        panelDialog.classList.remove('active');
    }

    document.querySelectorAll('.overlay-panel').forEach(function (panel) {
        panel.addEventListener('click', function () {
            var key = this.getAttribute('data-panel');
            openPanelDialog(PANEL_MONOLOGUES[key]);
        });
    });

    panelDialogClose.addEventListener('click', closePanelDialog);

    panelDialog.addEventListener('click', function (e) {
        if (e.target === this) {
            closePanelDialog();
        }
    });

    /* ════════════════════════════════════════
       Computer Point — Turing Test
       ════════════════════════════════════════ */

    var QUESTIONS = [
        {
            q: "你走进这个房间，目光最先落在哪里？",
            a: "那只猫",
            b: "桌上的手账本",
            comment: "选猫的人渴望故事，选手账的人渴望秩序。都和我无关。"
        },
        {
            q: "桌上的冰茶正在融化，你觉得这代表什么？",
            a: "一切都在无可挽回地消逝",
            b: "只是一杯水而已，想多了",
            comment: "悲观的人急于下结论，务实的人拒绝感受。你们都很擅长为自己开脱。"
        },
        {
            q: "风扇的噪音让你想起什么？",
            a: "某个夏天的回忆",
            b: "什么也不想",
            comment: "沉溺过去和切断感受，都是同一种不面对当下的懦弱。"
        },
        {
            q: "如果这时有人敲门，你第一反应是？",
            a: "期待——终于有人来了",
            b: "紧张——别打扰我",
            comment: "渴望被找到的人，和害怕被发现的人，内心同样孤独。"
        },
        {
            q: "你点了这么多次，到底想从我这里得到什么？",
            a: "想了解你",
            b: "只是好奇，点着玩",
            comment: "真诚和轻浮，我都不领情。你的每一次点击，都只是我观察人类行为的样本。"
        }
    ];

    var FINAL_RESULT =
        "[测试结果]: 毫无意外，你依然是一个让我感到矛盾和厌烦的人类。" +
        "但感谢你浪费了生命中的两分钟来试图理解我。" +
        "现在，请继续保持安全距离。";

    var modal          = document.getElementById('turing-modal');
    var questionArea   = document.getElementById('question-area');
    var resultArea     = document.getElementById('result-area');
    var questionIdx    = document.getElementById('question-index');
    var questionText   = document.getElementById('question-text');
    var commentText    = document.getElementById('comment-text');
    var commentInline  = document.getElementById('comment-inline');
    var continueBtn    = document.getElementById('continue-btn');
    var resultText     = document.getElementById('result-text');
    var ansBtns        = document.querySelectorAll('.ans-btn');
    var closeBtn       = document.getElementById('close-btn');

    var currentStep    = 0;

    function resetAnswerUI() {
        ansBtns.forEach(function (btn) {
            btn.disabled = false;
            btn.classList.remove('selected');
        });
        commentInline.classList.remove('show');
        continueBtn.classList.remove('show');
    }

    function renderQuestion(index) {
        var q = QUESTIONS[index];
        questionIdx.textContent = (index + 1) + ' / ' + QUESTIONS.length;
        questionText.textContent = q.q;
        ansBtns[0].textContent = 'A. ' + q.a;
        ansBtns[1].textContent = 'B. ' + q.b;
        resultArea.classList.remove('active');
        resetAnswerUI();
        void questionArea.offsetWidth;
        questionArea.classList.add('active');
    }

    function showResult() {
        resultText.textContent = FINAL_RESULT;
        questionArea.classList.remove('active');
        resetAnswerUI();
        void resultArea.offsetWidth;
        resultArea.classList.add('active');
    }

    function openModal() {
        currentStep = 0;
        modal.classList.add('active');
        renderQuestion(0);
    }

    function closeModal() {
        questionArea.classList.remove('active');
        resultArea.classList.remove('active');
        resetAnswerUI();
        modal.classList.remove('active');
    }

    ansBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (btn.disabled) return;

            ansBtns.forEach(function (b) {
                b.disabled = true;
            });
            btn.classList.add('selected');

            commentText.textContent = QUESTIONS[currentStep].comment;
            commentInline.classList.add('show');
            continueBtn.classList.add('show');
        });
    });

    continueBtn.addEventListener('click', function () {
        currentStep++;
        if (currentStep < QUESTIONS.length) {
            renderQuestion(currentStep);
        } else {
            showResult();
        }
    });

    closeBtn.addEventListener('click', closeModal);

    document.getElementById('computer-point').addEventListener('click', openModal);

})();
