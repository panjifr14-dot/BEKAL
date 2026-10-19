// Interactive Modals and Drawers for BEKAL
import { state, completeRecipe, donateItems, notifyStateChange } from '../state.js';

export function renderModals() {
  return `
    <!-- Notification Drawer -->
    <div id="notificationDrawer" class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity opacity-0 pointer-events-none flex justify-end">
      <div class="w-full max-w-sm bg-surface h-full shadow-2xl flex flex-col p-4 transform translate-x-full transition-transform duration-300">
        <div class="flex items-center justify-between pb-3 border-b border-surface-container-high">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[24px]">notifications</span>
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Pemberitahuan Dapur</h3>
          </div>
          <button id="closeNotifBtn" class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:text-on-surface">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto py-3 flex flex-col gap-2.5">
          ${state.notifications.map(n => `
            <div class="p-3 rounded-xl ${n.unread ? 'bg-surface-container-lowest shadow-sm border-l-4 border-primary' : 'bg-surface-container-low opacity-75'} flex items-start gap-3">
              <span class="material-symbols-outlined ${n.color} text-[22px] shrink-0 mt-0.5">${n.icon}</span>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <h4 class="font-label-md text-label-md font-bold text-on-surface">${n.title}</h4>
                  <span class="text-[10px] text-secondary font-medium">${n.time}</span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">${n.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="pt-3 border-t border-surface-container-high">
          <button id="markReadBtn" class="w-full py-2.5 rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-secondary-container transition-colors">
            Tandai Semua Sudah Dibaca
          </button>
        </div>
      </div>
    </div>

    <!-- Scan Receipt / OCR Camera Simulator Modal -->
    <div id="scanCameraModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-opacity opacity-0 pointer-events-none flex items-center justify-center p-4">
      <div class="w-full max-w-sm bg-surface-container-lowest rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        <div class="p-4 bg-primary text-on-primary flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[22px]">document_scanner</span>
            <span class="font-headline-sm text-headline-sm font-bold">Smart OCR Grocery Scanner</span>
          </div>
          <button id="closeScanModalBtn" class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
        
        <div class="relative w-full h-72 bg-black overflow-hidden flex items-center justify-center">
          <img id="scannerImg" class="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcM6LyXlAPH_K_ktaLenZLWcsi9bwsro6xsJ8ao8l5OB3qb2sJmqzz-5VpiiVJw8iF3-RFnmMPgymmMeONaANA7uywBvoBzUN_N3Z5LCL0ksCqT8tREFDH5g3C7tBNUOm3mAg562YiLL0wRf5GAhMrcYqF_kqsqzT9MlRtu8RknQBvgLa8rGZARvMcEsryXiJX-Ux_HxBLJoa8cfUm0Htku9EOYMKWXXGWio_nlLGQq-D84rWw_JRf"/>
          <!-- Viewfinder overlay -->
          <div class="absolute inset-4 border-2 border-dashed border-primary-fixed rounded-2xl pointer-events-none"></div>
          <!-- Animated Laser -->
          <div id="scanLaser" class="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-primary-fixed to-transparent shadow-[0_0_12px_#80d9a1] animate-scan-laser"></div>
          
          <div id="scanProcessingOverlay" class="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white gap-2 transition-opacity opacity-0 pointer-events-none">
            <span class="material-symbols-outlined text-[36px] animate-spin text-primary-fixed">progress_activity</span>
            <span class="font-label-md text-label-md font-bold">Membaca Struk & Bahan...</span>
          </div>
        </div>

        <div class="p-4 flex flex-col gap-3">
          <div class="bg-surface-container-low rounded-xl p-3" id="scanResultBox">
            <div class="flex items-center justify-between text-label-sm font-label-sm text-secondary mb-1">
              <span>Hasil Deteksi Bahan:</span>
              <span class="text-primary font-bold">3 Item Ditemukan</span>
            </div>
            <div class="flex flex-col gap-1.5 font-body-sm text-body-sm">
              <div class="flex items-center justify-between bg-surface-container-lowest p-2 rounded-lg">
                <span class="font-medium text-on-surface">🍅 Tomat Segar (3.0 kg)</span>
                <span class="text-error font-bold">Diskon -40%</span>
              </div>
              <div class="flex items-center justify-between bg-surface-container-lowest p-2 rounded-lg">
                <span class="font-medium text-on-surface">🍗 Ayam Fillet (500 g)</span>
                <span class="text-secondary font-medium">Rp34.000</span>
              </div>
              <div class="flex items-center justify-between bg-surface-container-lowest p-2 rounded-lg">
                <span class="font-medium text-on-surface">🥦 Brokoli Hijau (1 kg)</span>
                <span class="text-primary font-medium">Rp18.500</span>
              </div>
            </div>
          </div>

          <div class="flex gap-2">
            <button id="btnTriggerScan" class="flex-1 py-3 rounded-xl bg-secondary-container text-primary font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform">
              <span class="material-symbols-outlined text-[18px]">camera</span>
              <span>Pindai Ulang</span>
            </button>
            <button id="btnSaveScanned" class="flex-1 py-3 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform">
              <span class="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              <span>Simpan ke Kulkas</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Cooking Assistant Modal -->
    <div id="cookingModal" class="fixed inset-0 z-50 bg-black/75 backdrop-blur-md transition-opacity opacity-0 pointer-events-none flex items-center justify-center p-4">
      <div class="w-full max-w-sm bg-surface rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <!-- Top Banner -->
        <div class="relative h-36 bg-surface-container shrink-0">
          <img id="cookModalImg" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsRIUz0H3lurmScfZVaiQYbwib_CDcDtWtTPmRzqMaN_6xihwhOa1_R77okFuXOsfNfEjS5_kuNBR1oH0YdOU5abmZkHUPA4OKgDablfDNttzUHElNxrN1MvZpSWhaqXi3y8fZiUWJYcMgVe1gsteyd67UPv-atIhcEsd_hPcmyCie1KdpzCmIzNo1R0Ng_JUkYy5_FVmv79bZcSbkdmbWYU1e9ftb1cQKUoBpwjg9H5SAcNIb3pZq"/>
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <button id="closeCookingModalBtn" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/60">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
          <div class="absolute bottom-3 left-3 right-3 text-white">
            <span class="px-2 py-0.5 rounded-full bg-primary text-[10px] font-bold uppercase tracking-wider">Rescue Chef Guide</span>
            <h3 id="cookModalTitle" class="font-headline-sm text-headline-sm font-bold mt-1 text-white truncate">Sambal Tomat & Ayam Suwir</h3>
          </div>
        </div>

        <!-- Scrollable Steps -->
        <div class="p-4 overflow-y-auto flex-1 flex flex-col gap-3">
          <!-- Timer Card -->
          <div class="bg-surface-container-low rounded-2xl p-3 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
                <span class="material-symbols-outlined text-[20px]">timer</span>
              </div>
              <div class="flex flex-col">
                <span class="font-label-sm text-label-sm text-secondary">Timer Memasak</span>
                <span id="cookTimerDisplay" class="font-headline-md text-headline-md font-bold text-primary">15:00</span>
              </div>
            </div>
            <button id="btnCookTimerToggle" class="px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold flex items-center gap-1 active:scale-95">
              <span class="material-symbols-outlined text-[16px]" id="timerPlayIcon">play_arrow</span>
              <span id="timerPlayText">Mulai</span>
            </button>
          </div>

          <!-- Ingredients Checklist -->
          <div class="flex flex-col gap-1.5">
            <span class="font-label-sm text-label-sm font-bold text-secondary uppercase tracking-wider">Bahan Siap Pakai</span>
            <div class="flex flex-col gap-1 text-body-sm">
              <label class="flex items-center gap-2 p-2 rounded-lg bg-surface-container-lowest shadow-xs cursor-pointer">
                <input type="checkbox" checked class="accent-primary w-4 h-4 rounded"/>
                <span class="text-on-surface font-medium">1.0 kg Tomat Segar (Potong dadu)</span>
              </label>
              <label class="flex items-center gap-2 p-2 rounded-lg bg-surface-container-lowest shadow-xs cursor-pointer">
                <input type="checkbox" checked class="accent-primary w-4 h-4 rounded"/>
                <span class="text-on-surface font-medium">250g Daging Ayam Fillet (Rebus & suwir)</span>
              </label>
              <label class="flex items-center gap-2 p-2 rounded-lg bg-surface-container-lowest shadow-xs cursor-pointer">
                <input type="checkbox" checked class="accent-primary w-4 h-4 rounded"/>
                <span class="text-on-surface font-medium">3 siung Bawang Merah & Putih + Cabai</span>
              </label>
            </div>
          </div>

          <!-- Step Guide -->
          <div class="flex flex-col gap-2">
            <span class="font-label-sm text-label-sm font-bold text-secondary uppercase tracking-wider">Tahapan Memasak</span>
            <div class="flex gap-2.5 items-start">
              <div class="w-6 h-6 rounded-full bg-secondary-container text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</div>
              <p class="font-body-sm text-body-sm text-on-surface">Tumis bumbu halus dan tomat hingga harum dan layu merata.</p>
            </div>
            <div class="flex gap-2.5 items-start">
              <div class="w-6 h-6 rounded-full bg-secondary-container text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</div>
              <p class="font-body-sm text-body-sm text-on-surface">Masukkan suwiran ayam, tambahkan kecap manis, garam, dan kaldu secukupnya.</p>
            </div>
            <div class="flex gap-2.5 items-start">
              <div class="w-6 h-6 rounded-full bg-secondary-container text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</div>
              <p class="font-body-sm text-body-sm text-on-surface">Masak hingga kuah meresap dan bumbu terkaramelisasi lezat. Sajikan hangat!</p>
            </div>
          </div>
        </div>

        <!-- Finish CTA -->
        <div class="p-4 bg-surface-container-lowest border-t border-surface-container-high">
          <button id="btnFinishCooking" class="w-full py-3.5 rounded-xl bg-primary text-on-primary font-headline-sm text-headline-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform">
            <span class="material-symbols-outlined text-[20px]">check_circle</span>
            <span>Selesai Masak & Update Stok (+50 XP)</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Courier Tracking & Dispatch Simulation Modal -->
    <div id="dispatchModal" class="fixed inset-0 z-50 bg-black/75 backdrop-blur-md transition-opacity opacity-0 pointer-events-none flex items-center justify-center p-4">
      <div class="w-full max-w-sm bg-surface rounded-3xl overflow-hidden shadow-2xl flex flex-col p-5 gap-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
              <span class="material-symbols-outlined text-[22px]">two_wheeler</span>
            </div>
            <div>
              <h3 class="font-headline-sm text-headline-sm font-bold text-on-surface">Kurir Mitra Menuju Dapurmu</h3>
              <p class="font-body-sm text-body-sm text-secondary">Warung Rescue Network</p>
            </div>
          </div>
          <button id="closeDispatchBtn" class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div class="bg-secondary-container/40 rounded-2xl p-4 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <span class="font-label-md text-label-md font-semibold text-primary">Pak Joko (Kurir Relawan)</span>
            <span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary text-on-primary font-bold">12 Menit Lagi</span>
          </div>
          <div class="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
            <div class="bg-primary h-full w-2/3 rounded-full animate-pulse"></div>
          </div>
          <p class="font-body-sm text-body-sm text-on-surface-variant">
            Menjemput <strong>Tomat Segar (2.0 kg)</strong> dan <strong>Daging Ayam (0.5 kg)</strong> untuk disalurkan ke Warung Makan Bu Sari.
          </p>
        </div>

        <button id="btnConfirmDispatchDone" class="w-full py-3 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2">
          <span class="material-symbols-outlined text-[20px]">thumb_up</span>
          <span>Mantap, Bahan Sudah Siap!</span>
        </button>
      </div>
    </div>

    <!-- Instagram Story Share Preview Modal -->
    <div id="storyShareModal" class="fixed inset-0 z-50 bg-black/85 backdrop-blur-md transition-opacity opacity-0 pointer-events-none flex items-center justify-center p-4">
      <div class="w-full max-w-xs bg-surface rounded-3xl overflow-hidden shadow-2xl flex flex-col p-4 gap-3">
        <div class="flex items-center justify-between pb-1">
          <span class="font-headline-sm text-headline-sm font-bold text-on-surface">Bagikan Dampakmu ✨</span>
          <button id="closeStoryModalBtn" class="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-secondary">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <!-- Story Visual Preview Card -->
        <div class="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-gradient-to-br from-primary via-primary-container to-surface-container-lowest p-5 text-white flex flex-col justify-between shadow-lg">
          <div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                <span class="material-symbols-outlined text-white text-[18px]" style="font-variation-settings: 'FILL' 1;">eco</span>
              </div>
              <span class="font-headline-sm text-headline-sm font-bold tracking-tight">BEKAL</span>
            </div>
            <p class="text-xs text-white/80 mt-1">Dapur Cerdas Bebas Food Waste</p>
          </div>

          <div class="flex flex-col gap-2 my-auto">
            <span class="text-xs uppercase tracking-wider text-primary-fixed font-bold">Pencapaian Andi Pratama</span>
            <div class="text-3xl font-extrabold leading-none tracking-tight">18,4 kg</div>
            <p class="text-xs text-white/90">Bahan makanan terselamatkan & 46 kg CO₂e emisi dicegah tahun ini!</p>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold w-fit mt-1">
              <span>🛡️ Anti-Promo Trap Champion</span>
            </div>
          </div>

          <div class="pt-2 border-t border-white/20 flex items-center justify-between text-[11px] text-white/80">
            <span>#BijakKelolaBahan</span>
            <span>bekal.id</span>
          </div>
        </div>

        <button id="btnDownloadStory" class="w-full py-3 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-2 active:scale-95 shadow-md">
          <span class="material-symbols-outlined text-[18px]">share</span>
          <span>Bagikan ke Instagram Story</span>
        </button>
      </div>
    </div>

    <!-- Biometric Auth Simulation Modal -->
    <div id="biometricModal" class="fixed inset-0 z-50 bg-black/75 backdrop-blur-md transition-opacity opacity-0 pointer-events-none flex items-center justify-center p-4">
      <div class="w-full max-w-xs bg-surface-container-lowest rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center gap-3">
        <div class="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center text-primary relative">
          <span class="material-symbols-outlined text-[36px] animate-pulse">fingerprint</span>
        </div>
        <h3 class="font-headline-sm text-headline-sm font-bold text-on-surface">Verifikasi Biometrik</h3>
        <p class="font-body-sm text-body-sm text-secondary">Sentuh sensor sidik jari atau hadapkan wajahmu untuk masuk ke BEKAL.</p>
        <button id="btnCancelBio" class="mt-2 text-secondary font-label-md text-label-md hover:text-on-surface">Batal</button>
      </div>
    </div>

    <!-- Floating Global Toast -->
    <div id="toastNotification" class="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 pointer-events-none opacity-0 -translate-y-2 transition-all duration-300">
      <span class="material-symbols-outlined text-primary-fixed text-[18px]" id="toastIcon">check_circle</span>
      <span class="font-label-md text-label-md font-medium" id="toastMessage">Pesan pemberitahuan</span>
    </div>
  `;
}
