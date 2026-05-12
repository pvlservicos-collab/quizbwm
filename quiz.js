    var WA = '5521983101866';
    var PROFS = {
      C: {
        key: 'C', letter: 'C', color: '#E83232', bg: 'rgba(232,50,50,.08)', border: 'rgba(232,50,50,.28)',
        badge: 'CORTISOL ELEVADO', name: 'Cortisol Elevado',
        headline: 'Seu corpo está em modo de defesa, e guarda gordura exatamente onde você mais quer perder.',
        mechanism: 'Cortisol cronicamente alto deposita gordura abdominal, destrói massa muscular e suprime testosterona. Treinar mais, sem o protocolo certo, piora o quadro.',
        signals: ['Gordura piora com estresse ou treino excessivo', 'Recuperação lenta entre os treinos', 'Rendimento oscila sem motivo claro', 'Barriga resiste mesmo com dieta controlada'],
        solution: 'O protocolo da semana 1 reduz cortisol enquanto você mantém a intensidade. Com cortisol caindo, testosterona sobe. Na semana 2, esse ambiente hormonal diferente faz o esforço gerar resultado real.',
        evo1: ['Dieta redutora de cortisol', 'Treino calibrado, sem sobrecarga', 'Inflamação caindo'],
        evo2: ['Testosterona em alta', 'Alta intensidade com resultado real', 'Construção sem catabolismo']
      },
      I: {
        key: 'I', letter: 'I', color: '#3B82F6', bg: 'rgba(59,130,246,.08)', border: 'rgba(59,130,246,.28)',
        badge: 'INSULINA DESREGULADA', name: 'Insulina Desregulada',
        headline: 'Seu corpo está acumulando em vez de construindo, e o carboidrato é o termômetro disso.',
        mechanism: 'Com resistência à insulina, o carboidrato vai para gordura em vez de músculo. A queima de gordura fica bloqueada mesmo em déficit calórico.',
        signals: ['Inchaço ou moleza depois de comer carbo', 'Gordura abdominal que resiste a qualquer dieta', 'Difícil ganhar músculo sem ganhar gordura junto', 'Sensação de engordar fácil mesmo comendo pouco'],
        solution: 'Os primeiros 7 dias usam composição específica de macros para reduzir insulina basal e reativar os receptores. Na semana 2, o carboidrato vai direto para músculo, e a recomposição começa de verdade.',
        evo1: ['Carboidrato reduzido estrategicamente', 'Insulina normalizando', 'Queima de gordura desbloqueada'],
        evo2: ['Carbo reintroduzido com precisão', 'Nutrição indo para músculo', 'Recomposição real iniciando']
      },
      F: {
        key: 'F', letter: 'F', color: '#22C55E', bg: 'rgba(34,197,94,.08)', border: 'rgba(34,197,94,.28)',
        badge: 'INFLAMAÇÃO SILENCIOSA', name: 'Inflamação Silenciosa',
        headline: 'Existe algo bloqueando seu resultado que você não sente, mas está presente o tempo todo.',
        mechanism: 'Inflamação crônica de baixo grau não dói, mas bloqueia síntese muscular, queima de gordura e recuperação ao mesmo tempo.',
        signals: ['Corpo pesado ou inchado além da gordura', 'Recuperação que demora mais do que deveria', 'Resultado estagna mesmo com dieta e treino certos', 'Esforço que não se converte em resultado visual'],
        solution: 'A dieta da semana 1 é especificamente anti-inflamatória. Com inflamação reduzida, o corpo usa o treino para construir. A semana 2 aproveita esse ambiente limpo para construção muscular real.',
        evo1: ['Dieta anti-inflamatória ativa', 'Treino sem agravar a inflamação', 'Recuperação melhorando'],
        evo2: ['Síntese muscular desbloqueada', 'Alta intensidade com recuperação real', 'Corpo respondendo ao esforço']
      },
      M: {
        key: 'M', letter: 'M', color: '#A855F7', bg: 'rgba(168,85,247,.08)', border: 'rgba(168,85,247,.28)',
        badge: 'METABOLISMO ADAPTADO', name: 'Metabolismo Adaptado',
        headline: 'Você não está fazendo errado, seu corpo aprendeu a resistir ao que você faz.',
        mechanism: 'Cada ciclo de restrição sem variação de estímulo desacelera o metabolismo. O corpo aprende a funcionar com menos, e cada nova tentativa começa em ponto de partida pior.',
        signals: ['Low carb ou déficit que funcionava parou de funcionar', 'Cada tentativa rende menos que a anterior', 'Resultado aparece no início e trava sempre', 'Parece que precisa de mais esforço para resultado menor'],
        solution: 'O BWM não usa mais restrição. Trabalha com composição dos macros para criar ambiente metabólico diferente. A variação entre semana 1 e 2 impede adaptação, você termina com metabolismo mais rápido.',
        evo1: ['Novo estímulo, o corpo responde', 'Variação calculada impede adaptação', 'Metabolismo acelerando'],
        evo2: ['Fase de construção ativa', 'Músculo crescendo sem trava', 'Metabolismo mais rápido que no início']
      },
    };
    var ZONES = { belly: { title: 'Barriga e pochete', hint: 'Sinal comum de cortisol elevado ou resistência à insulina' }, flanks: { title: 'Flancos e cintura', hint: 'Padrão típico de cortisol cronicamente alto' }, chest: { title: 'Peito e região superior', hint: 'Indica possível resistência à insulina' }, full: { title: 'Gordura difusa', hint: 'Sugere inflamação sistêmica ou metabolismo adaptado' } };
    var DEPS = {
      C: {
        m: { img: 'fotodep6', name: 'Ramon', quote: 'Rotina militar, pouco sono, vida puxada — minha barriga não respondia a nada que eu fazia. Em 14 dias o resultado apareceu.' },
        f: { img: 'fotodep8', name: 'Ellen', quote: 'Sem ganhar peso, minha cintura foi perdendo forma. Comecei o protocolo e em 2 semanas o contorno voltou.' }
      },
      I: {
        m: { img: 'fotodep2', name: 'Victor', quote: 'Tinha a pochete há anos. Com o protocolo o abdômen começou a aparecer de verdade — gordura abdominal que nunca tinha saído antes.' },
        f: { img: 'fotodep8', name: 'Ellen', quote: 'Gordura travada nos flancos e na cintura. Em 14 dias vi diferença real onde nunca consegui antes.' }
      },
      F: {
        m: { img: 'fotodep3', name: 'Lucas', quote: 'Fiquei mais seco e mais forte sem restrição extrema. Corpo menos inchado, resultado mais limpo em menos de 2 semanas.' },
        f: { img: 'fotodep1', name: 'Ingrid', quote: 'Comia pouco e o corpo estava completamente travado. Com o método certo, a gordura começou a sair e o inchaço sumiu.' }
      },
      M: {
        m: { img: 'fotodep4', name: 'Rafael', quote: 'Passei de 1800 para 2300 kcal e fiquei mais seco. Meu metabolismo estava adaptado e eu não sabia disso.' },
        f: { img: 'fotodep1', name: 'Ingrid', quote: 'Meu corpo não respondia mais a nada. Com o método certo o travamento reverteu completamente em 14 dias.' }
      }
    };
    var QS = [
      { t: 'Qual frase descreve melhor o que você vive hoje?', opts: [{ t: 'Treino e me cuido, mas o espelho pouco muda', e: '🪞', s: { C: 1, I: 1, F: 1, M: 1 } }, { t: 'Perco peso mas fico murcho, não fico definido', e: '📉', s: { I: 2, M: 2 } }, { t: 'Já tive resultado antes e agora nada funciona mais', e: '🔄', s: { M: 3 } }, { t: 'Meu problema é mais constância do que resultado travado', e: '⏱️', s: { C: 1 } }] },
      { t: 'Onde fica a gordura mais resistente no seu corpo?', micro: 'body', opts: [{ t: 'Barriga e pochete, nunca sai independente do que faço', e: '🎯', s: { C: 2, I: 3 }, zone: 'belly' }, { t: 'Flancos e cintura, mesmo quando emagreço, fica ali', e: '📐', s: { C: 3, I: 1 }, zone: 'flanks' }, { t: 'Peito e parte superior, gordura misturada com músculo', e: '💪', s: { I: 2, M: 2 }, zone: 'chest' }, { t: 'Corpo todo, não é localizada em um ponto específico', e: '🔴', s: { F: 3, M: 1 }, zone: 'full' }] },
      { t: 'Como você descreveria sua energia ao longo do dia?', opts: [{ t: 'Dependo de café ou pré-treino para funcionar', e: '☕', s: { F: 2, M: 2 } }, { t: 'Cai muito depois do almoço, parece que desligo', e: '😴', s: { I: 3 } }, { t: 'Irregular, dias bons e dias que não saio do lugar', e: '📊', s: { C: 2, M: 1 } }, { t: 'É estável, não é o meu problema principal', e: '✅', s: { C: 1 } }] },
      { t: 'Quando você come carboidrato, o que normalmente acontece?', opts: [{ t: 'Incho rápido ou me sinto pesado logo depois', e: '🫧', s: { I: 2, F: 2 } }, { t: 'Dá sono ou moleza, parece que o corpo desliga', e: '💤', s: { I: 3, M: 1 } }, { t: 'Parece que ganho gordura mais fácil nos dias com mais carbo', e: '📈', s: { I: 3 } }, { t: 'Não consigo perceber diferença clara', e: '🤷', s: { M: 2 } }] },
      { t: 'Como você se sente depois de treinar?', micro: 'chart', opts: [{ t: 'Quebrado por muito tempo, recuperação demora demais', e: '🩹', s: { C: 2, F: 2 }, effort: 92, result: 18 }, { t: 'Rendimento oscila sem motivo claro', e: '🎲', s: { C: 3, M: 1 }, effort: 82, result: 28 }, { t: 'Treino bem, mas resultado visual não aparece na proporção', e: '🔍', s: { I: 2, M: 2 }, effort: 80, result: 24 }, { t: 'Me recupero bem e o treino rende', e: '⚡', s: { C: 1 }, effort: 72, result: 68 }] },
      { t: 'Quando você tenta apertar a dieta, o que costuma acontecer?', opts: [{ t: 'Perco no início e depois o resultado trava', e: '🧱', s: { M: 3 } }, { t: 'Fico sem energia e o treino vai para o saco', e: '😩', s: { F: 2, M: 2 } }, { t: 'A fome explode, fico pensando em comida o tempo todo', e: '🍔', s: { I: 2, C: 2 } }, { t: 'Funciona bem enquanto consigo manter', e: '👍', s: { C: 1 } }] },
      { t: 'O que você percebe com mais clareza no seu caso?', opts: [{ t: 'Gordura piora com mais estresse ou quando treino demais', e: '😤', s: { C: 4 } }, { t: 'Gordura piora claramente quando como mais carboidrato', e: '🍞', s: { I: 4 } }, { t: 'Corpo inchado, pesado, recuperação ruim', e: '💧', s: { F: 4 } }, { t: 'Corpo para de responder depois de um tempo em qualquer protocolo', e: '🔒', s: { M: 4 } }] },
    ];

    // ── SUPABASE TRACKING ──
    var _SB_URL = 'https://fftgdntnavupoghgamia.supabase.co';
    var _SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdGdkbnRuYXZ1cG9naGdhbWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1ODgzMDYsImV4cCI6MjA5MzE2NDMwNn0.dP_vw2K3uFwjw7H4o2H4HDrJVc74vHO_4bnAK7orCYs';
    var _SB_SID = (function () {
      try {
        var s = sessionStorage.getItem('bwm_sid_v2');
        if (!s) { s = 'bwm-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9); sessionStorage.setItem('bwm_sid_v2', s); }
        return s;
      } catch (e) { return 'bwm-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9); }
    })();
    function _sbPatch(data) {
      try {
        fetch(_SB_URL + '/rest/v1/fitness_quiz_sessions?session_id=eq.' + encodeURIComponent(_SB_SID), {
          method: 'PATCH',
          headers: { 'apikey': _SB_KEY, 'Authorization': 'Bearer ' + _SB_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
          body: JSON.stringify(data), keepalive: true
        });
      } catch (e) { }
    }
    window.addEventListener('load', function () {
      setTimeout(function () {
        try {
          if (sessionStorage.getItem('bwm_sid_ins')) return;
          var p = new URLSearchParams(window.location.search);
          fetch(_SB_URL + '/rest/v1/fitness_quiz_sessions', {
            method: 'POST',
            headers: { 'apikey': _SB_KEY, 'Authorization': 'Bearer ' + _SB_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
            body: JSON.stringify({ session_id: _SB_SID, started_at: new Date().toISOString(), device_type: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop', utm_source: p.get('utm_source') || null, utm_medium: p.get('utm_medium') || null, utm_campaign: p.get('utm_campaign') || null })
          }).then(function () { try { sessionStorage.setItem('bwm_sid_ins', '1'); } catch (e) { } });
        } catch (e) { }
      }, 500);
    }, { once: true });

    // ── GENDER / AGE SELECTION ──
    var ageStep = false;
    function selectGender(g) {
      try { localStorage.setItem('bwm_gender', g); } catch (e) { }
      _sbPatch({ gender: g });
      ageStep = true;
      go('sc-quiz');
      renderAgeCards();
    }
    function renderAgeCards() {
      var ages = [
        { label: '18 a 29', range: '18-29', img: 'c2m1' },
        { label: '30 a 39', range: '30-39', img: 'c2m2' },
        { label: '40 a 49', range: '40-49', img: 'c2m3' },
        { label: '50+ anos', range: '50+',  img: 'c2m4' }
      ];
      var h = '<h1 class="q-title">Qual é a sua faixa etária?</h1>'
        + '<div class="agrid" style="padding:0;max-width:100%">';
      ages.forEach(function(a) {
        h += '<div class="acard" onclick="selectAge(\'' + a.range + '\')">'
          + '<div class="aimg"><picture>'
          + '<source srcset="img/' + a.img + '.webp" type="image/webp">'
          + '<img src="img/' + a.img + '.png" alt="' + a.label + '" onerror="this.closest(\'.aimg\').innerHTML=\'<div style=&quot;font-size:42px;display:flex;align-items:flex-end;justify-content:center;height:100%;padding-bottom:6px&quot;>&#128104;</div>\'">'
          + '</picture></div>'
          + '<div class="albl">' + a.label + '</div>'
          + '</div>';
      });
      h += '</div>';
      document.getElementById('qContent').innerHTML = h;
      document.getElementById('prog-fill').style.width = '0%';
      document.getElementById('prog-txt').textContent = '';
    }
    function selectAge(range) {
      try { localStorage.setItem('bwm_age', range); } catch (e) { }
      _sbPatch({ age_group: range });
      ageStep = false;
      startQuiz();
    }

    // ── SCREENS ──
    var CUR = 'sc-intro', PREV = 'sc-intro';
    function go(id) {
      var prev = document.getElementById(CUR);
      if (prev) { prev.classList.remove('on'); }
      var next = document.getElementById(id);
      if (next) { next.classList.add('on'); }
      PREV = CUR; CUR = id;
      window.scrollTo(0, 0);
      var tb = document.getElementById('topbar');
      if (id === 'sc-intro' || id === 'sc-docs') { tb.classList.remove('on'); }
      else if (id === 'sc-result') { tb.classList.remove('on'); }
      else { tb.classList.add('on'); }
    }
    function goBack() {
      if (CUR === 'sc-quiz' && ageStep) { ageStep = false; go('sc-intro'); }
      else if (CUR === 'sc-quiz' && qIdx > 0) { qIdx--; renderQ(); }
      else if (CUR === 'sc-micro') { clearTimeout(microTmr); go('sc-quiz'); renderQ(); }
      else if (CUR === 'sc-quiz') { scores = { C: 0, I: 0, F: 0, M: 0 }; go('sc-intro'); }
    }

    // ── QUIZ ──
    var qIdx = 0, scores = { C: 0, I: 0, F: 0, M: 0 }, scoreHistory = [], microTmr = null, microData = null, profile = null;
    function startQuiz() { qIdx = 0; scores = { C: 0, I: 0, F: 0, M: 0 }; scoreHistory = []; go('sc-quiz'); renderQ(); }
    function updProg() {
      var p = Math.round((qIdx / QS.length) * 100);
      document.getElementById('prog-fill').style.width = p + '%';
      document.getElementById('prog-txt').textContent = (qIdx + 1) + ' / ' + QS.length;
    }
    function renderQ() {
      var q = QS[qIdx];
      var h = '<h1 class="q-title">' + q.t + '</h1><div class="q-opts">';
      q.opts.forEach(function (o, i) {
        h += '<button class="opt-btn" type="button" onclick="answer(' + i + ')"><span>' + o.t + '</span>' + (o.e ? '<span class="opt-e">' + o.e + '</span>' : '') + '</button>';
      });
      h += '</div>';
      document.getElementById('qContent').innerHTML = h;
      updProg();
    }
    function answer(i) {
      var q = QS[qIdx], o = q.opts[i];
      var btns = document.querySelectorAll('.opt-btn');
      if (btns[i]) btns[i].classList.add('sel');
      Object.keys(o.s || {}).forEach(function (k) { scores[k] = (scores[k] || 0) + o.s[k]; });
      scoreHistory.push({ C: scores.C || 0, I: scores.I || 0, F: scores.F || 0, M: scores.M || 0 });
      _sbPatch({ last_card: 'Q' + (qIdx + 1) + '/' + QS.length });
      var next = qIdx + 1;
      if (q.micro) {
        microData = { type: q.micro, zone: o.zone, effort: o.effort, result: o.result, next: next };
        setTimeout(function () { go('sc-micro'); renderMicro(); microTmr = setTimeout(advMicro, 2250); }, 220);
      } else {
        setTimeout(function () { if (next >= QS.length) startLoad(); else { qIdx = next; go('sc-quiz'); renderQ(); } }, 260);
      }
    }
    function advMicro() { clearTimeout(microTmr); var n = microData ? microData.next : qIdx + 1; if (n >= QS.length) startLoad(); else { qIdx = n; go('sc-quiz'); renderQ(); } }
    function renderMicro() {
      var el = document.getElementById('microContent'), d = microData; if (!d) return;
      if (d.type === 'body') {
        var z = ZONES[d.zone] || ZONES.belly, f = d.zone === 'full';
        var belly = (d.zone === 'belly' || f) ? '#E83232' : 'rgba(255,255,255,.06)';
        var flanks = (d.zone === 'flanks' || f) ? '#E83232' : 'rgba(255,255,255,.04)';
        var chest = (d.zone === 'chest' || f) ? '#E83232' : 'rgba(255,255,255,.06)';
        el.innerHTML = '<div class="micro-card"><div class="micro-eyebrow">Área identificada</div>'
          + '<svg viewBox="0 0 100 200" style="width:120px;height:240px;display:block;margin:0 auto 16px">'
          + '<circle cx="50" cy="18" r="12" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.1)" stroke-width=".5"/>'
          + '<rect x="45" y="29" width="10" height="8" fill="rgba(255,255,255,.06)"/>'
          + '<rect x="11" y="42" width="10" height="50" rx="5" fill="rgba(255,255,255,.04)"/>'
          + '<rect x="79" y="42" width="10" height="50" rx="5" fill="rgba(255,255,255,.04)"/>'
          + '<rect x="28" y="38" width="44" height="30" rx="5" fill="' + chest + '"/>'
          + '<rect x="19" y="44" width="10" height="44" rx="4" fill="' + flanks + '"/>'
          + '<rect x="71" y="44" width="10" height="44" rx="4" fill="' + flanks + '"/>'
          + '<rect x="30" y="67" width="40" height="24" rx="4" fill="' + belly + '"/>'
          + '<rect x="31" y="91" width="16" height="58" rx="5" fill="rgba(255,255,255,.04)"/>'
          + '<rect x="53" y="91" width="16" height="58" rx="5" fill="rgba(255,255,255,.04)"/>'
          + '</svg>'
          + '<div style="font-size:14px;font-weight:700;margin-bottom:6px">' + z.title + '</div>'
          + '<p class="micro-hint">' + z.hint + '</p>'
          + '</div><div class="micro-prog"><div class="micro-prog-fill" id="microProgFill"></div></div>';
      } else {
        var ef = d.effort || 80, rs = d.result || 25, mxH = Math.round(0.14 * window.innerHeight);
        var eH = Math.round((ef / 100) * mxH), rH = Math.round((rs / 100) * mxH);
        var cH = mxH + 36;
        var msg = rs > 55 ? 'Bom sinal de recuperação. O gargalo pode estar em outro fator metabólico.' : 'Quando esforço e resultado não são proporcionais, o problema é hormonal, não de dedicação.';
        el.innerHTML = '<div class="micro-card"><div class="micro-eyebrow">Proporção detectada</div>'
          + '<div style="display:flex;gap:32px;align-items:flex-end;justify-content:center;height:' + cH + 'px;padding-bottom:4px;margin-bottom:14px">'
          + '<div style="display:flex;flex-direction:column;align-items:center;gap:6px"><span style="font-size:12px;color:#fff;font-weight:600">' + ef + '%</span><div style="width:52px;height:' + eH + 'px;background:linear-gradient(180deg,#E83232,#C01818);border-radius:4px 4px 0 0;min-height:4px"></div><div style="width:52px;height:1px;background:rgba(255,255,255,.1)"></div><span style="font-size:11px;color:#fff">Esforço</span></div>'
          + '<div style="display:flex;flex-direction:column;align-items:center;gap:6px"><span style="font-size:12px;color:#fff;font-weight:600">' + rs + '%</span><div style="width:52px;height:' + rH + 'px;background:rgba(255,255,255,.15);border-radius:4px 4px 0 0;min-height:4px"></div><div style="width:52px;height:1px;background:rgba(255,255,255,.1)"></div><span style="font-size:11px;color:#fff">Resultado</span></div>'
          + '</div><p class="micro-hint">' + msg + '</p>'
          + '</div><div class="micro-prog"><div class="micro-prog-fill" id="microProgFill"></div></div>';
      }
      setTimeout(function () { var f = document.getElementById('microProgFill'); if (f) f.style.width = '100%'; }, 40);
    }

    // ── LOADING ──
    function skipToResult() {
      if (!profile) { var winner = Object.entries(scores).sort(function (a, b) { return b[1] - a[1]; })[0][0]; profile = PROFS[winner] || PROFS['C']; _sbPatch({ profile_result: winner, last_card: 'Resultado' }); }
      showResult();
    }
    function startLoad() {
      var winner = Object.entries(scores).sort(function (a, b) { return b[1] - a[1]; })[0][0];
      profile = PROFS[winner];
      _sbPatch({ profile_result: winner, last_card: 'Resultado' });
      go('sc-load');
      var pct = 0, mi = 0, msgs = ['Analisando seu perfil metabólico...', 'Identificando o gargalo principal...', 'Preparando seu resultado...'];
      var iv = setInterval(function () {
        pct += 6; if (pct > 100) pct = 100;
        document.getElementById('loadPct').textContent = pct + '%';
        var nmi = Math.floor((pct / 100) * msgs.length); if (nmi !== mi && nmi < msgs.length) { mi = nmi; document.getElementById('loadTxt').textContent = msgs[mi]; }
        if (pct >= 100) { clearInterval(iv); setTimeout(showResult, 500); }
      }, 100);
    }

    // ── RESULT ──
    function showResult() {
      _sbPatch({ completed_at: new Date().toISOString() });
      populateResult(); go('sc-result');
      setTimeout(function () { initCar(); initVidCar(); startToasts(); startUrgency(); initVidLazy(); }, 200);
    }
    function populateResult() {
      var p = profile; if (!p) return;
      function s(id, v) { var e = document.getElementById(id); if (e) e.textContent = v; }
      var badge = document.getElementById('rBadge');
      badge.textContent = p.badge; badge.style.background = 'rgba(232,50,50,.12)'; badge.style.border = '1px solid rgba(232,50,50,.35)'; badge.style.color = '#E83232';
      s('rName', p.name); s('rHeadline', p.headline); s('rMech', p.mechanism); s('rSol', p.solution);

      document.getElementById('rSigs').innerHTML = p.signals.map(function (sg) { return '<div class="r-sig"><div class="r-dot"></div><span>' + sg + '</span></div>'; }).join('');
      document.getElementById('rEvo1').innerHTML = p.evo1.map(function (b) { return '<div class="evo-bul"><span class="evo-d"></span><span>' + b + '</span></div>'; }).join('');
      document.getElementById('rEvo2').innerHTML = p.evo2.map(function (b) { return '<div class="evo-bul"><span class="evo-d"></span><span>' + b + '</span></div>'; }).join('');
      var cats = [{ k: 'C', label: 'Cortisol', col: '#E83232' }, { k: 'I', label: 'Insulina', col: '#3B82F6' }, { k: 'F', label: 'Inflamação', col: '#22C55E' }, { k: 'M', label: 'Metabolismo', col: '#A855F7' }];

      // ── LINE CHART ──
      var legendEl = document.getElementById('rLineLegend'), svgEl = document.getElementById('rLineSvg');
      if (legendEl && svgEl) {
        legendEl.innerHTML = cats.map(function (c) {
          return '<span style="display:inline-flex;align-items:center;gap:5px;font-size:9px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#fff">'
            + '<span style="width:14px;height:2.5px;background:' + c.col + ';border-radius:2px;display:inline-block"></span>' + c.label + '</span>';
        }).join('');
        var hist = scoreHistory, n = hist.length;
        var W = 260, H = 80, PL = 18, PR = 8, PT = 6, PB = 18;
        var cW = W - PL - PR, cH = H - PT - PB;
        var mxH = 1;
        if (n > 0) { hist.forEach(function (h) { cats.forEach(function (c) { if ((h[c.k] || 0) > mxH) mxH = h[c.k]; }); }); }
        function xp(i) { return PL + (n > 1 ? (i / (n - 1)) * cW : cW / 2); }
        function yp(v) { return PT + cH - (v / mxH) * cH; }
        var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;height:auto;display:block" xmlns="http://www.w3.org/2000/svg">';
        for (var gi = 0; gi <= 3; gi++) {
          var gy = PT + (gi / 3) * cH;
          svg += '<line x1="' + PL + '" y1="' + gy.toFixed(1) + '" x2="' + (W - PR) + '" y2="' + gy.toFixed(1) + '" stroke="rgba(255,255,255,.07)" stroke-width=".5"/>';
        }
        for (var xi = 0; xi < n; xi++) {
          var xpi = xp(xi);
          svg += '<text x="' + xpi.toFixed(1) + '" y="' + (H - 4) + '" text-anchor="middle" font-size="7" fill="rgba(255,255,255,.3)" font-family="Manrope,sans-serif">P' + (xi + 1) + '</text>';
          svg += '<line x1="' + xpi.toFixed(1) + '" y1="' + (PT + cH) + '" x2="' + xpi.toFixed(1) + '" y2="' + (PT + cH + 3) + '" stroke="rgba(255,255,255,.12)" stroke-width=".5"/>';
        }
        cats.forEach(function (c) {
          if (n === 0) return;
          var pts = hist.map(function (h, i) { return xp(i).toFixed(1) + ',' + yp(h[c.k] || 0).toFixed(1); }).join(' ');
          svg += '<polyline points="' + pts + '" fill="none" stroke="' + c.col + '" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" opacity=".9"/>';
          hist.forEach(function (h, i) {
            svg += '<circle cx="' + xp(i).toFixed(1) + '" cy="' + yp(h[c.k] || 0).toFixed(1) + '" r="2" fill="' + c.col + '" opacity=".95"/>';
          });
        });
        svg += '</svg>';
        svgEl.innerHTML = svg;
      }

      // ── TESTIMONIAL CARD ──
      var depEl = document.getElementById('depCard');
      if (depEl) {
        var genderVal = (function () { try { return localStorage.getItem('bwm_gender') || ''; } catch (e) { return ''; } })();
        var gKey = genderVal === 'female' ? 'f' : 'm';
        var dep = DEPS[p.key] && DEPS[p.key][gKey];
        if (dep) {
          depEl.innerHTML = '<div class="dep-wrap">'
            + '<img src="img/' + dep.img + '.jpg" alt="' + dep.name + '" loading="lazy" class="dep-img" onerror="this.style.display=\'none\'">'
            + '<div class="dep-body">'
            + '<div class="dep-lbl">Resultado real</div>'
            + '<p class="dep-quote">&ldquo;' + dep.quote + '&rdquo;</p>'
            + '<div class="dep-name">— ' + dep.name + '</div>'
            + '</div></div>';
        }
      }
    }

    // ── PRICING ──
    var pricEl = document.getElementById('pricSec');
    function scrollToPric() { if (pricEl) pricEl.scrollIntoView({ behavior: 'smooth' }); }
    function handleBuy() { _sbPatch({ cta_clicked_at: new Date().toISOString() }); window.location.href = 'https://checkout.ticto.app/O284F0D2A'; }

    // ── TOASTS ──
    var tnames = [['lucas*'], ['mariana*'], ['rafael*'], ['ana*'], ['pedro*'], ['carla*'], ['gabriel*'], ['thiago*'], ['fernanda*'], ['rodrigo*']];
    var temojis = ['🎉', '⭐', '🔥', '💪', '✅', '🚀']; var tidx = 0;
    function showT(id, nm, em) { var el = document.getElementById(id); if (!el) return; el.querySelector('.toast-ico').textContent = em; el.querySelector('.toast-nm').textContent = nm; el.classList.remove('on'); setTimeout(function () { el.classList.add('on'); }, 50); setTimeout(function () { el.classList.remove('on'); }, 3600); }
    function startToasts() { function fire() { var n1 = tnames[tidx % tnames.length][0], n2 = tnames[(tidx + 1) % tnames.length][0]; showT('t1', n1, temojis[tidx % temojis.length]); setTimeout(function () { showT('t2', n2, temojis[(tidx + 1) % temojis.length]); }, 800); tidx += 2; setTimeout(fire, 5200); } setTimeout(fire, 1600); }

    // ── URGENCY ──
    function startUrgency() { var s = 300; function tick() { var m = Math.floor(s / 60), sec = s % 60; var el = document.getElementById('urgTimer'); if (el) el.textContent = (m < 10 ? '0' : '') + m + ':' + (sec < 10 ? '0' : '') + sec; if (s > 0) { s--; setTimeout(tick, 1000); } } tick(); }

    // ── CAROUSEL ──
    function initCar() {
      var track = document.getElementById('carTrack'), dotsEl = document.getElementById('carDots'), prev = document.getElementById('carPrev'), next = document.getElementById('carNext');
      if (!track) return;
      var slides = track.querySelectorAll('.car-sl'), total = slides.length, cur = 0, iw = 0;
      function pv() { return window.innerWidth <= 580 ? 2 : 3; }
      function setSz() { var p = pv(), gap = 10, w = track.parentElement.offsetWidth; iw = (w - (gap * (p - 1))) / p; slides.forEach(function (s) { s.style.width = iw + 'px'; }); track.style.gap = gap + 'px'; }
      function bDots() { dotsEl.innerHTML = ''; var p = Math.ceil(total / pv()); for (var i = 0; i < p; i++) { var d = document.createElement('button'); d.className = 'cdot' + (i === 0 ? ' on' : ''); (function (idx) { d.onclick = function () { goTo(idx * pv()); }; })(i); dotsEl.appendChild(d); } }
      function uDots() { var ds = dotsEl.querySelectorAll('.cdot'), page = Math.floor(cur / pv()); ds.forEach(function (d, i) { d.classList.toggle('on', i === page); }); }
      function goTo(idx) { cur = Math.max(0, Math.min(idx, total - pv())); var gap = 10; track.style.transform = 'translateX(-' + ((iw + gap) * cur) + 'px)'; uDots(); prev.disabled = (cur === 0); next.disabled = (cur >= total - pv()); }
      bDots(); setSz(); goTo(0);
      window.addEventListener('resize', function () { bDots(); setSz(); goTo(0); });
      prev.onclick = function () { goTo(cur - pv()); };
      next.onclick = function () { goTo(cur + pv()); };
    }

    // ── VIDEO CAROUSEL ──
    var MUTE_ICO = '<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15" stroke="white" stroke-width="2" stroke-linecap="round"/><line x1="17" y1="9" x2="23" y2="15" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>';
    var UNMUTE_ICO = '<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
    function toggleVid(ov) {
      var v = ov.previousElementSibling; var btn = ov.querySelector('.vid-play-btn');
      if (v.muted) { v.muted = false; v.play(); btn.innerHTML = UNMUTE_ICO; ov.classList.remove('paused'); }
      else { v.muted = true; btn.innerHTML = MUTE_ICO; }
    }
    function initVidCar() {
      var track = document.getElementById('vidCarTrack'), dotsEl = document.getElementById('vidDots'), prev = document.getElementById('vidPrev'), next = document.getElementById('vidNext');
      if (!track) return;
      var slides = track.querySelectorAll('.vid-car-sl'), total = slides.length, cur = 0, iw = 0;
      function pv() { return window.innerWidth <= 580 ? 1 : 3; }
      function setSz() { var p = pv(), gap = 12, w = track.parentElement.offsetWidth; iw = (w - (gap * (p - 1))) / p; slides.forEach(function (s) { s.style.width = iw + 'px'; }); track.style.gap = gap + 'px'; }
      function bDots() { dotsEl.innerHTML = ''; var pg = Math.ceil(total / pv()); for (var i = 0; i < pg; i++) { var d = document.createElement('button'); d.className = 'cdot' + (i === 0 ? ' on' : ''); (function (idx) { d.onclick = function () { goTo(idx * pv()); }; })(i); dotsEl.appendChild(d); } }
      function uDots() { var ds = dotsEl.querySelectorAll('.cdot'), page = Math.floor(cur / pv()); ds.forEach(function (d, i) { d.classList.toggle('on', i === page); }); }
      function goTo(idx) { cur = Math.max(0, Math.min(idx, total - pv())); var gap = 12; track.style.transform = 'translateX(-' + ((iw + gap) * cur) + 'px)'; uDots(); prev.disabled = (cur === 0); next.disabled = (cur >= total - pv()); }
      bDots(); setSz(); goTo(0);
      window.addEventListener('resize', function () { bDots(); setSz(); goTo(0); });
      prev.onclick = function () { goTo(cur - pv()); }; next.onclick = function () { goTo(cur + pv()); };
    }
    function initVidLazy() {
      var vids = document.querySelectorAll('video[data-src]'); if (!vids.length) return;
      if (!('IntersectionObserver' in window)) { vids.forEach(function (v) { v.src = v.dataset.src; v.play().catch(function () { }); }); return; }
      var obs = new IntersectionObserver(function (entries) { entries.forEach(function (e) { var v = e.target; if (e.isIntersecting) { if (!v.src || v.src === window.location.href) { v.src = v.dataset.src; } v.play().catch(function () { }); } else { v.pause(); } }); }, { threshold: 0.25 });
      vids.forEach(function (v) { obs.observe(v); });
    }

    // ── DOCS ──
    function showDocs() { PREV = CUR; go('sc-docs'); }
    function closeDocs() { go(PREV === 'sc-result' ? 'sc-result' : 'sc-intro'); }
