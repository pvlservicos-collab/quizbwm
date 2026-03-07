/* ===== QUIZ CLOSER 360 v2 ===== */
(function () {
  'use strict';

  /* ===== QUESTION DATA ===== */
  var questions = [
    // Q1: Situação Atual (single-select, pts)
    {
      title: 'Qual a sua situação profissional hoje?',
      subtitle: 'Escolha a opção abaixo.',
      type: 'single',
      options: [
        { emoji: '\u{1F4BC}', text: 'Trabalho CLT (carteira assinada)', pts: 10 },
        { emoji: '\u{1F527}', text: 'Autônomo / Freelancer', pts: 12 },
        { emoji: '\u{1F3EA}', text: 'Tenho meu próprio negócio', pts: 12 },
        { emoji: '\u{1F50D}', text: 'Estou desempregado(a) buscando oportunidade', pts: 15 }
      ]
    },
    // Q2: Maior Frustração (single-select, pts)
    {
      title: 'Qual é a sua MAIOR frustração financeira hoje?',
      subtitle: 'Escolha a opção abaixo.',
      type: 'single',
      options: [
        { emoji: '\u{1F613}', text: 'Ganho pouco e não tenho liberdade', pts: 15 },
        { emoji: '\u{1F4C9}', text: 'Minhas vendas estão completamente travadas', pts: 15 },
        { emoji: '\u{1F3E0}', text: 'Quero trabalhar de casa, mas não sei como começar', pts: 15 },
        { emoji: '\u{1F624}', text: 'Já tentei várias coisas e nenhuma deu certo', pts: 12 }
      ]
    },
    // Q3: Experiência com Vendas (single-select, pts)
    {
      title: 'Você já tem alguma experiência com vendas? \u{1F914}',
      subtitle: 'A venda consultiva é uma conversa com pessoas interessadas, usando um método validado. Não é telemarketing!',
      type: 'single',
      options: [
        { emoji: '\u2705', text: 'Sim, já vendo e quero escalar!', pts: 15 },
        { emoji: '\u274C', text: 'Não, sou totalmente novo(a) nisso', pts: 15 },
        { emoji: '\u{1F613}', text: 'Já tentei, mas não consegui resultado', pts: 12 },
        { emoji: '\u{1F504}', text: 'Quero voltar a vender com método!', pts: 15 }
      ]
    },
    // Q4: Personalidade (single-select, pts)
    {
      title: 'Como você se descreveria? \u{1F9E0}',
      subtitle: 'Muita gente acha que precisa ser extrovertido pra vender. Isso é MITO. Vender é sobre método, não personalidade.',
      type: 'single',
      options: [
        { emoji: '\u{1F910}', text: 'Sou mais na minha, preciso de um roteiro claro', pts: 15 },
        { emoji: '\u{1F642}', text: 'Converso bem quando tenho confiança no processo', pts: 15 },
        { emoji: '\u{1F5E3}\uFE0F', text: 'Sou comunicativo(a), mas me falta técnica', pts: 15 }
      ]
    },
    // Q5: Disponibilidade (single-select, pts)
    {
      title: 'Quantas horas por semana você pode dedicar à sua nova carreira?',
      subtitle: 'Selecione uma opção abaixo:',
      type: 'single',
      options: [
        { emoji: '\u{1F62C}', text: 'Ainda não dedico tempo a isso...', pts: 10 },
        { emoji: '\u{1F642}', text: '1 a 3 horas por semana', pts: 12 },
        { emoji: '\u{1F603}', text: '4 a 8 horas por semana', pts: 15 },
        { emoji: '\u{1F929}', text: 'Mais de 8 horas — quero mergulhar de cabeça!', pts: 15 }
      ]
    },
    // Q6: Maior Dificuldade (multi-select)
    {
      title: 'Qual é a sua maior dificuldade pra ganhar mais dinheiro?',
      subtitle: 'Selecione uma ou mais opções abaixo:',
      type: 'multi',
      key: 'difficulty',
      options: [
        { emoji: '\u{1F4CC}', text: 'Falta de um método validado pra seguir' },
        { emoji: '\u{1F624}', text: 'Falta de motivação pra começar' },
        { emoji: '\u{1F501}', text: 'Falta de constância / disciplina' },
        { emoji: '\u{1F937}', text: 'Não sei por onde começar' },
        { emoji: '\u{1F4B8}', text: 'Não tenho dinheiro pra investir em cursos caros' }
      ]
    },
    // Q7: O que Incomoda (multi-select) → RENDA + LIBERDADE gauges
    {
      title: 'O que mais te incomoda na sua vida profissional hoje?',
      subtitle: 'Selecione as opções que te representam:',
      type: 'multi',
      key: 'bothers',
      options: [
        { emoji: '\u{1F4B0}', text: 'Salário baixo / renda insuficiente' },
        { emoji: '\u23F0', text: 'Falta de liberdade de horário' },
        { emoji: '\u{1F3E0}', text: 'Não poder trabalhar de casa' },
        { emoji: '\u{1F4C8}', text: 'Carreira estagnada sem perspectiva' },
        { emoji: '\u{1F630}', text: 'Insegurança financeira constante' }
      ]
    },
    // Q8: Projeção Emocional (multi-select) → REALIZAÇÃO gauge
    {
      title: 'Se você ganhasse R$10.000/mês trabalhando de casa, o que isso mudaria em você?',
      subtitle: 'Selecione as opções que te representam:',
      type: 'multi',
      key: 'projection',
      footer: '(Estamos quase terminando a sua análise)',
      options: [
        { emoji: '\u{1F4AA}', text: 'Minha autoestima' },
        { emoji: '\u{1F680}', text: 'Minha motivação pra continuar' },
        { emoji: '\u{1F60E}', text: 'Minha confiança em público' },
        { emoji: '\u2764\uFE0F', text: 'Meus relacionamentos' },
        { emoji: '\u{1F3D6}\uFE0F', text: 'Meu medo de não conseguir pagar as contas' }
      ]
    },
    // Q9: O que Quer Desenvolver (multi-select)
    {
      title: 'Além de ganhar bem, o que mais você gostaria de desenvolver?',
      subtitle: '',
      type: 'multi',
      key: 'develop',
      anchor: '\u{1F3AF} A profissão de Closer Digital desenvolve tudo isso ao mesmo tempo, por ser uma carreira completa, prática e lucrativa.',
      btnText: 'ESTOU GOSTANDO, BORA!',
      btnColor: 'green',
      options: [
        { emoji: '\u{1F5E3}\uFE0F', text: 'Habilidade de comunicação e persuasão' },
        { emoji: '\u{1F9E0}', text: 'Inteligência emocional pra lidar com objeções' },
        { emoji: '\u{1F4CB}', text: 'Ter um processo de vendas estruturado' },
        { emoji: '\u{1F4BC}', text: 'Conseguir vagas em empresas digitais' },
        { emoji: '\u{1F30E}', text: 'Poder trabalhar de qualquer lugar do mundo' }
      ]
    },
    // Q10: Comprometimento (single-select, 2 large cards)
    {
      title: 'Hoje, qual a mudança que você mais quer ver na sua vida profissional? \u{1F525}',
      subtitle: 'Escolha a opção que mais se encaixa com o seu objetivo atual:',
      type: 'single',
      note: '(Última pergunta)',
      largeCards: true,
      options: [
        { emoji: '\u{1F680}', text: 'Começar do zero e faturar meus primeiros R$5 a 10 mil como Closer Digital', pts: 15 },
        { emoji: '\u{1F48E}', text: 'Escalar meus resultados e bater R$15 mil/mês ou mais', pts: 15 }
      ]
    }
  ];

  /* ===== FLOW DEFINITION ===== */
  // Each step: { id: sectionId, type: 'hero'|'single'|'multi'|'static'|'loading'|'result'|'vsl', qi: questionIndex }
  var flow = [
    { id: 'hero', type: 'hero' },               // 0
    { id: 'quiz', type: 'single', qi: 0 },       // 1  - Q1: Situação Atual
    { id: 'quiz', type: 'single', qi: 1 },       // 2  - Q2: Maior Frustração
    { id: 'warning', type: 'static' },            // 3  - Warning
    { id: 'quiz', type: 'single', qi: 2 },       // 4  - Q3: Experiência com Vendas
    { id: 'lp-social', type: 'static' },          // 5  - LP1: Prova Social
    { id: 'quiz', type: 'single', qi: 3 },       // 6  - Q4: Personalidade
    { id: 'lp-authority', type: 'static' },       // 7  - LP2+3: Autoridade
    { id: 'lp-forwho', type: 'static' },          // 8  - LP4: Pra Quem É
    { id: 'lp-stack', type: 'static' },           // 9  - LP5: Stack de Valor
    { id: 'lp-objection', type: 'static' },       // 10 - LP6: Anti-Objeção
    { id: 'quiz', type: 'single', qi: 4 },       // 11 - Q5: Disponibilidade
    { id: 'quiz', type: 'multi', qi: 5 },        // 12 - Q6: Maior Dificuldade
    { id: 'quiz', type: 'multi', qi: 6 },        // 13 - Q7: O que Incomoda
    { id: 'quiz', type: 'multi', qi: 7 },        // 14 - Q8: Projeção Emocional
    { id: 'quiz', type: 'multi', qi: 8 },        // 15 - Q9: O que Quer Desenvolver
    { id: 'quiz', type: 'single', qi: 9 },       // 16 - Q10: Comprometimento
    { id: 'loading', type: 'loading' },           // 17 - Loading
    { id: 'result', type: 'result' },             // 18 - Result
    { id: 'vsl-final', type: 'vsl' }             // 19 - VSL + CTA Final
  ];

  var QUIZ_STEPS = 16; // Steps 1-16 (for progress bar)

  /* ===== STATE ===== */
  var currentStep = 0;
  var totalPoints = 0;
  var multiAnswers = {}; // key -> [selected indices]
  var isTransitioning = false;
  var questionNumber = 0; // incremented for each question rendered

  // Calculate max possible points from single-select questions
  var maxPoints = 0;
  questions.forEach(function (q) {
    if (q.type === 'single') {
      var mx = 0;
      q.options.forEach(function (o) { if (o.pts > mx) mx = o.pts; });
      maxPoints += mx;
    }
  });

  /* ===== DOM HELPERS ===== */
  var $ = function (id) { return document.getElementById(id); };

  /* ===== SUPABASE ANALYTICS ===== */
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

  /* ===== SECTION TRANSITIONS ===== */
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
          target.addEventListener('animationend', function () {
            resolve();
          }, { once: true });
        }, { once: true });
      } else if (!current) {
        target.classList.add('active');
        resolve();
      } else {
        // Same section - just resolve
        resolve();
      }
    });
  }

  /* ===== PROGRESS BAR ===== */
  function updateProgress(step) {
    var pct = Math.min(100, Math.round(step / QUIZ_STEPS * 100));
    $('progressFill').style.width = pct + '%';
  }

  function showProgress() {
    $('globalProgress').classList.add('visible');
  }

  function hideProgress() {
    $('globalProgress').classList.remove('visible');
  }

  /* ===== SOUND FEEDBACK ===== */
  var _audioCtx = null;
  function _getAudioCtx() {
    if (!_audioCtx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (AC) _audioCtx = new AC();
    }
    if (_audioCtx && _audioCtx.state === 'suspended') {
      _audioCtx.resume();
    }
    return _audioCtx;
  }
  function playPop() {
    try {
      var ctx = _getAudioCtx();
      if (!ctx) return;
      var t = ctx.currentTime;

      // Nota 1 — E5 (659 Hz) — toque inicial
      var osc1 = ctx.createOscillator();
      var gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659, t);
      gain1.gain.setValueAtTime(0.22, t);
      gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      osc1.start(t);
      osc1.stop(t + 0.18);

      // Nota 2 — A5 (880 Hz) — resolve pra cima = sensação de conquista
      var osc2 = ctx.createOscillator();
      var gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, t + 0.09);
      gain2.gain.setValueAtTime(0, t);
      gain2.gain.setValueAtTime(0.2, t + 0.09);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc2.start(t + 0.09);
      osc2.stop(t + 0.3);
    } catch (e) { /* silently fail */ }
  }

  /* ===== FLOATING POINTS ===== */
  function showFloatPts(pts) {
    var container = $('floatPts');
    var el = document.createElement('div');
    el.className = 'float-pt';
    el.textContent = '+' + pts + ' pts';
    el.style.left = (Math.random() * 40 - 20) + 'px';
    container.appendChild(el);
    setTimeout(function () { el.remove(); }, 900);
  }

  /* ===== TOAST ===== */
  function showToast(msg) {
    var t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(function () { t.classList.remove('show'); }, 3500);
  }

  /* ===== RENDER SINGLE-SELECT QUESTION ===== */
  function renderSingleQuestion(qi) {
    var q = questions[qi];
    questionNumber++;
    var counter = $('qCounter');
    var title = $('qTitle');
    var subtitle = $('qSubtitle');
    var list = $('optionsList');
    var note = $('qNote');
    var anchor = $('qAnchor');
    var footer = $('qFooter');
    var btnCont = $('btnContinue');
    var btnContGreen = $('btnContinueGreen');

    counter.textContent = 'Pergunta ' + questionNumber + ' de 10';
    title.textContent = q.title;
    title.classList.remove('animate');
    void title.offsetHeight;
    title.classList.add('animate');

    subtitle.textContent = q.subtitle || '';
    subtitle.style.display = q.subtitle ? '' : 'none';

    note.textContent = q.note || '';
    note.style.display = q.note ? '' : 'none';

    anchor.style.display = 'none';
    footer.style.display = 'none';
    btnCont.style.display = 'none';
    btnContGreen.style.display = 'none';

    list.className = 'options-list';
    list.innerHTML = '';

    var frag = document.createDocumentFragment();
    q.options.forEach(function (o, i) {
      var li = document.createElement('li');
      li.className = 'option-card' + (q.largeCards ? ' large' : '');
      li.setAttribute('role', 'option');
      li.setAttribute('tabindex', '0');
      li.setAttribute('aria-label', o.text);
      li.innerHTML = '<span class="option-icon" aria-hidden="true">' + o.emoji + '</span><span class="option-text">' + o.text + '</span>';

      li.addEventListener('click', function () { handleSingleSelect(qi, i); }, { passive: true });
      li.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSingleSelect(qi, i); }
      });

      frag.appendChild(li);
      requestAnimationFrame(function () {
        li.style.transition = 'opacity .25s ease, transform .25s ease';
        li.style.transitionDelay = i * 50 + 'ms';
        li.classList.add('show');
      });
    });

    list.appendChild(frag);
    $('quiz').scrollTop = 0;
  }

  /* ===== RENDER MULTI-SELECT QUESTION ===== */
  function renderMultiQuestion(qi) {
    var q = questions[qi];
    questionNumber++;
    var counter = $('qCounter');
    var title = $('qTitle');
    var subtitle = $('qSubtitle');
    var list = $('optionsList');
    var note = $('qNote');
    var anchorEl = $('qAnchor');
    var footerEl = $('qFooter');
    var btnCont = $('btnContinue');
    var btnContGreen = $('btnContinueGreen');

    counter.textContent = 'Pergunta ' + questionNumber + ' de 10';
    title.textContent = q.title;
    title.classList.remove('animate');
    void title.offsetHeight;
    title.classList.add('animate');

    subtitle.textContent = q.subtitle || '';
    subtitle.style.display = q.subtitle ? '' : 'none';

    note.style.display = 'none';

    // Anchor text
    if (q.anchor) {
      anchorEl.textContent = q.anchor;
      anchorEl.style.display = '';
    } else {
      anchorEl.style.display = 'none';
    }

    // Footer text
    if (q.footer) {
      footerEl.textContent = q.footer;
      footerEl.style.display = '';
    } else {
      footerEl.style.display = 'none';
    }

    // Button
    if (q.btnColor === 'green') {
      btnCont.style.display = 'none';
      btnContGreen.textContent = q.btnText || 'ESTOU GOSTANDO, BORA!';
      btnContGreen.style.display = '';
      btnContGreen.disabled = true;
    } else {
      btnContGreen.style.display = 'none';
      btnCont.textContent = q.btnText || 'Continuar';
      btnCont.style.display = '';
      btnCont.disabled = true;
    }

    list.className = 'checkbox-list';
    list.innerHTML = '';

    var selected = [];

    var frag = document.createDocumentFragment();
    q.options.forEach(function (o, i) {
      var li = document.createElement('li');
      li.className = 'checkbox-option';
      li.innerHTML = '<span class="cb-emoji">' + o.emoji + '</span><span class="cb-text">' + o.text + '</span><span class="cb-check">\u2713</span>';

      li.addEventListener('click', function () {
        var idx = selected.indexOf(i);
        if (idx === -1) {
          selected.push(i);
          li.classList.add('checked');
        } else {
          selected.splice(idx, 1);
          li.classList.remove('checked');
        }
        // Enable/disable button
        var btn = q.btnColor === 'green' ? btnContGreen : btnCont;
        btn.disabled = selected.length === 0;
      }, { passive: true });

      frag.appendChild(li);
      requestAnimationFrame(function () {
        li.style.transition = 'opacity .25s ease, transform .25s ease';
        li.style.transitionDelay = i * 50 + 'ms';
        li.classList.add('show');
      });
    });

    list.appendChild(frag);

    // Button click handler
    var btn = q.btnColor === 'green' ? btnContGreen : btnCont;
    var handler = function () {
      btn.removeEventListener('click', handler);
      playPop();
      multiAnswers[q.key] = selected.slice();

      // Track
      _track(function () {
        _sb.from('question_answers').insert({
          session_id: _sid,
          question_index: qi,
          question_text: q.title,
          option_index: -1,
          option_text: selected.map(function (s) { return q.options[s].text; }).join(' | '),
          points_awarded: 0,
          is_disqualifier: false,
          answered_at: new Date().toISOString()
        }).then(null, null);
      });

      advanceFlow();
    };
    btn.addEventListener('click', handler);

    $('quiz').scrollTop = 0;
  }

  /* ===== HANDLE SINGLE-SELECT ===== */
  function handleSingleSelect(qi, optIdx) {
    if (isTransitioning) return;
    isTransitioning = true;
    playPop();

    var q = questions[qi];
    var opt = q.options[optIdx];
    totalPoints += (opt.pts || 0);

    // Track
    _track(function () {
      _sb.from('question_answers').insert({
        session_id: _sid,
        question_index: qi,
        question_text: q.title,
        option_index: optIdx,
        option_text: opt.text,
        points_awarded: opt.pts || 0,
        is_disqualifier: false,
        answered_at: new Date().toISOString()
      }).then(null, null);
    });

    // Visual feedback
    var cards = $('optionsList').querySelectorAll('.option-card');
    cards[optIdx].classList.add('selected');

    setTimeout(function () {
      for (var i = 0; i < cards.length; i++) {
        cards[i].style.transitionDelay = i * 25 + 'ms';
        cards[i].classList.add('fade-out');
      }
      setTimeout(function () {
        isTransitioning = false;
        advanceFlow();
      }, cards.length * 25 + 150);
    }, 300);
  }

  /* ===== ADVANCE FLOW ===== */
  function advanceFlow() {
    currentStep++;
    if (currentStep >= flow.length) return;
    goToStep(currentStep);
  }

  function goToStep(step) {
    currentStep = step;
    var screen = flow[step];

    // Progress bar: visible for steps 1-16
    if (step >= 1 && step <= QUIZ_STEPS) {
      showProgress();
      updateProgress(step);
    } else {
      hideProgress();
    }

    var activeSection = document.querySelector('.section.active');
    var targetId = screen.id;
    var sameSection = activeSection && activeSection.id === targetId;

    if (sameSection) {
      // Same section (quiz→quiz) — swap content with internal animation
      renderScreenContent(screen);
    } else {
      // Different section — full transition
      transitionTo(targetId).then(function () {
        renderScreenContent(screen);
      });
    }
  }

  function renderScreenContent(screen) {
    switch (screen.type) {
      case 'single':
        renderSingleQuestion(screen.qi);
        break;
      case 'multi':
        renderMultiQuestion(screen.qi);
        break;
      case 'loading':
        runLoading();
        break;
      case 'result':
        showResult();
        break;
      case 'vsl':
        showVSL();
        break;
      // 'static' and 'hero' need no rendering
    }
  }

  /* ===== SOCIAL PROOF COUNTER ===== */
  var spCount = 347;
  var spEl = $('socialCount');
  setInterval(function () {
    spCount += Math.floor(Math.random() * 3) + 1;
    spEl.textContent = spCount + ' pessoas fizeram esse quiz hoje';
  }, 4000 + Math.random() * 3000);

  /* ===== START QUIZ ===== */
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

  /* ===== LOADING ANIMATION ===== */
  function runLoading() {
    var txts = [
      'Analisando seu perfil de Closer Digital...',
      'Comparando com +4.000 closers formados...',
      'Cruzando dados com o script que gerou +40 milhões...',
      'Montando seu relatório personalizado...'
    ];
    var durs = [1400, 1400, 1200, 1000];
    var totalDur = 5000;
    var elapsed = 0;
    var lt = $('loadingText');
    var lb = $('loadingBarFill');
    var lp = $('loadingPct');

    txts.forEach(function (txt, i) {
      setTimeout(function () {
        lt.style.opacity = '0';
        setTimeout(function () {
          lt.textContent = txt;
          lt.style.opacity = '1';
        }, 120);
      }, elapsed);
      elapsed += durs[i];
    });

    var startTime = null;
    function animate(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / totalDur, 1);
      var pctVal = Math.round(progress * 100);
      lb.style.width = pctVal + '%';
      lp.textContent = pctVal + '%';
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);

    setTimeout(function () {
      advanceFlow();
    }, totalDur);
  }

  /* ===== CONFETTI ===== */
  function launchConfetti() {
    var container = $('confettiContainer');
    var colors = ['#10B981', '#059669', '#FBBF24', '#F59E0B', '#3B82F6', '#8B5CF6', '#EC4899'];
    for (var i = 0; i < 50; i++) {
      var piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.width = (Math.random() * 8 + 6) + 'px';
      piece.style.height = (Math.random() * 8 + 6) + 'px';
      piece.style.borderRadius = Math.random() > .5 ? '50%' : '2px';
      piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
      piece.style.animationDelay = (Math.random() * 1.5) + 's';
      container.appendChild(piece);
    }
    setTimeout(function () { container.innerHTML = ''; }, 5000);
  }

  /* ===== GAUGE HELPERS ===== */
  var GAUGE_CIRC = 2 * Math.PI * 52; // ~326.73

  function setGauge(fillId, pctId, value) {
    var fillEl = $(fillId);
    var pctEl = $(pctId);
    var offset = GAUGE_CIRC - (GAUGE_CIRC * (value / 100));
    fillEl.style.strokeDashoffset = offset;
    pctEl.textContent = value + '%';

    // Color based on value
    var color;
    if (value < 30) color = '#EF4444';       // red
    else if (value < 50) color = '#F97316';   // orange
    else if (value < 70) color = '#FBBF24';   // yellow
    else color = '#22C55E';                    // green

    fillEl.style.stroke = color;
    pctEl.style.color = color;
  }

  /* ===== SHOW RESULT ===== */
  function showResult() {
    // Calculate score percentage
    var scorePct = Math.round((totalPoints / maxPoints) * 100);

    // Determine profile
    var profile;
    if (scorePct >= 70) profile = 'qualified';
    else if (scorePct >= 40) profile = 'partial';
    else profile = 'disqualified';

    // Calculate gauges from multi-select answers
    var bothersCount = (multiAnswers.bothers || []).length;
    var projectionCount = (multiAnswers.projection || []).length;

    // Inverted: more selections = LOWER gauge = more urgency
    var rendaGauge = Math.max(15, 85 - (bothersCount * 13));
    var freedomGauge = Math.max(15, 80 - (bothersCount * 12));
    var realGauge = Math.max(15, 75 - (projectionCount * 11));

    // Track result
    _track(function () {
      _sb.from('quiz_sessions').update({
        completed_at: new Date().toISOString(),
        result_type: profile,
        final_score: totalPoints,
        score_pct: scorePct,
        had_disqualifier: false,
        vsl_shown: profile
      }).eq('session_id', _sid).then(null, null);
    });

    // Set headline
    var headline = $('resultHeadline');
    headline.textContent = 'Acabei de ver suas respostas... e vou ser direto: do jeito que tá, sua carreira está te travando \u26A0\uFE0F';
    headline.className = 'result-headline ' + profile;

    // Set body text
    $('resultBody').textContent = 'Não é só estética. Isso tá afetando sua disposição, sua confiança e seus relacionamentos. Mas ainda dá tempo pra virar esse jogo. Mais rápido do que você imagina. \u2728';

    // Block 2 texts
    $('resultBlock2Text1').innerHTML = 'A boa notícia é que a <strong>Imersão Closer 360</strong> é ideal pra sua fase atual e seus objetivos.';
    $('resultBlock2Text2').textContent = 'Com base nas suas respostas, você realmente tem o perfil pra mudar de carreira em tempo recorde.';

    // Animate gauges after a short delay
    setTimeout(function () {
      setGauge('gaugeRenda', 'gaugeRendaPct', rendaGauge);
      setGauge('gaugeFreedom', 'gaugeFreedomPct', freedomGauge);
      setGauge('gaugeReal', 'gaugeRealPct', realGauge);
    }, 400);

    // Confetti for qualified
    if (profile === 'qualified') {
      launchConfetti();
    }

    // Scroll to Block 2 on first CTA click
    $('btnResultCta1').addEventListener('click', function () {
      $('resultBlock2').scrollIntoView({ behavior: 'smooth' });
    }, { once: true });

    // Second CTA → advance to VSL
    $('btnResultCta2').addEventListener('click', function () {
      advanceFlow();
    }, { once: true });

    // Track result page view
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'quiz_result', result_type: profile, score: scorePct });
    }
  }

  /* ===== SHOW VSL ===== */
  function showVSL() {
    // Determine profile for VSL selection
    var scorePct = Math.round((totalPoints / maxPoints) * 100);
    var profile;
    if (scorePct >= 70) profile = 'qualified';
    else if (scorePct >= 40) profile = 'partial';
    else profile = 'disqualified';

    var vslMap = {
      qualified: {
        id: '699da3bd85a22216bd66fc58',
        src: 'https://scripts.converteai.net/91de7f15-bf35-4102-b055-4a4927e7a9e9/players/699da3bd85a22216bd66fc58/v4/player.js'
      },
      partial: {
        id: '699da35610f8465bfaf75564',
        src: 'https://scripts.converteai.net/91de7f15-bf35-4102-b055-4a4927e7a9e9/players/699da35610f8465bfaf75564/v4/player.js'
      },
      disqualified: {
        id: '699da693a036c88a251c4a89',
        src: 'https://scripts.converteai.net/91de7f15-bf35-4102-b055-4a4927e7a9e9/players/699da693a036c88a251c4a89/v4/player.js'
      }
    };

    var vsl = vslMap[profile];
    var container = $('vslContainer');

    // Create Vturb player
    var player = document.createElement('vturb-smartplayer');
    player.id = 'vid-' + vsl.id;
    player.style.cssText = 'display:block;margin:0 auto;width:100%;height:100%;';
    container.appendChild(player);

    var vs = document.createElement('script');
    vs.src = vsl.src;
    vs.async = true;
    document.head.appendChild(vs);

    // Urgency
    var vagas;
    try {
      vagas = parseInt(sessionStorage.getItem('quiz_vagas'));
      if (!vagas || vagas < 1) { vagas = Math.floor(Math.random() * 4) + 3; sessionStorage.setItem('quiz_vagas', String(vagas)); }
    } catch (e) { vagas = 5; }
    $('urgencyText').innerHTML = '\u{1F534} LOTE 1 ENCERRA HOJE — Restam apenas <strong>' + vagas + ' vagas</strong> por R$27';

    // Reveal CTA after delay
    var cta = $('btnCtaFinal');
    var urg = $('urgencyText');
    var guar = $('guaranteeText');

    setTimeout(function () {
      cta.classList.remove('vsl-hidden');
      cta.classList.add('vsl-reveal');
      setTimeout(function () {
        urg.classList.remove('vsl-hidden');
        urg.classList.add('vsl-reveal');
      }, 200);
      setTimeout(function () {
        guar.classList.remove('vsl-hidden');
        guar.classList.add('vsl-reveal');
      }, 400);

      // Track CTA reveal
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'cta_revealed', result_type: profile, score: scorePct });
      }
      _track(function () {
        _sb.from('quiz_sessions').update({ cta_revealed_at: new Date().toISOString() })
          .eq('session_id', _sid).then(null, null);
      });
    }, 1000);

    // Track CTA click
    cta.addEventListener('click', function () {
      _track(function () {
        _sb.from('quiz_sessions').update({ cta_clicked_at: new Date().toISOString() })
          .eq('session_id', _sid).then(null, null);
      });
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'cta_click', result_type: profile, score: scorePct });
      }
    }, { once: true, passive: true });
  }

  /* ===== LP CTA HANDLERS ===== */
  function setupLPButtons() {
    // All LP CTA buttons with data-advance="true"
    var lpBtns = document.querySelectorAll('.lp-cta[data-advance="true"]');
    lpBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (isTransitioning) return;
        isTransitioning = true;
        playPop();
        btn.style.pointerEvents = 'none';
        setTimeout(function () { isTransitioning = false; }, 600);
        advanceFlow();
      }, { passive: true });
    });

    // Warning OK button
    $('btnWarningOk').addEventListener('click', function () {
      if (isTransitioning) return;
      isTransitioning = true;
      playPop();
      setTimeout(function () { isTransitioning = false; }, 600);
      advanceFlow();
    }, { passive: true });
  }

  /* ===== INIT ===== */
  function init() {
    // Start button
    $('btnStart').addEventListener('click', startQuiz, { passive: true });

    // LP and warning buttons
    setupLPButtons();

    // Load font async
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadFont);
    } else {
      requestAnimationFrame(function () { setTimeout(loadFont, 50); });
    }
  }

  function loadFont() {
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap';
    l.media = 'print';
    l.onload = function () {
      l.media = 'all';
      document.body.classList.add('fonts-loaded');
    };
    document.head.appendChild(l);
  }

  init();
})();
