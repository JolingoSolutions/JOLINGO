// ── MASCOTTES JOLINGO ─────────────────────────────────────
// 20 énergies × 3 genres = 60 mascottes
// Base : boule ronde vivante avec yeux expressifs
// Chaque mascotte : couleur + détails pays + animation idle

export const ENERGIES = [
  {
    level: 1,
    country: "🇹🇭", countryName: { fr: "Thaïlande", en: "Thailand", es: "Tailandia" },
    energy: { fr: "🌸 Fleur", en: "🌸 Flower", es: "🌸 Flor" },
    names: { m: "Chaito", f: "Chaita", n: "Chaiti" },
    color: "#FF9EBB", glow: "#FFD6E7",
    jolingos: 50,
    details: "petals", // détails visuels
    animation: "float", // animation idle
    description: { fr: "Doux et fleuri, Chaito vient des temples dorés de Thaïlande.", en: "Soft and blooming, Chaito comes from Thailand's golden temples.", es: "Suave y floreciente, Chaito viene de los templos dorados de Tailandia." },
  },
  {
    level: 2,
    country: "🇺🇸", countryName: { fr: "États-Unis", en: "United States", es: "Estados Unidos" },
    energy: { fr: "⚡ Électricité", en: "⚡ Electricity", es: "⚡ Electricidad" },
    names: { m: "Jaiko", f: "Jaika", n: "Jaiki" },
    color: "#4C35E8", glow: "#C5BEFF",
    jolingos: 150,
    details: "stars",
    animation: "bounce",
    description: { fr: "Électrique et dynamique, Jaiko déborde d'énergie américaine.", en: "Electric and dynamic, Jaiko overflows with American energy.", es: "Eléctrico y dinámico, Jaiko rebosa de energía americana." },
  },
  {
    level: 3,
    country: "🇸🇳", countryName: { fr: "Sénégal", en: "Senegal", es: "Senegal" },
    energy: { fr: "☀️ Soleil", en: "☀️ Sun", es: "☀️ Sol" },
    names: { m: "Bayko", f: "Bayka", n: "Bayki" },
    color: "#FFD93D", glow: "#FFF3A3",
    jolingos: 300,
    details: "rays",
    animation: "pulse",
    description: { fr: "Chaleureux et rayonnant, Bayko porte la lumière du soleil africain.", en: "Warm and radiant, Bayko carries the light of the African sun.", es: "Cálido y radiante, Bayko lleva la luz del sol africano." },
  },
  {
    level: 4,
    country: "🇵🇹", countryName: { fr: "Portugal", en: "Portugal", es: "Portugal" },
    energy: { fr: "🌊 Océan", en: "🌊 Ocean", es: "🌊 Océano" },
    names: { m: "Joako", f: "Joaka", n: "Joaki" },
    color: "#3B82F6", glow: "#BFDBFE",
    jolingos: 500,
    details: "waves",
    animation: "wave",
    description: { fr: "Profond et calme, Joako porte l'âme des navigateurs portugais.", en: "Deep and calm, Joako carries the soul of Portuguese navigators.", es: "Profundo y tranquilo, Joako lleva el alma de los navegantes portugueses." },
  },
  {
    level: 5,
    country: "🇯🇵", countryName: { fr: "Japon", en: "Japan", es: "Japón" },
    energy: { fr: "🌙 Lune", en: "🌙 Moon", es: "🌙 Luna" },
    names: { m: "Renko", f: "Renka", n: "Renki" },
    color: "#C4B5FD", glow: "#EDE9FE",
    jolingos: 800,
    details: "moon",
    animation: "shimmer",
    description: { fr: "Mystérieux et délicat, Renko brille dans la nuit comme la lune japonaise.", en: "Mysterious and delicate, Renko shines in the night like the Japanese moon.", es: "Misterioso y delicado, Renko brilla en la noche como la luna japonesa." },
  },
  {
    level: 6,
    country: "🇳🇬", countryName: { fr: "Nigeria", en: "Nigeria", es: "Nigeria" },
    energy: { fr: "🔥 Feu", en: "🔥 Fire", es: "🔥 Fuego" },
    names: { m: "Emeko", f: "Emeka", n: "Emeki" },
    color: "#FF5722", glow: "#FFCCBC",
    jolingos: 1200,
    details: "flames",
    animation: "flicker",
    description: { fr: "Intense et puissant, Emeko brûle avec la passion du Nigeria.", en: "Intense and powerful, Emeko burns with the passion of Nigeria.", es: "Intenso y poderoso, Emeko arde con la pasión de Nigeria." },
  },
  {
    level: 7,
    country: "🇨🇳", countryName: { fr: "Chine", en: "China", es: "China" },
    energy: { fr: "🌿 Nature", en: "🌿 Nature", es: "🌿 Naturaleza" },
    names: { m: "Weiko", f: "Weika", n: "Weiki" },
    color: "#22C55E", glow: "#BBF7D0",
    jolingos: 1800,
    details: "leaves",
    animation: "sway",
    description: { fr: "Sage et naturel, Weiko est en harmonie avec la nature millénaire chinoise.", en: "Wise and natural, Weiko is in harmony with China's ancient nature.", es: "Sabio y natural, Weiko está en armonía con la naturaleza milenaria china." },
  },
  {
    level: 8,
    country: "🇩🇰", countryName: { fr: "Danemark", en: "Denmark", es: "Dinamarca" },
    energy: { fr: "🧊 Glace", en: "🧊 Ice", es: "🧊 Hielo" },
    names: { m: "Freyko", f: "Freyka", n: "Freyki" },
    color: "#BAE6FD", glow: "#E0F2FE",
    jolingos: 2500,
    details: "crystals",
    animation: "crystallize",
    description: { fr: "Pur et cristallin, Freyko vient des terres glacées du Nord.", en: "Pure and crystalline, Freyko comes from the icy lands of the North.", es: "Puro y cristalino, Freyko viene de las tierras heladas del Norte." },
  },
  {
    level: 9,
    country: "🇲🇽", countryName: { fr: "Mexique", en: "Mexico", es: "México" },
    energy: { fr: "🌋 Volcan", en: "🌋 Volcano", es: "🌋 Volcán" },
    names: { m: "Florito", f: "Florita", n: "Floriti" },
    color: "#F97316", glow: "#FED7AA",
    jolingos: 3500,
    details: "lava",
    animation: "erupt",
    description: { fr: "Explosif et coloré, Florito porte la force des volcans mexicains.", en: "Explosive and colorful, Florito carries the force of Mexican volcanoes.", es: "Explosivo y colorido, Florito lleva la fuerza de los volcanes mexicanos." },
  },
  {
    level: 10,
    country: "🇩🇿", countryName: { fr: "Algérie", en: "Algeria", es: "Argelia" },
    energy: { fr: "🌪️ Vent", en: "🌪️ Wind", es: "🌪️ Viento" },
    names: { m: "Aminko", f: "Aminka", n: "Aminki" },
    color: "#A78BFA", glow: "#EDE9FE",
    jolingos: 5000,
    details: "wind",
    animation: "spin",
    description: { fr: "Libre et puissant, Aminko souffle comme le vent du désert algérien.", en: "Free and powerful, Aminko blows like the wind of the Algerian desert.", es: "Libre y poderoso, Aminko sopla como el viento del desierto argelino." },
  },
  {
    level: 11,
    country: "🇬🇧", countryName: { fr: "Angleterre", en: "England", es: "Inglaterra" },
    energy: { fr: "⭐ Étoile", en: "⭐ Star", es: "⭐ Estrella" },
    names: { m: "Sparko", f: "Sparka", n: "Sparki" },
    color: "#FCD34D", glow: "#FEF9C3",
    jolingos: 7000,
    details: "stars",
    animation: "twinkle",
    description: { fr: "Brillant et classique, Sparko scintille comme les étoiles au-dessus de Londres.", en: "Brilliant and classic, Sparko sparkles like the stars above London.", es: "Brillante y clásico, Sparko brilla como las estrellas sobre Londres." },
  },
  {
    level: 12,
    country: "🇺🇾", countryName: { fr: "Uruguay", en: "Uruguay", es: "Uruguay" },
    energy: { fr: "🌈 Arc-en-ciel", en: "🌈 Rainbow", es: "🌈 Arcoíris" },
    names: { m: "Matiko", f: "Matika", n: "Matiki" },
    color: "#F472B6", glow: "#FCE7F3",
    jolingos: 9500,
    details: "rainbow",
    animation: "colorshift",
    description: { fr: "Joyeux et coloré, Matiko illumine tout comme un arc-en-ciel uruguayen.", en: "Joyful and colorful, Matiko illuminates everything like a Uruguayan rainbow.", es: "Alegre y colorido, Matiko ilumina todo como un arcoíris uruguayo." },
  },
  {
    level: 13,
    country: "🇷🇺", countryName: { fr: "Russie", en: "Russia", es: "Rusia" },
    energy: { fr: "🌑 Ombre", en: "🌑 Shadow", es: "🌑 Sombra" },
    names: { m: "Zorko", f: "Zorka", n: "Zorki" },
    color: "#475569", glow: "#CBD5E1",
    jolingos: 12500,
    details: "shadow",
    animation: "fade",
    description: { fr: "Mystérieux et profond, Zorko vient des nuits infinies de Russie.", en: "Mysterious and deep, Zorko comes from the endless nights of Russia.", es: "Misterioso y profundo, Zorko viene de las noches infinitas de Rusia." },
  },
  {
    level: 14,
    country: "🇮🇩", countryName: { fr: "Indonésie", en: "Indonesia", es: "Indonesia" },
    energy: { fr: "🪨 Terre", en: "🪨 Earth", es: "🪨 Tierra" },
    names: { m: "Bimako", f: "Bimaka", n: "Bimaki" },
    color: "#92400E", glow: "#FDE68A",
    jolingos: 16000,
    details: "earth",
    animation: "rumble",
    description: { fr: "Solide et ancré, Bimako porte la force de la terre indonésienne.", en: "Solid and grounded, Bimako carries the strength of Indonesian earth.", es: "Sólido y arraigado, Bimako lleva la fuerza de la tierra indonesia." },
  },
  {
    level: 15,
    country: "🏔️", countryName: { fr: "Daghestan", en: "Dagestan", es: "Daguestán" },
    energy: { fr: "⛰️ Montagne", en: "⛰️ Mountain", es: "⛰️ Montaña" },
    names: { m: "Shamko", f: "Shamka", n: "Shamki" },
    color: "#64748B", glow: "#E2E8F0",
    jolingos: 20000,
    details: "mountain",
    animation: "steady",
    description: { fr: "Inébranlable et fier, Shamko est aussi fort que les montagnes du Daghestan.", en: "Unshakeable and proud, Shamko is as strong as Dagestan's mountains.", es: "Inquebrantable y orgulloso, Shamko es tan fuerte como las montañas de Daguestán." },
  },
  {
    level: 16,
    country: "🇮🇹", countryName: { fr: "Italie", en: "Italy", es: "Italia" },
    energy: { fr: "☀️ Soleil Chaud", en: "☀️ Warm Sun", es: "☀️ Sol Cálido" },
    names: { m: "Lucio", f: "Lucia", n: "Luci" },
    color: "#EF4444", glow: "#FECACA",
    jolingos: 25000,
    details: "sun",
    animation: "glow",
    description: { fr: "Passionné et solaire, Lucio rayonne comme le soleil de la Méditerranée.", en: "Passionate and sunny, Lucio radiates like the Mediterranean sun.", es: "Apasionado y solar, Lucio irradia como el sol del Mediterráneo." },
  },
  {
    level: 17,
    country: "🇸🇦", countryName: { fr: "Arabie Saoudite", en: "Saudi Arabia", es: "Arabia Saudita" },
    energy: { fr: "🏜️ Désert", en: "🏜️ Desert", es: "🏜️ Desierto" },
    names: { m: "Omaro", f: "Omara", n: "Omari" },
    color: "#D97706", glow: "#FEF3C7",
    jolingos: 32000,
    details: "sand",
    animation: "drift",
    description: { fr: "Sage et patient, Omaro traverse les épreuves comme le sable du désert.", en: "Wise and patient, Omaro crosses trials like desert sand.", es: "Sabio y paciente, Omaro atraviesa las pruebas como la arena del desierto." },
  },
  {
    level: 18,
    country: "🇩🇪", countryName: { fr: "Allemagne", en: "Germany", es: "Alemania" },
    energy: { fr: "⚙️ Foudre", en: "⚙️ Thunder", es: "⚙️ Trueno" },
    names: { m: "Welko", f: "Welka", n: "Welki" },
    color: "#1E293B", glow: "#94A3B8",
    jolingos: 40000,
    details: "thunder",
    animation: "strike",
    description: { fr: "Précis et puissant, Welko frappe comme la foudre allemande.", en: "Precise and powerful, Welko strikes like German thunder.", es: "Preciso y poderoso, Welko golpea como el trueno alemán." },
  },
  {
    level: 19,
    country: "🌋", countryName: { fr: "Île de la Réunion", en: "Réunion Island", es: "Isla de la Reunión" },
    energy: { fr: "🌺 Métissage", en: "🌺 Blend", es: "🌺 Mestizaje" },
    names: { m: "Kreolo", f: "Kreola", n: "Kreoli" },
    color: "#EC4899", glow: "#FBCFE8",
    jolingos: 50000,
    details: "tropical",
    animation: "dance",
    description: { fr: "Unique et métissé, Kreolo porte toutes les cultures du monde en lui.", en: "Unique and blended, Kreolo carries all the world's cultures within.", es: "Único y mestizo, Kreolo lleva todas las culturas del mundo en él." },
  },
  {
    level: 20,
    country: "🇫🇷", countryName: { fr: "France", en: "France", es: "Francia" },
    energy: { fr: "✨ Lumière Pure", en: "✨ Pure Light", es: "✨ Luz Pura" },
    names: { m: "Lumio", f: "Lumie", n: "Lumi" },
    color: "#6C63FF", glow: "#E0E7FF",
    jolingos: 65000,
    details: "light",
    animation: "radiate",
    description: { fr: "Lumio est la lumière pure — le summum du voyage Jolingo.", en: "Lumio is pure light — the pinnacle of the Jolingo journey.", es: "Lumio es luz pura — la cima del viaje Jolingo." },
  },
];

// ── SVG MASCOTTE ──────────────────────────────────────────
export function MascotteCharacter({ energy, genre = "n", size = 120, animated = true }) {
  const g = genre === "m" ? "m" : genre === "f" ? "f" : "n";
  const name = energy.names[g];
  const color = energy.color;
  const glow = energy.glow;
  const details = energy.details;
  const anim = animated ? energy.animation : "none";

  const eyeStyle = genre === "f"
    ? { rx: 5, ry: 6, lashes: true }
    : genre === "m"
    ? { rx: 6, ry: 5, lashes: false }
    : { rx: 5, ry: 5, lashes: false };

  const animId = `anim-${energy.level}-${g}`;

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`bg-${animId}`} cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor={glow} />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
        <filter id={`glow-${animId}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <style>{`
          @keyframes float-${animId} { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
          @keyframes bounce-${animId} { 0%,100%{transform:translateY(0) scaleY(1)} 40%{transform:translateY(-10px) scaleY(1.05)} 60%{transform:translateY(-8px)} }
          @keyframes pulse-${animId} { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
          @keyframes wave-${animId} { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(3deg)} 75%{transform:rotate(-3deg)} }
          @keyframes shimmer-${animId} { 0%,100%{opacity:1} 50%{opacity:0.7} }
          @keyframes flicker-${animId} { 0%,100%{transform:scale(1) rotate(0deg)} 25%{transform:scale(1.05) rotate(1deg)} 75%{transform:scale(0.97) rotate(-1deg)} }
          @keyframes sway-${animId} { 0%,100%{transform:rotate(0deg)} 33%{transform:rotate(4deg)} 66%{transform:rotate(-4deg)} }
          @keyframes spin-${animId} { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
          @keyframes twinkle-${animId} { 0%,100%{filter:brightness(1)} 50%{filter:brightness(1.3)} }
          @keyframes colorshift-${animId} { 0%{filter:hue-rotate(0deg)} 100%{filter:hue-rotate(360deg)} }
          @keyframes fade-${animId} { 0%,100%{opacity:1} 50%{opacity:0.6} }
          @keyframes rumble-${animId} { 0%,100%{transform:translate(0,0)} 25%{transform:translate(-2px,1px)} 75%{transform:translate(2px,-1px)} }
          @keyframes steady-${animId} { 0%,100%{transform:scale(1)} 50%{transform:scale(1.02)} }
          @keyframes glow-${animId} { 0%,100%{filter:drop-shadow(0 0 4px ${color})} 50%{filter:drop-shadow(0 0 12px ${color})} }
          @keyframes drift-${animId} { 0%,100%{transform:translateX(0)} 50%{transform:translateX(4px)} }
          @keyframes strike-${animId} { 0%,90%,100%{transform:scale(1)} 95%{transform:scale(1.1)} }
          @keyframes dance-${animId} { 0%,100%{transform:rotate(0deg) translateY(0)} 25%{transform:rotate(5deg) translateY(-3px)} 75%{transform:rotate(-5deg) translateY(-3px)} }
          @keyframes radiate-${animId} { 0%,100%{filter:drop-shadow(0 0 6px ${color})} 50%{filter:drop-shadow(0 0 20px ${color})} }
          @keyframes crystallize-${animId} { 0%,100%{transform:scale(1) rotate(0deg)} 50%{transform:scale(1.04) rotate(2deg)} }
          @keyframes erupt-${animId} { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-4px) scale(1.06)} }
          .mascotte-${animId} {
            animation: ${anim}-${animId} ${
              anim === 'bounce' ? '0.8s' :
              anim === 'spin' ? '3s linear' :
              anim === 'colorshift' ? '4s linear' :
              anim === 'strike' ? '2s' :
              '2s'
            } infinite ease-in-out;
            transform-origin: center;
          }
        `}</style>
      </defs>

      <g className={`mascotte-${animId}`}>
        {/* Ombre douce */}
        <ellipse cx="60" cy="108" rx="24" ry="6" fill="rgba(0,0,0,0.1)"/>

        {/* Corps principal — boule */}
        <circle cx="60" cy="62" r="38" fill={`url(#bg-${animId})`} filter={`url(#glow-${animId})`}/>

        {/* Highlight */}
        <ellipse cx="48" cy="48" rx="10" ry="7" fill="rgba(255,255,255,0.35)" transform="rotate(-20 48 48)"/>

        {/* Détails spéciaux par énergie */}
        {details === "petals" && <>
          {[0,72,144,216,288].map((deg,i) => (
            <ellipse key={i} cx={60+32*Math.cos(deg*Math.PI/180)} cy={62+32*Math.sin(deg*Math.PI/180)}
              rx="7" ry="10" fill="#FFB7D5" opacity="0.7"
              transform={`rotate(${deg+90} ${60+32*Math.cos(deg*Math.PI/180)} ${62+32*Math.sin(deg*Math.PI/180)})`}/>
          ))}
        </>}
        {details === "stars" && <>
          {[[20,30],[95,25],[15,90],[100,85],[55,15]].map(([x,y],i) => (
            <text key={i} x={x} y={y} fontSize="10" opacity="0.6">⭐</text>
          ))}
        </>}
        {details === "rays" && <>
          {[0,45,90,135,180,225,270,315].map((deg,i) => (
            <line key={i}
              x1={60+40*Math.cos(deg*Math.PI/180)} y1={62+40*Math.sin(deg*Math.PI/180)}
              x2={60+50*Math.cos(deg*Math.PI/180)} y2={62+50*Math.sin(deg*Math.PI/180)}
              stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
          ))}
        </>}
        {details === "waves" && <>
          <path d="M 22 85 Q 35 80 48 85 Q 61 90 74 85 Q 87 80 98 85" stroke="#93C5FD" strokeWidth="2.5" fill="none" opacity="0.7"/>
          <path d="M 22 92 Q 35 87 48 92 Q 61 97 74 92 Q 87 87 98 92" stroke="#93C5FD" strokeWidth="2" fill="none" opacity="0.5"/>
        </>}
        {details === "moon" && <>
          <path d="M 85 30 Q 95 45 85 60 Q 75 45 85 30" fill="#FCD34D" opacity="0.8"/>
          {[[25,25],[30,90],[95,80]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="2" fill="white" opacity="0.6"/>
          ))}
        </>}
        {details === "flames" && <>
          <path d="M 45 100 Q 40 85 50 75 Q 48 90 55 82 Q 52 92 60 86 Q 57 94 65 88 Q 62 97 70 90 Q 68 100 75 100 Z" fill="#FF9800" opacity="0.7"/>
        </>}
        {details === "leaves" && <>
          <path d="M 30 40 Q 20 55 35 65 Q 25 50 40 45 Z" fill="#16A34A" opacity="0.6"/>
          <path d="M 85 35 Q 100 50 90 65 Q 95 48 80 42 Z" fill="#16A34A" opacity="0.6"/>
          <path d="M 55 20 Q 45 30 55 38 Q 50 28 60 25 Z" fill="#16A34A" opacity="0.5"/>
        </>}
        {details === "crystals" && <>
          {[[25,30],[90,35],[20,85],[95,80]].map(([x,y],i) => (
            <polygon key={i} points={`${x},${y-8} ${x-5},${y+4} ${x+5},${y+4}`} fill="white" opacity="0.5"/>
          ))}
        </>}
        {details === "lava" && <>
          <path d="M 25 95 Q 30 85 40 90 Q 45 80 55 88 Q 60 78 70 86 Q 75 76 85 84 Q 90 90 95 95 Z" fill="#FF6B35" opacity="0.6"/>
        </>}
        {details === "wind" && <>
          {[30,45,60,75].map((y,i) => (
            <path key={i} d={`M 15 ${y} Q 40 ${y-8} 65 ${y} Q 90 ${y+8} 110 ${y}`}
              stroke="#DDD6FE" strokeWidth="2" fill="none" opacity={0.7-i*0.15}/>
          ))}
        </>}
        {details === "shadow" && <>
          <circle cx="60" cy="62" r="35" fill="rgba(0,0,0,0.15)"/>
          {[[20,20],[95,30],[15,95],[100,90]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="#475569" opacity="0.4"/>
          ))}
        </>}
        {details === "earth" && <>
          <path d="M 22 75 Q 35 70 50 78 Q 65 70 80 75 Q 90 72 98 78 Q 90 85 60 88 Q 30 85 22 75 Z" fill="#854D0E" opacity="0.4"/>
        </>}
        {details === "mountain" && <>
          <polygon points="60,25 35,75 85,75" fill="rgba(255,255,255,0.2)"/>
          <polygon points="60,25 60,45 75,45" fill="white" opacity="0.3"/>
        </>}
        {details === "sun" && <>
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i) => (
            <line key={i}
              x1={60+42*Math.cos(deg*Math.PI/180)} y1={62+42*Math.sin(deg*Math.PI/180)}
              x2={60+52*Math.cos(deg*Math.PI/180)} y2={62+52*Math.sin(deg*Math.PI/180)}
              stroke="#FCD34D" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
          ))}
        </>}
        {details === "sand" && <>
          {Array.from({length:12}).map((_,i) => (
            <circle key={i} cx={20+i*7} cy={95+Math.sin(i)*3} r="2" fill="#FCD34D" opacity="0.5"/>
          ))}
        </>}
        {details === "thunder" && <>
          <path d="M 65 25 L 52 55 L 62 55 L 50 85 L 70 50 L 58 50 Z" fill="#FCD34D" opacity="0.8"/>
        </>}
        {details === "tropical" && <>
          {["#FF6B6B","#FFD93D","#6BCB77","#4D96FF","#FF6B6B"].map((c,i) => (
            <circle key={i} cx={25+i*17} cy={28} r="5" fill={c} opacity="0.7"/>
          ))}
        </>}
        {details === "light" && <>
          {[0,51,102,153,204,255,306].map((deg,i) => (
            <line key={i}
              x1={60+44*Math.cos(deg*Math.PI/180)} y1={62+44*Math.sin(deg*Math.PI/180)}
              x2={60+56*Math.cos(deg*Math.PI/180)} y2={62+56*Math.sin(deg*Math.PI/180)}
              stroke="#E0E7FF" strokeWidth="3" strokeLinecap="round" opacity="0.8"/>
          ))}
        </>}
        {details === "rainbow" && <>
          {["#FF6B6B","#FFD93D","#6BCB77","#4D96FF","#C77DFF"].map((c,i) => (
            <path key={i} d={`M ${25+i*2} ${45+i*3} Q 60 ${20+i*3} ${95-i*2} ${45+i*3}`}
              stroke={c} strokeWidth="2.5" fill="none" opacity="0.6"/>
          ))}
        </>}

        {/* Yeux */}
        {/* Oeil gauche */}
        <ellipse cx="46" cy="58" rx={eyeStyle.rx} ry={eyeStyle.ry} fill="white"/>
        <circle cx="47" cy="59" r="3" fill="#1A1A2E"/>
        <circle cx="48" cy="57" r="1" fill="white"/>
        {eyeStyle.lashes && <>
          <line x1="40" y1="52" x2="42" y2="54" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="44" y1="50" x2="44" y2="53" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="48" y1="51" x2="47" y2="54" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round"/>
        </>}

        {/* Oeil droit */}
        <ellipse cx="74" cy="58" rx={eyeStyle.rx} ry={eyeStyle.ry} fill="white"/>
        <circle cx="75" cy="59" r="3" fill="#1A1A2E"/>
        <circle cx="76" cy="57" r="1" fill="white"/>
        {eyeStyle.lashes && <>
          <line x1="70" y1="52" x2="71" y2="54" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="74" y1="50" x2="74" y2="53" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="78" y1="51" x2="77" y2="54" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round"/>
        </>}

        {/* Bouche — varie selon genre */}
        {genre === "f"
          ? <path d="M 52 72 Q 60 80 68 72" stroke="#1A1A2E" strokeWidth="2" fill="none" strokeLinecap="round"/>
          : genre === "m"
          ? <path d="M 50 71 Q 60 78 70 71" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          : <path d="M 53 72 Q 60 77 67 72" stroke="#1A1A2E" strokeWidth="2" fill="none" strokeLinecap="round"/>
        }

        {/* Joues roses */}
        <circle cx="38" cy="68" r="7" fill="#FF9EBB" opacity="0.35"/>
        <circle cx="82" cy="68" r="7" fill="#FF9EBB" opacity="0.35"/>

        {/* Petits bras */}
        <path d="M 22 65 Q 15 60 18 52" stroke={color} strokeWidth="8" strokeLinecap="round" fill="none"/>
        <path d="M 98 65 Q 105 60 102 52" stroke={color} strokeWidth="8" strokeLinecap="round" fill="none"/>

        {/* Petites mains */}
        <circle cx="18" cy="51" r="6" fill={color}/>
        <circle cx="102" cy="51" r="6" fill={color}/>
      </g>

      {/* Nom sous la mascotte */}
      <text x="60" y="118" textAnchor="middle" fontFamily="'Bebas Neue', sans-serif" fontSize="11" fill="#1A1A2E" opacity="0.7">{name}</text>
    </svg>
  );
}

// ── ARBRE JOLINGO ─────────────────────────────────────────
export function JolingoTree({ capturedCount, size = 200 }) {
  const stage = Math.min(capturedCount, 10);

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <style>{`
        @keyframes treeBreath { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.02)} }
        @keyframes leafSway { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(3deg)} }
        @keyframes sparkle { 0%,100%{opacity:0.4} 50%{opacity:1} }
        .tree-body { animation: treeBreath 3s ease-in-out infinite; transform-origin: bottom center; }
        .leaf { animation: leafSway 2s ease-in-out infinite; transform-origin: bottom center; }
        .sparkle { animation: sparkle 1.5s ease-in-out infinite; }
      `}</style>

      {/* Sol */}
      <ellipse cx="100" cy="185" rx="50" ry="8" fill="#D4B896" opacity="0.5"/>

      {stage === 0 && <>
        {/* Graine */}
        <ellipse cx="100" cy="178" rx="12" ry="8" fill="#8B5E3C"/>
        <path d="M 100 170 Q 97 160 100 155" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </>}

      {stage >= 1 && stage < 3 && <>
        {/* Pousse */}
        <rect x="97" y="145" width="6" height="40" rx="3" fill="#16A34A" className="tree-body"/>
        <ellipse cx="100" cy="140" rx="18" ry="14" fill="#22C55E" className="leaf"/>
        <ellipse cx="85" cy="148" rx="12" ry="9" fill="#16A34A" className="leaf"/>
        <ellipse cx="115" cy="148" rx="12" ry="9" fill="#16A34A" className="leaf"/>
      </>}

      {stage >= 3 && stage < 6 && <>
        {/* Arbuste */}
        <rect x="95" y="120" width="10" height="65" rx="5" fill="#92400E" className="tree-body"/>
        <ellipse cx="100" cy="110" rx="35" ry="28" fill="#16A34A" className="leaf"/>
        <ellipse cx="75" cy="125" rx="22" ry="18" fill="#22C55E" className="leaf"/>
        <ellipse cx="125" cy="125" rx="22" ry="18" fill="#22C55E" className="leaf"/>
        <ellipse cx="100" cy="95" rx="20" ry="15" fill="#4ADE80" className="leaf"/>
        {/* Fleurs */}
        {[[80,105],[115,108],[100,88]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="5" fill="#FF9EBB" className="sparkle" style={{animationDelay:`${i*0.5}s`}}/>
        ))}
      </>}

      {stage >= 6 && stage < 9 && <>
        {/* Arbre */}
        <rect x="92" y="95" width="16" height="90" rx="8" fill="#92400E" className="tree-body"/>
        {/* Branches */}
        <path d="M 100 130 Q 65 115 55 100" stroke="#92400E" strokeWidth="8" strokeLinecap="round" fill="none"/>
        <path d="M 100 130 Q 135 115 145 100" stroke="#92400E" strokeWidth="8" strokeLinecap="round" fill="none"/>
        <path d="M 100 115 Q 75 105 70 90" stroke="#92400E" strokeWidth="6" strokeLinecap="round" fill="none"/>
        <path d="M 100 115 Q 125 105 130 90" stroke="#92400E" strokeWidth="6" strokeLinecap="round" fill="none"/>
        {/* Feuillage */}
        <circle cx="100" cy="75" r="40" fill="#16A34A" className="leaf"/>
        <circle cx="68" cy="88" r="28" fill="#22C55E" className="leaf"/>
        <circle cx="132" cy="88" r="28" fill="#22C55E" className="leaf"/>
        <circle cx="100" cy="55" r="25" fill="#4ADE80" className="leaf"/>
        {/* Fruits */}
        {[[85,70],[115,72],[100,58],[75,82],[125,80]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="6" fill="#EF4444" className="sparkle" style={{animationDelay:`${i*0.3}s`}}/>
        ))}
      </>}

      {stage >= 9 && <>
        {/* Arbre majestueux / planète */}
        <rect x="90" y="85" width="20" height="100" rx="10" fill="#78350F" className="tree-body"/>
        {/* Branches multiples */}
        {[[-40,-30],[40,-30],[-55,-10],[55,-10],[-35,-50],[35,-50]].map(([dx,dy],i) => (
          <path key={i} d={`M 100 ${120+dy/2} Q ${100+dx*0.7} ${120+dy*0.7} ${100+dx} ${120+dy}`}
            stroke="#78350F" strokeWidth={7-i} strokeLinecap="round" fill="none"/>
        ))}
        {/* Grande couronne */}
        <circle cx="100" cy="72" r="52" fill="#15803D" className="leaf"/>
        <circle cx="60" cy="88" r="35" fill="#16A34A" className="leaf"/>
        <circle cx="140" cy="88" r="35" fill="#16A34A" className="leaf"/>
        <circle cx="100" cy="45" r="30" fill="#22C55E" className="leaf"/>
        <circle cx="75" cy="60" r="22" fill="#4ADE80" className="leaf"/>
        <circle cx="125" cy="60" r="22" fill="#4ADE80" className="leaf"/>
        {/* Étoiles / lumières */}
        {[[70,45],[130,48],[55,70],[145,72],[85,35],[115,37],[100,30]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="4" fill="#FFD93D" className="sparkle" style={{animationDelay:`${i*0.2}s`}}/>
        ))}
        {/* Planète si level max */}
        {capturedCount >= 15 && <>
          <circle cx="100" cy="60" r="58" fill="none" stroke="#4C35E8" strokeWidth="1.5" opacity="0.3" strokeDasharray="4 4"/>
          <circle cx="100" cy="60" r="70" fill="none" stroke="#6C63FF" strokeWidth="1" opacity="0.2" strokeDasharray="3 6"/>
        </>}
      </>}

      {/* Mascottes capturées dans l'arbre */}
      {capturedCount > 0 && capturedCount <= 3 && (
        <circle cx="100" cy="155" r="6" fill="#FF9EBB" className="sparkle"/>
      )}
      {capturedCount > 3 && capturedCount <= 6 && <>
        <circle cx="85" cy="140" r="5" fill="#FFD93D" className="sparkle"/>
        <circle cx="115" cy="142" r="5" fill="#4C35E8" className="sparkle" style={{animationDelay:"0.5s"}}/>
      </>}
      {capturedCount > 6 && <>
        <circle cx="78" cy="118" r="5" fill="#FF5722" className="sparkle"/>
        <circle cx="122" cy="120" r="5" fill="#22C55E" className="sparkle" style={{animationDelay:"0.3s"}}/>
        <circle cx="100" cy="105" r="5" fill="#BAE6FD" className="sparkle" style={{animationDelay:"0.6s"}}/>
      </>}
    </svg>
  );
}
