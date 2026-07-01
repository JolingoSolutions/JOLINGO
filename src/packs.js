// ── PACKS THÉMATIQUES JOLINGO ─────────────────────────────
// Packs de tâches inspirés des saisons, événements de l'année et archétypes.
// Pas de vraies célébrités (droits à l'image) — uniquement des profils/archétypes.
// Chaque pack : id, icône, titre (3 langues), saison/période optionnelle, et 8-10 tâches (3 langues).

export const THEMED_PACKS = [
  // ───── SAISONS ─────
  {
    id: "winter_cocoon",
    free: true,
    icon: "❄️",
    season: "winter", // déc-fév
    title: { fr: "Cocooning d'hiver", en: "Winter Cocoon", es: "Cocooning de invierno" },
    desc: { fr: "Se réchauffer et prendre soin de soi", en: "Stay warm and take care of yourself", es: "Abrígate y cuídate" },
    tasks: {
      fr: ["Préparer une boisson chaude", "Lire sous un plaid", "Allumer une bougie", "Prendre un bain chaud", "Cuisiner un plat réconfortant", "Faire une sieste", "Écrire trois gratitudes", "Regarder un film cosy"],
      en: ["Make a hot drink", "Read under a blanket", "Light a candle", "Take a warm bath", "Cook comfort food", "Take a nap", "Write three gratitudes", "Watch a cozy movie"],
      es: ["Prepara una bebida caliente", "Lee bajo una manta", "Enciende una vela", "Date un baño caliente", "Cocina un plato reconfortante", "Echa una siesta", "Escribe tres gratitudes", "Mira una película acogedora"],
    },
  },
  {
    id: "spring_renewal",
    free: true,
    icon: "🌸",
    season: "spring",
    title: { fr: "Renouveau de printemps", en: "Spring Renewal", es: "Renovación de primavera" },
    desc: { fr: "Repartir du bon pied", en: "Start fresh", es: "Empezar de nuevo" },
    tasks: {
      fr: ["Ranger un tiroir", "Ouvrir grand les fenêtres", "Faire une marche dehors", "Planter une graine", "Trier ses vêtements", "Appeler un ami", "Faire le tri dans son téléphone", "Préparer un repas léger"],
      en: ["Tidy a drawer", "Open the windows wide", "Take a walk outside", "Plant a seed", "Sort your clothes", "Call a friend", "Clean up your phone", "Make a light meal"],
      es: ["Ordena un cajón", "Abre las ventanas", "Da un paseo afuera", "Planta una semilla", "Ordena tu ropa", "Llama a un amigo", "Limpia tu teléfono", "Prepara una comida ligera"],
    },
  },
  {
    id: "summer_glow",
    free: true,
    icon: "☀️",
    season: "summer",
    title: { fr: "Énergie d'été", en: "Summer Glow", es: "Energía de verano" },
    desc: { fr: "Profiter et bouger", en: "Enjoy and move", es: "Disfruta y muévete" },
    tasks: {
      fr: ["Boire un grand verre d'eau", "Marcher au soleil 15 min", "Manger un fruit frais", "Se baigner ou se rafraîchir", "Faire des étirements", "Prendre une photo de la nature", "Déjeuner dehors", "Regarder le coucher de soleil"],
      en: ["Drink a big glass of water", "Walk in the sun 15 min", "Eat fresh fruit", "Swim or cool off", "Do some stretches", "Take a nature photo", "Eat lunch outside", "Watch the sunset"],
      es: ["Bebe un gran vaso de agua", "Camina al sol 15 min", "Come fruta fresca", "Nada o refréscate", "Haz estiramientos", "Toma una foto de la naturaleza", "Almuerza afuera", "Mira el atardecer"],
    },
  },
  {
    id: "autumn_reset",
    free: true,
    icon: "🍂",
    season: "autumn",
    title: { fr: "Recentrage d'automne", en: "Autumn Reset", es: "Reinicio de otoño" },
    desc: { fr: "Reprendre ses rituels", en: "Get back to routine", es: "Retoma tus rutinas" },
    tasks: {
      fr: ["Préparer un thé ou café", "Planifier sa semaine", "Marcher dans les feuilles", "Reprendre un livre", "Faire un point sur ses objectifs", "Cuisiner une soupe", "Se coucher plus tôt", "Désencombrer un espace"],
      en: ["Make tea or coffee", "Plan your week", "Walk in the leaves", "Pick up a book", "Review your goals", "Cook a soup", "Go to bed earlier", "Declutter a space"],
      es: ["Prepara té o café", "Planifica tu semana", "Camina entre las hojas", "Retoma un libro", "Revisa tus objetivos", "Cocina una sopa", "Acuéstate más temprano", "Ordena un espacio"],
    },
  },
  // ───── ÉVÉNEMENTS DE L'ANNÉE ─────
  {
    id: "new_year",
    icon: "🎆",
    period: "january",
    title: { fr: "Nouveau départ", en: "Fresh Start", es: "Nuevo comienzo" },
    desc: { fr: "Lancer l'année en douceur", en: "Start the year gently", es: "Empieza el año con calma" },
    tasks: {
      fr: ["Écrire une intention pour l'année", "Ranger un espace de travail", "Boire plus d'eau aujourd'hui", "Faire 10 min d'activité", "Noter trois objectifs simples", "Désinstaller une appli inutile", "Appeler un proche", "Préparer un repas maison"],
      en: ["Write an intention for the year", "Tidy a workspace", "Drink more water today", "Do 10 min of activity", "Note three simple goals", "Delete a useless app", "Call a loved one", "Cook a homemade meal"],
      es: ["Escribe una intención para el año", "Ordena un espacio de trabajo", "Bebe más agua hoy", "Haz 10 min de actividad", "Anota tres objetivos simples", "Borra una app inútil", "Llama a un ser querido", "Prepara una comida casera"],
    },
  },
  {
    id: "self_love",
    icon: "💛",
    period: "february",
    title: { fr: "Prendre soin de soi", en: "Self-Care", es: "Cuidarse" },
    desc: { fr: "Se choisir un peu chaque jour", en: "Choose yourself a little each day", es: "Elígete un poco cada día" },
    tasks: {
      fr: ["Se complimenter sincèrement", "Prendre 10 min pour soi", "Dire non à une chose de trop", "Écrire ce qui fait du bien", "Faire une pause sans écran", "Préparer un bon repas", "S'étirer en douceur", "Se coucher tôt"],
      en: ["Give yourself a real compliment", "Take 10 min for yourself", "Say no to one extra thing", "Write what feels good", "Take a screen-free break", "Make a good meal", "Stretch gently", "Go to bed early"],
      es: ["Date un cumplido sincero", "Toma 10 min para ti", "Di no a una cosa de más", "Escribe lo que te hace bien", "Haz una pausa sin pantallas", "Prepara una buena comida", "Estírate con calma", "Acuéstate temprano"],
    },
  },
  {
    id: "back_to_school",
    icon: "📚",
    period: "september",
    title: { fr: "Rentrée organisée", en: "Back to School", es: "Vuelta organizada" },
    desc: { fr: "Reprendre le rythme", en: "Get back in rhythm", es: "Retoma el ritmo" },
    tasks: {
      fr: ["Préparer ses affaires la veille", "Établir une routine du matin", "Planifier trois priorités", "Ranger son bureau", "Se fixer une heure de coucher", "Préparer un déjeuner sain", "Faire une liste de la semaine", "Couper les notifications 1h"],
      en: ["Prepare your things the night before", "Set a morning routine", "Plan three priorities", "Tidy your desk", "Set a bedtime", "Prepare a healthy lunch", "Make a weekly list", "Mute notifications for 1h"],
      es: ["Prepara tus cosas la noche antes", "Crea una rutina matinal", "Planifica tres prioridades", "Ordena tu escritorio", "Fija una hora de dormir", "Prepara un almuerzo sano", "Haz una lista semanal", "Silencia notificaciones 1h"],
    },
  },
  // ───── ARCHÉTYPES (sans vraies célébrités) ─────
  {
    id: "athlete_routine",
    icon: "🏃",
    title: { fr: "Comme un athlète", en: "Like an Athlete", es: "Como un atleta" },
    desc: { fr: "Discipline et énergie", en: "Discipline and energy", es: "Disciplina y energía" },
    tasks: {
      fr: ["Boire de l'eau dès le réveil", "Faire 20 min de sport", "S'étirer après l'effort", "Manger des protéines", "Dormir 7-8h", "Marcher 8000 pas", "Préparer sa tenue la veille", "Faire 5 min de respiration"],
      en: ["Drink water on waking", "Do 20 min of sport", "Stretch after exercise", "Eat protein", "Sleep 7-8h", "Walk 8000 steps", "Prep your outfit the night before", "Do 5 min of breathing"],
      es: ["Bebe agua al despertar", "Haz 20 min de deporte", "Estírate tras el esfuerzo", "Come proteínas", "Duerme 7-8h", "Camina 8000 pasos", "Prepara tu ropa la noche antes", "Haz 5 min de respiración"],
    },
  },
  {
    id: "artist_routine",
    icon: "🎨",
    title: { fr: "Routine d'artiste", en: "Artist's Routine", es: "Rutina de artista" },
    desc: { fr: "Nourrir sa créativité", en: "Feed your creativity", es: "Alimenta tu creatividad" },
    tasks: {
      fr: ["Créer 15 min sans juger", "Noter une idée qui surgit", "S'inspirer d'une œuvre", "Tenir un carnet", "Essayer une nouvelle technique", "Partager une création", "Observer son environnement", "Écouter de la musique en créant"],
      en: ["Create 15 min without judging", "Note an idea that pops up", "Get inspired by a work", "Keep a sketchbook", "Try a new technique", "Share a creation", "Observe your surroundings", "Listen to music while creating"],
      es: ["Crea 15 min sin juzgar", "Anota una idea que surja", "Inspírate en una obra", "Lleva un cuaderno", "Prueba una técnica nueva", "Comparte una creación", "Observa tu entorno", "Escucha música mientras creas"],
    },
  },
  {
    id: "founder_routine",
    icon: "🚀",
    title: { fr: "Mentalité de fondateur", en: "Founder Mindset", es: "Mentalidad de fundador" },
    desc: { fr: "Avancer sur ses projets", en: "Move your projects forward", es: "Avanza en tus proyectos" },
    tasks: {
      fr: ["Définir la priorité du jour", "Avancer 25 min sans distraction", "Apprendre quelque chose de neuf", "Contacter une personne utile", "Noter trois idées", "Faire une chose qui fait peur", "Relire ses objectifs", "Célébrer une petite victoire"],
      en: ["Set the day's priority", "Work 25 min distraction-free", "Learn something new", "Reach out to a useful person", "Note three ideas", "Do one scary thing", "Review your goals", "Celebrate a small win"],
      es: ["Define la prioridad del día", "Avanza 25 min sin distracción", "Aprende algo nuevo", "Contacta a alguien útil", "Anota tres ideas", "Haz algo que dé miedo", "Revisa tus objetivos", "Celebra una pequeña victoria"],
    },
  },

  // ───── BIEN-ÊTRE ─────
  {
    id: "detox",
    icon: "🧘",
    family: "wellbeing",
    title: { fr: "Détox douce", en: "Gentle Detox", es: "Detox suave" },
    desc: { fr: "Alléger corps et esprit", en: "Lighten body and mind", es: "Aligera cuerpo y mente" },
    tasks: {
      fr: ["Boire 1,5L d'eau", "Une heure sans écran", "Manger un repas léger", "Marcher 20 min", "Éviter le sucre aujourd'hui", "Aérer chaque pièce", "Se coucher sans téléphone", "Respirer profondément 5 min"],
      en: ["Drink 1.5L of water", "One screen-free hour", "Eat a light meal", "Walk 20 min", "Avoid sugar today", "Air out each room", "Sleep without your phone", "Breathe deeply 5 min"],
      es: ["Bebe 1,5L de agua", "Una hora sin pantallas", "Come una comida ligera", "Camina 20 min", "Evita el azúcar hoy", "Ventila cada habitación", "Duerme sin teléfono", "Respira hondo 5 min"],
    },
  },
  {
    id: "sleep",
    icon: "🌙",
    family: "wellbeing",
    title: { fr: "Sommeil réparateur", en: "Restful Sleep", es: "Sueño reparador" },
    desc: { fr: "Mieux dormir, soir après soir", en: "Sleep better, night after night", es: "Duerme mejor cada noche" },
    tasks: {
      fr: ["Éteindre les écrans 1h avant", "Tamiser les lumières le soir", "Préparer la chambre au calme", "Éviter la caféine après 16h", "Lire quelques pages", "Faire des étirements doux", "Noter les pensées du jour", "Se coucher à heure fixe"],
      en: ["Turn off screens 1h before", "Dim the lights at night", "Set up a calm bedroom", "Avoid caffeine after 4pm", "Read a few pages", "Do gentle stretches", "Write down the day's thoughts", "Go to bed at a set time"],
      es: ["Apaga pantallas 1h antes", "Atenúa las luces de noche", "Prepara un cuarto tranquilo", "Evita la cafeína tras las 16h", "Lee algunas páginas", "Haz estiramientos suaves", "Anota los pensamientos del día", "Acuéstate a una hora fija"],
    },
  },
  {
    id: "antistress",
    icon: "🌿",
    family: "wellbeing",
    title: { fr: "Anti-stress", en: "Stress Relief", es: "Anti-estrés" },
    desc: { fr: "Relâcher la pression", en: "Release the pressure", es: "Suelta la presión" },
    tasks: {
      fr: ["Respirer 4-7-8 trois fois", "Faire une pause de 10 min", "Écrire ce qui pèse", "Marcher dehors", "Écouter une musique calme", "S'étirer le dos et la nuque", "Dire non à une source de stress", "Boire une tisane"],
      en: ["Breathe 4-7-8 three times", "Take a 10 min break", "Write what weighs on you", "Walk outside", "Listen to calm music", "Stretch back and neck", "Say no to a stressor", "Drink herbal tea"],
      es: ["Respira 4-7-8 tres veces", "Haz una pausa de 10 min", "Escribe lo que te pesa", "Camina afuera", "Escucha música tranquila", "Estira espalda y cuello", "Di no a una fuente de estrés", "Bebe una infusión"],
    },
  },
  {
    id: "confidence",
    icon: "💪",
    family: "wellbeing",
    title: { fr: "Confiance en soi", en: "Self-Confidence", es: "Confianza en uno mismo" },
    desc: { fr: "Se renforcer chaque jour", en: "Grow stronger each day", es: "Fortalécete cada día" },
    tasks: {
      fr: ["Noter une réussite récente", "Se tenir droit 1 min", "Dire une chose qu'on aime de soi", "Sortir de sa zone de confort", "Accepter un compliment", "Préparer une réponse à un doute", "Faire une chose reportée", "Se féliciter le soir"],
      en: ["Note a recent success", "Stand tall for 1 min", "Say one thing you like about yourself", "Step out of your comfort zone", "Accept a compliment", "Prepare an answer to a doubt", "Do one postponed thing", "Praise yourself at night"],
      es: ["Anota un éxito reciente", "Ponte derecho 1 min", "Di algo que te guste de ti", "Sal de tu zona de confort", "Acepta un cumplido", "Prepara una respuesta a una duda", "Haz algo aplazado", "Felicítate por la noche"],
    },
  },

  // ───── PRODUCTIVITÉ ─────
  {
    id: "focus",
    icon: "🎯",
    family: "productivity",
    title: { fr: "Focus", en: "Focus", es: "Enfoque" },
    desc: { fr: "Une chose à la fois", en: "One thing at a time", es: "Una cosa a la vez" },
    tasks: {
      fr: ["Choisir UNE priorité", "Mettre le téléphone en silencieux", "Travailler 25 min, pause 5", "Fermer les onglets inutiles", "Noter les distractions pour plus tard", "Boire de l'eau avant de commencer", "Finir une tâche avant d'en ouvrir une autre", "Faire le bilan en fin de session"],
      en: ["Pick ONE priority", "Silence your phone", "Work 25 min, break 5", "Close useless tabs", "Note distractions for later", "Drink water before starting", "Finish one task before opening another", "Review at the end of the session"],
      es: ["Elige UNA prioridad", "Silencia el teléfono", "Trabaja 25 min, pausa 5", "Cierra pestañas inútiles", "Anota distracciones para luego", "Bebe agua antes de empezar", "Termina una tarea antes de abrir otra", "Haz balance al final"],
    },
  },
  {
    id: "deepwork",
    icon: "🧠",
    family: "productivity",
    title: { fr: "Deep work", en: "Deep Work", es: "Trabajo profundo" },
    desc: { fr: "Concentration profonde", en: "Deep concentration", es: "Concentración profunda" },
    tasks: {
      fr: ["Bloquer 90 min sans interruption", "Couper toutes les notifications", "Préparer son espace de travail", "Définir l'objectif de la session", "Travailler hors ligne si possible", "Faire une seule tâche complexe", "S'étirer après le bloc", "Noter où on s'est arrêté"],
      en: ["Block 90 min uninterrupted", "Mute all notifications", "Set up your workspace", "Define the session's goal", "Work offline if possible", "Do a single complex task", "Stretch after the block", "Note where you stopped"],
      es: ["Bloquea 90 min sin interrupción", "Silencia todas las notificaciones", "Prepara tu espacio de trabajo", "Define el objetivo de la sesión", "Trabaja sin conexión si puedes", "Haz una sola tarea compleja", "Estírate tras el bloque", "Anota dónde te detuviste"],
    },
  },
  {
    id: "antiprocrastination",
    icon: "⚡",
    family: "productivity",
    title: { fr: "Anti-procrastination", en: "Anti-Procrastination", es: "Anti-procrastinación" },
    desc: { fr: "Passer à l'action", en: "Take action", es: "Pasa a la acción" },
    tasks: {
      fr: ["Découper la tâche en petits pas", "Faire seulement 2 minutes", "Commencer par le plus facile", "Se fixer une mini-récompense", "Éliminer une distraction", "Dire à voix haute ce qu'on va faire", "Lancer un minuteur", "Cocher une tâche évitée"],
      en: ["Break the task into small steps", "Do just 2 minutes", "Start with the easiest part", "Set a mini reward", "Remove one distraction", "Say out loud what you'll do", "Start a timer", "Check off an avoided task"],
      es: ["Divide la tarea en pasos pequeños", "Haz solo 2 minutos", "Empieza por lo más fácil", "Ponte una mini recompensa", "Elimina una distracción", "Di en voz alta lo que harás", "Inicia un temporizador", "Marca una tarea evitada"],
    },
  },

  // ───── FÊTES ─────
  {
    id: "christmas",
    icon: "🎄",
    family: "festive",
    period: "december",
    title: { fr: "Esprit de Noël", en: "Christmas Spirit", es: "Espíritu navideño" },
    desc: { fr: "Douceur et partage", en: "Warmth and sharing", es: "Calidez y compartir" },
    tasks: {
      fr: ["Préparer une surprise pour un proche", "Écouter des chants de fête", "Cuisiner une douceur", "Écrire un message à quelqu'un", "Décorer un coin de la maison", "Faire un don ou un geste gentil", "Boire un chocolat chaud", "Prendre des nouvelles de la famille"],
      en: ["Prepare a surprise for someone", "Listen to festive songs", "Bake a treat", "Write a message to someone", "Decorate a corner of home", "Donate or do a kind act", "Drink hot chocolate", "Check in with family"],
      es: ["Prepara una sorpresa para alguien", "Escucha canciones festivas", "Cocina un dulce", "Escribe un mensaje a alguien", "Decora un rincón de casa", "Dona o haz un gesto amable", "Bebe un chocolate caliente", "Da señales de vida a la familia"],
    },
  },
  {
    id: "halloween",
    icon: "🎃",
    family: "festive",
    period: "october",
    title: { fr: "Halloween", en: "Halloween", es: "Halloween" },
    desc: { fr: "S'amuser à se faire peur", en: "Fun frights", es: "Diversión y sustos" },
    tasks: {
      fr: ["Regarder un film qui fait frissonner", "Décorer avec une citrouille", "Préparer une recette d'automne", "Se déguiser même un peu", "Raconter une histoire effrayante", "Allumer des bougies", "Partager des bonbons", "Faire une balade au crépuscule"],
      en: ["Watch a spooky movie", "Decorate with a pumpkin", "Make an autumn recipe", "Dress up a little", "Tell a scary story", "Light some candles", "Share some candy", "Take a dusk walk"],
      es: ["Mira una película de miedo", "Decora con una calabaza", "Prepara una receta otoñal", "Disfrázate aunque sea un poco", "Cuenta una historia de miedo", "Enciende velas", "Comparte dulces", "Da un paseo al atardecer"],
    },
  },
  {
    id: "ramadan",
    icon: "🌙",
    family: "festive",
    title: { fr: "Ramadan", en: "Ramadan", es: "Ramadán" },
    desc: { fr: "Spiritualité et partage", en: "Spirituality and sharing", es: "Espiritualidad y compartir" },
    tasks: {
      fr: ["Préparer l'iftar avec soin", "Prendre un moment de gratitude", "Partager un repas", "Lire ou méditer un moment", "Prendre des nouvelles d'un proche", "Faire un geste de générosité", "S'hydrater après la rupture", "Se coucher reposé"],
      en: ["Prepare iftar with care", "Take a moment of gratitude", "Share a meal", "Read or meditate a while", "Check in with a loved one", "Do a generous act", "Hydrate after breaking fast", "Go to bed rested"],
      es: ["Prepara el iftar con cuidado", "Toma un momento de gratitud", "Comparte una comida", "Lee o medita un rato", "Pregunta por un ser querido", "Haz un gesto generoso", "Hidrátate tras romper el ayuno", "Acuéstate descansado"],
    },
  },
  {
    id: "lunar_new_year",
    icon: "🧧",
    family: "festive",
    title: { fr: "Nouvel An lunaire", en: "Lunar New Year", es: "Año Nuevo Lunar" },
    desc: { fr: "Renouveau et chance", en: "Renewal and luck", es: "Renovación y suerte" },
    tasks: {
      fr: ["Nettoyer un espace pour la chance", "Préparer un plat traditionnel", "Souhaiter une bonne année à un proche", "Porter une touche de rouge", "Régler une petite dette", "Remercier quelqu'un", "Noter un vœu pour l'année", "Partager un moment en famille"],
      en: ["Clean a space for luck", "Make a traditional dish", "Wish someone a happy new year", "Wear a touch of red", "Settle a small debt", "Thank someone", "Write a wish for the year", "Share a family moment"],
      es: ["Limpia un espacio para la suerte", "Prepara un plato tradicional", "Desea feliz año a alguien", "Lleva un toque de rojo", "Salda una pequeña deuda", "Agradece a alguien", "Escribe un deseo para el año", "Comparte un momento en familia"],
    },
  },

  // ───── RELATIONS ─────
  {
    id: "couple",
    icon: "💞",
    family: "relations",
    title: { fr: "Complicité à deux", en: "Couple Connection", es: "Complicidad en pareja" },
    desc: { fr: "Entretenir le lien", en: "Nurture the bond", es: "Cuida el vínculo" },
    tasks: {
      fr: ["Poser une vraie question à l'autre", "Dire un merci sincère", "Planifier un moment à deux", "Faire un geste attentionné", "Écouter sans interrompre", "Partager un souvenir", "Éteindre les écrans ensemble", "Complimenter l'autre"],
      en: ["Ask your partner a real question", "Say a heartfelt thank you", "Plan time together", "Do a thoughtful gesture", "Listen without interrupting", "Share a memory", "Put screens away together", "Compliment your partner"],
      es: ["Hazle una pregunta real a tu pareja", "Da las gracias de corazón", "Planea un momento juntos", "Ten un gesto atento", "Escucha sin interrumpir", "Comparte un recuerdo", "Apaguen las pantallas juntos", "Halaga a tu pareja"],
    },
  },
  {
    id: "family",
    icon: "👨‍👩‍👧",
    family: "relations",
    title: { fr: "Temps en famille", en: "Family Time", es: "Tiempo en familia" },
    desc: { fr: "Cultiver les liens proches", en: "Nurture close ties", es: "Cultiva los lazos cercanos" },
    tasks: {
      fr: ["Appeler un membre de la famille", "Partager un repas ensemble", "Demander une histoire du passé", "Jouer à un jeu ensemble", "Aider sans qu'on demande", "Prendre une photo souvenir", "Dire 'je t'aime' à quelqu'un", "Préparer une surprise"],
      en: ["Call a family member", "Share a meal together", "Ask for a story from the past", "Play a game together", "Help without being asked", "Take a memory photo", "Say 'I love you' to someone", "Prepare a surprise"],
      es: ["Llama a un familiar", "Compartan una comida", "Pide una historia del pasado", "Jueguen juntos", "Ayuda sin que te lo pidan", "Toma una foto de recuerdo", "Dile 'te quiero' a alguien", "Prepara una sorpresa"],
    },
  },
  {
    id: "friendship",
    icon: "🤝",
    family: "relations",
    title: { fr: "Amitié", en: "Friendship", es: "Amistad" },
    desc: { fr: "Prendre soin de ses amis", en: "Care for your friends", es: "Cuida a tus amigos" },
    tasks: {
      fr: ["Envoyer un message à un ami perdu de vue", "Proposer un café ou un appel", "Remercier un ami pour quelque chose", "Partager une bonne nouvelle", "Écouter un ami sans juger", "Se souvenir d'une date importante", "Faire rire quelqu'un", "Présenter deux amis"],
      en: ["Message a friend you lost touch with", "Suggest a coffee or a call", "Thank a friend for something", "Share good news", "Listen to a friend without judging", "Remember an important date", "Make someone laugh", "Introduce two friends"],
      es: ["Escribe a un amigo perdido", "Propón un café o una llamada", "Agradece algo a un amigo", "Comparte una buena noticia", "Escucha a un amigo sin juzgar", "Recuerda una fecha importante", "Haz reír a alguien", "Presenta a dos amigos"],
    },
  },
  {
    id: "gratitude",
    icon: "🙏",
    family: "relations",
    title: { fr: "Gratitude", en: "Gratitude", es: "Gratitud" },
    desc: { fr: "Voir le positif", en: "See the positive", es: "Ver lo positivo" },
    tasks: {
      fr: ["Noter trois choses positives", "Remercier quelqu'un sincèrement", "Savourer un bon moment", "Écrire une lettre de gratitude", "Apprécier un petit plaisir", "Dire merci à un inconnu", "Repenser à une belle journée", "Reconnaître une de ses forces"],
      en: ["Note three positive things", "Thank someone sincerely", "Savor a good moment", "Write a gratitude letter", "Appreciate a small pleasure", "Thank a stranger", "Recall a beautiful day", "Acknowledge one of your strengths"],
      es: ["Anota tres cosas positivas", "Agradece a alguien de verdad", "Saborea un buen momento", "Escribe una carta de gratitud", "Aprecia un pequeño placer", "Da las gracias a un desconocido", "Recuerda un día hermoso", "Reconoce una de tus fortalezas"],
    },
  },
];

// Renvoie le pack de saison correspondant au mois courant (hémisphère nord)
export function getSeasonalPack(date = new Date()) {
  const m = date.getMonth(); // 0-11
  if (m === 11 || m <= 1) return "winter_cocoon";
  if (m >= 2 && m <= 4) return "spring_renewal";
  if (m >= 5 && m <= 7) return "summer_glow";
  return "autumn_reset";
}

// Renvoie un éventuel pack événementiel pour le mois (sinon null)
export function getEventPack(date = new Date()) {
  const m = date.getMonth();
  if (m === 0) return "new_year";       // Janvier
  if (m === 1) return "self_love";      // Février
  if (m === 8) return "back_to_school"; // Septembre
  if (m === 9) return "halloween";      // Octobre
  if (m === 11) return "christmas";     // Décembre
  return null;
}


// Un pack est-il gratuit ? (les 4 saisons sont gratuites, le reste est premium)
export function isPackFree(pack) {
  return pack && pack.free === true;
}
