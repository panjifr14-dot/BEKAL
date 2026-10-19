// Bottom Navigation Bar component for BEKAL
import { state } from '../state.js';

export function renderBottomNav() {
  const isAuthOrOnboarding = ['onboarding', 'daftar', 'masuk'].includes(state.currentScreen);
  if (isAuthOrOnboarding) {
    return '';
  }

  const tabs = [
    { id: 'beranda', label: 'Beranda', icon: 'home' },
    { id: 'inventaris-pindai', label: 'Inventaris', icon: 'inventory_2', hasBadge: true },
    { id: 'resep-penyelamat', label: 'Resep', icon: 'skillet' },
    { id: 'donasi-pangan', label: 'Donasi', icon: 'volunteer_activism' },
    { id: 'profil-dampak', label: 'Profil', icon: 'eco' }
  ];

  return `
    <nav class="fixed bottom-0 w-full z-40 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-4px_16px_rgba(19,117,71,0.06)] border-t border-surface-container-high/60">
      <div class="flex justify-around items-center h-20 px-space-xs">
        ${tabs.map(tab => {
          const isActive = state.currentScreen === tab.id;
          const activeClasses = isActive 
            ? 'text-primary font-semibold [&_.tab-pill]:bg-secondary-container [&_.tab-icon]:text-primary' 
            : 'text-on-surface-variant hover:text-on-surface';
          return `
            <a class="flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] py-1 transition-all group cursor-pointer ${activeClasses}" data-tab="${tab.id}" href="#${tab.id}">
              <div class="tab-pill px-3 py-0.5 rounded-full transition-all flex items-center justify-center relative">
                <span class="tab-icon material-symbols-outlined text-[22px]" style="font-variation-settings: 'FILL' ${isActive ? 1 : 0};">${tab.icon}</span>
                ${tab.hasBadge ? `<span class="absolute -top-1 -right-1 text-[11px] font-bold text-primary leading-none">+</span>` : ''}
              </div>
              <span class="font-label-sm text-label-sm tracking-tight">${tab.label}</span>
            </a>
          `;
        }).join('')}
      </div>
    </nav>
  `;
}
