// Screen 6: Donasi Pangan - Warung Rescue Network
import { state } from '../state.js';

export function renderDonasiScreen() {
  const selectedCount = Object.values(state.excessSelected).filter(Boolean).length;

  return `
    <div class="flex flex-col w-full min-h-screen bg-surface px-margin pt-28 pb-28">
      <div class="flex flex-col w-full pb-8">
        <!-- Sub-Header & Motivation Banner Section -->
        <section class="flex flex-col gap-space-sm mb-space-md">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight font-bold">Warung Rescue Network</h1>
              <p class="font-body-sm text-body-sm text-secondary">Redistribusi bahan, kurangi sampah & dukung UMKM tetangga</p>
            </div>
            <button aria-label="Simpan Favorit" class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:text-primary transition-colors" id="btnFavDonation">
              <span class="material-symbols-outlined text-[20px]">favorite</span>
            </button>
          </div>

          <!-- Impact Mini Banner -->
          <div class="bg-gradient-to-r from-secondary-container/90 via-surface-container-low to-secondary-container/60 p-space-md rounded-2xl shadow-sm flex items-center gap-space-md relative overflow-hidden">
            <div class="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-sm">
              <span class="material-symbols-outlined text-[26px]">eco</span>
            </div>
            <div class="flex flex-col min-w-0 pr-6">
              <div class="flex items-center gap-1.5 mb-0.5">
                <span class="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Misi Komunitas</span>
                <span class="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                <span class="font-label-sm text-label-sm text-secondary font-medium">Bahan Berlebih Jadi Berkah</span>
              </div>
              <p class="font-body-sm text-body-sm text-on-surface line-clamp-2 leading-snug">
                Salurkan bahan segar berlebihmu sebelum kedaluwarsa ke warung makan & shelter sosial terdekat.
              </p>
            </div>
            <span class="material-symbols-outlined text-primary/15 absolute -right-3 -bottom-3 text-[72px] select-none pointer-events-none">soup_kitchen</span>
          </div>
        </section>

        <!-- Segmented View Controller Tabs -->
        <section class="mb-space-md">
          <div class="bg-surface-container-high p-1 rounded-2xl flex items-center">
            <button class="flex-1 py-2 text-center rounded-xl font-label-md text-label-md transition-all bg-surface-container-lowest text-primary shadow-sm font-bold flex items-center justify-center gap-1.5 tab-donasi-btn" id="tabPeta" data-view="map">
              <span class="material-symbols-outlined text-[16px]">map</span>
              <span>Peta Interaktif</span>
            </button>
            <button class="flex-1 py-2 text-center rounded-xl font-label-md text-label-md transition-all text-secondary hover:text-on-surface flex items-center justify-center gap-1.5 font-semibold tab-donasi-btn" id="tabDaftar" data-view="list">
              <span class="material-symbols-outlined text-[16px]">format_list_bulleted</span>
              <span>Daftar Mitra</span>
            </button>
            <button class="flex-1 py-2 text-center rounded-xl font-label-md text-label-md transition-all text-secondary hover:text-on-surface flex items-center justify-center gap-1.5 font-semibold tab-donasi-btn" id="tabRiwayat" data-view="history">
              <span class="material-symbols-outlined text-[16px]">history</span>
              <span>Riwayat</span>
            </button>
          </div>
        </section>

        <!-- View 1: Interactive Map Canvas -->
        <section class="mb-space-lg" id="donasiMapView">
          <div class="relative w-full h-[320px] rounded-2xl overflow-hidden shadow-sm bg-surface-container border border-surface-container-high">
            <!-- Dynamic Vector Map Canvas with background -->
            <div class="w-full h-full bg-cover bg-center transition-transform duration-700" id="mapBackground" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBv5T3elnWqqL7NTuaZ9bvXJZHeDgbxUlfHFXjRL041s9hXW8v0oaxgi3Kcwn36Vy4wSNiV-jgHkVwFQ_DPqvdi0B0qcRvNu8TnHC4QJR7aGFIQUDbqx3AJhkd31McsBpMGCmPo36i4mELNH9lxc4uu1JRYXR9Wt3nlO2syqkhJBCvHtlauBQL7IXNmLUhN_CRR79Oi-pAMnQILLc9dYH-YkIvTYd0IfWwmlrK76RzPwD-VgzSAoylF')"></div>
            <!-- Map Ambient Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-inverse-surface/35 via-transparent to-inverse-surface/20 pointer-events-none"></div>

            <!-- Top Search & Quick Chips on Map -->
            <div class="absolute top-space-sm inset-x-space-sm flex flex-col gap-space-xs z-10">
              <!-- Floating Location Input -->
              <div class="bg-surface-container-lowest/95 backdrop-blur-md px-space-md py-2 rounded-xl shadow-md flex items-center justify-between gap-space-sm">
                <div class="flex items-center gap-space-sm min-w-0">
                  <span class="material-symbols-outlined text-primary text-[20px] shrink-0">my_location</span>
                  <div class="flex flex-col min-w-0">
                    <span class="font-label-sm text-label-sm text-secondary leading-none font-medium">Lokasimu Saat Ini</span>
                    <span class="font-label-md text-label-md text-on-surface font-bold truncate">Jl. Gandaria Tengah IV No. 18</span>
                  </div>
                </div>
                <button class="bg-secondary-container text-primary font-label-sm text-label-sm px-2.5 py-1 rounded-full shrink-0 font-bold hover:bg-primary hover:text-on-primary transition-colors" id="btnChangeLocation">
                  Ubah
                </button>
              </div>

              <!-- Filter Chips Carousel -->
              <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                <button class="bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1 rounded-full shadow-sm shrink-0 flex items-center gap-1 font-bold">
                  <span class="material-symbols-outlined text-[14px]">tune</span>
                  Radius 1 km
                </button>
                <button class="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm px-3 py-1 rounded-full shadow-sm shrink-0 flex items-center gap-1 hover:bg-secondary-container font-semibold">
                  <span class="material-symbols-outlined text-[14px] text-primary">local_shipping</span>
                  Bisa Pick-up
                </button>
                <button class="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm px-3 py-1 rounded-full shadow-sm shrink-0 flex items-center gap-1 hover:bg-secondary-container font-semibold">
                  <span class="material-symbols-outlined text-[14px] text-tertiary">alarm_on</span>
                  Buka Sekarang
                </button>
              </div>
            </div>

            <!-- Pin A: Warung Makan Bu Sari (Focused Pin) -->
            <div class="absolute top-[48%] left-[26%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20 map-pin" data-partner="Warung Makan Bu Sari">
              <div class="relative flex flex-col items-center">
                <div class="bg-surface-container-lowest px-2 py-0.5 rounded-full shadow-md text-primary font-label-sm text-label-sm font-bold flex items-center gap-1 mb-1 whitespace-nowrap animate-bounce">
                  <span class="material-symbols-outlined text-[13px] text-error">local_fire_department</span>
                  <span>Warung Bu Sari (300m)</span>
                </div>
                <div class="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 ring-4 ring-primary-fixed/60">
                  <span class="material-symbols-outlined text-[20px]">storefront</span>
                </div>
              </div>
            </div>

            <!-- Pin B: Dapur Nusa Catering -->
            <div class="absolute top-[28%] right-[22%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10 map-pin" data-partner="Dapur Nusa Catering">
              <div class="relative flex flex-col items-center">
                <div class="bg-surface-container-lowest/90 px-2 py-0.5 rounded-full shadow text-on-surface font-label-sm text-label-sm font-bold flex items-center gap-1 mb-1 whitespace-nowrap">
                  <span>Dapur Nusa (550m)</span>
                </div>
                <div class="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center shadow-md transform transition-transform group-hover:scale-110">
                  <span class="material-symbols-outlined text-[18px]">soup_kitchen</span>
                </div>
              </div>
            </div>

            <!-- Pin C: Komunitas Berbagi Pangan -->
            <div class="absolute bottom-[24%] right-[32%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10 map-pin" data-partner="Komunitas Berbagi Pangan">
              <div class="relative flex flex-col items-center">
                <div class="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md transform transition-transform group-hover:scale-110">
                  <span class="material-symbols-outlined text-[18px]">volunteer_activism</span>
                </div>
              </div>
            </div>

            <!-- Pin D: Kedai Kopi & Roti -->
            <div class="absolute bottom-[28%] left-[16%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10 map-pin" data-partner="Kedai Kopi & Roti">
              <div class="relative flex flex-col items-center">
                <div class="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-md transform transition-transform group-hover:scale-110">
                  <span class="material-symbols-outlined text-[18px]">coffee</span>
                </div>
              </div>
            </div>

            <!-- User Current Location Radar -->
            <div class="absolute top-[62%] left-[52%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div class="w-12 h-12 rounded-full bg-primary/30 animate-radar absolute inset-0"></div>
              <div class="w-4 h-4 rounded-full bg-primary border-2 border-surface-container-lowest shadow-md relative z-10"></div>
            </div>

            <!-- Floating Recenter Button -->
            <button class="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-surface-container-lowest/95 backdrop-blur-md shadow-md flex items-center justify-center text-primary hover:bg-secondary-container transition-all z-20" id="btnRecenterMap">
              <span class="material-symbols-outlined text-[20px]">near_me</span>
            </button>
          </div>
        </section>

        <!-- Quick Excess Pantry Items Selector Banner -->
        <section class="mb-space-lg">
          <div class="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-tertiary text-[18px]">inventory_2</span>
                <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold">Bahan Berlebih di Dapurmu</h2>
              </div>
              <span class="bg-error-container text-on-error-container px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold">
                ${selectedCount} Kritis
              </span>
            </div>
            <p class="font-body-sm text-body-sm text-secondary mb-space-sm leading-snug">Pilih stok bahan yang ingin kamu salurkan hari ini:</p>
            
            <!-- Horizontal Inventory Pills with Quantities -->
            <div class="grid grid-cols-3 gap-space-xs">
              <!-- Item 1 -->
              <label class="flex flex-col p-2 rounded-xl bg-surface-container-low cursor-pointer transition-all hover:bg-secondary-container/40 relative">
                <input ${state.excessSelected['tomat-segar'] ? 'checked' : ''} class="absolute top-2 right-2 accent-primary h-4 w-4 rounded excess-checkbox" data-id="tomat-segar" type="checkbox"/>
                <div class="w-8 h-8 rounded-lg overflow-hidden mb-1.5 bg-surface-container">
                  <img class="w-full h-full object-cover" alt="Tomat Segar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5tQ-JKbp1fbUwUmwbnt39zmOzvABhnuldJhP0YzhWNtEhQp95YG_nsMTRYbJRwbOZqYIdkYIEDDVRak8Owf0F4GmkjKFymRgZ-KZfXmDYZJWLg3rgHDYr1eCPOdYfNtgUkgHY0UldObBmPlv8FO104-VrXMEKAD8YQT3Qa4x5-0qSrfSkxUpIuxyuSNkekDXg5ECvkZ7BtO6AzYJq9oS98pImcxxOWMByq5VIgoPcZii864uusEoC"/>
                </div>
                <span class="font-label-md text-label-md text-on-surface font-bold truncate">Tomat Segar</span>
                <span class="font-body-sm text-body-sm text-secondary font-medium">2.0 kg</span>
                <span class="font-label-sm text-label-sm text-error mt-0.5 font-bold">Sisa 2 Hari</span>
              </label>

              <!-- Item 2 -->
              <label class="flex flex-col p-2 rounded-xl bg-surface-container-low cursor-pointer transition-all hover:bg-secondary-container/40 relative">
                <input ${state.excessSelected['daging-ayam'] ? 'checked' : ''} class="absolute top-2 right-2 accent-primary h-4 w-4 rounded excess-checkbox" data-id="daging-ayam" type="checkbox"/>
                <div class="w-8 h-8 rounded-lg overflow-hidden mb-1.5 bg-surface-container">
                  <img class="w-full h-full object-cover" alt="Daging Ayam" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFqqEklZvr3s5IZ361Ezp8bP3sj9--KraWT_TM3boJLDbGftZ7uAzU7f44FVDTcdmg3u6SNBhCrUfjSKs_oCk3-EsKbpKACJYD-X0CZ438dEP_n1lBVMKuWu5BknOTiZioekgfUmslM7jYRQ51dOg_WUcb8yznxwsOfEpulOMnLcnx4vfBWSNFByGrFcNhkF3EMYqPjpDbzttYTjlD41ZzTJadE_ehGuuB5Hb-Ide0UGLiQA7t1-54"/>
                </div>
                <span class="font-label-md text-label-md text-on-surface font-bold truncate">Daging Ayam</span>
                <span class="font-body-sm text-body-sm text-secondary font-medium">0.5 kg</span>
                <span class="font-label-sm text-label-sm text-error mt-0.5 font-bold">Sisa 1 Hari</span>
              </label>

              <!-- Item 3 -->
              <label class="flex flex-col p-2 rounded-xl bg-surface-container-low cursor-pointer transition-all hover:bg-secondary-container/40 relative">
                <input ${state.excessSelected['bayam-hijau'] ? 'checked' : ''} class="absolute top-2 right-2 accent-primary h-4 w-4 rounded excess-checkbox" data-id="bayam-hijau" type="checkbox"/>
                <div class="w-8 h-8 rounded-lg overflow-hidden mb-1.5 bg-surface-container">
                  <img class="w-full h-full object-cover" alt="Bayam Hijau" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG9cUsfY3Hr4ADazWm0LK75LnWuIKsFAX-p_5VwrtE4M90M9k8yHJJTD3MucpGD1_9UNSjJwhFAx47aVcJC3zjcVDbkzXCOP8VY6Ya2bVkenkmbdYaZI3lDLDfYtziTwVlBWf3T-Ya3k9YjUIBJqsLUu9zBqTRhivgBbYyK-mZYuJoafql2dgOM1lhoRn5xRyhTwZwLRUT0PCRE7r3_qnwktYtDUtsX_1RgXmq2iswLeLWMSdQVgKC"/>
                </div>
                <span class="font-label-md text-label-md text-on-surface font-bold truncate">Bayam Hijau</span>
                <span class="font-body-sm text-body-sm text-secondary font-medium">2 Ikat</span>
                <span class="font-label-sm text-label-sm text-tertiary mt-0.5 font-bold">Sisa 3 Hari</span>
              </label>
            </div>
          </div>
        </section>

        <!-- Featured Nearby Rescue Partner Card (Active Focus) -->
        <section class="mb-space-lg" id="partnerCardBuSari">
          <div class="flex items-center justify-between mb-space-sm">
            <h2 class="font-headline-md text-headline-md text-on-surface font-bold">Mitra Penyelamat Terdekat</h2>
            <button class="font-label-sm text-label-sm text-primary font-bold flex items-center gap-0.5">
              Lihat Semua
              <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
          <!-- Partner Card: Warung Makan Bu Sari -->
          <div class="bg-surface-container-lowest rounded-2xl p-space-md shadow-md flex flex-col gap-space-md border border-primary/20">
            <!-- Header Partner Info -->
            <div class="flex gap-space-md">
              <div class="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-surface-container shadow-xs">
                <img class="w-full h-full object-cover" alt="Warung Makan Bu Sari" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEaQ3aXRMK8nh--r84XwAiiA2WkzqMmV0brIrhckaoGcfljIPsPltZS3JCYEqy5j46lOnLY27IBhaWcBdFyNGl3iOoFmZZE1OQdh0Q37WR1srbEEngdJm96VQFHAajhQtiBmEitNlx8yA-J7CAJK3li7MoQEuxAqBcpo5Vti1r0VSpWqtzo3DaxV_zPnglB8Q-v1TJFe0JmssCsDE9qDISbUBJ87DE77_AR-ZgY1vx40n1t_DaX_Dw"/>
              </div>
              <div class="flex flex-col min-w-0 flex-1">
                <div class="flex items-center gap-1.5 mb-1">
                  <span class="px-2 py-0.5 rounded-full bg-secondary-container text-primary font-label-sm text-label-sm font-bold">
                    UMKM Kuliner
                  </span>
                  <div class="flex items-center text-tertiary gap-0.5 text-[12px] font-bold">
                    <span class="material-symbols-outlined text-[14px] text-tertiary" style="font-variation-settings: 'FILL' 1;">star</span>
                    <span>4.9</span>
                  </div>
                </div>
                <h3 class="font-headline-sm text-headline-sm text-on-surface truncate font-bold">Warung Makan Bu Sari</h3>
                <p class="font-body-sm text-body-sm text-secondary truncate">Jl. Melati No. 12 • <strong class="text-primary font-bold">0.3 km</strong></p>
                <div class="flex items-center gap-1 text-[11px] text-primary mt-1 font-semibold">
                  <span class="material-symbols-outlined text-[14px]">check_circle</span>
                  <span>Bisa jemput langsung ke rumahmu</span>
                </div>
              </div>
            </div>
            <!-- Ingredient Needs Matching Bar -->
            <div class="bg-surface-container-low p-space-sm rounded-xl flex flex-col gap-1.5">
              <div class="flex items-center justify-between text-label-sm font-label-sm">
                <span class="text-secondary font-medium">Bahan yang Sangat Dibutuhkan:</span>
                <span class="text-primary font-bold" id="matchBadgeLabel">Cocok ${selectedCount} Bahan Kamu</span>
              </div>
              <div class="flex flex-wrap gap-1">
                <span class="px-2 py-0.5 rounded-lg bg-secondary-container text-primary font-label-sm text-label-sm font-bold flex items-center gap-1">
                  <span class="material-symbols-outlined text-[13px]">check</span> Tomat Segar
                </span>
                <span class="px-2 py-0.5 rounded-lg bg-secondary-container text-primary font-label-sm text-label-sm font-bold flex items-center gap-1">
                  <span class="material-symbols-outlined text-[13px]">check</span> Daging Ayam
                </span>
                <span class="px-2 py-0.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium">
                  Sayuran Hijau
                </span>
                <span class="px-2 py-0.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium">
                  Bawang Merah
                </span>
              </div>
            </div>
            <!-- Dual Action Buttons -->
            <div class="grid grid-cols-2 gap-space-sm pt-1">
              <!-- Action 1: Donasi Gratis -->
              <button class="w-full py-3 px-space-sm rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 shadow-sm hover:opacity-95 active:scale-98 transition-all btn-partner-action" data-type="donasi" data-partner="Warung Makan Bu Sari">
                <span class="material-symbols-outlined text-[18px]">volunteer_activism</span>
                <span>Donasi (Gratis)</span>
              </button>
              <!-- Action 2: Jual Murah -->
              <button class="w-full py-3 px-space-sm rounded-xl bg-secondary-container text-primary font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 hover:bg-secondary-container/70 active:scale-98 transition-all btn-partner-action" data-type="jual" data-partner="Warung Makan Bu Sari">
                <span class="material-symbols-outlined text-[18px]">sell</span>
                <span>Jual Murah (-60%)</span>
              </button>
            </div>
          </div>
        </section>

        <!-- Secondary Partner Row 2: Dapur Nusa Catering -->
        <section class="mb-space-lg" id="partnerCardDapurNusa">
          <div class="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm hover:shadow-md transition-shadow">
            <div class="flex gap-space-md items-center">
              <div class="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-surface-container shadow-xs">
                <img class="w-full h-full object-cover" alt="Dapur Nusa Catering" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiNvOGvnLC9S7X_alVpLg3w4ZQCfmFmoIdPlRpKtHCgbVgEWCxtosTELw2iwknyZOGIuVdICzXxIHJaQugFyhX8PVHil1bf95qTWwYYOAS_gPPXJhGgOd-X7deYpa_SVObZi9OnUiRo8kd8AjKIFKbpo0b42UF0SHzJsUzdNMhipfSXdtosqwAAHDZCQpESs6DfGPrd5Mw2SPgZA2eXj5ZMjVrzyPoKc2ruUBjL-pDzRpD7bOUYAUq"/>
              </div>
              <div class="flex flex-col min-w-0 flex-1">
                <div class="flex items-center gap-1 mb-0.5">
                  <span class="px-2 py-0.2 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm font-semibold">
                    Katering Harian
                  </span>
                  <span class="font-label-sm text-label-sm text-secondary font-medium">• 0.55 km</span>
                </div>
                <h3 class="font-headline-sm text-headline-sm text-on-surface truncate font-bold">Dapur Nusa Catering</h3>
                <p class="font-body-sm text-body-sm text-secondary truncate">Menerima: Sayur mayur, telur, bumbu masak</p>
              </div>
            </div>
            <div class="flex items-center justify-between pt-1">
              <span class="font-label-sm text-label-sm text-secondary font-medium">Estimasi jemput: 20 menit</span>
              <div class="flex gap-space-xs">
                <button class="px-3 py-1.5 rounded-xl bg-surface-container text-primary font-label-sm text-label-sm font-bold hover:bg-secondary-container btn-partner-action" data-type="donasi" data-partner="Dapur Nusa Catering">
                  Donasi
                </button>
                <button class="px-3 py-1.5 rounded-xl bg-secondary-container text-primary font-label-sm text-label-sm font-bold hover:opacity-90 btn-partner-action" data-type="jual" data-partner="Dapur Nusa Catering">
                  Jual Murah
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Community Impact Summary Strip -->
        <section>
          <div class="bg-surface-container p-space-md rounded-2xl flex items-center justify-between shadow-xs">
            <div class="flex items-center gap-space-sm">
              <div class="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-primary shadow-xs">
                <span class="material-symbols-outlined text-[22px]">workspace_premium</span>
              </div>
              <div class="flex flex-col">
                <span class="font-label-md text-label-md font-bold text-on-surface">Total Dampak Lingkunganmu</span>
                <span class="font-body-sm text-body-sm text-secondary">14.2 kg pangan terselamatkan • 8 Mitra terbantu</span>
              </div>
            </div>
            <span class="material-symbols-outlined text-secondary text-[20px]">chevron_right</span>
          </div>
        </section>
      </div>
    </div>
  `;
}
