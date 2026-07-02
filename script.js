/* ===================== Loosen · script.js ===================== */

/* ---------- 부위 아이콘 (미니멀 라인 SVG) ---------- */
const ICONS = {
  neck:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="6" r="3.2"/><path d="M9 9.4c.2 2-1.2 3.1-3 3.6M15 9.4c-.2 2 1.2 3.1 3 3.6M12 9.2v6.3M9 19h6"/></svg>`,
  shoulder:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="6" r="2.6"/><path d="M4 18c1.4-5 4.4-8 8-8s6.6 3 8 8"/></svg>`,
  waist:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3c1.2 3-1 5.5-1 9s2.2 6 1 9M16 3c-1.2 3 1 5.5 1 9s-2.2 6-1 9M7 12h10"/></svg>`,
  wrist:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 11V6.6a1.3 1.3 0 0 1 2.6 0V10M10.6 10V5.3a1.3 1.3 0 0 1 2.6 0V10M13.2 10.4V6.4a1.3 1.3 0 0 1 2.6 0V13c0 3.6-2 6-5 6-1.9 0-3.1-1-4.2-2.7l-1.3-2.2a1.3 1.3 0 0 1 2.2-1.4L8.2 13"/></svg>`,
  eye:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.7"/></svg>`,
  leg:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3v7l-2.4 6M14 3v6l2.8 7M7.6 20h2M15.4 20h2"/></svg>`,
};

/* ---------- 스트레칭 데이터 ---------- */
const PARTS = {
  neck:{ name:"목", sub:"거북목·뻣뻣함", moves:[
    { name:"목 옆으로 기울이기", desc:"오른손으로 머리를 살짝 당겨 목 옆선을 늘려요. 반대쪽도.", sec:30 },
    { name:"목 앞뒤로 늘이기", desc:"턱을 가슴 쪽으로 천천히 내렸다가, 다시 위를 봐요.", sec:30 },
    { name:"목 천천히 돌리기", desc:"어깨를 편 채 고개로 큰 원을 그리듯 천천히.", sec:30 },
  ]},
  shoulder:{ name:"어깨", sub:"뭉침·결림", moves:[
    { name:"어깨 크게 돌리기", desc:"어깨를 귀까지 올렸다가 뒤로 크게 굴려요.", sec:30 },
    { name:"팔 교차 스트레칭", desc:"한 팔을 반대편으로 뻗고 반대손으로 지그시 당겨요.", sec:30 },
    { name:"깍지 껴 위로 밀기", desc:"손깍지 끼고 손바닥을 하늘로 밀어 올려요.", sec:30 },
  ]},
  waist:{ name:"허리", sub:"오래 앉은 뒤", moves:[
    { name:"앉아서 허리 비틀기", desc:"상체를 천천히 옆으로 돌려 시선도 따라가요.", sec:40 },
    { name:"고양이 등 늘이기", desc:"등을 둥글게 말았다가 부드럽게 폈다 반복.", sec:30 },
    { name:"옆구리 늘이기", desc:"한 팔을 위로 뻗어 반대쪽으로 기울여요.", sec:30 },
  ]},
  wrist:{ name:"손목", sub:"타이핑·마우스", moves:[
    { name:"손목 앞으로 늘이기", desc:"팔을 펴고 손등을 몸쪽으로 지그시 당겨요.", sec:20 },
    { name:"손목 뒤로 늘이기", desc:"손바닥을 바깥으로 세워 반대손으로 당겨요.", sec:20 },
    { name:"손목 천천히 돌리기", desc:"주먹을 가볍게 쥐고 원을 그려요.", sec:20 },
  ]},
  eye:{ name:"눈", sub:"화면 피로", moves:[
    { name:"눈 꼭 감았다 뜨기", desc:"3초 감고 부드럽게 뜨기를 반복해요.", sec:20 },
    { name:"먼 곳 바라보기", desc:"창밖 먼 곳을 편안히 바라봐요.", sec:20 },
    { name:"눈동자 굴리기", desc:"상하좌우, 그리고 천천히 원을 그려요.", sec:20 },
  ]},
  leg:{ name:"다리", sub:"붓기·순환", moves:[
    { name:"허벅지 뒤 늘이기", desc:"다리를 펴고 상체를 앞으로 천천히 숙여요.", sec:30 },
    { name:"종아리 늘이기", desc:"벽을 밀 듯 뒤꿈치를 바닥에 붙여 늘려요.", sec:30 },
    { name:"발목 돌리기", desc:"발끝으로 천천히 큰 원을 그려요.", sec:20 },
  ]},
};

/* ===================== 저장소 ===================== */
const KEY = "loosen_v1";
const defaultData = { sessions:[], settings:{ notifyTime:"14:00" } };
function load(){ try{ return {...defaultData, ...JSON.parse(localStorage.getItem(KEY))}; }catch{ return {...defaultData}; } }
function save(){ localStorage.setItem(KEY, JSON.stringify(DATA)); }
let DATA = load();

/* ===================== 날짜 유틸 ===================== */
const pad = n => String(n).padStart(2,"0");
const keyOf = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
function daysBetween(a,b){ return Math.round((new Date(b)-new Date(a))/86400000); }

/* 완료된 고유 날짜 집합 */
function doneDates(){ return [...new Set(DATA.sessions.map(s=>s.date))].sort(); }

function calcStreak(){
  const dates = doneDates();
  if(!dates.length) return 0;
  const today = keyOf(new Date());
  const yest = keyOf(new Date(Date.now()-86400000));
  if(!dates.includes(today) && !dates.includes(yest)) return 0;
  let streak = 0;
  let cursor = dates.includes(today) ? new Date() : new Date(Date.now()-86400000);
  const set = new Set(dates);
  while(set.has(keyOf(cursor))){ streak++; cursor = new Date(cursor.getTime()-86400000); }
  return streak;
}

function weekMinutes(){
  const now = new Date();
  const day = (now.getDay()+6)%7; // 월요일 시작
  const monday = new Date(now); monday.setHours(0,0,0,0); monday.setDate(now.getDate()-day);
  const sec = DATA.sessions.filter(s=> new Date(s.date) >= monday).reduce((a,s)=>a+s.sec,0);
  return Math.round(sec/60);
}
function monthMinutes(){
  const now = new Date();
  const sec = DATA.sessions.filter(s=>{ const d=new Date(s.date); return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear(); }).reduce((a,s)=>a+s.sec,0);
  return Math.round(sec/60);
}
function topPart(){
  const c = {};
  DATA.sessions.forEach(s=> c[s.part]=(c[s.part]||0)+1);
  const e = Object.entries(c).sort((a,b)=>b[1]-a[1])[0];
  return e ? PARTS[e[0]].name : null;
}

/* ===================== 화면 전환 ===================== */
const frame = document.getElementById("frame");
const tabbar = document.getElementById("tabbar");
const TAB_SCREENS = ["home","records","settings"];

function show(name){
  document.querySelectorAll(".screen").forEach(s=>s.hidden=true);
  const el = document.getElementById("screen-"+name);
  el.hidden = false;
  el.classList.remove("enter"); void el.offsetWidth; el.classList.add("enter");
  // 탭바 노출
  const isTab = TAB_SCREENS.includes(name);
  tabbar.hidden = !isTab;
  document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active", t.dataset.go===name));
  window.scrollTo(0,0);
  if(name==="home") renderHome();
  if(name==="records") renderRecords();
}

/* ===================== ① 홈 ===================== */
function renderHome(){
  const h = new Date().getHours();
  const greet = h<6?"편안한 새벽이에요 🌙": h<12?"좋은 아침이에요 ☀️": h<18?"나른한 오후네요 🍃":"수고한 하루예요 🌆";
  document.getElementById("greeting").textContent = greet;

  const grid = document.getElementById("partsGrid");
  grid.innerHTML = "";
  grid.classList.add("stagger");
  Object.entries(PARTS).forEach(([key,p],i)=>{
    const card = document.createElement("button");
    card.className = "part-card";
    card.style.animationDelay = (i*0.06)+"s";
    card.innerHTML = `<span class="part-ico">${ICONS[key]}</span>
      <span class="part-name">${p.name}</span>
      <span class="part-sub">${p.sub}</span>`;
    card.onclick = ()=>openRoutine(key);
    grid.appendChild(card);
  });
  document.getElementById("streakNum").textContent = calcStreak();
}

/* ===================== ② 루틴 상세 ===================== */
let currentPart = null;
function openRoutine(key){
  currentPart = key;
  const p = PARTS[key];
  document.getElementById("routineIcon").innerHTML = ICONS[key];
  document.getElementById("routineTitle").textContent = p.name;
  document.getElementById("routineCount").textContent = `${p.moves.length}개 동작`;
  const total = p.moves.reduce((a,m)=>a+m.sec,0);
  document.getElementById("routineTime").textContent = `약 ${fmtTime(total)}`;
  const list = document.getElementById("moveList");
  list.innerHTML = "";
  p.moves.forEach((m,i)=>{
    const li = document.createElement("li");
    li.className = "move-item";
    li.style.animationDelay = (i*0.08)+"s";
    li.innerHTML = `<span class="move-num">${i+1}</span>
      <span class="move-body"><span class="move-name">${m.name}</span><span class="move-desc">${m.desc}</span></span>
      <span class="move-sec">${m.sec}초</span>`;
    list.appendChild(li);
  });
  show("routine");
}
function fmtTime(sec){
  const m = Math.floor(sec/60), s = sec%60;
  if(m && s) return `${m}분 ${s}초`;
  if(m) return `${m}분`;
  return `${s}초`;
}

/* ===================== ③ 운동 실행 ===================== */
const RING_C = 2*Math.PI*52; // 326.7
let ex = null;
function startExercise(){
  const moves = PARTS[currentPart].moves;
  ex = { moves, i:0, total:moves[0].sec, remaining:moves[0].sec, paused:false, timer:null, doneSec:0 };
  show("exercise");
  renderMove();
  runTimer();
  document.getElementById("btnPause").textContent = "⏸ 일시정지";
}
function renderMove(){
  const m = ex.moves[ex.i];
  ex.total = m.sec; ex.remaining = m.sec;
  document.getElementById("exProgress").textContent = `${ex.i+1} / ${ex.moves.length}`;
  document.getElementById("exName").textContent = m.name;
  document.getElementById("exDesc").textContent = m.desc;
  document.getElementById("ringTime").textContent = m.sec;
  const next = ex.moves[ex.i+1];
  document.getElementById("exNextName").textContent = next ? next.name : "마지막 동작이에요 🎈";
  // 링 초기화 (전환 없이 꽉 채움)
  const fg = document.getElementById("ringFg");
  fg.style.transition = "none";
  fg.style.strokeDasharray = RING_C;
  fg.style.strokeDashoffset = 0;
  void fg.offsetWidth;
  fg.style.transition = "stroke-dashoffset 1s linear";
}
function updateRing(){
  const off = RING_C * (1 - ex.remaining/ex.total);
  document.getElementById("ringFg").style.strokeDashoffset = off;
}
function runTimer(){
  clearInterval(ex.timer);
  ex.timer = setInterval(()=>{
    if(ex.paused) return;
    ex.remaining--; ex.doneSec++;
    document.getElementById("ringTime").textContent = Math.max(ex.remaining,0);
    updateRing();
    const wrap = document.querySelector(".ring-wrap");
    wrap.classList.remove("pulse"); void wrap.offsetWidth; wrap.classList.add("pulse");
    if(ex.remaining<=0) nextMove();
  },1000);
}
function nextMove(){
  if(ex.i < ex.moves.length-1){
    ex.i++;
    renderMove();
  }else{
    finishExercise();
  }
}
function finishExercise(){
  clearInterval(ex.timer);
  const totalSec = ex.moves.reduce((a,m)=>a+m.sec,0);
  // 저장
  DATA.sessions.push({ date:keyOf(new Date()), part:currentPart, sec:totalSec, moves:ex.moves.length });
  save();
  document.getElementById("doneTime").textContent = fmtTime(totalSec);
  document.getElementById("doneMoves").textContent = ex.moves.length + "개";
  document.getElementById("completeSub").textContent = `${PARTS[currentPart].name} 스트레칭 완료 · 몸이 한결 가벼워졌을 거예요.`;
  show("complete");
}
function exitExercise(){
  clearInterval(ex.timer);
  ex = null;
  show("home");
}

/* ===================== ⑤ 기록 ===================== */
function renderRecords(){
  document.getElementById("stStreak").textContent = calcStreak();
  document.getElementById("stSessions").textContent = DATA.sessions.length;
  document.getElementById("stWeek").textContent = weekMinutes()+"분";
  document.getElementById("stMonth").textContent = monthMinutes()+"분";
  const top = topPart();
  document.getElementById("topPartVal").textContent = top || "아직 없어요";

  // 달력
  const now = new Date();
  document.getElementById("calMonth").textContent = `${now.getFullYear()}년 ${now.getMonth()+1}월`;
  const grid = document.getElementById("calGrid");
  grid.innerHTML = "";
  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  const startDow = first.getDay();
  const days = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  const done = new Set(doneDates());
  const todayKey = keyOf(now);
  for(let i=0;i<startDow;i++){ const e=document.createElement("div"); e.className="cal-day empty"; grid.appendChild(e); }
  for(let d=1; d<=days; d++){
    const cell = document.createElement("div");
    cell.className = "cal-day";
    const k = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(d)}`;
    if(done.has(k)) cell.classList.add("done");
    if(k===todayKey) cell.classList.add("today");
    cell.textContent = d;
    grid.appendChild(cell);
  }
}

/* ===================== ⑥ 설정 ===================== */
function initSettings(){
  const t = document.getElementById("notifyTime");
  t.value = DATA.settings.notifyTime || "14:00";
  t.onchange = ()=>{ DATA.settings.notifyTime = t.value; save(); };
  document.getElementById("resetBtn").onclick = ()=>{
    if(confirm("모든 기록을 지울까요? 되돌릴 수 없어요.")){
      DATA = {...defaultData}; save(); renderRecords(); renderHome();
      alert("기록을 초기화했어요.");
    }
  };
}

/* ===================== 이벤트 바인딩 ===================== */
document.getElementById("startBtn").onclick = startExercise;
document.getElementById("homeBtn").onclick = ()=>show("home");
document.getElementById("exExit").onclick = ()=>{ if(confirm("스트레칭을 그만둘까요?")) exitExercise(); };
document.getElementById("btnSkip").onclick = ()=>{ if(ex) nextMove(); };
document.getElementById("btnPause").onclick = ()=>{
  if(!ex) return;
  ex.paused = !ex.paused;
  document.getElementById("btnPause").textContent = ex.paused ? "▶ 계속하기" : "⏸ 일시정지";
};
document.querySelectorAll("[data-back]").forEach(b=> b.onclick = ()=>show(b.dataset.back));
document.querySelectorAll(".tab").forEach(t=> t.onclick = ()=>show(t.dataset.go));

/* ===================== 부팅 ===================== */
window.addEventListener("load", ()=>{
  initSettings();
  setTimeout(()=>{
    document.getElementById("loader").classList.add("hide");
    frame.hidden = false;
    show("home");
  }, 1600);
});
