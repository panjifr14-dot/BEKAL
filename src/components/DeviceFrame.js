// Device Frame Component providing simulated mobile bezel on desktop
import { state, toggleDeviceMode, toggleDarkMode, setScreen } from '../state.js';

export function renderDeviceToolbar() {
  return `
    <div class="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white px-4 py-2 rounded-full shadow-2xl backdrop-blur-xl flex items-center gap-3 border border-slate-700/60 text-xs font-semibold select-none hidden md:flex">
      <div class="flex items-center gap-1.5 pr-2 border-r border-slate-700">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="tracking-wide">BEKAL UI/UX Suite</span>
      </div>

      <!-- Quick Screen Switcher -->
      <div class="flex items-center gap-1">
        <label for="quickScreenSelect" class="text-slate-400 text-[11px]">Layar:</label>
        <select id="quickScreenSelect" class="bg-slate-800 text-white rounded-lg px-2 py-1 outline-none text-xs border border-slate-700 cursor-pointer">
          <option value="onboarding" ${state.currentScreen === 'onboarding' ? 'selected' : ''}>1. Onboarding</option>
          <option value="daftar" ${state.currentScreen === 'daftar' ? 'selected' : ''}>2. Daftar (Sign Up)</option>
          <option value="masuk" ${state.currentScreen === 'masuk' ? 'selected' : ''}>3. Masuk (Sign In)</option>
          <option value="beranda" ${state.currentScreen === 'beranda' ? 'selected' : ''}>4. Beranda (Dashboard)</option>
          <option value="inventaris-pindai" ${state.currentScreen === 'inventaris-pindai' ? 'selected' : ''}>5. Inventaris & Pindai</option>
          <option value="resep-penyelamat" ${state.currentScreen === 'resep-penyelamat' ? 'selected' : ''}>6. Resep Penyelamat</option>
          <option value="donasi-pangan" ${state.currentScreen === 'donasi-pangan' ? 'selected' : ''}>7. Donasi Pangan</option>
          <option value="profil-dampak" ${state.currentScreen === 'profil-dampak' ? 'selected' : ''}>8. Profil Dampak</option>
        </select>
      </div>

      <!-- Device Frame Toggle -->
      <button id="btnToggleFrame" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1" title="Beralih antara Bingkai HP dan Layar Penuh">
        <span class="material-symbols-outlined text-[15px]">${state.deviceMode === 'mockup' ? 'smartphone' : 'fit_screen'}</span>
        <span>${state.deviceMode === 'mockup' ? 'Mode HP' : 'Layar Penuh'}</span>
      </button>

      <!-- Dark Mode Toggle -->
      <button id="btnToggleDark" class="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 transition-colors flex items-center" title="Toggle Dark/Light Mode">
        <span class="material-symbols-outlined text-[16px]">${state.isDarkMode ? 'light_mode' : 'dark_mode'}</span>
      </button>
    </div>
  `;
}
