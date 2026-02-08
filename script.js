/*
  Retro Valentine Game Night
  All text and images are controlled from the variables below.
*/

const gameConfig = {
  audioEnabled: true,
  fonts: {
    title: "Press Start 2P",
    script: "Pacifico",
  },
  screens: {
    cover: {
      title: "VALENTINE GAME NIGHT",
      subtitle: "Made this just for you!",
      startLabel: "START",
    },
    players: {
      title: "READY TO PLAY?",
      players: [
        {
          label: "PLAYER 1",
          name: "LUNA",
          avatar:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
        },
        {
          label: "PLAYER 2",
          name: "RIO",
          avatar:
            "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?auto=format&fit=crop&w=200&q=80",
        },
      ],
      note: "Tap anywhere to continue",
    },
    selection: {
      title: "CLICK TO OPEN",
      hearts: 5,
      energy: 70,
      cardLabels: ["CARD 1", "CARD 2", "CARD 3"],
    },
    cardDetail: {
      nextLabel: "NEXT",
      backLabel: "BACK",
    },
  },
};

const cards = [
  {
    id: 1,
    title: "Happy Valentine’s Day Baby",
    text:
      "My love,\nYou are the bonus level I never expected.\nEvery day with you feels like a new quest,\nfull of laughs, kisses, and pixel-perfect memories.\nThank you for being my favorite player two.",
    images: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: 2,
    title: "Quest: Forever Us",
    text:
      "I choose you\nfor every level, every sunrise, and every shared snack.\nLet’s keep collecting hearts and making our own story.\nYou are my safe save point.",
    images: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: 3,
    title: "Final Boss: My Heart",
    text:
      "You win, always.\nThank you for loving me, for cheering me on,\nand for turning ordinary days into rare items.\nWith you, I feel unstoppable.",
    images: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    ],
  },
];

const app = document.getElementById("app");
let currentCardIndex = 0;
let currentScreen = "cover";

const playBeep = (() => {
  let audioContext;
  return (frequency = 520, duration = 0.08) => {
    if (!gameConfig.audioEnabled) return;
    audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.type = "square";
    oscillator.frequency.value = frequency;
    gainNode.gain.value = 0.05;
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  };
})();

const createScreen = (className) => {
  const screen = document.createElement("section");
  screen.className = `screen ${className}`;
  return screen;
};

const renderCover = () => {
  const screen = createScreen("cover-screen");
  const frame = document.createElement("div");
  frame.className = "pixel-frame";

  const title = document.createElement("h1");
  title.className = "title";
  title.textContent = gameConfig.screens.cover.title;

  const subtitle = document.createElement("p");
  subtitle.className = "subtitle";
  subtitle.textContent = gameConfig.screens.cover.subtitle;

  const button = document.createElement("button");
  button.className = "pixel-button";
  button.textContent = gameConfig.screens.cover.startLabel;
  button.addEventListener("click", () => {
    playBeep();
    showScreen("players");
  });

  frame.append(title, subtitle, button);
  screen.append(frame);
  return screen;
};

const renderPlayers = () => {
  const screen = createScreen("players-screen");
  const wrapper = document.createElement("div");
  wrapper.className = "pixel-frame";

  const title = document.createElement("h2");
  title.className = "title";
  title.textContent = gameConfig.screens.players.title;

  const grid = document.createElement("div");
  grid.className = "players-grid";

  gameConfig.screens.players.players.forEach((player) => {
    const card = document.createElement("div");
    card.className = "player-card";

    const label = document.createElement("p");
    label.textContent = player.label;

    const avatar = document.createElement("div");
    avatar.className = "player-avatar";

    const img = document.createElement("img");
    img.src = player.avatar;
    img.alt = `${player.name} avatar`;

    avatar.append(img);

    const name = document.createElement("p");
    name.className = "player-name";
    name.textContent = player.name;

    card.append(label, avatar, name);
    grid.append(card);
  });

  const note = document.createElement("p");
  note.className = "players-note";
  note.textContent = gameConfig.screens.players.note;

  wrapper.append(title, grid, note);
  screen.append(wrapper);
  screen.addEventListener("click", () => {
    playBeep(640, 0.05);
    showScreen("selection");
  });
  return screen;
};

const createHeartIndicators = (count) => {
  const wrapper = document.createElement("div");
  wrapper.className = "hearts";
  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart";
    wrapper.append(heart);
  }
  return wrapper;
};

const renderSelection = () => {
  const screen = createScreen("select-screen");
  const wrapper = document.createElement("div");
  wrapper.className = "pixel-frame";

  const title = document.createElement("h2");
  title.className = "title";
  title.textContent = gameConfig.screens.selection.title;

  const status = document.createElement("div");
  status.className = "status-bar";

  const hearts = createHeartIndicators(gameConfig.screens.selection.hearts);

  const energy = document.createElement("div");
  energy.className = "energy-bar";
  const fill = document.createElement("div");
  fill.className = "energy-fill";
  fill.style.width = `${gameConfig.screens.selection.energy}%`;
  energy.append(fill);

  status.append(hearts, energy);

  const cardsRow = document.createElement("div");
  cardsRow.className = "cards-row";

  gameConfig.screens.selection.cardLabels.forEach((label, index) => {
    const envelope = document.createElement("div");
    envelope.className = "card-envelope";
    envelope.setAttribute("role", "button");
    envelope.setAttribute("tabindex", "0");

    const text = document.createElement("p");
    text.textContent = label;

    const sparkles = document.createElement("div");
    sparkles.className = "sparkles";

    for (let i = 0; i < 4; i += 1) {
      const spark = document.createElement("span");
      spark.className = "spark";
      spark.style.top = `${20 + i * 15}%`;
      spark.style.left = `${15 + (i % 2) * 50}%`;
      sparkles.append(spark);
    }

    envelope.append(text, sparkles);
    envelope.addEventListener("click", () => {
      playBeep(740, 0.08);
      currentCardIndex = index;
      openCard(index);
    });
    envelope.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        envelope.click();
      }
    });

    cardsRow.append(envelope);
  });

  wrapper.append(title, status, cardsRow);
  screen.append(wrapper);
  return screen;
};

const renderCardDetail = (card) => {
  const screen = createScreen("card-detail");

  const left = document.createElement("div");
  left.className = "card-text";

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = card.title;

  const heart = document.createElement("div");
  heart.className = "card-heart";
  heart.textContent = card.text;

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const back = document.createElement("button");
  back.className = "pixel-button";
  back.textContent = gameConfig.screens.cardDetail.backLabel;
  back.addEventListener("click", () => {
    playBeep(520, 0.06);
    showScreen("selection");
  });

  const next = document.createElement("button");
  next.className = "pixel-button";
  next.textContent = gameConfig.screens.cardDetail.nextLabel;
  next.addEventListener("click", () => {
    playBeep(680, 0.06);
    const nextIndex = (currentCardIndex + 1) % cards.length;
    currentCardIndex = nextIndex;
    openCard(nextIndex);
  });

  actions.append(back, next);
  left.append(title, heart, actions);

  const right = document.createElement("div");
  right.className = "card-collage";

  card.images.forEach((image, index) => {
    const polaroid = document.createElement("div");
    polaroid.className = "polaroid";
    polaroid.style.setProperty("--tilt", `${(index - 1) * 4}deg`);

    const img = document.createElement("img");
    img.src = image;
    img.alt = `${card.title} memory ${index + 1}`;
    polaroid.append(img);
    right.append(polaroid);
  });

  const floatLayer = document.createElement("div");
  floatLayer.className = "floating-hearts";
  for (let i = 0; i < 8; i += 1) {
    const heartFloat = document.createElement("span");
    heartFloat.textContent = "❤";
    heartFloat.style.left = `${10 + Math.random() * 80}%`;
    heartFloat.style.animationDelay = `${Math.random() * 2}s`;
    heartFloat.style.fontSize = `${10 + Math.random() * 12}px`;
    floatLayer.append(heartFloat);
  }

  screen.append(left, right, floatLayer);
  return screen;
};

const screens = {
  cover: renderCover(),
  players: renderPlayers(),
  selection: renderSelection(),
};

const openCard = (index) => {
  const card = cards[index];
  const cardScreen = renderCardDetail(card);
  if (screens.cardDetail) {
    screens.cardDetail.remove();
  }
  screens.cardDetail = cardScreen;
  app.append(cardScreen);
  showScreen("cardDetail");
};

const showScreen = (name) => {
  currentScreen = name;
  Object.entries(screens).forEach(([key, screen]) => {
    if (!screen) return;
    screen.classList.toggle("active", key === name);
  });
};

Object.values(screens).forEach((screen) => app.append(screen));
showScreen("cover");
