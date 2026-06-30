import { useState, useEffect } from "react";
import { T, AGE_RANGES, filterTask, EXTRA_STRINGS } from "./i18n";
import { ENERGIES, MascotteCharacter, JolingoTree, JOKI_CULTURE, MysteryJoki } from "./mascottes";
import { THEMED_PACKS, getSeasonalPack, getEventPack } from "./packs";

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
const PTS_TASK=10, PTS_PERFECT=20, PTS_STREAK=5, PTS_RESISTANCE=15, PTS_CARRIED=5;
const PTS_BONUS=3; // tâches bonus au-delà des 3 principales (points réduits)
const CORE_TASKS=3; // nombre de tâches "principales" qui comptent à plein
const MAX_TOTAL_TASKS=8; // plafond global (3 principales + jusqu'à 5 bonus)

// Jolingos requis par niveau
const LEVEL_JOLINGOS = ENERGIES.map(e => e.jolingos);

// ── STORAGE ───────────────────────────────────────────────
const KEY="jolingo_v6";
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{};}catch{return{};}}
function save(d){try{localStorage.setItem(KEY,JSON.stringify(d));}catch{}}
// Jour "Jolingo" : bascule à 4h du matin (la nuit appartient à la veille)
function jolingoDate(){const d=new Date();if(d.getHours()<4)d.setDate(d.getDate()-1);return d;}
// Stats des 7 derniers jours à partir de l'historique
function weekStats(history){
  const days=[];const today=jolingoDate();
  let tasks=0,perfect=0,pts=0,activeDays=0;
  for(let i=6;i>=0;i--){
    const d=new Date(today);d.setDate(d.getDate()-i);
    const k=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    const h=history[k];
    const dayDone=h?.done||0;
    if(h){tasks+=dayDone;perfect+=h.isPerfect?1:0;pts+=h.pts||0;if(dayDone>0)activeDays++;}
    days.push({k,done:dayDone,total:h?.total||0,isPerfect:h?.isPerfect||false,label:["D","L","M","M","J","V","S"][d.getDay()]});
  }
  return{days,tasks,perfect,pts,activeDays};
}
function todayKey(){const d=jolingoDate();return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}
function tomorrowKey(){const d=jolingoDate();d.setDate(d.getDate()+1);return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}
function monthKey(){const d=jolingoDate();return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;}

// ── HELPERS ───────────────────────────────────────────────
function getCapturedLevel(jolingos){
  let level=0;
  for(let i=0;i<LEVEL_JOLINGOS.length;i++){if(jolingos>=LEVEL_JOLINGOS[i])level=i+1;}
  return level;
}
function shuffle(arr){return[...arr].sort(()=>Math.random()-.5);}
function randCelebration(t){return t.celebrations[Math.floor(Math.random()*t.celebrations.length)];}

// ── MOTEUR DE MOTS-CLÉS — comprend l'intention sans serveur ──
const KEYWORD_MAP={
  sport:["sport","bouger","bouge","courir","marche","marcher","muscu","gym","exercice","fitness","énergie","energie","cardio","vélo","velo","yoga","mouvement","actif","active","forme","transpirer","muscle","run","running","workout","move","walk","exercise","gimnasio","correr","caminar","ejercicio","moverme","deporte"],
  confort:["repos","reposer","fatigué","fatigue","fatiguée","dormir","sommeil","calme","détente","detente","relax","relaxer","douceur","cocooning","maison","ranger","propre","douche","bain","manger","cuisine","cuisiner","eau","hydrater","pause","souffler","rest","tired","sleep","relax","home","cook","comer","descansar","cansado","dormir","casa"],
  pro:["travail","boulot","bosser","productif","productivité","productivite","concentrer","concentration","focus","projet","carrière","carriere","job","email","mail","candidature","cv","réunion","reunion","deadline","tâche pro","étude","etude","étudier","etudier","réviser","reviser","apprendre","work","study","learn","focus","project","career","trabajo","estudiar","aprender","concentrar","proyecto"],
  social:["ami","amis","amie","famille","appeler","appel","contacter","voir","sortir","sortie","rencontrer","social","proche","proches","parler","discuter","aimer","aime","relation","couple","enfant","parent","mère","mere","père","pere","gens","friend","family","call","social","people","love","amigo","familia","llamar","gente","ver","salir"],
  mental:["stress","stressé","stresse","anxieux","anxiété","anxiete","calme","méditer","mediter","méditation","meditation","respirer","respiration","esprit","mental","penser","pensée","pensee","clarté","clarte","journal","gratitude","émotion","emotion","bien-être","bien-etre","sérénité","serenite","souffler","déconnecter","deconnecter","lâcher","lacher","mind","breathe","calm","meditate","stress","anxious","mente","respirar","meditar","calma","estrés","estres"],
  creative:["créer","creer","création","creation","créatif","creatif","créative","creative","art","dessiner","dessin","écrire","ecrire","écriture","ecriture","musique","jouer","photo","photographie","imaginer","imagination","idée","idee","idées","idees","inspirer","inspiration","peindre","danser","danse","projet créatif","bricoler","inventer","create","art","draw","write","music","paint","crear","arte","dibujar","escribir","música","musica","pintar","crear"],
};

function detectUniverses(text){
  const low=" "+text.toLowerCase()+" ";
  const scores={};
  for(const uni in KEYWORD_MAP){
    scores[uni]=KEYWORD_MAP[uni].filter(kw=>low.includes(kw)).length;
  }
  const matched=Object.entries(scores).filter(([,n])=>n>0).sort((a,b)=>b[1]-a[1]).map(([u])=>u);
  return matched;
}

// Génère 3 tâches intelligentes selon l'intention (sans serveur)
function smartTaskSuggestions(text,lang,vibes,exclude=[]){
  const T_=T[lang];
  let unis=detectUniverses(text);
  // Si rien détecté, on prend les univers préférés de l'utilisateur, sinon tous
  if(unis.length===0) unis=(vibes&&vibes.length?vibes:Object.keys(KEYWORD_MAP));
  // Construit un pool depuis les univers détectés (priorité aux premiers)
  let pool=[];
  for(const u of unis){
    const tasks=(T_.tasks_by_universe[u]||[]).filter(t=>!exclude.includes(t));
    pool.push(...tasks.map(t=>({text:t,uni:u})));
  }
  // Si toujours vide, fallback tout
  if(pool.length===0){
    for(const u of Object.keys(KEYWORD_MAP)){
      pool.push(...(T_.tasks_by_universe[u]||[]).map(t=>({text:t,uni:u})));
    }
  }
  // Mélange et prend 3 en variant les univers
  const shuffled=[...pool].sort(()=>Math.random()-.5);
  const picks=[];const usedUni=new Set();
  for(const item of shuffled){
    if(picks.length>=3) break;
    if(!usedUni.has(item.uni)||unis.length<3){picks.push(item.text);usedUni.add(item.uni);}
  }
  if(picks.length<3){for(const item of shuffled){if(picks.length>=3)break;if(!picks.includes(item.text))picks.push(item.text);}}
  return picks.slice(0,3);
}

// Détecte l'intention d'une question posée à Swaz
function detectSwazIntent(text){
  const low=" "+text.toLowerCase()+" ";
  const has=(arr)=>arr.some(w=>low.includes(w));
  if(has(["comment ça marche","comment ca marche","comment marche","règles","regles","how does it work","how it works","rules","cómo funciona","como funciona","reglas","c'est quoi jolingo","what is jolingo","qué es jolingo"])) return"howto";
  if(has(["tâche","tache","idée","idee","inspire","inspiration","quoi faire","suggère","suggere","propose","task","idea","inspir","what to do","tarea","idea","sugerencia","qué hacer","que hacer"])) return"tasks";
  if(has(["joki","jokis","énergie","energie","energy","jodama","arbre","tree","árbol","arbol","capture","capturer","capturar","personnage","character"])) return"universe";
  if(has(["jolingo","point","points","score","niveau","level","gagner","earn","puntos","ganar","nivel"])) return"points";
  if(has(["bonjour","salut","coucou","hello","hi","hey","hola","ça va","ca va","how are you","cómo estás","como estas"])) return"greeting";
  if(has(["merci","thanks","thank you","gracias"])) return"thanks";
  if(has(["triste","déprimé","deprime","pas envie","démotivé","demotive","fatigué","fatigue","dur","difficile","sad","tired","hard","unmotivated","down","triste","cansado","difícil","dificil","desanimado"])) return"support";
  return"default";
}

function swazAnswer(text,lang,profile){
  const intent=detectSwazIntent(text);
  const name=profile?.name||"";
  const A={
    fr:{
      howto:`C'est simple ${name} ! Chaque matin tu choisis jusqu'à 3 tâches, et le soir tu fais ton bilan : fait ou pas fait, sans jugement. Tu gagnes des Jolingos qui font grandir ton arbre et débloquent des Jokis. 🌱`,
      tasks:()=>{const s=load();const p=s.profile;const tasks=smartTaskSuggestions(text,lang,p?.vibes||[]);return`Voilà 3 idées pour toi :\n• ${tasks[0]}\n• ${tasks[1]}\n• ${tasks[2]}\nTu peux les ajouter depuis l'écran de tes tâches ! 💛`;},
      universe:`Les Jokis sont des petits compagnons que tu captures en accumulant des Jolingos 🌟 Chacun vient d'un pays et incarne une Énergie (feu, eau, lune…). Ton arbre, le Jodama, grandit avec eux. 20 pays t'attendent !`,
      points:`Tu gagnes des Jolingos en accomplissant tes tâches : 10 par tâche, 15 pour un défi de résistance, 20 pour une journée parfaite, et 5 par jour de série. Ils font grandir ton arbre ! ✨`,
      greeting:`Hey ${name} ! 😊 Toujours content de te voir. Comment je peux t'aider aujourd'hui ?`,
      thanks:`Avec plaisir ${name} ! Je suis toujours là pour toi. 💛`,
      support:`Je t'entends ${name}. 💛 Pas besoin d'en faire trop aujourd'hui — même un tout petit pas compte. Et si on commençait par une seule chose, douce et facile ?`,
      default:`Je suis là pour t'aider ${name} ! Tu peux me demander comment marche Jolingo, des idées de tâches, ou ce qu'est un Joki. 🌱`,
    },
    en:{
      howto:`It's simple ${name}! Each morning you pick up to 3 tasks, each evening you review: done or not, no judgment. You earn Jolingos that grow your tree and unlock Jokis. 🌱`,
      tasks:()=>{const s=load();const p=s.profile;const tasks=smartTaskSuggestions(text,lang,p?.vibes||[]);return`Here are 3 ideas for you:\n• ${tasks[0]}\n• ${tasks[1]}\n• ${tasks[2]}\nYou can add them from your tasks screen! 💛`;},
      universe:`Jokis are little companions you capture by earning Jolingos 🌟 Each comes from a country and embodies an Energy (fire, water, moon…). Your tree, the Jodama, grows with them. 20 countries await!`,
      points:`You earn Jolingos by completing tasks: 10 per task, 15 for a resistance challenge, 20 for a perfect day, and 5 per streak day. They grow your tree! ✨`,
      greeting:`Hey ${name}! 😊 Always glad to see you. How can I help today?`,
      thanks:`Anytime ${name}! I'm always here for you. 💛`,
      support:`I hear you ${name}. 💛 No need to do too much today — even a tiny step counts. How about we start with one gentle, easy thing?`,
      default:`I'm here to help ${name}! Ask me how Jolingo works, for task ideas, or what a Joki is. 🌱`,
    },
    es:{
      howto:`¡Es simple ${name}! Cada mañana eliges hasta 3 tareas, cada noche haces tu balance: hecho o no, sin juicios. Ganas Jolingos que hacen crecer tu árbol y desbloquean Jokis. 🌱`,
      tasks:()=>{const s=load();const p=s.profile;const tasks=smartTaskSuggestions(text,lang,p?.vibes||[]);return`Aquí van 3 ideas para ti:\n• ${tasks[0]}\n• ${tasks[1]}\n• ${tasks[2]}\n¡Puedes añadirlas desde tu pantalla de tareas! 💛`;},
      universe:`Los Jokis son pequeños compañeros que capturas ganando Jolingos 🌟 Cada uno viene de un país y encarna una Energía (fuego, agua, luna…). Tu árbol, el Jodama, crece con ellos. ¡20 países te esperan!`,
      points:`Ganas Jolingos completando tareas: 10 por tarea, 15 por un reto de resistencia, 20 por un día perfecto, y 5 por día de racha. ¡Hacen crecer tu árbol! ✨`,
      greeting:`¡Hey ${name}! 😊 Siempre me alegra verte. ¿Cómo puedo ayudarte hoy?`,
      thanks:`¡Cuando quieras ${name}! Siempre estoy aquí para ti. 💛`,
      support:`Te escucho ${name}. 💛 No hace falta hacer demasiado hoy — hasta un pasito cuenta. ¿Empezamos con una sola cosa, suave y fácil?`,
      default:`¡Estoy aquí para ayudarte ${name}! Pregúntame cómo funciona Jolingo, ideas de tareas, o qué es un Joki. 🌱`,
    },
  };
  const set=A[lang]||A.fr;
  const ans=set[intent]||set.default;
  return typeof ans==="function"?ans():ans;
}

// ── SECRET CULTUREL DU JOUR — unique à Jolingo ────────────
// Pioche un secret culturel (parmi les 20 pays des Jokis) stable pour la journée.
function cultureOfDay(dateKey){
  let h=0;for(let i=0;i<dateKey.length;i++){h=(h*31+dateKey.charCodeAt(i))>>>0;}
  return (h%20)+1; // niveau 1..20
}

// ── PALIERS (milestones) — célébrations marquantes ────────
const MILESTONES=[
  {id:"streak3",type:"streak",val:3,icon:"🔥",fr:"3 jours de série !",en:"3-day streak!",es:"¡Racha de 3 días!"},
  {id:"streak7",type:"streak",val:7,icon:"🔥",fr:"Une semaine de série !",en:"One week streak!",es:"¡Una semana de racha!"},
  {id:"streak14",type:"streak",val:14,icon:"⚡",fr:"2 semaines, tu es lancé !",en:"2 weeks, you're on fire!",es:"¡2 semanas, imparable!"},
  {id:"streak30",type:"streak",val:30,icon:"🏆",fr:"30 jours ! Incroyable !",en:"30 days! Incredible!",es:"¡30 días! ¡Increíble!"},
  {id:"streak100",type:"streak",val:100,icon:"👑",fr:"100 jours. Légendaire.",en:"100 days. Legendary.",es:"100 días. Legendario."},
  {id:"tasks10",type:"tasks",val:10,icon:"🌱",fr:"10 tâches accomplies !",en:"10 tasks done!",es:"¡10 tareas hechas!"},
  {id:"tasks50",type:"tasks",val:50,icon:"🌿",fr:"50 tâches ! Ça pousse !",en:"50 tasks! Growing!",es:"¡50 tareas! ¡Creciendo!"},
  {id:"tasks100",type:"tasks",val:100,icon:"🌳",fr:"100 tâches accomplies !",en:"100 tasks done!",es:"¡100 tareas hechas!"},
  {id:"tasks365",type:"tasks",val:365,icon:"🌲",fr:"365 tâches ! Une forêt !",en:"365 tasks! A forest!",es:"¡365 tareas! ¡Un bosque!"},
  {id:"perfect5",type:"perfect",val:5,icon:"⭐",fr:"5 journées parfaites !",en:"5 perfect days!",es:"¡5 días perfectos!"},
  {id:"perfect20",type:"perfect",val:20,icon:"🌟",fr:"20 journées parfaites !",en:"20 perfect days!",es:"¡20 días perfectos!"},
];
// Renvoie le palier tout juste atteint (ou null) en comparant ancienne et nouvelle valeur
function checkMilestone(type,oldVal,newVal,reached){
  for(const m of MILESTONES){
    if(m.type===type&&newVal>=m.val&&oldVal<m.val&&!reached[m.id]) return m;
  }
  return null;
}

// ── SWAZ — messages bienveillants (IA + fallback) ─────────
const SWAZ_FALLBACK={
  fr:{
    streak:["Bravo ! Ta série grandit, et toi avec. 🌱","Regarde-toi avancer ! Continue à ton rythme. 💛","Chaque jour compte, et tu le prouves. ✨"],
    capture:["Nouvelle Énergie capturée ! Ton voyage continue. 🌍","Tu viens de débloquer un Joki — quelle belle aventure ! 🌟","Un nouveau compagnon te rejoint. Profite ! 🎉"],
    slump:["Pas de souci si tu as ralenti — on repart en douceur. 🌤️","Je suis là, peu importe le rythme. Un petit pas aujourd'hui ? 💛","Les pauses font partie du chemin. Reprenons ensemble. 🌱"],
    welcome:["Hey ! Prêt à choisir tes tâches du jour ? 🌱","Content de te revoir ! On avance un peu ? 💛","Belle journée pour faire un petit pas. ✨"],
    firstday:["Bienvenue ! Je suis Swaz, ton compagnon. Choisissons ta première tâche ensemble. 🌱","Premier jour ! Pas de pression, juste un petit pas pour commencer. 💛","Ravi de te rencontrer ! On démarre tout doucement. ✨"],
    veteran:["Une semaine entière ! Tu prends un vrai rythme. Fier de toi. 🔥","7 jours et plus — tu fais de Jolingo une habitude. Continue ! 💛","Tu deviens un habitué. Ça se voit, ça se sent. 🌿"],
    legend:["30 jours et plus… tu es une légende vivante de Jolingo. 👑","Ton assiduité est incroyable. Tu m'inspires ! ✨","Un mois entier ! Tu as transformé l'effort en art. 🏆"],
  },
  en:{
    streak:["Nice! Your streak is growing, and so are you. 🌱","Look at you go! Keep your own pace. 💛","Every day counts, and you're proving it. ✨"],
    capture:["New Energy captured! Your journey continues. 🌍","You just unlocked a Joki — what an adventure! 🌟","A new companion joins you. Enjoy! 🎉"],
    slump:["No worries if you slowed down — let's ease back in. 🌤️","I'm here, whatever the pace. One small step today? 💛","Breaks are part of the path. Let's go again. 🌱"],
    welcome:["Hey! Ready to pick today's tasks? 🌱","Good to see you! Shall we move a little? 💛","Lovely day to take a small step. ✨"],
    firstday:["Welcome! I'm Swaz, your buddy. Let's pick your first task together. 🌱","First day! No pressure, just one small step to begin. 💛","Great to meet you! Let's start gently. ✨"],
    veteran:["A whole week! You're building real rhythm. Proud of you. 🔥","7 days and counting — you're making Jolingo a habit. Keep going! 💛","You're becoming a regular. It shows! 🌿"],
    legend:["30 days and beyond… you're a living Jolingo legend. 👑","Your consistency is incredible. You inspire me! ✨","A whole month! You turned effort into art. 🏆"],
  },
  es:{
    streak:["¡Bien! Tu racha crece, y tú también. 🌱","¡Mírate avanzar! Sigue a tu ritmo. 💛","Cada día cuenta, y lo demuestras. ✨"],
    capture:["¡Nueva Energía capturada! Tu viaje continúa. 🌍","¡Desbloqueaste un Joki — qué aventura! 🌟","Un nuevo compañero se une a ti. ¡Disfruta! 🎉"],
    slump:["No pasa nada si bajaste el ritmo — volvamos con calma. 🌤️","Estoy aquí, sin importar el ritmo. ¿Un pasito hoy? 💛","Las pausas son parte del camino. Sigamos. 🌱"],
    welcome:["¡Hey! ¿List@ para elegir tus tareas? 🌱","¡Qué bueno verte! ¿Avanzamos un poco? 💛","Lindo día para dar un pasito. ✨"],
    firstday:["¡Bienvenid@! Soy Swaz, tu compañero. Elijamos tu primera tarea juntos. 🌱","¡Primer día! Sin presión, solo un pasito para empezar. 💛","¡Encantado de conocerte! Empecemos con calma. ✨"],
    veteran:["¡Una semana entera! Estás tomando ritmo. Orgulloso de ti. 🔥","7 días y más — estás haciendo de Jolingo un hábito. ¡Sigue! 💛","Te estás volviendo un habitual. ¡Se nota! 🌿"],
    legend:["30 días y más… eres una leyenda viva de Jolingo. 👑","Tu constancia es increíble. ¡Me inspiras! ✨","¡Un mes entero! Convertiste el esfuerzo en arte. 🏆"],
  },
};

function swazFallback(lang,context){
  const set=SWAZ_FALLBACK[lang]||SWAZ_FALLBACK.fr;
  const arr=set[context]||set.welcome;
  return arr[Math.floor(Math.random()*arr.length)];
}

async function generateSwazMessage(lang,context,profile){
  // context: streak | capture | slump | welcome — messages locaux variés
  await new Promise(r=>setTimeout(r,200));
  return swazFallback(lang,context);
}

// ── SYMBOLE JOLINGO — la graine-jeton (monnaie + signature) ──
function JolingoCoin({size=24, gain=false}){
  const gid=`jc${Math.round(size)}`;
  return(
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{display:"inline-block",verticalAlign:"middle",animation:gain?`jcGain-${gid} 0.7s cubic-bezier(.34,1.56,.64,1)`:"none",transformOrigin:"center"}}>
      {gain&&<style>{`
        @keyframes jcGain-${gid}{0%{transform:scale(1) rotate(0)}35%{transform:scale(1.25) rotate(-8deg)}70%{transform:scale(0.95) rotate(5deg)}100%{transform:scale(1) rotate(0)}}
        @keyframes jcRing-${gid}{0%{opacity:0.6;transform:scale(1)}100%{opacity:0;transform:scale(1.6)}}
      `}</style>}
      {gain&&<circle cx="32" cy="32" r="28" fill="none" stroke="#6C63FF" strokeWidth="2" style={{animation:`jcRing-${gid} 0.7s ease-out`,transformOrigin:"center"}}/>}
      <circle cx="32" cy="32" r="27" fill="#6C63FF"/>
      <circle cx="32" cy="32" r="22" fill="none" stroke="white" strokeWidth="1.5" opacity="0.85"/>
      <path d="M32 16 C32 16 43 27 43 36 C43 42.6 38 48 32 48 C26 48 21 42.6 21 36 C21 27 32 16 32 16 Z" fill="white"/>
      <path d="M32 23 L32 44" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// ── LOGO GRAINE ───────────────────────────────────────────
function Logo({size=48, animated=true}){
  const id=`logo${size}`;
  return(
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{overflow:"visible"}}>
      <defs>
        <filter id={`lsh${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#6C63FF40"/>
        </filter>
        {animated&&<style>{`
          @keyframes lf${id}{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
          .lf${id}{animation:lf${id} 4s ease-in-out infinite}
        `}</style>}
      </defs>
      <g className={animated?`lf${id}`:""} filter={`url(#lsh${id})`}>
        {/* Jeton plein */}
        <circle cx="32" cy="32" r="29" fill="#6C63FF"/>
        {/* Cercle intérieur */}
        <circle cx="32" cy="32" r="23" fill="none" stroke="white" strokeWidth="1.6" opacity="0.85"/>
        {/* Graine symétrique nette */}
        <path d="M32 15 C32 15 44 26.5 44 36 C44 43 38.6 49 32 49 C25.4 49 20 43 20 36 C20 26.5 32 15 32 15 Z" fill="white"/>
        {/* Nervure centrale */}
        <path d="M32 23 L32 45" stroke="#6C63FF" strokeWidth="2.2" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

// ── SWAZ — Coach bienveillant ─────────────────────────────
function Swaz({size=80, animated=true, mood="happy"}){
  const id=`swaz${size}`;
  return(
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <radialGradient id={`body${id}`} cx="40%" cy="35%">
          <stop offset="0%" stopColor="#FFD93D"/>
          <stop offset="100%" stopColor="#F5C400"/>
        </radialGradient>
        {animated&&<style>{`
          @keyframes b${id}{0%,100%{transform:translateY(0) scale(1,1)}50%{transform:translateY(-5px) scale(1.02,0.98)}}
          @keyframes eL${id}{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-6deg)}}
          @keyframes eR${id}{0%,100%{transform:rotate(0deg)}50%{transform:rotate(6deg)}}
          .b${id}{animation:b${id} 2.8s ease-in-out infinite}
          .eL${id}{animation:eL${id} 3s ease-in-out infinite;transform-origin:42px 30px}
          .eR${id}{animation:eR${id} 3s ease-in-out infinite;transform-origin:78px 30px}
        `}</style>}
      </defs>
      <g className={animated?`b${id}`:""}>
        {/* Ears */}
        <g className={animated?`eL${id}`:""}>
          <ellipse cx="40" cy="28" rx="9" ry="18" fill="#F5C400" transform="rotate(-18 40 28)"/>
          <ellipse cx="40" cy="28" rx="4" ry="11" fill="#FF8FB1" transform="rotate(-18 40 28)"/>
        </g>
        <g className={animated?`eR${id}`:""}>
          <ellipse cx="80" cy="28" rx="9" ry="18" fill="#F5C400" transform="rotate(18 80 28)"/>
          <ellipse cx="80" cy="28" rx="4" ry="11" fill="#FF8FB1" transform="rotate(18 80 28)"/>
        </g>
        {/* Body */}
        <circle cx="60" cy="64" r="36" fill={`url(#body${id})`}/>
        {/* Belly */}
        <ellipse cx="60" cy="72" rx="22" ry="20" fill="#FFF4E0" opacity="0.6"/>
        {/* Cheeks */}
        <circle cx="42" cy="68" r="6" fill="#FF8FB1" opacity="0.5"/>
        <circle cx="78" cy="68" r="6" fill="#FF8FB1" opacity="0.5"/>
        {/* Eyes */}
        {mood==="happy"?(
          <>
            <circle cx="50" cy="60" r="5" fill="#1A1A2E"/>
            <circle cx="70" cy="60" r="5" fill="#1A1A2E"/>
            <circle cx="52" cy="58" r="1.8" fill="white"/>
            <circle cx="72" cy="58" r="1.8" fill="white"/>
          </>
        ):(
          <>
            <path d="M45 60 Q50 56 55 60" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <path d="M65 60 Q70 56 75 60" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          </>
        )}
        {/* Nose + smile */}
        <ellipse cx="60" cy="68" rx="2.5" ry="2" fill="#3524C7"/>
        <path d="M54 73 Q60 78 66 73" stroke="#3524C7" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </g>
    </svg>
  );
}

// ── SWAZ BUBBLE — bulle de message réutilisable ───────────
function SwazBubble({lang,context,profile,compact=false}){
  const [msg,setMsg]=useState(swazFallback(lang,context));
  useEffect(()=>{
    let alive=true;
    generateSwazMessage(lang,context,profile).then(m=>{if(alive)setMsg(m);});
    return()=>{alive=false;};
  },[context]);
  return(
    <div style={{display:"flex",alignItems:"center",gap:12,background:`linear-gradient(135deg,${C.night},#2D1B69)`,borderRadius:18,padding:compact?"12px 14px":"16px",marginBottom:16}}>
      <div style={{flexShrink:0}}><Swaz size={compact?48:60} animated/></div>
      <div style={{flex:1}}>
        <div style={{fontFamily:"Inter,sans-serif",fontSize:10,color:C.yellow,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:3}}>Swaz</div>
        <div style={{fontFamily:"Inter,sans-serif",fontSize:compact?13:14,color:"white",lineHeight:1.5}}>{msg}</div>
      </div>
    </div>
  );
}

// ── SWAZ CHAT — conversation libre avec garde-fous ────────
async function askSwaz(lang,question,profile,history){
  // Moteur local intelligent (sans serveur) — comprend l'intention via mots-clés
  // Petit délai pour un effet naturel de "réflexion"
  await new Promise(r=>setTimeout(r,400+Math.random()*400));
  return swazAnswer(question,lang,profile);
}

function SwazChat({lang,profile,onClose}){
  const greet=lang==="fr"?`Hey ${profile?.name||""} ! Je suis Swaz 🌟 Pose-moi tes questions sur Jolingo, ou demande-moi des idées de tâches !`:lang==="es"?`¡Hey ${profile?.name||""}! Soy Swaz 🌟 Pregúntame sobre Jolingo o pídeme ideas de tareas.`:`Hey ${profile?.name||""}! I'm Swaz 🌟 Ask me anything about Jolingo, or ask for task ideas!`;
  const [messages,setMessages]=useState([{role:"swaz",text:greet}]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);

  const quickPrompts=lang==="fr"?["Comment ça marche ?","Inspire-moi 3 tâches","C'est quoi un Joki ?"]:lang==="es"?["¿Cómo funciona?","Inspírame 3 tareas","¿Qué es un Joki?"]:["How does it work?","Inspire me 3 tasks","What's a Joki?"];

  async function send(text){
    const q=(text||input).trim();
    if(!q||loading) return;
    setInput("");
    setMessages(prev=>[...prev,{role:"user",text:q}]);
    setLoading(true);
    const history=messages.filter(m=>m.role!=="swaz"||messages.indexOf(m)!==0).map(m=>({role:m.role==="user"?"user":"assistant",content:m.text}));
    const reply=await askSwaz(lang,q,profile,history);
    setMessages(prev=>[...prev,{role:"swaz",text:reply}]);
    setLoading(false);
  }

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(15,14,26,0.6)",backdropFilter:"blur(4px)",zIndex:2000,display:"flex",flexDirection:"column",justifyContent:"flex-end"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:C.bg,borderRadius:"28px 28px 0 0",maxWidth:480,width:"100%",margin:"0 auto",height:"82vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {/* Header */}
        <div style={{display:"flex",alignItems:"center",gap:12,padding:"16px 20px",background:`linear-gradient(135deg,${C.night},#2D1B69)`}}>
          <Swaz size={44} animated/>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:800,fontSize:18,color:"white"}}>Swaz</div>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"rgba(255,255,255,0.5)"}}>{lang==="fr"?"Ton coach bienveillant":lang==="es"?"Tu coach amable":"Your caring coach"}</div>
          </div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:"50%",width:32,height:32,color:"white",fontSize:18,cursor:"pointer"}}>×</button>
        </div>
        {/* Messages */}
        <div style={{flex:1,overflowY:"auto",padding:"16px 20px",display:"flex",flexDirection:"column",gap:12}}>
          {messages.map((m,i)=>(
            <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
              <div style={{maxWidth:"80%",padding:"11px 15px",borderRadius:m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",background:m.role==="user"?C.violet:"white",color:m.role==="user"?"white":C.ink,fontFamily:"Inter,sans-serif",fontSize:14,lineHeight:1.5,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
                {m.text}
              </div>
            </div>
          ))}
          {loading&&(
            <div style={{display:"flex",justifyContent:"flex-start"}}>
              <div style={{padding:"11px 15px",borderRadius:"16px 16px 16px 4px",background:"white",fontFamily:"Inter,sans-serif",fontSize:14,color:C.muted}}>…</div>
            </div>
          )}
        </div>
        {/* Quick prompts */}
        {messages.length<=1&&(
          <div style={{display:"flex",gap:8,padding:"0 20px 12px",flexWrap:"wrap"}}>
            {quickPrompts.map((p,i)=>(
              <button key={i} onClick={()=>send(p)} style={{padding:"8px 14px",border:`1.5px solid ${C.border}`,borderRadius:20,background:"white",color:C.violet,fontFamily:"Inter,sans-serif",fontSize:12,fontWeight:600,cursor:"pointer"}}>{p}</button>
            ))}
          </div>
        )}
        {/* Input */}
        <div style={{display:"flex",gap:8,padding:"12px 20px 24px",background:C.bg,borderTop:`1px solid ${C.border}`}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
            placeholder={lang==="fr"?"Écris à Swaz…":lang==="es"?"Escribe a Swaz…":"Message Swaz…"}
            style={{flex:1,padding:"13px 16px",border:`2px solid ${C.border}`,borderRadius:14,fontFamily:"Inter,sans-serif",fontSize:14,outline:"none",background:"white"}}/>
          <button onClick={()=>send()} disabled={!input.trim()||loading} style={{padding:"0 18px",background:input.trim()&&!loading?C.violet:"#E8E5F0",color:input.trim()&&!loading?"white":C.muted,border:"none",borderRadius:14,fontSize:18,cursor:input.trim()&&!loading?"pointer":"not-allowed"}}>↑</button>
        </div>
      </div>
    </div>
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
    <defs>
      <linearGradient id="globe4" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#6C63FF"/><stop offset="100%" stopColor="#4C35E8"/>
      </linearGradient>
      <style>{`
        @keyframes flagFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @keyframes orbit{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .flag4{animation:flagFloat 2.5s ease-in-out infinite}
      `}</style>
    </defs>
    {/* Globe central */}
    <circle cx="100" cy="80" r="42" fill="url(#globe4)"/>
    {/* Continents stylisés */}
    <path d="M78 60 Q88 56 96 62 Q92 70 84 70 Q78 66 78 60Z" fill="rgba(255,255,255,0.25)"/>
    <path d="M108 72 Q120 70 124 80 Q118 90 110 86 Q104 78 108 72Z" fill="rgba(255,255,255,0.25)"/>
    <path d="M88 92 Q98 90 102 98 Q96 104 90 100 Q86 96 88 92Z" fill="rgba(255,255,255,0.25)"/>
    {/* Méridiens */}
    <ellipse cx="100" cy="80" rx="42" ry="42" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none"/>
    <ellipse cx="100" cy="80" rx="20" ry="42" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none"/>
    <line x1="58" y1="80" x2="142" y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
    {/* Drapeaux en orbite */}
    <g className="flag4">
      <text x="30" y="44" fontSize="20" textAnchor="middle">🇯🇵</text>
    </g>
    <g className="flag4" style={{animationDelay:"0.4s"}}>
      <text x="170" y="50" fontSize="20" textAnchor="middle">🇸🇳</text>
    </g>
    <g className="flag4" style={{animationDelay:"0.8s"}}>
      <text x="38" y="130" fontSize="20" textAnchor="middle">🇲🇽</text>
    </g>
    <g className="flag4" style={{animationDelay:"1.2s"}}>
      <text x="168" y="126" fontSize="20" textAnchor="middle">🇧🇷</text>
    </g>
    {/* Étoile brillante */}
    <text x="100" y="34" fontSize="16" textAnchor="middle">✨</text>
  </svg>,
];

function OnboardSlides({lang,onDone}){
  const t=T[lang];
  const [slide,setSlide]=useState(-1); // -1 = écran d'accueil Swaz
  const [anim,setAnim]=useState(true);
  function next(){
    if(slide>=t.onboard.length-1){onDone();return;}
    setAnim(false);setTimeout(()=>{setSlide(s=>s+1);setAnim(true);},180);
  }

  // Écran d'accueil de Swaz — première rencontre
  if(slide===-1){
    const hi={
      fr:{title:"Salut, moi c'est Swaz !",sub:"Je serai ton compagnon tout au long de l'aventure. Je suis là pour t'encourager, jamais pour te juger. 💛",cta:"Enchanté ! →",skip:"Passer"},
      en:{title:"Hi, I'm Swaz!",sub:"I'll be your companion throughout the journey. I'm here to cheer you on, never to judge. 💛",cta:"Nice to meet you! →",skip:"Skip"},
      es:{title:"¡Hola, soy Swaz!",sub:"Seré tu compañero durante toda la aventura. Estoy aquí para animarte, nunca para juzgarte. 💛",cta:"¡Encantado! →",skip:"Saltar"},
    };
    const h=hi[lang]||hi.fr;
    return(
      <div style={{position:"fixed",inset:0,background:`linear-gradient(160deg,#0D1B0F,${C.night},#2D1B69)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"56px 28px 48px",zIndex:800}}>
        <style>{`
          @keyframes swazPop{0%{opacity:0;transform:scale(0.5) translateY(20px)}60%{opacity:1;transform:scale(1.05) translateY(-5px)}100%{opacity:1;transform:scale(1) translateY(0)}}
          @keyframes fadeU{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&family=Inter:wght@400;600&display=swap');
        `}</style>
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20}}>
          <div style={{animation:"swazPop .8s cubic-bezier(.34,1.4,.64,1) both",filter:`drop-shadow(0 0 30px ${C.yellow}50)`}}>
            <Swaz size={160} animated/>
          </div>
          <h1 style={{fontFamily:"'Poppins',sans-serif",fontWeight:800,fontSize:30,lineHeight:1.1,color:"white",textAlign:"center",animation:"fadeU .6s ease .3s both"}}>{h.title}</h1>
          <p style={{fontFamily:"Inter,sans-serif",fontSize:16,lineHeight:1.6,color:"rgba(255,255,255,.65)",maxWidth:320,textAlign:"center",animation:"fadeU .6s ease .5s both"}}>{h.sub}</p>
        </div>
        <div style={{width:"100%",maxWidth:360,animation:"fadeU .6s ease .7s both"}}>
          <button onClick={()=>{setAnim(false);setTimeout(()=>{setSlide(0);setAnim(true);},180);}} style={{width:"100%",padding:"18px",border:"none",borderRadius:16,background:C.yellow,color:C.ink,fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:17,cursor:"pointer"}}>{h.cta}</button>
          <button onClick={onDone} style={{width:"100%",background:"none",border:"none",color:"rgba(255,255,255,.35)",fontFamily:"Inter,sans-serif",fontSize:13,cursor:"pointer",padding:"12px"}}>{h.skip}</button>
        </div>
      </div>
    );
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
            {lang==="fr"?`Super, ${country} ! 🌍`:lang==="es"?`¡Genial, ${country}! 🌍`:`Great, ${country}! 🌍`}
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

// ── SELECTION TÂCHES — création d'abord, puis Mes tâches, puis suggestions ──
function TaskSelection({lang,vibes,genre,onCommit,prefilled=[],isPrepTomorrow=false}){
  const t=T[lang];
  const ex=EXTRA_STRINGS[lang];
  const s_=load();
  const myLib=s_.myLibrary||[];
  // En mode "préparer demain", on ne montre pas les tâches non faites d'aujourd'hui (ça crée de la confusion)
  const carried=isPrepTomorrow?[]:(s_.carriedTasks||[]).filter(Boolean);

  // selected = array of {text, packId, isMine, isResistance, carried, fromAI}
  const [selected,setSelected]=useState(()=>prefilled.map(p=>({text:p.text,packId:p.packId||"custom",isMine:p.isMine||false,isResistance:p.isResistance||false,carried:p.carried||false,fromAI:p.fromAI||false})));
  const [input,setInput]=useState("");
  const [msg,setMsg]=useState(null);
  const [showExplore,setShowExplore]=useState(false);
  const [showPacks,setShowPacks]=useState(false);
  const [openPack,setOpenPack]=useState(null);
  const [openUniverse,setOpenUniverse]=useState(vibes[0]||null);
  const [randomTasks,setRandomTasks]=useState([]);
  const [showRandom,setShowRandom]=useState(false);
  const [intention,setIntention]=useState("");
  const [aiTasks,setAiTasks]=useState([]);
  const [aiLoading,setAiLoading]=useState(false);
  const [showAI,setShowAI]=useState(false);
  const [expandedCats,setExpandedCats]=useState({});

  const recentHistory=s_.history||{};
  const recentTexts=Object.values(recentHistory).slice(-7).flatMap(d=>d.taskTexts||[]);
  const allTasksPool=vibes.flatMap(v=>(t.tasks_by_universe[v]||[]).map(text=>({text,packId:v})));
  const taskCounts=s_.taskCounts||{};
  const INITIAL_SHOWN=8;

  const count=selected.length;
  const atLimit=count>=MAX_TOTAL_TASKS;
  const atCore=count>=CORE_TASKS; // au-delà : tâches bonus
  const canCommit=count>0;

  function isSelected(text){return selected.some(s=>s.text===text);}

  function flash(type,text){setMsg({type,text});setTimeout(()=>setMsg(null),2500);}
  function limitMsg(){return lang==="fr"?`Maximum ${MAX_TOTAL_TASKS} tâches par jour 🌱`:lang==="es"?`Máximo ${MAX_TOTAL_TASKS} tareas por día 🌱`:`Max ${MAX_TOTAL_TASKS} tasks per day 🌱`;}

  function addTask(obj){
    if(isSelected(obj.text)){setSelected(prev=>prev.filter(s=>s.text!==obj.text));return;}
    if(atLimit){flash("limit",limitMsg());return;}
    setSelected(prev=>[...prev,obj]);
  }

  function addFromInput(){
    const text=input.trim();
    if(!text) return;
    if(!filterTask(text)){flash("error",t.customBanned||"Hmm, essaie autre chose 🌱");setInput("");return;}
    if(isSelected(text)){setInput("");return;}
    if(atLimit){flash("limit",limitMsg());return;}
    // Mémoriser dans la bibliothèque
    const s=load();const lib=s.myLibrary||[];
    if(!lib.includes(text)) save({...s,myLibrary:[text,...lib].slice(0,80)});
    setSelected(prev=>[...prev,{text,packId:"custom",isMine:true,isResistance:false,carried:false,fromAI:false}]);
    setInput("");
  }

  function removeLibItem(text){
    const s=load();const lib=(s.myLibrary||[]).filter(x=>x!==text);
    save({...s,myLibrary:lib});
    setSelected(prev=>prev.filter(x=>x.text!==text));
    // force refresh by toggling a state
    setMsg({type:"info",text:lang==="fr"?"Retiré de tes tâches":lang==="es"?"Eliminado de tus tareas":"Removed from your tasks"});
    setTimeout(()=>setMsg(null),1500);
  }

  function generateRandom(){
    const pool=allTasksPool.filter(x=>!recentTexts.includes(x.text)&&!isSelected(x.text));
    const shuffled=[...pool].sort(()=>Math.random()-.5);
    const picks=[];const usedVibes=new Set();
    for(const item of shuffled){
      if(picks.length>=3) break;
      if(picks.length<2){picks.push(item);usedVibes.add(item.packId);}
      else if(!usedVibes.has(item.packId)){picks.push(item);usedVibes.add(item.packId);}
    }
    if(picks.length<3){for(const item of shuffled){if(picks.length>=3)break;if(!picks.find(p=>p.text===item.text))picks.push(item);}}
    setRandomTasks(picks.slice(0,3));
  }

  async function generateFromAI(){
    if(!intention.trim()) return;
    setAiLoading(true);setAiTasks([]);
    // Moteur local intelligent — analyse les mots-clés et pioche les bonnes tâches
    await new Promise(r=>setTimeout(r,500+Math.random()*400));
    const already=selected.map(s=>s.text);
    const ideas=smartTaskSuggestions(intention,lang,vibes,already);
    setAiTasks(ideas.filter(filterTask));
    setAiLoading(false);
  }

  function commit(){
    if(!selected.length) return;
    // Comptage popularité des tâches choisies
    const s=load();const counts={...(s.taskCounts||{})};
    selected.forEach(sel=>{counts[sel.text]=(counts[sel.text]||0)+1;});
    save({...s,taskCounts:counts});
    onCommit(selected);
  }

  const maxGain=selected.reduce((a,s)=>a+(s.carried?PTS_CARRIED:(s.isResistance?PTS_RESISTANCE:PTS_TASK)),0);

  return(
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",justifyContent:"center"}}>
      <div style={{width:"100%",maxWidth:420,padding:"48px 20px 150px"}}>

        {/* Titre */}
        <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:800,fontSize:26,color:C.ink,marginBottom:4}}>
          {lang==="fr"?"Choisis tes tâches du jour":lang==="es"?"Elige tus tareas de hoy":"Choose your tasks for today"}
        </div>
        <div style={{fontFamily:"Inter,sans-serif",fontSize:13,color:C.muted,marginBottom:18}}>
          {lang==="fr"?"Jusqu'à 3 tâches · Gratuit":lang==="es"?"Hasta 3 tareas · Gratis":"Up to 3 tasks · Free"}
        </div>

        {/* Compteur */}
        <div style={{display:"flex",gap:8,marginBottom:18}}>
          {[1,2,3].map(i=>(
            <div key={i} style={{flex:1,height:6,borderRadius:3,background:i<=count?C.violet:C.border,transition:"background .2s"}}/>
          ))}
        </div>

        {/* Message */}
        {msg&&(
          <div style={{background:msg.type==="limit"?"#FFF8E7":msg.type==="error"?"#FEE2E2":"#F0F0FF",borderRadius:12,padding:"10px 14px",marginBottom:14,fontFamily:"Inter,sans-serif",fontSize:13,fontWeight:600,color:msg.type==="limit"?"#D97706":msg.type==="error"?C.red:C.violet}}>
            {msg.text}
          </div>
        )}

        {/* ── 1. CRÉATION — le réflexe principal ── */}
        <div style={{background:"white",borderRadius:16,padding:"16px",marginBottom:16,boxShadow:"0 2px 10px rgba(0,0,0,0.04)"}}>
          <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:13,color:C.ink,marginBottom:10}}>
            {lang==="fr"?"✏️ Crée ta tâche":lang==="es"?"✏️ Crea tu tarea":"✏️ Create your task"}
          </div>
          <div style={{display:"flex",gap:8}}>
            <input type="text" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addFromInput()}
              placeholder={lang==="fr"?"Ex: 20 min de lecture…":lang==="es"?"Ej: 20 min de lectura…":"E.g: read for 20 min…"}
              style={{flex:1,padding:"13px 15px",border:`2px solid ${C.border}`,borderRadius:12,fontFamily:"Inter,sans-serif",fontSize:14,color:C.ink,outline:"none"}}/>
            <button onClick={addFromInput} disabled={atLimit||!input.trim()}
              style={{padding:"0 18px",background:(atLimit||!input.trim())?"#E8E5F0":C.violet,color:(atLimit||!input.trim())?C.muted:"white",border:"none",borderRadius:12,fontSize:20,fontWeight:700,cursor:(atLimit||!input.trim())?"not-allowed":"pointer"}}>+</button>
          </div>
        </div>

        {/* ── 2. TÂCHES SÉLECTIONNÉES ── */}
        {selected.length>0&&(
          <div style={{marginBottom:16}}>
            <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:12,color:C.muted,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>
              {lang==="fr"?"Ta journée":lang==="es"?"Tu día":"Your day"}
            </div>
            {selected.map((s,i)=>{
              const isBonus=i>=CORE_TASKS;
              const pts=isBonus?PTS_BONUS:(s.carried?PTS_CARRIED:(s.isResistance?PTS_RESISTANCE:PTS_TASK));
              return(
              <div key={i}>
                {i===CORE_TASKS&&(
                  <div style={{display:"flex",alignItems:"center",gap:8,margin:"12px 0 8px"}}>
                    <div style={{flex:1,height:1,background:C.border}}/>
                    <span style={{fontFamily:"Inter,sans-serif",fontSize:10,fontWeight:700,color:C.muted,letterSpacing:0.5,textTransform:"uppercase"}}>{lang==="fr"?"Bonus (optionnel)":lang==="es"?"Bonus (opcional)":"Bonus (optional)"}</span>
                    <div style={{flex:1,height:1,background:C.border}}/>
                  </div>
                )}
                <div style={{background:isBonus?"#FBFAFF":"white",borderRadius:13,padding:"13px 15px",marginBottom:8,display:"flex",alignItems:"center",gap:10,border:`2px solid ${isBonus?C.border:C.violet}`}}>
                  {s.fromAI&&<span style={{fontSize:13}}>✨</span>}
                  {s.carried&&<span style={{fontSize:13}}>🔄</span>}
                  {s.isResistance&&<span style={{fontSize:13}}>🚫</span>}
                  {isBonus&&<span style={{fontSize:12}}>⭐</span>}
                  <span style={{fontFamily:"Inter,sans-serif",fontSize:14,fontWeight:600,color:isBonus?C.muted:C.ink,flex:1}}>{s.text}</span>
                  <span style={{fontFamily:"Inter,sans-serif",fontSize:10,color:C.muted}}>{pts}J</span>
                  <button onClick={()=>setSelected(prev=>prev.filter((_,idx)=>idx!==i))} style={{background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:18}}>×</button>
                </div>
              </div>
            );})}
          </div>
        )}

        {/* ── 3. TÂCHES REPROPOSÉES (hier non faites) ── */}
        {carried.filter(text=>!isSelected(text)).length>0&&(
          <div style={{marginBottom:16}}>
            <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:12,color:C.muted,letterSpacing:1,textTransform:"uppercase",marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
              🔄 {lang==="fr"?"À retenter ?":lang==="es"?"¿Reintentar?":"Try again?"}
              <span style={{fontWeight:500,textTransform:"none",letterSpacing:0,fontSize:11}}>· {PTS_CARRIED} Jolingos</span>
            </div>
            {carried.filter(text=>!isSelected(text)).map((text,i)=>(
              <div key={i} onClick={()=>addTask({text,packId:"custom",isMine:myLib.includes(text),isResistance:false,carried:true,fromAI:false})}
                style={{background:"white",borderRadius:13,padding:"12px 15px",marginBottom:8,display:"flex",alignItems:"center",gap:10,border:`1.5px dashed ${C.border}`,cursor:atLimit?"not-allowed":"pointer",opacity:atLimit?0.5:1}}>
                <span style={{fontSize:13}}>🔄</span>
                <span style={{fontFamily:"Inter,sans-serif",fontSize:14,color:"#555",flex:1}}>{text}</span>
                <span style={{fontFamily:"Inter,sans-serif",fontSize:18,color:C.violet}}>+</span>
              </div>
            ))}
          </div>
        )}

        {/* ── 4. MES TÂCHES (bibliothèque perso) ── */}
        {myLib.filter(text=>!isSelected(text)&&!carried.includes(text)).length>0&&(
          <div style={{marginBottom:16}}>
            <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:12,color:C.muted,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>
              💛 {lang==="fr"?"Mes tâches":lang==="es"?"Mis tareas":"My tasks"}
            </div>
            {myLib.filter(text=>!isSelected(text)&&!carried.includes(text)).slice(0,8).map((text,i)=>(
              <div key={i} style={{background:"white",borderRadius:13,padding:"12px 15px",marginBottom:8,display:"flex",alignItems:"center",gap:10,border:`1.5px solid ${C.border}`}}>
                <div onClick={()=>addTask({text,packId:"custom",isMine:true,isResistance:false,carried:false,fromAI:false})} style={{display:"flex",alignItems:"center",gap:10,flex:1,cursor:atLimit?"not-allowed":"pointer",opacity:atLimit?0.5:1}}>
                  <span style={{fontFamily:"Inter,sans-serif",fontSize:14,color:"#555",flex:1}}>{text}</span>
                </div>
                <span onClick={()=>addTask({text,packId:"custom",isMine:true,isResistance:false,carried:false,fromAI:false})} style={{fontFamily:"Inter,sans-serif",fontSize:18,color:C.violet,cursor:"pointer"}}>+</span>
                <button onClick={()=>removeLibItem(text)} style={{background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:14}}>🗑️</button>
              </div>
            ))}
          </div>
        )}

        {/* ── 5. BESOIN D'INSPIRATION ? (suggestions secondaires) ── */}
        <div style={{marginTop:8}}>
          <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:12,color:C.muted,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>
            {lang==="fr"?"Besoin d'inspiration ?":lang==="es"?"¿Inspiración?":"Need inspiration?"}
          </div>

          {/* Packs du moment (saison + événement + archétypes) */}
          <button onClick={()=>{setShowPacks(!showPacks);setShowAI(false);setShowExplore(false);setShowRandom(false);}}
            style={{width:"100%",padding:"14px 16px",marginBottom:8,border:`1.5px solid ${showPacks?C.violet:C.border}`,borderRadius:12,background:showPacks?"#F0F0FF":"white",display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
            <span style={{fontSize:18}}>🎁</span>
            <span style={{fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:14,color:C.ink,flex:1,textAlign:"left"}}>{lang==="fr"?"Packs du moment":lang==="es"?"Packs del momento":"Featured packs"}</span>
            <span style={{color:C.muted}}>{showPacks?"▲":"▼"}</span>
          </button>
          {showPacks&&(()=>{
            const seasonId=getSeasonalPack();
            const eventId=getEventPack();
            const featured=[eventId,seasonId].filter(Boolean);
            // Libellés des familles
            const famLabels={
              featured:{fr:"✨ En vedette",en:"✨ Featured",es:"✨ Destacados"},
              core:{fr:"🌍 Saisons & profils",en:"🌍 Seasons & profiles",es:"🌍 Estaciones y perfiles"},
              wellbeing:{fr:"🧘 Bien-être",en:"🧘 Wellbeing",es:"🧘 Bienestar"},
              productivity:{fr:"🎯 Productivité",en:"🎯 Productivity",es:"🎯 Productividad"},
              festive:{fr:"🎉 Fêtes",en:"🎉 Celebrations",es:"🎉 Fiestas"},
              relations:{fr:"💞 Relations",en:"💞 Relationships",es:"💞 Relaciones"},
            };
            const famOrder=["featured","wellbeing","productivity","festive","relations","core"];
            // Regrouper
            const groups={featured:[]};
            THEMED_PACKS.forEach(p=>{
              if(featured.includes(p.id)){groups.featured.push(p);return;}
              const f=p.family||"core";
              (groups[f]=groups[f]||[]).push(p);
            });
            const renderPack=(pack)=>{
              const open=openPack===pack.id;
              return(
                <div key={pack.id} style={{marginBottom:8}}>
                  <button onClick={()=>setOpenPack(open?null:pack.id)}
                    style={{width:"100%",padding:"12px 14px",border:`1.5px solid ${open?C.violet:C.border}`,borderRadius:12,background:open?"#F0F0FF":"white",display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
                    <span style={{fontSize:20}}>{pack.icon}</span>
                    <div style={{flex:1,textAlign:"left"}}>
                      <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:14,color:C.ink}}>{pack.title[lang]}</div>
                      <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:C.muted}}>{pack.desc[lang]}</div>
                    </div>
                    <span style={{color:C.muted}}>{open?"▲":"▼"}</span>
                  </button>
                  {open&&(
                    <div style={{padding:"8px 4px 0"}}>
                      {pack.tasks[lang].map((text,i)=>(
                        <div key={i} onClick={()=>addTask({text,packId:pack.id,isMine:false,isResistance:false,carried:false,fromAI:false})}
                          style={{background:isSelected(text)?"#F0F0FF":C.bg,borderRadius:11,padding:"11px 13px",marginTop:6,display:"flex",alignItems:"center",gap:10,cursor:atLimit&&!isSelected(text)?"not-allowed":"pointer",opacity:atLimit&&!isSelected(text)?0.4:1,border:`1.5px solid ${isSelected(text)?C.violet:"transparent"}`}}>
                          <span style={{fontFamily:"Inter,sans-serif",fontSize:14,color:C.ink,flex:1}}>{text}</span>
                          <span style={{fontSize:16,color:C.violet}}>{isSelected(text)?"✓":"+"}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            };
            return(
              <div style={{marginBottom:8}}>
                {famOrder.map(fam=>{
                  const list=groups[fam];
                  if(!list||list.length===0) return null;
                  return(
                    <div key={fam} style={{marginBottom:14}}>
                      <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:11,color:C.violet,marginBottom:8,marginTop:4}}>{famLabels[fam][lang]}</div>
                      {list.map(renderPack)}
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {/* IA Swaz */}
          <button onClick={()=>{setShowAI(!showAI);setShowExplore(false);setShowRandom(false);}}
            style={{width:"100%",padding:"14px 16px",marginBottom:8,border:`1.5px solid ${showAI?C.violet:C.border}`,borderRadius:12,background:showAI?"#F0F0FF":"white",display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
            <span style={{fontSize:18}}>✨</span>
            <span style={{fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:14,color:C.ink,flex:1,textAlign:"left"}}>{lang==="fr"?"Demande à Swaz":lang==="es"?"Pídele a Swaz":"Ask Swaz"}</span>
            <span style={{color:C.muted}}>{showAI?"▲":"▼"}</span>
          </button>
          {showAI&&(
            <div style={{background:"white",borderRadius:12,padding:14,marginBottom:8,border:`1px solid ${C.border}`}}>
              <textarea value={intention} onChange={e=>setIntention(e.target.value)} rows={2}
                placeholder={lang==="fr"?"Décris ta journée ou ton humeur…":lang==="es"?"Describe tu día…":"Describe your day…"}
                style={{width:"100%",border:"none",outline:"none",fontFamily:"Inter,sans-serif",fontSize:14,resize:"none",lineHeight:1.5}}/>
              <button onClick={generateFromAI} disabled={!intention.trim()||aiLoading}
                style={{width:"100%",marginTop:8,padding:"10px",border:"none",borderRadius:10,background:intention.trim()&&!aiLoading?C.violet:"#E8E5F0",color:intention.trim()&&!aiLoading?"white":C.muted,fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:14,cursor:intention.trim()&&!aiLoading?"pointer":"not-allowed"}}>
                {aiLoading?(lang==="fr"?"Swaz réfléchit…":"Swaz thinking…"):(lang==="fr"?"Génère 3 idées ✨":lang==="es"?"Genera 3 ideas ✨":"Generate 3 ideas ✨")}
              </button>
              {aiTasks.map((text,i)=>(
                <div key={i} onClick={()=>addTask({text,packId:"custom",isMine:false,isResistance:false,carried:false,fromAI:true})}
                  style={{background:isSelected(text)?"#F0F0FF":C.bg,borderRadius:11,padding:"11px 13px",marginTop:8,display:"flex",alignItems:"center",gap:10,cursor:"pointer",border:`1.5px solid ${isSelected(text)?C.violet:"transparent"}`}}>
                  <span style={{fontSize:12}}>✨</span>
                  <span style={{fontFamily:"Inter,sans-serif",fontSize:14,color:C.ink,flex:1}}>{text}</span>
                  <span style={{fontSize:16,color:C.violet}}>{isSelected(text)?"✓":"+"}</span>
                </div>
              ))}
            </div>
          )}

          {/* Explore par univers */}
          <button onClick={()=>{setShowExplore(!showExplore);setShowAI(false);setShowRandom(false);}}
            style={{width:"100%",padding:"14px 16px",marginBottom:8,border:`1.5px solid ${showExplore?C.violet:C.border}`,borderRadius:12,background:showExplore?"#F0F0FF":"white",display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
            <span style={{fontSize:18}}>☀️</span>
            <span style={{fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:14,color:C.ink,flex:1,textAlign:"left"}}>{lang==="fr"?"Explorer par thème":lang==="es"?"Explorar por tema":"Explore by theme"}</span>
            <span style={{color:C.muted}}>{showExplore?"▲":"▼"}</span>
          </button>
          {showExplore&&vibes.map(v=>{
            const isOpen=openUniverse===v;
            const allCatTasks=t.tasks_by_universe[v]||[];
            // Tri par popularité (les plus choisies en premier), ordre stable sinon
            const sortedTasks=[...allCatTasks].sort((a,b)=>(taskCounts[b]||0)-(taskCounts[a]||0));
            const isExpanded=expandedCats[v];
            const tasks=isExpanded?sortedTasks:sortedTasks.slice(0,INITIAL_SHOWN);
            const hasMore=sortedTasks.length>INITIAL_SHOWN;
            return(
              <div key={v} style={{marginBottom:8}}>
                <div onClick={()=>setOpenUniverse(isOpen?null:v)} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 15px",background:"white",borderRadius:isOpen?"12px 12px 0 0":12,cursor:"pointer",border:`1px solid ${C.border}`}}>
                  <span style={{fontSize:18}}>{t.universes[v]?.emoji}</span>
                  <span style={{fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:14,color:C.ink,flex:1}}>{t.universes[v]?.name}</span>
                  <span style={{color:C.muted,fontSize:14}}>{isOpen?"▲":"▼"}</span>
                </div>
                {isOpen&&(
                  <div style={{background:"white",borderRadius:"0 0 12px 12px",padding:"6px 10px 10px",border:`1px solid ${C.border}`,borderTop:"none"}}>
                    {tasks.map(text=>(
                      <div key={text} onClick={()=>addTask({text,packId:v,isMine:false,isResistance:false,carried:false,fromAI:false})}
                        style={{padding:"10px 8px",display:"flex",alignItems:"center",gap:10,cursor:atLimit&&!isSelected(text)?"not-allowed":"pointer",opacity:atLimit&&!isSelected(text)?0.4:1,borderRadius:8}}>
                        <div style={{width:20,height:20,borderRadius:6,flexShrink:0,background:isSelected(text)?C.violet:C.border,display:"flex",alignItems:"center",justifyContent:"center"}}>
                          {isSelected(text)&&<span style={{color:"white",fontSize:11,fontWeight:700}}>✓</span>}
                        </div>
                        <span style={{fontFamily:"Inter,sans-serif",fontSize:14,color:"#555",flex:1}}>{text}</span>
                      </div>
                    ))}
                    {hasMore&&(
                      <button onClick={()=>setExpandedCats(prev=>({...prev,[v]:!prev[v]}))}
                        style={{width:"100%",padding:"10px",marginTop:4,border:"none",borderRadius:8,background:C.bg,color:C.violet,fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:13,cursor:"pointer"}}>
                        {isExpanded?(lang==="fr"?"Voir moins ▲":lang==="es"?"Ver menos ▲":"Show less ▲"):(lang==="fr"?`Voir plus (${sortedTasks.length-INITIAL_SHOWN}) ▼`:lang==="es"?`Ver más (${sortedTasks.length-INITIAL_SHOWN}) ▼`:`Show more (${sortedTasks.length-INITIAL_SHOWN}) ▼`)}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Hasard */}
          <button onClick={()=>{const n=!showRandom;setShowRandom(n);setShowAI(false);setShowExplore(false);if(n&&randomTasks.length===0)generateRandom();}}
            style={{width:"100%",padding:"14px 16px",marginBottom:8,border:`1.5px solid ${showRandom?C.violet:C.border}`,borderRadius:12,background:showRandom?"#F0F0FF":"white",display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
            <span style={{fontSize:18}}>🎲</span>
            <span style={{fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:14,color:C.ink,flex:1,textAlign:"left"}}>{lang==="fr"?"Surprends-moi":lang==="es"?"Sorpréndeme":"Surprise me"}</span>
            <span style={{color:C.muted}}>{showRandom?"▲":"▼"}</span>
          </button>
          {showRandom&&(
            <div style={{background:"white",borderRadius:12,padding:14,marginBottom:8,border:`1px solid ${C.border}`}}>
              {randomTasks.map((task,i)=>(
                <div key={i} onClick={()=>addTask({text:task.text,packId:task.packId,isMine:false,isResistance:false,carried:false,fromAI:false})}
                  style={{background:isSelected(task.text)?"#F0F0FF":C.bg,borderRadius:11,padding:"11px 13px",marginBottom:8,display:"flex",alignItems:"center",gap:10,cursor:"pointer",border:`1.5px solid ${isSelected(task.text)?C.violet:"transparent"}`}}>
                  <span style={{fontSize:14}}>{t.universes[task.packId]?.emoji||"🎲"}</span>
                  <span style={{fontFamily:"Inter,sans-serif",fontSize:14,color:C.ink,flex:1}}>{task.text}</span>
                  <span style={{fontSize:16,color:C.violet}}>{isSelected(task.text)?"✓":"+"}</span>
                </div>
              ))}
              <button onClick={generateRandom} style={{width:"100%",padding:"10px",border:`1.5px dashed ${C.border}`,borderRadius:10,background:"transparent",color:C.muted,fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:13,cursor:"pointer"}}>
                🔀 {lang==="fr"?"Autres idées":lang==="es"?"Otras ideas":"Other ideas"}
              </button>
            </div>
          )}
        </div>

        {/* Bouton commit — fixe en bas */}
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:C.bg,padding:"14px 20px 28px",borderTop:`1px solid ${C.border}`}}>
          <div style={{maxWidth:420,margin:"0 auto"}}>
            {canCommit&&(
              <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:C.muted,textAlign:"center",marginBottom:8}}>
                {lang==="fr"?`Tu peux gagner jusqu'à ${maxGain} Jolingos ✨`:lang==="es"?`Puedes ganar hasta ${maxGain} Jolingos ✨`:`You can earn up to ${maxGain} Jolingos ✨`}
              </div>
            )}
            <button onClick={commit} disabled={!canCommit}
              style={{width:"100%",padding:"17px",border:"none",borderRadius:14,background:canCommit?C.violet:"#E8E5F0",color:canCommit?"white":C.muted,fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:16,cursor:canCommit?"pointer":"not-allowed",boxShadow:canCommit?`0 8px 24px ${C.violet}35`:"none"}}>
              {canCommit
                ?(lang==="fr"?`Je m'engage sur ${count} tâche${count>1?"s":""}`:lang==="es"?`Me comprometo con ${count} tarea${count>1?"s":""}`:(`I commit to ${count} task${count>1?"s":""}`))
                :(lang==="fr"?"Ajoute au moins une tâche":lang==="es"?"Añade al menos una tarea":"Add at least one task")}
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
    const t1=setTimeout(()=>setPhase(1),600);
    const t2=setTimeout(()=>setPhase(2),1600);
    return()=>{clearTimeout(t1);clearTimeout(t2);};
  },[]);
  const bio=energy.bio?.[lang]||energy.description?.[lang]||"";
  const insp=energy.inspiration?.[lang]||"";
  const contineu=lang==="fr"?"Continuer mon voyage":lang==="es"?"Continuar mi viaje":"Continue my journey";
  return(
    <div style={{position:"fixed",inset:0,background:`linear-gradient(145deg,${C.night},#2D1B69)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:600,padding:"32px 24px",overflowY:"auto"}}>
      <style>{`
        @keyframes captureIn{0%{transform:scale(0) rotate(-20deg);opacity:0}60%{transform:scale(1.2)}100%{transform:scale(1);opacity:1}}
        @keyframes firework{0%{transform:scale(0);opacity:1}100%{transform:scale(3);opacity:0}}
        @keyframes fadeUp2{0%{opacity:0;transform:translateY(12px)}100%{opacity:1;transform:translateY(0)}}
        .capture-mascot{animation:captureIn .6s cubic-bezier(.34,1.56,.64,1) both;}
        .fw{animation:firework .8s ease-out both;}
        .cap-fade{animation:fadeUp2 .5s ease both;}
      `}</style>

      {phase>=1&&[...Array(8)].map((_,i)=>(
        <div key={i} className="fw" style={{
          position:"absolute",
          width:12,height:12,borderRadius:"50%",
          background:["#FFD93D","#FF5722","#22C55E","#4C35E8","#FF9EBB","#BAE6FD","#F97316","#A78BFA"][i],
          top:`${20+Math.random()*60}%`,left:`${10+Math.random()*80}%`,
          animationDelay:`${i*0.1}s`,
        }}/>
      ))}

      <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:C.yellow,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>{ex.capture}</div>
      <div className="capture-mascot" style={{marginBottom:8}}>
        <MascotteCharacter energy={energy} genre={genre} size={150} animated/>
      </div>

      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:38,color:"white",textAlign:"center",letterSpacing:1}}>
        {name}
      </div>
      <div style={{fontFamily:"Inter,sans-serif",fontSize:13,color:C.yellow,fontWeight:600,textAlign:"center",marginBottom:18}}>
        {energy.energy[lang]} · {energy.countryName[lang]}
      </div>

      {phase>=2&&(
        <div className="cap-fade" style={{background:"rgba(255,255,255,.08)",borderRadius:16,padding:"16px 18px",maxWidth:320,marginBottom:20}}>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:13.5,color:"rgba(255,255,255,.85)",lineHeight:1.7}}>{bio}</div>
          {insp&&<div style={{fontFamily:"Inter,sans-serif",fontSize:13,color:C.yellow,fontStyle:"italic",lineHeight:1.6,marginTop:12,paddingTop:12,borderTop:"1px solid rgba(255,255,255,.12)"}}>{insp}</div>}
        </div>
      )}

      {phase>=2&&(
        <button className="cap-fade" onClick={onDone} style={{width:"100%",maxWidth:320,padding:"15px",border:"none",borderRadius:14,background:C.yellow,color:C.ink,fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:15,cursor:"pointer"}}>
          {contineu}
        </button>
      )}
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

// ── PALIER — célébration marquante ────────────────────────
function MilestoneModal({milestone,lang,onDone}){
  const label=milestone[lang]||milestone.fr;
  const sub={fr:"Palier débloqué !",en:"Milestone unlocked!",es:"¡Logro desbloqueado!"}[lang]||"Palier débloqué !";
  const btn={fr:"Continuer",en:"Continue",es:"Continuar"}[lang]||"Continuer";
  useEffect(()=>{if(navigator.vibrate)navigator.vibrate([20,40,20]);},[]);
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(26,26,46,.78)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:600,backdropFilter:"blur(5px)",padding:24}}>
      <style>{`
        @keyframes mileBurst{0%{transform:scale(0) rotate(-12deg);opacity:0}55%{transform:scale(1.12)}100%{transform:scale(1);opacity:1}}
        @keyframes mileRay{0%,100%{transform:scale(1);opacity:.35}50%{transform:scale(1.12);opacity:.6}}
        @keyframes mileConf{0%{opacity:1;transform:translateY(0) rotate(0)}100%{opacity:0;transform:translateY(150px) rotate(360deg)}}
      `}</style>
      {Array.from({length:18}).map((_,k)=>(
        <div key={k} style={{position:"absolute",top:"24%",left:`${12+(k*4.4)%76}%`,width:8,height:8,borderRadius:k%2?"50%":"2px",background:[C.yellow,C.violet,C.green||"#4ECB71","#FF8FB1"][k%4],animation:`mileConf ${1+(k%5)*.3}s ease-in ${(k%6)*.1}s infinite`}}/>
      ))}
      <div style={{position:"relative",background:"white",borderRadius:30,padding:"40px 32px",textAlign:"center",animation:"mileBurst .55s cubic-bezier(.34,1.56,.64,1) both",maxWidth:320}}>
        <div style={{position:"absolute",inset:0,borderRadius:30,background:`radial-gradient(circle at 50% 35%, ${C.violet}18, transparent 70%)`,animation:"mileRay 2.5s ease-in-out infinite"}}/>
        <div style={{position:"relative"}}>
          <div style={{fontSize:64,marginBottom:8}}>{milestone.icon}</div>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:12,fontWeight:700,color:C.violet,letterSpacing:1.5,textTransform:"uppercase"}}>{sub}</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:C.ink,marginTop:8,lineHeight:1.1}}>{label}</div>
          <button onClick={onDone} style={{marginTop:24,width:"100%",padding:"14px",border:"none",borderRadius:14,background:C.violet,color:"white",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:15,cursor:"pointer"}}>{btn}</button>
        </div>
      </div>
    </div>
  );
}

// ── FICHE JOKI — détail d'un Joki capturé ─────────────────
// Détecte si un Joki est "clair" (besoin d'un fond sombre pour ressortir)
function isLightJoki(color){
  const c=(color||"").replace("#","");
  if(c.length<6) return false;
  const r=parseInt(c.slice(0,2),16),g=parseInt(c.slice(2,4),16),b=parseInt(c.slice(4,6),16);
  // luminance perçue
  const lum=(0.299*r+0.587*g+0.114*b)/255;
  return lum>0.75;
}
function JokiCard({energy,genre,lang,onClose}){
  const name=energy.names[genre]||energy.names.n;
  const bio=energy.bio?.[lang]||energy.description?.[lang]||"";
  const insp=energy.inspiration?.[lang]||"";
  const dark=isLightJoki(energy.color);
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(26,26,46,.7)",backdropFilter:"blur(5px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:600,padding:24}}>
      <style>{`@keyframes jkCardIn{0%{transform:scale(.85);opacity:0}100%{transform:scale(1);opacity:1}}`}</style>
      <div onClick={e=>e.stopPropagation()} style={{background:"white",borderRadius:24,padding:"24px 22px",maxWidth:340,width:"100%",animation:"jkCardIn .35s cubic-bezier(.34,1.56,.64,1) both",maxHeight:"88vh",overflowY:"auto"}}>
        {/* Joki avec fond adaptatif */}
        <div style={{background:dark?`linear-gradient(160deg,${C.night},#2D1B69)`:`linear-gradient(160deg,${energy.glow||"#F7F6FB"},#fff)`,borderRadius:20,padding:"20px",display:"flex",justifyContent:"center",marginBottom:18}}>
          <MascotteCharacter energy={energy} genre={genre} size={150} animated/>
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:34,color:C.ink,letterSpacing:.5}}>{name}</div>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:13,color:C.violet,fontWeight:600}}>{energy.energy[lang]}</div>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:C.muted,marginTop:1,marginBottom:16}}>{energy.country} {energy.countryName[lang]}</div>
        </div>
        <div style={{fontFamily:"Inter,sans-serif",fontSize:14,color:C.ink,lineHeight:1.7}}>{bio}</div>
        {insp&&(
          <div style={{background:C.bg,borderRadius:12,padding:"12px 14px",marginTop:14}}>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:13,color:C.violetD,fontStyle:"italic",lineHeight:1.6}}>{insp}</div>
          </div>
        )}
        <button onClick={onClose} style={{width:"100%",marginTop:18,padding:"13px",border:"none",borderRadius:13,background:C.violet,color:"white",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:14,cursor:"pointer"}}>{lang==="fr"?"Fermer":lang==="es"?"Cerrar":"Close"}</button>
      </div>
    </div>
  );
}

// ── RÉCAP HEBDOMADAIRE ────────────────────────────────────
function WeekRecap({history,lang}){
  const w=weekStats(history||{});
  const tx={
    fr:{title:"Ta semaine",tasks:"tâches",perfect:"parfaits",active:"jours actifs",empty:"Ta semaine commence ici 🌱"},
    en:{title:"Your week",tasks:"tasks",perfect:"perfect",active:"active days",empty:"Your week starts here 🌱"},
    es:{title:"Tu semana",tasks:"tareas",perfect:"perfectos",active:"días activos",empty:"Tu semana empieza aquí 🌱"},
  }[lang]||{};
  const maxDone=Math.max(1,...w.days.map(d=>d.done));
  return(
    <div style={{background:"white",borderRadius:18,padding:"16px 18px",marginBottom:16,boxShadow:`0 4px 16px ${C.violet}0D`}}>
      <div style={{display:"flex",alignItems:"center",marginBottom:14}}>
        <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:11,color:C.muted,letterSpacing:1,textTransform:"uppercase",flex:1}}>📅 {tx.title}</div>
        {w.tasks>0&&<div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:C.violet,fontWeight:700,display:"flex",alignItems:"center",gap:3}}>{w.pts}<JolingoCoin size={13}/></div>}
      </div>
      {/* Mini graphe en barres */}
      <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:6,height:54,marginBottom:10}}>
        {w.days.map((d,i)=>{
          const h=d.done>0?Math.max(18,(d.done/maxDone)*48):4;
          const isToday=i===w.days.length-1;
          return(
            <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
              <div style={{width:"100%",maxWidth:26,height:h,borderRadius:6,background:d.done>=3?"#4C35E8":d.done===2?"#6C63FF":d.done===1?"#A99BF5":C.border,transition:"height .3s,background .3s"}}/>
              <span style={{fontFamily:"Inter,sans-serif",fontSize:9,color:isToday?C.violet:C.muted,fontWeight:isToday?700:400}}>{d.label}</span>
            </div>
          );
        })}
      </div>
      {w.tasks>0&&(
        <div style={{display:"flex",justifyContent:"center",gap:12,marginBottom:10,flexWrap:"wrap"}}>
          {[["#A99BF5","1"],["#6C63FF","2"],["#4C35E8","3"]].map(([col,n],i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:4}}>
              <div style={{width:9,height:9,borderRadius:3,background:col}}/>
              <span style={{fontFamily:"Inter,sans-serif",fontSize:10,color:C.muted}}>{n}</span>
            </div>
          ))}
        </div>
      )}
      {w.tasks>0?(
        <div style={{display:"flex",justifyContent:"space-around",borderTop:`1px solid ${C.border}`,paddingTop:10}}>
          <div style={{textAlign:"center"}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:C.ink}}>{w.tasks}</div><div style={{fontFamily:"Inter,sans-serif",fontSize:10,color:C.muted}}>{tx.tasks}</div></div>
          <div style={{textAlign:"center"}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:C.ink}}>{w.perfect}</div><div style={{fontFamily:"Inter,sans-serif",fontSize:10,color:C.muted}}>{tx.perfect}</div></div>
          <div style={{textAlign:"center"}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:C.ink}}>{w.activeDays}</div><div style={{fontFamily:"Inter,sans-serif",fontSize:10,color:C.muted}}>{tx.active}</div></div>
        </div>
      ):(
        <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:C.muted,textAlign:"center",padding:"4px 0"}}>{tx.empty}</div>
      )}
    </div>
  );
}

// ── RÉGLAGES ──────────────────────────────────────────────
function SettingsModal({lang,profile,onClose,onSaveProfile,onReset}){
  const [name,setName]=useState(profile?.name||"");
  const [confirmReset,setConfirmReset]=useState(false);
  const [saved,setSaved]=useState(false);

  const txt={
    fr:{title:"Réglages",name:"Ton prénom",save:"Enregistrer",saved:"Enregistré ✓",reset:"Recommencer à zéro",resetDesc:"Efface toute ta progression et repart du début.",confirm:"Tu es sûr ? Tout sera effacé.",confirmBtn:"Oui, tout effacer",cancel:"Annuler"},
    en:{title:"Settings",name:"Your name",save:"Save",saved:"Saved ✓",reset:"Start over",resetDesc:"Erases all your progress and starts fresh.",confirm:"Are you sure? Everything will be erased.",confirmBtn:"Yes, erase all",cancel:"Cancel"},
    es:{title:"Ajustes",name:"Tu nombre",save:"Guardar",saved:"Guardado ✓",reset:"Empezar de nuevo",resetDesc:"Borra todo tu progreso y empieza de cero.",confirm:"¿Seguro? Todo se borrará.",confirmBtn:"Sí, borrar todo",cancel:"Cancelar"},
  };
  const tx=txt[lang]||txt.fr;

  function saveName(){
    const n=name.trim();
    if(!n) return;
    onSaveProfile({...profile,name:n});
    setSaved(true);setTimeout(()=>setSaved(false),1500);
  }

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(15,14,26,0.6)",backdropFilter:"blur(4px)",zIndex:2000,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:C.bg,borderRadius:"28px 28px 0 0",maxWidth:480,width:"100%",padding:"24px 20px 40px",maxHeight:"80vh",overflowY:"auto"}}>
        <div style={{display:"flex",alignItems:"center",marginBottom:24}}>
          <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:800,fontSize:22,color:C.ink,flex:1}}>{tx.title}</div>
          <button onClick={onClose} style={{background:"rgba(0,0,0,0.05)",border:"none",borderRadius:"50%",width:32,height:32,color:C.muted,fontSize:18,cursor:"pointer"}}>×</button>
        </div>

        {/* Prénom */}
        <div style={{background:"white",borderRadius:16,padding:"16px",marginBottom:16}}>
          <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:13,color:C.ink,marginBottom:10}}>{tx.name}</div>
          <div style={{display:"flex",gap:8}}>
            <input value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&saveName()}
              style={{flex:1,padding:"13px 15px",border:`2px solid ${C.border}`,borderRadius:12,fontFamily:"Inter,sans-serif",fontSize:14,color:C.ink,outline:"none"}}/>
            <button onClick={saveName} disabled={!name.trim()||saved}
              style={{padding:"0 18px",background:saved?C.green:(name.trim()?C.violet:"#E8E5F0"),color:name.trim()||saved?"white":C.muted,border:"none",borderRadius:12,fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:13,cursor:name.trim()&&!saved?"pointer":"default",whiteSpace:"nowrap"}}>
              {saved?tx.saved:tx.save}
            </button>
          </div>
        </div>

        {/* Recommencer à zéro */}
        <div style={{background:"white",borderRadius:16,padding:"16px"}}>
          <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:13,color:C.red,marginBottom:4}}>{tx.reset}</div>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:C.muted,marginBottom:12,lineHeight:1.5}}>{tx.resetDesc}</div>
          {!confirmReset?(
            <button onClick={()=>setConfirmReset(true)}
              style={{width:"100%",padding:"13px",border:`2px solid ${C.red}`,borderRadius:12,background:"transparent",color:C.red,fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:14,cursor:"pointer"}}>
              {tx.reset}
            </button>
          ):(
            <>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:13,fontWeight:600,color:C.red,marginBottom:10,textAlign:"center"}}>{tx.confirm}</div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setConfirmReset(false)}
                  style={{flex:1,padding:"13px",border:`2px solid ${C.border}`,borderRadius:12,background:"white",color:C.muted,fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:14,cursor:"pointer"}}>{tx.cancel}</button>
                <button onClick={onReset}
                  style={{flex:1,padding:"13px",border:"none",borderRadius:12,background:C.red,color:"white",fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:14,cursor:"pointer"}}>{tx.confirmBtn}</button>
              </div>
            </>
          )}
        </div>
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
  const [milestone,setMilestone]=useState(null);
  const [selectedJoki,setSelectedJoki]=useState(null);
  const [newBadge,setNewBadge]=useState(null);
  const [selectedMonth,setSelectedMonth]=useState(monthKey());
  const [toast,setToast]=useState(null);
  const [tomorrowTasks,setTomorrowTasks]=useState([]);
  const [showPrepTomorrow,setShowPrepTomorrow]=useState(false);
  const [swazOpen,setSwazOpen]=useState(false);
  const [showSettings,setShowSettings]=useState(false);

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
    // Sécurité : si les tâches "de demain" ne sont pas préparées pour LE BON jour, on les ignore
    if(s.tomorrowTasks?.length>0&&s.tomorrowPreparedFor!==tmk&&s.tomorrowPreparedFor!==tk){
      setTomorrowTasks([]);
      save({...s,tomorrowTasks:[],tomorrowPreparedFor:null});
    }
    // Nouveau jour — charge les tâches préparées la veille
    if(s.activeKey!==tk){
      if(s.tomorrowTasks?.length>0&&s.tomorrowPreparedFor===tk){
        // Ces tâches comptent pour la série, comme une sélection du jour
        const selDays2={...(s.selectedDays||{})};
        const alreadyToday=!!selDays2[tk];
        selDays2[tk]=true;
        let newStreak=s.streak||0;
        if(!alreadyToday){
          const yy=jolingoDate();yy.setDate(yy.getDate()-1);
          const yk2=`${yy.getFullYear()}-${String(yy.getMonth()+1).padStart(2,"0")}-${String(yy.getDate()).padStart(2,"0")}`;
          newStreak=selDays2[yk2]?newStreak+1:1;
          setStreak(newStreak);
        }
        setSelected(s.tomorrowTasks);
        save({...s,activeKey:tk,selected:s.tomorrowTasks,checkin:{},eveningDone:false,tomorrowTasks:[],tomorrowPreparedFor:null,selectedDays:selDays2,streak:newStreak});
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
    // Streak : se maintient tant qu'on SÉLECTIONNE des tâches chaque jour (même non faites)
    // On relit l'état frais (les blocs ci-dessus ont pu mettre à jour selectedDays/streak)
    const sf=load();
    const y=jolingoDate();y.setDate(y.getDate()-1);
    const yk=`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}-${String(y.getDate()).padStart(2,"0")}`;
    const selDays=sf.selectedDays||{};
    // Si la série est active mais qu'on n'a ni sélectionné hier ni aujourd'hui → série cassée
    if((sf.streak||0)>0&&!selDays[yk]&&!selDays[tk]){
      setStreak(0);save({...sf,streak:0});
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
    if(val===true&&navigator.vibrate) navigator.vibrate(15);
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
      if(checkin[i]===true){
        const isBonus=i>=CORE_TASKS;
        pts+=isBonus?PTS_BONUS:(task.carried?PTS_CARRIED:(task.isResistance?PTS_RESISTANCE:PTS_TASK));
      }
    });
    if(isPerfect) pts+=PTS_PERFECT;
    // La série est gérée à la sélection (matin). Le soir n'y touche plus.
    const curStreak=s.streak||0;
    if(curStreak>1&&done>0) pts+=PTS_STREAK;
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

    setTotalJolingos(newTJ);
    setTotalDone(newTD);setPerfectDays(newPD);
    setHistory(newH);setMonthlyJolingos(newMJ);
    // Détection de palier (série, tâches, journées parfaites)
    const reached={...(s.reachedMilestones||{})};
    const found=checkMilestone("tasks",s.totalDone||0,newTD,reached)
      ||checkMilestone("perfect",s.perfectDays||0,newPD,reached)
      ||checkMilestone("streak",curStreak>0?curStreak-1:0,curStreak,reached);
    if(found){reached[found.id]=true;setTimeout(()=>setMilestone(found),1200);}
    // Tâches non faites → suggérées le lendemain (carried, valent moins)
    const missed=selected.filter((_,i)=>checkin[i]!==true).map(t=>t.text);
    save({...s,totalJolingos:newTJ,totalDone:newTD,perfectDays:newPD,history:newH,monthlyJolingos:newMJ,eveningDone:true,carriedTasks:missed,reachedMilestones:reached});
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

  // Cocher/décocher une tâche en direct dans la journée
  function toggleTaskDone(i){
    const next={...checkin};
    next[i]=next[i]===true?undefined:true;
    if(next[i]===undefined) delete next[i];
    setCheckin(next);
    if(next[i]===true&&navigator.vibrate) navigator.vibrate(15); // petite vibration de satisfaction
    const s=load();
    save({...s,checkin:next});
  }

  const tk=todayKey();
  const s_=load();
  const hasPending=s_.activeKey===tk&&s_.selected?.length>0&&!s_.eveningDone;
  const todayDone=!!(s_.history||{})[tk];
  // "Demain est prêt" seulement si réellement préparé POUR demain
  const tomorrowReadyValid=tomorrowTasks.length>0&&s_.tomorrowPreparedFor===tomorrowKey();
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

  // Contexte Swaz pour l'accueil : capture récente > série > baisse de régime > welcome
  const swazContext=(()=>{
    const s=load();
    if(s.lastCaptureSeen!==capturedLevel&&capturedLevel>0) return"capture";
    // Baisse de régime : 2+ jours ratés récemment
    const recentDays=Object.entries(history).sort(([a],[b])=>b.localeCompare(a)).slice(0,4);
    const missedRecent=recentDays.filter(([,v])=>v.total>0&&v.done===0).length;
    if(missedRecent>=2) return"slump";
    // Swaz évolue avec ton parcours
    if(streak>=30) return"legend";
    if(streak>=7) return"veteran";
    if(streak>=2) return"streak";
    if((s.totalDone||0)===0) return"firstday";
    return"welcome";
  })();

  // ── PHASES ────────────────────────────────────────────────
  if(phase==="lang") return <LangPicker onPick={pickLang}/>;
  if(phase==="splash") return <Splash lang={lang} onDone={()=>setPhase("onboard")}/>;
  if(phase==="onboard") return <OnboardSlides lang={lang} onDone={()=>setPhase("profile")}/>;
  if(phase==="profile") return <ProfileSetup lang={lang} onDone={p=>{const s=load();save({...s,profile:p});setProfile(p);setPhase("app");setScreen("home");}}/>;

  if(screen==="select") return <TaskSelection lang={lang} vibes={vibes} genre={genre} onCommit={tasks=>{
    const s=load();
    const selDays={...(s.selectedDays||{})};
    const alreadyToday=!!selDays[tk];
    selDays[tk]=true;
    // Incrémente la série une seule fois par jour, à la première sélection du jour
    let newStreak=s.streak||0;
    let reached={...(s.reachedMilestones||{})};
    let streakMile=null;
    if(!alreadyToday){
      const y=jolingoDate();y.setDate(y.getDate()-1);
      const yk=`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}-${String(y.getDate()).padStart(2,"0")}`;
      const oldStreak=newStreak;
      newStreak=selDays[yk]?newStreak+1:1;
      setStreak(newStreak);
      streakMile=checkMilestone("streak",oldStreak,newStreak,reached);
      if(streakMile) reached[streakMile.id]=true;
    }
    save({...s,activeKey:tk,selected:tasks,checkin:{},eveningDone:false,carriedTasks:[],selectedDays:selDays,streak:newStreak,reachedMilestones:reached});
    setSelected(tasks);setCheckin({});
    if(streakMile){setMilestone(streakMile);} else {setScreen("evening");}
  }}/>;

  if(screen==="prepTomorrow"){
    const s=load();
    const pre=(s.tomorrowPreparedFor===tomorrowKey()&&s.tomorrowTasks?.length>0)?s.tomorrowTasks.map(text=>({text})):[];
    return <TaskSelection lang={lang} vibes={vibes} genre={genre} onCommit={commitTomorrowTasks} prefilled={pre} isPrepTomorrow/>;
  }

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
      {milestone&&<MilestoneModal milestone={milestone} lang={lang} onDone={()=>{setMilestone(null);if(screen!=="recap"&&!eveningDone)setScreen("evening");}}/>}
      {selectedJoki&&<JokiCard energy={selectedJoki} genre={genre} lang={lang} onClose={()=>setSelectedJoki(null)}/>}
      {captureEnergy&&<CaptureScreen energy={captureEnergy} genre={genre} lang={lang} onDone={()=>{const s=load();save({...s,lastCaptureSeen:getCapturedLevel(totalJolingos)});setCaptureEnergy(null);}}/>}

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
              <button onClick={()=>setShowSettings(true)} style={{background:"none",border:"none",cursor:"pointer",fontSize:20}}>⚙️</button>
            </div>

            {/* Swaz — message contextuel */}
            <div className="fi" style={{animationDelay:".08s"}}>
              <SwazBubble lang={lang} context={swazContext} profile={profile}/>
            </div>

            {/* Secret culturel du jour */}
            {(()=>{
              const lvl=cultureOfDay(tk);
              const secret=JOKI_CULTURE[lvl]?.[lang];
              const joki=ENERGIES[lvl-1];
              if(!secret) return null;
              return(
                <div className="fi" style={{background:`linear-gradient(135deg,${C.violet}0D,${C.violet}03)`,border:`1px solid ${C.violet}1A`,borderRadius:14,padding:"13px 16px",marginBottom:14,animationDelay:".09s"}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                    <span style={{fontSize:13}}>🌍</span>
                    <span style={{fontFamily:"Inter,sans-serif",fontSize:10,fontWeight:700,color:C.violet,letterSpacing:.5,textTransform:"uppercase"}}>{lang==="fr"?"Le secret du jour":lang==="es"?"El secreto del día":"Today's secret"}{joki?` · ${joki.country}`:""}</span>
                  </div>
                  <div style={{fontFamily:"Inter,sans-serif",fontSize:13,color:C.ink,lineHeight:1.55}}>{secret}</div>
                </div>
              );
            })()}

            {/* Bande de progression discrète vers le prochain Joki */}
            {nextEnergy&&(
              <div onClick={()=>setTab("tree")} className="fi" style={{background:"white",borderRadius:14,padding:"12px 16px",marginBottom:14,cursor:"pointer",animationDelay:".1s",boxShadow:`0 2px 10px ${C.violet}0A`}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                  <div style={{flexShrink:0,opacity:.9}}><MysteryJoki energy={nextEnergy} size={32} animated={false}/></div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:"Inter,sans-serif",fontSize:12,fontWeight:700,color:C.ink}}>{lang==="fr"?"Prochain Joki":lang==="es"?"Próximo Joki":"Next Joki"}</div>
                    <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:C.muted,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{Math.max(0,nextEnergy.jolingos-totalJolingos)} Jolingos · {nextEnergy.energy[lang]}</div>
                  </div>
                  <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:C.violet,display:"flex",alignItems:"center",gap:4}}><JolingoCoin size={15}/>{totalJolingos}</span>
                </div>
                <div style={{height:5,background:C.border,borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${Math.min(100,(totalJolingos/(nextEnergy.jolingos))*100)}%`,background:`linear-gradient(90deg,${C.violetL},${C.violet})`,borderRadius:3,transition:"width .5s"}}/>
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
              <>
                {/* Liste des tâches du jour — cochables en direct */}
                <div style={{background:"white",borderRadius:18,padding:"18px",marginBottom:14,boxShadow:`0 4px 16px ${C.violet}10`}}>
                  <div style={{display:"flex",alignItems:"center",marginBottom:14}}>
                    <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:11,color:C.muted,letterSpacing:1,textTransform:"uppercase",flex:1}}>
                      ☀️ {lang==="fr"?"Tes tâches du jour":lang==="es"?"Tus tareas de hoy":"Your tasks today"}
                    </div>
                    <div style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:13,color:C.violet}}>
                      {selected.filter((_,i)=>checkin[i]===true).length}/{selected.length}
                    </div>
                  </div>
                  {selected.map((task,i)=>{
                    const isDone=checkin[i]===true;
                    return(
                      <div key={i} onClick={()=>toggleTaskDone(i)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:i<selected.length-1?`1px solid ${C.border}`:"none",cursor:"pointer"}}>
                        <div style={{width:28,height:28,borderRadius:9,flexShrink:0,background:isDone?C.green:"white",border:isDone?"none":`2px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,color:"white",transition:"all .2s"}}>
                          {isDone?"✓":""}
                        </div>
                        {task.carried&&<span style={{fontSize:12}}>🔄</span>}
                        {task.isResistance&&<span style={{fontSize:12}}>🚫</span>}
                        <span style={{fontFamily:"Inter,sans-serif",fontSize:14,color:isDone?C.muted:C.ink,flex:1,textDecoration:isDone?"line-through":"none"}}>{task.text}</span>
                        <span style={{fontFamily:"Inter,sans-serif",fontSize:11,color:isDone?C.green:C.muted,fontWeight:isDone?700:400,display:"inline-flex",alignItems:"center",gap:2}}>{i>=CORE_TASKS?PTS_BONUS:(task.carried?PTS_CARRIED:(task.isResistance?PTS_RESISTANCE:PTS_TASK))}<JolingoCoin size={13} gain={isDone}/></span>
                      </div>
                    );
                  })}
                  <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:C.muted,textAlign:"center",marginTop:12,fontStyle:"italic"}}>
                    {lang==="fr"?"Coche tes tâches au fur et à mesure 💛":lang==="es"?"Marca tus tareas a medida 💛":"Check off tasks as you go 💛"}
                  </div>
                </div>
                {/* Bilan du soir — clôture la journée */}
                <div onClick={()=>setScreen("evening")} style={{background:"white",borderRadius:18,padding:"18px 20px",cursor:"pointer",borderLeft:`5px solid ${C.violet}`,boxShadow:`0 4px 16px ${C.violet}15`,display:"flex",alignItems:"center",gap:14}}>
                  <span style={{fontSize:28}}>🌙</span>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:C.ink}}>{lang==="fr"?"Clôturer ma journée":lang==="es"?"Cerrar mi día":"Close my day"}</div>
                    <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:C.muted,marginTop:2}}>{lang==="fr"?"Valide ton bilan du soir":lang==="es"?"Confirma tu balance":"Confirm your evening review"}</div>
                  </div>
                  <span style={{color:C.violet,fontSize:22}}>›</span>
                </div>
              </>
            )}

            {todayDone&&(
              <div style={{background:"white",borderRadius:20,padding:"28px 20px",textAlign:"center",border:`2px solid ${C.green}30`}}>
                <div style={{fontSize:52}}>🎉</div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:C.ink,marginTop:12}}>{t.bravoTitle}</div>
                <div style={{fontFamily:"Inter,sans-serif",fontSize:14,color:C.muted,marginTop:6,lineHeight:1.6}}>
                  {(history[tk]?.done||0)}/{(history[tk]?.total||0)} {lang==="fr"?"tâches":lang==="es"?"tareas":"tasks"} · {history[tk]?.pts||0} ✨<br/>{t.bravoSub}
                </div>
                {!tomorrowReadyValid?(
                  <button onClick={()=>setScreen("prepTomorrow")} style={{marginTop:18,width:"100%",padding:"14px",border:`2px solid ${C.violet}`,borderRadius:12,background:"transparent",color:C.violet,fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:14,cursor:"pointer"}}>
                    🌙 {lang==="fr"?"Préparer demain (optionnel)":lang==="es"?"Preparar mañana (opcional)":"Prepare tomorrow (optional)"}
                  </button>
                ):(
                  <div style={{marginTop:18,background:"#F0FDF4",borderRadius:14,padding:"14px 16px",border:`1px solid ${C.green}30`,textAlign:"left"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                      <span style={{fontSize:16}}>🌙</span>
                      <span style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:13,color:C.green,flex:1}}>{lang==="fr"?"Demain est prêt":lang==="es"?"Mañana está listo":"Tomorrow is ready"}</span>
                    </div>
                    {tomorrowTasks.map((tt,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<tomorrowTasks.length-1?`1px solid ${C.green}15`:"none"}}>
                        <span style={{fontSize:11,color:C.green}}>○</span>
                        <span style={{fontFamily:"Inter,sans-serif",fontSize:13,color:C.ink}}>{typeof tt==="string"?tt:tt.text}</span>
                      </div>
                    ))}
                    <button onClick={()=>setScreen("prepTomorrow")} style={{marginTop:12,width:"100%",padding:"10px",border:`1.5px solid ${C.violet}`,borderRadius:10,background:"white",color:C.violet,fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>
                      {lang==="fr"?"Modifier":lang==="es"?"Modificar":"Edit"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ── Secondaire : série, stats, récap (sous l'action du jour) ── */}
            {streak>0&&(
              <div className="fi" style={{background:"#FFF8E7",borderRadius:14,padding:"12px 16px",margin:"16px 0 14px",display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:24}}>🔥</span>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:C.amber||"#F59E0B"}}>{streak} {(lang==="fr"?(streak>1?"JOURS DE SUITE":"JOUR DE SUITE"):lang==="es"?(streak>1?"DÍAS SEGUIDOS":"DÍA SEGUIDO"):(streak>1?"DAYS IN A ROW":"DAY IN A ROW"))}</div>
                <div style={{marginLeft:"auto",fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:C.violet,display:"flex",alignItems:"center",gap:5}}><JolingoCoin size={18}/>{totalJolingos}</div>
              </div>
            )}

            <div className="fi" style={{display:"flex",gap:10,marginBottom:16,marginTop:streak>0?0:16}}>
              {[{l:"✅",v:totalDone},{l:"⭐",v:perfectDays},{l:"coin",v:`${monthlyJolingos[monthKey()]||0}`}].map((s,i)=>(
                <div key={i} style={{flex:1,background:"white",borderRadius:14,padding:"12px 8px",textAlign:"center"}}>
                  <div style={{fontSize:18}}>{s.l==="coin"?<JolingoCoin size={18}/>:s.l}</div>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:C.ink,marginTop:3}}>{s.v}</div>
                </div>
              ))}
            </div>

            <div className="fi">
              <WeekRecap history={history} lang={lang}/>
            </div>
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
                  <span style={{fontFamily:"Inter,sans-serif",fontSize:11,color:C.muted,flexShrink:0}}>{i>=CORE_TASKS?PTS_BONUS:(task.carried?PTS_CARRIED:(task.isResistance?PTS_RESISTANCE:PTS_TASK))}J</span>
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
              selected.forEach((task,i)=>{if(checkin[i]===true)pts+=i>=CORE_TASKS?PTS_BONUS:(task.carried?PTS_CARRIED:(task.isResistance?PTS_RESISTANCE:PTS_TASK));});
              if(done_ev===selected.length)pts+=PTS_PERFECT;
              if(streak>1)pts+=PTS_STREAK;
              return(
                <div style={{background:C.violet+"12",borderRadius:16,padding:"16px 20px",marginTop:20,display:"inline-flex",gap:24,alignItems:"center"}}>
                  <div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:C.violet,display:"flex",alignItems:"center",gap:4}}>+{pts}<JolingoCoin size={26} gain/></div><div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:C.muted}}>{ex.earnedJolingos}</div></div>
                  {streak>0&&<div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:C.amber||"#F59E0B"}}>🔥 {streak}</div><div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:C.muted}}>{lang==="fr"?(streak>1?"jours de suite":"jour de suite"):lang==="es"?(streak>1?"días seguidos":"día seguido"):(streak>1?"days in a row":"day in a row")}</div></div>}
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
                  {checkin[i]===true&&<span style={{fontFamily:"Inter,sans-serif",fontSize:11,color:C.violet,fontWeight:700,display:"inline-flex",alignItems:"center",gap:2}}>+{i>=CORE_TASKS?PTS_BONUS:(task.carried?PTS_CARRIED:(task.isResistance?PTS_RESISTANCE:PTS_TASK))}<JolingoCoin size={13}/></span>}
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
              {capturedLevel}/{ENERGIES.length} Énergies capturées · {totalJolingos} Jolingos
            </div>

            {/* Grand arbre */}
            <div style={{display:"flex",justifyContent:"center",marginBottom:24}}>
              <JolingoTree capturedCount={capturedLevel} size={200}/>
            </div>

            {/* Prochaine capture — Joki mystère qui se dévoile */}
            {nextEnergy&&(()=>{
              const progress=Math.min(100,(totalJolingos/nextEnergy.jolingos)*100);
              // Dévoilement progressif selon la progression
              const revealEnergy=progress>=25;   // 25% → énergie révélée
              const revealInitial=progress>=50;  // 50% → initiale du nom
              const revealCulture=progress>=70;  // 70% → habitude culturelle
              const initial=nextEnergy.names[genre].charAt(0);
              const culture=JOKI_CULTURE[nextEnergy.level]?.[lang]||"";
              return(
                <div style={{background:`linear-gradient(135deg,${C.night},#2D1B69)`,borderRadius:18,padding:"20px",marginBottom:20}}>
                  <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"rgba(255,255,255,.5)",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:14}}>
                    {lang==="fr"?"Prochain Joki à découvrir":lang==="es"?"Próximo Joki por descubrir":"Next Joki to discover"}
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:14}}>
                    <div style={{flexShrink:0}}>
                      <MysteryJoki energy={nextEnergy} size={88} animated/>
                    </div>
                    <div style={{flex:1}}>
                      {/* Nom : initiale révélée à 50% */}
                      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,color:C.yellow,letterSpacing:2}}>
                        {revealInitial?`${initial}${"·".repeat(Math.max(2,nextEnergy.names[genre].length-1))}`:"? ? ?"}
                      </div>
                      {/* Énergie + pays révélés à 25% */}
                      <div style={{fontFamily:"Inter,sans-serif",fontSize:13,color:"rgba(255,255,255,.7)",marginTop:2}}>
                        {revealEnergy?`${nextEnergy.country} ${nextEnergy.countryName[lang]} · ${nextEnergy.energy[lang]}`:(lang==="fr"?"🌍 Origine mystère…":lang==="es"?"🌍 Origen misterioso…":"🌍 Mystery origin…")}
                      </div>
                      <div style={{height:5,background:"rgba(255,255,255,.15)",borderRadius:3,overflow:"hidden",marginTop:10}}>
                        <div style={{height:"100%",width:`${progress}%`,background:C.yellow,borderRadius:3,transition:"width .4s"}}/>
                      </div>
                      <div style={{fontFamily:"Inter,sans-serif",fontSize:10,color:"rgba(255,255,255,.45)",marginTop:4}}>
                        {nextEnergy.jolingos-totalJolingos} Jolingos {ex.nextLevel}
                      </div>
                    </div>
                  </div>
                  {/* Indice culturel révélé à 70% */}
                  {revealCulture&&culture&&(
                    <div style={{background:"rgba(255,255,255,.08)",borderRadius:12,padding:"12px 14px",display:"flex",gap:10,alignItems:"flex-start"}}>
                      <span style={{fontSize:16,flexShrink:0}}>💡</span>
                      <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:"rgba(255,255,255,.75)",lineHeight:1.5,fontStyle:"italic"}}>{culture}</div>
                    </div>
                  )}
                  {/* Prochain palier de révélation */}
                  {!revealCulture&&(
                    <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"rgba(255,255,255,.4)",textAlign:"center"}}>
                      {!revealEnergy?(lang==="fr"?"🔓 À 25% : son énergie se révèle":lang==="es"?"🔓 Al 25%: su energía se revela":"🔓 At 25%: its energy is revealed"):!revealInitial?(lang==="fr"?"🔓 À 50% : l'initiale de son nom":lang==="es"?"🔓 Al 50%: la inicial de su nombre":"🔓 At 50%: its name initial"):(lang==="fr"?"🔓 À 70% : un secret de sa culture":lang==="es"?"🔓 Al 70%: un secreto de su cultura":"🔓 At 70%: a cultural secret")}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Collection */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {ENERGIES.map((energy,i)=>{
                const captured=i<capturedLevel;
                return(
                  <div key={i} onClick={()=>captured&&setSelectedJoki(energy)} style={{background:"white",borderRadius:16,padding:"16px",textAlign:"center",opacity:captured?1:.4,border:`2px solid ${captured?energy.color+"40":"transparent"}`,cursor:captured?"pointer":"default"}}>
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
                  <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:C.muted,marginTop:2,display:"flex",alignItems:"center",gap:3}}>{v.done}/{v.total} · {v.pts}<JolingoCoin size={12}/></div>
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

      {/* BOUTON FLOTTANT SWAZ */}
      {!["lang","onboard","splash"].includes(phase)&&!swazOpen&&(
        <button onClick={()=>setSwazOpen(true)}
          style={{position:"fixed",right:18,bottom:["select","prepTomorrow"].includes(screen)?100:90,zIndex:1500,width:60,height:60,borderRadius:"50%",border:"none",background:`linear-gradient(135deg,${C.night},#2D1B69)`,boxShadow:`0 6px 20px ${C.violet}50`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>
          <Swaz size={50} animated/>
        </button>
      )}

      {/* CHAT SWAZ */}
      {swazOpen&&<SwazChat lang={lang} profile={profile} onClose={()=>setSwazOpen(false)}/>}

      {/* RÉGLAGES */}
      {showSettings&&(
        <SettingsModal lang={lang} profile={profile} onClose={()=>setShowSettings(false)}
          onSaveProfile={(updated)=>{const s=load();save({...s,profile:updated});setProfile(updated);}}
          onReset={()=>{
            try{localStorage.removeItem(KEY);}catch{}
            setProfile(null);setTotalJolingos(0);setStreak(0);setTotalDone(0);setPerfectDays(0);
            setEarnedBadges([]);setHistory({});setMonthlyJolingos({});setSelected([]);setCheckin({});
            setShowSettings(false);
            setPhase("lang");
          }}
        />
      )}
    </div>
  );
}
