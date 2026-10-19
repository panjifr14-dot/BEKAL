// Screen 7: Resep - Rescue Recipe
export function renderResepScreen() {
  return `
    <div class="flex flex-col w-full min-h-screen bg-surface px-margin pt-28 pb-28">
      <div class="flex flex-col w-full pb-6 gap-space-lg">
        <!-- Top Summary Banner -->
        <section class="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md relative overflow-hidden">
          <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-primary-fixed/30 rounded-full blur-2xl pointer-events-none"></div>
          <div class="flex items-start justify-between gap-space-md">
            <div class="flex flex-col gap-1 min-w-0">
              <div class="flex items-center gap-1.5">
                <span class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight font-bold">Resep Penyelamat Dapur</span>
                <span class="text-xl leading-none">🍳</span>
              </div>
              <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Resep otomatis diprioritaskan dari bahan dapur yang paling mendesak & hampir kedaluwarsa.</p>
            </div>
            <div class="w-12 h-12 shrink-0 rounded-2xl bg-secondary-container flex items-center justify-center text-primary shadow-sm">
              <span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1;">skillet</span>
            </div>
          </div>
          <!-- Active Risk Alert Box -->
          <div class="bg-error-container/60 rounded-xl p-space-sm flex items-center gap-space-sm">
            <div class="w-7 h-7 rounded-full bg-error text-on-error flex items-center justify-center shrink-0 shadow-sm">
              <span class="material-symbols-outlined text-[16px]">local_fire_department</span>
            </div>
            <div class="min-w-0 flex-1">
              <p class="font-label-sm text-label-sm text-error font-bold leading-tight">2 Bahan Berisiko Tinggi Harus Dimasak Hari Ini</p>
              <p class="font-body-sm text-body-sm text-on-error-container leading-tight truncate mt-0.5">Tomat (Risk 85) • Daging Ayam (Risk 80)</p>
            </div>
            <button aria-label="Detail Bahan Kritis" class="shrink-0 text-error hover:opacity-80 transition-opacity p-1" id="btnAlertRiskResep">
              <span class="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </section>

        <!-- Filter Chips Horizontal Scroll -->
        <section class="flex flex-col gap-space-xs">
          <div class="flex items-center justify-between">
            <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Kategori Penyelamat</span>
            <span class="font-body-sm text-body-sm text-primary font-bold" id="recipeCountLabel">3 Resep Siap</span>
          </div>
          <div class="flex items-center gap-2 overflow-x-auto pb-1 -mx-margin px-margin no-scrollbar" id="filter-container">
            <button class="filter-chip px-3.5 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-all shadow-sm bg-primary text-on-primary font-bold flex items-center gap-1.5 active:scale-95" data-filter="all">
              <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
              Semua Resep Penyelamat
            </button>
            <button class="filter-chip px-3.5 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-all shadow-sm bg-surface-container-lowest text-on-surface hover:bg-surface-container active:scale-95 flex items-center gap-1.5 font-semibold" data-filter="quick">
              <span class="text-tertiary font-bold text-xs">⚡</span>
              Masak Cepat (< 20 mnt)
            </button>
            <button class="filter-chip px-3.5 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-all shadow-sm bg-surface-container-lowest text-on-surface hover:bg-surface-container active:scale-95 flex items-center gap-1.5 font-semibold" data-filter="budget">
              <span class="text-primary font-bold text-xs">💰</span>
              Budget Hemat
            </button>
            <button class="filter-chip px-3.5 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-all shadow-sm bg-surface-container-lowest text-on-surface hover:bg-surface-container active:scale-95 flex items-center gap-1.5 font-semibold" data-filter="family">
              <span class="text-secondary font-bold text-xs">👶</span>
              Cocok Keluarga
            </button>
          </div>
        </section>

        <!-- Recipe Cards List -->
        <section class="flex flex-col gap-space-lg" id="recipeCardsList">
          <!-- Card 1: Top Priority -->
          <article class="recipe-card bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col group transition-all duration-200 hover:shadow-md" data-category="all quick budget family">
            <div class="relative w-full h-44 overflow-hidden bg-surface-container">
              <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Sambal Tomat Terasi & Ayam Suwir" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsRIUz0H3lurmScfZVaiQYbwib_CDcDtWtTPmRzqMaN_6xihwhOa1_R77okFuXOsfNfEjS5_kuNBR1oH0YdOU5abmZkHUPA4OKgDablfDNttzUHElNxrN1MvZpSWhaqXi3y8fZiUWJYcMgVe1gsteyd67UPv-atIhcEsd_hPcmyCie1KdpzCmIzNo1R0Ng_JUkYy5_FVmv79bZcSbkdmbWYU1e9ftb1cQKUoBpwjg9H5SAcNIb3pZq"/>
              <div class="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-black/20 pointer-events-none"></div>
              <!-- Priority Tag Badge -->
              <div class="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error text-on-error shadow-sm font-label-sm text-label-sm tracking-wide font-bold">
                <span class="material-symbols-outlined text-[13px]" style="font-variation-settings: 'FILL' 1;">priority_high</span>
                <span>Prioritas Utama</span>
              </div>
              <!-- Food Waste Saving Impact Tag -->
              <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-primary">
                <span class="font-label-sm text-label-sm bg-primary/85 backdrop-blur-md px-2.5 py-1 rounded-full text-on-primary flex items-center gap-1 font-bold">
                  <span class="material-symbols-outlined text-[13px]">recycling</span>
                  Selamatkan 1 kg Tomat + 250g Ayam
                </span>
                <button class="w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-primary shadow-sm hover:scale-110 active:scale-95 transition-transform btn-bookmark">
                  <span class="material-symbols-outlined text-[18px]">bookmark_border</span>
                </button>
              </div>
            </div>
            <div class="p-space-md flex flex-col gap-space-md">
              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between gap-2">
                  <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">Sambal Tomat Terasi & Ayam Suwir</h3>
                  <span class="px-2 py-0.5 rounded-full bg-error-container text-error font-label-sm text-label-sm font-bold shrink-0">Score 85</span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Pedas manis gurih membangkitkan selera makan, habiskan stok tomat seketika.</p>
              </div>
              <!-- Recipe Metas -->
              <div class="flex items-center gap-3 py-1 font-body-sm text-body-sm text-on-surface-variant font-medium">
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-[17px] text-tertiary">schedule</span>
                  <span>20 mnt</span>
                </div>
                <span class="text-surface-dim">•</span>
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-[17px] text-secondary">group</span>
                  <span>3 Porsi</span>
                </div>
                <span class="text-surface-dim">•</span>
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-[17px] text-primary">speed</span>
                  <span>Mudah</span>
                </div>
              </div>
              <!-- Pantry Match Items -->
              <div class="flex flex-col gap-1.5 bg-surface-container-low rounded-xl p-space-sm">
                <span class="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Kecocokan Bahan Kulkas</span>
                <div class="flex flex-wrap gap-1.5">
                  <span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container-lowest text-error font-label-sm text-label-sm shadow-xs font-bold">
                    <span class="material-symbols-outlined text-[14px]">check_circle</span>
                    Tomat (Risk 85)
                  </span>
                  <span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container-lowest text-error font-label-sm text-label-sm shadow-xs font-bold">
                    <span class="material-symbols-outlined text-[14px]">check_circle</span>
                    Daging Ayam (Risk 80)
                  </span>
                  <span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container-lowest text-primary font-label-sm text-label-sm shadow-xs font-bold">
                    <span class="material-symbols-outlined text-[14px]">check_circle</span>
                    Cabai Rawit (Ada)
                  </span>
                </div>
              </div>
              <!-- Action Button -->
              <button class="w-full bg-primary-container hover:bg-primary text-on-primary py-3 rounded-xl font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] btn-cook-trigger" data-title="Sambal Tomat Terasi & Ayam Suwir" data-img="https://lh3.googleusercontent.com/aida-public/AB6AXuCsRIUz0H3lurmScfZVaiQYbwib_CDcDtWtTPmRzqMaN_6xihwhOa1_R77okFuXOsfNfEjS5_kuNBR1oH0YdOU5abmZkHUPA4OKgDablfDNttzUHElNxrN1MvZpSWhaqXi3y8fZiUWJYcMgVe1gsteyd67UPv-atIhcEsd_hPcmyCie1KdpzCmIzNo1R0Ng_JUkYy5_FVmv79bZcSbkdmbWYU1e9ftb1cQKUoBpwjg9H5SAcNIb3pZq">
                <span>Mulai Masak Sekarang</span>
                <span class="material-symbols-outlined text-[18px]">restaurant</span>
              </button>
            </div>
          </article>

          <!-- Card 2: Moderate Priority -->
          <article class="recipe-card bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col group transition-all duration-200 hover:shadow-md" data-category="all family">
            <div class="relative w-full h-44 overflow-hidden bg-surface-container">
              <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Semur Ayam Tomat Manis Gurih" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7VfcUjnRrFUZRnBdCefhE1AqarlBr3VfX1zHanfYylsncwKJ2X7H84FzZr2rPhkUq-Vr3KreYfwDhMm_0q8TWi81YewEZL_nKKtuNJSfQ3R51k-sfpJPramYvqwgcdbMDHgYAD7GzvwxQjWT0Jeoj9T2HCQytWjQPdkd5VFl7pHcVLZ38h9Fccg15S8N-3-BEKXyTlXjKWP6y7KGsZy-quutxam973nMWKurEbmrJwBzdL2ESjs-O"/>
              <div class="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-black/20 pointer-events-none"></div>
              <!-- Priority Tag Badge -->
              <div class="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary-container text-on-tertiary-container shadow-sm font-label-sm text-label-sm tracking-wide font-bold">
                <span class="material-symbols-outlined text-[13px]" style="font-variation-settings: 'FILL' 1;">bolt</span>
                <span>Prioritas Kedua</span>
              </div>
              <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-primary">
                <span class="font-label-sm text-label-sm bg-surface-container-lowest/80 backdrop-blur-md px-2.5 py-1 rounded-full text-on-surface flex items-center gap-1 font-bold">
                  <span class="material-symbols-outlined text-[13px] text-tertiary">savings</span>
                  Hemat Rp 45.000 Bahan Ayam
                </span>
                <button class="w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant shadow-sm hover:scale-110 active:scale-95 transition-transform btn-bookmark">
                  <span class="material-symbols-outlined text-[18px]">bookmark_border</span>
                </button>
              </div>
            </div>
            <div class="p-space-md flex flex-col gap-space-md">
              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between gap-2">
                  <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">Semur Ayam Tomat Manis Gurih</h3>
                  <span class="px-2 py-0.5 rounded-full bg-tertiary-fixed text-tertiary font-label-sm text-label-sm font-bold shrink-0">Score 80</span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Kuah pekat kaya rasa rempah, pas dimakan bareng nasi hangat keluarga.</p>
              </div>
              <!-- Recipe Metas -->
              <div class="flex items-center gap-3 py-1 font-body-sm text-body-sm text-on-surface-variant font-medium">
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-[17px] text-tertiary">schedule</span>
                  <span>35 mnt</span>
                </div>
                <span class="text-surface-dim">•</span>
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-[17px] text-secondary">group</span>
                  <span>4 Porsi</span>
                </div>
                <span class="text-surface-dim">•</span>
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-[17px] text-tertiary">speed</span>
                  <span>Sedang</span>
                </div>
              </div>
              <!-- Pantry Match Items -->
              <div class="flex flex-col gap-1.5 bg-surface-container-low rounded-xl p-space-sm">
                <span class="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Kecocokan Bahan Kulkas</span>
                <div class="flex flex-wrap gap-1.5">
                  <span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container-lowest text-error font-label-sm text-label-sm shadow-xs font-bold">
                    <span class="material-symbols-outlined text-[14px]">check_circle</span>
                    Daging Ayam (Risk 80)
                  </span>
                  <span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container-lowest text-primary font-label-sm text-label-sm shadow-xs font-bold">
                    <span class="material-symbols-outlined text-[14px]">check_circle</span>
                    Kentang (Risk 40)
                  </span>
                  <span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container-lowest text-primary font-label-sm text-label-sm shadow-xs font-bold">
                    <span class="material-symbols-outlined text-[14px]">check_circle</span>
                    Kecap Manis (Ada)
                  </span>
                </div>
              </div>
              <!-- Action Button -->
              <button class="w-full bg-secondary-container hover:bg-secondary-fixed text-on-secondary-fixed py-3 rounded-xl font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] btn-cook-trigger" data-title="Semur Ayam Tomat Manis Gurih" data-img="https://lh3.googleusercontent.com/aida-public/AB6AXuA7VfcUjnRrFUZRnBdCefhE1AqarlBr3VfX1zHanfYylsncwKJ2X7H84FzZr2rPhkUq-Vr3KreYfwDhMm_0q8TWi81YewEZL_nKKtuNJSfQ3R51k-sfpJPramYvqwgcdbMDHgYAD7GzvwxQjWT0Jeoj9T2HCQytWjQPdkd5VFl7pHcVLZ38h9Fccg15S8N-3-BEKXyTlXjKWP6y7KGsZy-quutxam973nMWKurEbmrJwBzdL2ESjs-O">
                <span>Lihat Resep & Takaran</span>
                <span class="material-symbols-outlined text-[18px]">menu_book</span>
              </button>
            </div>
          </article>

          <!-- Card 3: Safe / Fast Priority -->
          <article class="recipe-card bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col group transition-all duration-200 hover:shadow-md" data-category="all quick budget">
            <div class="relative w-full h-44 overflow-hidden bg-surface-container">
              <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Tumis Bayam Bawang Putih" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgOQP2HvRV97yHPOHpo-kT8zF_mHhDh96rYoplgRVel9YTzEN2pUPuwusKSCXA7k-tJ5xXBIKymLeDBncvhupSYFLkVo1bvRMMBJOWvMu3ZAfRykUi9-3X-pf5m0-_lXzzjqusD5WtxmjCJdpimvlew2ZKPU5OZBbkpB2mayqX-iYmqriVHkspD6Kt5k8q-D0zZge9igmJSZL7RI9SUc_kNFV4cuTJNzcWD_xNZWoCnXNWm89XdLfP"/>
              <div class="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-black/20 pointer-events-none"></div>
              <!-- Priority Tag Badge -->
              <div class="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container shadow-sm font-label-sm text-label-sm tracking-wide font-bold">
                <span class="material-symbols-outlined text-[13px]">eco</span>
                <span>Prioritas Ketiga</span>
              </div>
              <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-primary">
                <span class="font-label-sm text-label-sm bg-surface-container-lowest/80 backdrop-blur-md px-2.5 py-1 rounded-full text-on-surface flex items-center gap-1 font-bold">
                  <span class="material-symbols-outlined text-[13px] text-primary">timer</span>
                  15 Menit Jadi
                </span>
                <button class="w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant shadow-sm hover:scale-110 active:scale-95 transition-transform btn-bookmark">
                  <span class="material-symbols-outlined text-[18px]">bookmark_border</span>
                </button>
              </div>
            </div>
            <div class="p-space-md flex flex-col gap-space-md">
              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between gap-2">
                  <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">Tumis Bayam Bawang Putih Kuah Bening</h3>
                  <span class="px-2 py-0.5 rounded-full bg-secondary-container text-primary font-label-sm text-label-sm font-bold shrink-0">Score 60</span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Paling ramah lambung, kaya serat dan menjaga kesegaran sayur hijau.</p>
              </div>
              <!-- Recipe Metas -->
              <div class="flex items-center gap-3 py-1 font-body-sm text-body-sm text-on-surface-variant font-medium">
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-[17px] text-primary">schedule</span>
                  <span>15 mnt</span>
                </div>
                <span class="text-surface-dim">•</span>
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-[17px] text-secondary">group</span>
                  <span>2 Porsi</span>
                </div>
                <span class="text-surface-dim">•</span>
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-[17px] text-primary">speed</span>
                  <span>Sangat Mudah</span>
                </div>
              </div>
              <!-- Pantry Match Items -->
              <div class="flex flex-col gap-1.5 bg-surface-container-low rounded-xl p-space-sm">
                <span class="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Kecocokan Bahan Kulkas</span>
                <div class="flex flex-wrap gap-1.5">
                  <span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container-lowest text-tertiary font-label-sm text-label-sm shadow-xs font-bold">
                    <span class="material-symbols-outlined text-[14px]">check_circle</span>
                    Bayam Hijau (Risk 60)
                  </span>
                  <span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container-lowest text-primary font-label-sm text-label-sm shadow-xs font-bold">
                    <span class="material-symbols-outlined text-[14px]">check_circle</span>
                    Bawang Putih (Ada)
                  </span>
                </div>
              </div>
              <!-- Action Button -->
              <button class="w-full bg-secondary-container hover:bg-secondary-fixed text-on-secondary-fixed py-3 rounded-xl font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] btn-cook-trigger" data-title="Tumis Bayam Bawang Putih Kuah Bening" data-img="https://lh3.googleusercontent.com/aida-public/AB6AXuCgOQP2HvRV97yHPOHpo-kT8zF_mHhDh96rYoplgRVel9YTzEN2pUPuwusKSCXA7k-tJ5xXBIKymLeDBncvhupSYFLkVo1bvRMMBJOWvMu3ZAfRykUi9-3X-pf5m0-_lXzzjqusD5WtxmjCJdpimvlew2ZKPU5OZBbkpB2mayqX-iYmqriVHkspD6Kt5k8q-D0zZge9igmJSZL7RI9SUc_kNFV4cuTJNzcWD_xNZWoCnXNWm89XdLfP">
                <span>Lihat Resep & Takaran</span>
                <span class="material-symbols-outlined text-[18px]">menu_book</span>
              </button>
            </div>
          </article>
        </section>

        <!-- Informative Smart Pantry Sync Banner -->
        <section class="bg-secondary-container/60 rounded-2xl p-space-md flex items-start gap-space-sm shadow-sm">
          <div class="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            <span class="material-symbols-outlined text-[18px]">sync_saved_locally</span>
          </div>
          <div class="flex flex-col gap-0.5 min-w-0">
            <h4 class="font-label-md text-label-md text-on-surface font-bold leading-tight">Otomatis Terhubung ke Smart Pantry</h4>
            <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Setelah memasak, status stok bahan di Smart Pantry Passport akan otomatis diperbarui dan dampak penyelamatan dicatat di profil!</p>
          </div>
        </section>
      </div>
    </div>
  `;
}
