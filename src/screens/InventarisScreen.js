// Screen 3: Inventaris & Pindai - Smart Pantry & Promo Trap Detector
import { state } from '../state.js';

export function renderInventarisScreen() {
  const inventoryList = state.inventory || [];
  const highRiskItems = inventoryList.filter(i => (i.risk || 0) >= 75);

  return `
    <div class="flex flex-col w-full min-h-screen bg-surface px-margin pt-28 pb-28">
      <div class="flex flex-col w-full pb-space-xl">

        <!-- 3-Way Segmented Mode Navigation Bar -->
        <div class="w-full bg-surface-container rounded-2xl p-1 flex items-center mb-space-md shadow-sm">
          <button class="flex-1 py-2.5 px-2 rounded-xl bg-surface-container-lowest text-primary font-label-md text-label-md text-center transition-all shadow-sm flex items-center justify-center gap-1.5 font-bold tab-inventaris-mode active" id="btnTabKulkas" data-mode="kulkas">
            <span class="material-symbols-outlined text-[18px]">kitchen</span>
            <span>Kulkas Saya</span>
          </button>
          <button class="flex-1 py-2.5 px-2 rounded-xl text-secondary font-label-md text-label-md text-center transition-all flex items-center justify-center gap-1.5 hover:text-on-surface font-semibold tab-inventaris-mode" id="btnTabPromo" data-mode="promo">
            <span class="material-symbols-outlined text-[18px]">loyalty</span>
            <span>Cek Promo</span>
          </button>
          <button class="flex-1 py-2.5 px-2 rounded-xl text-secondary font-label-md text-label-md text-center transition-all flex items-center justify-center gap-1.5 hover:text-on-surface font-semibold tab-inventaris-mode" id="btnTabPindai" data-mode="pindai">
            <span class="material-symbols-outlined text-[18px]">document_scanner</span>
            <span>Pindai OCR</span>
          </button>
        </div>

        <!-- ============================================== -->
        <!-- VIEW 1: KULKAS SAYA (SMART PANTRY INVENTORY) -->
        <!-- ============================================== -->
        <div id="sectionKulkas" class="flex flex-col gap-space-md">
          <!-- Top Inventory Summary Banner -->
          <div class="w-full bg-gradient-to-r from-secondary-container via-surface-container-low to-secondary-container rounded-2xl p-space-md flex items-center justify-between shadow-sm">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm">
                <span class="material-symbols-outlined text-[24px]">inventory_2</span>
              </div>
              <div class="flex flex-col">
                <span class="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">Stok Dapur & Kulkas</span>
                <span class="font-body-sm text-body-sm text-secondary">
                  ${inventoryList.length} Bahan • <strong class="text-error font-bold">${highRiskItems.length} Perlu Segera Dimasak</strong>
                </span>
              </div>
            </div>
            <button class="px-3.5 py-2 rounded-xl bg-primary text-on-primary font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-all" id="btnOpenAddModal">
              <span class="material-symbols-outlined text-[18px]">add</span>
              <span>Tambah Bahan</span>
            </button>
          </div>

          <!-- Search Bar & Filters -->
          <div class="flex flex-col gap-2">
            <div class="relative flex items-center bg-surface-container-lowest rounded-xl shadow-xs">
              <span class="material-symbols-outlined absolute left-3.5 text-secondary text-[20px]">search</span>
              <input class="w-full pl-10 pr-4 py-2.5 bg-transparent text-on-surface font-body-sm text-body-sm placeholder:text-outline outline-none" id="inputSearchInventory" placeholder="Cari bahan di kulkas (misal: tomat, ayam, susu)..." type="text"/>
            </div>

            <!-- Category Filter Pills -->
            <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <button class="category-chip px-3 py-1 rounded-full text-xs font-bold transition-all bg-primary text-on-primary shadow-xs" data-cat="all">
                Semua (${inventoryList.length})
              </button>
              <button class="category-chip px-3 py-1 rounded-full text-xs font-semibold transition-all bg-surface-container-lowest text-on-surface hover:bg-surface-container shadow-xs" data-cat="Sayur & Buah">
                🥦 Sayur & Buah
              </button>
              <button class="category-chip px-3 py-1 rounded-full text-xs font-semibold transition-all bg-surface-container-lowest text-on-surface hover:bg-surface-container shadow-xs" data-cat="Protein Segar">
                🍗 Protein & Daging
              </button>
              <button class="category-chip px-3 py-1 rounded-full text-xs font-semibold transition-all bg-surface-container-lowest text-on-surface hover:bg-surface-container shadow-xs" data-cat="Dairy & Olahan">
                🥛 Dairy & Olahan
              </button>
              <button class="category-chip px-3 py-1 rounded-full text-xs font-semibold transition-all bg-surface-container-lowest text-on-surface hover:bg-surface-container shadow-xs" data-cat="Bahan Basah">
                🍅 Bahan Basah
              </button>
            </div>
          </div>

          <!-- Inventory Items List -->
          <div class="flex flex-col gap-2.5" id="pantryItemsContainer">
            ${inventoryList.length === 0 ? `
              <div class="p-8 text-center bg-surface-container-lowest rounded-3xl flex flex-col items-center gap-3 shadow-xs">
                <div class="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center text-primary shadow-xs">
                  <span class="material-symbols-outlined text-[36px]">kitchen</span>
                </div>
                <div class="flex flex-col gap-1">
                  <h3 class="font-headline-sm text-headline-sm font-bold text-on-surface">Kulkas Anda Masih Kosong! ✨</h3>
                  <p class="font-body-sm text-body-sm text-secondary max-w-xs leading-relaxed">
                    Belum ada bahan makanan yang dicatat. Yuk masukkan belanjaan dapurmu atau pindai struk belanjaan untuk deteksi otomatis.
                  </p>
                </div>
                <div class="flex flex-col sm:flex-row items-center gap-2 mt-2 w-full max-w-xs">
                  <button class="w-full px-4 py-3 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all" id="btnEmptyAdd">
                    <span class="material-symbols-outlined text-[18px]">add</span>
                    <span>+ Catat Bahan Manual</span>
                  </button>
                  <button class="w-full px-4 py-3 rounded-xl bg-secondary-container text-primary font-label-md text-label-md font-bold flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all" id="btnEmptyScan">
                    <span class="material-symbols-outlined text-[18px]">document_scanner</span>
                    <span>📷 Pindai Struk Belanja</span>
                  </button>
                </div>
              </div>
            ` : inventoryList.map(item => {
              const isHigh = (item.risk || 0) >= 75;
              const isMed = (item.risk || 0) >= 50 && (item.risk || 0) < 75;
              const badgeBg = isHigh ? 'bg-error text-on-error' : isMed ? 'bg-tertiary text-on-tertiary' : 'bg-primary text-on-primary';
              const textClr = isHigh ? 'text-error' : isMed ? 'text-tertiary' : 'text-primary';
              const iconName = isHigh ? 'timer' : isMed ? 'warning' : 'schedule';
              const matchRecipe = item.name.includes('Tomat') ? 'Sambal Tomat Terasi & Ayam Suwir' :
                                  item.name.includes('Ayam') ? 'Semur Ayam Tomat Manis Gurih' :
                                  item.name.includes('Bayam') ? 'Tumis Bayam Bawang Putih' : 'Sup Creamy Dapur Segar';

              return `
                <div class="pantry-card w-full bg-surface-container-lowest rounded-2xl p-3 flex flex-col gap-2.5 shadow-sm transition-all hover:shadow-md" data-category="${item.category || ''}" data-name="${item.name.toLowerCase()}">
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex items-center gap-3 min-w-0">
                      <div class="w-16 h-16 rounded-xl overflow-hidden bg-surface-container-high shrink-0 relative">
                        <img class="w-full h-full object-cover" alt="${item.name}" src="${item.img || ''}"/>
                      </div>
                      <div class="flex flex-col min-w-0">
                        <div class="flex items-center gap-1.5 flex-wrap">
                          <span class="font-headline-sm text-headline-sm font-bold text-on-surface truncate">${item.name}</span>
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-surface-container text-secondary">${item.category || 'Bahan'}</span>
                        </div>
                        <span class="font-body-sm text-body-sm text-on-surface-variant font-medium mt-0.5">
                          ${item.weight} ${item.unit} • ${item.location}
                        </span>
                        <div class="flex items-center gap-1 mt-1 ${textClr}">
                          <span class="material-symbols-outlined text-[15px]">${iconName}</span>
                          <span class="font-label-sm text-label-sm font-bold">
                            ${item.expiryDays <= 1 ? 'Besok Kedaluwarsa' : `${item.expiryDays} hari lagi (${item.expiryDate || 'Mendesak'})`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col items-end gap-1 shrink-0">
                      <div class="px-2 py-1 rounded-lg ${badgeBg} font-label-sm text-label-sm font-bold shadow-xs flex items-center gap-1" title="Tingkat Risiko Food Waste">
                        <span>Risk</span>
                        <span class="text-sm font-extrabold">${item.risk}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Quick Card Actions Bar -->
                  <div class="flex items-center justify-between pt-2 border-t border-surface-container-high text-xs">
                    <div class="flex items-center gap-1">
                      <button class="px-3 py-1.5 rounded-lg bg-secondary-container text-primary font-bold flex items-center gap-1 hover:bg-primary hover:text-on-primary transition-colors btn-cook-urgent" data-recipe="${matchRecipe}" data-name="${item.name}">
                        <span class="material-symbols-outlined text-[15px]">skillet</span>
                        <span>Olah Resep</span>
                      </button>
                      <button class="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface font-semibold flex items-center gap-1 hover:bg-secondary-container transition-colors btn-donate-quick" data-item="${item.name}" data-id="${item.id}">
                        <span class="material-symbols-outlined text-[15px]">volunteer_activism</span>
                        <span>Donasikan</span>
                      </button>
                    </div>
                    <button class="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-bold hover:bg-primary-container hover:text-on-primary transition-colors flex items-center gap-1 btn-consume-quick" data-id="${item.id}">
                      <span class="material-symbols-outlined text-[15px]">check_circle</span>
                      <span>Tandai Habis</span>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- ============================================== -->
        <!-- VIEW 2: PROMO TRAP DETECTOR & CALCULATOR -->
        <!-- ============================================== -->
        <div id="sectionPromo" class="hidden flex flex-col">
          <!-- Educational Insight Banner -->
          <div class="w-full bg-secondary-container/40 rounded-2xl p-space-md mb-space-md flex items-start gap-3 shadow-sm">
            <div class="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm">
              <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">loyalty</span>
            </div>
            <div class="flex flex-col flex-1 min-w-0">
              <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">Kalkulator Anti-Promo Trap</h2>
              <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-snug">
                Diskon besar supermarket sering memicu pembelian berlebih. BEKAL memvalidasi apakah promo tersebut hemat nyata atau boncos.
              </p>
            </div>
          </div>

          <!-- Promo Preset Selector -->
          <div class="mb-space-md bg-surface-container-lowest rounded-2xl p-3 shadow-sm">
            <label class="font-label-sm text-label-sm font-bold text-secondary uppercase tracking-wider block mb-2">
              Pilih Contoh Promo Supermarket:
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button class="promo-preset-btn p-2.5 rounded-xl border-2 border-primary bg-secondary-container/30 text-left flex flex-col font-bold text-on-surface text-xs" data-name="Tomat Merah Segar" data-weight="3.0" data-promo="27000" data-normal="45000" data-cat="Bahan Basah" data-img="https://lh3.googleusercontent.com/aida-public/AB6AXuCcM6LyXlAPH_K_ktaLenZLWcsi9bwsro6xsJ8ao8l5OB3qb2sJmqzz-5VpiiVJw8iF3-RFnmMPgymmMeONaANA7uywBvoBzUN_N3Z5LCL0ksCqT8tREFDH5g3C7tBNUOm3mAg562YiLL0wRf5GAhMrcYqF_kqsqzT9MlRtu8RknQBvgLa8rGZARvMcEsryXiJX-Ux_HxBLJoa8cfUm0Htku9EOYMKWXXGWio_nlLGQq-D84rWw_JRf">
                <span class="text-primary font-extrabold">🍅 Tomat Segar (-40%)</span>
                <span class="text-secondary font-medium">Beli 3 kg Rp27rb</span>
              </button>
              <button class="promo-preset-btn p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low text-left flex flex-col font-semibold text-on-surface text-xs" data-name="Daging Ayam Fillet" data-weight="2.0" data-promo="65000" data-normal="90000" data-cat="Protein Segar" data-img="https://lh3.googleusercontent.com/aida-public/AB6AXuAz-DacYyzA8P8T3Iyvann3ISnUne9sWd-8_5eQbCICYs40p7dx82E1vpo2TgNdIXRd7ICVyMHBvBl5_e0kr1OC1X8G5JBN50CyvtZaLsWMNcN_jL5yoz3a7VOhnvLDy4jaC2gUPgHEBwjgE2q-sCvboeSBZMpP1wotKUOrFZeQhyYThL6fCDawB8TiWwJk7MMFa7bwTrRcXgjKemKoededA0_trqT_L0QU4qNw1eOcSlZdw4tOEBN5">
                <span class="text-on-surface font-bold">🍗 Daging Ayam (Bundling)</span>
                <span class="text-secondary font-medium">Beli 2 kg Rp65rb</span>
              </button>
            </div>
          </div>

          <!-- Product & Purchase Plan Card -->
          <div class="w-full bg-surface-container-lowest rounded-2xl p-space-md shadow-sm mb-space-md flex flex-col gap-3.5">
            <div class="flex items-start gap-3">
              <div class="relative w-16 h-16 rounded-xl overflow-hidden bg-surface-container shrink-0 shadow-xs">
                <img id="promoImgDisplay" class="w-full h-full object-cover" alt="Tomat Merah Segar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcM6LyXlAPH_K_ktaLenZLWcsi9bwsro6xsJ8ao8l5OB3qb2sJmqzz-5VpiiVJw8iF3-RFnmMPgymmMeONaANA7uywBvoBzUN_N3Z5LCL0ksCqT8tREFDH5g3C7tBNUOm3mAg562YiLL0wRf5GAhMrcYqF_kqsqzT9MlRtu8RknQBvgLa8rGZARvMcEsryXiJX-Ux_HxBLJoa8cfUm0Htku9EOYMKWXXGWio_nlLGQq-D84rWw_JRf"/>
                <span class="absolute bottom-1 right-1 bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm px-1 rounded-sm leading-tight font-bold">
                  -40%
                </span>
              </div>
              <div class="flex flex-col flex-1 min-w-0">
                <div class="flex items-center justify-between gap-1">
                  <span class="font-headline-sm text-headline-sm text-on-surface truncate font-bold" id="promoNameDisplay">Tomat Merah Segar</span>
                  <span class="font-label-sm text-label-sm bg-secondary-container text-primary font-bold px-2 py-0.5 rounded-full shrink-0" id="promoCatDisplay">Bahan Basah</span>
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
                <span>Rata-rata konsumsi rumah tangga Anda:</span>
              </div>
              <span class="font-label-md text-label-md font-bold text-on-surface">0,6 kg / minggu</span>
            </div>
          </div>

          <!-- AI Smart Recommendation Card -->
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
                <span class="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold" id="idealWeightDisplay">1,2 kg</span>
              </div>
              <div class="text-right">
                <span class="font-body-sm text-body-sm text-on-surface-variant block leading-tight font-medium">Biaya yang dikeluarkan:</span>
                <span class="font-headline-sm text-headline-sm text-on-surface font-bold" id="idealCostDisplay">Rp10.800</span>
              </div>
            </div>
            <p class="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
              Membeli <strong class="text-primary font-bold">1,2 kg</strong> cukup untuk 2 minggu konsumsi. Anda tetap hemat dan tidak membuang bahan makanan yang layu.
            </p>
          </div>

          <!-- Nudge Action Stack -->
          <div class="flex flex-col gap-2.5 w-full">
            <button class="w-full bg-primary-container text-on-primary hover:bg-primary font-label-lg text-label-lg py-3.5 px-space-md rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 font-bold" id="btnApplyIdeal" type="button">
              <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
              <span>Sesuaikan ke 1,2 kg (Paling Hemat)</span>
            </button>
            <button class="w-full bg-surface-container-lowest text-primary hover:bg-secondary-container/40 font-label-md text-label-md py-3 px-space-md rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 font-bold shadow-xs" id="btnKeepOriginal" type="button">
              <span class="material-symbols-outlined text-[18px]">skillet</span>
              <span>Tetap Beli (Lihat Ide Resep Awetan)</span>
            </button>
            <button class="w-full bg-surface-container-high text-on-surface hover:bg-secondary-container font-label-md text-label-md py-3 px-space-md rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 font-bold" id="btnSaveToPantryDirect" type="button">
              <span class="material-symbols-outlined text-[18px]">kitchen</span>
              <span>Simpan Pembelian ke Kulkas</span>
            </button>
          </div>

          <!-- Accordion Tips Awetan -->
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

        <!-- ============================================== -->
        <!-- VIEW 3: PINDAI STRUK OCR (SIMULATOR) -->
        <!-- ============================================== -->
        <div id="sectionPindai" class="hidden flex flex-col gap-space-md">
          <div class="w-full bg-primary-fixed/20 border border-primary/20 rounded-2xl p-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary text-[32px]">document_scanner</span>
              <div>
                <h3 class="font-headline-sm text-headline-sm font-bold text-on-surface">Smart AI Receipt Scanner</h3>
                <p class="text-xs text-secondary">Ekstraksi otomatis nama bahan, berat, dan harga dari struk belanja</p>
              </div>
            </div>
          </div>

          <!-- Viewfinder Preview with Automatic Camera Stream -->
          <div class="relative w-full h-80 rounded-3xl overflow-hidden bg-black shadow-lg flex items-center justify-center">
            <video id="inlineLiveCameraFeed" autoplay playsinline muted class="w-full h-full object-cover hidden"></video>
            <img id="inlineScannerImg" class="w-full h-full object-cover opacity-85" alt="Receipt sample" src="https://images.unsplash.com/photo-1554415707-9e49017aed81?w=600&auto=format&fit=crop&q=80"/>
            
            <!-- Camera Status Pill -->
            <div id="inlineCameraStatusPill" class="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold z-10">
              <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span id="inlineCameraStatusText">Kamera Sensor Siap</span>
            </div>

            <!-- Viewfinder Frame -->
            <div class="absolute inset-4 border-2 border-dashed border-primary rounded-2xl pointer-events-none"></div>
            <!-- Laser Animation -->
            <div class="absolute inset-x-4 h-1 bg-gradient-to-r from-transparent via-primary-fixed to-transparent shadow-[0_0_15px_#80d9a1] animate-scan-laser"></div>
            
            <div class="absolute bottom-4 inset-x-4 flex justify-center gap-2">
              <button class="px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold shadow-lg flex items-center gap-2 active:scale-95 transition-transform" id="btnLaunchCameraModal">
                <span class="material-symbols-outlined text-[20px]">photo_camera</span>
                <span>Buka Kamera Penuh & OCR</span>
              </button>
            </div>
          </div>

          <div class="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <span class="font-headline-sm text-headline-sm font-bold text-on-surface">Hasil Deteksi Terakhir</span>
              <span class="text-xs px-2 py-0.5 rounded-full bg-secondary-container text-primary font-bold">Pasar Modern</span>
            </div>
            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between p-2.5 bg-surface-container-low rounded-xl">
                <span class="font-medium text-sm">🍅 Tomat Segar (3,0 kg)</span>
                <span class="font-bold text-error">Rp27.000</span>
              </div>
              <div class="flex items-center justify-between p-2.5 bg-surface-container-low rounded-xl">
                <span class="font-medium text-sm">🍗 Daging Ayam Fillet (500 g)</span>
                <span class="font-bold text-secondary">Rp32.000</span>
              </div>
              <div class="flex items-center justify-between p-2.5 bg-surface-container-low rounded-xl">
                <span class="font-medium text-sm">🥬 Bayam Hijau (2 Ikat)</span>
                <span class="font-bold text-secondary">Rp8.000</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}
