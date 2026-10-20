// BEKAL Application Main Controller & Router
import { state, subscribe, setScreen, toggleDeviceMode, toggleDarkMode, completeRecipe, donateItems, syncWithBackend, setUser, logoutUser, addInventoryItem, consumeInventoryItem, getRecipeById } from './state.js';
import { bekalApi } from './api.js';
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

  // Backend Sync button
  const btnBackendSync = document.getElementById('btnBackendSync');
  if (btnBackendSync) {
    btnBackendSync.addEventListener('click', async () => {
      showToast('Menyinkronkan data dengan Backend Express...', 'sync');
      await syncWithBackend();
      if (state.backendConnected) {
        showToast('Backend API Express & Better Auth Aktif! 🟢', 'cloud_done');
      } else {
        showToast('Backend offline, menggunakan fallback lokal cerdas 🟡', 'cloud_off');
      }
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
      stopCamera();
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
  const signupForm = document.getElementById('signupForm');
  const btnSubmitSignup = document.getElementById('btnSubmitSignup');

  function handleSignup() {
    const fullNameInput = document.getElementById('fullNameInput');
    const emailInput = document.getElementById('emailInput');
    const enteredName = (fullNameInput && fullNameInput.value.trim()) || 'Panji Fajar';
    const enteredEmail = (emailInput && emailInput.value.trim()) || 'panji.fajar@bekal.id';

    setUser({
      name: enteredName,
      email: enteredEmail
    });

    if (btnSubmitSignup) {
      btnSubmitSignup.innerHTML = '<span class="material-symbols-outlined text-[20px] animate-spin">progress_activity</span><span>Menyiapkan Dapurmu...</span>';
    }
    setTimeout(() => {
      setScreen('beranda');
      showToast(`Selamat bergabung di BEKAL, ${state.user.name.split(' ')[0]}! 🌱`, 'eco');
    }, 600);
  }

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSignup();
    });
  }
  if (btnSubmitSignup) {
    btnSubmitSignup.addEventListener('click', (e) => {
      e.preventDefault();
      handleSignup();
    });
  }

  const btnGoogleSignUp = document.getElementById('btnGoogleSignUp');
  if (btnGoogleSignUp) {
    btnGoogleSignUp.addEventListener('click', () => {
      setUser({
        name: "Panji Fajar",
        email: "panji.fajar@gmail.com"
      });
      showToast('Mendaftar dengan Akun Google...', 'login');
      setTimeout(() => {
        setScreen('beranda');
        showToast(`Selamat bergabung di BEKAL, ${state.user.name.split(' ')[0]}! 🌱`, 'eco');
      }, 600);
    });
  }

  const btnAppleSignUp = document.getElementById('btnAppleSignUp');
  if (btnAppleSignUp) {
    btnAppleSignUp.addEventListener('click', () => {
      setUser({
        name: "Panji Fajar",
        email: "panji.fajar@icloud.com"
      });
      showToast('Mendaftar dengan Apple ID...', 'login');
      setTimeout(() => {
        setScreen('beranda');
        showToast(`Selamat bergabung di BEKAL, ${state.user.name.split(' ')[0]}! 🌱`, 'eco');
      }, 600);
    });
  }

  const btnGoToLoginFromSignup = document.getElementById('btnGoToLoginFromSignup');
  if (btnGoToLoginFromSignup) {
    btnGoToLoginFromSignup.addEventListener('click', () => setScreen('masuk'));
  }

  // --- SCREEN 8: MASUK (SIGN IN) LISTENERS ---
  const btnGoogleSignIn = document.getElementById('btnGoogleSignIn');
  if (btnGoogleSignIn) {
    btnGoogleSignIn.addEventListener('click', () => {
      setUser({ name: "Panji Fajar", email: "panji.fajar@gmail.com" });
      showToast('Masuk dengan Akun Google...', 'login');
      setTimeout(() => {
        setScreen('beranda');
        showToast(`Selamat datang kembali, ${state.user.name.split(' ')[0]}! 👋`);
      }, 600);
    });
  }

  const btnAppleSignIn = document.getElementById('btnAppleSignIn');
  if (btnAppleSignIn) {
    btnAppleSignIn.addEventListener('click', () => {
      setUser({ name: "Panji Fajar", email: "panji.fajar@icloud.com" });
      showToast('Masuk dengan Apple ID...', 'login');
      setTimeout(() => {
        setScreen('beranda');
        showToast(`Selamat datang kembali, ${state.user.name.split(' ')[0]}! 👋`);
      }, 600);
    });
  }

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

  const loginForm = document.getElementById('loginForm');
  const btnSubmitLogin = document.getElementById('btnSubmitLogin');

  function handleLogin() {
    const identifierInput = document.getElementById('identifierInput');
    const entered = (identifierInput && identifierInput.value.trim()) || '';
    let name = "Panji Fajar";
    let email = "panji.fajar@bekal.id";

    if (entered) {
      if (entered.includes('@')) {
        email = entered;
        const prefix = entered.split('@')[0];
        name = prefix.split(/[._-]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      } else {
        name = entered;
        email = `${entered.toLowerCase().replace(/\s+/g, '.')}@bekal.id`;
      }
    } else if (state.user && state.user.name && !state.user.name.toLowerCase().includes('andi')) {
      name = state.user.name;
      email = state.user.email;
    }

    setUser({ name, email });

    if (btnSubmitLogin) {
      btnSubmitLogin.innerHTML = '<span class="material-symbols-outlined text-[20px] animate-spin">progress_activity</span><span>Masuk ke Dapur...</span>';
    }
    setTimeout(() => {
      setScreen('beranda');
      showToast(`Selamat datang kembali, ${state.user.name.split(' ')[0]}! 👋`);
    }, 600);
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleLogin();
    });
  }
  if (btnSubmitLogin) {
    btnSubmitLogin.addEventListener('click', (e) => {
      e.preventDefault();
      handleLogin();
    });
  }

  // Forgot Password Modal
  const btnForgotPassword = document.getElementById('btnForgotPassword');
  const forgotPasswordModal = document.getElementById('forgotPasswordModal');
  const closeForgotModalBtn = document.getElementById('closeForgotModalBtn');
  const btnSendResetLink = document.getElementById('btnSendResetLink');

  if (btnForgotPassword && forgotPasswordModal) {
    btnForgotPassword.addEventListener('click', () => {
      forgotPasswordModal.classList.remove('opacity-0', 'pointer-events-none');
    });
  }
  if (closeForgotModalBtn && forgotPasswordModal) {
    closeForgotModalBtn.addEventListener('click', () => {
      forgotPasswordModal.classList.add('opacity-0', 'pointer-events-none');
    });
  }
  if (btnSendResetLink && forgotPasswordModal) {
    btnSendResetLink.addEventListener('click', () => {
      forgotPasswordModal.classList.add('opacity-0', 'pointer-events-none');
      showToast('Tautan reset kata sandi telah dikirim ke email! 📩', 'mark_email_read');
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
        showToast(`Autentikasi Berhasil! Selamat datang, ${state.user.name.split(' ')[0]}! 🔓`);
      }, 1200);
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
  // Pillar Filters on Beranda
  const filterPillarHigh = document.getElementById('filterPillarHigh');
  if (filterPillarHigh) {
    filterPillarHigh.addEventListener('click', () => {
      document.querySelectorAll('#urgentItemsContainer > div').forEach(card => {
        const lvl = card.getAttribute('data-risk-level');
        card.style.display = (lvl === 'high') ? 'flex' : 'none';
      });
      showToast('Menampilkan bahan risiko tinggi (< 2 hari) ⚠️', 'priority_high');
    });
  }
  const filterPillarMedium = document.getElementById('filterPillarMedium');
  if (filterPillarMedium) {
    filterPillarMedium.addEventListener('click', () => {
      document.querySelectorAll('#urgentItemsContainer > div').forEach(card => {
        const lvl = card.getAttribute('data-risk-level');
        card.style.display = (lvl === 'medium') ? 'flex' : 'none';
      });
      showToast('Menampilkan bahan risiko sedang (3-5 hari) 🟡', 'warning');
    });
  }
  const filterPillarSafe = document.getElementById('filterPillarSafe');
  if (filterPillarSafe) {
    filterPillarSafe.addEventListener('click', () => {
      document.querySelectorAll('#urgentItemsContainer > div').forEach(card => {
        const lvl = card.getAttribute('data-risk-level');
        card.style.display = (lvl === 'safe') ? 'flex' : 'none';
      });
      showToast('Menampilkan bahan aman (> 7 hari) 🟢', 'check_circle');
    });
  }

  // See All Urgent Button on Beranda
  const btnSeeAllUrgent = document.getElementById('btnSeeAllUrgent');
  if (btnSeeAllUrgent) {
    btnSeeAllUrgent.addEventListener('click', () => setScreen('inventaris-pindai'));
  }

  // Urgent Items Cooking Actions
  document.querySelectorAll('.btn-cook-urgent').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const recipeTitle = btn.getAttribute('data-recipe') || 'Sambal Tomat Terasi & Ayam Suwir';
      openCookingModal(recipeTitle);
    });
  });

  // Quick Consume Button
  document.querySelectorAll('.btn-consume-quick').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      const item = consumeInventoryItem(id);
      if (item) {
        showToast(`"${item.name}" telah dikonsumsi! (+25 XP) 🎉`, 'military_tech');
      } else {
        showToast('Bahan berhasil ditandai habis!');
      }
      setTimeout(() => renderApp(), 300);
    });
  });

  // Quick Donate Button from Pantry
  document.querySelectorAll('.btn-donate-quick').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (id) state.excessSelected[id] = true;
      setScreen('donasi-pangan');
      showToast('Bahan dimasukkan ke daftar donasi surplus! 🤝');
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
  const btnGoToPantryScan = document.getElementById('btnGoToPantryScan');
  if (btnGoToPantryScan) {
    btnGoToPantryScan.addEventListener('click', () => openScannerModal());
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
      openCookingModal('Ayam Saus Tomat Gurih', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80', 'sambal-tomat-ayam-suwir');
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

// Logic for Inventaris & Promo Trap (Screen 3)
function initPromoTrapLogic() {
  // Empty state scan trigger
  const btnEmptyScan = document.getElementById('btnEmptyScan');
  if (btnEmptyScan) {
    btnEmptyScan.addEventListener('click', () => openScannerModal());
  }

  // Mode switcher tabs: Kulkas, Promo, Pindai
  const modeTabs = document.querySelectorAll('.tab-inventaris-mode');
  const sectionKulkas = document.getElementById('sectionKulkas');
  const sectionPromo = document.getElementById('sectionPromo');
  const sectionPindai = document.getElementById('sectionPindai');

  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      modeTabs.forEach(t => {
        t.className = "flex-1 py-2.5 px-2 rounded-xl text-secondary font-label-md text-label-md text-center transition-all flex items-center justify-center gap-1.5 hover:text-on-surface font-semibold tab-inventaris-mode";
      });
      tab.className = "flex-1 py-2.5 px-2 rounded-xl bg-surface-container-lowest text-primary font-label-md text-label-md text-center transition-all shadow-sm flex items-center justify-center gap-1.5 font-bold tab-inventaris-mode active";

      const mode = tab.getAttribute('data-mode');
      if (sectionKulkas) sectionKulkas.classList.toggle('hidden', mode !== 'kulkas');
      if (sectionPromo) sectionPromo.classList.toggle('hidden', mode !== 'promo');
      if (sectionPindai) sectionPindai.classList.toggle('hidden', mode !== 'pindai');

      if (mode === 'pindai') {
        startCamera('inlineLiveCameraFeed');
        showToast('Kamera AI OCR otomatis diaktifkan! 📸', 'photo_camera');
      } else {
        stopCamera();
      }
    });
  });

  // Category filter pills in Kulkas
  const catChips = document.querySelectorAll('.category-chip');
  const pantryCards = document.querySelectorAll('.pantry-card');
  catChips.forEach(chip => {
    chip.addEventListener('click', () => {
      catChips.forEach(c => c.className = "category-chip px-3 py-1 rounded-full text-xs font-semibold transition-all bg-surface-container-lowest text-on-surface hover:bg-surface-container shadow-xs");
      chip.className = "category-chip px-3 py-1 rounded-full text-xs font-bold transition-all bg-primary text-on-primary shadow-xs";

      const cat = chip.getAttribute('data-cat');
      pantryCards.forEach(card => {
        const itemCat = card.getAttribute('data-category') || '';
        card.style.display = (cat === 'all' || itemCat.includes(cat)) ? 'flex' : 'none';
      });
    });
  });

  // Search input in Kulkas
  const inputSearch = document.getElementById('inputSearchInventory');
  if (inputSearch) {
    inputSearch.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      pantryCards.forEach(card => {
        const name = card.getAttribute('data-name') || '';
        card.style.display = name.includes(q) ? 'flex' : 'none';
      });
    });
  }

  // Camera launcher button in Pindai
  const btnLaunchCameraModal = document.getElementById('btnLaunchCameraModal');
  if (btnLaunchCameraModal) {
    btnLaunchCameraModal.addEventListener('click', () => openScannerModal());
  }

  // Promo Trap Calculator state
  let currentProduct = {
    name: "Tomat Merah Segar",
    category: "Bahan Basah",
    weight: 3.0,
    basePricePerKg: 9000,
    normalPricePerKg: 15000,
    avgWeeklyNeed: 0.6,
    idealWeight: 1.2,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcM6LyXlAPH_K_ktaLenZLWcsi9bwsro6xsJ8ao8l5OB3qb2sJmqzz-5VpiiVJw8iF3-RFnmMPgymmMeONaANA7uywBvoBzUN_N3Z5LCL0ksCqT8tREFDH5g3C7tBNUOm3mAg562YiLL0wRf5GAhMrcYqF_kqsqzT9MlRtu8RknQBvgLa8rGZARvMcEsryXiJX-Ux_HxBLJoa8cfUm0Htku9EOYMKWXXGWio_nlLGQq-D84rWw_JRf"
  };

  const weightLabel = document.getElementById('weightLabel');
  const priceDisplay = document.getElementById('promoPriceDisplay');
  const normalPriceDisplay = document.getElementById('normalPriceDisplay');
  const pricePerKgDisplay = document.getElementById('pricePerKgDisplay');
  const promoNameDisplay = document.getElementById('promoNameDisplay');
  const promoCatDisplay = document.getElementById('promoCatDisplay');
  const promoImgDisplay = document.getElementById('promoImgDisplay');
  const riskCard = document.getElementById('riskCard');
  const btnMinus = document.getElementById('btnMinusWeight');
  const btnPlus = document.getElementById('btnPlusWeight');
  const btnApplyIdeal = document.getElementById('btnApplyIdeal');
  const btnKeepOriginal = document.getElementById('btnKeepOriginal');
  const btnSaveToPantryDirect = document.getElementById('btnSaveToPantryDirect');
  const preserveIdeas = document.getElementById('preserveIdeas');

  // Preset buttons
  document.querySelectorAll('.promo-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.promo-preset-btn').forEach(b => {
        b.className = "promo-preset-btn p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low text-left flex flex-col font-semibold text-on-surface text-xs";
      });
      btn.className = "promo-preset-btn p-2.5 rounded-xl border-2 border-primary bg-secondary-container/30 text-left flex flex-col font-bold text-on-surface text-xs";

      currentProduct.name = btn.getAttribute('data-name');
      currentProduct.weight = parseFloat(btn.getAttribute('data-weight'));
      currentProduct.category = btn.getAttribute('data-cat');
      currentProduct.img = btn.getAttribute('data-img');
      if (btn.getAttribute('data-name').includes('Ayam')) {
        currentProduct.basePricePerKg = 32500;
        currentProduct.normalPricePerKg = 45000;
        currentProduct.avgWeeklyNeed = 0.5;
        currentProduct.idealWeight = 0.8;
      } else {
        currentProduct.basePricePerKg = 9000;
        currentProduct.normalPricePerKg = 15000;
        currentProduct.avgWeeklyNeed = 0.6;
        currentProduct.idealWeight = 1.2;
      }

      if (promoNameDisplay) promoNameDisplay.textContent = currentProduct.name;
      if (promoCatDisplay) promoCatDisplay.textContent = currentProduct.category;
      if (promoImgDisplay) promoImgDisplay.src = currentProduct.img;
      updateMetrics();
    });
  });

  function updateMetrics() {
    if (!weightLabel || !priceDisplay || !riskCard) return;

    weightLabel.textContent = currentProduct.weight.toFixed(1).replace('.', ',') + ' kg';
    const totalPrice = Math.round(currentProduct.weight * currentProduct.basePricePerKg);
    const totalNormalPrice = Math.round(currentProduct.weight * currentProduct.normalPricePerKg);
    priceDisplay.textContent = 'Rp' + totalPrice.toLocaleString('id-ID');
    if (normalPriceDisplay) normalPriceDisplay.textContent = 'Rp' + totalNormalPrice.toLocaleString('id-ID');
    if (pricePerKgDisplay) pricePerKgDisplay.textContent = '/ ' + currentProduct.weight.toFixed(1).replace('.', ',') + ' kg';

    const maxTwoWeekNeed = currentProduct.avgWeeklyNeed * 2;
    if (currentProduct.weight > maxTwoWeekNeed) {
      const excess = (currentProduct.weight - maxTwoWeekNeed);
      const wastedMoney = Math.round(excess * currentProduct.basePricePerKg);

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
          Berdasarkan pola konsumsi rumah tanggamu, sekitar <span class="font-bold text-error">${excess.toFixed(1).replace('.', ',')} kg ${currentProduct.name}</span> berpotensi busuk sebelum sempat diolah.
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
              <span class="font-label-md text-label-md font-bold text-tertiary mt-1 truncate">Maks. 5-8 Hari</span>
            </div>
          </div>
        </div>
        <div class="bg-surface-container-lowest/60 rounded-xl p-2.5 flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px] text-secondary">trending_up</span>
            <span>Rata-rata konsumsi rumah tangga Anda:</span>
          </div>
          <span class="font-label-md text-label-md font-bold text-on-surface">${currentProduct.avgWeeklyNeed} kg / minggu</span>
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
          Hebat! Berat <strong class="text-primary font-bold">${currentProduct.weight.toFixed(1).replace('.', ',')} kg</strong> sesuai dengan kecepatan masak mingguan dapur Anda. Kemungkinan limbah makanan: <span class="font-bold text-primary">0%</span>.
        </p>
      `;
    }
  }

  if (btnMinus) {
    btnMinus.addEventListener('click', () => {
      if (currentProduct.weight > 0.5) {
        currentProduct.weight = Math.round((currentProduct.weight - 0.5) * 10) / 10;
        updateMetrics();
      }
    });
  }

  if (btnPlus) {
    btnPlus.addEventListener('click', () => {
      if (currentProduct.weight < 10) {
        currentProduct.weight = Math.round((currentProduct.weight + 0.5) * 10) / 10;
        updateMetrics();
      }
    });
  }

  if (btnApplyIdeal) {
    btnApplyIdeal.addEventListener('click', () => {
      currentProduct.weight = currentProduct.idealWeight;
      updateMetrics();
      btnApplyIdeal.innerHTML = `
        <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">task_alt</span>
        <span>Ukuran Disesuaikan ke ${currentProduct.idealWeight} kg!</span>
      `;
      showToast(`Kuantitas dioptimalkan ke ${currentProduct.idealWeight} kg (Bebas Sampah) 🌱`);
      setTimeout(() => {
        if (btnApplyIdeal) {
          btnApplyIdeal.innerHTML = `
            <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
            <span>Sesuaikan ke ${currentProduct.idealWeight} kg (Paling Hemat)</span>
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
      addInventoryItem({
        name: currentProduct.name,
        category: currentProduct.category,
        weight: currentProduct.weight,
        unit: 'kg',
        location: 'Chiller Sayur',
        expiryDays: 8
      });
      showToast(`${currentProduct.name} (${currentProduct.weight.toFixed(1).replace('.', ',')} kg) berhasil ditambahkan ke Kulkas! 🥦`);
      setTimeout(() => {
        setScreen('inventaris-pindai');
        renderApp();
      }, 400);
    });
  }
}

// Logic for Resep Penyelamat (Screen 7)
function initRecipeListeners() {
  const filterChips = document.querySelectorAll('.filter-chip');
  const recipeCards = document.querySelectorAll('.recipe-card');
  const countLabel = document.getElementById('recipeCountLabel');
  const inputSearchRecipe = document.getElementById('inputSearchRecipe');

  // Search filter
  if (inputSearchRecipe) {
    inputSearchRecipe.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      let visibleCount = 0;
      recipeCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const matches = text.includes(q);
        card.classList.toggle('hidden', !matches);
        if (matches) visibleCount++;
      });
      if (countLabel) countLabel.textContent = `${visibleCount} Resep Ditemukan`;
    });
  }

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

  // Open Recipe Detail Modal
  document.querySelectorAll('.btn-recipe-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const recipeId = btn.getAttribute('data-id');
      openRecipeDetailModal(recipeId);
    });
  });

  document.querySelectorAll('.btn-cook-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const recipeId = btn.getAttribute('data-id');
      const title = btn.getAttribute('data-title') || 'Sambal Tomat Terasi & Ayam Suwir';
      const img = btn.getAttribute('data-img');
      openCookingModal(title, img, recipeId);
    });
  });
}

// Logic for Donasi Pangan (Screen 6)
function initDonasiListeners() {
  const donasiTabBtns = document.querySelectorAll('.tab-donasi-btn');
  const donasiMapView = document.getElementById('donasiMapView');
  const donasiListView = document.getElementById('donasiListView');
  const donasiHistoryView = document.getElementById('donasiHistoryView');

  donasiTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      donasiTabBtns.forEach(b => {
        b.className = "flex-1 py-2 text-center rounded-xl font-label-md text-label-md transition-all text-secondary hover:text-on-surface flex items-center justify-center gap-1.5 font-semibold tab-donasi-btn";
      });
      btn.className = "flex-1 py-2 text-center rounded-xl font-label-md text-label-md transition-all bg-surface-container-lowest text-primary shadow-sm font-bold flex items-center justify-center gap-1.5 tab-donasi-btn";

      const view = btn.getAttribute('data-view');
      if (donasiMapView) donasiMapView.classList.toggle('hidden', view !== 'map');
      if (donasiListView) donasiListView.classList.toggle('hidden', view !== 'list');
      if (donasiHistoryView) donasiHistoryView.classList.toggle('hidden', view !== 'history');

      if (view === 'map') {
        showToast('Menampilkan Peta Radar Mitra Terdekat 🗺️');
      } else if (view === 'list') {
        showToast('Menampilkan 4 Mitra UMKM Siap Jemput Pangan');
      } else if (view === 'history') {
        showToast(`Riwayat Donasi: ${state.donationHistory.length} aksi tercatat!`);
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

  // WhatsApp Contact Trigger
  document.querySelectorAll('.btn-contact-wa').forEach(btn => {
    btn.addEventListener('click', () => {
      const phone = btn.getAttribute('data-phone') || '628123456789';
      showToast('Membuka WhatsApp untuk koordinasi penjemputan... 📲', 'chat');
      window.open(`https://wa.me/${phone}?text=Halo%20saya%20ingin%20menyalurkan%20bahan%20surplus%20dari%20BEKAL`, '_blank');
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

  const btnImpactDetails = document.getElementById('btnImpactDetails');
  if (btnImpactDetails) {
    btnImpactDetails.addEventListener('click', () => {
      showToast(`📊 Rekap: ${state.user.foodSavedKg} kg pangan, hemat Rp${state.user.moneySavedRp.toLocaleString('id-ID')}, dan cegah ${state.user.co2PreventedKg} kg CO2!`, 'eco');
    });
  }

  const btnSettingMealPref = document.getElementById('btnSettingMealPref');
  if (btnSettingMealPref) {
    btnSettingMealPref.addEventListener('click', () => {
      const modes = ['solo', 'small', 'large'];
      const nextMode = modes[(modes.indexOf(state.user.household || 'small') + 1) % modes.length];
      setUser({ household: nextMode });
      const label = nextMode === 'solo' ? '1 Orang Dewasa (Solo)' : nextMode === 'large' ? '5+ Orang (Keluarga Besar)' : '3 Orang Dewasa (Keluarga Kecil)';
      showToast(`Preferensi porsi diubah: ${label} 🍽️`);
    });
  }

  const btnSettingMerchant = document.getElementById('btnSettingMerchant');
  if (btnSettingMerchant) {
    btnSettingMerchant.addEventListener('click', () => {
      showToast('Merchant Mitra: Superindo & Pasar Jaya terhubung & tersinkronisasi 🛒', 'sync');
    });
  }

  const btnDownloadCarbonPdf = document.getElementById('btnDownloadCarbonPdf');
  if (btnDownloadCarbonPdf) {
    btnDownloadCarbonPdf.addEventListener('click', () => {
      const reportContent = `================================================
LAPORAN JEJAK KARBON & DAMPAK LINGKUNGAN BEKAL 2024
================================================
Nama Pengguna : ${state.user.name}
Email         : ${state.user.email}
Peringkat     : ${state.user.levelTitle} (Level ${state.user.level})
------------------------------------------------
METRIK PENYELAMATAN DAPUR:
- Makanan Diselamatkan : ${state.user.foodSavedKg} kg
- Penghematan Anggaran : Rp ${state.user.moneySavedRp.toLocaleString('id-ID')}
- Emisi CO2 Dicegah    : ${state.user.co2PreventedKg} kg CO2e
- Mitra Sosial Terbantu: ${state.user.partnersHelped} Organisasi
- Skor Efisiensi Dapur : ${state.user.healthScore}%
------------------------------------------------
Status Audit: TERVERIFIKASI SISTEM BEKAL ZERO FOOD WASTE
Diterbitkan secara otomatis untuk jejak ESG pribadi.
================================================`;

      const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Laporan-Dampak-BEKAL-${state.user.name.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Laporan dampak lingkungan berhasil diunduh! 📄', 'download');
    });
  }

  const btnLogout = document.getElementById('btnLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      const formerName = state.user.name.split(' ')[0] || 'Teman';
      logoutUser();
      showToast(`Sampai jumpa kembali, ${formerName}! 👋`);
      setTimeout(() => setScreen('masuk'), 600);
    });
  }
}

// Camera Controller for Live OCR & Receipt Scanner
let currentCameraStream = null;

async function startCamera(videoElementId) {
  try {
    stopCamera();
    const videoEl = document.getElementById(videoElementId);
    if (!videoEl) return;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false
      });
      currentCameraStream = stream;
      videoEl.srcObject = stream;
      videoEl.setAttribute('autoplay', '');
      videoEl.setAttribute('playsinline', '');
      videoEl.setAttribute('muted', '');
      videoEl.muted = true;
      videoEl.classList.remove('hidden');
      await videoEl.play().catch(e => console.warn('Video play error:', e));

      // Show camera status indicator
      const parent = videoEl.parentElement;
      const statusPill = parent ? parent.querySelector('#liveCameraStatusPill, #cameraModalStatusPill') : null;
      if (statusPill) {
        statusPill.classList.remove('hidden');
        statusPill.innerHTML = '<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span><span class="text-xs font-bold text-primary">Kamera Aktif</span>';
      }
    }
  } catch (err) {
    console.warn('Camera stream notice (permission denied or no device):', err);
  }
}

function stopCamera() {
  if (currentCameraStream) {
    try {
      currentCameraStream.getTracks().forEach(track => track.stop());
    } catch (e) {
      console.warn('Error stopping stream tracks:', e);
    }
    currentCameraStream = null;
  }
  const inlineVideo = document.getElementById('inlineLiveCameraFeed');
  if (inlineVideo) {
    try { inlineVideo.pause(); } catch(e){}
    inlineVideo.srcObject = null;
    inlineVideo.classList.add('hidden');
  }
  const modalVideo = document.getElementById('modalLiveCameraVideo');
  if (modalVideo) {
    try { modalVideo.pause(); } catch(e){}
    modalVideo.srcObject = null;
    modalVideo.classList.add('hidden');
  }
  const statusPills = document.querySelectorAll('#liveCameraStatusPill, #cameraModalStatusPill');
  statusPills.forEach(pill => pill.classList.add('hidden'));
}

// Modal Helpers & Openers
let currentCookingRecipe = null;
let currentDetailRecipe = null;

function openScannerModal() {
  const modal = document.getElementById('scanCameraModal');
  if (modal) {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    startCamera('modalLiveCameraVideo');
    showToast('Kamera pemindai struk otomatis dibuka! 📸', 'photo_camera');
  }
}

function openRecipeDetailModal(recipeId) {
  const recipe = getRecipeById(recipeId) || state.recipes[0];
  if (!recipe) return;
  currentDetailRecipe = recipe;

  const modal = document.getElementById('recipeDetailModal');
  const imgEl = document.getElementById('detailModalImg');
  const titleEl = document.getElementById('detailModalTitle');
  const tagEl = document.getElementById('detailModalTag');
  const scoreEl = document.getElementById('detailModalScore');
  const timeEl = document.getElementById('detailModalTime');
  const portionsEl = document.getElementById('detailModalPortions');
  const caloriesEl = document.getElementById('detailModalCalories');
  const subtitleEl = document.getElementById('detailModalSubtitle');
  const matchInfoEl = document.getElementById('detailModalMatchInfo');
  const ingredientsContainer = document.getElementById('detailModalIngredientsContainer');
  const stepsContainer = document.getElementById('detailModalStepsContainer');
  const zeroWasteTipEl = document.getElementById('detailModalZeroWasteTip');

  if (imgEl) imgEl.src = recipe.img;
  if (titleEl) titleEl.textContent = recipe.title;
  if (tagEl) tagEl.textContent = recipe.difficulty ? `Tingkat ${recipe.difficulty}` : 'Zero Waste Recipe';
  if (scoreEl) scoreEl.textContent = `Score ${recipe.score || 85}`;
  if (timeEl) timeEl.textContent = recipe.time;
  if (portionsEl) portionsEl.textContent = recipe.portions || '3 Porsi';
  if (caloriesEl) caloriesEl.textContent = recipe.calories || '285 kkal';
  if (subtitleEl) subtitleEl.textContent = recipe.subtitle || recipe.desc || 'Pedas gurih kaya rempah penyelamat stok dapur.';

  const pantryNames = state.inventory.map(i => (i.name || '').toLowerCase());
  const matchedCount = (recipe.ingredients || []).filter(ing => {
    const key = (ing.key || ing.name || '').toLowerCase();
    return pantryNames.some(pn => pn.includes(key) || key.includes(pn));
  }).length;

  if (matchInfoEl) matchInfoEl.textContent = `Cocok ${matchedCount} / ${(recipe.ingredients || []).length} Bahan Kulkas`;
  if (zeroWasteTipEl) zeroWasteTipEl.textContent = recipe.zeroWasteTip || 'Gunakan seluruh bagian bahan makanan secara optimal untuk meminimalkan sisa dapur!';

  if (ingredientsContainer) {
    ingredientsContainer.innerHTML = (recipe.ingredients || []).map(ing => {
      const key = (ing.key || ing.name || '').toLowerCase();
      const isAvailable = pantryNames.some(pn => pn.includes(key) || key.includes(pn));
      return `
        <div class="flex items-center justify-between p-2.5 rounded-xl ${isAvailable ? 'bg-primary/10 border border-primary/20' : 'bg-surface-container-low'}">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px] ${isAvailable ? 'text-primary' : 'text-secondary'}">
              ${isAvailable ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            <span class="font-label-md text-label-md font-semibold ${isAvailable ? 'text-on-surface' : 'text-secondary'}">
              ${ing.name}
            </span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="font-label-sm text-label-sm font-bold text-on-surface-variant">${ing.amount} ${ing.unit || ''}</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded font-bold ${isAvailable ? 'bg-primary text-on-primary' : 'bg-surface-container text-secondary'}">
              ${isAvailable ? 'Tersedia' : 'Belum Ada'}
            </span>
          </div>
        </div>
      `;
    }).join('');
  }

  if (stepsContainer) {
    stepsContainer.innerHTML = (recipe.steps || []).map((step, idx) => `
      <div class="flex gap-2.5 items-start p-2.5 rounded-xl bg-surface-container-lowest shadow-xs">
        <div class="w-6 h-6 rounded-full bg-secondary-container text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
          ${idx + 1}
        </div>
        <p class="font-body-sm text-body-sm text-on-surface leading-relaxed">
          ${step}
        </p>
      </div>
    `).join('');
  }

  if (modal) modal.classList.remove('opacity-0', 'pointer-events-none');
}

function openCookingModal(recipeTitle, imgUrl, recipeId) {
  let recipe = recipeId ? getRecipeById(recipeId) : null;
  if (!recipe && recipeTitle) {
    recipe = state.recipes.find(r => r.title.toLowerCase().includes(recipeTitle.toLowerCase()) || recipeTitle.toLowerCase().includes(r.title.toLowerCase()));
  }
  if (!recipe) recipe = state.recipes[0];
  currentCookingRecipe = recipe;

  const modal = document.getElementById('cookingModal');
  const titleEl = document.getElementById('cookModalTitle');
  const imgEl = document.getElementById('cookModalImg');
  const ingredientsContainer = document.getElementById('cookModalIngredientsContainer');
  const stepsContainer = document.getElementById('cookModalStepsContainer');
  if (!modal) return;

  if (titleEl) titleEl.textContent = (recipe && recipe.title) || recipeTitle || 'Resep Penyelamat Dapur';
  if (imgEl) imgEl.src = (recipe && recipe.img) || imgUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80';

  if (recipe && ingredientsContainer && recipe.ingredients) {
    ingredientsContainer.innerHTML = recipe.ingredients.map(ing => `
      <label class="flex items-center gap-2 p-2 rounded-lg bg-surface-container-lowest shadow-xs cursor-pointer hover:bg-surface-container transition-colors">
        <input type="checkbox" checked class="accent-primary w-4 h-4 rounded"/>
        <span class="text-on-surface font-medium text-xs sm:text-sm flex-1">${ing.name} (${ing.amount} ${ing.unit || ''})</span>
        <span class="text-[10px] text-primary font-bold">Siap Pakai</span>
      </label>
    `).join('');
  }

  if (recipe && stepsContainer && recipe.steps) {
    stepsContainer.innerHTML = recipe.steps.map((st, idx) => `
      <div class="flex gap-2.5 items-start p-2 rounded-xl bg-surface-container-lowest">
        <div class="w-6 h-6 rounded-full bg-secondary-container text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
          ${idx + 1}
        </div>
        <p class="font-body-sm text-body-sm text-on-surface leading-relaxed">${st}</p>
      </div>
    `).join('');
  }

  // Reset timer
  cookingSecondsLeft = 15 * 60;
  const cookTimerDisplay = document.getElementById('cookTimerDisplay');
  if (cookTimerDisplay) cookTimerDisplay.textContent = '15:00';

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
  // Recipe Detail Modal listeners
  const closeRecipeDetailModalBtn = document.getElementById('closeRecipeDetailModalBtn');
  const recipeDetailModal = document.getElementById('recipeDetailModal');
  const btnDetailToCook = document.getElementById('btnDetailToCook');
  const btnDetailBookmark = document.getElementById('btnDetailBookmark');

  if (closeRecipeDetailModalBtn && recipeDetailModal) {
    closeRecipeDetailModalBtn.addEventListener('click', () => {
      recipeDetailModal.classList.add('opacity-0', 'pointer-events-none');
    });
  }

  if (btnDetailBookmark) {
    btnDetailBookmark.addEventListener('click', () => {
      const icon = btnDetailBookmark.querySelector('span');
      if (icon) {
        const isBm = icon.textContent === 'bookmark';
        icon.textContent = isBm ? 'bookmark_border' : 'bookmark';
        showToast(isBm ? 'Resep dihapus dari simpanan' : 'Resep disimpan ke Buku Masak Favorit! 🔖');
      }
    });
  }

  if (btnDetailToCook && recipeDetailModal) {
    btnDetailToCook.addEventListener('click', () => {
      recipeDetailModal.classList.add('opacity-0', 'pointer-events-none');
      if (currentDetailRecipe) {
        openCookingModal(currentDetailRecipe.title, currentDetailRecipe.img, currentDetailRecipe.id);
      } else {
        openCookingModal('Sambal Tomat Terasi & Ayam Suwir');
      }
    });
  }

  // Scanner Modal close & scan triggers
  const closeScanModalBtn = document.getElementById('closeScanModalBtn');
  const scanCameraModal = document.getElementById('scanCameraModal');
  const btnTriggerScan = document.getElementById('btnTriggerScan');
  const scanProcessingOverlay = document.getElementById('scanProcessingOverlay');
  const btnSaveScanned = document.getElementById('btnSaveScanned');

  if (closeScanModalBtn && scanCameraModal) {
    closeScanModalBtn.addEventListener('click', () => {
      stopCamera();
      scanCameraModal.classList.add('opacity-0', 'pointer-events-none');
    });
  }

  let latestDetectedItems = [
    { name: "Ati Ayam Segar", quantity: 500, unit: "g", priceRp: 18000, category: "Protein Segar", estimatedShelfLifeDays: 3 },
    { name: "Tomat Merah Segar", quantity: 1.5, unit: "kg", priceRp: 15000, category: "Bahan Basah", estimatedShelfLifeDays: 7 },
    { name: "Wortel Manis", quantity: 1.0, unit: "kg", priceRp: 12000, category: "Sayuran Segar", estimatedShelfLifeDays: 8 },
  ];
  let latestReceiptId = "rcp_" + Date.now();

  if (btnTriggerScan && scanProcessingOverlay) {
    btnTriggerScan.addEventListener('click', async () => {
      scanProcessingOverlay.classList.remove('opacity-0', 'pointer-events-none');
      try {
        const ocrRes = await bekalApi.scanReceipt('data:image/jpeg;base64,camera_simulator_frame');
        if (ocrRes && ocrRes.data && Array.isArray(ocrRes.data.detectedItems)) {
          latestDetectedItems = ocrRes.data.detectedItems;
          latestReceiptId = ocrRes.data.receiptId;
          const scanResultBox = document.getElementById('scanResultBox');
          if (scanResultBox) {
            scanResultBox.innerHTML = `
              <div class="flex items-center justify-between text-label-sm font-label-sm text-secondary mb-1">
                <span>Hasil AI OCR (${ocrRes.data.merchantName || 'Pasar Segar'}):</span>
                <span class="text-primary font-bold">${latestDetectedItems.length} Item Ditemukan</span>
              </div>
              <div class="flex flex-col gap-1.5 font-body-sm text-body-sm max-h-36 overflow-y-auto">
                ${latestDetectedItems.map(item => `
                  <div class="flex items-center justify-between bg-surface-container-lowest p-2 rounded-lg">
                    <span class="font-medium text-on-surface">🥦 ${item.name} (${item.quantity} ${item.unit})</span>
                    <span class="text-primary font-bold">Rp${(item.priceRp || 20000).toLocaleString('id-ID')}</span>
                  </div>
                `).join('')}
              </div>
            `;
          }
        }
      } catch (e) {
        console.warn('OCR error:', e);
      } finally {
        scanProcessingOverlay.classList.add('opacity-0', 'pointer-events-none');
        showToast(`${latestDetectedItems.length} bahan diekstrak dari AI Scanner! 🧾`);
      }
    });
  }

  if (btnSaveScanned && scanCameraModal) {
    btnSaveScanned.addEventListener('click', async () => {
      stopCamera();
      scanCameraModal.classList.add('opacity-0', 'pointer-events-none');
      showToast('Menyimpan bahan hasil scan ke kulkas...', 'hourglass_top');
      
      // Save items to local inventory as well
      latestDetectedItems.forEach(item => {
        addInventoryItem({
          name: item.name,
          category: item.category || 'Bahan Basah',
          location: 'Kulkas Utama',
          weight: item.quantity || 1.0,
          unit: item.unit || 'kg',
          expiryDays: item.estimatedShelfLifeDays || 5,
          expiryDate: `${item.estimatedShelfLifeDays || 5} Hari Lagi`,
          risk: 45
        });
      });

      try {
        await bekalApi.confirmReceipt(latestReceiptId, latestDetectedItems);
        await syncWithBackend();
      } catch (e) {
        console.warn('Receipt sync notice:', e);
      }
      showToast(`${latestDetectedItems.length} bahan belanjaan berhasil masuk Smart Pantry! 🥦`, 'check_circle');
      setScreen('inventaris-pindai');
      renderApp();
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
      const finishedTitle = (currentCookingRecipe && currentCookingRecipe.title) || 'Sambal Tomat & Ayam Suwir';
      completeRecipe(finishedTitle, 50, 45000);
      cookingModal.classList.add('opacity-0', 'pointer-events-none');
      clearInterval(cookingTimerInterval);
      isCookingTimerRunning = false;
      showToast(`Selamat! Masakan "${finishedTitle}" siap dinikmati & stok kulkas ter-update (+50 XP) 🎉`, 'military_tech');
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

  // Add Pantry Item Modal Controller
  const addPantryModal = document.getElementById('addPantryModal');
  const closeAddPantryModalBtn = document.getElementById('closeAddPantryModalBtn');
  const formAddPantry = document.getElementById('formAddPantry');
  const btnSubmitAddPantry = document.getElementById('btnSubmitAddPantry');

  function openAddModal() {
    if (addPantryModal) addPantryModal.classList.remove('opacity-0', 'pointer-events-none');
  }
  function closeAddModal() {
    if (addPantryModal) addPantryModal.classList.add('opacity-0', 'pointer-events-none');
  }

  const btnOpenAddModal = document.getElementById('btnOpenAddModal');
  if (btnOpenAddModal) btnOpenAddModal.addEventListener('click', openAddModal);

  const btnEmptyAdd = document.getElementById('btnEmptyAdd');
  if (btnEmptyAdd) btnEmptyAdd.addEventListener('click', openAddModal);

  const btnGoToPantryAdd = document.getElementById('btnGoToPantryAdd');
  if (btnGoToPantryAdd) btnGoToPantryAdd.addEventListener('click', openAddModal);

  if (closeAddPantryModalBtn) closeAddPantryModalBtn.addEventListener('click', closeAddModal);

  function handleSaveNewPantryItem() {
    const nameEl = document.getElementById('addPantryName');
    const catEl = document.getElementById('addPantryCategory');
    const locEl = document.getElementById('addPantryLocation');
    const weightEl = document.getElementById('addPantryWeight');
    const unitEl = document.getElementById('addPantryUnit');
    const expiryEl = document.getElementById('addPantryExpiry');

    const name = (nameEl && nameEl.value.trim()) || 'Bahan Segar';
    const category = (catEl && catEl.value) || 'Sayur & Buah';
    const location = (locEl && locEl.value) || 'Kulkas Utama';
    const weight = parseFloat(weightEl && weightEl.value) || 1.0;
    const unit = (unitEl && unitEl.value) || 'kg';
    const expiryDays = parseInt(expiryEl && expiryEl.value) || 4;

    addInventoryItem({
      name,
      category,
      location,
      weight,
      unit,
      expiryDays,
      expiryDate: `${expiryDays} Hari Lagi`,
      risk: Math.max(15, Math.min(95, 100 - expiryDays * 12))
    });

    closeAddModal();
    if (formAddPantry) formAddPantry.reset();
    showToast(`"${name}" (${weight} ${unit}) disimpan ke Smart Pantry! 🥦`, 'check_circle');
    setTimeout(() => renderApp(), 300);
  }

  if (formAddPantry) {
    formAddPantry.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSaveNewPantryItem();
    });
  }
  if (btnSubmitAddPantry) {
    btnSubmitAddPantry.addEventListener('click', (e) => {
      e.preventDefault();
      handleSaveNewPantryItem();
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
  syncWithBackend();
});
