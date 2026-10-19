// Screen 3: Inventaris & Pindai - Promo Trap Detector
export function renderInventarisScreen() {
  return `
    <div class="flex flex-col w-full min-h-screen bg-surface px-margin pt-28 pb-28">
      <div class="flex flex-col w-full pb-space-xl">
        <!-- Educational Insight Banner -->
        <div class="w-full bg-secondary-container/40 rounded-2xl p-space-md mb-space-md flex items-start gap-3 shadow-sm">
          <div class="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm">
            <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">loyalty</span>
          </div>
          <div class="flex flex-col flex-1 min-w-0">
            <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">Cek Risiko Promo Trap</h2>
            <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-snug">
              Diskon besar sering memicu pembelian berlebih. BEKAL membandingkan promo dengan kebiasaan konsumsi dapur Anda.
            </p>
          </div>
        </div>

        <!-- Segmented Control Mode Tabs -->
        <div class="w-full bg-surface-container rounded-full p-1 flex items-center mb-space-lg shadow-sm">
          <button class="flex-1 py-2 px-3 rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md text-center transition-all shadow-sm flex items-center justify-center gap-1.5 font-bold" id="tabManual" type="button">
            <span class="material-symbols-outlined text-[16px]">edit_note</span>
            <span>Input Manual</span>
          </button>
          <button class="flex-1 py-2 px-3 rounded-full text-secondary font-label-md text-label-md text-center transition-all flex items-center justify-center gap-1.5 hover:text-on-surface font-semibold" id="tabLink" type="button">
            <span class="material-symbols-outlined text-[16px]">document_scanner</span>
            <span>Pindai Brosur / Link</span>
          </button>
        </div>

        <!-- Scanning Simulator Notice (when in Scan mode) -->
        <div id="scanModeNotice" class="hidden mb-space-md p-3.5 rounded-2xl bg-primary-fixed/20 border border-primary/20 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <span class="material-symbols-outlined text-primary text-[24px]">photo_camera</span>
            <div class="flex flex-col">
              <span class="font-label-md text-label-md font-bold text-on-surface">Pindai Struk / Brosur Promo</span>
              <span class="text-xs text-secondary">Ambil foto atau unggah brosur supermarket</span>
            </div>
          </div>
          <button id="btnOpenScannerFromPindai" class="px-3 py-1.5 rounded-xl bg-primary text-on-primary font-label-sm text-label-sm font-bold shadow-sm">
            Buka Kamera
          </button>
        </div>

        <!-- Product & Purchase Plan Card -->
        <div class="w-full bg-surface-container-lowest rounded-2xl p-space-md shadow-sm mb-space-md flex flex-col gap-3.5">
          <div class="flex items-start gap-3">
            <div class="relative w-16 h-16 rounded-xl overflow-hidden bg-surface-container shrink-0 shadow-xs">
              <img class="w-full h-full object-cover" alt="Tomat Merah Segar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcM6LyXlAPH_K_ktaLenZLWcsi9bwsro6xsJ8ao8l5OB3qb2sJmqzz-5VpiiVJw8iF3-RFnmMPgymmMeONaANA7uywBvoBzUN_N3Z5LCL0ksCqT8tREFDH5g3C7tBNUOm3mAg562YiLL0wRf5GAhMrcYqF_kqsqzT9MlRtu8RknQBvgLa8rGZARvMcEsryXiJX-Ux_HxBLJoa8cfUm0Htku9EOYMKWXXGWio_nlLGQq-D84rWw_JRf"/>
              <span class="absolute bottom-1 right-1 bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm px-1 rounded-sm leading-tight font-bold">
                -40%
              </span>
            </div>
            <div class="flex flex-col flex-1 min-w-0">
              <div class="flex items-center justify-between gap-1">
                <span class="font-headline-sm text-headline-sm text-on-surface truncate font-bold">Tomat Merah Segar</span>
                <span class="font-label-sm text-label-sm bg-secondary-container text-primary font-bold px-2 py-0.5 rounded-full shrink-0">Bahan Basah</span>
              </div>
              <div class="flex items-baseline gap-2 mt-1">
                <span class="font-headline-md text-headline-md text-error tracking-tight font-bold" id="promoPriceDisplay">Rp27.000</span>
                <span class="font-body-sm text-body-sm text-outline line-through" id="normalPriceDisplay">Rp45.000</span>
                <span class="font-label-sm text-label-sm text-on-surface-variant font-medium" id="pricePerKgDisplay">/ 3,0 kg</span>
              </div>
              <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Promo Pasar Segar • Berakhir 2 hari lagi</p>
            </div>
          </div>

          <!-- Stepper Section -->
          <div class="bg-surface-container-low rounded-xl p-3 flex items-center justify-between">
            <div class="flex flex-col">
              <span class="font-label-md text-label-md text-on-surface font-bold">Rencana Pembelian</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant">Estimasi berat total promo</span>
            </div>
            <div class="flex items-center gap-2 bg-surface-container-lowest rounded-full p-1 shadow-sm">
              <button aria-label="Kurangi jumlah" class="w-8 h-8 rounded-full bg-surface-container hover:bg-secondary-container text-primary flex items-center justify-center transition-transform active:scale-90" id="btnMinusWeight" type="button">
                <span class="material-symbols-outlined text-[18px]">remove</span>
              </button>
              <span class="font-headline-sm text-headline-sm text-on-surface w-16 text-center select-none font-bold" id="weightLabel">3,0 kg</span>
              <button aria-label="Tambah jumlah" class="w-8 h-8 rounded-full bg-surface-container hover:bg-secondary-container text-primary flex items-center justify-center transition-transform active:scale-90" id="btnPlusWeight" type="button">
                <span class="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Dynamic Risk Evaluation Card -->
        <div class="w-full bg-error-container/40 rounded-2xl p-space-md mb-space-md shadow-sm transition-all duration-300" id="riskCard">
          <div class="flex items-start justify-between gap-2 mb-2">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-error text-[22px]" style="font-variation-settings: 'FILL' 1;">warning</span>
              <h3 class="font-headline-sm text-headline-sm text-error font-bold tracking-tight">Risiko Overbuy Terdeteksi!</h3>
            </div>
            <span class="font-label-sm text-label-sm bg-error text-on-error px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Tinggi</span>
          </div>
          <p class="font-body-md text-body-md text-on-surface leading-relaxed mb-3" id="riskExplanation">
            Berdasarkan pola konsumsi rumah tanggamu, sekitar <span class="font-bold text-error">1,8 kg tomat</span> berpotensi busuk dan berakhir di tempat sampah sebelum sempat diolah.
          </p>
          <!-- Waste Breakdown Badges -->
          <div class="grid grid-cols-2 gap-2 pt-1 mb-3">
            <div class="bg-surface-container-lowest/80 rounded-xl p-2.5 flex items-center gap-2.5">
              <div class="w-7 h-7 rounded-full bg-error-container text-error flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[16px]">delete_sweep</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="font-label-sm text-label-sm text-on-surface-variant leading-none">Potensi Boncos</span>
                <span class="font-label-md text-label-md font-bold text-error mt-1 truncate" id="riskWasteCost">Rugi Rp16.200</span>
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
          <!-- Consumption Context Row -->
          <div class="bg-surface-container-lowest/60 rounded-xl p-2.5 flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px] text-secondary">trending_up</span>
              <span>Rata-rata konsumsi Anda:</span>
            </div>
            <span class="font-label-md text-label-md font-bold text-on-surface">0,6 kg / minggu</span>
          </div>
        </div>

        <!-- AI Smart Behavioral Recommendation Card -->
        <div class="w-full bg-secondary-container/50 rounded-2xl p-space-md mb-space-lg shadow-sm relative overflow-hidden">
          <div class="flex items-start justify-between gap-3 mb-2">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[22px]" style="font-variation-settings: 'FILL' 1;">eco</span>
              <h3 class="font-headline-sm text-headline-sm text-primary font-bold">Rekomendasi Pembelian Bijak</h3>
            </div>
            <span class="font-label-sm text-label-sm bg-primary text-on-primary font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span class="material-symbols-outlined text-[12px]">verified</span>
              Bebas Sampah
            </span>
          </div>
          <div class="flex items-center justify-between my-2 bg-surface-container-lowest/90 rounded-xl p-3 shadow-xs">
            <div>
              <span class="font-body-sm text-body-sm text-on-surface-variant block leading-tight font-medium">Porsi Paling Ideal:</span>
              <span class="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold">1,2 kg</span>
            </div>
            <div class="text-right">
              <span class="font-body-sm text-body-sm text-on-surface-variant block leading-tight font-medium">Biaya yang dikeluarkan:</span>
              <span class="font-headline-sm text-headline-sm text-on-surface font-bold">Rp10.800</span>
            </div>
          </div>
          <p class="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
            Membeli <strong class="text-primary font-bold">1,2 kg</strong> cukup untuk 2 minggu kebutuhan saus dan tumisan. Anda tetap hemat dan tidak membuang bahan makanan yang layu.
          </p>
        </div>

        <!-- Nudge Action Stack -->
        <div class="flex flex-col gap-2.5 w-full">
          <!-- Primary Green Nudge Button -->
          <button class="w-full bg-primary-container text-on-primary hover:bg-primary font-label-lg text-label-lg py-3.5 px-space-md rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 font-bold" id="btnApplyIdeal" type="button">
            <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
            <span>Sesuaikan ke 1,2 kg (Paling Hemat)</span>
          </button>
          <!-- Secondary Outline Action -->
          <button class="w-full bg-surface-container-lowest text-primary hover:bg-secondary-container/40 font-label-md text-label-md py-3 px-space-md rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 font-bold shadow-xs" id="btnKeepOriginal" type="button">
            <span class="material-symbols-outlined text-[18px]">skillet</span>
            <span>Tetap Beli 3,0 kg (Lihat Ide Resep Awetan)</span>
          </button>
          <!-- Save to Pantry -->
          <button class="w-full bg-surface-container-high text-on-surface hover:bg-secondary-container font-label-md text-label-md py-3 px-space-md rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 font-bold" id="btnSaveToPantryDirect" type="button">
            <span class="material-symbols-outlined text-[18px]">kitchen</span>
            <span>Simpan Pembelian ke Kulkas</span>
          </button>
        </div>

        <!-- Micro Recipe Drawer / Alternative Usage (Hidden Accordion for User Convenience) -->
        <div class="hidden mt-space-md w-full bg-surface-container-low rounded-2xl p-space-md transition-all border border-surface-container-high" id="preserveIdeas">
          <div class="flex items-center justify-between mb-2">
            <span class="font-label-md text-label-md font-bold text-on-surface">Tips Awetan Jika Tetap Beli 3,0 kg:</span>
            <span class="material-symbols-outlined text-secondary text-[18px]">tips_and_updates</span>
          </div>
          <ul class="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
            <li class="flex items-center gap-2 bg-surface-container-lowest p-2.5 rounded-xl shadow-xs">
              <span class="material-symbols-outlined text-tertiary text-[20px]">soup_kitchen</span>
              <span>Buat <strong>Saus Tomat Marinara Homemade</strong> (Tahan 1 bulan di freezer).</span>
            </li>
            <li class="flex items-center gap-2 bg-surface-container-lowest p-2.5 rounded-xl shadow-xs">
              <span class="material-symbols-outlined text-primary text-[20px]">wb_sunny</span>
              <span>Olah jadi <strong>Sun-Dried Tomatoes</strong> minyak zaitun untuk topping pasta.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `;
}
