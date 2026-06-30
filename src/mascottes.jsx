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
    energy: { fr: "💻 Technologie", en: "💻 Technology", es: "💻 Tecnología" },
    names: { m: "Jaiko", f: "Jaika", n: "Jaiki" },
    color: "#4C7BE8", glow: "#C5D4FF",
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
    energy: { fr: "🧭 Navigation", en: "🧭 Navigation", es: "🧭 Navegación" },
    names: { m: "Joako", f: "Joaka", n: "Joaki" },
    color: "#1CA9C9", glow: "#C2ECF5",
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
    energy: { fr: "🎵 Musique", en: "🎵 Music", es: "🎵 Música" },
    names: { m: "Emeko", f: "Emeka", n: "Emeki" },
    color: "#E8431F", glow: "#FFCCBC",
    jolingos: 1200,
    details: "flames",
    animation: "flicker",
    description: { fr: "Intense et puissant, Emeko brûle avec la passion du Nigeria.", en: "Intense and powerful, Emeko burns with the passion of Nigeria.", es: "Intenso y poderoso, Emeko arde con la pasión de Nigeria." },
  },
  {
    level: 7,
    country: "🇨🇳", countryName: { fr: "Chine", en: "China", es: "China" },
    energy: { fr: "🔥 Feu", en: "🔥 Fire", es: "🔥 Fuego" },
    names: { m: "Weiko", f: "Weika", n: "Weiki" },
    color: "#E8431F", glow: "#FFD0B0",
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
    energy: { fr: "🌺 Fiesta", en: "🌺 Fiesta", es: "🌺 Fiesta" },
    names: { m: "Florito", f: "Florita", n: "Floriti" },
    color: "#FF6F9C", glow: "#FFD9E8",
    jolingos: 3500,
    details: "lava",
    animation: "erupt",
    description: { fr: "Explosif et coloré, Florito porte la force des volcans mexicains.", en: "Explosive and colorful, Florito carries the force of Mexican volcanoes.", es: "Explosivo y colorido, Florito lleva la fuerza de los volcanes mexicanos." },
  },
  {
    level: 10,
    country: "🇩🇿", countryName: { fr: "Algérie", en: "Algeria", es: "Argelia" },
    energy: { fr: "🏜️ Sable", en: "🏜️ Sand", es: "🏜️ Arena" },
    names: { m: "Aminko", f: "Aminka", n: "Aminki" },
    color: "#E0C68A", glow: "#F7EFD8",
    jolingos: 5000,
    details: "sand",
    animation: "drift",
    description: { fr: "Libre et serein, Aminko ondule comme le sable du Sahara algérien.", en: "Free and serene, Aminko ripples like the sand of the Algerian Sahara.", es: "Libre y sereno, Aminko ondula como la arena del Sáhara argelino." },
  },
  {
    level: 11,
    country: "🇬🇧", countryName: { fr: "Angleterre", en: "England", es: "Inglaterra" },
    energy: { fr: "🌬️ Vent", en: "🌬️ Wind", es: "🌬️ Viento" },
    names: { m: "Sparko", f: "Sparka", n: "Sparki" },
    color: "#A8C5D4", glow: "#E0EEF5",
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
    energy: { fr: "🌴 Jungle", en: "🌴 Jungle", es: "🌴 Jungla" },
    names: { m: "Bimako", f: "Bimaka", n: "Bimaki" },
    color: "#3DA85A", glow: "#BBF0C8",
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
    energy: { fr: "🏛️ Marbre", en: "🏛️ Marble", es: "🏛️ Mármol" },
    names: { m: "Lucio", f: "Lucia", n: "Luci" },
    color: "#D8D2E0", glow: "#F0EDF5",
    jolingos: 25000,
    details: "sun",
    animation: "glow",
    description: { fr: "Passionné et solaire, Lucio rayonne comme le soleil de la Méditerranée.", en: "Passionate and sunny, Lucio radiates like the Mediterranean sun.", es: "Apasionado y solar, Lucio irradia como el sol del Mediterráneo." },
  },
  {
    level: 17,
    country: "🇸🇦", countryName: { fr: "Arabie Saoudite", en: "Saudi Arabia", es: "Arabia Saudita" },
    energy: { fr: "🪙 Or", en: "🪙 Gold", es: "🪙 Oro" },
    names: { m: "Omaro", f: "Omara", n: "Omari" },
    color: "#F5B800", glow: "#FFF0B3",
    jolingos: 32000,
    details: "stars",
    animation: "twinkle",
    description: { fr: "Précieux et rayonnant, Omaro brille comme l'or du désert d'Arabie.", en: "Precious and radiant, Omaro shines like the gold of the Arabian desert.", es: "Precioso y radiante, Omaro brilla como el oro del desierto árabe." },
  },
  {
    level: 18,
    country: "🇩🇪", countryName: { fr: "Allemagne", en: "Germany", es: "Alemania" },
    energy: { fr: "⚙️ Mécanique", en: "⚙️ Mechanics", es: "⚙️ Mecánica" },
    names: { m: "Welko", f: "Welka", n: "Welki" },
    color: "#525C78", glow: "#A8B0C8",
    jolingos: 40000,
    details: "thunder",
    animation: "strike",
    description: { fr: "Précis et puissant, Welko frappe comme la foudre allemande.", en: "Precise and powerful, Welko strikes like German thunder.", es: "Preciso y poderoso, Welko golpea como el trueno alemán." },
  },
  {
    level: 19,
    country: "🌋", countryName: { fr: "Île de la Réunion", en: "Réunion Island", es: "Isla de la Reunión" },
    energy: { fr: "🌋 Lave", en: "🌋 Lava", es: "🌋 Lava" },
    names: { m: "Kreolo", f: "Kreola", n: "Kreoli" },
    color: "#FF4D2E", glow: "#FFD0A3",
    jolingos: 50000,
    details: "lava",
    animation: "erupt",
    description: { fr: "Ardent et vivant, Kreolo coule comme la lave du Piton de la Fournaise.", en: "Fiery and alive, Kreolo flows like the lava of Piton de la Fournaise.", es: "Ardiente y vivo, Kreolo fluye como la lava del Piton de la Fournaise." },
  },
  {
    level: 20,
    country: "🇫🇷", countryName: { fr: "France", en: "France", es: "Francia" },
    energy: { fr: "✨ Lumière", en: "✨ Light", es: "✨ Luz" },
    names: { m: "Lumio", f: "Lumie", n: "Lumi" },
    color: "#6C63FF", glow: "#E0E7FF",
    jolingos: 65000,
    details: "light",
    animation: "radiate",
    description: { fr: "Lumio est la lumière pure — le summum du voyage Jolingo.", en: "Lumio is pure light — the pinnacle of the Jolingo journey.", es: "Lumio es luz pura — la cima del viaje Jolingo." },
  },
];

// ── HABITUDES CULTURELLES — un trait inspirant par pays (dévoilement progressif) ──
export const JOKI_CULTURE = {
  1:  { fr: "En Thaïlande, on salue avec le « wai », mains jointes, en signe de respect et de gratitude.", en: "In Thailand, people greet with the 'wai', hands together, as a sign of respect and gratitude.", es: "En Tailandia, se saluda con el 'wai', manos juntas, como señal de respeto y gratitud." },
  2:  { fr: "Aux États-Unis, la culture du « small talk » crée du lien avec les inconnus au quotidien.", en: "In the USA, 'small talk' culture builds everyday connection with strangers.", es: "En EE. UU., la cultura del 'small talk' crea vínculos cotidianos con desconocidos." },
  3:  { fr: "Au Sénégal, la « teranga » (hospitalité) fait qu'on accueille toujours l'autre à sa table.", en: "In Senegal, 'teranga' (hospitality) means always welcoming others to your table.", es: "En Senegal, la 'teranga' (hospitalidad) significa acoger siempre al otro en tu mesa." },
  4:  { fr: "Au Portugal, la « saudade » célèbre la beauté douce-amère du souvenir et de l'instant.", en: "In Portugal, 'saudade' celebrates the bittersweet beauty of memory and the moment.", es: "En Portugal, la 'saudade' celebra la belleza agridulce del recuerdo y del instante." },
  5:  { fr: "Au Japon, l'« ikigai » invite à trouver chaque jour sa raison de se lever.", en: "In Japan, 'ikigai' invites you to find your reason to get up each day.", es: "En Japón, el 'ikigai' invita a encontrar cada día tu razón para levantarte." },
  6:  { fr: "Au Nigeria, l'esprit communautaire « ubuntu » rappelle : je suis parce que nous sommes.", en: "In Nigeria, the communal spirit 'ubuntu' reminds us: I am because we are.", es: "En Nigeria, el espíritu comunitario 'ubuntu' recuerda: soy porque somos." },
  7:  { fr: "En Chine, le « qì gōng » cultive l'énergie du corps par le souffle et le mouvement lent.", en: "In China, 'qi gong' cultivates body energy through breath and slow movement.", es: "En China, el 'qi gong' cultiva la energía del cuerpo con la respiración y el movimiento lento." },
  8:  { fr: "Au Danemark, le « hygge » célèbre les petits moments cosy qui réchauffent le cœur.", en: "In Denmark, 'hygge' celebrates cozy little moments that warm the heart.", es: "En Dinamarca, el 'hygge' celebra los pequeños momentos acogedores que reconfortan." },
  9:  { fr: "Au Mexique, on honore la mémoire et la joie de vivre lors du « Día de los Muertos ».", en: "In Mexico, memory and joy are honored during 'Día de los Muertos'.", es: "En México, se honra la memoria y la alegría en el 'Día de los Muertos'." },
  10: { fr: "En Algérie, partager un thé à la menthe est un rituel d'amitié et de patience.", en: "In Algeria, sharing mint tea is a ritual of friendship and patience.", es: "En Argelia, compartir un té de menta es un ritual de amistad y paciencia." },
  11: { fr: "En Angleterre, la pause thé de l'après-midi est un moment sacré de calme.", en: "In England, the afternoon tea break is a sacred moment of calm.", es: "En Inglaterra, la pausa del té de la tarde es un momento sagrado de calma." },
  12: { fr: "En Uruguay, partager le maté en cercle, c'est partager le temps et la confiance.", en: "In Uruguay, sharing mate in a circle means sharing time and trust.", es: "En Uruguay, compartir el mate en círculo es compartir el tiempo y la confianza." },
  13: { fr: "En Russie, on valorise les longues conversations sincères, autour d'un thé brûlant.", en: "In Russia, long heartfelt conversations over hot tea are treasured.", es: "En Rusia, se valoran las largas conversaciones sinceras con un té caliente." },
  14: { fr: "En Indonésie, le « gotong royong » est l'entraide communautaire pour avancer ensemble.", en: "In Indonesia, 'gotong royong' is communal mutual aid to move forward together.", es: "En Indonesia, el 'gotong royong' es la ayuda mutua comunitaria para avanzar juntos." },
  15: { fr: "Au Daghestan, l'hospitalité envers le voyageur est un honneur transmis de génération en génération.", en: "In Dagestan, hospitality toward travelers is an honor passed down through generations.", es: "En Daguestán, la hospitalidad hacia el viajero es un honor transmitido entre generaciones." },
  16: { fr: "En Italie, la « dolce vita » célèbre l'art de savourer pleinement chaque instant.", en: "In Italy, 'dolce vita' celebrates the art of fully savoring each moment.", es: "En Italia, la 'dolce vita' celebra el arte de saborear plenamente cada instante." },
  17: { fr: "En Arabie Saoudite, offrir des dattes et du café au visiteur est un geste de générosité ancestral.", en: "In Saudi Arabia, offering dates and coffee to a visitor is an ancestral gesture of generosity.", es: "En Arabia Saudita, ofrecer dátiles y café al visitante es un gesto ancestral de generosidad." },
  18: { fr: "En Allemagne, la « Feierabend » marque le moment sacré où le travail s'arrête et le repos commence.", en: "In Germany, 'Feierabend' marks the sacred moment when work stops and rest begins.", es: "En Alemania, el 'Feierabend' marca el momento sagrado en que el trabajo termina y empieza el descanso." },
  19: { fr: "À La Réunion, le « vivre-ensemble » mêle les cultures dans une même chaleur humaine.", en: "In Réunion, 'living together' blends cultures in a shared human warmth.", es: "En la Reunión, el 'vivir juntos' mezcla culturas en una misma calidez humana." },
  20: { fr: "En France, l'art de la conversation autour d'un bon repas peut durer des heures.", en: "In France, the art of conversation around a good meal can last for hours.", es: "En Francia, el arte de la conversación en torno a una buena comida puede durar horas." },
};

// ── SVG MASCOTTE ──────────────────────────────────────────
// ── LOT 1 — Jokis style Pokémon, inspirés d'animaux, couleurs = énergie ──
// Base mignonne commune + silhouette évoquant l'animal (pas une copie réaliste)

// 1. CHAITI 🇹🇭 — inspiré éléphant (oreilles + trompe), énergie Fleur (rose)
function JK_Chaiti({ size = 190, genre = "n", animated = true }) {
  const eyeRy = genre === "f" ? 9 : genre === "m" ? 7 : 8;
  return (
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      <defs>
        <radialGradient id="c1b" cx="42%" cy="36%"><stop offset="0%" stopColor="#FFC2D9" /><stop offset="100%" stopColor="#FF6B9D" /></radialGradient>
        <filter id="c1s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#FF6B9D" floodOpacity="0.3" /></filter>
        {animated && <style>{`@keyframes c1f{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes c1t{0%,100%{transform:rotate(0)}50%{transform:rotate(7deg)}}@keyframes c1bl{0%,93%,100%{transform:scaleY(1)}96%{transform:scaleY(.1)}}.c1f{animation:c1f 3.4s ease-in-out infinite}.c1t{animation:c1t 3s ease-in-out infinite;transform-origin:75px 95px}.c1e{animation:c1bl 4.5s infinite;transform-origin:center}`}</style>}
      </defs>
      <g className={animated ? "c1f" : ""}>
        <ellipse cx="75" cy="146" rx="28" ry="6" fill="rgba(0,0,0,.1)" />
        {/* Oreilles d'éléphant stylisées */}
        <ellipse cx="40" cy="72" rx="17" ry="22" fill="#FF6B9D" /><ellipse cx="42" cy="72" rx="10" ry="15" fill="#FFD0E0" />
        <ellipse cx="110" cy="72" rx="17" ry="22" fill="#FF6B9D" /><ellipse cx="108" cy="72" rx="10" ry="15" fill="#FFD0E0" />
        {/* Corps rond */}
        <ellipse cx="75" cy="82" rx="36" ry="38" fill="url(#c1b)" filter="url(#c1s)" />
        <ellipse cx="75" cy="90" rx="21" ry="21" fill="#fff" opacity=".45" />
        <ellipse cx="63" cy="62" rx="9" ry="6" fill="rgba(255,255,255,.45)" transform="rotate(-20 63 62)" />
        {/* Fleur (énergie) sur la tête */}
        <g transform="translate(75,42)">{[0,72,144,216,288].map((d,i)=><ellipse key={i} cx={Math.cos(d*Math.PI/180)*7} cy={Math.sin(d*Math.PI/180)*7} rx="4" ry="6" fill="#FFD93D" transform={`rotate(${d+90} ${Math.cos(d*Math.PI/180)*7} ${Math.sin(d*Math.PI/180)*7})`} />)}<circle r="3.5" fill="#FF8FB1" /></g>
        {/* Yeux */}
        <g className={animated ? "c1e" : ""}>
          <ellipse cx="63" cy="80" rx="6" ry={eyeRy} fill="#fff" /><ellipse cx="87" cy="80" rx="6" ry={eyeRy} fill="#fff" />
          <circle cx="64" cy="82" r="4" fill="#1A1A2E" /><circle cx="88" cy="82" r="4" fill="#1A1A2E" />
          <circle cx="65.5" cy="80" r="1.5" fill="#fff" /><circle cx="89.5" cy="80" r="1.5" fill="#fff" />
          {genre === "f" && <><path d="M55 73 l3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /><path d="M95 73 l-3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /></>}
        </g>
        <circle cx="53" cy="90" r="5" fill="#FF6B9D" opacity=".4" /><circle cx="97" cy="90" r="5" fill="#FF6B9D" opacity=".4" />
        {/* Trompe */}
        <g className={animated ? "c1t" : ""}><path d="M75 92 Q73 110 80 120 Q85 126 80 130" stroke="#FF6B9D" strokeWidth="12" fill="none" strokeLinecap="round" /></g>
        {/* Pieds */}
        <ellipse cx="62" cy="120" rx="9" ry="6" fill="#FF6B9D" /><ellipse cx="88" cy="120" rx="9" ry="6" fill="#FF6B9D" />
      </g>
    </svg>
  );
}

// 2. JAIKI 🇺🇸 — inspiré aigle (bec + ailes + huppe), énergie Électricité (bleu + éclair)
function JK_Jaiki({ size = 190, genre = "n", animated = true }) {
  const eyeRy = genre === "f" ? 9 : genre === "m" ? 7 : 8;
  return (
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      <defs>
        <radialGradient id="c2b" cx="42%" cy="36%"><stop offset="0%" stopColor="#9BB6F5" /><stop offset="100%" stopColor="#4C7BE8" /></radialGradient>
        <filter id="c2s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#4C7BE8" floodOpacity=".35" /></filter>
        {animated && <style>{`@keyframes c2f{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes c2w{0%,100%{transform:rotate(0)}50%{transform:rotate(-9deg)}}@keyframes c2z{0%,100%{opacity:.7;transform:scale(1)}50%{opacity:1;transform:scale(1.12)}}.c2f{animation:c2f 3s ease-in-out infinite}.c2wl{animation:c2w 1.8s ease-in-out infinite;transform-origin:46px 84px}.c2wr{animation:c2w 1.8s ease-in-out infinite reverse;transform-origin:104px 84px}.c2z{animation:c2z 1.4s infinite;transform-origin:75px 40px}`}</style>}
      </defs>
      <g className={animated ? "c2f" : ""}>
        <ellipse cx="75" cy="146" rx="26" ry="6" fill="rgba(0,0,0,.1)" />
        {/* Ailes */}
        <g className={animated ? "c2wl" : ""}><path d="M48 82 Q22 74 14 92 Q28 92 24 102 Q38 98 40 106 Q48 96 52 100 Z" fill="#3D63C4" /></g>
        <g className={animated ? "c2wr" : ""}><path d="M102 82 Q128 74 136 92 Q122 92 126 102 Q112 98 110 106 Q102 96 98 100 Z" fill="#3D63C4" /></g>
        {/* Corps */}
        <ellipse cx="75" cy="84" rx="33" ry="37" fill="url(#c2b)" filter="url(#c2s)" />
        {/* Huppe-éclair (énergie) */}
        <g className={animated ? "c2z" : ""}><path d="M73 50 L68 30 L75 42 L73 24 L82 40 L78 50 Z" fill="#FFD93D" stroke="#F5B800" strokeWidth="1" /></g>
        <ellipse cx="75" cy="92" rx="19" ry="18" fill="#fff" opacity=".4" />
        <ellipse cx="63" cy="66" rx="8" ry="5" fill="rgba(255,255,255,.4)" transform="rotate(-20 63 66)" />
        {/* Yeux vifs */}
        <ellipse cx="64" cy="80" rx="6" ry={eyeRy} fill="#fff" /><ellipse cx="86" cy="80" rx="6" ry={eyeRy} fill="#fff" />
        <circle cx="65" cy="82" r="4" fill="#1A1A2E" /><circle cx="87" cy="82" r="4" fill="#1A1A2E" />
        <circle cx="66.5" cy="80" r="1.4" fill="#fff" /><circle cx="88.5" cy="80" r="1.4" fill="#fff" />
        <path d="M57 74 L67 77" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" /><path d="M93 74 L83 77" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" />
        {/* Bec jaune */}
        <path d="M69 88 Q75 98 81 88 Q75 92 69 88 Z" fill="#FFB627" />
        <circle cx="55" cy="90" r="5" fill="#FF9EBB" opacity=".35" /><circle cx="95" cy="90" r="5" fill="#FF9EBB" opacity=".35" />
        {/* Serres */}
        <path d="M66 120 l-2 6 M70 120 l0 7 M74 120 l2 6" stroke="#FFB627" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M84 120 l-2 6 M80 120 l0 7" stroke="#FFB627" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 3. BAYKI 🇸🇳 — inspiré lion (crinière), énergie Soleil (doré, crinière = rayons)
function JK_Bayki({ size = 190, genre = "n", animated = true }) {
  const eyeRy = genre === "f" ? 9 : genre === "m" ? 7 : 8;
  return (
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      <defs>
        <radialGradient id="c3b" cx="42%" cy="36%"><stop offset="0%" stopColor="#FFCB73" /><stop offset="100%" stopColor="#F4A124" /></radialGradient>
        <filter id="c3s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#F4A124" floodOpacity=".3" /></filter>
        {animated && <style>{`@keyframes c3f{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes c3m{0%,100%{transform:rotate(0)}50%{transform:rotate(8deg)}}.c3f{animation:c3f 3.4s ease-in-out infinite}.c3m{animation:c3m 8s linear infinite;transform-origin:75px 82px}`}</style>}
      </defs>
      <g className={animated ? "c3f" : ""}>
        <ellipse cx="75" cy="146" rx="28" ry="6" fill="rgba(0,0,0,.1)" />
        {/* Crinière = rayons de soleil (énergie + lion) */}
        <g className={animated ? "c3m" : ""}>{Array.from({length:16}).map((_,i)=>{const a=(i/16)*Math.PI*2;return <path key={i} d={`M${75+Math.cos(a)*30} ${82+Math.sin(a)*30} L${75+Math.cos(a)*46} ${82+Math.sin(a)*46} L${75+Math.cos(a+.2)*30} ${82+Math.sin(a+.2)*30} Z`} fill={i%2?"#E8851A":"#FFB627"} />;})}</g>
        {/* Tête */}
        <circle cx="75" cy="82" r="33" fill="url(#c3b)" filter="url(#c3s)" />
        <ellipse cx="75" cy="90" rx="19" ry="17" fill="#fff" opacity=".35" />
        <ellipse cx="63" cy="66" rx="8" ry="5" fill="rgba(255,255,255,.4)" transform="rotate(-20 63 66)" />
        {/* Oreilles rondes */}
        <circle cx="55" cy="60" r="8" fill="#F4A124" /><circle cx="55" cy="60" r="3.5" fill="#FFCB73" />
        <circle cx="95" cy="60" r="8" fill="#F4A124" /><circle cx="95" cy="60" r="3.5" fill="#FFCB73" />
        {/* Yeux */}
        <ellipse cx="64" cy="80" rx="6" ry={eyeRy} fill="#fff" /><ellipse cx="86" cy="80" rx="6" ry={eyeRy} fill="#fff" />
        <circle cx="65" cy="82" r="4" fill="#1A1A2E" /><circle cx="87" cy="82" r="4" fill="#1A1A2E" />
        <circle cx="66.5" cy="80" r="1.5" fill="#fff" /><circle cx="88.5" cy="80" r="1.5" fill="#fff" />
        {genre === "f" && <><path d="M56 73 l3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /><path d="M94 73 l-3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /></>}
        <circle cx="54" cy="90" r="5" fill="#FF8C42" opacity=".4" /><circle cx="96" cy="90" r="5" fill="#FF8C42" opacity=".4" />
        {/* Museau */}
        <ellipse cx="75" cy="92" rx="9" ry="7" fill="#FFE3B0" />
        <path d="M71 90 l4 4 l4-4 Z" fill="#C77B30" />
        <path d="M75 94 Q71 99 68 97 M75 94 Q79 99 82 97" stroke="#C77B30" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 4. JOAKI 🇵🇹 — inspiré sardine (corps fuselé + nageoires + queue), énergie Océan (bleu)
function JK_Joaki({ size = 190, genre = "n", animated = true }) {
  const eyeRy = genre === "f" ? 9 : genre === "m" ? 7 : 8;
  return (
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      <defs>
        <radialGradient id="c4b" cx="42%" cy="36%"><stop offset="0%" stopColor="#7FD4E8" /><stop offset="100%" stopColor="#1CA9C9" /></radialGradient>
        <filter id="c4s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#1CA9C9" floodOpacity=".3" /></filter>
        {animated && <style>{`@keyframes c4f{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}@keyframes c4tl{0%,100%{transform:rotate(0)}50%{transform:rotate(-10deg)}}.c4f{animation:c4f 3.2s ease-in-out infinite}.c4tl{animation:c4tl 1.6s ease-in-out infinite;transform-origin:75px 120px}`}</style>}
      </defs>
      <g className={animated ? "c4f" : ""}>
        <ellipse cx="75" cy="148" rx="24" ry="5" fill="rgba(0,0,0,.08)" />
        {/* Queue de poisson en bas */}
        <g className={animated ? "c4tl" : ""}><path d="M75 116 Q64 128 58 138 Q72 132 75 124 Q78 132 92 138 Q86 128 75 116 Z" fill="#1681A0" /></g>
        {/* Nageoires latérales */}
        <path d="M42 88 Q30 84 28 96 Q38 94 44 98 Z" fill="#1681A0" />
        <path d="M108 88 Q120 84 122 96 Q112 94 106 98 Z" fill="#1681A0" />
        {/* Corps fuselé vertical (sardine stylisée) */}
        <ellipse cx="75" cy="84" rx="30" ry="42" fill="url(#c4b)" filter="url(#c4s)" />
        {/* Nageoire dorsale */}
        <path d="M75 42 Q68 50 70 58 Q75 54 80 58 Q82 50 75 42 Z" fill="#1681A0" />
        <ellipse cx="75" cy="92" rx="17" ry="22" fill="#fff" opacity=".4" />
        {/* Écailles brillantes */}
        <path d="M62 70 q4 4 8 0 M78 70 q4 4 8 0 M62 82 q4 4 8 0 M78 82 q4 4 8 0" stroke="#fff" strokeWidth="1.2" fill="none" opacity=".5" />
        <ellipse cx="64" cy="66" rx="7" ry="5" fill="rgba(255,255,255,.45)" transform="rotate(-20 64 66)" />
        {/* Yeux */}
        <ellipse cx="64" cy="80" rx="6" ry={eyeRy} fill="#fff" /><ellipse cx="86" cy="80" rx="6" ry={eyeRy} fill="#fff" />
        <circle cx="65" cy="82" r="4" fill="#1A1A2E" /><circle cx="87" cy="82" r="4" fill="#1A1A2E" />
        <circle cx="66.5" cy="80" r="1.5" fill="#fff" /><circle cx="88.5" cy="80" r="1.5" fill="#fff" />
        {genre === "f" && <><path d="M56 73 l3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /><path d="M94 73 l-3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /></>}
        <circle cx="55" cy="90" r="5" fill="#4FC3DD" opacity=".5" /><circle cx="95" cy="90" r="5" fill="#4FC3DD" opacity=".5" />
        <path d="M68 96 Q75 101 82 96" stroke="#1A1A2E" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 5. RENKI 🇯🇵 — inspiré renard (oreilles pointues + touffe), énergie Lune (bleu-argent)
function JK_Renki({ size = 190, genre = "n", animated = true }) {
  const eyeRy = genre === "f" ? 9 : genre === "m" ? 7 : 8;
  return (
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      <defs>
        <radialGradient id="c5b" cx="42%" cy="36%"><stop offset="0%" stopColor="#A5B0F5" /><stop offset="100%" stopColor="#5B6CDB" /></radialGradient>
        <filter id="c5s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#5B6CDB" floodOpacity=".35" /></filter>
        {animated && <style>{`@keyframes c5f{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes c5t{0%,100%{transform:rotate(0)}50%{transform:rotate(-6deg)}}@keyframes c5g{0%,100%{opacity:.6}50%{opacity:1}}.c5f{animation:c5f 3.5s ease-in-out infinite}.c5t{animation:c5t 2.5s ease-in-out infinite;transform-origin:108px 110px}.c5g{animation:c5g 2.4s ease-in-out infinite}`}</style>}
      </defs>
      <g className={animated ? "c5f" : ""}>
        <ellipse cx="72" cy="146" rx="26" ry="6" fill="rgba(0,0,0,.1)" />
        {/* Queue touffue de renard */}
        <g className={animated ? "c5t" : ""}><path d="M98 104 Q120 100 124 80 Q128 96 116 112 Q108 120 96 116 Z" fill="#5B6CDB" /><path d="M118 86 Q124 90 122 100" stroke="#C5CEFF" strokeWidth="4" fill="none" strokeLinecap="round" /></g>
        {/* Croissant de lune (énergie) */}
        <g className={animated ? "c5g" : ""} transform="translate(75,30)"><path d="M-8 0 A8 8 0 1 0 4 6 A6 6 0 1 1 -8 0 Z" fill="#FFE066" /></g>
        {/* Oreilles pointues de renard */}
        <path d="M52 58 L46 32 L66 50 Z" fill="#5B6CDB" /><path d="M53 52 L50 40 L60 49 Z" fill="#C5CEFF" />
        <path d="M98 58 L104 32 L84 50 Z" fill="#5B6CDB" /><path d="M97 52 L100 40 L90 49 Z" fill="#C5CEFF" />
        {/* Tête */}
        <ellipse cx="75" cy="84" rx="33" ry="36" fill="url(#c5b)" filter="url(#c5s)" />
        <ellipse cx="75" cy="92" rx="18" ry="17" fill="#fff" opacity=".4" />
        <ellipse cx="63" cy="68" rx="8" ry="5" fill="rgba(255,255,255,.4)" transform="rotate(-20 63 68)" />
        {/* Yeux malins */}
        <ellipse cx="64" cy="82" rx="6" ry={eyeRy} fill="#fff" /><ellipse cx="86" cy="82" rx="6" ry={eyeRy} fill="#fff" />
        <circle cx="65" cy="84" r="4" fill="#1A1A2E" /><circle cx="87" cy="84" r="4" fill="#1A1A2E" />
        <circle cx="66.5" cy="82" r="1.5" fill="#fff" /><circle cx="88.5" cy="82" r="1.5" fill="#fff" />
        {genre === "f" && <><path d="M56 75 l3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /><path d="M94 75 l-3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /></>}
        <circle cx="54" cy="92" r="5" fill="#8B9EFF" opacity=".5" /><circle cx="96" cy="92" r="5" fill="#8B9EFF" opacity=".5" />
        {/* Museau pointu */}
        <path d="M75 90 L69 100 Q75 104 81 100 Z" fill="#fff" opacity=".5" />
        <ellipse cx="75" cy="98" rx="3" ry="2.4" fill="#1A1A2E" />
        <path d="M75 100 Q72 104 69 103 M75 100 Q78 104 81 103" stroke="#1A1A2E" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// ── LOT 2 — Jokis style Pokémon (niv 6-10) ──

// 6. EMEKI 🇳🇬 — inspiré calao (bec courbe + casque), énergie Feu (rouge-orangé)
function JK_Emeki({ size = 190, genre = "n", animated = true }) {
  const eyeRy = genre === "f" ? 9 : genre === "m" ? 7 : 8;
  return (
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      <defs>
        <radialGradient id="e6b" cx="42%" cy="36%"><stop offset="0%" stopColor="#FF9B6B" /><stop offset="100%" stopColor="#E8431F" /></radialGradient>
        <filter id="e6s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#E8431F" floodOpacity=".35" /></filter>
        {animated && <style>{`@keyframes e6f{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes e6fl{0%,100%{opacity:.7;transform:scaleY(1)}50%{opacity:1;transform:scaleY(1.15)}}.e6f{animation:e6f 3.2s ease-in-out infinite}.e6fl{animation:e6fl 1.3s ease-in-out infinite;transform-origin:75px 42px}`}</style>}
      </defs>
      <g className={animated ? "e6f" : ""}>
        <ellipse cx="75" cy="146" rx="26" ry="6" fill="rgba(0,0,0,.1)" />
        {/* Flammes (énergie) au sommet */}
        <g className={animated ? "e6fl" : ""}><path d="M68 46 Q64 30 75 20 Q72 34 82 30 Q80 42 75 46 Z" fill="#FFD93D" /><path d="M70 44 Q68 34 75 28 Q74 38 80 36 Q78 42 75 44 Z" fill="#FF7A3C" /></g>
        {/* Casque de calao */}
        <path d="M58 56 Q75 44 92 56 Q92 50 75 48 Q58 50 58 56 Z" fill="#C1121F" />
        {/* Corps */}
        <ellipse cx="75" cy="86" rx="33" ry="37" fill="url(#e6b)" filter="url(#e6s)" />
        <ellipse cx="75" cy="94" rx="18" ry="17" fill="#fff" opacity=".35" />
        <ellipse cx="63" cy="68" rx="8" ry="5" fill="rgba(255,255,255,.4)" transform="rotate(-20 63 68)" />
        {/* Yeux */}
        <ellipse cx="64" cy="82" rx="6" ry={eyeRy} fill="#fff" /><ellipse cx="86" cy="82" rx="6" ry={eyeRy} fill="#fff" />
        <circle cx="65" cy="84" r="4" fill="#1A1A2E" /><circle cx="87" cy="84" r="4" fill="#1A1A2E" />
        <circle cx="66.5" cy="82" r="1.5" fill="#fff" /><circle cx="88.5" cy="82" r="1.5" fill="#fff" />
        {genre === "f" && <><path d="M56 75 l3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /><path d="M94 75 l-3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /></>}
        <circle cx="54" cy="92" r="5" fill="#FF5722" opacity=".4" /><circle cx="96" cy="92" r="5" fill="#FF5722" opacity=".4" />
        {/* Grand bec courbe de calao */}
        <path d="M66 90 Q75 96 84 90 Q88 98 80 104 Q75 100 70 104 Q62 98 66 90 Z" fill="#FFB627" />
        <path d="M70 94 Q75 97 80 94" stroke="#E8941A" strokeWidth="1.2" fill="none" />
        {/* Petites pattes */}
        <path d="M66 120 l-2 6 M70 120 l0 7 M74 120 l2 6" stroke="#FFB627" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M84 120 l-2 6 M80 120 l0 7" stroke="#FFB627" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 7. WEIKI 🇨🇳 — inspiré dragon (moustaches + cornes + écailles), énergie Nature (vert)
function JK_Weiki({ size = 190, genre = "n", animated = true }) {
  const eyeRy = genre === "f" ? 9 : genre === "m" ? 7 : 8;
  return (
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      <defs>
        <radialGradient id="w7b" cx="42%" cy="36%"><stop offset="0%" stopColor="#86E89A" /><stop offset="100%" stopColor="#2DA84A" /></radialGradient>
        <filter id="w7s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#2DA84A" floodOpacity=".3" /></filter>
        {animated && <style>{`@keyframes w7f{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes w7m{0%,100%{transform:rotate(0)}50%{transform:rotate(4deg)}}.w7f{animation:w7f 3.4s ease-in-out infinite}.w7ml{animation:w7m 3s ease-in-out infinite;transform-origin:54px 96px}.w7mr{animation:w7m 3s ease-in-out infinite reverse;transform-origin:96px 96px}`}</style>}
      </defs>
      <g className={animated ? "w7f" : ""}>
        <ellipse cx="75" cy="146" rx="26" ry="6" fill="rgba(0,0,0,.1)" />
        {/* Cornes de dragon */}
        <path d="M60 52 Q56 38 62 34 Q63 44 67 50 Z" fill="#1E8A3A" />
        <path d="M90 52 Q94 38 88 34 Q87 44 83 50 Z" fill="#1E8A3A" />
        {/* Petite crête dorsale */}
        <path d="M68 48 Q75 40 82 48 Q78 46 75 50 Q72 46 68 48 Z" fill="#FFD93D" />
        {/* Corps */}
        <ellipse cx="75" cy="86" rx="33" ry="37" fill="url(#w7b)" filter="url(#w7s)" />
        <ellipse cx="75" cy="94" rx="18" ry="17" fill="#fff" opacity=".35" />
        {/* Écailles */}
        <path d="M62 72 q4 4 8 0 M78 72 q4 4 8 0 M70 82 q4 4 8 0" stroke="#fff" strokeWidth="1.2" fill="none" opacity=".5" />
        <ellipse cx="63" cy="68" rx="8" ry="5" fill="rgba(255,255,255,.4)" transform="rotate(-20 63 68)" />
        {/* Yeux */}
        <ellipse cx="64" cy="82" rx="6" ry={eyeRy} fill="#fff" /><ellipse cx="86" cy="82" rx="6" ry={eyeRy} fill="#fff" />
        <circle cx="65" cy="84" r="4" fill="#1A1A2E" /><circle cx="87" cy="84" r="4" fill="#1A1A2E" />
        <circle cx="66.5" cy="82" r="1.5" fill="#fff" /><circle cx="88.5" cy="82" r="1.5" fill="#fff" />
        {genre === "f" && <><path d="M56 75 l3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /><path d="M94 75 l-3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /></>}
        <circle cx="54" cy="92" r="5" fill="#3CB371" opacity=".4" /><circle cx="96" cy="92" r="5" fill="#3CB371" opacity=".4" />
        {/* Museau + moustaches de dragon */}
        <ellipse cx="75" cy="94" rx="8" ry="6" fill="#A8F0B8" opacity=".7" />
        <ellipse cx="75" cy="92" rx="2.5" ry="2" fill="#1A1A2E" />
        <path d="M68 96 Q75 100 82 96" stroke="#1A1A2E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <g className={animated ? "w7ml" : ""}><path d="M60 94 Q44 92 38 84" stroke="#1E8A3A" strokeWidth="2.5" fill="none" strokeLinecap="round" /></g>
        <g className={animated ? "w7mr" : ""}><path d="M90 94 Q106 92 112 84" stroke="#1E8A3A" strokeWidth="2.5" fill="none" strokeLinecap="round" /></g>
      </g>
    </svg>
  );
}

// 8. FREYKI 🇩🇰 — inspiré cygne (long cou + bec), énergie Glace (bleu pâle)
function JK_Freyki({ size = 190, genre = "n", animated = true }) {
  const eyeRy = genre === "f" ? 9 : genre === "m" ? 7 : 8;
  return (
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      <defs>
        <radialGradient id="f8b" cx="42%" cy="36%"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#B8E3F0" /></radialGradient>
        <filter id="f8s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#7FB8D4" floodOpacity=".3" /></filter>
        {animated && <style>{`@keyframes f8f{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes f8s2{0%,100%{opacity:.5}50%{opacity:1}}.f8f{animation:f8f 3.5s ease-in-out infinite}.f8sp{animation:f8s2 2.5s ease-in-out infinite}`}</style>}
      </defs>
      <g className={animated ? "f8f" : ""}>
        <ellipse cx="75" cy="146" rx="26" ry="6" fill="rgba(0,0,0,.08)" />
        {/* Flocons (énergie glace) */}
        <text className={animated ? "f8sp" : ""} x="38" y="48" fontSize="12" fill="#B8E3F0">❄</text>
        <text className={animated ? "f8sp" : ""} x="98" y="42" fontSize="9" fill="#B8E3F0">❄</text>
        {/* Petit cou de cygne courbé + tête en haut */}
        <path d="M75 58 Q70 44 78 36 Q84 32 88 38" stroke="#E8F4FA" strokeWidth="11" fill="none" strokeLinecap="round" />
        <circle cx="88" cy="38" r="9" fill="#F5FBFD" />
        {/* Petit bec orange */}
        <path d="M95 38 l8 -2 l-7 5 Z" fill="#FF9B3C" />
        <circle cx="90" cy="36" r="1.8" fill="#1A1A2E" />
        {/* Corps rond duveteux */}
        <ellipse cx="72" cy="90" rx="34" ry="34" fill="url(#f8b)" filter="url(#f8s)" />
        <ellipse cx="72" cy="96" rx="19" ry="17" fill="#fff" opacity=".5" />
        {/* Aile stylisée */}
        <path d="M50 86 Q42 92 46 102 Q56 96 60 100 Q58 90 50 86 Z" fill="#D4EEF7" />
        <ellipse cx="62" cy="78" rx="7" ry="5" fill="rgba(255,255,255,.6)" transform="rotate(-20 62 78)" />
        {/* Yeux */}
        <ellipse cx="62" cy="88" rx="6" ry={eyeRy} fill="#fff" stroke="#E0EEF5" /><ellipse cx="82" cy="88" rx="6" ry={eyeRy} fill="#fff" stroke="#E0EEF5" />
        <circle cx="63" cy="90" r="4" fill="#1A1A2E" /><circle cx="83" cy="90" r="4" fill="#1A1A2E" />
        <circle cx="64.5" cy="88" r="1.5" fill="#fff" /><circle cx="84.5" cy="88" r="1.5" fill="#fff" />
        {genre === "f" && <><path d="M54 81 l3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /><path d="M90 81 l-3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /></>}
        <circle cx="52" cy="98" r="5" fill="#A5D8E8" opacity=".5" /><circle cx="92" cy="98" r="5" fill="#A5D8E8" opacity=".5" />
        <path d="M66 102 Q72 106 78 102" stroke="#1A1A2E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 9. FLORITI 🇲🇽 — inspiré axolotl (branchies + sourire), énergie Volcan (orange-rouge)
function JK_Floriti({ size = 190, genre = "n", animated = true }) {
  const eyeRy = genre === "f" ? 9 : genre === "m" ? 7 : 8;
  return (
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      <defs>
        <radialGradient id="x9b" cx="42%" cy="36%"><stop offset="0%" stopColor="#FFAE8F" /><stop offset="100%" stopColor="#FF6F3C" /></radialGradient>
        <filter id="x9s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#FF6F3C" floodOpacity=".3" /></filter>
        {animated && <style>{`@keyframes x9f{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes x9g{0%,100%{transform:rotate(0)}50%{transform:rotate(5deg)}}.x9f{animation:x9f 3.4s ease-in-out infinite}.x9gl{animation:x9g 2.6s ease-in-out infinite;transform-origin:46px 70px}.x9gr{animation:x9g 2.6s ease-in-out infinite reverse;transform-origin:104px 70px}`}</style>}
      </defs>
      <g className={animated ? "x9f" : ""}>
        <ellipse cx="75" cy="146" rx="26" ry="6" fill="rgba(0,0,0,.1)" />
        {/* Branchies plumeuses d'axolotl (3 de chaque côté) */}
        <g className={animated ? "x9gl" : ""}>
          <path d="M48 68 Q34 60 28 64 Q36 66 32 72" stroke="#FF4D6D" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M48 74 Q32 72 26 78 Q36 78 34 84" stroke="#FF4D6D" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M48 80 Q34 84 30 90 Q38 86 38 92" stroke="#FF4D6D" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
        <g className={animated ? "x9gr" : ""}>
          <path d="M102 68 Q116 60 122 64 Q114 66 118 72" stroke="#FF4D6D" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M102 74 Q118 72 124 78 Q114 78 116 84" stroke="#FF4D6D" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M102 80 Q116 84 120 90 Q112 86 112 92" stroke="#FF4D6D" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
        {/* Petite éruption (énergie volcan) */}
        <path d="M70 44 Q67 32 75 26 Q73 36 80 34 Q78 42 75 44 Z" fill="#FFD93D" opacity=".9" />
        {/* Corps rond */}
        <ellipse cx="75" cy="84" rx="33" ry="36" fill="url(#x9b)" filter="url(#x9s)" />
        <ellipse cx="75" cy="92" rx="18" ry="16" fill="#fff" opacity=".4" />
        <ellipse cx="63" cy="68" rx="8" ry="5" fill="rgba(255,255,255,.45)" transform="rotate(-20 63 68)" />
        {/* Yeux points mignons (axolotl a de petits yeux) */}
        <circle cx="64" cy="82" r="3.5" fill="#1A1A2E" /><circle cx="86" cy="82" r="3.5" fill="#1A1A2E" />
        <circle cx="65" cy="81" r="1.2" fill="#fff" /><circle cx="87" cy="81" r="1.2" fill="#fff" />
        {genre === "f" && <><path d="M58 76 l4 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /><path d="M92 76 l-4 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /></>}
        <circle cx="54" cy="90" r="6" fill="#FF4D6D" opacity=".4" /><circle cx="96" cy="90" r="6" fill="#FF4D6D" opacity=".4" />
        {/* Grand sourire typique de l'axolotl */}
        <path d="M60 92 Q75 104 90 92" stroke="#1A1A2E" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {/* Petits pieds */}
        <ellipse cx="63" cy="118" rx="8" ry="5" fill="#FF6F3C" /><ellipse cx="87" cy="118" rx="8" ry="5" fill="#FF6F3C" />
      </g>
    </svg>
  );
}

// 10. AMINKI 🇩🇿 — inspiré dromadaire (bosse + long cou), énergie Sable (doré clair)
function JK_Aminki({ size = 190, genre = "n", animated = true }) {
  const eyeRy = genre === "f" ? 9 : genre === "m" ? 7 : 8;
  return (
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      <defs>
        <radialGradient id="a10b" cx="42%" cy="36%"><stop offset="0%" stopColor="#F2DCA8" /><stop offset="100%" stopColor="#D9B068" /></radialGradient>
        <filter id="a10s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#D9B068" floodOpacity=".3" /></filter>
        {animated && <style>{`@keyframes a10f{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}@keyframes a10n{0%,100%{transform:rotate(0)}50%{transform:rotate(-3deg)}}.a10f{animation:a10f 3.6s ease-in-out infinite}.a10n{animation:a10n 3.5s ease-in-out infinite;transform-origin:78px 64px}`}</style>}
      </defs>
      <g className={animated ? "a10f" : ""}>
        <ellipse cx="75" cy="146" rx="27" ry="6" fill="rgba(0,0,0,.1)" />
        {/* Bosse de dromadaire */}
        <path d="M58 70 Q62 50 75 50 Q88 50 92 70 Z" fill="#C99A4E" />
        {/* Petite tête + cou */}
        <g className={animated ? "a10n" : ""}>
          <path d="M82 72 Q88 58 86 48" stroke="#E0C078" strokeWidth="10" fill="none" strokeLinecap="round" />
          <ellipse cx="86" cy="44" rx="8" ry="7" fill="#E8CB8A" />
          <circle cx="89" cy="43" r="1.6" fill="#1A1A2E" />
          {/* museau */}
          <ellipse cx="92" cy="47" rx="4" ry="3" fill="#D9B068" />
        </g>
        {/* Grains de sable (énergie) */}
        <circle cx="40" cy="58" r="2" fill="#E8CB8A" /><circle cx="46" cy="50" r="1.5" fill="#E8CB8A" />
        {/* Corps */}
        <ellipse cx="72" cy="90" rx="34" ry="33" fill="url(#a10b)" filter="url(#a10s)" />
        <ellipse cx="72" cy="96" rx="19" ry="16" fill="#fff" opacity=".35" />
        <ellipse cx="60" cy="76" rx="8" ry="5" fill="rgba(255,255,255,.4)" transform="rotate(-20 60 76)" />
        {/* Yeux avec longs cils (dromadaire) */}
        <ellipse cx="62" cy="88" rx="6" ry={eyeRy} fill="#fff" /><ellipse cx="82" cy="88" rx="6" ry={eyeRy} fill="#fff" />
        <circle cx="63" cy="90" r="4" fill="#1A1A2E" /><circle cx="83" cy="90" r="4" fill="#1A1A2E" />
        <circle cx="64.5" cy="88" r="1.5" fill="#fff" /><circle cx="84.5" cy="88" r="1.5" fill="#fff" />
        {/* longs cils caractéristiques pour tous */}
        <path d="M56 82 l-3 -2 M60 80 l-1 -3 M84 80 l1 -3 M88 82 l3 -2" stroke="#1A1A2E" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="52" cy="98" r="5" fill="#C99A4E" opacity=".4" /><circle cx="92" cy="98" r="5" fill="#C99A4E" opacity=".4" />
        <path d="M66 102 Q72 106 78 102" stroke="#1A1A2E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Pieds */}
        <ellipse cx="62" cy="120" rx="8" ry="5" fill="#D9B068" /><ellipse cx="84" cy="120" rx="8" ry="5" fill="#D9B068" />
      </g>
    </svg>
  );
}

// ── LOT 3 — Jokis style Pokémon (niv 11-15) ──

// 11. SPARKI 🇬🇧 — inspiré bouledogue (face plate + bajoues + petites oreilles), énergie Étoile (violet)
function JK_Sparki({ size = 190, genre = "n", animated = true }) {
  const eyeRy = genre === "f" ? 9 : genre === "m" ? 7 : 8;
  return (
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      <defs>
        <radialGradient id="s11b" cx="42%" cy="36%"><stop offset="0%" stopColor="#C9A5F5" /><stop offset="100%" stopColor="#8B4DD8" /></radialGradient>
        <filter id="s11s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#8B4DD8" floodOpacity=".35" /></filter>
        {animated && <style>{`@keyframes s11f{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes s11g{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}.s11f{animation:s11f 3.4s ease-in-out infinite}.s11st{animation:s11g 2s ease-in-out infinite;transform-origin:75px 36px}`}</style>}
      </defs>
      <g className={animated ? "s11f" : ""}>
        <ellipse cx="75" cy="146" rx="27" ry="6" fill="rgba(0,0,0,.1)" />
        {/* Étoile (énergie) */}
        <g className={animated ? "s11st" : ""}><path d="M75 26 l3 7 l8 0 l-6 5 l2 8 l-7 -4 l-7 4 l2 -8 l-6 -5 l8 0 Z" fill="#FFD93D" stroke="#F5B800" strokeWidth="1" /></g>
        {/* Petites oreilles tombantes de bouledogue */}
        <path d="M48 60 Q40 58 40 70 Q48 70 52 64 Z" fill="#7A3DC4" />
        <path d="M102 60 Q110 58 110 70 Q102 70 98 64 Z" fill="#7A3DC4" />
        {/* Tête large (bouledogue) */}
        <ellipse cx="75" cy="86" rx="37" ry="34" fill="url(#s11b)" filter="url(#s11s)" />
        <ellipse cx="75" cy="94" rx="20" ry="16" fill="#fff" opacity=".35" />
        <ellipse cx="62" cy="70" rx="8" ry="5" fill="rgba(255,255,255,.4)" transform="rotate(-20 62 70)" />
        {/* Plis caractéristiques du front */}
        <path d="M68 64 Q75 60 82 64" stroke="#7A3DC4" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".6" />
        {/* Yeux */}
        <ellipse cx="63" cy="82" rx="6" ry={eyeRy} fill="#fff" /><ellipse cx="87" cy="82" rx="6" ry={eyeRy} fill="#fff" />
        <circle cx="64" cy="84" r="4" fill="#1A1A2E" /><circle cx="88" cy="84" r="4" fill="#1A1A2E" />
        <circle cx="65.5" cy="82" r="1.5" fill="#fff" /><circle cx="89.5" cy="82" r="1.5" fill="#fff" />
        {genre === "f" && <><path d="M55 75 l3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /><path d="M95 75 l-3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /></>}
        <circle cx="53" cy="92" r="5" fill="#A569E0" opacity=".5" /><circle cx="97" cy="92" r="5" fill="#A569E0" opacity=".5" />
        {/* Museau plat + bajoues de bouledogue */}
        <ellipse cx="75" cy="96" rx="14" ry="10" fill="#B88BE8" opacity=".5" />
        <ellipse cx="75" cy="93" rx="3.5" ry="2.6" fill="#1A1A2E" />
        <path d="M75 96 L75 100 M75 100 Q70 103 66 101 M75 100 Q80 103 84 101" stroke="#1A1A2E" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* petites dents du bas (bouledogue) */}
        <rect x="71" y="101" width="3" height="3" rx="1" fill="#fff" /><rect x="76" y="101" width="3" height="3" rx="1" fill="#fff" />
      </g>
    </svg>
  );
}

// 12. MATIKI 🇺🇾 — inspiré capybara (museau carré placide), énergie Arc-en-ciel (multicolore doux)
function JK_Matiki({ size = 190, genre = "n", animated = true }) {
  const eyeRy = genre === "f" ? 9 : genre === "m" ? 7 : 8;
  return (
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      <defs>
        <radialGradient id="m12b" cx="42%" cy="36%"><stop offset="0%" stopColor="#D9A878" /><stop offset="100%" stopColor="#A9744A" /></radialGradient>
        <filter id="m12s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#A9744A" floodOpacity=".3" /></filter>
        {animated && <style>{`@keyframes m12f{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}@keyframes m12r{0%,100%{opacity:.7}50%{opacity:1}}.m12f{animation:m12f 3.6s ease-in-out infinite}.m12rb{animation:m12r 3s ease-in-out infinite}`}</style>}
      </defs>
      <g className={animated ? "m12f" : ""}>
        <ellipse cx="75" cy="146" rx="27" ry="6" fill="rgba(0,0,0,.1)" />
        {/* Arc-en-ciel (énergie) au-dessus */}
        <g className={animated ? "m12rb" : ""} fill="none" strokeWidth="3" strokeLinecap="round">
          <path d="M52 44 Q75 26 98 44" stroke="#FF6B6B" /><path d="M56 46 Q75 31 94 46" stroke="#FFD93D" /><path d="M60 48 Q75 36 90 48" stroke="#6BCB77" /><path d="M64 50 Q75 41 86 50" stroke="#4D96FF" />
        </g>
        {/* Petites oreilles rondes de capybara */}
        <ellipse cx="54" cy="60" rx="6" ry="5" fill="#8F5E3A" /><ellipse cx="96" cy="60" rx="6" ry="5" fill="#8F5E3A" />
        {/* Tête rectangulaire douce (capybara) */}
        <rect x="42" y="62" width="66" height="58" rx="28" fill="url(#m12b)" filter="url(#m12s)" />
        <ellipse cx="75" cy="96" rx="20" ry="16" fill="#fff" opacity=".3" />
        <ellipse cx="60" cy="74" rx="8" ry="5" fill="rgba(255,255,255,.35)" transform="rotate(-20 60 74)" />
        {/* Yeux placides */}
        <ellipse cx="63" cy="84" rx="5.5" ry={eyeRy} fill="#fff" /><ellipse cx="87" cy="84" rx="5.5" ry={eyeRy} fill="#fff" />
        <circle cx="64" cy="86" r="3.8" fill="#1A1A2E" /><circle cx="88" cy="86" r="3.8" fill="#1A1A2E" />
        <circle cx="65" cy="84" r="1.4" fill="#fff" /><circle cx="89" cy="84" r="1.4" fill="#fff" />
        {genre === "f" && <><path d="M55 78 l3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /><path d="M95 78 l-3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /></>}
        <circle cx="54" cy="94" r="5" fill="#C98A5A" opacity=".4" /><circle cx="96" cy="94" r="5" fill="#C98A5A" opacity=".4" />
        {/* Gros museau carré de capybara */}
        <rect x="64" y="100" width="22" height="16" rx="7" fill="#8F5E3A" />
        <ellipse cx="70" cy="106" rx="2.5" ry="2" fill="#1A1A2E" /><ellipse cx="80" cy="106" rx="2.5" ry="2" fill="#1A1A2E" />
        <path d="M75 110 L75 113" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 13. ZORKI 🇷🇺 — inspiré loup (oreilles dressées + museau), énergie Ombre (gris-violet foncé)
function JK_Zorki({ size = 190, genre = "n", animated = true }) {
  const eyeRy = genre === "f" ? 9 : genre === "m" ? 7 : 8;
  return (
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      <defs>
        <radialGradient id="z13b" cx="42%" cy="36%"><stop offset="0%" stopColor="#8088A8" /><stop offset="100%" stopColor="#444A66" /></radialGradient>
        <filter id="z13s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#2A2E44" floodOpacity=".4" /></filter>
        {animated && <style>{`@keyframes z13f{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes z13e{0%,100%{transform:rotate(0)}50%{transform:rotate(-3deg)}}.z13f{animation:z13f 3.4s ease-in-out infinite}.z13el{animation:z13e 3s ease-in-out infinite;transform-origin:56px 50px}.z13er{animation:z13e 3s ease-in-out infinite reverse;transform-origin:94px 50px}`}</style>}
      </defs>
      <g className={animated ? "z13f" : ""}>
        <ellipse cx="75" cy="146" rx="27" ry="6" fill="rgba(0,0,0,.12)" />
        {/* Oreilles dressées pointues de loup */}
        <g className={animated ? "z13el" : ""}><path d="M52 56 L48 30 L68 48 Z" fill="#444A66" /><path d="M53 50 L51 38 L61 47 Z" fill="#6B7390" /></g>
        <g className={animated ? "z13er" : ""}><path d="M98 56 L102 30 L82 48 Z" fill="#444A66" /><path d="M97 50 L99 38 L89 47 Z" fill="#6B7390" /></g>
        {/* Tête */}
        <ellipse cx="75" cy="86" rx="34" ry="36" fill="url(#z13b)" filter="url(#z13s)" />
        <ellipse cx="75" cy="94" rx="18" ry="16" fill="#fff" opacity=".25" />
        <ellipse cx="62" cy="70" rx="8" ry="5" fill="rgba(255,255,255,.3)" transform="rotate(-20 62 70)" />
        {/* Yeux perçants lumineux (dans l'ombre) */}
        <ellipse cx="63" cy="82" rx="6" ry={eyeRy} fill="#fff" /><ellipse cx="87" cy="82" rx="6" ry={eyeRy} fill="#fff" />
        <circle cx="64" cy="84" r="4" fill="#FFD93D" /><circle cx="88" cy="84" r="4" fill="#FFD93D" />
        <circle cx="64" cy="84" r="2" fill="#1A1A2E" /><circle cx="88" cy="84" r="2" fill="#1A1A2E" />
        <path d="M55 75 L65 78" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity=".5" /><path d="M95 75 L85 78" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity=".5" />
        <circle cx="53" cy="92" r="5" fill="#5A6080" opacity=".4" /><circle cx="97" cy="92" r="5" fill="#5A6080" opacity=".4" />
        {/* Museau de loup */}
        <path d="M75 90 L66 102 Q75 108 84 102 Z" fill="#5A6080" />
        <ellipse cx="75" cy="98" rx="3.5" ry="2.6" fill="#1A1A2E" />
        {/* Sourire chaleureux */}
        <path d="M67 103 Q75 110 83 103" stroke="#1A1A2E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {genre === "f" && <><path d="M55 73 l3 -2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /><path d="M95 73 l-3 -2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /></>}
      </g>
    </svg>
  );
}

// 14. BIMAKI 🇮🇩 — inspiré orang-outan (visage plat + touffe rousse), énergie Terre (brun-vert)
function JK_Bimaki({ size = 190, genre = "n", animated = true }) {
  const eyeRy = genre === "f" ? 9 : genre === "m" ? 7 : 8;
  return (
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      <defs>
        <radialGradient id="b14b" cx="42%" cy="36%"><stop offset="0%" stopColor="#D98F4E" /><stop offset="100%" stopColor="#A35A28" /></radialGradient>
        <filter id="b14s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#A35A28" floodOpacity=".3" /></filter>
        {animated && <style>{`@keyframes b14f{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes b14h{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.08)}}.b14f{animation:b14f 3.5s ease-in-out infinite}.b14hr{animation:b14h 3s ease-in-out infinite;transform-origin:75px 50px}`}</style>}
      </defs>
      <g className={animated ? "b14f" : ""}>
        <ellipse cx="75" cy="146" rx="27" ry="6" fill="rgba(0,0,0,.1)" />
        {/* Touffe rousse ébouriffée (orang-outan) */}
        <g className={animated ? "b14hr" : ""}><path d="M50 56 Q48 38 58 36 Q56 46 62 48 M75 50 Q73 32 75 30 Q77 32 75 50 M100 56 Q102 38 92 36 Q94 46 88 48" stroke="#C26A2E" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
        {/* Feuille (énergie terre/nature) */}
        <path d="M58 44 Q52 38 54 32 Q60 36 58 44 Z" fill="#6BCB77" />
        {/* Grandes oreilles plates */}
        <circle cx="44" cy="80" r="9" fill="#A35A28" /><circle cx="44" cy="80" r="4" fill="#C98A5A" />
        <circle cx="106" cy="80" r="9" fill="#A35A28" /><circle cx="106" cy="80" r="4" fill="#C98A5A" />
        {/* Tête */}
        <ellipse cx="75" cy="86" rx="34" ry="36" fill="url(#b14b)" filter="url(#b14s)" />
        {/* Disque facial plat clair (caractéristique orang-outan) */}
        <ellipse cx="75" cy="92" rx="24" ry="26" fill="#E8B583" opacity=".55" />
        <ellipse cx="62" cy="70" rx="7" ry="5" fill="rgba(255,255,255,.35)" transform="rotate(-20 62 70)" />
        {/* Yeux rapprochés */}
        <ellipse cx="66" cy="84" rx="5.5" ry={eyeRy} fill="#fff" /><ellipse cx="84" cy="84" rx="5.5" ry={eyeRy} fill="#fff" />
        <circle cx="67" cy="86" r="3.8" fill="#1A1A2E" /><circle cx="85" cy="86" r="3.8" fill="#1A1A2E" />
        <circle cx="68" cy="84" r="1.4" fill="#fff" /><circle cx="86" cy="84" r="1.4" fill="#fff" />
        {genre === "f" && <><path d="M59 78 l3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /><path d="M91 78 l-3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /></>}
        <circle cx="56" cy="94" r="5" fill="#C26A2E" opacity=".4" /><circle cx="94" cy="94" r="5" fill="#C26A2E" opacity=".4" />
        {/* Museau */}
        <ellipse cx="75" cy="98" rx="10" ry="8" fill="#D9A878" opacity=".7" />
        <ellipse cx="71" cy="98" rx="2" ry="1.6" fill="#1A1A2E" /><ellipse cx="79" cy="98" rx="2" ry="1.6" fill="#1A1A2E" />
        <path d="M68 104 Q75 109 82 104" stroke="#1A1A2E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 15. SHAMKI (Daghestan) — inspiré bouquetin (grandes cornes recourbées), énergie Montagne (gris-bleu pierre)
function JK_Shamki({ size = 190, genre = "n", animated = true }) {
  const eyeRy = genre === "f" ? 9 : genre === "m" ? 7 : 8;
  return (
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      <defs>
        <radialGradient id="sh15b" cx="42%" cy="36%"><stop offset="0%" stopColor="#A8B0C0" /><stop offset="100%" stopColor="#6B7488" /></radialGradient>
        <filter id="sh15s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#4A5266" floodOpacity=".35" /></filter>
        {animated && <style>{`@keyframes sh15f{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}.sh15f{animation:sh15f 3.5s ease-in-out infinite}`}</style>}
      </defs>
      <g className={animated ? "sh15f" : ""}>
        <ellipse cx="75" cy="146" rx="27" ry="6" fill="rgba(0,0,0,.12)" />
        {/* Grandes cornes recourbées de bouquetin */}
        <path d="M58 56 Q44 48 40 30 Q38 18 46 16 Q44 26 50 38 Q54 48 62 52 Z" fill="#8A7A5C" />
        <path d="M44 24 q-1 4 1 8 M46 34 q-1 3 1 7" stroke="#6B5E44" strokeWidth="1.5" fill="none" />
        <path d="M92 56 Q106 48 110 30 Q112 18 104 16 Q106 26 100 38 Q96 48 88 52 Z" fill="#8A7A5C" />
        <path d="M106 24 q1 4 -1 8 M104 34 q1 3 -1 7" stroke="#6B5E44" strokeWidth="1.5" fill="none" />
        {/* Montagne (énergie) petit pic sur le front */}
        <path d="M68 50 L75 38 L82 50 Z" fill="#E8EEF5" opacity=".8" /><path d="M72 44 L75 38 L78 44 Z" fill="#fff" />
        {/* Petites oreilles latérales */}
        <ellipse cx="48" cy="68" rx="7" ry="4" fill="#5A6276" transform="rotate(-20 48 68)" />
        <ellipse cx="102" cy="68" rx="7" ry="4" fill="#5A6276" transform="rotate(20 102 68)" />
        {/* Tête */}
        <ellipse cx="75" cy="88" rx="33" ry="34" fill="url(#sh15b)" filter="url(#sh15s)" />
        <ellipse cx="75" cy="96" rx="18" ry="15" fill="#fff" opacity=".3" />
        <ellipse cx="62" cy="74" rx="8" ry="5" fill="rgba(255,255,255,.35)" transform="rotate(-20 62 74)" />
        {/* Yeux */}
        <ellipse cx="63" cy="86" rx="6" ry={eyeRy} fill="#fff" /><ellipse cx="87" cy="86" rx="6" ry={eyeRy} fill="#fff" />
        <circle cx="64" cy="88" r="4" fill="#1A1A2E" /><circle cx="88" cy="88" r="4" fill="#1A1A2E" />
        <circle cx="65.5" cy="86" r="1.5" fill="#fff" /><circle cx="89.5" cy="86" r="1.5" fill="#fff" />
        {genre === "f" && <><path d="M55 79 l3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /><path d="M95 79 l-3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /></>}
        <circle cx="53" cy="96" r="5" fill="#828AA0" opacity=".4" /><circle cx="97" cy="96" r="5" fill="#828AA0" opacity=".4" />
        {/* Museau + petite barbiche de bouquetin */}
        <ellipse cx="75" cy="98" rx="9" ry="7" fill="#8A92A6" opacity=".6" />
        <ellipse cx="75" cy="96" rx="3" ry="2.4" fill="#1A1A2E" />
        <path d="M68 102 Q75 106 82 102" stroke="#1A1A2E" strokeWidth="1.7" fill="none" strokeLinecap="round" />
        <path d="M73 110 Q75 118 77 110" fill="#5A6276" />
      </g>
    </svg>
  );
}

// ── LOT 4 — Jokis style Pokémon (niv 16-20) — LE GRAND FINAL ──

// 16. LUCIO 🇮🇹 — inspiré chat (oreilles triangulaires + moustaches), énergie Soleil Chaud (orange doré)
function JK_Lucio({ size = 190, genre = "n", animated = true }) {
  const eyeRy = genre === "f" ? 9 : genre === "m" ? 7 : 8;
  return (
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      <defs>
        <radialGradient id="l16b" cx="42%" cy="36%"><stop offset="0%" stopColor="#FFC97A" /><stop offset="100%" stopColor="#F58A1F" /></radialGradient>
        <filter id="l16s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#F58A1F" floodOpacity=".3" /></filter>
        {animated && <style>{`@keyframes l16f{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes l16e{0%,100%{transform:rotate(0)}50%{transform:rotate(-4deg)}}.l16f{animation:l16f 3.4s ease-in-out infinite}.l16el{animation:l16e 3.5s ease-in-out infinite;transform-origin:55px 50px}.l16er{animation:l16e 3.5s ease-in-out infinite reverse;transform-origin:95px 50px}`}</style>}
      </defs>
      <g className={animated ? "l16f" : ""}>
        <ellipse cx="75" cy="146" rx="27" ry="6" fill="rgba(0,0,0,.1)" />
        {/* Oreilles triangulaires de chat */}
        <g className={animated ? "l16el" : ""}><path d="M52 56 L46 32 L68 50 Z" fill="#F58A1F" /><path d="M53 50 L50 40 L61 49 Z" fill="#FFD4A0" /></g>
        <g className={animated ? "l16er" : ""}><path d="M98 56 L104 32 L82 50 Z" fill="#F58A1F" /><path d="M97 50 L100 40 L89 49 Z" fill="#FFD4A0" /></g>
        {/* Petit soleil (énergie) au front */}
        <circle cx="75" cy="42" r="6" fill="#FFD93D" />{[0,45,90,135,180,225,270,315].map((d,i)=><line key={i} x1={75+Math.cos(d*Math.PI/180)*8} y1={42+Math.sin(d*Math.PI/180)*8} x2={75+Math.cos(d*Math.PI/180)*11} y2={42+Math.sin(d*Math.PI/180)*11} stroke="#FFD93D" strokeWidth="2" strokeLinecap="round" />)}
        {/* Tête */}
        <ellipse cx="75" cy="86" rx="33" ry="35" fill="url(#l16b)" filter="url(#l16s)" />
        <ellipse cx="75" cy="94" rx="18" ry="15" fill="#fff" opacity=".35" />
        <ellipse cx="62" cy="70" rx="8" ry="5" fill="rgba(255,255,255,.4)" transform="rotate(-20 62 70)" />
        {/* Yeux de chat */}
        <ellipse cx="63" cy="82" rx="6" ry={eyeRy} fill="#fff" /><ellipse cx="87" cy="82" rx="6" ry={eyeRy} fill="#fff" />
        <ellipse cx="64" cy="84" rx="2.6" ry="4.5" fill="#1A1A2E" /><ellipse cx="88" cy="84" rx="2.6" ry="4.5" fill="#1A1A2E" />
        <circle cx="65.5" cy="82" r="1.4" fill="#fff" /><circle cx="89.5" cy="82" r="1.4" fill="#fff" />
        {genre === "f" && <><path d="M55 75 l3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /><path d="M95 75 l-3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /></>}
        <circle cx="53" cy="92" r="5" fill="#FF8C42" opacity=".4" /><circle cx="97" cy="92" r="5" fill="#FF8C42" opacity=".4" />
        {/* Museau de chat + moustaches */}
        <path d="M70 92 L75 96 L80 92" fill="none" stroke="#1A1A2E" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M75 96 L75 99 M75 99 Q71 102 68 101 M75 99 Q79 102 82 101" stroke="#1A1A2E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M62 94 L48 92 M62 97 L49 99 M88 94 L102 92 M88 97 L101 99" stroke="#1A1A2E" strokeWidth="1" strokeLinecap="round" opacity=".5" />
      </g>
    </svg>
  );
}

// 17. OMARI 🇸🇦 — inspiré cheval (crinière + couronne), énergie Or (doré brillant)
function JK_Omari({ size = 190, genre = "n", animated = true }) {
  const eyeRy = genre === "f" ? 9 : genre === "m" ? 7 : 8;
  return (
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      <defs>
        <radialGradient id="o17b" cx="42%" cy="36%"><stop offset="0%" stopColor="#FFE9A8" /><stop offset="100%" stopColor="#E8B829" /></radialGradient>
        <linearGradient id="o17g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFF4C2" /><stop offset="100%" stopColor="#F5C842" /></linearGradient>
        <filter id="o17s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#E8B829" floodOpacity=".4" /></filter>
        {animated && <style>{`@keyframes o17f{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes o17m{0%,100%{transform:translateX(0)}50%{transform:translateX(-2px)}}@keyframes o17sp{0%,100%{opacity:.5}50%{opacity:1}}.o17f{animation:o17f 3.4s ease-in-out infinite}.o17ma{animation:o17m 3s ease-in-out infinite}.o17spk{animation:o17sp 2s ease-in-out infinite}`}</style>}
      </defs>
      <g className={animated ? "o17f" : ""}>
        <ellipse cx="75" cy="146" rx="27" ry="6" fill="rgba(0,0,0,.12)" />
        {/* Éclats dorés (énergie Or) */}
        <text className={animated ? "o17spk" : ""} x="36" y="50" fontSize="11" fill="#FFD93D">✦</text>
        <text className={animated ? "o17spk" : ""} x="100" y="46" fontSize="9" fill="#FFD93D">✦</text>
        {/* Crinière flottante */}
        <g className={animated ? "o17ma" : ""}><path d="M54 54 Q44 60 48 74 Q42 70 44 84 Q40 80 44 92" stroke="#C99A1E" strokeWidth="6" fill="none" strokeLinecap="round" /></g>
        {/* Oreilles de cheval */}
        <path d="M58 54 L54 38 L66 50 Z" fill="#E8B829" /><path d="M92 54 L96 38 L84 50 Z" fill="#E8B829" />
        {/* Couronne dorée */}
        <path d="M62 44 L66 34 L71 42 L75 30 L79 42 L84 34 L88 44 Z" fill="url(#o17g)" stroke="#D4A017" strokeWidth="1" />
        <circle cx="75" cy="33" r="2.4" fill="#FF6B6B" />
        {/* Tête allongée (cheval) */}
        <ellipse cx="75" cy="84" rx="31" ry="35" fill="url(#o17b)" filter="url(#o17s)" />
        <path d="M64 100 Q75 124 86 100 Q80 114 75 114 Q70 114 64 100 Z" fill="url(#o17b)" />
        <ellipse cx="75" cy="92" rx="17" ry="15" fill="#fff" opacity=".4" />
        <ellipse cx="63" cy="70" rx="8" ry="5" fill="rgba(255,255,255,.45)" transform="rotate(-20 63 70)" />
        {/* Yeux */}
        <ellipse cx="63" cy="82" rx="6" ry={eyeRy} fill="#fff" /><ellipse cx="87" cy="82" rx="6" ry={eyeRy} fill="#fff" />
        <circle cx="64" cy="84" r="4" fill="#1A1A2E" /><circle cx="88" cy="84" r="4" fill="#1A1A2E" />
        <circle cx="65.5" cy="82" r="1.5" fill="#fff" /><circle cx="89.5" cy="82" r="1.5" fill="#fff" />
        {genre === "f" && <><path d="M55 75 l3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /><path d="M95 75 l-3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /></>}
        <circle cx="54" cy="92" r="5" fill="#F5C842" opacity=".5" /><circle cx="96" cy="92" r="5" fill="#F5C842" opacity=".5" />
        {/* Naseaux + sourire */}
        <ellipse cx="70" cy="106" rx="2" ry="2.6" fill="#1A1A2E" opacity=".6" /><ellipse cx="80" cy="106" rx="2" ry="2.6" fill="#1A1A2E" opacity=".6" />
        <path d="M69 100 Q75 104 81 100" stroke="#1A1A2E" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 18. WELKI 🇩🇪 — inspiré sanglier (défenses + groin + crête), énergie Foudre (gris + éclair)
function JK_Welki({ size = 190, genre = "n", animated = true }) {
  const eyeRy = genre === "f" ? 9 : genre === "m" ? 7 : 8;
  return (
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      <defs>
        <radialGradient id="w18b" cx="42%" cy="36%"><stop offset="0%" stopColor="#8A95B0" /><stop offset="100%" stopColor="#525C78" /></radialGradient>
        <filter id="w18s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#3A4258" floodOpacity=".35" /></filter>
        {animated && <style>{`@keyframes w18f{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes w18z{0%,100%{opacity:.7;transform:scale(1)}50%{opacity:1;transform:scale(1.12)}}.w18f{animation:w18f 3.3s ease-in-out infinite}.w18zp{animation:w18z 1.3s infinite;transform-origin:75px 38px}`}</style>}
      </defs>
      <g className={animated ? "w18f" : ""}>
        <ellipse cx="75" cy="146" rx="27" ry="6" fill="rgba(0,0,0,.12)" />
        {/* Éclair (énergie foudre) */}
        <g className={animated ? "w18zp" : ""}><path d="M73 50 L68 30 L75 42 L73 24 L82 40 L78 50 Z" fill="#FFD93D" stroke="#F5B800" strokeWidth="1" /></g>
        {/* Crête hérissée de sanglier */}
        <path d="M60 52 L62 40 L66 50 M70 50 L72 36 L76 50 M80 50 L84 40 L86 52" stroke="#3A4258" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Oreilles */}
        <path d="M52 60 L48 48 L62 56 Z" fill="#525C78" /><path d="M98 60 L102 48 L88 56 Z" fill="#525C78" />
        {/* Tête massive */}
        <ellipse cx="75" cy="88" rx="34" ry="34" fill="url(#w18b)" filter="url(#w18s)" />
        <ellipse cx="75" cy="96" rx="18" ry="14" fill="#fff" opacity=".3" />
        <ellipse cx="62" cy="74" rx="8" ry="5" fill="rgba(255,255,255,.35)" transform="rotate(-20 62 74)" />
        {/* Yeux */}
        <ellipse cx="63" cy="84" rx="6" ry={eyeRy} fill="#fff" /><ellipse cx="87" cy="84" rx="6" ry={eyeRy} fill="#fff" />
        <circle cx="64" cy="86" r="4" fill="#1A1A2E" /><circle cx="88" cy="86" r="4" fill="#1A1A2E" />
        <circle cx="65.5" cy="84" r="1.5" fill="#fff" /><circle cx="89.5" cy="84" r="1.5" fill="#fff" />
        <path d="M55 77 L65 80" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity=".5" /><path d="M95 77 L85 80" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity=".5" />
        <circle cx="53" cy="94" r="5" fill="#6B7390" opacity=".4" /><circle cx="97" cy="94" r="5" fill="#6B7390" opacity=".4" />
        {/* Groin de sanglier */}
        <ellipse cx="75" cy="100" rx="11" ry="8" fill="#6B7390" />
        <ellipse cx="71" cy="100" rx="2" ry="2.6" fill="#1A1A2E" /><ellipse cx="79" cy="100" rx="2" ry="2.6" fill="#1A1A2E" />
        {/* Défenses */}
        <path d="M67 106 Q63 112 66 116" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M83 106 Q87 112 84 116" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 19. KREOLI 🌋 — inspiré gecko (yeux globuleux + crête + doigts), énergie Lave (rouge ardent)
function JK_Kreoli({ size = 190, genre = "n", animated = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      <defs>
        <radialGradient id="k19b" cx="42%" cy="36%"><stop offset="0%" stopColor="#FF7A4D" /><stop offset="100%" stopColor="#E8341C" /></radialGradient>
        <filter id="k19s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#E8341C" floodOpacity=".35" /></filter>
        {animated && <style>{`@keyframes k19f{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes k19g{0%,100%{opacity:.8}50%{opacity:1}}.k19f{animation:k19f 3.4s ease-in-out infinite}.k19gl{animation:k19g 1.8s ease-in-out infinite}`}</style>}
      </defs>
      <g className={animated ? "k19f" : ""}>
        <ellipse cx="75" cy="146" rx="27" ry="6" fill="rgba(0,0,0,.1)" />
        {/* Lave qui jaillit (énergie) */}
        <g className={animated ? "k19gl" : ""}><path d="M68 46 Q65 32 75 24 Q73 36 81 32 Q79 42 75 46 Z" fill="#FFD93D" /><circle cx="62" cy="40" r="2.5" fill="#FF9B3C" /><circle cx="88" cy="38" r="2" fill="#FF9B3C" /></g>
        {/* Crête dorsale de gecko */}
        <path d="M62 52 L64 44 L67 52 M71 50 L74 42 L77 50 M81 52 L84 44 L86 52" stroke="#B82610" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Tête large de gecko */}
        <ellipse cx="75" cy="86" rx="35" ry="33" fill="url(#k19b)" filter="url(#k19s)" />
        <ellipse cx="75" cy="94" rx="19" ry="14" fill="#fff" opacity=".3" />
        {/* Taches de lave */}
        <circle cx="58" cy="80" r="3" fill="#FFD93D" opacity=".6" /><circle cx="92" cy="82" r="2.5" fill="#FFD93D" opacity=".6" /><circle cx="84" cy="70" r="2" fill="#FFD93D" opacity=".5" />
        {/* Gros yeux globuleux de gecko (sur les côtés) */}
        <circle cx="56" cy="74" r="11" fill="url(#k19b)" /><circle cx="94" cy="74" r="11" fill="url(#k19b)" />
        <circle cx="56" cy="74" r="8" fill="#FFD93D" /><circle cx="94" cy="74" r="8" fill="#FFD93D" />
        <ellipse cx="56" cy="74" rx="3" ry="7" fill="#1A1A2E" /><ellipse cx="94" cy="74" rx="3" ry="7" fill="#1A1A2E" />
        <circle cx="58" cy="71" r="1.6" fill="#fff" /><circle cx="96" cy="71" r="1.6" fill="#fff" />
        <circle cx="56" cy="90" r="4" fill="#FFD93D" opacity=".4" /><circle cx="94" cy="90" r="4" fill="#FFD93D" opacity=".4" />
        {/* Large sourire de gecko */}
        <path d="M60 94 Q75 106 90 94" stroke="#1A1A2E" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {/* Doigts collants caractéristiques */}
        <g stroke="#E8341C" strokeWidth="5" strokeLinecap="round"><path d="M52 116 l-4 6" /><path d="M60 118 l-1 7" /><path d="M90 118 l1 7" /><path d="M98 116 l4 6" /></g>
        <circle cx="48" cy="122" r="3.5" fill="#FF7A4D" /><circle cx="59" cy="125" r="3.5" fill="#FF7A4D" /><circle cx="91" cy="125" r="3.5" fill="#FF7A4D" /><circle cx="102" cy="122" r="3.5" fill="#FF7A4D" />
      </g>
    </svg>
  );
}

// 20. LUMIO 🇫🇷 — inspiré coq (crête + caroncule), énergie Lumière Pure (blanc lumineux) — LE FINAL
function JK_Lumio({ size = 190, genre = "n", animated = true }) {
  const eyeRy = genre === "f" ? 9 : genre === "m" ? 7 : 8;
  return (
    <svg width={size} height={size} viewBox="0 0 150 160" fill="none">
      <defs>
        <radialGradient id="lu20b" cx="42%" cy="34%"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#E8E2FF" /></radialGradient>
        <filter id="lu20s" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#C9B8FF" floodOpacity=".5" /></filter>
        {animated && <style>{`@keyframes lu20f{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}@keyframes lu20r{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:.8;transform:scale(1.08)}}@keyframes lu20p{0%{opacity:0;transform:translateY(0) scale(0)}50%{opacity:1}100%{opacity:0;transform:translateY(-14px) scale(1)}}.lu20f{animation:lu20f 3.6s ease-in-out infinite}.lu20ray{animation:lu20r 3s ease-in-out infinite;transform-origin:75px 84px}.lu20pt{animation:lu20p 2.5s ease-in-out infinite}`}</style>}
      </defs>
      {/* Halo de lumière pure (le Joki ultime) */}
      <circle className={animated ? "lu20ray" : ""} cx="75" cy="84" r="58" fill="#FFF8D6" opacity=".4" />
      {[0,40,80,120,160,200,240,280,320].map((d,i)=><line key={i} x1={75+Math.cos(d*Math.PI/180)*48} y1={84+Math.sin(d*Math.PI/180)*48} x2={75+Math.cos(d*Math.PI/180)*58} y2={84+Math.sin(d*Math.PI/180)*58} stroke="#FFE98A" strokeWidth="2.5" strokeLinecap="round" opacity=".6" />)}
      <g className={animated ? "lu20f" : ""}>
        <ellipse cx="75" cy="146" rx="27" ry="6" fill="rgba(0,0,0,.08)" />
        {/* Crête de coq (rouge) */}
        <path d="M64 50 Q62 36 68 38 Q70 30 75 36 Q80 30 82 38 Q88 36 86 50 Z" fill="#FF4D4D" />
        {/* Particules de lumière */}
        <text className={animated ? "lu20pt" : ""} x="44" y="60" fontSize="9" fill="#FFD93D">✨</text>
        <text className={animated ? "lu20pt" : ""} x="98" y="64" fontSize="8" fill="#FFD93D">✨</text>
        {/* Tête */}
        <ellipse cx="75" cy="86" rx="33" ry="35" fill="url(#lu20b)" filter="url(#lu20s)" />
        <ellipse cx="75" cy="94" rx="18" ry="15" fill="#fff" opacity=".6" />
        <ellipse cx="62" cy="70" rx="8" ry="5" fill="rgba(255,255,255,.7)" transform="rotate(-20 62 70)" />
        {/* Yeux brillants */}
        <ellipse cx="63" cy="82" rx="6" ry={eyeRy} fill="#fff" stroke="#E8E2FF" /><ellipse cx="87" cy="82" rx="6" ry={eyeRy} fill="#fff" stroke="#E8E2FF" />
        <circle cx="64" cy="84" r="4" fill="#1A1A2E" /><circle cx="88" cy="84" r="4" fill="#1A1A2E" />
        <circle cx="65.5" cy="82" r="1.8" fill="#fff" /><circle cx="89.5" cy="82" r="1.8" fill="#fff" />
        {genre === "f" && <><path d="M55 75 l3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /><path d="M95 75 l-3 2" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" /></>}
        <circle cx="53" cy="92" r="5" fill="#FFB6C1" opacity=".5" /><circle cx="97" cy="92" r="5" fill="#FFB6C1" opacity=".5" />
        {/* Bec + caroncule de coq */}
        <path d="M69 90 L62 94 L69 98 Z" fill="#FFB627" />
        <path d="M70 98 Q68 104 71 106" stroke="#FF4D4D" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M70 96 Q75 101 82 96" stroke="#1A1A2E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* petite touche tricolore (clin d'œil France) */}
        <rect x="64" y="118" width="6" height="8" rx="1" fill="#4C7BE8" /><rect x="72" y="118" width="6" height="8" rx="1" fill="#fff" stroke="#E0E0E0" strokeWidth=".5" /><rect x="80" y="118" width="6" height="8" rx="1" fill="#FF4D4D" />
      </g>
    </svg>
  );
}

// Dispatcher : niveau -> Joki animal
const JOKI_BY_LEVEL = {
  1: JK_Chaiti,
  2: JK_Jaiki,
  3: JK_Bayki,
  4: JK_Joaki,
  5: JK_Renki,
  6: JK_Emeki,
  7: JK_Weiki,
  8: JK_Freyki,
  9: JK_Floriti,
  10: JK_Aminki,
  11: JK_Sparki,
  12: JK_Matiki,
  13: JK_Zorki,
  14: JK_Bimaki,
  15: JK_Shamki,
  16: JK_Lucio,
  17: JK_Omari,
  18: JK_Welki,
  19: JK_Kreoli,
  20: JK_Lumio
};

// ── MASCOTTE CHARACTER — aiguille vers le bon Joki animal ──
export function MascotteCharacter({ energy, genre = "n", size = 120, animated = true }) {
  const lvl = energy?.level || 1;
  const Comp = JOKI_BY_LEVEL[lvl] || JOKI_BY_LEVEL[1];
  return <Comp size={size} genre={genre} animated={animated} />;
}

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

// ── JOKI MYSTÈRE — silhouette du prochain Joki à découvrir ──
export function MysteryJoki({ energy, size = 110, animated = true }) {
  // Affiche le Joki en ombre/silhouette, avec son énergie et un halo mystérieux
  const color = energy.color;
  const glow = energy.glow;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <radialGradient id={`myst-${energy.level}`} cx="50%" cy="45%">
          <stop offset="0%" stopColor="#2D2A45"/>
          <stop offset="100%" stopColor="#15131F"/>
        </radialGradient>
        {animated && <style>{`
          @keyframes mystFloat${energy.level}{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
          @keyframes mystGlow${energy.level}{0%,100%{opacity:0.25}50%{opacity:0.5}}
          .myst${energy.level}{animation:mystFloat${energy.level} 3.5s ease-in-out infinite}
          .mystg${energy.level}{animation:mystGlow${energy.level} 2.5s ease-in-out infinite}
        `}</style>}
      </defs>
      {/* Halo coloré de l'énergie */}
      <circle className={animated?`mystg${energy.level}`:""} cx="60" cy="60" r="46" fill={glow} opacity="0.3"/>
      <g className={animated?`myst${energy.level}`:""}>
        {/* Ombre du corps */}
        <ellipse cx="60" cy="108" rx="22" ry="5" fill="rgba(0,0,0,0.15)"/>
        <circle cx="60" cy="62" r="38" fill={`url(#myst-${energy.level})`}/>
        {/* Contour lumineux de la couleur d'énergie */}
        <circle cx="60" cy="62" r="38" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4"/>
        {/* Petits bras en ombre */}
        <path d="M 24 65 Q 17 60 20 53" stroke="#2D2A45" strokeWidth="7" strokeLinecap="round" fill="none"/>
        <path d="M 96 65 Q 103 60 100 53" stroke="#2D2A45" strokeWidth="7" strokeLinecap="round" fill="none"/>
        {/* Gros point d'interrogation */}
        <text x="60" y="74" textAnchor="middle" fontFamily="'Poppins',sans-serif" fontWeight="800" fontSize="38" fill={color} opacity="0.55">?</text>
      </g>
    </svg>
  );
}
