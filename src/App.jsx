import { useState, useEffect } from "react";
import { T, AGE_RANGES, filterTask, EXTRA_STRINGS } from "./i18n";
import { ENERGIES, MascotteCharacter, JolingoTree } from "./mascottes";

// ── DESIGN TOKENS ─────────────────────────────────────────
const C = {
  bg:"#F7F5F2",white:"#FFFFFF",ink:"#1A1A2E",muted:"#9A96A8",
  border:"#E8E5F0",violet:"#4C35E8",violetL:"#6C63FF",
  yellow:"#FFD93D",green:"#22C55E",orange:"#FF5722",
  red:"#EF4444",blue:"#3B82F6",night:"#1A1A2E",
};

const UNIVERSE_IDS = ["confort","sport","pro","social","mental","creative"];
const FLAG = { fr:"🇫🇷", en:"🇬🇧", es:"🇪🇸" };
const LANG_LABEL = { fr:"Français", en:"English", es:"Español" };
const PTS_TASK=10, PTS_PERFECT=20, PTS_STREAK=5, PTS_RESISTANCE=15;

// Jolingos requis par niveau
const LEVEL_JOLINGOS = ENERGIES.map(e => e.jolingos);

// ── STORAGE ───────────────────────────────────────────────
const KEY="jolingo_v6";
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{};}catch{return{};}}
function save(d){try{localStorage.setItem(KEY,JSON.stringify(d));}catch{}}
function todayKey(){return new Date().toISOString().split("T")[0];}
function tomorrowKey(){const d=new Date();d.setDate(d.getDate()+1);return d.toISOString().split("T")[0];}
function monthKey(){const d=new Date();return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;}

// ── HELPERS ───────────────────────────────────────────────
function getCapturedLevel(jolingos){
  let level=0;
  for(let i=0;i<LEVEL_JOLINGOS.length;i++){if(jolingos>=LEVEL_JOLINGOS[i])level=i+1;}
  return level;
}
function shuffle(arr){return[...arr].sort(()=>Math.random()-.5);}
function randCelebration(t){return t.celebrations[Math.floor(Math.random()*t.celebrations.length)];}

// ── LOGO ──────────────────────────────────────────────────
// ── LOGO GRAINE ───────────────────────────────────────────
function Logo({size=48, animated=true}){
  const id=`seed${size}`;
  return(
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{overflow:"visible"}}>
      <defs>
        <linearGradient id={`bg${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3524C7"/><stop offset="100%" stopColor="#6C63FF"/>
        </linearGradient>
        <linearGradient id={`leaf${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF"/><stop offset="100%" stopColor="#E8E4FF"/>
        </linearGradient>
        <filter id={`glow${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id={`shadow${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#00000030"/>
        </filter>
        {animated&&<style>{`
          @keyframes sf${id}{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
          @keyframes sl${id}{0%,100%{transform:rotate(0deg)}40%{transform:rotate(2deg)}70%{transform:rotate(-1deg)}}
          @keyframes sg${id}{0%,100%{filter:drop-shadow(0 0 5px #FFD93D60)}50%{filter:drop-shadow(0 0 14px #FFD93DCC)}}
          .sf${id}{animation:sf${id} 4s ease-in-out infinite}
          .sl${id}{animation:sl${id} 3s ease-in-out infinite;transform-origin:50px 65px}
          .sg${id}{animation:sg${id} 2.5s ease-in-out infinite}
        `}</style>}
      </defs>
      <g className={animated?`sf${id}`:""} filter={`url(#shadow${id})`}>
        <rect width="100" height="100" rx="24" fill={`url(#bg${id})`}/>
        <path d="M0 24Q0 0 24 0H65Q45 14 20 24Z" fill="rgba(255,255,255,0.06)"/>
        <path d="M 50 78 Q 50 55 50 32" stroke="white" strokeWidth="5" strokeLinecap="round"/>
        <g className={animated?`sl${id}`:""}>
          <path d="M 50 54 Q 24 42 20 24 Q 40 26 50 54 Z" fill={`url(#leaf${id})`} opacity="0.92"/>
          <path d="M 50 54 Q 35 40 24 26" stroke="#6C63FF" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.3"/>
        </g>
        <path d="M 50 42 Q 72 32 74 16 Q 58 18 50 42 Z" fill={`url(#leaf${id})`} opacity="0.75"/>
        <g className={animated?`sg${id}`:""} filter={`url(#glow${id})`}>
          <circle cx="50" cy="26" r="8" fill="#FFD93D"/>
          <circle cx="50" cy="26" r="4" fill="white" opacity="0.85"/>
        </g>
        <g className={animated?`sg${id}`:""} filter={`url(#glow${id})`} style={{animationDelay:"0.8s"}}>
          <ellipse cx="50" cy="82" rx="12" ry="7" fill="#FFD93D"/>
          <ellipse cx="50" cy="82" rx="6" ry="3.5" fill="white" opacity="0.65"/>
        </g>
      </g>
    </svg>
  );
}

// ── SPLASH ────────────────────────────────────────────────
function Splash({lang,onDone}){
  const taglines={
    fr:"Petit à petit, l'arbre grandit.",
    en:"Little by little, the tree grows.",
    es:"Poco a poco, el árbol crece.",
  };
  useEffect(()=>{
    const t=setTimeout(()=>onDone&&onDone(),4000);
    return()=>clearTimeout(t);
  },[]);
  const energies=[
    {type:"flame",x:"8%",y:"18%",s:0.55,d:0.2},
    {type:"moon",x:"80%",y:"12%",s:0.65,d:0.6},
    {type:"drop",x:"86%",y:"62%",s:0.6,d:1.0},
    {type:"star",x:"5%",y:"65%",s:0.5,d:0.4},
    {type:"leaf",x:"74%",y:"80%",s:0.55,d:0.8},
    {type:"wind",x:"18%",y:"82%",s:0.5,d:0.0},
  ];
  return(
    <div style={{position:"fixed",inset:0,background:`linear-gradient(160deg,#0D1B0F 0%,${C.night} 50%,#1A0A2E 100%)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",overflow:"hidden",zIndex:900}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;700;800&family=Inter:wght@300;400&display=swap');
        @keyframes halo{0%,100%{transform:scale(1);opacity:0.3}50%{transform:scale(1.1);opacity:0.5}}
        @keyframes ef{0%{transform:translateY(0) rotate(0)}40%{transform:translateY(-10px) rotate(4deg)}70%{transform:translateY(-6px) rotate(-2deg)}100%{transform:translateY(0) rotate(0)}}
        @keyframes seedReveal{0%{opacity:0;transform:scale(0.85) translateY(12px)}50%{opacity:1;transform:scale(1.03) translateY(-3px)}100%{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes nameReveal{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:translateY(0)}}
        @keyframes tagReveal{0%{opacity:0;transform:translateY(8px)}100%{opacity:1;transform:translateY(0)}}
        @keyframes dotReveal{0%{opacity:0}100%{opacity:1}}
        @keyframes dotPulse{0%,100%{opacity:0.35}50%{opacity:1}}
        @keyframes logoHalo{0%{opacity:0;transform:scale(0.6)}100%{opacity:0.25;transform:scale(1.1)}}
        .ef{animation:ef var(--ef) ease-in-out infinite;animation-delay:var(--ed)}
        .seed-r{animation:seedReveal 1s cubic-bezier(.34,1.1,.64,1) both;animation-delay:0.3s}
        .name-r{animation:nameReveal 0.8s cubic-bezier(.22,1,.36,1) both;animation-delay:1.1s}
        .tag-r{animation:tagReveal 0.8s ease both;animation-delay:1.9s}
        .dot-r{animation:dotReveal 0.5s ease both;animation-delay:2.4s}
        .dot-p{animation:dotPulse 1.8s ease-in-out infinite;animation-delay:2.8s}
        .lhalo{animation:logoHalo 1.2s ease both;animation-delay:0.4s}
      `}</style>
      <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:`radial-gradient(circle,${C.violet}28 0%,transparent 65%)`,animation:"halo 5s ease-in-out infinite"}}/>
      <div style={{position:"absolute",width:220,height:220,borderRadius:"50%",background:`radial-gradient(circle,${C.yellow}10 0%,transparent 70%)`,animation:"halo 4s ease-in-out infinite",animationDelay:"1s"}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:"16%",background:`linear-gradient(to top,${C.violet}18,transparent)`}}/>
      {energies.map(({type,x,y,s,d},i)=>(
        <div key={i} className="ef" style={{position:"absolute",left:x,top:y,opacity:0.12,zIndex:1,"--ef":`${3.5+i*0.3}s`,"--ed":`${d}s`,transform:`scale(${s})`,transformOrigin:"center"}}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            {type==="flame"&&<path d="M20 36C20 36 8 28 10 18C12 10 16 8 16 4C16 4 18 10 17 14C20 8 22 2 24 0C24 0 30 10 26 18C30 14 32 10 32 8C32 8 36 18 28 26C32 22 36 22 38 26C38 26 36 34 26 36C24 37 22 37 20 36Z" fill="white"/>}
            {type==="moon"&&<path d="M28 6C18 6 10 14 10 24C10 34 18 38 26 38C16 34 12 28 12 22C12 14 18 8 28 6Z" fill="white"/>}
            {type==="drop"&&<path d="M20 4C20 4 8 18 8 26C8 32 13 37 20 37C27 37 32 32 32 26C32 18 20 4 20 4Z" fill="white"/>}
            {type==="star"&&<path d="M20 4L23 14H34L25 20L28 30L20 24L12 30L15 20L6 14H17Z" fill="white"/>}
            {type==="leaf"&&<path d="M20 36C20 36 6 28 6 14C6 6 14 4 20 4C26 4 34 6 34 14C34 28 20 36 20 36Z" fill="white" fillOpacity="0.6" stroke="white" strokeWidth="1.5"/>}
            {type==="wind"&&<><path d="M6 14Q20 10 32 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M6 20Q22 16 30 20Q34 22 32 26Q30 30 24 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M6 26Q18 22 26 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/></>}
          </svg>
        </div>
      ))}
      <div className="lhalo" style={{position:"absolute",width:180,height:180,borderRadius:"50%",background:`radial-gradient(circle,${C.yellow}15 0%,${C.violet}10 45%,transparent 70%)`,zIndex:2}}/>
      <div className="seed-r" style={{position:"relative",zIndex:3,filter:`drop-shadow(0 0 18px ${C.yellow}70) drop-shadow(0 0 36px ${C.violet}45)`,marginBottom:10,padding:"14px 14px 0 14px",overflow:"visible"}}>
        <Logo size={100} animated/>
      </div>
      <div className="name-r" style={{fontFamily:"'Poppins',sans-serif",fontWeight:800,fontSize:52,color:C.white,letterSpacing:2,lineHeight:1,position:"relative",zIndex:3,marginBottom:18,textShadow:`0 4px 0 rgba(0,0,0,0.15),0 0 40px ${C.yellow}20`}}>
        Jolingo
      </div>
      <div className="tag-r" style={{fontFamily:"'Poppins',sans-serif",fontWeight:300,fontSize:14,color:"rgba(255,255,255,0.42)",letterSpacing:1,fontStyle:"italic",position:"relative",zIndex:3,textAlign:"center",maxWidth:280,lineHeight:1.7}}>
        {taglines[lang]||taglines.fr}
      </div>
      <div className="dot-r" style={{position:"absolute",bottom:48,display:"flex",gap:7,zIndex:3}}>
        {[0,1,2].map(i=>(
          <div key={i} className={i===1?"dot-p":""} style={{width:i===1?28:7,height:5,borderRadius:3,background:i===1?C.yellow:"rgba(255,255,255,0.2)"}}/>
        ))}
      </div>
    </div>
  );
}
// ── LANG PICKER ───────────────────────────────────────────
function LangPicker({onPick}){
  const [chosen,setChosen]=useState(null);
  function pick(lang){
    setChosen(lang);
    setTimeout(()=>onPick(lang),700);
  }
  return(
    <div style={{position:"fixed",inset:0,background:C.night,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,zIndex:1000}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .lang-card{background:rgba(255,255,255,.07);border:2px solid rgba(255,255,255,.12);border-radius:20px;padding:20px 28px;display:flex;align-items:center;gap:16px;cursor:pointer;width:100%;max-width:320px;transition:all .2s;animation:fadeUp .5s ease both;}
        .lang-card:hover{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.3);transform:translateY(-2px);}
        .lang-card:active{transform:scale(.97);}
        .lang-card.chosen{border-color:#FFD93D;background:rgba(255,217,61,.12);}
      `}</style>
      <div style={{marginBottom:48,animation:"fadeUp .5s ease both"}}>
        <Logo size={80} animated={false}/>
      </div>
      <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:800,fontSize:32,color:"white",letterSpacing:2,marginBottom:40,animation:"fadeUp .5s ease both",animationDelay:"0.1s"}}>
        Jolingo
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:14,width:"100%",alignItems:"center"}}>
        {(["fr","en","es"]).map((lang,i)=>(
          <div key={lang} className={`lang-card ${chosen===lang?"chosen":""}`}
            style={{animationDelay:`${.2+i*.1}s`}} onClick={()=>pick(lang)}>
            <span style={{fontSize:34}}>{FLAG[lang]}</span>
            <span style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:18,color:"white"}}>{LANG_LABEL[lang]}</span>
            {chosen===lang&&<span style={{marginLeft:"auto",color:C.yellow,fontSize:22}}>✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ONBOARD SLIDES ────────────────────────────────────────
const SLIDE_ILLUS=[
  <svg key="s1" viewBox="0 0 200 160" fill="none" style={{width:200,height:160}}>
    <rect x="30" y="10" width="140" height="130" rx="20" fill="#2D1B69"/>
    <rect x="30" y="10" width="140" height="44" rx="20" fill="#4C35E8"/>
    <rect x="30" y="34" width="140" height="20" fill="#4C35E8"/>
    {[0,1,2,3,4,5,6].map(i=><rect key={i} x={46+i*18} y="68" width="10" height="10" rx="3" fill={i<5?"#6C63FF":"#2D1B69"}/>)}
    {[0,1,2,3,4,5,6].map(i=><rect key={i+7} x={46+i*18} y="86" width="10" height="10" rx="3" fill={i<3?"#FFD93D":i===3?"#22C55E":"#2D1B69"}/>)}
    <text x="150" y="42" fontSize="20" textAnchor="middle">🔥</text>
  </svg>,
  <svg key="s2" viewBox="0 0 200 160" fill="none" style={{width:200,height:160}}>
    {[0,1,2].map(i=>(
      <g key={i}>
        <rect x={40+i*42} y={50-i*5} width="38" height="55" rx="8" fill={i===1?"#4C35E8":"#2D1B69"} stroke={i===1?"#FFD93D":"#4C35E8"} strokeWidth="1.5"/>
        <text x={59+i*42} y={82-i*5} fontSize="18" textAnchor="middle">{["💪","✨","🎯"][i]}</text>
      </g>
    ))}
  </svg>,
  <svg key="s3" viewBox="0 0 200 160" fill="none" style={{width:200,height:160}}>
    <path d="M120 20C90 20 70 42 70 70C70 98 90 118 120 118C98 110 84 92 84 70C84 48 98 30 120 20Z" fill="#4C35E8"/>
    <rect x="28" y="98" width="62" height="50" rx="12" fill="#22C55E" opacity=".15"/>
    <rect x="28" y="98" width="62" height="50" rx="12" stroke="#22C55E" strokeWidth="1.5"/>
    <text x="59" y="128" fontSize="20" textAnchor="middle">✅</text>
    <rect x="110" y="98" width="62" height="50" rx="12" fill="#EF4444" opacity=".12"/>
    <rect x="110" y="98" width="62" height="50" rx="12" stroke="#EF4444" strokeWidth="1.5"/>
    <text x="141" y="128" fontSize="20" textAnchor="middle">❌</text>
  </svg>,
  <svg key="s4" viewBox="0 0 200 160" fill="none" style={{width:200,height:160}}>
    <path d="M72 30H128V88C128 112 114 124 100 126C86 124 72 112 72 88Z" fill="#FFD93D"/>
    <path d="M72 56C58 56 54 70 58 80C62 90 72 86 72 82" stroke="#FFB800" strokeWidth="5" strokeLinecap="round" fill="none"/>
    <path d="M128 56C142 56 146 70 142 80C138 90 128 86 128 82" stroke="#FFB800" strokeWidth="5" strokeLinecap="round" fill="none"/>
    <rect x="84" y="126" width="32" height="14" rx="4" fill="#FFB800"/>
    <rect x="72" y="138" width="56" height="10" rx="5" fill="#FFD93D"/>
    <text x="40" y="46" fontSize="14">⭐</text><text x="156" y="58" fontSize="14">⭐</text>
    <rect x="62" y="152" width="76" height="10" rx="5" fill="rgba(255,255,255,.25)"/>
    <rect x="62" y="152" width="52" height="10" rx="5" fill="rgba(255,255,255,.5)"/>
    <text x="100" y="161" fontSize="7" fill="white" textAnchor="middle" fontFamily="Inter" fontWeight="700">+30 Jolingos</text>
  </svg>,
];

function OnboardSlides({lang,onDone}){
  const t=T[lang];
  const [slide,setSlide]=useState(0);
  const [anim,setAnim]=useState(true);
  function next(){
    if(slide>=t.onboard.length-1){onDone();return;}
    setAnim(false);setTimeout(()=>{setSlide(s=>s+1);setAnim(true);},180);
  }
  const s=t.onboard[slide];
  const isDark=slide!==1;
  const isAccent=slide===3;
  return(
    <div style={{position:"fixed",inset:0,background:isAccent?"#4C35E8":isDark?C.night:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",padding:"56px 28px 48px",transition:"background .4s",zIndex:800}}>
      <style>{`
        @keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideOut{to{opacity:0;transform:translateY(-16px)}}
        .sl-in{animation:slideUp .35s ease both;}.sl-out{animation:slideOut .18s ease both;}
      `}</style>
      <div style={{display:"flex",gap:8}}>
        {t.onboard.map((_,i)=>(
          <div key={i} style={{height:4,borderRadius:2,width:i===slide?28:8,background:isDark?(i===slide?"white":"rgba(255,255,255,.25)"):(i===slide?C.violet:"#D0CCE8"),transition:"all .3s"}}/>
        ))}
      </div>
      <div className={anim?"sl-in":"sl-out"}>{SLIDE_ILLUS[slide]}</div>
      <div className={anim?"sl-in":"sl-out"} style={{textAlign:"center",flex:1,display:"flex",flexDirection:"column",justifyContent:"center",gap:14}}>
        <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:46,lineHeight:1.05,color:isAccent?C.yellow:isDark?"white":C.ink,whiteSpace:"pre-line"}}>{s.title}</h1>
        <p style={{fontFamily:"Inter,sans-serif",fontSize:16,lineHeight:1.65,color:isDark?"rgba(255,255,255,.6)":C.muted,maxWidth:300,margin:"0 auto"}}>{s.sub}</p>
      </div>
      <div style={{width:"100%",maxWidth:360}}>
        <button onClick={next} style={{width:"100%",padding:"18px",border:"none",borderRadius:16,background:isDark?C.yellow:C.violet,color:isDark?C.ink:"white",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:17,cursor:"pointer"}}>{s.cta}</button>
        {slide<t.onboard.length-1&&<button onClick={onDone} style={{width:"100%",background:"none",border:"none",color:isDark?"rgba(255,255,255,.35)":C.muted,fontFamily:"Inter,sans-serif",fontSize:13,cursor:"pointer",padding:"12px"}}>{t.skip}</button>}
      </div>
    </div>
  );
}

// ── PROFILE SETUP ─────────────────────────────────────────
function ProfileSetup({lang,onDone}){
  const t=T[lang];
  const [step,setStep]=useState(0);
  const [name,setName]=useState("");
  const [age,setAge]=useState(null);
  const [genre,setGenre]=useState(null);
  const [country,setCountry]=useState("");
  const [vibes,setVibes]=useState([]);

  // Globe interactif simplifié
  const [countrySearch,setCountrySearch]=useState("");
  const [showFireworks,setShowFireworks]=useState(false);

  const COUNTRIES=[
    "Afghanistan","Afrique du Sud","Albanie","Algérie","Allemagne","Angola","Arabie Saoudite",
    "Argentine","Australie","Autriche","Azerbaïdjan","Bangladesh","Belgique","Bénin","Bolivie",
    "Bosnie","Brésil","Bulgarie","Burkina Faso","Cambodge","Cameroun","Canada","Chili","Chine",
    "Colombie","Congo","Corée du Sud","Côte d'Ivoire","Croatie","Cuba","Daghestan","Danemark",
    "Égypte","Émirats Arabes Unis","Équateur","Espagne","États-Unis","Éthiopie","Finlande",
    "France","Ghana","Grèce","Guatemala","Guinée","Haïti","Hongrie","Île de la Réunion",
    "Inde","Indonésie","Irak","Iran","Irlande","Israël","Italie","Jamaïque","Japon","Jordanie",
    "Kazakhstan","Kenya","Liban","Libye","Madagascar","Malaisie","Mali","Maroc","Mexique",
    "Mozambique","Myanmar","Népal","Nicaragua","Niger","Nigeria","Norvège","Nouvelle-Zélande",
    "Ouganda","Ouzbékistan","Pakistan","Palestine","Panama","Paraguay","Pays-Bas","Pérou",
    "Philippines","Pologne","Portugal","Qatar","République Dominicaine","Roumanie","Royaume-Uni",
    "Russie","Rwanda","Sénégal","Serbie","Sierra Leone","Singapour","Somalie","Soudan",
    "Sri Lanka","Suède","Suisse","Syrie","Taïwan","Tanzanie","Thaïlande","Togo","Tunisie",
    "Turquie","Ukraine","Uruguay","Venezuela","Vietnam","Yémen","Zimbabwe",
  ];

  const filtered=countrySearch.length>0?COUNTRIES.filter(c=>c.toLowerCase().includes(countrySearch.toLowerCase())).slice(0,6):[];

  function selectCountry(c){
    setCountry(c);
    setShowFireworks(true);
    setTimeout(()=>setShowFireworks(false),2000);
  }

  function toggleVibe(id){setVibes(prev=>prev.includes(id)?prev.filter(v=>v!==id):[...prev,id]);}

  function finish(){
    if(!name.trim()||!age||!genre||vibes.length===0) return;
    onDone({name:name.trim(),age,genre,country,vibes});
  }

  const genreOptions=[
    {id:"m",label:lang==="fr"?"Lui":lang==="es"?"Él":"Him",emoji:"⚡"},
    {id:"f",label:lang==="fr"?"Elle":lang==="es"?"Ella":"Her",emoji:"⚡"},
    {id:"n",label:lang==="fr"?"Libre":lang==="es"?"Libre":"Free",emoji:"⚡"},
  ];

  const steps=[
    // Step 0 — Nom
    <div key="name" style={{animation:"fadeUp .35s ease both"}}>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:36,color:C.ink,marginBottom:8,lineHeight:1.1}}>{t.whatsYourName}</div>
      <input type="text" placeholder={t.namePlaceholder} value={name} onChange={e=>setName(e.target.value)}
        onKeyDown={e=>e.key==="Enter"&&name.trim()&&setStep(1)}
        style={{width:"100%",padding:"16px 18px",border:`2px solid ${C.border}`,borderRadius:14,fontFamily:"Inter,sans-serif",fontSize:18,color:C.ink,outline:"none",marginTop:16,background:"white"}} autoFocus/>
      <button onClick={()=>name.trim()&&setStep(1)} disabled={!name.trim()}
        style={{width:"100%",marginTop:16,padding:"16px",border:"none",borderRadius:14,background:name.trim()?C.violet:"#E8E5F0",color:name.trim()?"white":C.muted,fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:16,cursor:name.trim()?"pointer":"not-allowed"}}>
        {t.continue}
      </button>
    </div>,

    // Step 1 — Âge
    <div key="age" style={{animation:"fadeUp .35s ease both"}}>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:36,color:C.ink,marginBottom:20,lineHeight:1.1}}>{t.howOld}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
        {AGE_RANGES.map(a=>(
          <div key={a} onClick={()=>{setAge(a);setTimeout(()=>setStep(2),300);}}
            style={{padding:"14px 8px",background:age===a?C.violet:"white",borderRadius:14,textAlign:"center",cursor:"pointer",border:`2px solid ${age===a?C.violet:C.border}`,transition:"all .15s"}}>
            <span style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:14,color:age===a?"white":C.ink}}>{a}</span>
          </div>
        ))}
      </div>
    </div>,

    // Step 2 — Genre
    <div key="genre" style={{animation:"fadeUp .35s ease both"}}>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:34,color:C.ink,marginBottom:6,lineHeight:1.1}}>
        {lang==="fr"?"Ton Jolingo, il ressemble à quoi ?":lang==="es"?"¿Cómo es tu Jolingo?":"What does your Jolingo look like?"}
      </div>
      <div style={{fontFamily:"Inter,sans-serif",fontSize:14,color:C.muted,marginBottom:24}}>
        {lang==="fr"?"Choisis ton identité":lang==="es"?"Elige tu identidad":"Choose your identity"}
      </div>
      <div style={{display:"flex",gap:12,marginBottom:24}}>
        {genreOptions.map(g=>(
          <div key={g.id} onClick={()=>{setGenre(g.id);setTimeout(()=>setStep(3),300);}}
            style={{flex:1,background:genre===g.id?C.violet:"white",borderRadius:18,padding:"24px 12px",cursor:"pointer",textAlign:"center",border:`2px solid ${genre===g.id?C.violet:C.border}`,transition:"all .2s"}}>
            <div style={{fontSize:28,marginBottom:8}}>{g.emoji}</div>
            <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:15,color:genre===g.id?"white":C.ink}}>{g.label}</div>
          </div>
        ))}
      </div>
    </div>,

    // Step 3 — Pays (globe interactif)
    <div key="country" style={{animation:"fadeUp .35s ease both"}}>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:34,color:C.ink,marginBottom:6,lineHeight:1.1}}>{t.whereFrom}</div>
      <div style={{fontFamily:"Inter,sans-serif",fontSize:14,color:C.muted,marginBottom:20}}>
        {lang==="fr"?"Cherche ton pays dans le monde entier 🌍":lang==="es"?"Busca tu país en todo el mundo 🌍":"Search your country from around the world 🌍"}
      </div>

      {showFireworks && (
        <div style={{textAlign:"center",padding:"20px 0",animation:"fadeUp .3s ease both"}}>
          <div style={{fontSize:52}}>🎉</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,color:C.violet,marginTop:8}}>
            {lang==="fr"?"Bienvenue depuis":lang==="es"?"¡Bienvenido desde":"Welcome from"} {country} !
          </div>
        </div>
      )}

      {!showFireworks && <>
        {country && (
          <div style={{background:C.violet+"12",borderRadius:14,padding:"14px 18px",marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:28}}>🌍</span>
            <div>
              <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:15,color:C.ink}}>{country}</div>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:C.muted}}>
                {lang==="fr"?"Ton pays":lang==="es"?"Tu país":"Your country"}
              </div>
            </div>
            <span style={{marginLeft:"auto",color:C.green,fontSize:20}}>✓</span>
          </div>
        )}
        <input type="text" placeholder={t.countryPlaceholder} value={countrySearch} onChange={e=>setCountrySearch(e.target.value)}
          style={{width:"100%",padding:"14px 16px",border:`2px solid ${C.border}`,borderRadius:12,fontFamily:"Inter,sans-serif",fontSize:15,color:C.ink,outline:"none",background:"white",marginBottom:8}}/>
        {filtered.length>0&&(
          <div style={{background:"white",borderRadius:12,border:`1px solid ${C.border}`,overflow:"hidden",marginBottom:16}}>
            {filtered.map(c=>(
              <div key={c} onClick={()=>{selectCountry(c);setCountrySearch("");}}
                style={{padding:"12px 16px",cursor:"pointer",fontFamily:"Inter,sans-serif",fontSize:14,color:C.ink,borderBottom:`1px solid ${C.border}`,transition:"background .1s"}}
                onMouseEnter={e=>e.currentTarget.style.background=C.bg}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                🌍 {c}
              </div>
            ))}
          </div>
        )}
      </>}

      <button onClick={()=>setStep(4)}
        style={{width:"100%",padding:"16px",border:"none",borderRadius:14,background:C.violet,color:"white",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:16,cursor:"pointer"}}>
        {t.continue}
      </button>
      <button onClick={()=>setStep(4)} style={{width:"100%",background:"none",border:"none",color:C.muted,fontFamily:"Inter,sans-serif",fontSize:13,cursor:"pointer",padding:"10px",marginTop:4}}>
        {lang==="fr"?"Passer":lang==="es"?"Saltar":"Skip"}
      </button>
    </div>,

    // Step 4 — Vibes
    <div key="vibes" style={{animation:"fadeUp .35s ease both"}}>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:34,color:C.ink,marginBottom:4,lineHeight:1.1}}>{t.whatVibes}</div>
      <div style={{fontFamily:"Inter,sans-serif",fontSize:14,color:C.muted,marginBottom:20}}>{t.vibesSub}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
        {UNIVERSE_IDS.map(id=>{
          const u=t.universes[id];
          const active=vibes.includes(id);
          return(
            <div key={id} onClick={()=>toggleVibe(id)}
              style={{padding:"16px 14px",background:active?C.violet+"15":"white",borderRadius:16,cursor:"pointer",border:`2px solid ${active?C.violet:C.border}`,transition:"all .15s",textAlign:"center"}}>
              <div style={{fontSize:28,marginBottom:6}}>{u.emoji}</div>
              <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:14,color:active?C.violet:C.ink}}>{u.name}</div>
            </div>
          );
        })}
      </div>
      <button onClick={finish} disabled={vibes.length===0}
        style={{width:"100%",padding:"18px",border:"none",borderRadius:14,background:vibes.length>0?C.violet:"#E8E5F0",color:vibes.length>0?"white":C.muted,fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:17,cursor:vibes.length>0?"pointer":"not-allowed"}}>
        {t.letsGo}
      </button>
    </div>,
  ];

  return(
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",justifyContent:"center"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{width:"100%",maxWidth:420,padding:"56px 24px 40px"}}>
        <div style={{display:"flex",gap:6,marginBottom:40}}>
          {[0,1,2,3,4].map(i=>(
            <div key={i} style={{height:4,flex:i===step?2:1,borderRadius:2,background:i<=step?C.violet:C.border,transition:"all .3s"}}/>
          ))}
        </div>
        {steps[step]}
        {step>0&&<button onClick={()=>setStep(s=>s-1)} style={{width:"100%",background:"none",border:"none",color:C.muted,fontFamily:"Inter,sans-serif",fontSize:13,cursor:"pointer",padding:"12px",marginTop:8}}>← {lang==="fr"?"Retour":lang==="es"?"Volver":"Back"}</button>}
      </div>
    </div>
  );
}

// ── SELECTION TÂCHES — 3 blocs + limite 3 gratuit ────────
const MAX_FREE_TASKS = 3;

function TaskSelection({lang,vibes,genre,onCommit,prefilled=[]}){
  const t=T[lang];
  const ex=EXTRA_STRINGS[lang];
  const s_=load();
  const myLib=s_.myLibrary||[];
  const [mode,setMode]=useState(s_.preferredMode||"explore");
  const [selected,setSelected]=useState(prefilled.map(p=>p.text)||[]);
  const [openUniverse,setOpenUniverse]=useState(vibes[0]||null);
  const [randomTasks,setRandomTasks]=useState([]);
  const [customInput,setCustomInput]=useState("");
  const [customMsg,setCustomMsg]=useState(null);
  const [intention,setIntention]=useState("");
  const [aiTasks,setAiTasks]=useState([]);
  const [aiLoading,setAiLoading]=useState(false);
  const [libreTasks,setLibreTasks]=useState([]);
  const [libreInput,setLibreInput]=useState("");

  const recentHistory=s_.history||{};
  const recentTexts=Object.values(recentHistory).slice(-7).flatMap(d=>d.taskTexts||[]);

  const allTasksPool=vibes.flatMap(v=>(t.tasks_by_universe[v]||[]).map(text=>({text,packId:v})));

  function generateRandom(){
    const pool=allTasksPool.filter(t=>!recentTexts.includes(t.text)&&!selected.includes(t.text));
    const shuffled=[...pool].sort(()=>Math.random()-.5);
    // At least 2 different universes
    const picks=[];const usedVibes=new Set();
    for(const item of shuffled){
      if(picks.length>=3) break;
      if(picks.length<2||usedVibes.size>=2) {picks.push(item);usedVibes.add(item.packId);}
      else if(!usedVibes.has(item.packId)){picks.push(item);usedVibes.add(item.packId);}
    }
    if(picks.length<3){
      for(const item of shuffled){
        if(picks.length>=3) break;
        if(!picks.find(p=>p.text===item.text)) picks.push(item);
      }
    }
    setRandomTasks(picks.slice(0,3));
  }

  function switchMode(m){
    setMode(m);
    const s=load();save({...s,preferredMode:m});
    if(m==="hasard"&&randomTasks.length===0) generateRandom();
  }

  function toggle(text){
    if(selected.includes(text)){setSelected(prev=>prev.filter(t=>t!==text));return;}
    if(selected.length>=MAX_FREE_TASKS){setCustomMsg({type:"limit",text:lang==="fr"?"Maximum 3 tâches en version gratuite 🔒":lang==="es"?"Máximo 3 tareas en versión gratuita 🔒":"Max 3 tasks in free version 🔒"});setTimeout(()=>setCustomMsg(null),2500);return;}
    setSelected(prev=>[...prev,text]);
  }

  function addLibreTask(){
    const text=libreInput.trim();
    if(!text) return;
    if(!filterTask(text)){setCustomMsg({type:"error",text:t.customBanned});setTimeout(()=>setCustomMsg(null),3000);setLibreInput("");return;}
    if(libreTasks.length>=MAX_FREE_TASKS){setCustomMsg({type:"limit",text:lang==="fr"?"Maximum 3 tâches en version gratuite 🔒":lang==="es"?"Máximo 3 tareas en versión gratuita 🔒":"Max 3 tasks in free version 🔒"});setTimeout(()=>setCustomMsg(null),2500);return;}
    const s=load();const lib=s.myLibrary||[];
    if(!lib.includes(text)) save({...s,myLibrary:[text,...lib].slice(0,50)});
    setLibreTasks(prev=>[...prev,{text,fromAI:false}]);
    setLibreInput("");
  }

  function removeLibreTask(i){setLibreTasks(prev=>prev.filter((_,idx)=>idx!==i));}

  async function generateFromAI(){
    if(!intention.trim()) return;
    setAiLoading(true);setAiTasks([]);
    try{
      const sys=lang==="fr"
        ?"Tu es Jolingo. Génère exactement 3 tâches courtes (max 7 mots), positives, réalisables aujourd'hui. JSON uniquement: {\"tasks\":[\"t1\",\"t2\",\"t3\"]}"
        :lang==="es"
        ?"Eres Jolingo. Genera exactamente 3 tareas cortas (máx 7 palabras), positivas, realizables hoy. Solo JSON: {\"tasks\":[\"t1\",\"t2\",\"t3\"]}"
        :"You are Jolingo. Generate exactly 3 short tasks (max 7 words), positive, doable today. JSON only: {\"tasks\":[\"t1\",\"t2\",\"t3\"]}";
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:200,system:sys,messages:[{role:"user",content:intention}]})});
      const data=await res.json();
      const raw=data.content?.map(i=>i.text||"").join("").trim();
      const clean=raw.replace(/```json|```/g,"").trim();
      const parsed=JSON.parse(clean);
      if(parsed.tasks&&Array.isArray(parsed.tasks)) setAiTasks(parsed.tasks.filter(filterTask));
    }catch(e){
      setCustomMsg({type:"error",text:lang==="fr"?"Oups, réessaie !":"Oops, try again!"});
      setTimeout(()=>setCustomMsg(null),2000);
    }
    setAiLoading(false);
  }

  function commit(){
    let tasks=[];
    if(mode==="explore"){
      if(!selected.length) return;
      tasks=selected.map(text=>{
        const isResistance=Object.values(ex.resistanceTasks||{}).flat().includes(text);
        const isMine=myLib.includes(text);
        let packId="custom";
        for(const v of vibes){if((t.tasks_by_universe[v]||[]).includes(text)){packId=v;break;}}
        return{text,packId,isMine,isResistance};
      });
    } else if(mode==="hasard"){
      if(!selected.length) return;
      tasks=selected.map(text=>({text,packId:"random",isMine:false,isResistance:false}));
    } else {
      if(!libreTasks.length) return;
      tasks=libreTasks.map(t=>({text:t.text,packId:"custom",isMine:true,isResistance:false,fromAI:t.fromAI}));
    }
    onCommit(tasks);
  }

  const currentCount=mode==="libre"?libreTasks.length:selected.length;
  const canCommit=currentCount>0;
  const atLimit=currentCount>=MAX_FREE_TASKS;

  const TABS=[
    {id:"explore",label:lang==="fr"?"☀️ Explore":lang==="es"?"☀️ Explora":"☀️ Explore"},
    {id:"hasard",label:lang==="fr"?"🎲 Hasard":lang==="es"?"🎲 Azar":"🎲 Random"},
    {id:"libre",label:lang==="fr"?"✏️ Libre":lang==="es"?"✏️ Libre":"✏️ Free"},
  ];

  return(
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",justifyContent:"center"}}>
      <div style={{width:"100%",maxWidth:420,padding:"48px 20px 120px"}}>

        {/* Titre */}
        <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:800,fontSize:26,color:C.ink,marginBottom:4}}>
          {lang==="fr"?"Choisis tes tâches du jour":lang==="es"?"Elige tus tareas de hoy":"Choose your tasks for today"}
        </div>
        <div style={{fontFamily:"Inter,sans-serif",fontSize:13,color:C.muted,marginBottom:20}}>
          {lang==="fr"?"Maximum 3 tâches · Gratuit":lang==="es"?"Máximo 3 tareas · Gratis":"Up to 3 tasks · Free"}
        </div>

        {/* Compteur */}
        <div style={{display:"flex",gap:8,marginBottom:20}}>
          {[1,2,3].map(i=>(
            <div key={i} style={{flex:1,height:6,borderRadius:3,background:i<=currentCount?C.violet:C.border,transition:"background .2s"}}/>
          ))}
        </div>

        {/* Message limite */}
        {customMsg&&(
          <div style={{background:customMsg.type==="limit"?"#FFF8E7":customMsg.type==="error"?"#FEE2E2":"#F0FDF4",borderRadius:12,padding:"10px 14px",marginBottom:14,fontFamily:"Inter,sans-serif",fontSize:13,fontWeight:600,color:customMsg.type==="limit"?"#D97706":customMsg.type==="error"?C.red:C.green}}>
            {customMsg.text}
          </div>
        )}

        {/* Tabs */}
        <div style={{display:"flex",gap:6,marginBottom:20,background:"white",borderRadius:14,padding:4}}>
          {TABS.map(tab=>(
            <button key={tab.id} onClick={()=>switchMode(tab.id)}
              style={{flex:1,padding:"10px 6px",border:"none",borderRadius:11,background:mode===tab.id?C.violet:"transparent",color:mode===tab.id?"white":C.muted,fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:13,cursor:"pointer",transition:"all .2s"}}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── EXPLORE — accordéon par univers ── */}
        {mode==="explore"&&(
          <>
            {vibes.map(v=>{
              const isOpen=openUniverse===v;
              const tasks=t.tasks_by_universe[v]||[];
              const selectedInUniverse=tasks.filter(tx=>selected.includes(tx)).length;
              return(
                <div key={v} style={{marginBottom:8}}>
                  <div onClick={()=>setOpenUniverse(isOpen?null:v)}
                    style={{display:"flex",alignItems:"center",gap:10,padding:"14px 16px",background:"white",borderRadius:isOpen?"14px 14px 0 0":14,cursor:"pointer",borderBottom:isOpen?`1px solid ${C.border}`:"none"}}>
                    <span style={{fontSize:20}}>{t.universes[v]?.emoji}</span>
                    <span style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:15,color:C.ink,flex:1}}>{t.universes[v]?.name}</span>
                    {selectedInUniverse>0&&<span style={{background:C.violet,color:"white",borderRadius:20,padding:"2px 8px",fontFamily:"Inter,sans-serif",fontSize:11,fontWeight:700}}>{selectedInUniverse}</span>}
                    <span style={{color:C.muted,fontSize:16}}>{isOpen?"▲":"▼"}</span>
                  </div>
                  {isOpen&&(
                    <div style={{background:"white",borderRadius:"0 0 14px 14px",padding:"8px 12px 12px"}}>
                      {tasks.map(text=>(
                        <TaskRow key={text} text={text} selected={selected.includes(text)}
                          onToggle={()=>toggle(text)} color={C.violet} emoji={t.universes[v]?.emoji}
                          disabled={atLimit&&!selected.includes(text)}/>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}

        {/* ── HASARD ── */}
        {mode==="hasard"&&(
          <>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:13,color:C.muted,marginBottom:16}}>
              {lang==="fr"?"3 tâches tirées au sort depuis tes univers — sans répétition des 7 derniers jours.":lang==="es"?"3 tareas al azar de tus universos — sin repetir las últimas 7.":"3 tasks drawn from your universes — no repeats from the last 7 days."}
            </div>
            {randomTasks.map((task,i)=>(
              <TaskRow key={i} text={task.text} selected={selected.includes(task.text)}
                onToggle={()=>toggle(task.text)} color={C.violet} emoji={t.universes[task.packId]?.emoji||"🎲"}
                disabled={atLimit&&!selected.includes(task.text)}/>
            ))}
            <button onClick={generateRandom}
              style={{width:"100%",marginTop:12,padding:"13px",border:`2px dashed ${C.border}`,borderRadius:12,background:"transparent",color:C.muted,fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:14,cursor:"pointer"}}>
              🔀 {lang==="fr"?"Nouvelles tâches":lang==="es"?"Nuevas tareas":"New tasks"}
            </button>
          </>
        )}

        {/* ── LIBRE ── */}
        {mode==="libre"&&(
          <>
            {/* Zone IA */}
            <div style={{background:"white",borderRadius:16,padding:"16px",marginBottom:16,border:`2px solid ${C.border}`}}>
              <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:12,color:C.muted,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>
                {lang==="fr"?"Décris ta journée":lang==="es"?"Describe tu día":"Describe your day"}
              </div>
              <textarea
                placeholder={lang==="fr"?"Ex: journée chargée, j'ai besoin de me concentrer et de bouger…":lang==="es"?"Ej: día intenso, necesito concentrarme y moverme…":"E.g: busy day, I need to focus and move a bit…"}
                value={intention} onChange={e=>setIntention(e.target.value)} rows={3}
                style={{width:"100%",border:"none",outline:"none",fontFamily:"Inter,sans-serif",fontSize:14,color:C.ink,resize:"none",background:"transparent",lineHeight:1.6}}/>
              <button onClick={generateFromAI} disabled={!intention.trim()||aiLoading}
                style={{width:"100%",marginTop:10,padding:"11px",border:"none",borderRadius:10,background:intention.trim()&&!aiLoading?C.violet:"#E8E5F0",color:intention.trim()&&!aiLoading?"white":C.muted,fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:14,cursor:intention.trim()&&!aiLoading?"pointer":"not-allowed"}}>
                {aiLoading?(lang==="fr"?"Jolingo réfléchit…":"Jolingo is thinking…"):(lang==="fr"?"Générer mes tâches ✨":lang==="es"?"Generar mis tareas ✨":"Generate my tasks ✨")}
              </button>
            </div>

            {/* Suggestions IA */}
            {aiTasks.length>0&&(
              <div style={{marginBottom:16}}>
                <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:12,color:C.muted,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>
                  {lang==="fr"?"Suggestions":lang==="es"?"Sugerencias":"Suggestions"}
                </div>
                {aiTasks.map((text,i)=>{
                  const added=libreTasks.find(t=>t.text===text);
                  return(
                    <div key={i} onClick={()=>{if(!added&&libreTasks.length<MAX_FREE_TASKS)setLibreTasks(prev=>[...prev,{text,fromAI:true}]);}}
                      style={{background:added?"#F0F0FF":"white",borderRadius:13,padding:"13px 15px",marginBottom:8,display:"flex",alignItems:"center",gap:12,cursor:"pointer",border:`2px solid ${added?C.violet:C.border}`,transition:"all .15s"}}>
                      <div style={{width:22,height:22,borderRadius:6,flexShrink:0,background:added?C.violet:C.border,display:"flex",alignItems:"center",justifyContent:"center"}}>
                        {added&&<span style={{color:"white",fontSize:12,fontWeight:700}}>✓</span>}
                      </div>
                      <span style={{fontFamily:"Inter,sans-serif",fontSize:14,fontWeight:500,color:C.ink,flex:1}}>{text}</span>
                      <span style={{fontFamily:"Inter,sans-serif",fontSize:10,color:C.muted}}>✨</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Divider */}
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
              <div style={{flex:1,height:1,background:C.border}}/>
              <span style={{fontFamily:"Inter,sans-serif",fontSize:12,color:C.muted}}>{lang==="fr"?"ou tape directement":lang==="es"?"o escribe directamente":"or type directly"}</span>
              <div style={{flex:1,height:1,background:C.border}}/>
            </div>

            {/* Input manuel */}
            <div style={{display:"flex",gap:8,marginBottom:16}}>
              <input type="text"
                placeholder={lang==="fr"?"Ta tâche…":lang==="es"?"Tu tarea…":"Your task…"}
                value={libreInput} onChange={e=>setLibreInput(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&addLibreTask()}
                style={{flex:1,padding:"13px 15px",border:`2px solid ${C.border}`,borderRadius:12,fontFamily:"Inter,sans-serif",fontSize:14,color:C.ink,outline:"none",background:"white"}}/>
              <button onClick={addLibreTask} disabled={atLimit}
                style={{padding:"0 18px",background:atLimit?"#E8E5F0":C.violet,color:atLimit?C.muted:"white",border:"none",borderRadius:12,fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:18,cursor:atLimit?"not-allowed":"pointer"}}>+</button>
            </div>

            {/* Tâches libres ajoutées */}
            {libreTasks.map((task,i)=>(
              <div key={i} style={{background:"white",borderRadius:13,padding:"13px 15px",marginBottom:8,display:"flex",alignItems:"center",gap:12,border:`2px solid ${C.violet}30`}}>
                {task.fromAI&&<span style={{fontSize:12}}>✨</span>}
                <span style={{fontFamily:"Inter,sans-serif",fontSize:14,fontWeight:600,color:C.ink,flex:1}}>{task.text}</span>
                <button onClick={()=>removeLibreTask(i)} style={{background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:18,padding:"0 4px"}}>×</button>
              </div>
            ))}
          </>
        )}

        {/* Bouton commit — fixe en bas */}
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:C.bg,padding:"16px 20px 32px",borderTop:`1px solid ${C.border}`}}>
          <div style={{maxWidth:420,margin:"0 auto"}}>
            {canCommit&&(
              <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:C.muted,textAlign:"center",marginBottom:8}}>
                {lang==="fr"?`Tu peux gagner jusqu'à ${currentCount*PTS_TASK} Jolingos 🪙`:lang==="es"?`Puedes ganar hasta ${currentCount*PTS_TASK} Jolingos 🪙`:`You can earn up to ${currentCount*PTS_TASK} Jolingos 🪙`}
              </div>
            )}
            <button onClick={commit} disabled={!canCommit}
              style={{width:"100%",padding:"17px",border:"none",borderRadius:14,background:canCommit?C.violet:"#E8E5F0",color:canCommit?"white":C.muted,fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:16,cursor:canCommit?"pointer":"not-allowed",boxShadow:canCommit?`0 8px 24px ${C.violet}35`:"none",transition:"all .2s"}}>
              {canCommit
                ?(lang==="fr"?`Je m'engage sur ${currentCount} tâche${currentCount>1?"s":""}`:lang==="es"?`Me comprometo con ${currentCount} tarea${currentCount>1?"s":""}`:(`I commit to ${currentCount} task${currentCount>1?"s":""}`))
                :(lang==="fr"?"Sélectionne tes tâches":lang==="es"?"Selecciona tus tareas":"Select your tasks")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskRow({text,selected,onToggle,color,emoji,isResistance=false,disabled=false}){
  return(
    <div onClick={disabled?undefined:onToggle}
      style={{background:selected?color+"08":"white",borderRadius:13,padding:"13px 15px",marginBottom:8,display:"flex",alignItems:"center",gap:12,cursor:disabled?"not-allowed":"pointer",border:`2px solid ${selected?color:"transparent"}`,transition:"all .15s",opacity:disabled&&!selected?0.4:1}}>
      <div style={{width:22,height:22,borderRadius:6,flexShrink:0,background:selected?color:C.border,display:"flex",alignItems:"center",justifyContent:"center",transition:"background .15s"}}>
        {selected&&<span style={{color:"white",fontSize:12,fontWeight:700}}>✓</span>}
      </div>
      {isResistance&&<span style={{fontSize:14}}>🚫</span>}
      <span style={{fontFamily:"Inter,sans-serif",fontSize:14,fontWeight:selected?600:500,color:selected?C.ink:"#555",flex:1}}>{text}</span>
      <span style={{fontFamily:"Inter,sans-serif",fontSize:10,color:C.muted,flexShrink:0}}>{isResistance?PTS_RESISTANCE:PTS_TASK}J</span>
    </div>
  );
}

// ── CAPTURE ANIMATION ─────────────────────────────────────
function CaptureScreen({energy,genre,lang,onDone}){
  const ex=EXTRA_STRINGS[lang];
  const name=energy.names[genre]||energy.names.n;
  const [phase,setPhase]=useState(0);
  useEffect(()=>{
    const t1=setTimeout(()=>setPhase(1),800);
    const t2=setTimeout(()=>setPhase(2),2000);
    const t3=setTimeout(()=>onDone(),3500);
    return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);};
  },[]);
  return(
    <div style={{position:"fixed",inset:0,background:`linear-gradient(145deg,${C.night},#2D1B69)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:600,padding:32}}>
      <style>{`
        @keyframes captureIn{0%{transform:scale(0) rotate(-20deg);opacity:0}60%{transform:scale(1.2)}100%{transform:scale(1);opacity:1}}
        @keyframes firework{0%{transform:scale(0);opacity:1}100%{transform:scale(3);opacity:0}}
        .capture-mascot{animation:captureIn .6s cubic-bezier(.34,1.56,.64,1) both;}
        .fw{animation:firework .8s ease-out both;}
      `}</style>

      {/* Feux d'artifice */}
      {phase>=1&&[...Array(8)].map((_,i)=>(
        <div key={i} className="fw" style={{
          position:"absolute",
          width:12,height:12,borderRadius:"50%",
          background:["#FFD93D","#FF5722","#22C55E","#4C35E8","#FF9EBB","#BAE6FD","#F97316","#A78BFA"][i],
          top:`${20+Math.random()*60}%`,left:`${10+Math.random()*80}%`,
          animationDelay:`${i*0.1}s`,
        }}/>
      ))}

      <div className="capture-mascot" style={{marginBottom:24}}>
        <MascotteCharacter energy={energy} genre={genre} size={160} animated/>
      </div>

      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:C.yellow,textAlign:"center",marginBottom:8}}>
        {ex.capture} {name} !
      </div>
      <div style={{fontFamily:"Inter,sans-serif",fontSize:16,color:"rgba(255,255,255,.7)",textAlign:"center",marginBottom:12}}>
        {energy.country} {energy.countryName[lang]} · {energy.energy[lang]}
      </div>
      <div style={{fontFamily:"Inter,sans-serif",fontSize:14,color:"rgba(255,255,255,.5)",textAlign:"center",maxWidth:280}}>
        {energy.description[lang]}
      </div>
      <div style={{marginTop:20,fontFamily:"Inter,sans-serif",fontSize:14,color:C.yellow,fontWeight:600}}>
        {name} {ex.joinsTree}
      </div>
    </div>
  );
}

// ── MICRO CELEBRATION ─────────────────────────────────────
function Celebration({message,onDone}){
  useEffect(()=>{const t=setTimeout(onDone,1800);return()=>clearTimeout(t);},[]);
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(26,26,46,.7)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500,backdropFilter:"blur(4px)"}}>
      <style>{`@keyframes celebPop{0%{transform:scale(0) rotate(-8deg);opacity:0}60%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}`}</style>
      <div style={{background:"white",borderRadius:28,padding:"36px 40px",textAlign:"center",animation:"celebPop .4s cubic-bezier(.34,1.56,.64,1) both",maxWidth:280}}>
        <div style={{fontSize:56,marginBottom:12}}>🎉</div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:C.ink}}>{message}</div>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────
export default function App(){
  const [phase,setPhase]=useState("lang");
  const [lang,setLang]=useState("fr");
  const [screen,setScreen]=useState("home");
  const [tab,setTab]=useState("home");
  const [profile,setProfile]=useState(null);
  const [selected,setSelected]=useState([]);
  const [checkin,setCheckin]=useState({});
  const [totalJolingos,setTotalJolingos]=useState(0);
  const [streak,setStreak]=useState(0);
  const [totalDone,setTotalDone]=useState(0);
  const [perfectDays,setPerfectDays]=useState(0);
  const [earnedBadges,setEarnedBadges]=useState([]);
  const [history,setHistory]=useState({});
  const [monthlyJolingos,setMonthlyJolingos]=useState({});
  const [celebration,setCelebration]=useState(null);
  const [captureEnergy,setCaptureEnergy]=useState(null);
  const [newBadge,setNewBadge]=useState(null);
  const [selectedMonth,setSelectedMonth]=useState(monthKey());
  const [toast,setToast]=useState(null);
  const [tomorrowTasks,setTomorrowTasks]=useState([]);
  const [showPrepTomorrow,setShowPrepTomorrow]=useState(false);

  const t=T[lang];
  const ex=EXTRA_STRINGS[lang];

  useEffect(()=>{
    const s=load();
    if(!s.lang){setPhase("lang");return;}
    setLang(s.lang);
    if(!s.profile){setPhase("onboard");return;}
    setProfile(s.profile);
    setTotalJolingos(s.totalJolingos||0);
    setStreak(s.streak||0);
    setTotalDone(s.totalDone||0);
    setPerfectDays(s.perfectDays||0);
    setEarnedBadges(s.earnedBadges||[]);
    setHistory(s.history||{});
    setMonthlyJolingos(s.monthlyJolingos||{});
    setTomorrowTasks(s.tomorrowTasks||[]);
    const tk=todayKey();
    const tmk=tomorrowKey();
    // Nouveau jour — charge les tâches préparées la veille
    if(s.activeKey!==tk){
      if(s.tomorrowTasks?.length>0&&s.tomorrowPreparedFor===tk){
        setSelected(s.tomorrowTasks);
        save({...s,activeKey:tk,selected:s.tomorrowTasks,checkin:{},eveningDone:false,tomorrowTasks:[],tomorrowPreparedFor:null});
        setScreen("evening");
      } else if(s.activeKey&&s.activeKey!==tk){
        save({...s,activeKey:null,selected:null,checkin:{},eveningDone:false});
        setScreen("home");
      } else {
        setScreen("home");
      }
    } else if(s.selected?.length>0){
      setSelected(s.selected);setCheckin(s.checkin||{});
      setScreen(s.eveningDone?"home":"evening");
    } else {
      setScreen("home");
    }
    // Streak check
    const y=new Date();y.setDate(y.getDate()-1);
    const yk=y.toISOString().split("T")[0];
    const prevH=s.history||{};
    if((s.streak||0)>0&&!prevH[yk]&&!prevH[tk]){
      setStreak(0);save({...s,streak:0});
    }
    setPhase("app");
  },[]);

  function showToast(msg){setToast(msg);setTimeout(()=>setToast(null),2200);}

  function pickLang(l){
    setLang(l);const s=load();save({...s,lang:l});
    setTimeout(()=>setPhase("splash"),100);
  }

  function setCheck(i,val){
    const next={...checkin,[i]:val};
    setCheckin(next);
    const s=load();save({...s,checkin:next});
    if(val===true&&Math.random()<0.3) setCelebration(randCelebration(t));
  }

  function submitEvening(){
    const done=selected.filter((_,i)=>checkin[i]===true).length;
    const total=selected.length;
    const isPerfect=done===total&&total>0;
    const s=load();
    const prevH=s.history||{};
    const tk=todayKey();const mk=monthKey();
    let pts=0;
    selected.forEach((task,i)=>{
      if(checkin[i]===true) pts+=task.isResistance?PTS_RESISTANCE:PTS_TASK;
    });
    if(isPerfect) pts+=PTS_PERFECT;
    const y=new Date();y.setDate(y.getDate()-1);
    const yk=y.toISOString().split("T")[0];
    const newStreak=done>0?(prevH[yk]?(s.streak||0)+1:1):0;
    if(newStreak>1) pts+=PTS_STREAK;
    const newTJ=(s.totalJolingos||0)+pts;
    const newTD=(s.totalDone||0)+done;
    const newPD=(s.perfectDays||0)+(isPerfect?1:0);
    const newH={...prevH,[tk]:{done,total,pts,isPerfect,taskTexts:selected.map(t=>t.text)}};
    const newMJ={...(s.monthlyJolingos||{}),[mk]:((s.monthlyJolingos||{})[mk]||0)+pts};

    // Check capture
    const prevLevel=getCapturedLevel(s.totalJolingos||0);
    const newLevel=getCapturedLevel(newTJ);
    if(newLevel>prevLevel&&newLevel<=ENERGIES.length){
      setCaptureEnergy(ENERGIES[newLevel-1]);
    }

    setStreak(newStreak);setTotalJolingos(newTJ);
    setTotalDone(newTD);setPerfectDays(newPD);
    setHistory(newH);setMonthlyJolingos(newMJ);
    save({...s,streak:newStreak,totalJolingos:newTJ,totalDone:newTD,perfectDays:newPD,history:newH,monthlyJolingos:newMJ,eveningDone:true});
    setScreen("recap");
    // Proposer de préparer demain
    setTimeout(()=>setShowPrepTomorrow(true),1000);
  }

  function commitTomorrowTasks(tasks){
    const tmk=tomorrowKey();
    const s=load();
    save({...s,tomorrowTasks:tasks,tomorrowPreparedFor:tmk});
    setTomorrowTasks(tasks);
    setShowPrepTomorrow(false);
    setScreen("recap");
    showToast(ex.tomorrowReady);
  }

  const tk=todayKey();
  const s_=load();
  const hasPending=s_.activeKey===tk&&s_.selected?.length>0&&!s_.eveningDone;
  const todayDone=!!(s_.history||{})[tk];
  const capturedLevel=getCapturedLevel(totalJolingos);
  const nextEnergy=ENERGIES[capturedLevel]||null;
  const currentEnergy=ENERGIES[capturedLevel-1]||null;
  const genre=profile?.genre||"n";
  const vibes=profile?.vibes||UNIVERSE_IDS;
  const done_ev=selected.filter((_,i)=>checkin[i]===true).length;
  const allAnswered=selected.length>0&&selected.every((_,i)=>checkin[i]!==undefined);
  const monthDays=Object.entries(history).filter(([k])=>k.startsWith(selectedMonth));
  const monthDone=monthDays.reduce((a,[,v])=>a+v.done,0);
  const monthTotal=monthDays.reduce((a,[,v])=>a+v.total,0);
  const monthAvg=monthTotal>0?Math.round((monthDone/monthTotal)*100):0;
  const monthJVal=monthlyJolingos[selectedMonth]||0;
  const allMonths=[...new Set([...Object.keys(monthlyJolingos),monthKey()])].sort().reverse();

  // ── PHASES ────────────────────────────────────────────────
  if(phase==="lang") return <LangPicker onPick={pickLang}/>;
  if(phase==="splash") return <Splash lang={lang} onDone={()=>setPhase("onboard")}/>;
  if(phase==="onboard") return <OnboardSlides lang={lang} onDone={()=>setPhase("profile")}/>;
  if(phase==="profile") return <ProfileSetup lang={lang} onDone={p=>{const s=load();save({...s,profile:p});setProfile(p);setPhase("app");setScreen("home");}}/>;

  if(screen==="select") return <TaskSelection lang={lang} vibes={vibes} genre={genre} onCommit={tasks=>{const s=load();save({...s,activeKey:tk,selected:tasks,checkin:{},eveningDone:false});setSelected(tasks);setCheckin({});setScreen("evening");}}/>;

  if(screen==="prepTomorrow") return <TaskSelection lang={lang} vibes={vibes} genre={genre} onCommit={commitTomorrowTasks} prefilled={[]}/>;

  return(
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",justifyContent:"center"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .btn{width:100%;padding:16px;border:none;border-radius:14px;font-family:Inter,sans-serif;font-weight:700;font-size:16px;cursor:pointer;transition:transform .15s;}
        .btn:active{transform:scale(.97);}
        .btn:disabled{opacity:.35;cursor:not-allowed;}
        .yn-btn{flex:1;padding:13px;border:2px solid transparent;border-radius:11px;font-family:Inter,sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:all .15s;background:#F7F5F2;color:#9A96A8;}
        .yn-btn.yes.on{background:#DCFCE7;border-color:#22C55E;color:#16A34A;}
        .yn-btn.no.on{background:#FEE2E2;border-color:#EF4444;color:#DC2626;}
        .bottom-nav{position:fixed;bottom:0;left:0;right:0;background:white;border-top:1px solid #E8E5F0;display:flex;justify-content:center;z-index:100;}
        .bottom-inner{display:flex;width:100%;max-width:420px;}
        .nav-btn{flex:1;padding:12px 0 16px;display:flex;flex-direction:column;align-items:center;gap:3px;border:none;background:none;cursor:pointer;}
        .nav-lbl{font-family:Inter,sans-serif;font-size:11px;font-weight:600;}
        .toast{position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:#1A1A2E;color:white;padding:12px 22px;border-radius:30px;font-family:Inter,sans-serif;font-size:14px;font-weight:600;z-index:300;white-space:nowrap;animation:fadeUp .3s ease;}
        @keyframes fadeUp{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .fi{animation:fadeIn .4s ease both;}
      `}</style>

      {toast&&<div className="toast">{toast}</div>}
      {celebration&&<Celebration message={celebration} onDone={()=>setCelebration(null)}/>}
      {captureEnergy&&<CaptureScreen energy={captureEnergy} genre={genre} lang={lang} onDone={()=>setCaptureEnergy(null)}/>}

      <div style={{width:"100%",maxWidth:420,padding:"48px 20px 100px"}}>

        {/* ── HOME ── */}
        {tab==="home"&&screen==="home"&&(
          <>
            {/* Header */}
            <div className="fi" style={{display:"flex",alignItems:"center",gap:12,marginBottom:20,animationDelay:".05s"}}>
              <Logo size={40}/>
              <div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,color:C.ink,letterSpacing:.5}}>JOLINGO</div>
                <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:C.muted}}>{new Date().getHours()<18?t.goodMorning:t.goodEvening} {profile?.name} 👋</div>
              </div>
              <button onClick={()=>{const langs=["fr","en","es"];const next=langs[(langs.indexOf(lang)+1)%3];setLang(next);const s=load();save({...s,lang:next});}} style={{marginLeft:"auto",background:"none",border:"none",cursor:"pointer",fontSize:20}}>{FLAG[lang]}</button>
            </div>

            {/* Mon Jolingo — Arbre + Mascotte */}
            <div className="fi" style={{background:`linear-gradient(135deg,${C.night},#2D1B69)`,borderRadius:20,padding:"20px",marginBottom:16,display:"flex",alignItems:"center",gap:16,animationDelay:".1s"}}>
              <JolingoTree capturedCount={capturedLevel} size={100}/>
              <div style={{flex:1}}>
                <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"rgba(255,255,255,.5)",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{ex.myTree}</div>
                {currentEnergy?(
                  <>
                    <MascotteCharacter energy={currentEnergy} genre={genre} size={60} animated/>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:C.yellow,marginTop:4}}>{currentEnergy.names[genre]}</div>
                    <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"rgba(255,255,255,.5)"}}>{currentEnergy.country} · {currentEnergy.energy[lang]}</div>
                  </>
                ):(
                  <div style={{fontFamily:"Inter,sans-serif",fontSize:13,color:"rgba(255,255,255,.6)"}}>
                    {lang==="fr"?"Capture ta première Énergie !":lang==="es"?"¡Captura tu primera Energía!":"Capture your first Energy!"}
                  </div>
                )}
                {nextEnergy&&(
                  <div style={{marginTop:8}}>
                    <div style={{height:4,background:"rgba(255,255,255,.15)",borderRadius:2,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${Math.min(100,(totalJolingos/(nextEnergy.jolingos))*100)}%`,background:C.yellow,borderRadius:2,transition:"width .5s"}}/>
                    </div>
                    <div style={{fontFamily:"Inter,sans-serif",fontSize:10,color:"rgba(255,255,255,.4)",marginTop:3}}>
                      {nextEnergy.jolingos-totalJolingos} Jolingos {ex.nextLevel} {nextEnergy.names[genre]} {nextEnergy.country}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Streak */}
            {streak>0&&(
              <div className="fi" style={{background:"#FFF8E7",borderRadius:14,padding:"12px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:10,animationDelay:".15s"}}>
                <span style={{fontSize:24}}>🔥</span>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:C.amber||"#F59E0B"}}>{streak} {t.yourStreak.toUpperCase()}</div>
                <div style={{marginLeft:"auto",fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:C.violet}}>{totalJolingos} Jolingos</div>
              </div>
            )}

            {/* Quick stats */}
            <div className="fi" style={{display:"flex",gap:10,marginBottom:16,animationDelay:".2s"}}>
              {[{l:"✅",v:totalDone},{l:"⭐",v:perfectDays},{l:"🪙",v:`${monthlyJolingos[monthKey()]||0}J`}].map((s,i)=>(
                <div key={i} style={{flex:1,background:"white",borderRadius:14,padding:"12px 8px",textAlign:"center"}}>
                  <div style={{fontSize:18}}>{s.l}</div>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:C.ink,marginTop:3}}>{s.v}</div>
                </div>
              ))}
            </div>

            {/* Demain préparé */}
            {tomorrowTasks.length>0&&(
              <div className="fi" style={{background:"#F0FDF4",borderRadius:14,padding:"12px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:10,border:`1px solid ${C.green}30`,animationDelay:".22s"}}>
                <span style={{fontSize:20}}>🌙</span>
                <div>
                  <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:13,color:C.green}}>{ex.tomorrowReady}</div>
                  <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:C.muted}}>{tomorrowTasks.length} Jolingos prêts pour demain</div>
                </div>
              </div>
            )}

            {/* États */}
            {!hasPending&&!todayDone&&(
              <div className="fi" style={{animationDelay:".25s"}}>
                <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:12,color:C.muted,letterSpacing:1,textTransform:"uppercase",marginBottom:12}}>{t.prepareDay}</div>
                <button onClick={()=>setScreen("select")} style={{width:"100%",padding:"20px",border:"none",borderRadius:18,background:`linear-gradient(135deg,${C.violet},${C.violetL})`,color:"white",fontFamily:"'Bebas Neue',sans-serif",fontSize:22,cursor:"pointer",boxShadow:`0 8px 24px ${C.violet}35`,marginBottom:12}}>
                  ☀️ {t.myDay.toUpperCase()}
                </button>
                <div style={{background:"white",borderRadius:14,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,opacity:.6}}>
                  <span style={{fontSize:18}}>🔒</span>
                  <div>
                    <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:14,color:C.ink}}>{t.proUnlock}</div>
                    <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:C.muted}}>{t.proSub}</div>
                  </div>
                </div>
              </div>
            )}

            {hasPending&&(
              <div onClick={()=>setScreen("evening")} style={{background:"white",borderRadius:18,padding:"20px",cursor:"pointer",borderLeft:`5px solid ${C.violet}`,boxShadow:`0 4px 16px ${C.violet}15`,display:"flex",alignItems:"center",gap:14}}>
                <span style={{fontSize:32}}>🌙</span>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:C.ink}}>{t.pendingTitle}</div>
                  <div style={{fontFamily:"Inter,sans-serif",fontSize:13,color:C.muted,marginTop:2}}>{selected.length} {t.pendingSub}</div>
                </div>
                <span style={{color:C.violet,fontSize:22}}>›</span>
              </div>
            )}

            {todayDone&&(
              <div style={{background:"white",borderRadius:20,padding:"28px 20px",textAlign:"center",border:`2px solid ${C.green}30`}}>
                <div style={{fontSize:52}}>🎉</div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:C.ink,marginTop:12}}>{t.bravoTitle}</div>
                <div style={{fontFamily:"Inter,sans-serif",fontSize:14,color:C.muted,marginTop:6,lineHeight:1.6}}>
                  {(history[tk]?.done||0)}/{(history[tk]?.total||0)} Jolingos · {history[tk]?.pts||0} 🪙<br/>{t.bravoSub}
                </div>
                {tomorrowTasks.length===0&&(
                  <button onClick={()=>setScreen("prepTomorrow")} style={{marginTop:16,width:"100%",padding:"14px",border:"none",borderRadius:12,background:C.violet+"15",color:C.violet,fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:14,cursor:"pointer"}}>
                    🌙 {ex.prepTomorrowCta}
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* ── EVENING ── */}
        {screen==="evening"&&(
          <>
            <div style={{marginBottom:24}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:34,color:C.ink}}>🌙 {t.eveningTitle.toUpperCase()}</div>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:14,color:C.muted,marginTop:4}}>{t.eveningSub}</div>
            </div>
            {selected.map((task,i)=>(
              <div key={i} style={{background:"white",borderRadius:14,padding:"16px",marginBottom:10}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:12}}>
                  <span style={{fontSize:16}}>{task.isResistance?"🚫":task.isMine?"⭐":t.universes[task.packId]?.emoji||"✦"}</span>
                  <span style={{fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:15,color:C.ink,lineHeight:1.4,flex:1}}>{task.text}</span>
                  <span style={{fontFamily:"Inter,sans-serif",fontSize:11,color:C.muted,flexShrink:0}}>{task.isResistance?PTS_RESISTANCE:PTS_TASK}J</span>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button className={`yn-btn yes ${checkin[i]===true?"on":""}`} onClick={()=>setCheck(i,true)}>
                    {task.isResistance?ex.resistanceDone:t.done}
                  </button>
                  <button className={`yn-btn no ${checkin[i]===false?"on":""}`} onClick={()=>setCheck(i,false)}>
                    {task.isResistance?ex.resistanceNotDone:t.notDone}
                  </button>
                </div>
              </div>
            ))}
            {Object.keys(checkin).length>0&&(
              <div style={{background:"white",borderRadius:14,padding:"14px 18px",marginBottom:16,display:"flex",justifyContent:"space-around",textAlign:"center"}}>
                {[{v:done_ev,c:C.green},{v:selected.filter((_,i)=>checkin[i]===false).length,c:C.red},{v:selected.length-Object.keys(checkin).length,c:C.muted}].map((s,i)=>(
                  <div key={i}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,color:s.c}}>{s.v}</div></div>
                ))}
              </div>
            )}
            <button className="btn" style={{background:allAnswered?C.violet:"#E8E5F0",color:allAnswered?"white":C.muted}} onClick={submitEvening} disabled={!allAnswered}>{t.validate}</button>
          </>
        )}

        {/* ── RECAP ── */}
        {screen==="recap"&&(
          <div style={{textAlign:"center",paddingTop:32}}>
            <div style={{fontSize:64}}>{done_ev===selected.length?"🏆":done_ev>selected.length/2?"👍":"💪"}</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:52,color:C.ink,marginTop:12,lineHeight:1}}>{done_ev}/{selected.length}</div>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:15,color:C.muted,marginTop:6}}>
              {done_ev===selected.length?t.perfectDay:done_ev>0?t.goodJob:t.tomorrow}
            </div>

            {/* Jolingos gagnés */}
            {(()=>{
              let pts=0;
              selected.forEach((task,i)=>{if(checkin[i]===true)pts+=task.isResistance?PTS_RESISTANCE:PTS_TASK;});
              if(done_ev===selected.length)pts+=PTS_PERFECT;
              if(streak>1)pts+=PTS_STREAK;
              return(
                <div style={{background:C.violet+"12",borderRadius:16,padding:"16px 20px",marginTop:20,display:"inline-flex",gap:24,alignItems:"center"}}>
                  <div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:C.violet}}>+{pts} 🪙</div><div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:C.muted}}>{ex.earnedJolingos}</div></div>
                  {streak>0&&<div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:C.amber||"#F59E0B"}}>🔥 {streak}</div><div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:C.muted}}>{t.yourStreak}</div></div>}
                </div>
              );
            })()}

            {/* Préparer demain */}
            {showPrepTomorrow&&tomorrowTasks.length===0&&(
              <div style={{background:"white",borderRadius:18,padding:"20px",marginTop:20,textAlign:"left"}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:C.ink,marginBottom:4}}>{ex.prepTomorrow}</div>
                <div style={{fontFamily:"Inter,sans-serif",fontSize:13,color:C.muted,marginBottom:14}}>{ex.prepTomorrowSub}</div>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>{setShowPrepTomorrow(false);setScreen("prepTomorrow");}} style={{flex:2,padding:"13px",border:"none",borderRadius:12,background:C.violet,color:"white",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:14,cursor:"pointer"}}>{ex.prepTomorrowCta}</button>
                  <button onClick={()=>setShowPrepTomorrow(false)} style={{flex:1,padding:"13px",border:`2px solid ${C.border}`,borderRadius:12,background:"white",color:C.muted,fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:13,cursor:"pointer"}}>{ex.prepTomorrowSkip}</button>
                </div>
              </div>
            )}

            {/* Task recap */}
            <div style={{textAlign:"left",marginTop:24}}>
              {selected.map((task,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:"white",borderRadius:12,marginBottom:8}}>
                  <div style={{width:26,height:26,borderRadius:7,flexShrink:0,background:checkin[i]===true?C.green+"20":C.red+"15",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>
                    {checkin[i]===true?"✓":"✗"}
                  </div>
                  <span style={{fontFamily:"Inter,sans-serif",fontSize:14,fontWeight:500,color:checkin[i]===true?C.ink:C.muted,textDecoration:checkin[i]===false?"line-through":"none",flex:1}}>{task.text}</span>
                  {checkin[i]===true&&<span style={{fontFamily:"Inter,sans-serif",fontSize:11,color:C.violet,fontWeight:700}}>+{task.isResistance?PTS_RESISTANCE:PTS_TASK}🪙</span>}
                </div>
              ))}
            </div>
            <button className="btn" style={{background:C.violet,color:"white",marginTop:24}} onClick={()=>{setScreen("home");setTab("home");}}>{t.backHome}</button>
          </div>
        )}

        {/* ── ARBRE / COLLECTION ── */}
        {tab==="tree"&&(
          <>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:34,color:C.ink,marginBottom:6}}>🌳 {ex.myTree.toUpperCase()}</div>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:14,color:C.muted,marginBottom:20}}>
              {capturedLevel}/{ENERGIES.length} Énergies capturées · {totalJolingos} Jolingos 🪙
            </div>

            {/* Grand arbre */}
            <div style={{display:"flex",justifyContent:"center",marginBottom:24}}>
              <JolingoTree capturedCount={capturedLevel} size={200}/>
            </div>

            {/* Prochaine capture */}
            {nextEnergy&&(
              <div style={{background:`linear-gradient(135deg,${C.night},#2D1B69)`,borderRadius:18,padding:"18px 20px",marginBottom:20}}>
                <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"rgba(255,255,255,.5)",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>
                  {lang==="fr"?"Prochaine capture":lang==="es"?"Próxima captura":"Next capture"}
                </div>
                <div style={{display:"flex",alignItems:"center",gap:16}}>
                  <div style={{width:60,height:60,borderRadius:16,background:"rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>
                    {nextEnergy.country}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:C.yellow}}>{nextEnergy.names[genre]}</div>
                    <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:"rgba(255,255,255,.6)"}}>{nextEnergy.countryName[lang]} · {nextEnergy.energy[lang]}</div>
                    <div style={{height:4,background:"rgba(255,255,255,.15)",borderRadius:2,overflow:"hidden",marginTop:8}}>
                      <div style={{height:"100%",width:`${Math.min(100,(totalJolingos/nextEnergy.jolingos)*100)}%`,background:C.yellow,borderRadius:2}}/>
                    </div>
                    <div style={{fontFamily:"Inter,sans-serif",fontSize:10,color:"rgba(255,255,255,.4)",marginTop:3}}>
                      {nextEnergy.jolingos-totalJolingos} Jolingos {ex.nextLevel}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Collection */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {ENERGIES.map((energy,i)=>{
                const captured=i<capturedLevel;
                return(
                  <div key={i} style={{background:"white",borderRadius:16,padding:"16px",textAlign:"center",opacity:captured?1:.4,border:`2px solid ${captured?energy.color+"40":"transparent"}`}}>
                    {captured?(
                      <MascotteCharacter energy={energy} genre={genre} size={70} animated={false}/>
                    ):(
                      <div style={{width:70,height:70,borderRadius:"50%",background:C.border,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>?</div>
                    )}
                    <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:13,color:C.ink,marginTop:8}}>
                      {captured?energy.names[genre]:"???"}
                    </div>
                    <div style={{fontFamily:"Inter,sans-serif",fontSize:10,color:C.muted,marginTop:2}}>
                      {captured?`${energy.country} · ${energy.energy[lang]}`:`${energy.jolingos} Jolingos`}
                    </div>
                    {captured&&<div style={{fontFamily:"Inter,sans-serif",fontSize:9,color:C.green,fontWeight:700,marginTop:4}}>✓ Capturé</div>}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ── STATS ── */}
        {tab==="stats"&&(
          <>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:34,color:C.ink,marginBottom:20}}>📊 {t.statsTitle.toUpperCase()}</div>
            <div style={{display:"flex",gap:8,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
              {allMonths.map(mk=>(
                <button key={mk} onClick={()=>setSelectedMonth(mk)}
                  style={{padding:"8px 14px",borderRadius:20,border:"2px solid",borderColor:selectedMonth===mk?C.violet:C.border,background:selectedMonth===mk?C.violet:"white",color:selectedMonth===mk?"white":C.ink,fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:13,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
                  {(()=>{const[y,m]=selectedMonth.split("-");return t.months[parseInt(m)-1]+" "+y;})()}
                </button>
              ))}
            </div>
            <div style={{background:"white",borderRadius:18,padding:20,marginBottom:14}}>
              <div style={{display:"flex",gap:10}}>
                {[{l:t.completion,v:`${monthAvg}%`,c:monthAvg>=80?C.green:monthAvg>=50?"#F59E0B":C.red},{l:"Jolingos",v:monthJVal,c:C.violet},{l:t.activeDays,v:monthDays.length,c:C.blue}].map(s=>(
                  <div key={s.l} style={{flex:1,background:C.bg,borderRadius:12,padding:"12px 8px",textAlign:"center"}}>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,color:s.c}}>{s.v}</div>
                    <div style={{fontFamily:"Inter,sans-serif",fontSize:10,color:C.muted,marginTop:3}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            {monthDays.length>0&&(
              <div style={{background:"white",borderRadius:18,padding:20,marginBottom:14}}>
                <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:12,color:C.muted,letterSpacing:1,textTransform:"uppercase",marginBottom:14}}>{t.calendar}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {monthDays.sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>{
                    const pct=v.total>0?(v.done/v.total)*100:0;
                    const bg=pct===100?C.green:pct>=50?"#F59E0B":pct>0?C.orange:"#EEE";
                    return(
                      <div key={k} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                        <div style={{width:34,height:34,borderRadius:9,background:bg,display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <span style={{fontFamily:"Inter,sans-serif",fontSize:9,fontWeight:700,color:"white"}}>{v.done}/{v.total}</span>
                        </div>
                        <span style={{fontFamily:"Inter,sans-serif",fontSize:9,color:C.muted}}>{new Date(k).getDate()}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {Object.entries(history).filter(([k])=>k.startsWith(selectedMonth)).sort(([a],[b])=>b.localeCompare(a)).map(([k,v])=>(
              <div key={k} style={{background:"white",borderRadius:12,padding:"14px 16px",marginBottom:8,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div>
                  <div style={{fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:14,color:C.ink}}>{new Date(k).toLocaleDateString(lang==="fr"?"fr-FR":lang==="es"?"es-ES":"en-GB",{weekday:"short",day:"numeric"})}</div>
                  <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:C.muted,marginTop:2}}>{v.done}/{v.total} · {v.pts} 🪙</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  {v.isPerfect&&<span>⭐</span>}
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:v.done===v.total?C.green:v.done>0?"#F59E0B":C.red}}>{Math.round((v.done/v.total)*100)}%</div>
                </div>
              </div>
            ))}
            {monthDays.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:C.muted,fontFamily:"Inter,sans-serif",fontSize:14}}>{t.noData}</div>}
          </>
        )}
      </div>

      {/* BOTTOM NAV */}
      {!["select","prepTomorrow"].includes(screen)&&(
        <div className="bottom-nav">
          <div className="bottom-inner">
            {[
              {id:"home",emoji:"🏠",label:t.home},
              {id:"tree",emoji:"🌳",label:ex.myTree},
              {id:"stats",emoji:"📊",label:t.stats},
            ].map(n=>(
              <button key={n.id} className="nav-btn" onClick={()=>{setTab(n.id);setScreen("home");}}>
                <span style={{fontSize:22}}>{n.emoji}</span>
                <span className="nav-lbl" style={{color:tab===n.id&&screen==="home"?C.violet:C.muted}}>{n.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
