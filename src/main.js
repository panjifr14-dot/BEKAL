// BEKAL Application Main Controller & Router
import { state, subscribe, setScreen, toggleDeviceMode, toggleDarkMode, completeRecipe, donateItems } from './state.js';
import { renderHeader } from './components/Header.js';
import { renderBottomNav } from './components/BottomNav.js';
import { renderDeviceToolbar } from './components/DeviceFrame.js';
import { renderModals } from './components/Modals.js';

import { renderOnboardingScreen } from './screens/OnboardingScreen.js';
import { renderDaftarScreen } from './screens/DaftarScreen.js';
import { renderMasukScreen } from './screens/MasukScreen.js';
import { renderBerandaScreen } from './screens/BerandaScreen.js';
import { renderInventarisScreen } from './screens/InventarisScreen.js';
import { renderResepScreen } from './screens/ResepScreen.js';
import { renderDonasiScreen } from './screens/DonasiScreen.js';
import { renderProfilScreen } from './screens/ProfilScreen.js';

let cookingTimerInterval = null;
let cookingSecondsLeft = 15 * 60; // 15 mins
let isCookingTimerRunning = false;

// Global Toast Helper
export function showToast(message, icon = 'check_circle') {
  const toast = document.getElementById('toastNotification');
  const msgEl = document.getElementById('toastMessage');
  const iconEl = document.getElementById('toastIcon');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  if (iconEl) iconEl.textContent = icon;

  toast.classList.remove('opacity-0', '-translate-y-2', 'pointer-events-none');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', '-translate-y-2', 'pointer-events-none');
  }, 2800);
}

// Render the active screen content
function getScreenHtml() {
  switch (state.currentScreen) {
    case 'onboarding':
      return renderOnboardingScreen();
    case 'daftar':
      return renderDaftarScreen();
    case 'masuk':
      return renderMasukScreen();
    case 'beranda':
      return renderBerandaScreen();
    case 'inventaris-pindai':
      return renderInventarisScreen();
    case 'resep-penyelamat':
      return renderResepScreen();
    case 'donasi-pangan':
      return renderDonasiScreen();
    case 'profil-dampak':
      return renderProfilScreen();
    default:
      return renderBerandaScreen();
  }
}

// Main App Render Function
export function renderApp() {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  const headerHtml = renderHeader();
  const screenHtml = getScreenHtml();
  const bottomNavHtml = renderBottomNav();
  const modalsHtml = renderModals();
  const toolbarHtml = renderDeviceToolbar();

  if (state.deviceMode === 'mockup') {
    appEl.innerHTML = `
      ${toolbarHtml}
      <div class="device-wrapper py-6 md:py-10 flex items-center justify-center w-full min-h-screen">
        <div class="device-frame-mockup">
          <div class="device-notch">
            <div class="camera"></div>
            <div class="sensor"></div>
          </div>
          <div class="flex-1 overflow-y-auto relative bg-surface flex flex-col" id="appScrollContainer">
            ${headerHtml}
            <main class="flex-1 flex flex-col relative w-full">
              ${screenHtml}
            </main>
            ${bottomNavHtml}
          </div>
        </div>
      </div>
      ${modalsHtml}
    `;
  } else {
    // Fullscreen native mobile / responsive
    appEl.innerHTML = `
      ${toolbarHtml}
      <div class="w-full max-w-lg min-h-screen bg-surface flex flex-col relative shadow-2xl overflow-y-auto mx-auto" id="appScrollContainer">
        ${headerHtml}
        <main class="flex-1 flex flex-col relative w-full">
          ${screenHtml}
        </main>
        ${bottomNavHtml}
      </div>
      ${modalsHtml}
    `;
  }

  attachEventListeners();
}

// Attach all dynamic user interactions and delegates
function attachEventListeners() {
  // Quick screen select dropdown
  const screenSelect = document.getElementById('quickScreenSelect');
  if (screenSelect) {
    screenSelect.addEventListener('change', (e) => {
      setScreen(e.target.value);
    });
  }

  // Device frame toggle
  const btnToggleFrame = document.getElementById('btnToggleFrame');
  if (btnToggleFrame) {
    btnToggleFrame.addEventListener('click', () => {
      toggleDeviceMode();
    });
  }

  // Dark mode toggle
  const btnToggleDark = document.getElementById('btnToggleDark');
  if (btnToggleDark) {
    btnToggleDark.addEventListener('click', () => {
      toggleDarkMode();
    });
  }

  // Header Back Button
  const headerBackBtn = document.getElementById('headerBackBtn');
  if (headerBackBtn) {
    headerBackBtn.addEventListener('click', () => {
      if (['daftar', 'masuk'].includes(state.currentScreen)) {
        setScreen('onboarding');
      } else {
        setScreen('beranda');
      }
    });
  }

  // Header Logo Button
  const headerLogoBtn = document.getElementById('headerLogoBtn');
  if (headerLogoBtn) {
    headerLogoBtn.addEventListener('click', () => {
      setScreen('beranda');
    });
  }

  // Header Profile Button
  const headerProfileBtn = document.getElementById('headerProfileBtn');
  if (headerProfileBtn) {
    headerProfileBtn.addEventListener('click', () => {
      setScreen('profil-dampak');
    });
  }

  // Bottom Navigation Click Handlers
  document.querySelectorAll('[data-tab]').forEach(tabEl => {
    tabEl.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = tabEl.getAttribute('data-tab');
      setScreen(targetTab);
    });
  });

  // Notification Drawer Toggle
  const notificationBtn = document.getElementById('notificationBtn');
  const notificationDrawer = document.getElementById('notificationDrawer');
  const closeNotifBtn = document.getElementById('closeNotifBtn');
  const markReadBtn = document.getElementById('markReadBtn');

  if (notificationBtn && notificationDrawer) {
    notificationBtn.addEventListener('click', () => {
      notificationDrawer.classList.remove('opacity-0', 'pointer-events-none');
      const innerDrawer = notificationDrawer.querySelector('div');
      innerDrawer.classList.remove('translate-x-full');
    });
  }

  if (closeNotifBtn && notificationDrawer) {
    closeNotifBtn.addEventListener('click', () => {
      const innerDrawer = notificationDrawer.querySelector('div');
      innerDrawer.classList.add('translate-x-full');
      setTimeout(() => {
        notificationDrawer.classList.add('opacity-0', 'pointer-events-none');
      }, 250);
    });
  }

  if (markReadBtn) {
    markReadBtn.addEventListener('click', () => {
      state.notifications.forEach(n => n.unread = false);
      showToast('Semua notifikasi ditandai telah dibaca');
      const innerDrawer = notificationDrawer.querySelector('div');
      innerDrawer.classList.add('translate-x-full');
      setTimeout(() => {
        notificationDrawer.classList.add('opacity-0', 'pointer-events-none');
        renderApp();
      }, 250);
    });
  }

  // --- SCREEN 1: ONBOARDING LISTENERS ---
  const btnStartNow = document.getElementById('btnStartNow');
  if (btnStartNow) {
    btnStartNow.addEventListener('click', () => setScreen('daftar'));
  }
  const btnSkipOnboarding = document.getElementById('btnSkipOnboarding');
  if (btnSkipOnboarding) {
    btnSkipOnboarding.addEventListener('click', () => setScreen('beranda'));
  }
  const btnGoToLogin = document.getElementById('btnGoToLogin');
  if (btnGoToLogin) {
    btnGoToLogin.addEventListener('click', () => setScreen('masuk'));
  }

  // --- SCREEN 2: DAFTAR (SIGN UP) LISTENERS ---
  const btnTogglePassword = document.getElementById('btnTogglePassword');
  const passwordInput = document.getElementById('passwordInput');
  const eyeIcon = document.getElementById('eyeIcon');
  if (btnTogglePassword && passwordInput && eyeIcon) {
    btnTogglePassword.addEventListener('click', () => {
      const isPass = passwordInput.type === 'password';
      passwordInput.type = isPass ? 'text' : 'password';
      eyeIcon.textContent = isPass ? 'visibility_off' : 'visibility';
    });
  }

  // Password Strength Interactive Meter
  if (passwordInput) {
    passwordInput.addEventListener('input', (e) => {
      const val = e.target.value;
      const b1 = document.getElementById('bar1');
      const b2 = document.getElementById('bar2');
      const b3 = document.getElementById('bar3');
      const sText = document.getElementById('strengthText');
      if (!b1 || !b2 || !b3 || !sText) return;

      if (val.length < 6) {
        b1.className = 'rounded-full bg-error h-full transition-colors';
        b2.className = 'rounded-full bg-surface-container-high h-full transition-colors';
        b3.className = 'rounded-full bg-surface-container-high h-full transition-colors';
        sText.className = 'font-label-sm text-label-sm text-error flex items-center gap-1 font-bold';
        sText.innerHTML = '<span class="material-symbols-outlined text-[14px]">shield</span> Lemah (Min. 8 Karakter)';
      } else if (val.length < 10) {
        b1.className = 'rounded-full bg-tertiary h-full transition-colors';
        b2.className = 'rounded-full bg-tertiary h-full transition-colors';
        b3.className = 'rounded-full bg-surface-container-high h-full transition-colors';
        sText.className = 'font-label-sm text-label-sm text-tertiary flex items-center gap-1 font-bold';
        sText.innerHTML = '<span class="material-symbols-outlined text-[14px]">shield</span> Sedang (Cukup Aman)';
      } else {
        b1.className = 'rounded-full bg-primary h-full transition-colors';
        b2.className = 'rounded-full bg-primary h-full transition-colors';
        b3.className = 'rounded-full bg-primary h-full transition-colors';
        sText.className = 'font-label-sm text-label-sm text-primary flex items-center gap-1 font-bold';
        sText.innerHTML = '<span class="material-symbols-outlined text-[14px]">shield</span> Kuat (Kombinasi Aman)';
      }
    });
  }

  // Household Selection Interactive Feedback
  const householdItems = document.querySelectorAll('.household-item');
  householdItems.forEach(item => {
    item.addEventListener('click', () => {
      householdItems.forEach(other => {
        other.classList.remove('household-active', 'ring-2', 'ring-primary/40');
        const iconBox = other.querySelector('div:first-of-type');
        const ind = other.querySelector('.radio-indicator');
        if (iconBox) iconBox.className = 'w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mr-3 transition-colors';
        if (ind) {
          ind.className = 'radio-indicator w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center transition-all';
          ind.innerHTML = '<div class="w-2 h-2 rounded-full bg-transparent"></div>';
        }
      });

      item.classList.add('household-active', 'ring-2', 'ring-primary/40');
      const curIcon = item.querySelector('div:first-of-type');
      const curInd = item.querySelector('.radio-indicator');
      if (curIcon) curIcon.className = 'w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 mr-3 transition-colors';
      if (curInd) {
        curInd.className = 'radio-indicator w-5 h-5 rounded-full bg-primary flex items-center justify-center transition-all';
        curInd.innerHTML = '<span class="material-symbols-outlined text-on-primary text-[14px]">check</span>';
      }
      state.user.household = item.getAttribute('data-household') || 'small';
    });
  });

  // Submit Sign Up
  const btnSubmitSignup = document.getElementById('btnSubmitSignup');
  if (btnSubmitSignup) {
    btnSubmitSignup.addEventListener('click', () => {
      btnSubmitSignup.innerHTML = '<span class="material-symbols-outlined text-[20px] animate-spin">progress_activity</span><span>Menyiapkan Dapurmu...</span>';
      setTimeout(() => {
        btnSubmitSignup.innerHTML = '<span class="material-symbols-outlined text-[20px]">check</span><span>Dapur BEKAL Siap!</span>';
        setTimeout(() => {
          setScreen('beranda');
          showToast('Selamat bergabung di BEKAL, Andi! 🌱', 'eco');
        }, 600);
      }, 900);
    });
  }

  const btnGoToLoginFromSignup = document.getElementById('btnGoToLoginFromSignup');
  if (btnGoToLoginFromSignup) {
    btnGoToLoginFromSignup.addEventListener('click', () => setScreen('masuk'));
  }

  // --- SCREEN 8: MASUK (SIGN IN) LISTENERS ---
  const btnToggleLoginPassword = document.getElementById('btnToggleLoginPassword');
  const loginPasswordInput = document.getElementById('loginPasswordInput');
  const loginEyeIcon = document.getElementById('loginEyeIcon');
  if (btnToggleLoginPassword && loginPasswordInput && loginEyeIcon) {
    btnToggleLoginPassword.addEventListener('click', () => {
      const isPass = loginPasswordInput.type === 'password';
      loginPasswordInput.type = isPass ? 'text' : 'password';
      loginEyeIcon.textContent = isPass ? 'visibility_off' : 'visibility';
    });
  }

  const btnSubmitLogin = document.getElementById('btnSubmitLogin');
  if (btnSubmitLogin) {
    btnSubmitLogin.addEventListener('click', () => {
      btnSubmitLogin.innerHTML = '<span class="material-symbols-outlined text-[20px] animate-spin">progress_activity</span><span>Masuk ke Dapur...</span>';
      setTimeout(() => {
        setScreen('beranda');
        showToast('Selamat datang kembali, Andi! 👋');
      }, 700);
    });
  }

  // Biometric Auth Modal Flow
  const btnBioAuth = document.getElementById('btnBioAuth');
  const biometricModal = document.getElementById('biometricModal');
  const btnCancelBio = document.getElementById('btnCancelBio');
  if (btnBioAuth && biometricModal) {
    btnBioAuth.addEventListener('click', () => {
      biometricModal.classList.remove('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        biometricModal.classList.add('opacity-0', 'pointer-events-none');
        setScreen('beranda');
        showToast('Autentikasi Sidik Jari Berhasil! 🔓');
      }, 1500);
    });
  }
  if (btnCancelBio && biometricModal) {
    btnCancelBio.addEventListener('click', () => {
      biometricModal.classList.add('opacity-0', 'pointer-events-none');
    });
  }

  const btnGoToSignupFromLogin = document.getElementById('btnGoToSignupFromLogin');
  if (btnGoToSignupFromLogin) {
    btnGoToSignupFromLogin.addEventListener('click', () => setScreen('daftar'));
  }

  // --- SCREEN 4: BERANDA LISTENERS ---
  const infoBtn = document.getElementById('infoBtn');
  if (infoBtn) {
    infoBtn.addEventListener('click', () => {
      showToast('Skor Food Risk dihitung otomatis berbasis masa simpan, suhu & kelembapan kulkas.', 'info');
    });
  }

  const btnBadgeLevel = document.getElementById('btnBadgeLevel');
  if (btnBadgeLevel) {
    btnBadgeLevel.addEventListener('click', () => setScreen('profil-dampak'));
  }

  const btnDetailRisk = document.getElementById('btnDetailRisk');
  if (btnDetailRisk) {
    btnDetailRisk.addEventListener('click', () => setScreen('inventaris-pindai'));
  }

  // Pillar Filters
  const filterPillarHigh = document.getElementById('filterPillarHigh');
  if (filterPillarHigh) {
    filterPillarHigh.addEventListener('click', () => {
      showToast('Memfilter 3 bahan risiko tinggi (< 2 hari)', 'priority_high');
    });
  }
  const filterPillarMedium = document.getElementById('filterPillarMedium');
  if (filterPillarMedium) {
    filterPillarMedium.addEventListener('click', () => {
      showToast('Menampilkan bahan risiko sedang (3-5 hari)', 'warning');
    });
  }
  const filterPillarSafe = document.getElementById('filterPillarSafe');
  if (filterPillarSafe) {
    filterPillarSafe.addEventListener('click', () => {
      showToast('Menampilkan 12 bahan aman (> 7 hari)', 'check_circle');
    });
  }

  // Urgent Items Actions
  document.querySelectorAll('.btn-cook-urgent').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const recipeTitle = btn.getAttribute('data-recipe') || 'Sambal Tomat Terasi & Ayam Suwir';
      openCookingModal(recipeTitle);
    });
  });

  document.querySelectorAll('.btn-note-urgent').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Catatan kedaluwarsa diperbarui: Susu UHT Plain (20 Mei 2024)', 'edit_note');
    });
  });

  // Quick Action Cards on Beranda
  const actionPromo = document.getElementById('actionPromo');
  if (actionPromo) {
    actionPromo.addEventListener('click', () => setScreen('inventaris-pindai'));
  }
  const actionScan = document.getElementById('actionScan');
  if (actionScan) {
    actionScan.addEventListener('click', () => openScannerModal());
  }
  const actionRescueRecipe = document.getElementById('actionRescueRecipe');
  if (actionRescueRecipe) {
    actionRescueRecipe.addEventListener('click', () => setScreen('resep-penyelamat'));
  }
  const actionDonate = document.getElementById('actionDonate');
  if (actionDonate) {
    actionDonate.addEventListener('click', () => setScreen('donasi-pangan'));
  }

  const btnCookRecommendation = document.getElementById('btnCookRecommendation');
  if (btnCookRecommendation) {
    btnCookRecommendation.addEventListener('click', () => {
      openCookingModal('Ayam Saus Tomat Gurih', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM2tT1TH7fBjdF9_Dy98NAczgQ2kgDUxwzARp-JxD0R3S2fAYU6RCh0nxW9u-Prg2ECn_MmlI0hSUh9jFGiScQKXbIlwk3H5vuSYprrTs2NCo4Ngrx_tEw_nEgvqMyUtuwDLMsvz7IjeMlapkc_D9aMaj9uBgdnF37-cl3u-8oVqrzsb3oZZusVqoiJRSlzRKwMwuabfBLlSbyArVSL2jAAh_w-LgYz7Q9f78S4Fx56_3ohBAkOf6Z');
    });
  }

  // --- SCREEN 3: INVENTARIS & PINDAI (PROMO TRAP DETECTOR) LISTENERS ---
  initPromoTrapLogic();

  // --- SCREEN 7: RESEP PENYELAMAT LISTENERS ---
  initRecipeListeners();

  // --- SCREEN 6: DONASI PANGAN LISTENERS ---
  initDonasiListeners();

  // --- SCREEN 5: PROFIL & LAPORAN LISTENERS ---
  initProfilListeners();

  // --- MODAL CONTROLLERS ---
  initModalControllers();
}

// Logic for Promo Trap Detector (Screen 3)
function initPromoTrapLogic() {
  let currentWeight = 3.0;
  const basePricePerKg = 9000;
  const normalPricePerKg = 15000;
  const avgWeeklyNeed = 0.6;
  const idealWeight = 1.2;

  const weightLabel = document.getElementById('weightLabel');
  const priceDisplay = document.getElementById('promoPriceDisplay');
  const normalPriceDisplay = document.getElementById('normalPriceDisplay');
  const pricePerKgDisplay = document.getElementById('pricePerKgDisplay');
  const riskCard = document.getElementById('riskCard');
  const btnMinus = document.getElementById('btnMinusWeight');
  const btnPlus = document.getElementById('btnPlusWeight');
  const btnApplyIdeal = document.getElementById('btnApplyIdeal');
  const btnKeepOriginal = document.getElementById('btnKeepOriginal');
  const btnSaveToPantryDirect = document.getElementById('btnSaveToPantryDirect');
  const preserveIdeas = document.getElementById('preserveIdeas');
  const tabManual = document.getElementById('tabManual');
  const tabLink = document.getElementById('tabLink');
  const scanModeNotice = document.getElementById('scanModeNotice');

  function updateMetrics() {
    if (!weightLabel || !priceDisplay || !riskCard) return;

    weightLabel.textContent = currentWeight.toFixed(1).replace('.', ',') + ' kg';
    const totalPrice = Math.round(currentWeight * basePricePerKg);
    const totalNormalPrice = Math.round(currentWeight * normalPricePerKg);
    priceDisplay.textContent = 'Rp' + totalPrice.toLocaleString('id-ID');
    if (normalPriceDisplay) normalPriceDisplay.textContent = 'Rp' + totalNormalPrice.toLocaleString('id-ID');
    if (pricePerKgDisplay) pricePerKgDisplay.textContent = '/ ' + currentWeight.toFixed(1).replace('.', ',') + ' kg';

    const maxTwoWeekNeed = avgWeeklyNeed * 2; // 1.2 kg
    if (currentWeight > maxTwoWeekNeed) {
      const excess = (currentWeight - maxTwoWeekNeed);
      const wastedMoney = Math.round(excess * basePricePerKg);

      riskCard.className = 'w-full bg-error-container/40 rounded-2xl p-space-md mb-space-md shadow-sm transition-all duration-300';
      riskCard.innerHTML = `
        <div class="flex items-start justify-between gap-2 mb-2">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-error text-[22px]" style="font-variation-settings: 'FILL' 1;">warning</span>
            <h3 class="font-headline-sm text-headline-sm text-error font-bold tracking-tight">Risiko Overbuy Terdeteksi!</h3>
          </div>
          <span class="font-label-sm text-label-sm bg-error text-on-error px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Tinggi</span>
        </div>
        <p class="font-body-md text-body-md text-on-surface leading-relaxed mb-3">
          Berdasarkan pola konsumsi rumah tanggamu, sekitar <span class="font-bold text-error">${excess.toFixed(1).replace('.', ',')} kg tomat</span> berpotensi busuk dan berakhir di tempat sampah sebelum sempat diolah.
        </p>
        <div class="grid grid-cols-2 gap-2 pt-1 mb-3">
          <div class="bg-surface-container-lowest/80 rounded-xl p-2.5 flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-full bg-error-container text-error flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[16px]">delete_sweep</span>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="font-label-sm text-label-sm text-on-surface-variant leading-none">Potensi Boncos</span>
              <span class="font-label-md text-label-md font-bold text-error mt-1 truncate">Rugi Rp${wastedMoney.toLocaleString('id-ID')}</span>
            </div>
          </div>
          <div class="bg-surface-container-lowest/80 rounded-xl p-2.5 flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-full bg-tertiary-container/20 text-tertiary flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[16px]">schedule</span>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="font-label-sm text-label-sm text-on-surface-variant leading-none">Masa Simpan</span>
              <span class="font-label-md text-label-md font-bold text-tertiary mt-1 truncate">Maks. 8-10 Hari</span>
            </div>
          </div>
        </div>
        <div class="bg-surface-container-lowest/60 rounded-xl p-2.5 flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px] text-secondary">trending_up</span>
            <span>Rata-rata konsumsi Anda:</span>
          </div>
          <span class="font-label-md text-label-md font-bold text-on-surface">0,6 kg / minggu</span>
        </div>
      `;
    } else {
      riskCard.className = 'w-full bg-secondary-container/50 rounded-2xl p-space-md mb-space-md shadow-sm transition-all duration-300';
      riskCard.innerHTML = `
        <div class="flex items-start justify-between gap-2 mb-2">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[22px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
            <h3 class="font-headline-sm text-headline-sm text-primary font-bold tracking-tight">Kuantitas Aman & Optimal!</h3>
          </div>
          <span class="font-label-sm text-label-sm bg-primary text-on-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Aman</span>
        </div>
        <p class="font-body-md text-body-md text-on-surface leading-relaxed">
          Hebat! Berat <strong class="text-primary font-bold">${currentWeight.toFixed(1).replace('.', ',')} kg</strong> sesuai dengan kecepatan masak mingguan dapur Anda. Kemungkinan limbah makanan: <span class="font-bold text-primary">0%</span>.
        </p>
      `;
    }
  }

  if (btnMinus) {
    btnMinus.addEventListener('click', () => {
      if (currentWeight > 0.5) {
        currentWeight = Math.round((currentWeight - 0.5) * 10) / 10;
        updateMetrics();
      }
    });
  }

  if (btnPlus) {
    btnPlus.addEventListener('click', () => {
      if (currentWeight < 10) {
        currentWeight = Math.round((currentWeight + 0.5) * 10) / 10;
        updateMetrics();
      }
    });
  }

  if (btnApplyIdeal) {
    btnApplyIdeal.addEventListener('click', () => {
      currentWeight = idealWeight;
      updateMetrics();
      btnApplyIdeal.innerHTML = `
        <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">task_alt</span>
        <span>Ukuran Disesuaikan ke 1,2 kg!</span>
      `;
      showToast('Kuantitas dioptimalkan ke 1,2 kg (Bebas Sampah) 🌱');
      setTimeout(() => {
        if (btnApplyIdeal) {
          btnApplyIdeal.innerHTML = `
            <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
            <span>Sesuaikan ke 1,2 kg (Paling Hemat)</span>
          `;
        }
      }, 2500);
    });
  }

  if (btnKeepOriginal && preserveIdeas) {
    btnKeepOriginal.addEventListener('click', () => {
      preserveIdeas.classList.toggle('hidden');
      preserveIdeas.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  if (btnSaveToPantryDirect) {
    btnSaveToPantryDirect.addEventListener('click', () => {
      showToast(`Tomat Segar (${currentWeight.toFixed(1).replace('.', ',')} kg) berhasil ditambahkan ke Kulkas!`);
      setTimeout(() => setScreen('beranda'), 800);
    });
  }

  if (tabManual && tabLink) {
    tabManual.addEventListener('click', () => {
      tabManual.className = "flex-1 py-2 px-3 rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md text-center transition-all shadow-sm flex items-center justify-center gap-1.5 font-bold";
      tabLink.className = "flex-1 py-2 px-3 rounded-full text-secondary font-label-md text-label-md text-center transition-all flex items-center justify-center gap-1.5 hover:text-on-surface font-semibold";
      if (scanModeNotice) scanModeNotice.classList.add('hidden');
    });

    tabLink.addEventListener('click', () => {
      tabLink.className = "flex-1 py-2 px-3 rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md text-center transition-all shadow-sm flex items-center justify-center gap-1.5 font-bold";
      tabManual.className = "flex-1 py-2 px-3 rounded-full text-secondary font-label-md text-label-md text-center transition-all flex items-center justify-center gap-1.5 hover:text-on-surface font-semibold";
      if (scanModeNotice) scanModeNotice.classList.remove('hidden');
    });
  }

  const btnOpenScannerFromPindai = document.getElementById('btnOpenScannerFromPindai');
  if (btnOpenScannerFromPindai) {
    btnOpenScannerFromPindai.addEventListener('click', () => openScannerModal());
  }
}

// Logic for Resep Penyelamat (Screen 7)
function initRecipeListeners() {
  const filterChips = document.querySelectorAll('.filter-chip');
  const recipeCards = document.querySelectorAll('.recipe-card');
  const countLabel = document.getElementById('recipeCountLabel');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => {
        c.className = "filter-chip px-3.5 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-all shadow-sm bg-surface-container-lowest text-on-surface hover:bg-surface-container active:scale-95 flex items-center gap-1.5 font-semibold";
      });
      chip.className = "filter-chip px-3.5 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-all shadow-sm bg-primary text-on-primary font-bold flex items-center gap-1.5 active:scale-95";

      const filter = chip.getAttribute('data-filter') || 'all';
      let visibleCount = 0;
      recipeCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });
      if (countLabel) countLabel.textContent = `${visibleCount} Resep Siap`;
    });
  });

  document.querySelectorAll('.btn-bookmark').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const icon = btn.querySelector('span');
      const isBookmarked = icon.textContent === 'bookmark';
      icon.textContent = isBookmarked ? 'bookmark_border' : 'bookmark';
      btn.classList.toggle('text-primary');
      showToast(isBookmarked ? 'Resep dihapus dari simpanan' : 'Resep disimpan ke Buku Masak Favorit! 🔖');
    });
  });

  document.querySelectorAll('.btn-cook-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title') || 'Sambal Tomat Terasi & Ayam Suwir';
      const img = btn.getAttribute('data-img');
      openCookingModal(title, img);
    });
  });
}

// Logic for Donasi Pangan (Screen 6)
function initDonasiListeners() {
  // Tabs switcher
  const donasiTabBtns = document.querySelectorAll('.tab-donasi-btn');
  donasiTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      donasiTabBtns.forEach(b => {
        b.className = "flex-1 py-2 text-center rounded-xl font-label-md text-label-md transition-all text-secondary hover:text-on-surface flex items-center justify-center gap-1.5 font-semibold tab-donasi-btn";
      });
      btn.className = "flex-1 py-2 text-center rounded-xl font-label-md text-label-md transition-all bg-surface-container-lowest text-primary shadow-sm font-bold flex items-center justify-center gap-1.5 tab-donasi-btn";

      const view = btn.getAttribute('data-view');
      if (view === 'map') {
        showToast('Menampilkan Peta Radar Mitra Terdekat 🗺️');
      } else if (view === 'list') {
        showToast('Menampilkan 8 Mitra UMKM Siap Jemput Pangan');
      } else if (view === 'history') {
        showToast('Riwayat Donasi: 14.2 kg pangan sukses tersalurkan!');
      }
    });
  });

  // Map Pins click to spotlight partner
  document.querySelectorAll('.map-pin').forEach(pin => {
    pin.addEventListener('click', () => {
      const partner = pin.getAttribute('data-partner');
      const partnerCard = document.getElementById('partnerCardBuSari');
      if (partnerCard) {
        partnerCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        partnerCard.classList.add('ring-4', 'ring-primary');
        setTimeout(() => partnerCard.classList.remove('ring-4', 'ring-primary'), 2000);
      }
      showToast(`Fokus ke: ${partner} 📍`);
    });
  });

  // Excess Pantry Checkboxes
  document.querySelectorAll('.excess-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      const id = cb.getAttribute('data-id');
      state.excessSelected[id] = cb.checked;
      const count = Object.values(state.excessSelected).filter(Boolean).length;
      const badge = document.getElementById('matchBadgeLabel');
      if (badge) badge.textContent = `Cocok ${count} Bahan Kamu`;
      showToast(`${count} bahan dipilih untuk disalurkan`);
    });
  });

  // Action buttons: Donasi & Jual Murah
  document.querySelectorAll('.btn-partner-action').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type');
      const partner = btn.getAttribute('data-partner') || 'Warung Makan Bu Sari';
      openDispatchModal(type, partner);
    });
  });

  const btnRecenterMap = document.getElementById('btnRecenterMap');
  if (btnRecenterMap) {
    btnRecenterMap.addEventListener('click', () => {
      showToast('Peta dikembalikan ke lokasimu: Jl. Gandaria Tengah IV');
    });
  }

  const btnChangeLocation = document.getElementById('btnChangeLocation');
  if (btnChangeLocation) {
    btnChangeLocation.addEventListener('click', () => {
      showToast('Pilih lokasi penjemputan baru...', 'pin_drop');
    });
  }
}

// Logic for Profil & Dampak (Screen 5)
function initProfilListeners() {
  const chartBars = document.querySelectorAll('.chart-bar-item');
  const chartInsightText = document.getElementById('chartInsightText');

  chartBars.forEach(bar => {
    bar.addEventListener('click', () => {
      chartBars.forEach(b => b.classList.remove('active'));
      bar.classList.add('active');
      const note = bar.getAttribute('data-note');
      if (chartInsightText && note) {
        chartInsightText.textContent = note;
      }
    });
  });

  document.querySelectorAll('.passport-badge').forEach(badge => {
    badge.addEventListener('click', () => {
      const msg = badge.getAttribute('data-msg') || 'Lencana berhasil diraih!';
      showToast(msg, 'military_tech');
    });
  });

  const btnShareStory = document.getElementById('btnShareStory');
  if (btnShareStory) {
    btnShareStory.addEventListener('click', () => openStoryModal());
  }

  const alarmToggle = document.getElementById('alarmToggleCheckbox');
  if (alarmToggle) {
    alarmToggle.addEventListener('change', () => {
      state.alarmEnabled = alarmToggle.checked;
      showToast(state.alarmEnabled ? 'Alarm Kedaluwarsa diaktifkan (H-3 & H-1)' : 'Alarm Kedaluwarsa dinonaktifkan', 'notifications');
    });
  }

  const btnDownloadCarbonPdf = document.getElementById('btnDownloadCarbonPdf');
  if (btnDownloadCarbonPdf) {
    btnDownloadCarbonPdf.addEventListener('click', () => {
      showToast('Mengunduh Laporan Jejak Karbon BEKAL-2024.pdf... 📄', 'download');
    });
  }

  const btnLogout = document.getElementById('btnLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      showToast('Sampai jumpa kembali, Andi! 👋');
      setTimeout(() => setScreen('masuk'), 600);
    });
  }
}

// Modal Helpers & Openers
function openScannerModal() {
  const modal = document.getElementById('scanCameraModal');
  if (modal) modal.classList.remove('opacity-0', 'pointer-events-none');
}

function openCookingModal(recipeTitle, imgUrl) {
  const modal = document.getElementById('cookingModal');
  const titleEl = document.getElementById('cookModalTitle');
  const imgEl = document.getElementById('cookModalImg');
  if (!modal) return;

  if (titleEl && recipeTitle) titleEl.textContent = recipeTitle;
  if (imgEl && imgUrl) imgEl.src = imgUrl;

  modal.classList.remove('opacity-0', 'pointer-events-none');
}

function openDispatchModal(type, partner) {
  donateItems(partner, type);
  const modal = document.getElementById('dispatchModal');
  if (modal) modal.classList.remove('opacity-0', 'pointer-events-none');
}

function openStoryModal() {
  const modal = document.getElementById('storyShareModal');
  if (modal) modal.classList.remove('opacity-0', 'pointer-events-none');
}

function initModalControllers() {
  // Scanner Modal close & scan triggers
  const closeScanModalBtn = document.getElementById('closeScanModalBtn');
  const scanCameraModal = document.getElementById('scanCameraModal');
  const btnTriggerScan = document.getElementById('btnTriggerScan');
  const scanProcessingOverlay = document.getElementById('scanProcessingOverlay');
  const btnSaveScanned = document.getElementById('btnSaveScanned');

  if (closeScanModalBtn && scanCameraModal) {
    closeScanModalBtn.addEventListener('click', () => {
      scanCameraModal.classList.add('opacity-0', 'pointer-events-none');
    });
  }

  if (btnTriggerScan && scanProcessingOverlay) {
    btnTriggerScan.addEventListener('click', () => {
      scanProcessingOverlay.classList.remove('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        scanProcessingOverlay.classList.add('opacity-0', 'pointer-events-none');
        showToast('3 bahan berhasil diekstrak dari struk! 🧾');
      }, 1400);
    });
  }

  if (btnSaveScanned && scanCameraModal) {
    btnSaveScanned.addEventListener('click', () => {
      scanCameraModal.classList.add('opacity-0', 'pointer-events-none');
      showToast('Bahan belanjaan tersimpan ke Smart Pantry!');
      setScreen('beranda');
    });
  }

  // Cooking Modal close, timer, finish
  const closeCookingModalBtn = document.getElementById('closeCookingModalBtn');
  const cookingModal = document.getElementById('cookingModal');
  const btnCookTimerToggle = document.getElementById('btnCookTimerToggle');
  const cookTimerDisplay = document.getElementById('cookTimerDisplay');
  const timerPlayIcon = document.getElementById('timerPlayIcon');
  const timerPlayText = document.getElementById('timerPlayText');
  const btnFinishCooking = document.getElementById('btnFinishCooking');

  if (closeCookingModalBtn && cookingModal) {
    closeCookingModalBtn.addEventListener('click', () => {
      cookingModal.classList.add('opacity-0', 'pointer-events-none');
      clearInterval(cookingTimerInterval);
      isCookingTimerRunning = false;
    });
  }

  if (btnCookTimerToggle && cookTimerDisplay) {
    btnCookTimerToggle.addEventListener('click', () => {
      if (isCookingTimerRunning) {
        clearInterval(cookingTimerInterval);
        isCookingTimerRunning = false;
        if (timerPlayIcon) timerPlayIcon.textContent = 'play_arrow';
        if (timerPlayText) timerPlayText.textContent = 'Lanjut';
      } else {
        isCookingTimerRunning = true;
        if (timerPlayIcon) timerPlayIcon.textContent = 'pause';
        if (timerPlayText) timerPlayText.textContent = 'Jeda';
        cookingTimerInterval = setInterval(() => {
          if (cookingSecondsLeft > 0) {
            cookingSecondsLeft--;
            const mins = String(Math.floor(cookingSecondsLeft / 60)).padStart(2, '0');
            const secs = String(cookingSecondsLeft % 60).padStart(2, '0');
            cookTimerDisplay.textContent = `${mins}:${secs}`;
          } else {
            clearInterval(cookingTimerInterval);
            showToast('Waktu memasak selesai! Aromanya sedap sekali 🍲');
          }
        }, 1000);
      }
    });
  }

  if (btnFinishCooking && cookingModal) {
    btnFinishCooking.addEventListener('click', () => {
      completeRecipe('Sambal Tomat & Ayam Suwir', 50, 45000);
      cookingModal.classList.add('opacity-0', 'pointer-events-none');
      clearInterval(cookingTimerInterval);
      showToast('Selamat! Masakan siap dinikmati & stok kulkas ter-update (+50 XP) 🎉', 'military_tech');
      setTimeout(() => renderApp(), 400);
    });
  }

  // Dispatch modal
  const closeDispatchBtn = document.getElementById('closeDispatchBtn');
  const dispatchModal = document.getElementById('dispatchModal');
  const btnConfirmDispatchDone = document.getElementById('btnConfirmDispatchDone');
  if (closeDispatchBtn && dispatchModal) {
    closeDispatchBtn.addEventListener('click', () => dispatchModal.classList.add('opacity-0', 'pointer-events-none'));
  }
  if (btnConfirmDispatchDone && dispatchModal) {
    btnConfirmDispatchDone.addEventListener('click', () => {
      dispatchModal.classList.add('opacity-0', 'pointer-events-none');
      showToast('Bahan berhasil diserahkan ke kurir relawan! Terima kasih 🤝', 'volunteer_activism');
      renderApp();
    });
  }

  // Story modal
  const closeStoryModalBtn = document.getElementById('closeStoryModalBtn');
  const storyShareModal = document.getElementById('storyShareModal');
  const btnDownloadStory = document.getElementById('btnDownloadStory');
  if (closeStoryModalBtn && storyShareModal) {
    closeStoryModalBtn.addEventListener('click', () => storyShareModal.classList.add('opacity-0', 'pointer-events-none'));
  }
  if (btnDownloadStory && storyShareModal) {
    btnDownloadStory.addEventListener('click', () => {
      storyShareModal.classList.add('opacity-0', 'pointer-events-none');
      showToast('Grafis Instagram Story siap dibagikan! 📸');
    });
  }
}

// Subscribe to state changes and re-render
subscribe((state, changedKey) => {
  renderApp();
});

// App Startup
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});
