// Screen 5: Profil & Laporan - Eco Impact Report
import { state } from '../state.js';

export function renderProfilScreen() {
  return `
    <div class="flex flex-col w-full min-h-screen bg-surface px-margin pt-28 pb-28">
      <div class="flex flex-col w-full gap-space-lg pb-space-xl">
        <!-- Profile Identity Header Card -->
        <div class="relative overflow-hidden bg-surface-container-lowest rounded-2xl p-space-md shadow-sm">
          <div class="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-secondary-container/40 pointer-events-none"></div>
          <div class="flex items-start gap-space-md relative z-10">
            <!-- Avatar with Level Ring Badge -->
            <div class="relative shrink-0">
              <img class="w-16 h-16 rounded-full object-cover ring-2 ring-primary-fixed shadow-sm" alt="${state.user.name}" src="${state.user.avatar}"/>
              <div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
                <span class="material-symbols-outlined text-[14px]">eco</span>
              </div>
            </div>
            <!-- Identity & Level Info -->
            <div class="flex flex-col min-w-0 flex-1">
              <div class="flex items-center gap-space-xs">
                <h1 class="font-headline-md text-headline-md text-on-surface truncate font-bold">${state.user.name}</h1>
                <span class="material-symbols-outlined text-primary text-[18px]">verified</span>
              </div>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                  <span class="material-symbols-outlined text-[12px] text-primary">military_tech</span>
                  Level ${state.user.level}: ${state.user.levelTitle}
                </span>
              </div>
              <p class="font-body-sm text-body-sm text-secondary mt-1">
                Anggota sejak Jan 2024 • Rumah Tangga 3 Porsi
              </p>
            </div>
          </div>
          <!-- Level XP Progress Bar -->
          <div class="mt-space-md pt-space-sm bg-surface-container-low rounded-xl p-2.5 flex flex-col gap-1.5">
            <div class="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
              <span class="font-medium">Progres ke Level 5 (Earth Guardian)</span>
              <span class="font-bold text-primary">${state.user.xp} / ${state.user.nextLevelXp} XP</span>
            </div>
            <div class="w-full h-2 rounded-full bg-surface-dim overflow-hidden">
              <div class="h-full rounded-full bg-primary-container transition-all duration-700" style="width: ${(state.user.xp / state.user.nextLevelXp) * 100}%"></div>
            </div>
          </div>
        </div>

        <!-- Eco Impact Metrics Header -->
        <div class="flex items-center justify-between">
          <div>
            <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold">Dampak Lingkungan Anda</h2>
            <p class="font-body-sm text-body-sm text-secondary">Ringkasan aksi penyelamatan dapur tahun ini</p>
          </div>
          <button class="flex items-center gap-1 font-label-md text-label-md text-primary hover:opacity-80 transition-opacity font-bold" id="btnImpactDetails">
            <span>Detail</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <!-- Bento Grid Metrics -->
        <div class="grid grid-cols-2 gap-space-sm">
          <!-- Card 1: Pangan Terselamatkan (Highlight Span-2) -->
          <div class="col-span-2 relative overflow-hidden bg-primary-container text-on-primary rounded-2xl p-space-md shadow-sm">
            <div class="absolute -right-4 -top-6 w-28 h-28 rounded-full bg-primary-fixed/15 pointer-events-none"></div>
            <div class="flex justify-between items-start relative z-10">
              <div class="flex items-center gap-space-xs bg-on-primary/10 px-2.5 py-1 rounded-full w-fit">
                <span class="material-symbols-outlined text-[16px] text-primary-fixed">nest_eco_leaf</span>
                <span class="font-label-sm text-label-sm text-on-primary-container font-bold">Penyelamatan Pangan</span>
              </div>
              <span class="text-on-primary-container font-label-sm text-label-sm flex items-center gap-0.5 font-semibold">
                +3.2 kg bln ini
              </span>
            </div>
            <div class="mt-3 relative z-10">
              <div class="flex items-baseline gap-2">
                <span class="font-headline-xl text-headline-xl text-on-primary tracking-tight font-extrabold" id="foodSavedValue">${state.user.foodSavedKg.toString().replace('.', ',')}</span>
                <span class="font-headline-sm text-headline-sm text-primary-fixed font-bold">kg</span>
              </div>
              <p class="font-body-sm text-body-sm text-primary-fixed-dim mt-0.5 leading-relaxed">
                Bahan makanan berhasil dicegah masuk ke TPA. Setara dengan <strong class="text-on-primary font-bold">42 porsi makanan</strong> siap santap keluarga!
              </p>
            </div>
          </div>

          <!-- Card 2: Uang Dihemat -->
          <div class="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div class="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-primary shadow-xs">
                <span class="material-symbols-outlined text-[18px]">savings</span>
              </div>
              <span class="font-label-sm text-label-sm text-primary bg-secondary-container px-2 py-0.5 rounded-full font-bold">Hemat</span>
            </div>
            <div class="mt-3">
              <span class="font-headline-md text-headline-md text-on-surface block font-bold" id="moneySavedValue">Rp${state.user.moneySavedRp.toLocaleString('id-ID')}</span>
              <p class="font-body-sm text-body-sm text-secondary mt-0.5 leading-snug">
                Cegah overbuy & busuk
              </p>
            </div>
          </div>

          <!-- Card 3: Jejak Karbon Dicegah -->
          <div class="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div class="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-primary shadow-xs">
                <span class="material-symbols-outlined text-[18px]">co2</span>
              </div>
              <span class="font-label-sm text-label-sm text-primary bg-secondary-container px-2 py-0.5 rounded-full font-bold">-38%</span>
            </div>
            <div class="mt-3">
              <div class="flex items-baseline gap-1">
                <span class="font-headline-md text-headline-md text-on-surface font-bold">${state.user.co2PreventedKg}</span>
                <span class="font-label-md text-label-md text-secondary font-semibold">kg CO₂e</span>
              </div>
              <p class="font-body-sm text-body-sm text-secondary mt-0.5 leading-snug">
                Emisi gas dieliminasi
              </p>
            </div>
          </div>

          <!-- Card 4: Mitra & Komunitas Terbantu (Span-2) -->
          <div class="col-span-2 bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-space-md">
              <div class="w-11 h-11 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0 shadow-xs">
                <span class="material-symbols-outlined text-[22px]">diversity_1</span>
              </div>
              <div>
                <div class="flex items-baseline gap-1.5">
                  <span class="font-headline-md text-headline-md text-on-surface font-bold" id="partnersHelpedValue">${state.user.partnersHelped}</span>
                  <span class="font-label-lg text-label-lg text-on-surface font-bold">UMKM & Komunitas</span>
                </div>
                <p class="font-body-sm text-body-sm text-secondary">Menerima donasi pangan berlebih siap olah</p>
              </div>
            </div>
            <button class="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:text-primary hover:bg-secondary-container transition-colors shrink-0" id="btnPartnerNetworkModal">
              <span class="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>

        <!-- Monthly Efficiency Chart Section -->
        <div class="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-md">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Efisiensi Bahan Dapur</h3>
              <p class="font-body-sm text-body-sm text-secondary">Persentase bahan yang berhasil termanfaatkan</p>
            </div>
            <div class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm font-bold">
              <span class="material-symbols-outlined text-[14px] text-primary">trending_up</span>
              <span>+26% Kuartal I</span>
            </div>
          </div>
          <!-- Interactive Mini Bar Visualizer -->
          <div class="flex items-end justify-between gap-space-sm pt-space-sm h-32 px-2">
            <!-- Jan -->
            <div class="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer chart-bar-item" data-month="jan" data-note="Januari: Masih beradaptasi dengan jadwal belanja mingguan.">
              <span class="font-label-sm text-label-sm text-secondary group-hover:text-primary font-bold">68%</span>
              <div class="w-full bg-surface-container rounded-t-lg overflow-hidden h-20 flex items-end">
                <div class="w-full bg-secondary-fixed rounded-t-lg transition-all duration-500 group-hover:bg-primary-container" style="height: 68%;"></div>
              </div>
              <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Jan</span>
            </div>
            <!-- Feb -->
            <div class="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer chart-bar-item" data-month="feb" data-note="Februari: Mulai aktif memanfaatkan pengingat H-3 kedaluwarsa.">
              <span class="font-label-sm text-label-sm text-secondary group-hover:text-primary font-bold">82%</span>
              <div class="w-full bg-surface-container rounded-t-lg overflow-hidden h-20 flex items-end">
                <div class="w-full bg-primary-fixed-dim rounded-t-lg transition-all duration-500 group-hover:bg-primary-container" style="height: 82%;"></div>
              </div>
              <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Feb</span>
            </div>
            <!-- Mar -->
            <div class="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer chart-bar-item active" data-month="mar" data-note="Maret: Rekor tertinggi! Hampir nol sisa sayur & rempah berkat Resep Penyelamat.">
              <span class="font-label-sm text-label-sm text-primary font-bold">94%</span>
              <div class="w-full bg-surface-container rounded-t-lg overflow-hidden h-20 flex items-end">
                <div class="w-full bg-primary-container rounded-t-lg transition-all duration-500 relative" style="height: 94%;">
                  <span class="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary-fixed animate-ping"></span>
                </div>
              </div>
              <span class="font-label-sm text-label-sm text-primary font-bold">Mar</span>
            </div>
          </div>
          <div class="bg-surface-container-low rounded-xl p-space-sm flex items-start gap-2" id="chartInsightBox">
            <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">tips_and_updates</span>
            <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed" id="chartInsightText">
              Penyelamatan tertinggi terjadi pada bahan sayuran hijau & buah melalui fitur <strong>Resep Penyelamat</strong>.
            </p>
          </div>
        </div>

        <!-- Gamification: Smart Pantry Passport Badges -->
        <div class="flex flex-col gap-space-sm">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Pantry Passport Badges</h3>
              <p class="font-body-sm text-body-sm text-secondary">3 lencana utama berhasil kamu raih</p>
            </div>
            <button class="font-label-md text-label-md text-primary font-bold hover:underline" id="btnSeeAllBadges">Lihat Koleksi</button>
          </div>
          <div class="grid grid-cols-3 gap-space-xs">
            <!-- Badge 1 -->
            <div class="bg-surface-container-lowest rounded-2xl p-space-sm flex flex-col items-center text-center shadow-sm cursor-pointer hover:bg-secondary-container/20 transition-all hover:scale-105 passport-badge" data-msg="Lolos 15x godaan promo beli 2 gratis 1! 🛡️">
              <div class="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary shadow-sm mb-1.5">
                <span class="material-symbols-outlined text-[24px]">shield_lock</span>
              </div>
              <span class="font-label-sm text-label-sm text-on-surface font-bold line-clamp-1">Anti-Promo Trap</span>
              <span class="font-body-sm text-[10px] text-secondary mt-0.5">15x Lolos Impulsif</span>
            </div>
            <!-- Badge 2 -->
            <div class="bg-surface-container-lowest rounded-2xl p-space-sm flex flex-col items-center text-center shadow-sm cursor-pointer hover:bg-secondary-container/20 transition-all hover:scale-105 passport-badge" data-msg="Telah memasak 20 resep berbahan risiko tinggi! 🍳">
              <div class="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary shadow-sm mb-1.5">
                <span class="material-symbols-outlined text-[24px]">soup_kitchen</span>
              </div>
              <span class="font-label-sm text-label-sm text-on-surface font-bold line-clamp-1">Rescue Chef</span>
              <span class="font-body-sm text-[10px] text-secondary mt-0.5">20 Bahan Terolah</span>
            </div>
            <!-- Badge 3 -->
            <div class="bg-surface-container-lowest rounded-2xl p-space-sm flex flex-col items-center text-center shadow-sm cursor-pointer hover:bg-secondary-container/20 transition-all hover:scale-105 passport-badge" data-msg="8 paket pangan surplus disalurkan ke warga sekitar! 🤝">
              <div class="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shadow-sm mb-1.5">
                <span class="material-symbols-outlined text-[24px]">volunteer_activism</span>
              </div>
              <span class="font-label-sm text-label-sm text-on-surface font-bold line-clamp-1">Pahlawan Warung</span>
              <span class="font-body-sm text-[10px] text-secondary mt-0.5">8x Distribusi Pangan</span>
            </div>
          </div>
        </div>

        <!-- Quick Action / Share Banner -->
        <div class="bg-surface-container rounded-2xl p-space-md flex items-center justify-between shadow-sm">
          <div class="flex items-center gap-space-sm">
            <div class="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-xs">
              <span class="material-symbols-outlined text-[22px]">ios_share</span>
            </div>
            <div>
              <span class="font-label-lg text-label-lg text-on-surface block font-bold">Laporan Dampak Lingkungan</span>
              <span class="font-body-sm text-body-sm text-secondary">Export PDF atau bagikan ke IG Story</span>
            </div>
          </div>
          <button class="px-space-md py-2 bg-primary-container text-on-primary rounded-xl font-label-md text-label-md hover:bg-primary transition-colors flex items-center gap-1 shrink-0 font-bold shadow-xs active:scale-95" id="btnShareStory">
            <span class="material-symbols-outlined text-[16px]">share</span>
            <span>Bagikan</span>
          </button>
        </div>

        <!-- Settings & Preferences Section -->
        <div class="flex flex-col gap-space-xs">
          <h3 class="font-headline-sm text-headline-sm text-on-surface px-1 font-bold">Pengaturan & Preferensi</h3>
          <div class="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <!-- Setting Item 1 -->
            <button class="w-full flex items-center justify-between p-space-md text-left hover:bg-surface-container-low transition-colors" id="btnSettingMealPref">
              <div class="flex items-center gap-space-md">
                <span class="material-symbols-outlined text-secondary text-[22px]">ramen_dining</span>
                <div>
                  <span class="font-label-lg text-label-lg text-on-surface block font-semibold">Preferensi Masak & Porsi</span>
                  <span class="font-body-sm text-body-sm text-secondary">3 Orang Dewasa • Fleksibel Rendah Karbo</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-secondary text-[18px]">chevron_right</span>
            </button>
            <div class="h-[1px] bg-surface-variant mx-space-md"></div>

            <!-- Setting Item 2: Notification Toggle -->
            <div class="flex items-center justify-between p-space-md">
              <div class="flex items-center gap-space-md">
                <span class="material-symbols-outlined text-secondary text-[22px]">notifications_active</span>
                <div>
                  <span class="font-label-lg text-label-lg text-on-surface block font-semibold">Alarm Kedaluwarsa Dapur</span>
                  <span class="font-body-sm text-body-sm text-secondary">Notifikasi otomatis pada H-3 & H-1</span>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input ${state.alarmEnabled ? 'checked' : ''} class="sr-only peer" id="alarmToggleCheckbox" type="checkbox"/>
                <div class="w-11 h-6 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
              </label>
            </div>
            <div class="h-[1px] bg-surface-variant mx-space-md"></div>

            <!-- Setting Item 3: Store integration -->
            <button class="w-full flex items-center justify-between p-space-md text-left hover:bg-surface-container-low transition-colors" id="btnSettingMerchant">
              <div class="flex items-center gap-space-md">
                <span class="material-symbols-outlined text-secondary text-[22px]">account_balance_wallet</span>
                <div>
                  <span class="font-label-lg text-label-lg text-on-surface block font-semibold">Integrasi Transaksi & Toko</span>
                  <span class="font-body-sm text-body-sm text-secondary">Terhubung ke 2 Merchant Mitra BEKAL</span>
                </div>
              </div>
              <div class="flex items-center gap-1 text-primary font-label-sm text-label-sm font-bold">
                <span>Aktif</span>
                <span class="material-symbols-outlined text-[18px]">chevron_right</span>
              </div>
            </button>
            <div class="h-[1px] bg-surface-variant mx-space-md"></div>

            <!-- Setting Item 4: Unduh PDF -->
            <button class="w-full flex items-center justify-between p-space-md text-left hover:bg-surface-container-low transition-colors" id="btnDownloadCarbonPdf">
              <div class="flex items-center gap-space-md">
                <span class="material-symbols-outlined text-secondary text-[22px]">picture_as_pdf</span>
                <div>
                  <span class="font-label-lg text-label-lg text-on-surface block font-semibold">Unduh Rekapitulasi Karbon (PDF)</span>
                  <span class="font-body-sm text-body-sm text-secondary">Dokumen terverifikasi untuk jejak ESG pribadi</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-secondary text-[18px]">download</span>
            </button>
            <div class="h-[1px] bg-surface-variant mx-space-md"></div>

            <!-- Setting Item 5: Logout -->
            <button class="w-full flex items-center justify-between p-space-md text-left hover:bg-error-container/20 transition-colors text-error" id="btnLogout">
              <div class="flex items-center gap-space-md">
                <span class="material-symbols-outlined text-[22px]">logout</span>
                <span class="font-label-lg text-label-lg font-bold">Keluar dari Akun</span>
              </div>
              <span class="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>

        <!-- Motivational Footer Statement -->
        <div class="flex flex-col items-center text-center p-space-md rounded-2xl bg-secondary-container/30">
          <span class="material-symbols-outlined text-primary text-[28px] mb-1">sentiment_satisfied</span>
          <h4 class="font-headline-sm text-headline-sm text-on-surface font-bold">Terima kasih telah peduli!</h4>
          <p class="font-body-sm text-body-sm text-secondary max-w-xs mt-1 leading-relaxed">
            Setiap gram makanan yang Anda selamatkan mengurangi beban tempat pembuangan dan emisi metana di bumi.
          </p>
          <span class="font-label-sm text-label-sm text-primary mt-2 font-bold tracking-wide">#BijakKelolaBahan #BekalMasaDepan</span>
        </div>
      </div>
    </div>
  `;
}
