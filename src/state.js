// BEKAL Central Reactive State Store

const initialInventory = [
  {
    id: "tomat-segar",
    name: "Tomat Segar",
    weight: 3.0,
    unit: "kg",
    location: "Chiller Sayur",
    expiryDays: 2,
    expiryDate: "15 Mei 2024",
    risk: 85,
    category: "Bahan Basah",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1wR-H3Dj3GC9R6e-JZaBWNuDA7GdVL13qaEZBvlzXiPB2PYfvytB2mdc41F4gmfjNxcj8FsE6zvUmN2abwHuUVF-4mMrZP2xjRvZxQXgMHWpi4p2gvn6ey-2_pmWjMIdgdbds837OB3LkGuTtp76dQw2mUeHggnyPxPUriWc--MPoxOtkMWxkYpH54hqyH3_zD8fqrkVlnyICi8pq7p_S49AUbnUZXkDu0Fq-z8yD2Igqn7m8arxN"
  },
  {
    id: "daging-ayam",
    name: "Daging Ayam Fillet",
    weight: 500,
    unit: "g",
    location: "Kulkas Utama",
    expiryDays: 1,
    expiryDate: "12 Mei 2024",
    risk: 80,
    category: "Protein Segar",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAz-DacYyzA8P8T3Iyvann3ISnUne9sWd-8_5eQbCICYs40p7dx82E1vpo2TgNdIXRd7ICVyMHBvBl5_e0kr1OC1X8G5JBN50CyvtZaLsWMNcN_jL5yoz3a7VOhnvLDy4jaC2gUPgHEBwjgE2q-sCvboeSBZMpP1wotKUOrFZeQhyYThL6fCDawB8TiWwJk7MMFa7bwTrRcXgjKemKoededA0_trqT_L0QU4qNw1eOcSlZdw4tOEBN5"
  },
  {
    id: "susu-uht",
    name: "Susu UHT Plain",
    weight: 1,
    unit: "L",
    location: "Pintu Kulkas",
    expiryDays: 5,
    expiryDate: "20 Mei 2024",
    risk: 45,
    category: "Dairy & Olahan",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvGRZFQgISRDodFOwDdIZt0dBad-vl46ZhytHUdcKtL4oFbZ0FfbR6zb4etOiN_ytMWc-M09FqxTK83uxfkyLaCSTcNZ_X5jlOLkF_lzc6dho0Vw4mULdY2qv0WUnk41CaGRM6CAFxyjpKsY3PHp2uyyZI06NY-RaAHBLXaNbUYTDZmnfne254MFR71L2BC-JSXtaifM4qabKM-W87ob-tBTwUawDxK5MH1foqZ7B_7c03yVX9N0IS"
  },
  {
    id: "bayam-hijau",
    name: "Bayam Hijau",
    weight: 2,
    unit: "Ikat",
    location: "Crisper Box",
    expiryDays: 3,
    expiryDate: "16 Mei 2024",
    risk: 60,
    category: "Sayuran Segar",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG9cUsfY3Hr4ADazWm0LK75LnWuIKsFAX-p_5VwrtE4M90M9k8yHJJTD3MucpGD1_9UNSjJwhFAx47aVcJC3zjcVDbkzXCOP8VY6Ya2bVkenkmbdYaZI3lDLDfYtziTwVlBWf3T-Ya3k9YjUIBJqsLUu9zBqTRhivgBbYyK-mZYuJoafql2dgOM1lhoRn5xRyhTwZwLRUT0PCRE7r3_qnwktYtDUtsX_1RgXmq2iswLeLWMSdQVgKC"
  }
];

export const state = {
  currentScreen: 'beranda', // 'onboarding', 'daftar', 'masuk', 'beranda', 'inventaris-pindai', 'resep-penyelamat', 'donasi-pangan', 'profil-dampak'
  deviceMode: 'mockup', // 'mockup' or 'fullscreen'
  isDarkMode: false,
  alarmEnabled: true,
  user: {
    name: "Andi Pratama",
    email: "andi@domain.com",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDI6MPcDNMJCsnRJHntc4dt-oiXmXH4rV9ZN7eq4m24fbambuRitdKNlmbeOLN-7Q2hpE-nAnttZUbZ4258BCDG-bWSfFW8iJfxfqBllGNOfotOQ4mBgeo0VNCRyK-pdqT4MAUV0QBXOFNifRzG7XxyrYBK7j5uCJaE29MxgmdMMBEM3hVM0Vxgy8_MLuU6q2Jr0fRmgR6t6jFXdDktULAHqgry2XJcD_5fOHW2PVIp2O5PfcOkGUHl",
    level: 4,
    levelTitle: "Zero-Waste Warrior",
    xp: 820,
    nextLevelXp: 1000,
    household: "small", // solo, small, large
    healthScore: 78,
    foodSavedKg: 18.4,
    moneySavedRp: 685000,
    co2PreventedKg: 46,
    partnersHelped: 12
  },
  inventory: [...initialInventory],
  notifications: [
    { id: 1, title: "Tomat Segar Sisa 2 Hari", time: "10 menit lalu", desc: "Bahan di Chiller Sayur berisiko tinggi segera busuk.", unread: true, icon: "warning", color: "text-error" },
    { id: 2, title: "Dapur Nusa Menerima Donasi", time: "2 jam lalu", desc: "2 kg Tomat Anda sukses disalurkan untuk katering sosial.", unread: true, icon: "volunteer_activism", color: "text-primary" },
    { id: 3, title: "Skor Dapur Sehat Naik!", time: "Kemarin", desc: "Efisiensi Anda mencapai 84% pekan ini. Mantap!", unread: false, icon: "military_tech", color: "text-tertiary" }
  ],
  excessSelected: {
    'tomat-segar': true,
    'daging-ayam': true,
    'bayam-hijau': true
  },
  listeners: []
};

export function subscribe(listener) {
  state.listeners.push(listener);
  return () => {
    state.listeners = state.listeners.filter(l => l !== listener);
  };
}

export function notifyStateChange(changedKey) {
  state.listeners.forEach(fn => fn(state, changedKey));
}

export function setScreen(screenName) {
  if (state.currentScreen === screenName) return;
  state.currentScreen = screenName;
  notifyStateChange('screen');
}

export function toggleDeviceMode() {
  state.deviceMode = state.deviceMode === 'mockup' ? 'fullscreen' : 'mockup';
  notifyStateChange('deviceMode');
}

export function toggleDarkMode() {
  state.isDarkMode = !state.isDarkMode;
  if (state.isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  notifyStateChange('darkMode');
}

export function completeRecipe(recipeName, xpEarned = 50, savedRp = 35000) {
  state.user.xp = Math.min(state.user.nextLevelXp, state.user.xp + xpEarned);
  state.user.moneySavedRp += savedRp;
  state.user.foodSavedKg = parseFloat((state.user.foodSavedKg + 0.8).toFixed(1));
  state.user.healthScore = Math.min(99, state.user.healthScore + 2);
  notifyStateChange('user');
}

export function donateItems(partnerName, type = 'donasi') {
  const count = Object.values(state.excessSelected).filter(Boolean).length;
  state.user.partnersHelped += 1;
  state.user.foodSavedKg = parseFloat((state.user.foodSavedKg + 1.2).toFixed(1));
  state.user.xp = Math.min(state.user.nextLevelXp, state.user.xp + 80);
  
  state.notifications.unshift({
    id: Date.now(),
    title: type === 'donasi' ? `Donasi ke ${partnerName} Berhasil!` : `Penawaran Jual Murah ke ${partnerName} Diterima!`,
    time: "Baru saja",
    desc: `${count} bahan surplusmu sedang dijemput kurir mitra.`,
    unread: true,
    icon: type === 'donasi' ? 'volunteer_activism' : 'sell',
    color: 'text-primary'
  });

  notifyStateChange('donation');
}
