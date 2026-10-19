// Header component for BEKAL
import { state, setScreen } from '../state.js';

export function renderHeader() {
  const isAuthOrOnboarding = ['onboarding', 'daftar', 'masuk'].includes(state.currentScreen);
  const unreadCount = state.notifications.filter(n => n.unread).length;
  
  // Format current live time for status bar
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;

  if (state.currentScreen === 'onboarding') {
    return ''; // Onboarding has its own in-flow header
  }

  if (['daftar', 'masuk'].includes(state.currentScreen)) {
    const title = state.currentScreen === 'daftar' ? 'Sign Up' : 'Sign In';
    return `
      <header class="fixed top-0 w-full z-40 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div class="h-16 px-margin flex items-center justify-between">
          <button aria-label="Kembali" class="w-11 h-11 -ml-space-xs rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors" id="headerBackBtn" type="button">
            <span class="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
          </button>
          <h1 class="font-headline-sm text-headline-sm text-on-surface tracking-tight text-center flex-1 mx-space-sm truncate">${title}</h1>
          <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
        </div>
      </header>
    `;
  }

  // Titles for main tabs
  const tabTitles = {
    'beranda': 'Beranda',
    'inventaris-pindai': 'Inventaris Pindai',
    'resep-penyelamat': 'Resep Penyelamat',
    'donasi-pangan': 'Donasi Pangan',
    'profil-dampak': 'Profil Dampak'
  };
  const currentTitle = tabTitles[state.currentScreen] || 'Beranda';

  return `
    <header class="fixed top-0 w-full z-40 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] pt-safe">
      <!-- Status bar -->
      <div class="flex items-center justify-between px-margin h-10 text-on-surface">
        <span class="font-label-md text-label-md font-semibold tracking-tight">${currentTime}</span>
        <div class="flex items-center gap-space-xs">
          <span class="material-symbols-outlined text-[16px]">signal_cellular_alt</span>
          <span class="material-symbols-outlined text-[16px]">wifi</span>
          <span class="material-symbols-outlined text-[18px]">battery_full</span>
        </div>
      </div>
      <!-- App Bar -->
      <div class="h-16 px-margin flex items-center justify-between">
        <div class="flex items-center gap-space-sm cursor-pointer select-none" id="headerLogoBtn">
          <div class="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center text-on-primary shadow-sm">
            <span class="material-symbols-outlined text-[22px]" style="font-variation-settings: 'FILL' 1;">eco</span>
          </div>
          <div class="flex flex-col">
            <span class="font-headline-sm text-headline-sm text-primary tracking-tight leading-none font-bold">BEKAL</span>
            <span class="font-label-sm text-label-sm text-on-surface-variant font-medium tracking-wide leading-none mt-1">${currentTitle}</span>
          </div>
        </div>
        <div class="flex items-center gap-space-sm">
          <button aria-label="Notifikasi" id="notificationBtn" class="w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary hover:bg-secondary-container/50 transition-colors relative" type="button">
            <span class="material-symbols-outlined text-[22px]">notifications</span>
            ${unreadCount > 0 ? `<span class="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-tertiary-container ring-2 ring-surface animate-pulse"></span>` : ''}
          </button>
          <div class="w-11 h-11 flex items-center justify-center cursor-pointer" id="headerProfileBtn">
            <img alt="Profile" class="w-8 h-8 rounded-full object-cover ring-2 ring-primary-fixed hover:ring-primary transition-all shadow-xs" src="${state.user.avatar}"/>
          </div>
        </div>
      </div>
    </header>
  `;
}
