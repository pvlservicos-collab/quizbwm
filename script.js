/* ===== QUIZ CLOSER 360 v4 — FLUXO SIMPLIFICADO ===== */
(function () {
  'use strict';

  /* ===== FLOW ===== */
  var flow = [
    { id: 'hero', type: 'hero' },

    { id: 'lp-forwho', type: 'lp-forwho' },
    { id: 'lp-capable', type: 'lp-capable' },
    { id: 'lp-agenda', type: 'static' },
    { id: 'lp-howworks', type: 'static' },
    { id: 'lp-authority', type: 'static' },
    { id: 'lp-results', type: 'static' },
    { id: 'loading', type: 'loading' },
    { id: 'result', type: 'result' }
  ];

  var QUIZ_STEPS = 3;

  /* ===== STATE ===== */
  var currentStep = 0;
  var isTransitioning = false;
  var capableSelected = [];

  var $ = function (id) { return document.getElementById(id); };

  /* ===== SUPABASE ===== */
  var _sb = null, _sid = null;
  var _SBURL = 'https://torigmjljedghnvtitvs.supabase.co';
  var _SBKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvcmlnbWpsamVkZ2hudnRpdHZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMzAwMjIsImV4cCI6MjA4NTkwNjAyMn0._02AKqv85F8IEt5A3LTlqHyxRGikuQxeSnJC29F_z6E';
  var _sbLoading = false, _sbQueue = [];

  function _uuid() {
    var d = Date.now();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
  function _device() {
    var ua = navigator.userAgent;
    if (/Mobi|Android/i.test(ua)) return 'mobile';
    if (/Tablet|iPad/i.test(ua)) return 'tablet';
    return 'desktop';
  }
  function _utms() {
    var p = new URLSearchParams(location.search);
    return { source: p.get('utm_source'), medium: p.get('utm_medium'), campaign: p.get('utm_campaign') };
  }
  function _loadSB(cb) {
    if (_sb) { cb(); return; }
    _sbQueue.push(cb);
    if (_sbLoading) return;
    _sbLoading = true;
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
    s.onload = function () {
      _sb = window.supabase.createClient(_SBURL, _SBKEY);
      var q = _sbQueue.slice(); _sbQueue = [];
      q.forEach(function (f) { try { f(); } catch (e) { } });
    };
    s.onerror = function () { _sbLoading = false; };
    document.head.appendChild(s);
  }
  function _track(fn) { _loadSB(function () { try { fn(); } catch (e) { } }); }

  /* ===== TRANSITIONS ===== */
  function transitionTo(sectionId) {
    return new Promise(function (resolve) {
      var current = document.querySelector('.section.active');
      var target = $(sectionId);
      if (current && current.id !== sectionId) {
        current.classList.add('leaving');
        current.addEventListener('animationend', function () {
          current.classList.remove('active', 'leaving');
          target.classList.add('active');
          target.scrollTop = 0;
          window.scrollTo({ top: 0, behavior: 'instant' });
          target.addEventListener('animationend', function () { resolve(); }, { once: true });
        }, { once: true });
      } else if (!current) {
        target.classList.add('active'); resolve();
      } else { resolve(); }
    });
  }

  function updateProgress(step) {
    $('progressFill').style.width = Math.min(100, Math.round(step / QUIZ_STEPS * 100)) + '%';
  }
  function showProgress() { $('globalProgress').classList.add('visible'); }
  function hideProgress() { $('globalProgress').classList.remove('visible'); }

  /* ===== AUDIO ===== */
  var _audioCtx = null;
  function _getAudioCtx() {
    if (!_audioCtx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (AC) _audioCtx = new AC();
    }
    if (_audioCtx && _audioCtx.state === 'suspended') _audioCtx.resume();
    return _audioCtx;
  }
  function playPop() {
    try {
      var ctx = _getAudioCtx(); if (!ctx) return;
      var t = ctx.currentTime;
      var o1 = ctx.createOscillator(), g1 = ctx.createGain();
      o1.connect(g1); g1.connect(ctx.destination);
      o1.type = 'sine'; o1.frequency.setValueAtTime(659, t);
      g1.gain.setValueAtTime(0.22, t); g1.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      o1.start(t); o1.stop(t + 0.18);
      var o2 = ctx.createOscillator(), g2 = ctx.createGain();
      o2.connect(g2); g2.connect(ctx.destination);
      o2.type = 'sine'; o2.frequency.setValueAtTime(880, t + 0.09);
      g2.gain.setValueAtTime(0, t); g2.gain.setValueAtTime(0.2, t + 0.09);
      g2.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      o2.start(t + 0.09); o2.stop(t + 0.3);
    } catch (e) { }
  }

  /* ===== RENDER LP-FORWHO ===== */
  function renderForwho() {
    var list = $('forwhoList');
    list.innerHTML = '';

    var options = [
      { emoji: '💼', text: 'CLT frustrado querendo transição pro digital' },
      { emoji: '📈', text: 'Vendedor travado que quer ganhar mais e ter direção' },
      { emoji: '🏠', text: 'Quem quer trabalhar home office e crescer por performance' },
      { emoji: '🎓', text: 'Quem quer entrar no digital sem depender de faculdade' },
      { emoji: '💬', text: 'Quem já tentou vender e se perdeu em script e improviso' },
      { emoji: '🔍', text: 'Quem quer conseguir a primeira vaga sem cair em furada' }
    ];

    var frag = document.createDocumentFragment();
    options.forEach(function (o, i) {
      var li = document.createElement('li');
      li.className = 'option-card';
      li.setAttribute('role', 'option'); li.setAttribute('tabindex', '0');
      li.innerHTML = '<span class="option-icon" aria-hidden="true">' + o.emoji + '</span><span class="option-text">' + o.text + '</span>';
      li.addEventListener('click', function () {
        if (isTransitioning) return;
        li.classList.add('selected');
        playPop();
        isTransitioning = true;
        setTimeout(function () { isTransitioning = false; advanceFlow(); }, 350);
      }, { passive: true });
      frag.appendChild(li);
      requestAnimationFrame(function () {
        li.style.transition = 'opacity .25s ease, transform .25s ease';
        li.style.transitionDelay = i * 50 + 'ms';
        li.classList.add('show');
      });
    });
    list.appendChild(frag);
  }

  /* ===== RENDER LP-CAPABLE ===== */
  function renderCapable() {
    var list = $('capableList');
    list.innerHTML = '';
    capableSelected = [];

    var options = [
      { emoji: '✓', text: 'Montar meu plano de carreira e metas pra chegar nos 10k/mês' },
      { emoji: '✓', text: 'Entender como conduzir uma call com mais controle e clareza' },
      { emoji: '✓', text: 'Usar um script testado e adaptar sem engessar a conversa' },
      { emoji: '✓', text: 'Responder objeções sem travar' },
      { emoji: '✓', text: 'Saber onde procurar vagas e como ser aprovado em processos seletivos' }
    ];

    var frag = document.createDocumentFragment();
    options.forEach(function (o, i) {
      var li = document.createElement('li');
      li.className = 'checkbox-option';
      li.innerHTML = '<span class="cb-emoji">' + o.emoji + '</span><span class="cb-text">' + o.text + '</span><span class="cb-check">✓</span>';
      li.addEventListener('click', function () {
        if (isTransitioning) return;
        li.classList.add('checked');
        capableSelected.push(i);
        playPop();
        isTransitioning = true;
        setTimeout(function () { isTransitioning = false; advanceFlow(); }, 350);
      }, { passive: true });
      frag.appendChild(li);
      requestAnimationFrame(function () {
        li.style.transition = 'opacity .25s ease, transform .25s ease';
        li.style.transitionDelay = i * 50 + 'ms';
        li.classList.add('show');
      });
    });
    list.appendChild(frag);
  }

  /* ===== ADVANCE / GO TO STEP ===== */
  function advanceFlow() {
    currentStep++;
    if (currentStep >= flow.length) return;
    goToStep(currentStep);
  }

  function goToStep(step) {
    currentStep = step;
    var screen = flow[step];
    if (step >= 1 && step <= QUIZ_STEPS) { showProgress(); updateProgress(step); }
    else { hideProgress(); }
    var activeSection = document.querySelector('.section.active');
    var sameSection = activeSection && activeSection.id === screen.id;
    if (sameSection) { renderScreenContent(screen); }
    else { transitionTo(screen.id).then(function () { renderScreenContent(screen); }); }
  }

  function renderScreenContent(screen) {
    if (screen.type === 'lp-forwho') renderForwho();
    else if (screen.type === 'lp-capable') renderCapable();
    else if (screen.type === 'loading') runLoading();
    else if (screen.type === 'result') showResult();
  }

  /* ===== SOCIAL PROOF ===== */
  var spCount = 347;
  setInterval(function () {
    spCount += Math.floor(Math.random() * 3) + 1;
    $('socialCount').textContent = spCount + ' pessoas fizeram esse quiz hoje';
  }, 4000 + Math.random() * 3000);

  /* ===== START ===== */
  function startQuiz() {
    playPop();
    _sid = _uuid();
    try { sessionStorage.setItem('quiz_sid', _sid); } catch (e) { }
    var u = _utms();
    _track(function () {
      _sb.from('quiz_sessions').insert({
        session_id: _sid, started_at: new Date().toISOString(),
        device_type: _device(), referrer: document.referrer || null,
        utm_source: u.source, utm_medium: u.medium, utm_campaign: u.campaign,
        user_agent: navigator.userAgent.slice(0, 200),
        created_date: new Date().toISOString().slice(0, 10),
        questions_answered: 0
      }).then(null, null);
    });
    advanceFlow();
  }

  /* ===== LOADING ===== */
  function runLoading() {
    var txts = [
      'Analisando seu perfil de Closer Digital...',
      'Comparando com +4.000 closers formados...',
      'Cruzando dados com o script que gerou +40 milhões...',
      'Montando seu relatório personalizado...'
    ];
    var durs = [1400, 1400, 1200, 1000];
    var elapsed = 0, totalDur = 5000;
    var lt = $('loadingText'), lb = $('loadingBarFill'), lp = $('loadingPct');
    txts.forEach(function (txt, i) {
      setTimeout(function () {
        lt.style.opacity = '0';
        setTimeout(function () { lt.textContent = txt; lt.style.opacity = '1'; }, 120);
      }, elapsed);
      elapsed += durs[i];
    });
    var startTime = null;
    function animate(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / totalDur, 1);
      var pct = Math.round(progress * 100);
      lb.style.width = pct + '%';
      lp.textContent = pct + '%';
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    setTimeout(function () { advanceFlow(); }, totalDur);
  }

  /* ===== CONFETTI ===== */
  function launchConfetti() {
    var container = $('confettiContainer');
    var colors = ['#10B981', '#059669', '#FBBF24', '#F59E0B', '#3B82F6', '#8B5CF6', '#EC4899'];
    for (var i = 0; i < 60; i++) {
      var piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.cssText = 'left:' + (Math.random() * 100) + '%;background:' + colors[Math.floor(Math.random() * colors.length)] + ';width:' + (Math.random() * 8 + 6) + 'px;height:' + (Math.random() * 8 + 6) + 'px;border-radius:' + (Math.random() > .5 ? '50%' : '2px') + ';animation-duration:' + (Math.random() * 2 + 2) + 's;animation-delay:' + (Math.random() * 1.5) + 's';
      container.appendChild(piece);
    }
    setTimeout(function () { container.innerHTML = ''; }, 5000);
  }

  /* ===== GAUGES ===== */
  var CIRC = 2 * Math.PI * 52;
  function setGauge(fillId, pctId, value) {
    var val = Math.round(value);
    var f = $(fillId), p = $(pctId);
    f.style.strokeDashoffset = CIRC - (CIRC * (val / 100));
    p.textContent = val + '%';
    var c = val < 30 ? '#EF4444' : val < 50 ? '#F97316' : val < 70 ? '#FBBF24' : '#22C55E';
    f.style.stroke = c; p.style.color = c;
  }

  /* ===== SHOW RESULT ===== */
  function showResult() {
    var rendaGauge = 80;
    var freedomGauge = 76;
    var realGauge = 83;

    _track(function () {
      _sb.from('quiz_sessions').update({
        completed_at: new Date().toISOString(), result_type: 'qualified',
        final_score: capableSelected.length, score_pct: 85, had_disqualifier: false, vsl_shown: 'qualified'
      }).eq('session_id', _sid).then(null, null);
    });

    $('resultHeadline').textContent = 'Você tem o perfil certo mas do jeito que está, sua carreira ainda te trava ⚠️';
    $('resultHeadline').className = 'result-headline qualified';
    $('resultBody').textContent = 'Isso está afetando sua renda, sua liberdade e sua realização. Mas ainda dá tempo pra virar o jogo — mais rápido do que você imagina. ✨';
    $('resultBlock2Text1').innerHTML = 'A boa notícia é que a <strong>Imersão Closer 10K</strong> é ideal pra sua fase atual e seus objetivos.';
    $('resultBlock2Text2').textContent = 'Com base nas suas respostas, você tem o perfil pra mudar de carreira em tempo recorde. Veja seu gráfico de evolução projetado:';

    setTimeout(function () {
      setGauge('gaugeRenda', 'gaugeRendaPct', rendaGauge);
      setGauge('gaugeFreedom', 'gaugeFreedomPct', freedomGauge);
      setGauge('gaugeReal', 'gaugeRealPct', realGauge);
    }, 400);

    launchConfetti();



    // Countdown
    var totalSecs;
    try {
      totalSecs = parseInt(sessionStorage.getItem('quiz_countdown'));
      if (!totalSecs || totalSecs < 1) { totalSecs = Math.floor(Math.random() * 600) + 2400; sessionStorage.setItem('quiz_countdown', String(totalSecs)); }
    } catch (e) { totalSecs = 2880; }
    function tick() {
      if (totalSecs < 0) totalSecs = 0;
      var h = Math.floor(totalSecs / 3600), m = Math.floor((totalSecs % 3600) / 60), s = totalSecs % 60;
      var hEl = $('cdHours'), mEl = $('cdMins'), sEl = $('cdSecs');
      if (hEl) hEl.textContent = String(h).padStart(2, '0');
      if (mEl) mEl.textContent = String(m).padStart(2, '0');
      if (sEl) sEl.textContent = String(s).padStart(2, '0');
      if (totalSecs > 0) { totalSecs--; setTimeout(tick, 1000); }
    }
    tick();

    // CTA tracking
    var cta = $('btnCtaResult');
    if (cta) {
      cta.addEventListener('click', function () {
        _track(function () {
          _sb.from('quiz_sessions').update({ cta_clicked_at: new Date().toISOString() }).eq('session_id', _sid).then(null, null);
        });
        if (window.dataLayer) window.dataLayer.push({ event: 'cta_click', result_type: 'qualified' });
      }, { once: true, passive: true });
    }

    if (window.dataLayer) window.dataLayer.push({ event: 'quiz_result', result_type: 'qualified' });
  }
  /* ===== LP STATIC BUTTONS ===== */
  function setupLPButtons() {
    document.querySelectorAll('.lp-cta[data-advance="true"]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (isTransitioning) return;
        isTransitioning = true;
        playPop();
        btn.style.pointerEvents = 'none';
        setTimeout(function () { isTransitioning = false; }, 600);
        advanceFlow();
      }, { passive: true });
    });

    // Clique em qualquer lugar da lp-agenda avança
    document.getElementById('lp-agenda').addEventListener('click', function () {
      if (isTransitioning) return;
      isTransitioning = true;
      playPop();
      setTimeout(function () { isTransitioning = false; }, 600);
      advanceFlow();
    }, { passive: true });
  }
  /* ===== INIT ===== */
  function init() {
    $('btnStart').addEventListener('click', startQuiz, { passive: true });
    setupLPButtons();
    if ('requestIdleCallback' in window) requestIdleCallback(loadFont);
    else requestAnimationFrame(function () { setTimeout(loadFont, 50); });
  }

  function loadFont() {
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap';
    l.media = 'print';
    l.onload = function () { l.media = 'all'; document.body.classList.add('fonts-loaded'); };
    document.head.appendChild(l);
  }

  init();
})();