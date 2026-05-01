/* ===== DESAFIO BWM 14 DIAS SCRIPT v2.1 ===== */
(function () {
  'use strict';

  var _SBURL = 'https://fftgdntnavupoghgamia.supabase.co';
  var _SBKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdGdkbnRuYXZ1cG9naGdhbWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1ODgzMDYsImV4cCI6MjA5MzE2NDMwNn0.dP_vw2K3uFwjw7H4o2H4HDrJVc74vHO_4bnAK7orCYs';

  var S = {
    ageGroup: '18-29',
    step: 0,
    answers: {},
    transitioning: false,
    sid: null,
    fitnessAgeVal: 0,
    postRenderFn: null,
  };

  var _sb = null, _sbLoading = false, _sbQ = [];
  function _loadSB(cb) {
    if (_sb) { cb(); return; }
    _sbQ.push(cb);
    if (_sbLoading) return;
    _sbLoading = true;
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
    s.onload = function () {
      _sb = window.supabase.createClient(_SBURL, _SBKEY);
      var q = _sbQ.slice(); _sbQ = [];
      q.forEach(function (f) { try { f(); } catch (e) { } });
    };
    document.head.appendChild(s);
  }
  function _track(fn) { _loadSB(function () { try { fn(); } catch (e) { } }); }
  function _uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
  function _device() { var ua = navigator.userAgent; return /Mobi|Android/i.test(ua) ? 'mobile' : /Tablet|iPad/i.test(ua) ? 'tablet' : 'desktop'; }
  function _utms() { var p = new URLSearchParams(location.search); return { source: p.get('utm_source'), medium: p.get('utm_medium'), campaign: p.get('utm_campaign') }; }

  var _ac = null;
  function playPop() {
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!_ac && AC) _ac = new AC();
      if (!_ac) return;
      if (_ac.state === 'suspended') _ac.resume();
      var t = _ac.currentTime, o = _ac.createOscillator(), g = _ac.createGain();
      o.connect(g); g.connect(_ac.destination);
      o.type = 'sine'; o.frequency.setValueAtTime(660, t);
      g.gain.setValueAtTime(0.15, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      o.start(t); o.stop(t + 0.18);
    } catch (e) { }
  }

  function calcBMI(hCm, wKg) {
    var h = hCm / 100;
    return Math.round((wKg / (h * h)) * 10) / 10;
  }
  function bmiInfo(bmi) {
    if (bmi < 18.5) return { label: 'Abaixo do Peso', cls: 'su', pct: 8 };
    if (bmi < 25) return { label: 'Peso Normal', cls: 'sn2', pct: 28 };
    if (bmi < 30) return { label: 'Levemente Acima do Peso', cls: 'sow', pct: 54 };
    if (bmi < 35) return { label: 'Obesidade Grau I', cls: 'sob', pct: 74 };
    return { label: 'Obesidade Grau II', cls: 'sob', pct: 90 };
  }
  function calcFatPct(bmi, ageGroup) {
    var adj = { '18-29': 0, '30-39': 2, '40-49': 4, '50+': 6 }[ageGroup] || 0;
    return Math.max(8, Math.round(1.2 * bmi + 0.23 * 30 - 16.2 + adj));
  }

  /* ===== CALCULA IDADE DO FISICO: realAge + 3 anos ===== */
  function calcFitnessAge(dob, answers, ageGroupFallback) {
    var birthYear = null;
    if (dob) {
      var parts = dob.replace(/[^0-9\/]/g, '').split('/');
      /* tenta YYYY na posicao 2 (DD/MM/YYYY) */
      var yCandidate = parts.length >= 3 ? parseInt(parts[2]) : null;
      if (!yCandidate || yCandidate < 1930 || yCandidate > 2010) {
        /* tenta YYYY na posicao 0 (YYYY/MM/DD) */
        yCandidate = parts.length >= 3 ? parseInt(parts[0]) : null;
      }
      if (yCandidate && yCandidate >= 1930 && yCandidate <= 2010) birthYear = yCandidate;
    }
    var realAge;
    if (birthYear) {
      realAge = new Date().getFullYear() - birthYear;
    } else {
      /* fallback pelo grupo etario selecionado */
      var mid = { '18-29': 24, '30-39': 34, '40-49': 44, '50+': 55 }[ageGroupFallback || (answers && answers.ageGroup) || '30-39'] || 34;
      realAge = mid;
    }
    if (realAge < 16 || realAge > 80) realAge = 34;
    /* Idade do fisico = idade real + 3 anos exatos */
    return realAge + 3;
  }

  function calcSleepScore(answers) {
    var sl = { 'less5': 20, '5to6': 42, '7to8': 80, 'more8': 65 }[answers.sleepHours] || 50;
    var en = { 'low': 25, 'varies': 55, 'high': 90 }[answers.energyLevel] || 50;
    var ac = { 'sitting': 30, 'moderate': 60, 'active': 85 }[answers.typicalDay] || 50;
    return { sleep: sl, energy: en, metabolism: Math.round(sl * 0.4 + en * 0.3 + ac * 0.3), overall: Math.round((sl + en + ac) / 3) };
  }
  function calcCalories(wKg, goal) {
    var bmr = wKg * 10 + 500;
    var mult = { lose_weight: 0.85, dry: 0.83, gain_muscle: 1.15, healthy: 1.0 }[goal] || 1.0;
    return Math.round(bmr * mult / 50) * 50;
  }
  function calcWater(wKg) {
    return Math.round(wKg * 35 / 100) / 10;
  }

  var STEPS = [
    {
      type: 'select', key: 'bodyType', title: 'Escolha seu tipo de corpo atual',
      options: [
        { v: 'slim', lbl: 'Corpo Slim', sub: '(Ectomorfo)', ico: '🏃' },
        { v: 'average', lbl: 'Corpo Médio', sub: '(Mesomorfo)', ico: '🧍' },
        { v: 'big', lbl: 'Corpo Grande', sub: '(Endomorfo)', ico: '🏋️' },
        { v: 'heavy', lbl: 'Muito acima do peso', sub: '(Obeso)', ico: '👤' }
      ], imgs: ['c2m1', 'c2m2', 'c2m3', 'c2m4']
    },
    {
      type: 'select', key: 'goal', title: 'Escolha seu objetivo',
      options: [
        { v: 'dry', lbl: 'Secar', ico: '🔥' },
        { v: 'gain_muscle', lbl: 'Ganhar massa muscular', ico: '💪' },
        { v: 'lose_weight', lbl: 'Ganhar massa e perder gordura', ico: '⚡' },
        { v: 'healthy', lbl: 'Melhoria de saúde', ico: '❤️' }
      ], imgs: ['c3m1', 'c3m2', 'c3m3', 'c3m4']
    },
    {
      type: 'select', key: 'targetBody', title: 'Escolha o corpo que você quer',
      options: [
        { v: 'slim', lbl: 'Corpo Slim', ico: '📉' },
        { v: 'fit', lbl: 'Corpo Fit', ico: '🏃' },
        { v: 'athletic', lbl: 'Corpo Atlético', ico: '🏆' }
      ], imgs: ['c4m1', 'c4m2', 'c4m3']
    },
    {
      type: 'multiselect', key: 'problemAreas', title: 'Selecione as áreas problemáticas', sub: 'Pode selecionar mais de uma',
      options: [
        { v: 'arms', lbl: 'Braços finos', ico: '🦾' },
        { v: 'chest', lbl: 'Peito fraco', ico: '💪' },
        { v: 'back', lbl: 'Costas fracas', ico: '🔙' },
        { v: 'legs', lbl: 'Pernas finas', ico: '🦵' }
      ], hasNone: true, imgs: ['c5m1', 'c5m2', 'c5m3', 'c5m4']
    },
    { type: 'info', key: 'ageInfo', img: 'c6m1' },
    {
      type: 'select', key: 'bestShape', title: 'Há quanto tempo você estava na melhor forma da vida?',
      options: [
        { v: 'less1', lbl: 'Menos de 1 ano atrás', ico: '📆' },
        { v: '1to3', lbl: '1 a 3 anos atrás', ico: '🗓️' },
        { v: 'more3', lbl: 'Mais de 3 anos atrás', ico: '📅' },
        { v: 'never', lbl: 'Nunca', ico: '❓' }
      ]
    },
    {
      type: 'select', key: 'weightChange', title: 'Como seu peso normalmente muda?',
      options: [
        { v: 'gain_fast', lbl: 'Ganho peso rápido mas perco devagar', ico: '📈' },
        { v: 'easy_both', lbl: 'Ganho e perco facilmente', ico: '↕️' },
        { v: 'hard_gain', lbl: 'Tenho dificuldade de ganhar peso', ico: '📉' }
      ]
    },
    {
      type: 'multiselect', key: 'dailyActivities', title: 'O que você já faz ou fazia como atividade?',
      options: [
        { v: 'gym', lbl: 'Academia', ico: '🏋️' },
        { v: 'mma', lbl: 'Artes marciais', ico: '🥋' },
        { v: 'sports', lbl: 'Esportes', ico: '⚽' },
        { v: 'walk', lbl: 'Caminhada ou corrida', ico: '🚶' }
      ], hasNone: true
    },
    { type: 'chart', key: 'firstResults', renderFn: 'chartFirst' },
    {
      type: 'multiselect', key: 'limitations', title: 'Você tem dores em algum lugar do corpo?', sub: 'Ajustaremos o plano para proteger essa área',
      options: [
        { v: 'back', lbl: 'Costas', ico: '🔙' },
        { v: 'joints', lbl: 'Articulações', ico: '🦴' },
        { v: 'knees', lbl: 'Joelhos', ico: '🦵' },
        { v: 'lowerback', lbl: 'Lombar', ico: '⚠️' }
      ], hasNone: true
    },
    {
      type: 'select', key: 'workoutLocation', title: 'Em qual local você treina?',
      options: [
        { v: 'home', lbl: 'Em casa', ico: '🏠' },
        { v: 'gym', lbl: 'Academia', ico: '🏋️' },
        { v: 'hybrid', lbl: 'Treino híbrido', ico: '🔄' },
        { v: 'functional', lbl: 'Funcional', ico: '🤸' }
      ]
    },
    {
      type: 'select', key: 'intensity', title: 'Qual intensidade de treino prefere?',
      options: [
        { v: 'moderate', lbl: 'Esforço moderado', ico: '💪' },
        { v: 'intense', lbl: 'Alta intensidade', ico: '🚀' },
        { v: 'auto', lbl: 'Padrão do treinamento BWM 14 Dias', ico: '🏅' }
      ]
    },
    {
      type: 'select-feedback', key: 'trainingFreq', title: 'Quantas vezes por semana você treinou nos últimos 3 meses?',
      options: [
        { v: 'none', lbl: 'Nenhuma vez', sub: 'Começarei agora!', ico: '😔', pct: 5 },
        { v: '1to2', lbl: '1 a 2 vezes por semana', ico: '💪', pct: 37 },
        { v: '3', lbl: '3 vezes por semana', ico: '💪⚡', pct: 60 },
        { v: '3plus', lbl: 'Mais de 3 vezes', ico: '🏆', pct: 85 }
      ]
    },
    {
      type: 'select', key: 'workoutDuration', title: 'Quanto tempo você quer que seus treinos durem?',
      options: [
        { v: '30plus', lbl: 'Acima de 30 minutos', ico: '⏱️' },
        { v: '60', lbl: 'Até 60 minutos', ico: '⏰' },
        { v: 'auto', lbl: 'Deixe que o BWM decida', ico: '🏅' }
      ]
    },
    { type: 'chart', key: 'cortisolInfo', renderFn: 'chartCortisol' },
    { type: 'input-height', key: 'height', title: 'Qual é a sua altura?' },
    { type: 'input-weight', key: 'weight', title: 'Qual é o seu peso atual e meta?' },
    {
      type: 'tinder-swipe', key: 'tinderExercises', title: 'Curte ou não curte?',
      cards: [
        { key: 'likeCardio', exercise: 'Esteira', ico: '🏃', img: 'c18m1' },
        { key: 'likeYoga', exercise: 'Yoga / Alongamento', ico: '🧘', img: 'c18m2' },
        { key: 'likeWeights', exercise: 'Musculação', ico: '🏋️', img: 'c18m3' },
        { key: 'likeFunctional', exercise: 'Funcional', ico: '🤸', img: 'c18m4' }
      ]
    },
    {
      type: 'select', key: 'sugarFreq', title: 'Com que frequência você consome alimentos açucarados?',
      options: [
        { v: 'rarely', lbl: 'Raramente. Não sou fã de doce.', ico: '😎' },
        { v: '3to5', lbl: '3 a 5 vezes por semana', ico: '🤔' },
        { v: 'daily', lbl: 'Quase todo dia', ico: '😅' }
      ]
    },
    {
      type: 'select', key: 'waterIntake', title: 'Quanta água você bebe por dia?',
      options: [
        { v: 'low', lbl: 'Menos de 1 Litro', ico: '💧' },
        { v: 'medium', lbl: 'De 1 a 2 Litros', ico: '💧💧' },
        { v: 'good', lbl: 'De 2 a 3 Litros', ico: '💧💧💧' },
        { v: 'great', lbl: '+ de 3 Litros', ico: '🥤' }
      ]
    },
    {
      type: 'select', key: 'typicalDay', title: 'Como você descreveria seu dia típico?',
      options: [
        { v: 'sitting', lbl: 'Passo a maior parte sentado', ico: '💻' },
        { v: 'moderate', lbl: 'Me movimento de vez em quando', ico: '🚶' },
        { v: 'active', lbl: 'Fico em pé o dia inteiro', ico: '⚡' }
      ]
    },
    {
      type: 'select', key: 'energyLevel', title: 'Qual é o seu nível médio de energia durante o dia?',
      options: [
        { v: 'low', lbl: 'Me sinto exausto na maior parte do tempo', ico: '😩' },
        { v: 'varies', lbl: 'Minha energia varia ao longo do dia', ico: '📊' },
        { v: 'high', lbl: 'Geralmente sou muito energético e ativo', ico: '💥' }
      ]
    },
    {
      type: 'select', key: 'sleepHours', title: 'Quantas horas você costuma dormir?',
      options: [
        { v: 'less5', lbl: 'Menos de 5 horas', ico: '😵' },
        { v: '5to6', lbl: '5 a 6 horas', ico: '😪' },
        { v: '7to8', lbl: '7 a 8 horas', ico: '🌙' },
        { v: 'more8', lbl: 'Mais de 8 horas', ico: '😴' }
      ]
    },
    { type: 'sleep-score', key: 'sleepScore' },
    { type: 'scale', key: 'breathScale', statement: 'Fico sem fôlego ao subir um lance de escada.' },
    { type: 'scale', key: 'routineScale', statement: 'Após 1 ou 2 semanas de hábitos saudáveis, costumo voltar à rotina antiga.' },
    { type: 'scale', key: 'workoutKnowledge', statement: 'Não sei como escolher exercícios adequados para mim.' },
    { type: 'input-name', key: 'name', pStep: '1/3' },
    { type: 'input-dob', key: 'dob', pStep: '2/3' },
    { type: 'fitness-age', key: 'fitnessAge' },
    { type: 'input-email', key: 'email', pStep: '3/3' }
  ];

  var TOTAL = STEPS.length;
  var $ = function (id) { return document.getElementById(id); };

  function transTo(id) {
    return new Promise(function (res) {
      var cur = document.querySelector('.section.active');
      var tgt = $(id);
      if (!tgt) { res(); return; }
      if (cur && cur.id !== id) {
        cur.classList.add('leaving');
        cur.addEventListener('animationend', function () {
          cur.classList.remove('active', 'leaving');
          tgt.classList.add('active');
          tgt.scrollTop = 0; window.scrollTo({ top: 0, behavior: 'instant' });
          tgt.addEventListener('animationend', res, { once: true });
        }, { once: true });
      } else if (!cur) { tgt.classList.add('active'); res(); }
      else res();
    });
  }

  function updateProg(step) {
    $('pFill').style.width = Math.min(100, Math.round((step / TOTAL) * 100)) + '%';
    $('topStep').textContent = (step + 1) + '/' + TOTAL;
  }

  function anim(container) {
    container.querySelectorAll('.aitem').forEach(function (el, i) {
      el.style.transitionDelay = (i * 55) + 'ms';
      setTimeout(function () { el.classList.add('show'); }, 20);
    });
  }

  var _firstRender = true;

  function renderStep(idx) {
    var step = STEPS[idx];
    if (!step) return;
    S.postRenderFn = null;
    var html = '';
    switch (step.type) {
      case 'select': html = buildSelect(step); break;
      case 'select-feedback': html = buildSelect(step); break;
      case 'multiselect': html = buildMulti(step); break;
      case 'info': html = buildInfo(step); break;
      case 'chart': html = buildChart(step); break;
      case 'input-height': html = buildHeight(); break;
      case 'input-weight': html = buildWeight(); break;
      case 'likedislike': html = buildLike(step); break;
      case 'tinder-swipe': html = buildTinder(step); break;
      case 'scale': html = buildScale(step); break;
      case 'sleep-score': html = buildSleep(step); S.postRenderFn = animSleep; break;
      case 'fitness-age': html = buildFitnessAge(); S.postRenderFn = animFitnessAge; break;
      case 'input-name': html = buildName(step); break;
      case 'input-dob': html = buildDob(step); break;
      case 'input-email': html = buildEmail(); break;
    }
    var content = $('quizContent');
    content.innerHTML = html;
    if (_firstRender) {
      _firstRender = false;
      content.querySelectorAll('.aitem').forEach(function (el) {
        el.style.transitionDelay = '0ms';
        el.classList.add('show');
      });
    } else {
      anim(content);
    }
    bindStep(step, idx);
    if (S.postRenderFn) setTimeout(S.postRenderFn, 350);
  }

  function buildSelect(step) {
    var h = '<h2 class="stitle aitem">' + step.title + '</h2>';
    h += '<div class="olist">';
    step.options.forEach(function (o, i) {
      var imgTag;
      if (step.imgs) {
        /* onerror: hide broken img, show icon text in the oimg container */
        var fallback = 'this.onerror=null;this.style.display="none";this.parentElement.style.cssText+="align-items:center;justify-content:center;font-size:26px;background:rgba(255,255,255,.07)";this.parentElement.textContent="' + o.ico.replace(/"/g, '&quot;') + '"';
        imgTag = '<div class="oimg"><img src="img/' + step.imgs[i] + '.png?v=2" alt="' + o.lbl + '" onerror="' + fallback + '"></div>';
      } else {
        imgTag = '<div class="oico">' + o.ico + '</div>';
      }
      h += '<div class="ocard aitem" data-val="' + o.v + '">'
        + imgTag
        + '<div style="flex:1;padding:0 8px">'
        + '<div class="olbl">' + o.lbl + '</div>'
        + (o.sub ? '<div class="osub">' + o.sub + '</div>' : '')
        + '</div></div>';
    });
    h += '</div>';
    return h;
  }

  function buildMulti(step) {
    var h = '<h2 class="stitle aitem">' + step.title + '</h2>';
    if (step.sub) h += '<p class="ssub aitem">' + step.sub + '</p>';
    h += '<div class="mlist" id="mlist">';
    step.options.forEach(function (o, i) {
      var imgTag = step.imgs
        ? '<div class="oimg"><img src="img/' + step.imgs[i] + '.png?v=2" alt="' + o.lbl + '" onerror="this.parentElement.innerHTML=\'<span style=&quot;font-size:22px;padding:8px&quot;>' + o.ico + '</span>\'"></div>'
        : '<div class="oico">' + o.ico + '</div>';
      h += '<div class="mopt aitem" data-val="' + o.v + '">'
        + '<div class="cbox"><span class="cmk">✓</span></div>'
        + '<span class="olbl" style="flex:1">' + o.lbl + '</span>'
        + imgTag
        + '</div>';
    });
    if (step.hasNone) h += '<div class="mopt aitem" data-val="none" id="noneOpt"><div class="cbox"><span class="cmk">✗</span></div><div class="oico">❌</div><span class="olbl" style="flex:1">Nenhuma das anteriores</span></div>';
    h += '</div><button class="btn aitem" id="mBtn" onclick="window.__mCont()">Continuar →</button>';
    return h;
  }

  function buildInfo(step) {
    var age = S.ageGroup;
    var decades = { '18-29': '20', '30-39': '30', '40-49': '40', '50+': '50' };
    return '<h2 class="stitle aitem">Homens na faixa dos ' + (decades[age] || '30') + ' anos</h2>'
      + '<p class="ssub aitem">podem precisar de uma abordagem diferente de treinos baseada em nível de atividade e histórico.</p>'
      + '<div class="ibox aitem"><img src="img/' + step.img + '.png" alt="Info ' + age + '" onerror="this.parentElement.innerHTML=\'<span style=&quot;font-size:80px&quot;>🏋️‍♂️</span>\'"></div>'
      + '<button class="btn aitem" onclick="advStep()">Entendido →</button>';
  }

  function buildChart(step) {
    if (step.renderFn === 'chartFirst') {
      S.postRenderFn = function () { animPath('cfat'); animPath('cmuscle'); };
      return '<div class="cbox2">'
        + '<h2 class="cbig aitem">Conquiste o máximo de resultado com o mínimo de esforço</h2>'
        + '<p class="csub2 aitem">Prevemos que você verá melhoras até o fim da 2ª semana no Desafio BWM 14 Dias</p>'
        + '<div class="csvg aitem">'
        + '<svg id="chartFR" viewBox="0 0 320 170" width="100%" xmlns="http://www.w3.org/2000/svg">'
        + '<line x1="30" y1="10" x2="30" y2="148" stroke="#2a2218" stroke-width="1"/>'
        + '<line x1="30" y1="148" x2="312" y2="148" stroke="#2a2218" stroke-width="1"/>'
        + '<text x="30" y="163" font-size="9" fill="#888" text-anchor="middle">Agora</text>'
        + '<text x="130" y="163" font-size="9" fill="#888" text-anchor="middle">1ª Sem.</text>'
        + '<text x="220" y="163" font-size="9" fill="#888" text-anchor="middle">2ª Sem.</text>'
        + '<text x="312" y="163" font-size="9" fill="#888" text-anchor="middle">14 Dias</text>'
        + '<path id="cfat" d="M30,30 C80,36 160,78 240,112 Q280,130 312,145" fill="none" stroke="#E8622A" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="900" stroke-dashoffset="900"/>'
        + '<path id="cmuscle" d="M30,145 C80,138 160,100 240,58 Q280,38 312,18" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="900" stroke-dashoffset="900"/>'
        + '<rect x="232" y="10" width="80" height="16" rx="3" fill="#0A0806" opacity="0.9"/>'
        + '<text x="272" y="21" font-size="9" fill="#FFFFFF" text-anchor="middle">Massa Muscular</text>'
        + '<rect x="232" y="138" width="68" height="16" rx="3" fill="#0A0806" opacity="0.9"/>'
        + '<text x="266" y="149" font-size="9" fill="#E8622A" text-anchor="middle">% Gordura</text>'
        + '<rect x="46" y="10" width="72" height="20" rx="4" fill="#E8622A"/>'
        + '<text x="82" y="23" font-size="9" fill="#fff" text-anchor="middle">🔥 2ª Semana</text>'
        + '</svg></div>'
        + '<p class="cnote aitem">*Baseado em dados de 1,3 milhão de treinos. Gráfico ilustrativo. Resultados individuais podem variar.</p>'
        + '<button class="btn aitem" onclick="advStep()">Entendido →</button></div>';
    }
    S.postRenderFn = function () { animPath('ccortisol'); animPath('ctesto'); };
    return '<div class="cbox2">'
      + '<h2 class="cbig aitem">Forçar seus limites não é necessário!</h2>'
      + '<p class="csub2 aitem">Com o Desafio BWM 14 Dias você conquista o máximo de resultado com o mínimo de esforço</p>'
      + '<div class="csvg aitem">'
      + '<svg id="chartCort" viewBox="0 0 320 150" width="100%" xmlns="http://www.w3.org/2000/svg">'
      + '<line x1="30" y1="10" x2="30" y2="128" stroke="#2a2218" stroke-width="1"/>'
      + '<line x1="30" y1="128" x2="312" y2="128" stroke="#2a2218" stroke-width="1"/>'
      + '<text x="30" y="143" font-size="9" fill="#888" text-anchor="middle">Agora</text>'
      + '<text x="312" y="143" font-size="9" fill="#888" text-anchor="middle">14 Dias</text>'
      + '<path id="ccortisol" d="M30,25 C90,32 190,76 260,104 Q288,116 312,124" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="900" stroke-dashoffset="900"/>'
      + '<path id="ctesto" d="M30,115 C90,104 190,60 260,32 Q288,20 312,13" fill="none" stroke="#E8622A" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="900" stroke-dashoffset="900"/>'
      + '<rect x="32" y="16" width="56" height="16" rx="3" fill="#0A0806" opacity="0.85"/>'
      + '<text x="60" y="27" font-size="9" fill="#FFFFFF" text-anchor="middle">Cortisol ↑</text>'
      + '<rect x="32" y="104" width="88" height="16" rx="3" fill="#0A0806" opacity="0.85"/>'
      + '<text x="76" y="115" font-size="9" fill="#E8622A" text-anchor="middle">Testosterona ↑</text>'
      + '</svg></div>'
      + '<p class="cnote aitem">Treino excessivo eleva o cortisol e dificulta os resultados. O BWM personaliza o plano ideal para você.</p>'
      + '<button class="btn aitem" onclick="advStep()">Entendido →</button></div>';
  }

  function buildHeight() {
    var unit = S.answers.heightUnit || 'cm';
    return '<h2 class="stitle aitem">Qual é a sua altura?</h2>'
      + '<div class="urow aitem"><button class="ubtn' + (unit === 'ft' ? ' on' : '') + '" onclick="setHUnit(\'ft\')">ft, in</button><button class="ubtn' + (unit === 'cm' ? ' on' : '') + '" onclick="setHUnit(\'cm\')">cm</button></div>'
      + '<div class="ig aitem"><label class="ilbl">Altura (' + unit + ')</label><div class="iu"><input class="qinp" id="hInp" type="number" inputmode="numeric" placeholder="' + (unit === 'cm' ? '175' : '5.9') + '" min="' + (unit === 'cm' ? 100 : 3) + '" max="' + (unit === 'cm' ? 250 : 8) + '"><span class="iulbl">' + unit + '</span></div></div>'
      + '<div class="crow aitem"><input type="checkbox" class="cchk" id="consentChk" checked><label class="ctxt" for="consentChk">Consinto que o BWM processe meus dados para fornecer meu plano personalizado. <a href="#">Política de Privacidade</a>.</label></div>'
      + '<button class="btn aitem" onclick="submitH()">Continuar →</button>';
  }

  function buildWeight() {
    var unit = S.answers.weightUnit || 'kg';
    return '<h2 class="stitle aitem">Qual é o seu peso atual e meta?</h2>'
      + '<div class="urow aitem"><button class="ubtn' + (unit === 'lb' ? ' on' : '') + '" onclick="setWUnit(\'lb\')">lb</button><button class="ubtn' + (unit === 'kg' ? ' on' : '') + '" onclick="setWUnit(\'kg\')">kg</button></div>'
      + '<div class="ig aitem"><label class="ilbl">Peso atual (' + unit + ')</label><div class="iu"><input class="qinp" id="wCur" type="number" inputmode="numeric" placeholder="80" min="30" max="300"><span class="iulbl">' + unit + '</span></div></div>'
      + '<div class="ig aitem"><label class="ilbl">Peso meta (' + unit + ')</label><div class="iu"><input class="qinp" id="wTgt" type="number" inputmode="numeric" placeholder="70" min="30" max="300"><span class="iulbl">' + unit + '</span></div></div>'
      + '<button class="btn aitem" onclick="submitW()">Continuar →</button>';
  }

  function buildLike(step) {
    return '<h2 class="stitle aitem">Curte ou não curte?</h2>'
      + '<div class="sstack aitem"><div class="sbg b1"></div><div class="sbg b2"></div>'
      + '<div class="smain"><div class="scard"><div class="simg"><img src="img/' + step.img + '.png" alt="' + step.exercise + '" onerror="this.parentElement.innerHTML=\'<div style=&quot;font-size:80px;display:flex;align-items:center;justify-content:center;height:100%&quot;>' + step.ico + '</div>\'"><div class="slbl">' + step.exercise + '</div></div></div></div></div>'
      + '<div class="sbtns aitem"><button class="sbtn" id="sdislike" onclick="swipe(\'dislike\')"><div class="sico">👎</div><span>Não gosto</span></button><button class="sbtn" id="sneutral" onclick="swipe(\'neutral\')"><div class="sico">😐</div><span>Neutro</span></button><button class="sbtn" id="slike" onclick="swipe(\'like\')"><div class="sico">👍</div><span>Gosto</span></button></div>';
  }

  /* buildTinder — SEM cards de fundo falsos, apenas os 4 cards reais */
  function buildTinder(step) {
    S.tinderIdx = 0;
    S.tinderStepData = step;
    var h = '<h2 class="stitle aitem">' + step.title + '</h2>';
    h += '<div class="tinder-stack aitem" id="tinderStack">';
    /* Renderiza apenas os 4 cards reais, sem .sbg de fundo */
    for (var i = step.cards.length - 1; i >= 0; i--) {
      var c = step.cards[i];
      h += '<div class="tinder-card" id="tc-' + i + '" style="z-index:' + (10 + step.cards.length - i) + '">'
        + '<div class="simg"><img src="img/' + c.img + '.png" alt="' + c.exercise + '" style="width:100%;height:100%;object-fit:cover;" onerror="this.parentElement.innerHTML=\'<div style=&quot;font-size:80px;display:flex;align-items:center;justify-content:center;height:100%&quot;>' + c.ico + '</div>\'"></div>'
        + '<div class="slbl">' + c.exercise + '</div></div>';
    }
    h += '</div>';
    h += '<div class="sbtns aitem"><button class="sbtn" onclick="tinderSwipe(\'dislike\')"><div class="sico">👎</div><span>Não gosto</span></button><button class="sbtn" onclick="tinderSwipe(\'neutral\')"><div class="sico">😐</div><span>Neutro</span></button><button class="sbtn" onclick="tinderSwipe(\'like\')"><div class="sico">👍</div><span>Gosto</span></button></div>';
    return h;
  }

  function buildScale(step) {
    return '<h2 class="stitle aitem" style="margin-bottom:16px">O quanto você se identifica com essa afirmação?</h2>'
      + '<div class="qglow aitem"><div class="qqm">"</div><p class="qtxt">' + step.statement + '</p><div class="qqm" style="text-align:right">"</div></div>'
      + '<div class="aitem"><div class="sbtns2">' + [1, 2, 3, 4, 5].map(function (n) { return '<button class="scbtn" data-val="' + n + '" onclick="selScale(' + n + ')">' + n + '</button>'; }).join('') + '</div>'
      + '<div class="slbls"><span>Não me identifico</span><span>Completamente</span></div></div>'
      + '<button class="btn aitem" id="scaleCont" disabled onclick="advStep()">Continuar →</button>';
  }

  function buildSleep() {
    var scores = calcSleepScore(S.answers);
    S.answers.sleepScores = scores;
    var r1 = 2 * Math.PI * 50, r2 = 2 * Math.PI * 40, r3 = 2 * Math.PI * 30;
    return '<div class="slpwrap aitem">'
      + '<svg class="slpsvg" viewBox="0 0 110 110">'
      + '<circle cx="55" cy="55" r="50" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="6"/>'
      + '<circle cx="55" cy="55" r="40" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="6"/>'
      + '<circle cx="55" cy="55" r="30" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="6"/>'
      + '<circle id="sr1" cx="55" cy="55" r="50" fill="none" stroke="#E8622A" stroke-width="6" stroke-linecap="round" stroke-dasharray="' + r1 + '" stroke-dashoffset="' + r1 + '" transform="rotate(-90 55 55)"/>'
      + '<circle id="sr2" cx="55" cy="55" r="40" fill="none" stroke="#A855F7" stroke-width="6" stroke-linecap="round" stroke-dasharray="' + r2 + '" stroke-dashoffset="' + r2 + '" transform="rotate(-90 55 55)"/>'
      + '<circle id="sr3" cx="55" cy="55" r="30" fill="none" stroke="#14B8A6" stroke-width="6" stroke-linecap="round" stroke-dasharray="' + r3 + '" stroke-dashoffset="' + r3 + '" transform="rotate(-90 55 55)"/>'
      + '<text x="55" y="51" text-anchor="middle" font-size="19" font-weight="900" fill="#F4EEE8" id="slpPct">0%</text>'
      + '<text x="55" y="66" text-anchor="middle" font-size="8" fill="#6B5B4E">geral</text>'
      + '</svg>'
      + '<div class="slpbars">'
      + '<div class="sbr"><div class="sbrlbl">Sono</div><div class="sbrtrk"><div class="sbrfill" id="sb1" style="background:#E8622A"></div></div></div>'
      + '<div class="sbr"><div class="sbrlbl">Energia</div><div class="sbrtrk"><div class="sbrfill" id="sb2" style="background:#A855F7"></div></div></div>'
      + '<div class="sbr"><div class="sbrlbl">Metabolismo</div><div class="sbrtrk"><div class="sbrfill" id="sb3" style="background:#14B8A6"></div></div></div>'
      + '</div></div>'
      + '<h3 class="stitle aitem" style="font-size:22px;margin-bottom:12px">Sono</h3>'
      + '<p class="ssub aitem">O sono é essencial para seu condicionamento. Um bom sono melhora seu metabolismo, controla o apetite e dá mais energia.</p>'
      + '<div class="tipbox aitem"><span style="font-size:16px;flex-shrink:0">⏰</span><span><strong>Melhore a qualidade do sono!</strong> Estudos mostram que 30 minutos de exercício moderado podem melhorar sua qualidade de sono nessa mesma noite.</span></div>'
      + '<button class="btn aitem" onclick="advStep()">Continuar →</button>';
  }

  function buildFitnessAge() {
    var dob = S.answers.dob || '';
    var fa = calcFitnessAge(dob, S.answers, S.ageGroup);
    if (!fa || fa < 20 || isNaN(fa)) fa = 35;
    S.answers.fitnessAge = fa;
    S.fitnessAgeVal = fa;
    return '<div class="fares">'
      + '<div class="fasub aitem">Sua idade corporal é</div>'
      + '<div class="fanum aitem" id="faNum">0</div>'
      + '<div class="faunit aitem">anos</div>'
      + '<div class="faline aitem"></div>'
      + '<p class="fadesc aitem">Isso indica um envelhecimento acima da média. Exercícios irregulares e sono tardio aceleram o envelhecimento metabólico. Pessoas com metabolismo lento tendem a ganhar peso mais facilmente.</p>'
      + '<div class="facard aitem"><div class="fatrk"><div class="famkr" id="faMkr" style="left:10%"></div></div>'
      + '<div class="falbl">Seu corpo está mais velho que sua idade real</div></div>'
      + '<p style="font-size:11px;color:var(--tx3);margin-top:12px" class="aitem">Esta é uma estimativa baseada nas suas respostas, não uma avaliação médica.</p>'
      + '</div>'
      + '<button class="btn aitem" style="margin-top:20px" onclick="advStep()">Entendido →</button>';
  }

  function buildName() {
    return '<div class="phdr aitem"><span class="phdr-ico">✓</span><span class="phdr-txt">Seu plano personalizado de treino e dieta com a estratégia ideal para você está pronto!</span></div>'
      + '<h2 class="stitle aitem">Vamos personalizar<br>seu plano!</h2>'
      + '<div class="pprog aitem"><div class="pprogf" style="width:33%"></div></div>'
      + '<div class="ig aitem"><label class="ilbl">Como devemos te chamar?</label><input class="qinp" id="nameInp" type="text" placeholder="Seu nome" autocomplete="given-name" value="' + (S.answers.name || '') + '"></div>'
      + '<button class="btn aitem" onclick="submitName()">Continuar →</button>';
  }

  function buildDob() {
    return '<div class="phdr aitem"><span class="phdr-ico">✓</span><span class="phdr-txt">Seu plano personalizado de treino e dieta com a estratégia ideal para você está pronto!</span></div>'
      + '<h2 class="stitle aitem">Vamos personalizar<br>seu plano!</h2>'
      + '<div class="pprog aitem"><div class="pprogf" style="width:66%"></div></div>'
      + '<div class="ig aitem"><label class="ilbl">Qual é a sua data de nascimento?</label><input class="qinp" id="dobInp" type="text" placeholder="DD/MM/AAAA" maxlength="10" value="' + (S.answers.dob || '') + '"></div>'
      + '<button class="btn aitem" onclick="submitDob()">Continuar →</button>';
  }

  function buildEmail() {
    return '<div class="phdr aitem"><span class="phdr-ico">✓</span><span class="phdr-txt">Seu plano personalizado de treino e dieta com a estratégia ideal para você está pronto!</span></div>'
      + '<h2 class="stitle aitem">Onde enviamos<br>seu plano?</h2>'
      + '<div class="pprog aitem"><div class="pprogf" style="width:100%"></div></div>'
      + '<div class="ig aitem"><label class="ilbl">E-mail</label><input class="qinp" id="emailInp" type="email" inputmode="email" placeholder="seuemail@exemplo.com" autocomplete="email" value="' + (S.answers.email || '') + '"></div>'
      + '<p style="font-size:11px;color:var(--tx3);margin-top:6px" class="aitem">Respeitamos sua privacidade — sem spam.</p>'
      + '<button class="btn aitem" onclick="submitEmail()">Continuar →</button>';
  }

  function bindStep(step, idx) {
    var content = $('quizContent');

    if (step.type === 'select' || step.type === 'select-feedback') {
      content.querySelectorAll('.ocard').forEach(function (card) {
        card.addEventListener('click', function () {
          if (S.transitioning) return;
          var val = card.dataset.val;
          S.answers[step.key] = val;
          content.querySelectorAll('.ocard').forEach(function (c) { c.classList.remove('sel'); });
          card.classList.add('sel');
          playPop();
          if (step.type === 'select-feedback') {
            var opt = step.options.find(function (o) { return o.v === val; });
            var pct = opt ? opt.pct : 50;
            var banner = document.createElement('div');
            banner.className = 'fbanner';
            banner.innerHTML = '<span>🏃</span><div><strong>Você treinou mais que ' + pct + '% dos usuários*</strong><br>Isso facilita manter um plano de treino.</div>';
            var note = document.createElement('p');
            note.style.cssText = 'font-size:11px;color:var(--tx3);margin-top:6px';
            note.textContent = '*usuários do Desafio BWM que fizeram o quiz';
            var btn = document.createElement('button');
            btn.className = 'btn'; btn.textContent = 'Entendido →'; btn.style.marginTop = '12px';
            btn.onclick = advStep;
            content.appendChild(banner); content.appendChild(note); content.appendChild(btn);
          } else {
            S.transitioning = true;
            setTimeout(function () { S.transitioning = false; advStep(); }, 380);
          }
        });
      });
    }

    if (step.type === 'multiselect') {
      var sel = [];
      content.querySelectorAll('.mopt').forEach(function (opt) {
        opt.addEventListener('click', function () {
          var val = opt.dataset.val;
          if (val === 'none') {
            content.querySelectorAll('.mopt').forEach(function (o) { o.classList.remove('chk'); });
            sel = ['none']; opt.classList.add('chk');
          } else {
            var noneEl = content.querySelector('[data-val="none"]');
            if (noneEl) noneEl.classList.remove('chk');
            sel = sel.filter(function (v) { return v !== 'none'; });
            if (opt.classList.contains('chk')) { opt.classList.remove('chk'); sel = sel.filter(function (v) { return v !== val; }); }
            else { opt.classList.add('chk'); sel.push(val); }
          }
          playPop();
        });
      });
      window.__mCont = function () { S.answers[step.key] = sel; advStep(); };
    }

    if (step.type === 'scale') {
      content.querySelectorAll('.scbtn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          content.querySelectorAll('.scbtn').forEach(function (b) { b.classList.remove('sc'); });
          btn.classList.add('sc');
          S.answers[step.key] = parseInt(btn.dataset.val);
          var cont = $('scaleCont'); if (cont) cont.disabled = false;
          playPop();
        });
      });
    }

    if (step.type === 'input-dob') {
      var dobEl = $('dobInp');
      if (dobEl) dobEl.addEventListener('input', function () {
        var v = dobEl.value.replace(/\D/g, '');
        if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
        if (v.length >= 6) v = v.slice(0, 5) + '/' + v.slice(5, 9);
        dobEl.value = v;
      });
    }
  }

  function animPath(id) {
    var el = $(id); if (!el) return;
    var len = 800;
    try { var tl = el.getTotalLength(); if (tl > 0) len = tl + 20; } catch (e) { }
    el.style.strokeDasharray = len; el.style.strokeDashoffset = len;
    var t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / 1600, 1);
      var ease = 1 - Math.pow(1 - p, 2);
      el.style.strokeDashoffset = len * (1 - ease);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function animSleep() {
    var sc = S.answers.sleepScores || { sleep: 50, energy: 50, metabolism: 50, overall: 60 };
    function ab(id, v) { var el = $(id); if (el) el.style.width = v + '%'; }
    ab('sb1', sc.sleep); ab('sb2', sc.energy); ab('sb3', sc.metabolism);
    var r1 = 2 * Math.PI * 50, r2 = 2 * Math.PI * 40, r3 = 2 * Math.PI * 30;
    function ar(id, circ, pct) {
      var el = $(id); if (!el) return; var t0 = null;
      function step(ts) { if (!t0) t0 = ts; var p = Math.min((ts - t0) / 1300, 1); el.style.strokeDashoffset = circ - (circ * (pct / 100) * p); if (p < 1) requestAnimationFrame(step); }
      requestAnimationFrame(step);
    }
    ar('sr1', r1, sc.sleep); ar('sr2', r2, sc.energy); ar('sr3', r3, sc.metabolism);
    var pEl = $('slpPct'); if (!pEl) return;
    var t0 = null, tgt = sc.overall;
    function sp(ts) { if (!t0) t0 = ts; var p = Math.min((ts - t0) / 1300, 1); pEl.textContent = Math.round(p * tgt) + '%'; if (p < 1) requestAnimationFrame(sp); }
    requestAnimationFrame(sp);
  }

  function animFitnessAge() {
    var target = S.fitnessAgeVal;
    if (!target || isNaN(target) || target < 20) {
      target = calcFitnessAge(S.answers.dob || '', S.answers, S.ageGroup);
      if (!target || target < 20) target = 35;
      S.fitnessAgeVal = target;
    }
    var pct = Math.min(85, Math.max(15, ((target - 18) / 60) * 100));
    var numEl = $('faNum'), mkrEl = $('faMkr');
    if (!numEl) { setTimeout(animFitnessAge, 200); return; }
    var t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / 1100, 1);
      numEl.textContent = Math.round(p * target);
      if (mkrEl) mkrEl.style.left = (10 + p * (pct - 10)) + '%';
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  window.swipe = function (choice) {
    var step = STEPS[S.step];
    S.answers[step.key] = choice;
    var m = { dislike: 'sd', neutral: 'sn', like: 'sl' }[choice];
    var btn = $(m); if (btn) { btn.classList.add(m); }
    $('quizContent').querySelectorAll('.sbtn').forEach(function (b) { if (b.id !== m) b.style.opacity = '.4'; });
    playPop(); S.transitioning = true;
    setTimeout(function () { S.transitioning = false; advStep(); }, 500);
  };

  window.tinderSwipe = function (choice) {
    if (S.transitioning) return;
    var idx = S.tinderIdx;
    var stepData = S.tinderStepData;
    if (idx >= stepData.cards.length) return;
    var card = $('tc-' + idx);
    if (!card) return;
    S.answers[stepData.cards[idx].key] = choice;
    S.transitioning = true;
    if (choice === 'dislike') card.classList.add('swipe-left');
    else if (choice === 'neutral') card.classList.add('swipe-down');
    else card.classList.add('swipe-right');
    playPop();
    setTimeout(function () {
      card.style.display = 'none';
      S.tinderIdx++;
      S.transitioning = false;
      if (S.tinderIdx >= stepData.cards.length) { advStep(); }
    }, 400);
  };

  window.submitH = function () {
    var inp = $('hInp'), val = parseFloat(inp ? inp.value : '0');
    var unit = S.answers.heightUnit || 'cm';
    if (!val || val < (unit === 'cm' ? 100 : 3)) { if (inp) inp.style.borderColor = '#ef4444'; return; }
    S.answers.height = unit === 'cm' ? val : Math.round(val * 30.48);
    advStep();
  };
  window.submitW = function () {
    var cur = parseFloat($('wCur') ? $('wCur').value : '0');
    var tgt = parseFloat($('wTgt') ? $('wTgt').value : '0');
    if (!cur || cur < 20) { if ($('wCur')) $('wCur').style.borderColor = '#ef4444'; return; }
    var factor = (S.answers.weightUnit === 'lb') ? 0.453592 : 1;
    S.answers.weight = Math.round(cur * factor);
    S.answers.weightTarget = Math.round((tgt || cur * 0.9) * factor);
    advStep();
  };
  window.submitName = function () {
    var inp = $('nameInp'), val = inp ? inp.value.trim() : '';
    if (!val) { if (inp) inp.style.borderColor = '#ef4444'; return; }
    S.answers.name = val; advStep();
  };
  window.submitDob = function () {
    var inp = $('dobInp'), val = inp ? inp.value.trim() : '';
    if (val.length < 8) { if (inp) inp.style.borderColor = '#ef4444'; return; }
    S.answers.dob = val; advStep();
  };
  window.submitEmail = function () {
    var inp = $('emailInp'), val = inp ? inp.value.trim() : '';
    if (!val || !/^[^@]+@[^@]+\.[^@]+$/.test(val)) { if (inp) inp.style.borderColor = '#ef4444'; return; }
    S.answers.email = val;
    _track(function () {
      _sb.from('fitness_quiz_sessions').update({
        email: val, name: S.answers.name, answers: S.answers,
        calculated: {
          bmi: S.answers.height && S.answers.weight ? calcBMI(S.answers.height, S.answers.weight) : null,
          fitnessAge: S.answers.fitnessAge, sleepScores: S.answers.sleepScores
        },
        completed_at: new Date().toISOString()
      }).eq('session_id', S.sid).then(null, null);
    });
    try { localStorage.setItem('bwm_answers', JSON.stringify(S.answers)); } catch (e) { }
    advStep();
  };

  window.setHUnit = function (u) { S.answers.heightUnit = u; rerender(); };
  window.setWUnit = function (u) { S.answers.weightUnit = u; rerender(); };
  function rerender() {
    var c = $('quizContent'); c.style.opacity = '0';
    setTimeout(function () { renderStep(S.step); c.style.opacity = '1'; }, 100);
  }

  window.advStep = function () {
    if (S.transitioning) return;
    S.transitioning = true;
    setTimeout(function () { S.transitioning = false; }, 400);
    S.step++;
    if (S.step >= TOTAL) { goLoad(); return; }
    updateProg(S.step);
    renderStep(S.step);
    $('quizWrap').scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  window.advanceStep = window.advStep;

  function goBack() {
    if (S.step <= 0) {
      transTo('landing');
      $('gProg').classList.remove('vis');
      $('topBar').classList.remove('vis');
      return;
    }
    S.step--;
    updateProg(S.step);
    renderStep(S.step);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function goLoad() {
    transTo('loading');
    $('gProg').classList.remove('vis');
    $('topBar').classList.remove('vis');
    var txts = ['Analisando seu perfil...', 'Calculando seu plano ideal...', 'Cruzando dados de 1,3M de treinos...', 'Preparando seu relatório personalizado...'];
    var durs = [1100, 1200, 1200, 1300];
    var elapsed = 0, lt = $('loadTxt'), lp = $('loadPct');
    txts.forEach(function (txt, i) {
      setTimeout(function () { lt.style.opacity = '0'; setTimeout(function () { lt.textContent = txt; lt.style.opacity = '1'; }, 200); }, elapsed);
      elapsed += durs[i];
    });
    var t0 = null, total = 4800;
    function step(ts) { if (!t0) t0 = ts; var p = Math.min((ts - t0) / total, 1); lp.textContent = Math.round(p * 100) + '%'; if (p < 1) requestAnimationFrame(step); else showCommit(); }
    requestAnimationFrame(step);
  }

  function showCommit() { $('commitModal').classList.add('op'); }

  window.commitChoice = function (choice) {
    S.answers.commitment = choice;
    try { localStorage.setItem('bwm_answers', JSON.stringify(S.answers)); } catch (e) {}
    $('commitModal').classList.remove('op');
    transTo('result').then(populateResult);
    startTimer();
  };

  function initSquareParticles() {
    var c = $('sqParticles');
    if (!c) return;
    c.innerHTML = '';
    for (var i = 0; i < 14; i++) {
      var sq = document.createElement('div');
      sq.className = 'sq-p';
      var sz = (5 + Math.random() * 8) + 'px';
      sq.style.cssText = 'left:' + (Math.random() * 95) + '%;width:' + sz + ';height:' + sz + ';animation-duration:' + (3.5 + Math.random() * 5) + 's;animation-delay:' + (Math.random() * 7) + 's';
      c.appendChild(sq);
    }
  }

  function startBuyerNotifications() {
    var names = [
      'lucas*', 'ana*', 'gabriel*', 'mariana*', 'rafael*', 'julia*', 'thiago*', 'camila*'
    ];
    function cycleCard(cardId, startDelay, interval) {
      var card = $(cardId);
      if (!card) return;
      var nameEl = card.querySelector('.toast-card-name');
      var idx = Math.floor(Math.random() * names.length);
      function cycle() {
        card.classList.remove('tshow');
        setTimeout(function () {
          nameEl.textContent = names[idx % names.length] + ' comprou';
          idx++;
          card.classList.add('tshow');
          setTimeout(function () {
            card.classList.remove('tshow');
            setTimeout(cycle, 480);
          }, interval);
        }, 400);
      }
      setTimeout(cycle, startDelay);
    }
    cycleCard('toastCard1', 900, 3400);
    cycleCard('toastCard2', 2400, 3800);
  }

  function populateResult() {
    var ans = S.answers;
    if (ans.height && ans.weight) {
      var bmi = calcBMI(ans.height, ans.weight);
      var bi = bmiInfo(bmi);
      var bmiEl = $('r-bmi'); if (bmiEl) bmiEl.textContent = bmi.toFixed(1) + ' IMC';
      var stEl = $('r-bmi-status'); if (stEl) { stEl.textContent = bi.label; stEl.className = 'bmistatus ' + bi.cls; }
      var mkr = $('r-bmi-mkr'); if (mkr) setTimeout(function () { mkr.style.left = bi.pct + '%'; }, 400);
      var cal = calcCalories(ans.weight, ans.goal);
      var calEl = $('r-cal'); if (calEl) calEl.textContent = cal + ' kcal';
      var cp = Math.max(5, Math.min(95, Math.round(((cal - 1000) / 4000) * 100)));
      var cf = $('r-cal-fill'), ct = $('r-cal-thumb');
      if (cf) cf.style.width = cp + '%'; if (ct) ct.style.left = cp + '%';
      var water = calcWater(ans.weight);
      var we = $('r-water'); if (we) we.textContent = water.toFixed(1) + ' l';
      /* water cups */
      var wc = $('r-water-cups');
      if (wc) {
        var filled = Math.min(8, Math.round(water / 0.35));
        var h = '';
        for (var i = 0; i < 8; i++) h += '<span class="wcup' + (i >= filled ? ' dim' : '') + '">\uD83E\uDD64</span>';
        wc.innerHTML = h;
        if (window.twemoji) twemoji.parse(wc, { folder: 'svg', ext: '.svg', base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/' });
      }
    }
    initSquareParticles();
    startBuyerNotifications();
    var ub = document.getElementById('urgencyBar'); if (ub) ub.style.display = 'block';
    (function urgCountdown() {
      var secs = 300, el = document.getElementById('urgTimer');
      if (!el) return;
      function tick() {
        if (secs < 0) secs = 0;
        var m = Math.floor(secs / 60), s = secs % 60;
        el.textContent = String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
        if (secs > 0) { secs--; setTimeout(tick, 1000); }
      }
      tick();
    })();
  }

  function startTimer() {
    var secs = 600;
    try { var sv = sessionStorage.getItem('bwm_timer'); if (sv) secs = parseInt(sv); else sessionStorage.setItem('bwm_timer', '600'); } catch (e) { }
    function tick() {
      if (secs < 0) secs = 0;
      var m = Math.floor(secs / 60), s = secs % 60;
      var el = $('timerVal'); if (el) el.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
      if (secs > 0) { secs--; setTimeout(tick, 1000); }
    }
    tick();
  }

  // DEV ONLY: atalho temporário para pular direto à PV final
  window.devGoToPV = function () { transTo('result').then(populateResult); };

  window.selectPlan = function (id) {
    document.querySelectorAll('.plancard').forEach(function (c) { c.classList.remove('psel'); });
    var el = $('plan-' + id); if (el) el.classList.add('psel');
  };

  window.handleGetPlan = function () {
    _track(function () {
      _sb.from('fitness_quiz_sessions').update({ cta_clicked_at: new Date().toISOString() }).eq('session_id', S.sid).then(null, null);
    });
    window.location.href = 'https://ggcheckout.app/checkout/v2/5k9MK9m8b8ZpSm8qkk6z';
  };

  window.scrollToPricing = function () {
    var el = $('pricingSection'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  window.selectAge = function (age) {
    S.ageGroup = age;
    S.answers.ageGroup = age;
    S.sid = _uuid();
    _firstRender = true;
    try { sessionStorage.setItem('bwm_sid', S.sid); } catch (e) { }
    var u = _utms();
    _track(function () {
      _sb.from('fitness_quiz_sessions').insert({
        session_id: S.sid, started_at: new Date().toISOString(),
        age_group: age, device_type: _device(),
        utm_source: u.source, utm_medium: u.medium, utm_campaign: u.campaign
      }).then(null, null);
    });
    transTo('quiz-screen').then(function () {
      S.step = 0;
      renderStep(0);
      updateProg(0);
      $('gProg').classList.add('vis');
      $('topBar').classList.add('vis');
    });
    playPop();
  };

  window.selScale = function (n) {
    document.querySelectorAll('.scbtn').forEach(function (b) { b.classList.remove('sc'); });
    var btn = document.querySelector('.scbtn[data-val="' + n + '"]');
    if (btn) btn.classList.add('sc');
    var step = STEPS[S.step];
    if (step) S.answers[step.key] = n;
    var cont = document.getElementById('scaleCont');
    if (cont) cont.disabled = false;
  };

  function init() {
    $('backBtn').addEventListener('click', goBack, { passive: true });
  }
  init();
})();