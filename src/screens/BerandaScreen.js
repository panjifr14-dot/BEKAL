// Screen 4: Beranda - Food Risk Dashboard
import { state } from '../state.js';

export function renderBerandaScreen() {
  const highRiskCount = state.inventory.filter(i => i.risk >= 75).length;
  const mediumRiskCount = state.inventory.filter(i => i.risk >= 50 && i.risk < 75).length;
  const safeCount = state.inventory.filter(i => i.risk < 50).length;

  return `
    <div class="flex flex-col w-full min-h-screen bg-surface px-margin pt-28 pb-28">
      <div class="flex flex-col w-full pb-space-xl gap-space-lg">
        <!-- Greeting Hero Section -->
        <div class="flex items-center justify-between pt-space-xs">
          <div class="flex flex-col">
            <div class="flex items-center gap-space-xs">
              <h1 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold tracking-tight">Halo, ${state.user.name.split(' ')[0] || 'Sobat'}!</h1>
              <span class="text-xl animate-bounce">👋</span>
            </div>
            <p class="font-body-md text-body-md text-on-surface-variant mt-0.5">Yuk, kelola bahan makanan dengan lebih bijak.</p>
          </div>
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container shadow-sm cursor-pointer hover:bg-secondary-fixed transition-colors" id="btnBadgeLevel">
            <span class="material-symbols-outlined text-[16px] text-primary" style="font-variation-settings: 'FILL' 1;">eco</span>
            <span class="font-label-md text-label-md font-bold text-primary">Level ${state.user.level}</span>
          </div>
        </div>

        <!-- Food Risk Overview Bento Card -->
        <div class="w-full bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-md">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <span class="font-headline-sm text-headline-sm text-on-surface font-bold">Ringkasan Food Risk</span>
              <button aria-label="Info Food Risk" class="text-secondary hover:text-primary transition-colors flex items-center p-1" id="infoBtn" type="button">
                <span class="material-symbols-outlined text-[18px]">info</span>
              </button>
            </div>
            <button class="font-label-md text-label-md text-primary flex items-center gap-0.5 hover:underline font-semibold" id="btnDetailRisk" type="button">
              Lihat detail
              <span class="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <!-- Health Score Meter & Quick Stats Strip -->
          <div class="flex items-center justify-between bg-surface-container-low rounded-xl p-3 gap-3">
            <div class="flex items-center gap-3">
              <div class="relative w-12 h-12 flex items-center justify-center">
                <svg class="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                  <path class="text-surface-variant" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.5"></path>
                  <path class="text-primary-container stroke-current transition-all duration-1000" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-dasharray="${state.user.healthScore}, 100" stroke-linecap="round" stroke-width="3.5"></path>
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                  <span class="font-headline-sm text-headline-sm font-bold text-primary leading-none" id="healthScoreDisplay">${state.user.healthScore}</span>
                </div>
              </div>
              <div class="flex flex-col">
                <span class="font-label-md text-label-md text-on-surface font-bold">Skor Dapur Sehat</span>
                <span class="font-body-sm text-body-sm text-secondary">Tingkat efisiensi stabil</span>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-secondary-container text-primary font-label-sm text-label-sm font-bold shadow-xs">Prima</span>
          </div>

          <!-- 3 Pillars Breakdown -->
          <div class="grid grid-cols-3 gap-2 text-center pt-1">
            <!-- High Risk -->
            <button class="flex flex-col items-center p-2 rounded-xl bg-error-container/40 hover:bg-error-container/70 transition-colors cursor-pointer" id="filterPillarHigh">
              <div class="flex items-center gap-1 text-error mb-1">
                <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">error</span>
                <span class="font-headline-md text-headline-md font-bold text-error">${highRiskCount}</span>
              </div>
              <span class="font-label-sm text-label-sm text-on-error-container font-bold">Risiko Tinggi</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px] mt-0.5">1-2 hari lagi</span>
            </button>
            <!-- Medium Risk -->
            <button class="flex flex-col items-center p-2 rounded-xl bg-tertiary-fixed/40 hover:bg-tertiary-fixed/70 transition-colors cursor-pointer" id="filterPillarMedium">
              <div class="flex items-center gap-1 text-tertiary mb-1">
                <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">warning</span>
                <span class="font-headline-md text-headline-md font-bold text-tertiary">${mediumRiskCount}</span>
              </div>
              <span class="font-label-sm text-label-sm text-on-tertiary-fixed-variant font-bold">Risiko Sedang</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px] mt-0.5">3-5 hari lagi</span>
            </button>
            <!-- Safe -->
            <button class="flex flex-col items-center p-2 rounded-xl bg-secondary-container/50 hover:bg-secondary-container/80 transition-colors cursor-pointer" id="filterPillarSafe">
              <div class="flex items-center gap-1 text-primary mb-1">
                <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                <span class="font-headline-md text-headline-md font-bold text-primary">${safeCount}</span>
              </div>
              <span class="font-label-sm text-label-sm text-on-secondary-container font-bold">Aman</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px] mt-0.5">> 7 hari lagi</span>
            </button>
          </div>
        </div>

        <!-- Urgent Pantry Items Section -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">Bahan Berisiko Tertinggi</h2>
              <span class="px-2 py-0.5 rounded-full ${state.inventory.length === 0 ? 'bg-secondary-container text-primary' : 'bg-error-container text-on-error-container'} font-label-sm text-label-sm font-bold">
                ${state.inventory.length === 0 ? 'Bebas Sampah' : 'Segera Olah'}
              </span>
            </div>
            <button class="font-label-md text-label-md text-primary flex items-center gap-0.5 hover:underline font-semibold" id="btnSeeAllUrgent">
              Lihat semua (${state.inventory.length})
              <span class="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <!-- Urgent Items List -->
          <div class="flex flex-col gap-2.5" id="urgentItemsContainer">
            ${state.inventory.length === 0 ? `
              <div class="p-6 text-center bg-surface-container-lowest rounded-2xl flex flex-col items-center gap-3 shadow-xs">
                <div class="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary shadow-xs">
                  <span class="material-symbols-outlined text-[28px]">kitchen</span>
                </div>
                <div class="flex flex-col gap-0.5">
                  <span class="font-headline-sm text-headline-sm font-bold text-on-surface">Kulkas Anda Masih Bersih & Bebas Risiko! ✨</span>
                  <p class="font-body-sm text-body-sm text-secondary max-w-xs">Belum ada bahan makanan yang dicatat. Yuk masukkan belanjaan dapurmu atau pindai struk belanja.</p>
                </div>
                <div class="flex items-center gap-2 mt-1">
                  <button class="px-3.5 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-all" id="btnGoToPantryAdd">
                    <span class="material-symbols-outlined text-[18px]">add</span>
                    <span>+ Tambah Bahan</span>
                  </button>
                  <button class="px-3.5 py-2 rounded-xl bg-secondary-container text-primary font-label-md text-label-md font-bold flex items-center gap-1 shadow-xs active:scale-95 transition-all" id="btnGoToPantryScan">
                    <span class="material-symbols-outlined text-[18px]">photo_camera</span>
                    <span>Pindai Struk</span>
                  </button>
                </div>
              </div>
            ` : [...state.inventory].sort((a, b) => (b.risk || 0) - (a.risk || 0)).slice(0, 4).map(item => {
              const isHigh = item.risk >= 75;
              const isMed = item.risk >= 50 && item.risk < 75;
              const badgeBg = isHigh ? 'bg-error text-on-error' : isMed ? 'bg-tertiary text-on-tertiary' : 'bg-secondary-container text-primary';
              const textClr = isHigh ? 'text-error' : isMed ? 'text-tertiary' : 'text-primary';
              const iconName = isHigh ? 'timer' : isMed ? 'warning' : 'schedule';
              const matchRecipe = item.name.includes('Tomat') ? 'Sambal Tomat Terasi & Ayam Suwir' :
                                  item.name.includes('Ayam') ? 'Semur Ayam Tomat Manis Gurih' :
                                  item.name.includes('Bayam') ? 'Tumis Bayam Bawang Putih' : 'Sup Creamy Dapur Segar';
              return `
                <div class="w-full bg-surface-container-lowest rounded-2xl p-3 flex items-center justify-between shadow-sm transition-transform active:scale-[0.99] hover:shadow-md" data-risk-level="${isHigh ? 'high' : isMed ? 'medium' : 'safe'}">
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="w-14 h-14 rounded-xl overflow-hidden bg-surface-container-high flex-shrink-0 relative">
                      <img class="w-full h-full object-cover" alt="${item.name}" src="${item.img}"/>
                    </div>
                    <div class="flex flex-col min-w-0">
                      <div class="flex items-center gap-1.5">
                        <span class="font-headline-sm text-headline-sm font-bold text-on-surface truncate">${item.name}</span>
                      </div>
                      <span class="font-body-sm text-body-sm text-on-surface-variant font-medium">${item.weight} ${item.unit} • ${item.location}</span>
                      <div class="flex items-center gap-1 mt-1 ${textClr}">
                        <span class="material-symbols-outlined text-[14px]">${iconName}</span>
                        <span class="font-label-sm text-label-sm font-bold">${item.expiryDays <= 1 ? 'Besok Kedaluwarsa' : `${item.expiryDays} hari lagi (${item.expiryDate})`}</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col items-end gap-1 flex-shrink-0 ml-2">
                    <div class="w-8 h-8 rounded-lg ${badgeBg} flex items-center justify-center font-headline-sm text-headline-sm font-bold shadow-sm">
                      ${item.risk}
                    </div>
                    <div class="flex items-center gap-1">
                      <button class="px-2.5 py-1 rounded-full bg-secondary-container text-primary font-label-sm text-label-sm font-bold flex items-center gap-0.5 active:bg-primary active:text-on-primary transition-colors btn-cook-urgent" data-recipe="${matchRecipe}" data-name="${item.name}">
                        <span class="material-symbols-outlined text-[14px]">skillet</span> Masak
                      </button>
                      <button class="w-7 h-7 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-secondary flex items-center justify-center transition-colors btn-consume-quick" data-id="${item.id}" title="Tandai Habis / Dikonsumsi">
                        <span class="material-symbols-outlined text-[14px]">check</span>
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Smart Pantry Passport Widget (Delight / Eco Impact) -->
        <div class="w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-secondary-container via-surface-container-low to-secondary-container p-4 shadow-sm">
          <div class="flex items-start gap-3 relative z-10">
            <div class="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center flex-shrink-0 shadow-sm">
              <span class="material-symbols-outlined text-[26px]">compost</span>
            </div>
            <div class="flex flex-col flex-1">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="font-headline-sm text-headline-sm font-bold text-primary">Dampak Positif Pekan Ini</span>
                <span class="text-xs">🌱</span>
              </div>
              <p class="font-body-md text-body-md text-on-surface-variant mt-1 leading-snug">
                <strong class="text-on-surface font-bold">84% bahan</strong> sukses dihabiskan sebelum kedaluwarsa. Kamu hemat sekitar <strong class="text-primary font-bold">Rp 128.500</strong> minggu ini!
              </p>
              <div class="w-full bg-surface-container-highest rounded-full h-2 mt-2.5 overflow-hidden">
                <div class="bg-primary-container h-full rounded-full transition-all duration-700" style="width: 84%"></div>
              </div>
            </div>
          </div>
          <!-- Subtle Eco Leaf Motif -->
          <div class="absolute -right-3 -bottom-3 opacity-10 pointer-events-none text-primary">
            <span class="material-symbols-outlined text-[90px]">eco</span>
          </div>
        </div>

        <!-- Aksi Cepat (Quick Actions Grid) -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">Aksi Cepat</h2>
            <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Pintasan praktis</span>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <!-- Action 1: Cek Promo Overbuy -->
            <button class="flex flex-col text-left p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all active:scale-[0.98] group" id="actionPromo">
              <div class="w-10 h-10 rounded-xl bg-secondary-container text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-on-primary transition-colors shadow-xs">
                <span class="material-symbols-outlined text-[22px]">shopping_bag</span>
              </div>
              <span class="font-label-lg text-label-lg text-on-surface font-bold">Cek Promo</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-2">Cegah overbuy stok bahan saat diskon</span>
            </button>
            <!-- Action 2: Scan Belanjaan (OCR) -->
            <button class="flex flex-col text-left p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all active:scale-[0.98] group" id="actionScan">
              <div class="w-10 h-10 rounded-xl bg-surface-container-high text-tertiary-container flex items-center justify-center mb-3 group-hover:bg-tertiary-container group-hover:text-on-tertiary-container transition-colors shadow-xs">
                <span class="material-symbols-outlined text-[22px]">document_scanner</span>
              </div>
              <span class="font-label-lg text-label-lg text-on-surface font-bold">Scan Belanja</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-2">Pindai struk & foto bahan otomatis</span>
            </button>
            <!-- Action 3: Rescue Recipe -->
            <button class="flex flex-col text-left p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all active:scale-[0.98] group" id="actionRescueRecipe">
              <div class="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed-variant flex items-center justify-center mb-3 group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors shadow-xs">
                <span class="material-symbols-outlined text-[22px]">skillet</span>
              </div>
              <span class="font-label-lg text-label-lg text-on-surface font-bold">Rescue Recipe</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-2">Rekomendasi resep bahan terancam rusak</span>
            </button>
            <!-- Action 4: Donasi Makanan / Warung Rescue -->
            <button class="flex flex-col text-left p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all active:scale-[0.98] group" id="actionDonate">
              <div class="w-10 h-10 rounded-xl bg-primary-fixed text-on-primary-fixed-variant flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-on-primary transition-colors shadow-xs">
                <span class="material-symbols-outlined text-[22px]">volunteer_activism</span>
              </div>
              <span class="font-label-lg text-label-lg text-on-surface font-bold">Salurkan Lebih</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-2">Bagi surplus ke food bank sekitar</span>
            </button>
          </div>
        </div>

        <!-- Smart Recipe Rescue Recommendation Card -->
        <div class="w-full bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
          <div class="relative h-36 w-full">
            <img class="w-full h-full object-cover" alt="Ayam Saus Tomat Gurih" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM2tT1TH7fBjdF9_Dy98NAczgQ2kgDUxwzARp-JxD0R3S2fAYU6RCh0nxW9u-Prg2ECn_MmlI0hSUh9jFGiScQKXbIlwk3H5vuSYprrTs2NCo4Ngrx_tEw_nEgvqMyUtuwDLMsvz7IjeMlapkc_D9aMaj9uBgdnF37-cl3u-8oVqrzsb3oZZusVqoiJRSlzRKwMwuabfBLlSbyArVSL2jAAh_w-LgYz7Q9f78S4Fx56_3ohBAkOf6Z"/>
            <div class="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-inverse-surface/30 to-transparent"></div>
            <div class="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
              <span class="px-2.5 py-1 rounded-full bg-surface/90 text-primary font-label-sm text-label-sm font-bold backdrop-blur-sm shadow-xs">
                💡 Rekomendasi Hari Ini
              </span>
              <span class="text-inverse-on-surface font-label-sm text-label-sm flex items-center gap-1 font-semibold">
                <span class="material-symbols-outlined text-[14px]">timer</span> 25 mnt
              </span>
            </div>
          </div>
          <div class="p-3.5 flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <span class="font-headline-sm text-headline-sm font-bold text-on-surface">Ayam Saus Tomat Gurih</span>
              <span class="px-2 py-0.5 rounded-full bg-secondary-container text-primary font-label-sm text-label-sm font-bold">Menyelamatkan 2 Bahan</span>
            </div>
            <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Memanfaatkan Tomat Segar & Daging Ayam yang berisiko tinggi sebelum kedaluwarsa.</p>
            <button class="mt-1 w-full py-2.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md font-bold text-center hover:bg-primary transition-colors flex items-center justify-center gap-1.5 active:scale-[0.98] shadow-sm" id="btnCookRecommendation">
              <span class="material-symbols-outlined text-[18px]">menu_book</span>
              Lihat Langkah Memasak
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
