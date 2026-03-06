// ---- VERSUS CAROUSEL ----
const VS_PAIRS = [
  { a: 'Sebastian Errazuriz', b: 'Pedro Gonzalez' },
  { a: 'Valentina Edwards',   b: 'Maria Muñoz' },
  { a: 'Mateo Larrain',       b: 'Juan Nahuelcura' },
  { a: 'Isidora Matte',       b: 'Carolina Rojas' },
  { a: 'Alexander Fontaine',  b: 'Carlos Perez' },
];

function scoreColor(n) {
  if (n >= 80) return 'c-high';
  if (n >= 65) return 'c-ok';
  if (n >= 45) return 'c-mid';
  return 'c-low';
}

function startCarousel() {
  const card = document.getElementById('vs-card');
  const aName = document.getElementById('vs-a-name');
  const aScore = document.getElementById('vs-a-score');
  const bName = document.getElementById('vs-b-name');
  const bScore = document.getElementById('vs-b-score');
  let idx = 0;

  // Pre-compute real scores using predictor
  const predictor = new NamePredictor(true); // silent mode
  const pairs = VS_PAIRS.map(p => {
    const [af, al] = p.a.split(' ');
    const [bf, bl] = p.b.split(' ');
    return {
      a: [p.a, predictor.calcScore(af, al)],
      b: [p.b, predictor.calcScore(bf, bl)],
    };
  });

  function show() {
    const pair = pairs[idx];
    card.classList.remove('fade');
    aName.textContent = pair.a[0];
    aScore.textContent = pair.a[1];
    aScore.className = 'vs-score ' + scoreColor(pair.a[1]);
    bName.textContent = pair.b[0];
    bScore.textContent = pair.b[1];
    bScore.className = 'vs-score ' + scoreColor(pair.b[1]);
  }

  show();
  setInterval(() => {
    card.classList.add('fade');
    setTimeout(() => {
      idx = (idx + 1) % pairs.length;
      show();
    }, 400);
  }, 3500);
}

// ---- PREDICTOR ----
class NamePredictor {
  constructor(silent) {
    if (silent) return;
    this.form = document.getElementById('form');
    this.results = document.getElementById('results');
    this.versus = document.getElementById('versus');
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      const n = document.getElementById('name').value.trim();
      const s = document.getElementById('surname').value.trim();
      if (n && s) this.predict(n, s);
    });
    document.getElementById('refs-btn').addEventListener('click', () => {
      document.getElementById('refs').classList.toggle('hidden');
    });
  }

  calcScore(first, last) {
    const n = first.toLowerCase(), s = last.toLowerCase();
    const factors = [
      this.chileClass(s), this.phonetics(n, s), this.fluency(n, s),
      this.socioeconomic(n), this.initials(n, s), this.length(n, s),
      this.surname(s), this.gender(n),
    ];
    return this.weightedAvg(factors);
  }

  // Clasismo CL gets 5x weight (dominant factor per Nunez & Gutierrez)
  weightedAvg(factors) {
    let sum = 0, weights = 0;
    factors.forEach(f => {
      const w = f.name === 'Clasismo CL' ? 5 : 1;
      sum += f.score * w;
      weights += w;
    });
    return Math.round(sum / weights);
  }

  v(score) {
    if (score >= 80) return { text: 'Muy favorable', bar: 'c-high', badge: 'b-high' };
    if (score >= 65) return { text: 'Favorable',     bar: 'c-ok',   badge: 'b-ok' };
    if (score >= 45) return { text: 'Neutro',        bar: 'c-mid',  badge: 'b-mid' };
    return                  { text: 'Desfavorable',   bar: 'c-low',  badge: 'b-low' };
  }

  predict(first, last) {
    const n = first.toLowerCase(), s = last.toLowerCase();
    const factors = [
      this.chileClass(s),
      this.phonetics(n, s),
      this.fluency(n, s),
      this.socioeconomic(n),
      this.initials(n, s),
      this.length(n, s),
      this.surname(s),
      this.gender(n),
    ];
    const total = this.weightedAvg(factors);
    this.versus.classList.add('hidden');
    this.render(first, last, total, factors);
  }

  chileClass(s) {
    const d = NAME_DATA.chileElite;
    let score = 55, tag = 'Sin señal de clase marcada';
    // Elite: Basque
    if (d.basque.some(x => s === x)) { score = 98; tag = 'Apellido vasco de elite chilena'; }
    // Elite: European
    else if (d.european.some(x => s === x)) { score = 95; tag = 'Europeo de alta clase en Chile'; }
    // Basque patterns
    else if (d.basquePatterns.some(p => s.includes(p)) || d.basqueSuffixes.some(x => s.endsWith(x))) { score = 85; tag = 'Patron fonetico vasco'; }
    // Mapuche: exact match
    else if (d.mapuche.some(x => s === x)) { score = 15; tag = 'Apellido mapuche — discriminacion documentada'; }
    // Mapuche: phonetic patterns
    else if (d.mapuchePatterns.some(p => s.includes(p)) || d.mapucheSuffixes.some(x => s.endsWith(x))) { score = 20; tag = 'Patron fonetico mapuche detectado'; }
    // Common patronymic
    else if (d.common.some(x => s === x)) { score = 40; tag = 'Base popular chilena'; }
    // Generic patronymic
    else if (/[eoa]z$/.test(s)) { score = 45; tag = 'Patronimico hispanico'; }
    let detail;
    if (score >= 85) detail = 'Nunez & Gutierrez (2004): apellidos asi predicen ingresos hasta 50% superiores en Chile, controlando por educacion.';
    else if (score >= 70) detail = 'Patrones foneticos vascos/europeos activan sesgos favorables en Chile (Nunez & Gutierrez, 2004).';
    else if (score <= 35) detail = 'Apellidos mapuche reciben hasta 30% menos callbacks en seleccion laboral en Chile (Fernandez & Hauri, 2016). Es una de las formas de discriminacion mas documentadas del pais.';
    else if (score <= 50) detail = 'Alta frecuencia en Chile. Estos apellidos enfrentan filtros socioeconomicos en seleccion laboral (Nunez & Gutierrez, 2004).';
    else detail = 'Sin señales fuertes de clase en contexto chileno.';
    return { name: 'Clasismo CL', score, tag, detail, refId: score <= 35 ? 'chile_mapuche' : 'chile_class' };
  }

  phonetics(n, s) {
    const letters = (n + s).split('');
    let pw = 0, wm = 0, tc = 0;
    letters.forEach(l => {
      if (NAME_DATA.phonetics.power.includes(l)) { pw++; tc++; }
      if (NAME_DATA.phonetics.warmth.includes(l)) { wm++; tc++; }
    });
    const r = tc > 0 ? pw / tc : 0.5;
    const bal = 1 - Math.abs(r - 0.45);
    let ov = 0, tv = 0;
    letters.forEach(l => { if ('aeiou'.includes(l)) tv++; if (l === 'a') ov++; });
    const vs = tv > 0 ? (ov * 1.2 + (tv - ov) * 0.9) / tv : 0.5;
    const score = Math.min(98, Math.max(35, Math.round(bal * 60 + vs * 40)));
    let tag;
    if (r > 0.55) tag = 'Dominante — proyecta autoridad';
    else if (r < 0.35) tag = 'Calido — proyecta confianza';
    else tag = 'Equilibrado — versatil';
    const detail = `${pw} sonidos de poder, ${wm} de calidez. El simbolismo sonoro afecta percepcion de competencia (Sidhu & Pexman, 2018).`;
    return { name: 'Fonetica', score, tag, detail, refId: 'phonetics' };
  }

  fluency(n, s) {
    const full = n + s;
    const cl = (full.match(/[bcdfghjklmnpqrstvwxyz]{3,}/gi) || []).length * 8;
    const sy = Math.min(20, (full.match(/[aeiou]+/gi) || []).length * 3);
    const cp = ['an','ar','el','en','er','es','al','in','on','or','la','ma','na','ra','re','ro','sa','se','ta','ca','co','da','de','ia'];
    let p = 0;
    for (let i = 0; i < full.length - 1; i++) if (cp.includes(full.substring(i, i + 2))) p++;
    const score = Math.min(85, Math.max(25, 40 + sy + Math.min(20, p * 3) - cl));
    let tag;
    if (score >= 80) tag = 'Muy fluido';
    else if (score >= 60) tag = 'Fluidez aceptable';
    else tag = 'Dificil de pronunciar';
    const detail = score >= 70
      ? 'Nombres fluidos reciben evaluaciones ~20% mas favorables (Laham et al., 2012).'
      : 'Clusters consonanticos reducen fluidez cognitiva, afectando primeras impresiones.';
    return { name: 'Fluidez', score, tag, detail, refId: 'pronounceability' };
  }

  socioeconomic(n) {
    let score = 45, cat = null;
    const l = NAME_DATA.highStatusPatterns;
    if (l.spanishElite.some(x => n === x || n.startsWith(x.substring(0, 4)))) { score += 20; cat = 'elite'; }
    if (l.classicPower.some(x => n === x || n.startsWith(x.substring(0, 4)))) { score += 15; cat = cat ? cat + '/clasico' : 'clasico'; }
    if (l.modernSuccess.some(x => n === x || n.startsWith(x.substring(0, 4)))) { score += 18; cat = cat ? cat + '/moderno' : 'moderno'; }
    if (l.prefixes.some(p => n.startsWith(p))) score += 8;
    if (l.suffixes.some(s => n.endsWith(s))) score += 8;
    score = Math.min(98, Math.max(35, score));
    const tag = cat ? `Perfil ${cat}` : 'Sin señal de estatus';
    const detail = cat
      ? 'Nombres actuan como señales socioeconomicas que afectan expectativas (Figlio, 2005).'
      : 'Sin patron de estatus marcado. Nombres neutros tienen alta movilidad social.';
    return { name: 'Señal Social', score, tag, detail, refId: 'ses' };
  }

  initials(n, s) {
    const fs = NAME_DATA.letterGrades[n[0]] || 75;
    const ls = NAME_DATA.letterGrades[s[0]] || 75;
    const score = Math.round(fs * 0.6 + ls * 0.4);
    const ini = `${n[0].toUpperCase()}.${s[0].toUpperCase()}.`;
    const tag = score >= 85 ? `${ini} alto rendimiento` : score >= 70 ? `${ini} rango medio` : `${ini} rango bajo`;
    const detail = 'Estudiantes con iniciales A/B tienen mejor rendimiento academico (Nelson & Simmons, 2007).';
    return { name: 'Iniciales', score, tag, detail, refId: 'initials' };
  }

  length(n, s) {
    const nd = Math.abs(n.length - 6), sd = Math.abs(s.length - 7);
    const score = Math.min(85, Math.max(30, Math.round((Math.max(0, 80 - nd * 10) + Math.max(0, 80 - sd * 8)) / 2)));
    const t = n.length + s.length;
    let tag;
    if (score >= 80) tag = `${t} chars — optimo`;
    else if (t < 8) tag = `${t} chars — corto`;
    else tag = `${t} chars — extenso`;
    const detail = 'La longitud media maximiza procesamiento cognitivo y memorabilidad (Laham et al., 2012).';
    return { name: 'Longitud', score, tag, detail, refId: 'pronounceability' };
  }

  surname(s) {
    let score = 50, type = null;
    const ind = NAME_DATA.surnameIndicators;
    if (ind.compoundSurnames.patterns.some(p => s.includes(p))) { score += 15; type = 'Linaje compuesto'; }
    if (ind.occupational.patterns.some(p => s.includes(p))) { score += 12; type = type || 'Nobiliario/ocupacional'; }
    if (ind.highMobility.patterns.some(p => s.endsWith(p))) { score += 5; type = type || 'Patronimico'; }
    if (s.length >= 5 && s.length <= 9) score += 5;
    score = Math.min(98, Math.max(35, score));
    const tag = type || 'Perfil neutro';
    const detail = 'Apellidos son predictores de movilidad social intergeneracional (Clark, 2014).';
    return { name: 'Herencia', score, tag, detail, refId: 'intergenerational' };
  }

  gender(n) {
    const neu = NAME_DATA.genderNeutralNames.includes(n);
    const score = neu ? 85 : 50;
    const tag = neu ? 'Neutro — reduce sesgos' : 'Genero percibido claro';
    const detail = neu
      ? 'Nombres ambiguos mitigan sesgos en seleccion (Moss-Racusin et al., 2012).'
      : 'Nombres activan estereotipos de genero en evaluaciones (Bertrand & Mullainathan, 2004).';
    return { name: 'Sesgo Genero', score, tag, detail, refId: 'gender' };
  }

  render(first, last, total, factors) {
    this.results.classList.remove('hidden');

    const el = document.getElementById('r-score');
    const tag = document.getElementById('r-tag');
    let cur = 0, inc = total / 40;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= total) { cur = total; clearInterval(t); }
      el.textContent = Math.round(cur);
    }, 20);

    el.className = 'score-num ' + scoreColor(total);
    if (total >= 80)      tag.textContent = 'Excepcional';
    else if (total >= 65) tag.textContent = 'Alto';
    else if (total >= 50) tag.textContent = 'Moderado';
    else                  tag.textContent = 'Bajo';

    document.getElementById('r-name').textContent = `${first} ${last}`;

    const c = document.getElementById('factors');
    c.innerHTML = '';
    factors.forEach((f, i) => {
      const vd = this.v(f.score);
      const row = document.createElement('div');
      row.className = 'f';
      row.innerHTML = `<div class="f-top"><span class="f-name">${f.name}</span><div class="f-bar"><div class="f-fill ${vd.bar}" style="width:0"></div></div><span class="f-num ${vd.bar}">${f.score}</span></div><div class="f-verdict"><span class="f-badge ${vd.badge}">${vd.text}</span>${f.tag}</div><div class="f-detail">${f.detail}</div>`;
      c.appendChild(row);
      setTimeout(() => { row.querySelector('.f-fill').style.width = f.score + '%'; }, 80 + i * 50);
    });

    const r = document.getElementById('refs');
    r.innerHTML = '';
    NAME_DATA.references.forEach(ref => {
      const d = document.createElement('div');
      d.innerHTML = `${ref.authors} (${ref.year}). <em>${ref.title}</em>. ${ref.journal}.`;
      r.appendChild(d);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new NamePredictor();
  startCarousel();
});
