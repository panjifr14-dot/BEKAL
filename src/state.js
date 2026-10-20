// BEKAL Central Reactive State Store
import { bekalApi } from './api.js';

// Initially empty inventory - users add manually or scan receipts
const initialInventory = [];

// Curated high quality food image resolver matching ingredients dynamically
export function resolveIngredientImage(name = '', category = '') {
  const n = (name || '').toLowerCase().trim();
  const c = (category || '').toLowerCase().trim();

  // 1. Telur
  if (/telur|telor|egg/i.test(n)) {
    return "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&auto=format&fit=crop&q=80";
  }

  // 2. Ati Ayam, Jerohan, Hati, Ampela, Usus, Jeroan
  if (/ati|hati|ampela|jeroan|jerohan|usus|babat/i.test(n)) {
    return "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80";
  }

  // 3. Bayam, Kangkung, Sawi, Selada, Sayur Daun Hijau (checked before ayam to avoid substring collision)
  if (/bayam|kangkung|sawi|selada|pokcoy|pakcoy|daun|kailan/i.test(n)) {
    return "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80";
  }

  // 4. Ayam (Fillet, Dada, Paha, Daging Ayam, Sayap)
  if (/\bayam\b|daging ayam|fillet ayam|sayap|paha ayam|dada ayam|unggas|bebek|dara/i.test(n)) {
    return "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&auto=format&fit=crop&q=80";
  }

  // 5. Daging Sapi, Rendang, Kornet, Iga, Sirloin, Kambing
  if (/sapi|daging|kambing|kornet|steak|sirloin|tenderloin|rendang|iga|bistik|bakso/i.test(n)) {
    return "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=500&auto=format&fit=crop&q=80";
  }

  // 6. Ikan, Seafood, Udang, Cumi, Kepiting, Salmon, Tuna
  if (/udang/i.test(n)) {
    return "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=500&auto=format&fit=crop&q=80";
  }
  if (/ikan|seafood|salmon|tuna|lele|gurame|nila|kembung|tongkol|bandeng|patin|cumi|kepiting/i.test(n)) {
    return "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=80";
  }

  // 7. Tahu & Tempe
  if (/tempe|tahu|tofu/i.test(n)) {
    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80";
  }

  // 8. Tomat
  if (/tomat/i.test(n)) {
    return "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80";
  }

  // 9. Wortel
  if (/wortel|carrot/i.test(n)) {
    return "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=80";
  }


  // 10. Brokoli & Kembang Kol
  if (/brokoli|kembang kol|cauliflower/i.test(n)) {
    return "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&auto=format&fit=crop&q=80";
  }

  // 11. Susu & Produk Olahan Susu / Dairy
  if (/susu|milk|yogurt|keju|cheese|butter|mentega|krim/i.test(n)) {
    return "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80";
  }

  // 12. Buah: Pisang, Apel, Jeruk, Alpukat
  if (/pisang|banana/i.test(n)) {
    return "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=80";
  }
  if (/apel|apple/i.test(n)) {
    return "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=80";
  }
  if (/jeruk|orange|citrus/i.test(n)) {
    return "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=500&auto=format&fit=crop&q=80";
  }
  if (/alpukat|avocado/i.test(n)) {
    return "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&auto=format&fit=crop&q=80";
  }

  // 13. Bumbu Dapur: Cabai, Bawang, Jahe
  if (/cabai|cabe|chili|rawit/i.test(n)) {
    return "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500&auto=format&fit=crop&q=80";
  }
  if (/bawang|onion|garlic/i.test(n)) {
    return "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=80";
  }

  // 14. Kentang, Ubi, Singkong
  if (/kentang|potato|ubi|singkong/i.test(n)) {
    return "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=80";
  }

  // 15. Jamur
  if (/jamur|mushroom/i.test(n)) {
    return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=80";
  }

  // Fallback by Category
  if (/protein/i.test(c)) {
    return "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&auto=format&fit=crop&q=80";
  }
  if (/sayur/i.test(c)) {
    return "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80";
  }
  if (/dairy/i.test(c)) {
    return "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80";
  }
  if (/buah/i.test(c)) {
    return "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=80";
  }
  if (/basah/i.test(c)) {
    return "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80";
  }

  // Default clean groceries fallback
  return "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&auto=format&fit=crop&q=80";
}

// 5 Detailed Recipes for Rescue Cooking
export const defaultRecipes = [
  {
    id: "sambal-tomat-ayam-suwir",
    title: "Sambal Tomat Terasi & Ayam Suwir",
    subtitle: "Pedas gurih kaya rempah, penyelamat tomat matang & stok ayam",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsRIUz0H3lurmScfZVaiQYbwib_CDcDtWtTPmRzqMaN_6xihwhOa1_R77okFuXOsfNfEjS5_kuNBR1oH0YdOU5abmZkHUPA4OKgDablfDNttzUHElNxrN1MvZpSWhaqXi3y8fZiUWJYcMgVe1gsteyd67UPv-atIhcEsd_hPcmyCie1KdpzCmIzNo1R0Ng_JUkYy5_FVmv79bZcSbkdmbWYU1e9ftb1cQKUoBpwjg9H5SAcNIb3pZq",
    category: "quick budget family",
    time: "20 mnt",
    portions: "3 Porsi",
    difficulty: "Mudah",
    calories: "285 kkal / porsi",
    score: 85,
    savingsText: "Hemat Rp 35.000 Bahan Dapur",
    ingredients: [
      { name: "Daging Ayam / Ati Ayam", amount: "250", unit: "gram", key: "ayam" },
      { name: "Tomat Merah Segar", amount: "3", unit: "buah", key: "tomat" },
      { name: "Cabai Rawit Merah", amount: "10", unit: "buah", key: "cabai" },
      { name: "Bawang Merah & Putih", amount: "5", unit: "siung", key: "bawang" },
      { name: "Terasi Bakar & Garam", amount: "1", unit: "sdt", key: "terasi" }
    ],
    steps: [
      "Rebus ayam/ati ayam hingga matang lalu suwir-suwir seratnya. Simpan air rebusan untuk kaldu sup.",
      "Goreng tomat, cabai rawit, dan bawang merah/putih hingga layu dan mengeluarkan aroma harum.",
      "Ulek kasar bumbu goreng bersama terasi bakar, garam, dan sedikit gula merah.",
      "Tumis kembali sambal ulek dengan sedikit minyak panas, masukkan suwiran ayam, aduk rata selama 3 menit.",
      "Sajikan selagi hangat bersama nasi putih atau lalapan segar."
    ],
    zeroWasteTip: "Kulit dan biji tomat jangan dibuang! Keduanya kaya akan antioksidan likopen dan pektin alami yang mengentalkan tekstur sambal secara gurih alami."
  },
  {
    id: "semur-ayam-tomat",
    title: "Semur Ayam Tomat Manis Gurih",
    subtitle: "Kuah pekat rempah legit, pas dinikmati bersama nasi hangat keluarga",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7VfcUjnRrFUZRnBdCefhE1AqarlBr3VfX1zHanfYylsncwKJ2X7H84FzZr2rPhkUq-Vr3KreYfwDhMm_0q8TWi81YewEZL_nKKtuNJSfQ3R51k-sfpJPramYvqwgcdbMDHgYAD7GzvwxQjWT0Jeoj9T2HCQytWjQPdkd5VFl7pHcVLZ38h9Fccg15S8N-3-BEKXyTlXjKWP6y7KGsZy-quutxam973nMWKurEbmrJwBzdL2ESjs-O",
    category: "family budget",
    time: "35 mnt",
    portions: "4 Porsi",
    difficulty: "Sedang",
    calories: "340 kkal / porsi",
    score: 80,
    savingsText: "Hemat Rp 45.000 Bahan Ayam",
    ingredients: [
      { name: "Potongan Daging / Ati Ayam", amount: "500", unit: "gram", key: "ayam" },
      { name: "Tomat Merah Matang", amount: "2", unit: "buah", key: "tomat" },
      { name: "Kentang", amount: "2", unit: "buah", key: "kentang" },
      { name: "Kecap Manis", amount: "4", unit: "sdm", key: "kecap" },
      { name: "Bawang Bombay & Bawang Putih", amount: "1", unit: "butir / 3 siung", key: "bawang" }
    ],
    steps: [
      "Potong ayam sesuai selera, lumuri perasan jeruk nipis dan sedikit garam.",
      "Tumis bawang bombay dan bawang putih cincang hingga harum keemasan.",
      "Masukkan potongan ayam dan kentang, aduk hingga permukaan ayam berubah warna.",
      "Tambahkan potongan tomat matang, kecap manis, pala bubuk, lada, dan tuang 300ml air.",
      "Masak dengan api sedang selama 20 menit hingga kuah meresap kental dan kentang empuk.",
      "Angkat dan sajikan dengan taburan bawang merah goreng."
    ],
    zeroWasteTip: "Gunakan tomat yang sudah sangat matang atau kulitnya berkerut. Keasaman alami tomat matang membantu mengempukkan daging ayam dan menghasilkan rasa gurih legit alami."
  },
  {
    id: "tumis-bayam-bawang-putih",
    title: "Tumis Bayam Bawang Putih & Tahu",
    subtitle: "Sayuran hijau segar renyah kaya zat besi, siap dalam 15 menit",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgOQP2HvRV97yHPOHpo-kT8zF_mHhDh96rYoplgRVel9YTzEN2pUPuwusKSCXA7k-tJ5xXBIKymLeDBncvhupSYFLkVo1bvRMMBJOWvMu3ZAfRykUi9-3X-pf5m0-_lXzzjqusD5WtxmjCJdpimvlew2ZKPU5OZBbkpB2mayqX-iYmqriVHkspD6Kt5k8q-D0zZge9igmJSZL7RI9SUc_kNFV4cuTJNzcWD_xNZWoCnXNWm89XdLfP",
    category: "quick budget",
    time: "15 mnt",
    portions: "2 Porsi",
    difficulty: "Sangat Mudah",
    calories: "135 kkal / porsi",
    score: 90,
    savingsText: "Hemat Rp 18.000 Sayur Segar",
    ingredients: [
      { name: "Bayam Hijau Segar", amount: "2", unit: "ikat", key: "bayam" },
      { name: "Tahu Putih / Sutra", amount: "1", unit: "kotak", key: "tahu" },
      { name: "Bawang Putih Cincang", amount: "4", unit: "siung", key: "bawang" },
      { name: "Saus Tiram", amount: "1", unit: "sdm", key: "saus" },
      { name: "Minyak Wijen & Garam", amount: "secukupnya", unit: "", key: "garam" }
    ],
    steps: [
      "Cuci bersih bayam, pisahkan daun dan potong batangnya sepanjang 2 cm.",
      "Goreng dadu tahu sebentar hingga berkulit tipis, tiriskan.",
      "Tumis bawang putih cincang dengan sedikit minyak hingga wangi kekuningan.",
      "Masukkan potongan batang bayam dan tahu terlebih dahulu, tumis 1 menit.",
      "Masukkan daun bayam, saus tiram, sejumput garam, dan minyak wijen. Aduk cepat 2 menit dengan api besar.",
      "Segera angkat dan sajikan selagi panas."
    ],
    zeroWasteTip: "Batang bayam kaya serat dan renyah jika ditumis cepat! Jangan dibuang, cukup potong bagian pangkal akarnya saja."
  },
  {
    id: "sup-ayam-tomat-segar",
    title: "Sup Ayam Segar, Tomat & Makaroni",
    subtitle: "Kuah kaldu bening gurih menghangatkan tubuh dengan vitamin komplit",
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80",
    category: "family budget quick",
    time: "25 mnt",
    portions: "4 Porsi",
    difficulty: "Mudah",
    calories: "210 kkal / porsi",
    score: 75,
    savingsText: "Hemat Rp 28.000 Bahan Masak",
    ingredients: [
      { name: "Daging / Ati Ayam", amount: "250", unit: "gram", key: "ayam" },
      { name: "Wortel Segar", amount: "1", unit: "batang", key: "wortel" },
      { name: "Tomat Segar", amount: "2", unit: "buah", key: "tomat" },
      { name: "Makaroni / Kentang", amount: "50", unit: "gram", key: "makaroni" },
      { name: "Bawang Putih & Daun Bawang", amount: "3", unit: "siung / 1 batang", key: "bawang" }
    ],
    steps: [
      "Rebus ayam bersama bawang putih geprek hingga kaldu mendidih dan harum.",
      "Masukkan irisan wortel dan makaroni, masak 5-7 menit hingga empuk.",
      "Tambahkan potongan tomat segar, garam, lada, dan sedikit pala bubuk.",
      "Taburi irisan daun bawang dan seledri cincang sebelum api dimatikan.",
      "Sajikan hangat untuk stamina keluarga."
    ],
    zeroWasteTip: "Gunakan ujung potongan wortel dan batang seledri untuk merebus kaldu, memberikan aroma sup yang lebih kaya tanpa perasa sintetis."
  },
  {
    id: "nasi-goreng-penyelamat",
    title: "Nasi Goreng Penyelamat Kulkas",
    subtitle: "Solusi cerdas memanfaatkan nasi sisa semalam & aneka potongan lauk dapur",
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&auto=format&fit=crop&q=80",
    category: "quick budget family",
    time: "15 mnt",
    portions: "2 Porsi",
    difficulty: "Sangat Mudah",
    calories: "360 kkal / porsi",
    score: 88,
    savingsText: "Hemat Rp 25.000 Sisa Makanan",
    ingredients: [
      { name: "Nasi Dingin Semalam", amount: "2", unit: "piring", key: "nasi" },
      { name: "Telur / Potongan Ayam / Ati", amount: "1-2", unit: "butir / 100g", key: "telur" },
      { name: "Sayuran Kulkas (Wortel/Bayam/Kol)", amount: "1", unit: "genggam", key: "sayur" },
      { name: "Bawang Merah & Putih", amount: "4", unit: "siung", key: "bawang" },
      { name: "Kecap Manis & Saus Tiram", amount: "2", unit: "sdm", key: "kecap" }
    ],
    steps: [
      "Orak-arik telur di wajan dengan sedikit minyak hingga matang, sisihkan.",
      "Tumis bawang merah dan bawang putih cincang hingga harum kecokelatan.",
      "Masukkan potongan lauk dan sayuran sisa kulkas, aduk hingga layu.",
      "Masukkan nasi dingin, tekan-tekan agar bulir nasi tidak menggumpal.",
      "Bumbui dengan kecap manis, saus tiram, garam, dan lada. Aduk cepat di api besar selama 3 menit.",
      "Sajikan selagi panas."
    ],
    zeroWasteTip: "Nasi dingin semalam memiliki kadar air yang pas, mencegah nasi goreng lembek dan menghasilkan bulir nasi yang terbalut bumbu merata."
  }
];

// BEKAL Central Reactive State Store

function getStoredUser() {
  try {
    const raw = localStorage.getItem('bekal_user');
    if (raw) {
      const parsed = JSON.parse(raw);
      // Clean up legacy test data containing 'Andi'
      if (parsed && parsed.name && !parsed.name.toLowerCase().includes('andi')) {
        return parsed;
      } else {
        localStorage.removeItem('bekal_user');
      }
    }
  } catch (e) {
    console.warn('Failed to parse stored user:', e);
  }
  return {
    name: "Panji Fajar",
    email: "panji.fajar@bekal.id",
    avatar: "https://ui-avatars.com/api/?name=Panji+Fajar&background=005b34&color=fff&bold=true",
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
  };
}

export const state = {
  currentScreen: 'onboarding', // 'onboarding', 'daftar', 'masuk', 'beranda', 'inventaris-pindai', 'resep-penyelamat', 'donasi-pangan', 'profil-dampak'
  deviceMode: 'mockup', // 'mockup' or 'fullscreen'
  isDarkMode: false,
  alarmEnabled: true,
  backendConnected: false,
  isSyncing: false,
  user: getStoredUser(),
  inventory: [...initialInventory],
  recipes: [...defaultRecipes],
  selectedRecipeId: "sambal-tomat-ayam-suwir",
  partners: [],
  dashboardSummary: null,
  notifications: [
    { id: 1, title: "Kulkas Siap Digunakan", time: "Baru saja", desc: "Catat bahan belanjaan atau pindai struk untuk mengaktifkan AI Pantry Guard.", unread: true, icon: "kitchen", color: "text-primary" },
    { id: 2, title: "Dapur Nusa Menerima Donasi", time: "2 jam lalu", desc: "Kemitraan food rescue siap menjemput bahan berlebih.", unread: false, icon: "volunteer_activism", color: "text-primary" },
    { id: 3, title: "Skor Dapur Sehat Aktif!", time: "Hari ini", desc: "Sistem pencegahan food waste aktif memantau dapur Anda.", unread: false, icon: "military_tech", color: "text-tertiary" }
  ],
  excessSelected: {},
  donationHistory: [
    { id: 'dn-101', partner: 'Warung Makan Bu Sari', date: '18 Mei 2024', items: '2.0 kg Tomat Segar, 500g Ayam', status: 'Selesai Disalurkan', badge: 'Terverifikasi' },
    { id: 'dn-102', partner: 'Dapur Sosial Berkah', date: '10 Mei 2024', items: '3 Ikat Bayam, 1L Susu', status: 'Selesai Disalurkan', badge: 'Terverifikasi' }
  ],
  inventoryFilter: 'all', // 'all', 'Sayur & Buah', 'Protein', 'Dairy', 'Bahan Basah'
  inventorySearch: '',
  listeners: []
};

export function getRecipeById(id) {
  return state.recipes.find(r => r.id === id) || state.recipes[0];
}

export function setUser(userData) {
  state.user = { ...state.user, ...userData };
  if (!userData.avatar && userData.name) {
    state.user.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(state.user.name)}&background=005b34&color=fff&bold=true`;
  }
  try {
    localStorage.setItem('bekal_user', JSON.stringify(state.user));
  } catch (e) {}
  notifyStateChange('user');
}

export function logoutUser() {
  try {
    localStorage.removeItem('bekal_user');
  } catch (e) {}
  state.user = {
    name: "Pengguna Baru",
    email: "pengguna@domain.com",
    avatar: "https://ui-avatars.com/api/?name=Pengguna+Baru&background=005b34&color=fff&bold=true",
    level: 1,
    levelTitle: "Dapur Pemula",
    xp: 0,
    nextLevelXp: 300,
    household: "small",
    healthScore: 70,
    foodSavedKg: 0,
    moneySavedRp: 0,
    co2PreventedKg: 0,
    partnersHelped: 0
  };
  notifyStateChange('user');
}

export function addInventoryItem(item) {
  const assignedImg = item.img || resolveIngredientImage(item.name, item.category);
  const newItem = {
    id: 'item-' + Date.now(),
    name: item.name || 'Bahan Segar',
    weight: parseFloat(item.weight) || 1,
    unit: item.unit || 'kg',
    location: item.location || 'Kulkas Utama',
    expiryDays: parseInt(item.expiryDays) || 3,
    expiryDate: item.expiryDate || `${item.expiryDays || 3} Hari Lagi`,
    risk: item.risk || Math.max(10, Math.min(95, 100 - (item.expiryDays || 3) * 12)),
    category: item.category || 'Sayur & Buah',
    img: assignedImg
  };
  state.inventory.unshift(newItem);
  notifyStateChange('inventory');

  // Trigger backend save
  try {
    bekalApi.addItem({
      name: newItem.name,
      category: newItem.category,
      quantity: newItem.weight,
      unit: newItem.unit,
      storageLocation: newItem.location.toLowerCase().replace(/\s+/g, '_'),
      shelfLifeDays: newItem.expiryDays
    });
  } catch (e) {}
  return newItem;
}

export function consumeInventoryItem(itemId) {
  const idx = state.inventory.findIndex(i => i.id === itemId);
  if (idx !== -1) {
    const consumed = state.inventory[idx];
    state.inventory.splice(idx, 1);
    state.user.foodSavedKg = parseFloat((state.user.foodSavedKg + (consumed.weight > 5 ? 0.5 : consumed.weight)).toFixed(1));
    state.user.moneySavedRp += 15000;
    state.user.xp = Math.min(state.user.nextLevelXp, state.user.xp + 25);
    state.user.healthScore = Math.min(99, state.user.healthScore + 1);
    try {
      localStorage.setItem('bekal_user', JSON.stringify(state.user));
    } catch (e) {}
    notifyStateChange('inventory');
    return consumed;
  }
  return null;
}

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

// 🌐 Sync State with Backend API
export async function syncWithBackend() {
  state.isSyncing = true;
  notifyStateChange('syncing');

  try {
    const health = await bekalApi.checkHealth();
    if (health && health.status === 'ok') {
      state.backendConnected = true;

      // 1. Ambil ringkasan Food Risk Dashboard
      const dashRes = await bekalApi.getFoodRiskDashboard();
      if (dashRes && dashRes.data) {
        state.dashboardSummary = dashRes.data;
        if (dashRes.data.kitchenHealthScore) {
          state.user.healthScore = dashRes.data.kitchenHealthScore;
        }
      }

      // 2. Ambil Stok Pantry dari Backend
      const pantryRes = await bekalApi.getPantry();
      if (pantryRes && Array.isArray(pantryRes.data) && pantryRes.data.length > 0) {
        state.inventory = pantryRes.data.map(item => ({
          id: item.id,
          name: item.name,
          weight: parseFloat(item.quantity) || 1,
          unit: item.unit,
          location: item.storageLocation === 'chiller_sayur' ? 'Chiller Sayur' :
                    item.storageLocation === 'kulkas_utama' ? 'Kulkas Utama' :
                    item.storageLocation === 'crisper_box' ? 'Crisper Box' :
                    item.storageLocation === 'pintu_kulkas' ? 'Pintu Kulkas' : 'Pantry',
          expiryDays: item.estimatedShelfLifeDays || 2,
          expiryDate: item.expiryDate ? new Date(item.expiryDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '3 Hari',
          risk: item.riskScore || 50,
          category: item.category || 'Bahan Segar',
          img: item.imageUrl || resolveIngredientImage(item.name, item.category)
        }));
      }

      // 3. Ambil Resep Penyelamat
      const recipeRes = await bekalApi.getRescueRecipes();
      if (recipeRes && Array.isArray(recipeRes.data)) {
        state.recipes = recipeRes.data;
      }

      // 4. Ambil Mitra Donasi
      const partnerRes = await bekalApi.getNearbyPartners();
      if (partnerRes && Array.isArray(partnerRes.data)) {
        state.partners = partnerRes.data;
      }

      // 5. Ambil Metrik Dampak
      const impactRes = await bekalApi.getImpactSummary();
      if (impactRes && impactRes.data && impactRes.data.metrics) {
        state.user.foodSavedKg = impactRes.data.metrics.foodSavedKg;
        state.user.moneySavedRp = impactRes.data.metrics.moneySavedRp;
        state.user.co2PreventedKg = impactRes.data.metrics.co2PreventedKg;
        state.user.partnersHelped = impactRes.data.metrics.partnersHelped;
        if (impactRes.data.user) {
          state.user.xp = impactRes.data.user.xp;
          state.user.level = impactRes.data.user.level;
          state.user.levelTitle = impactRes.data.user.levelTitle;
        }
      }
    } else {
      state.backendConnected = false;
    }
  } catch (err) {
    console.warn('[BEKAL State] Backend sync notice:', err.message);
    state.backendConnected = false;
  } finally {
    state.isSyncing = false;
    notifyStateChange('backendSync');
  }
}

export async function completeRecipe(recipeName, xpEarned = 50, savedRp = 35000) {
  state.user.xp = Math.min(state.user.nextLevelXp, state.user.xp + xpEarned);
  state.user.moneySavedRp += savedRp;
  state.user.foodSavedKg = parseFloat((state.user.foodSavedKg + 0.8).toFixed(1));
  state.user.healthScore = Math.min(99, state.user.healthScore + 2);

  // Deduct inventory items intelligently based on recipe
  const lowerTitle = (recipeName || '').toLowerCase();
  state.inventory.forEach(item => {
    const itemName = item.name.toLowerCase();
    if (lowerTitle.includes('tomat') && itemName.includes('tomat')) {
      item.weight = Math.max(0.2, parseFloat((item.weight - 1.0).toFixed(1)));
      item.risk = Math.max(20, item.risk - 35);
    }
    if (lowerTitle.includes('ayam') && itemName.includes('ayam')) {
      item.weight = Math.max(100, item.weight - 250);
      item.risk = Math.max(20, item.risk - 40);
    }
    if (lowerTitle.includes('bayam') && itemName.includes('bayam')) {
      item.weight = Math.max(1, item.weight - 1);
      item.risk = Math.max(20, item.risk - 30);
    }
  });

  try {
    localStorage.setItem('bekal_user', JSON.stringify(state.user));
  } catch (e) {}
  notifyStateChange('user');
  notifyStateChange('inventory');

  // Trigger backend update asynchronously
  try {
    await bekalApi.completeCooking({
      recipeId: 'rcp-' + recipeName.toLowerCase().replace(/\s+/g, '-'),
      recipeTitle: recipeName,
      foodSavedKg: 0.8,
      moneySavedRp: savedRp,
      xpEarned,
      deductions: [
        { ingredientName: "Tomat Segar", quantity: 1.0, unit: "kg" }
      ]
    });
  } catch (e) {
    console.warn('[BEKAL API] Complete cooking background call notice:', e.message);
  }
}

export async function donateItems(partnerName, type = 'donasi') {
  const selectedKeys = Object.keys(state.excessSelected).filter(k => state.excessSelected[k]);
  const count = selectedKeys.length;
  state.user.partnersHelped += 1;
  state.user.foodSavedKg = parseFloat((state.user.foodSavedKg + 1.2).toFixed(1));
  state.user.xp = Math.min(state.user.nextLevelXp, state.user.xp + 80);
  
  // Deduct surplus from inventory
  selectedKeys.forEach(k => {
    const item = state.inventory.find(i => i.id === k);
    if (item) {
      item.weight = Math.max(0.5, parseFloat((item.weight * 0.4).toFixed(1)));
      item.risk = 25; // risk lowered as excess handled
    }
  });

  // Record into history
  const todayStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  state.donationHistory.unshift({
    id: 'dn-' + Date.now(),
    partner: partnerName,
    date: todayStr,
    items: `${count} Bahan Surplus (${type === 'donasi' ? 'Donasi Sukarela' : 'Jual Murah -50%'})`,
    status: 'Dijemput Kurir Mitra',
    badge: type === 'donasi' ? 'Donasi Sosial' : 'Diskon UMKM'
  });

  state.notifications.unshift({
    id: Date.now(),
    title: type === 'donasi' ? `Donasi ke ${partnerName} Berhasil!` : `Penawaran Jual Murah ke ${partnerName} Diterima!`,
    time: "Baru saja",
    desc: `${count} bahan surplusmu sedang dijemput kurir mitra.`,
    unread: true,
    icon: type === 'donasi' ? 'volunteer_activism' : 'sell',
    color: 'text-primary'
  });

  try {
    localStorage.setItem('bekal_user', JSON.stringify(state.user));
  } catch (e) {}
  notifyStateChange('donation');
  notifyStateChange('inventory');

  // Trigger backend create rescue listing asynchronously
  try {
    await bekalApi.createRescueListing({
      partnerId: 'partner-bu-sari',
      listingType: type === 'donasi' ? 'donation' : 'discount_sale',
      totalWeightKg: 1.5,
      foodConditionNote: "Bahan segar berlebih, disimpan rapi di chiller kulkas.",
      items: [
        { itemName: "Tomat Segar", quantity: 1.0, unit: "kg" },
        { itemName: "Daging Ayam Fillet", quantity: 0.5, unit: "kg" }
      ]
    });
  } catch (e) {
    console.warn('[BEKAL API] Rescue listing background call notice:', e.message);
  }
}
