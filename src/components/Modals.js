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
          <video id="modalLiveCameraVideo" autoplay playsinline muted class="w-full h-full object-cover hidden"></video>
          <img id="scannerImg" class="w-full h-full object-cover opacity-85" src="https://images.unsplash.com/photo-1554415707-9e49017aed81?w=600&auto=format&fit=crop&q=80"/>
          
          <!-- Live Camera Indicator Pill -->
          <div id="modalCameraStatusPill" class="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold z-10">
            <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span id="modalCameraStatusText">Kamera Sensor Aktif</span>
          </div>

          <!-- Viewfinder overlay -->
          <div class="absolute inset-4 border-2 border-dashed border-primary-fixed rounded-2xl pointer-events-none"></div>
          <!-- Animated Laser -->
          <div id="scanLaser" class="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-primary-fixed to-transparent shadow-[0_0_12px_#80d9a1] animate-scan-laser"></div>
          
          <div id="scanProcessingOverlay" class="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white gap-2 transition-opacity opacity-0 pointer-events-none">
            <span class="material-symbols-outlined text-[36px] animate-spin text-primary-fixed">progress_activity</span>
            <span class="font-label-md text-label-md font-bold">Membaca Struk & Ekstraksi Bahan...</span>
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
            <div class="flex flex-col gap-1 text-body-sm" id="cookModalIngredientsContainer">
              <label class="flex items-center gap-2 p-2 rounded-lg bg-surface-container-lowest shadow-xs cursor-pointer">
                <input type="checkbox" checked class="accent-primary w-4 h-4 rounded"/>
                <span class="text-on-surface font-medium">Bahan Dapur Segar</span>
              </label>
            </div>
          </div>

          <!-- Step Guide -->
          <div class="flex flex-col gap-2">
            <span class="font-label-sm text-label-sm font-bold text-secondary uppercase tracking-wider">Tahapan Memasak</span>
            <div class="flex flex-col gap-2" id="cookModalStepsContainer">
              <div class="flex gap-2.5 items-start">
                <div class="w-6 h-6 rounded-full bg-secondary-container text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</div>
                <p class="font-body-sm text-body-sm text-on-surface">Tumis bumbu halus dan bahan hingga harum merata.</p>
              </div>
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
            <span class="text-xs uppercase tracking-wider text-primary-fixed font-bold">Pencapaian ${state.user.name}</span>
            <div class="text-3xl font-extrabold leading-none tracking-tight">${state.user.foodSavedKg.toString().replace('.', ',')} kg</div>
            <p class="text-xs text-white/90">Bahan makanan terselamatkan & ${state.user.co2PreventedKg} kg CO₂e emisi dicegah tahun ini!</p>
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

    <!-- Add Pantry Item Modal -->
    <div id="addPantryModal" class="fixed inset-0 z-50 bg-black/75 backdrop-blur-md transition-opacity opacity-0 pointer-events-none flex items-center justify-center p-4">
      <div class="w-full max-w-sm bg-surface-container-lowest rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        <div class="p-4 bg-primary text-on-primary flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[22px]">kitchen</span>
            <span class="font-headline-sm text-headline-sm font-bold">Tambah Bahan ke Kulkas</span>
          </div>
          <button id="closeAddPantryModalBtn" class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
        
        <form id="formAddPantry" class="p-4 flex flex-col gap-3" onsubmit="event.preventDefault();">
          <div class="flex flex-col gap-1">
            <label class="font-label-sm text-label-sm font-semibold text-on-surface" for="addPantryName">Nama Bahan Makanan</label>
            <input class="w-full px-3 py-2.5 rounded-xl bg-surface-container text-on-surface text-body-sm outline-none focus:ring-2 focus:ring-primary/40" id="addPantryName" placeholder="Contoh: Wortel Segar / Tahu Sutra" required type="text"/>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div class="flex flex-col gap-1">
              <label class="font-label-sm text-label-sm font-semibold text-on-surface" for="addPantryCategory">Kategori</label>
              <select class="w-full px-3 py-2.5 rounded-xl bg-surface-container text-on-surface text-body-sm outline-none" id="addPantryCategory">
                <option value="Sayur & Buah">🥦 Sayur & Buah</option>
                <option value="Protein Segar">🍗 Protein Segar</option>
                <option value="Dairy & Olahan">🥛 Dairy & Olahan</option>
                <option value="Bahan Basah">🍅 Bahan Basah</option>
              </select>
            </div>
            <div class="flex flex-col gap-1">
              <label class="font-label-sm text-label-sm font-semibold text-on-surface" for="addPantryLocation">Lokasi Simpan</label>
              <select class="w-full px-3 py-2.5 rounded-xl bg-surface-container text-on-surface text-body-sm outline-none" id="addPantryLocation">
                <option value="Chiller Sayur">Chiller Sayur</option>
                <option value="Kulkas Utama">Kulkas Utama</option>
                <option value="Pintu Kulkas">Pintu Kulkas</option>
                <option value="Crisper Box">Crisper Box</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div class="flex flex-col gap-1">
              <label class="font-label-sm text-label-sm font-semibold text-on-surface" for="addPantryWeight">Jumlah / Berat</label>
              <input class="w-full px-3 py-2.5 rounded-xl bg-surface-container text-on-surface text-body-sm outline-none" id="addPantryWeight" placeholder="1.0" type="number" step="0.1" required value="1.0"/>
            </div>
            <div class="flex flex-col gap-1">
              <label class="font-label-sm text-label-sm font-semibold text-on-surface" for="addPantryUnit">Satuan</label>
              <select class="w-full px-3 py-2.5 rounded-xl bg-surface-container text-on-surface text-body-sm outline-none" id="addPantryUnit">
                <option value="kg">kg</option>
                <option value="g">gram</option>
                <option value="Ikat">Ikat</option>
                <option value="L">Liter</option>
                <option value="Butir">Butir</option>
              </select>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <label class="font-label-sm text-label-sm font-semibold text-on-surface" for="addPantryExpiry">Estimasi Masa Simpan (Hari)</label>
            <input class="w-full px-3 py-2.5 rounded-xl bg-surface-container text-on-surface text-body-sm outline-none" id="addPantryExpiry" type="number" min="1" max="30" value="4"/>
          </div>

          <button id="btnSubmitAddPantry" type="submit" class="w-full mt-2 py-3 rounded-xl bg-primary text-on-primary font-headline-sm text-headline-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all">
            <span class="material-symbols-outlined text-[20px]">add_task</span>
            <span>Simpan ke Smart Pantry</span>
          </button>
        </form>
      </div>
    </div>

    <!-- Forgot Password Modal -->
    <div id="forgotPasswordModal" class="fixed inset-0 z-50 bg-black/75 backdrop-blur-md transition-opacity opacity-0 pointer-events-none flex items-center justify-center p-4">
      <div class="w-full max-w-xs bg-surface-container-lowest rounded-3xl p-5 shadow-2xl flex flex-col gap-3">
        <div class="flex items-center justify-between pb-1">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[22px]">lock_reset</span>
            <h3 class="font-headline-sm text-headline-sm font-bold text-on-surface">Lupa Kata Sandi?</h3>
          </div>
          <button id="closeForgotModalBtn" class="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-secondary">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
        <p class="text-xs text-secondary leading-relaxed">
          Masukkan email akunmu. Kami akan mengirimkan tautan reset kata sandi dapur secara instan.
        </p>
        <div class="flex flex-col gap-1">
          <input id="forgotEmailInput" class="w-full px-3 py-2.5 rounded-xl bg-surface-container text-on-surface text-xs outline-none" placeholder="Masukkan email terdaftar" type="email"/>
        </div>
        <button id="btnSendResetLink" class="w-full py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all">
          <span class="material-symbols-outlined text-[16px]">send</span>
          <span>Kirim Tautan Pemulihan</span>
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

    <!-- Recipe Detail Modal -->
    <div id="recipeDetailModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-opacity opacity-0 pointer-events-none flex items-center justify-center p-4">
      <div class="w-full max-w-sm bg-surface-container-lowest rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <!-- Modal Header Image -->
        <div class="relative h-44 bg-surface-container shrink-0">
          <img id="detailModalImg" class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80"/>
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
          <button id="closeRecipeDetailModalBtn" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/60 active:scale-95 transition-transform">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
          <div class="absolute bottom-3 left-4 right-4 text-white">
            <div class="flex items-center gap-1.5 mb-1">
              <span class="px-2 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-bold uppercase tracking-wider" id="detailModalTag">Zero Waste Recipe</span>
              <span class="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold" id="detailModalScore">Score 85</span>
            </div>
            <h3 id="detailModalTitle" class="font-headline-sm text-headline-sm font-bold text-white truncate">Sambal Tomat Terasi & Ayam Suwir</h3>
          </div>
        </div>

        <!-- Modal Content Body -->
        <div class="p-4 overflow-y-auto flex-1 flex flex-col gap-3.5">
          <!-- Metas Strip -->
          <div class="grid grid-cols-3 gap-1.5 p-2.5 bg-surface-container-low rounded-2xl text-center">
            <div class="flex flex-col items-center">
              <span class="material-symbols-outlined text-tertiary text-[18px]">schedule</span>
              <span class="text-[10px] text-secondary font-medium">Waktu</span>
              <span class="font-label-md text-label-md font-bold text-on-surface" id="detailModalTime">20 mnt</span>
            </div>
            <div class="flex flex-col items-center border-x border-surface-container-high">
              <span class="material-symbols-outlined text-primary text-[18px]">group</span>
              <span class="text-[10px] text-secondary font-medium">Porsi</span>
              <span class="font-label-md text-label-md font-bold text-on-surface" id="detailModalPortions">3 Porsi</span>
            </div>
            <div class="flex flex-col items-center">
              <span class="material-symbols-outlined text-error text-[18px]">local_fire_department</span>
              <span class="text-[10px] text-secondary font-medium">Kalori</span>
              <span class="font-label-md text-label-md font-bold text-on-surface" id="detailModalCalories">285 kkal</span>
            </div>
          </div>

          <!-- Subtitle / Summary -->
          <p id="detailModalSubtitle" class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Pedas gurih kaya rempah, penyelamat tomat matang & stok ayam.
          </p>

          <!-- Ingredients List -->
          <div class="flex flex-col gap-1.5">
            <div class="flex items-center justify-between">
              <h4 class="font-label-md text-label-md font-bold text-on-surface flex items-center gap-1.5">
                <span class="material-symbols-outlined text-primary text-[16px]">kitchen</span>
                <span>Bahan & Takaran</span>
              </h4>
              <span class="text-[11px] text-primary font-bold" id="detailModalMatchInfo">Pantry Match</span>
            </div>
            <div class="flex flex-col gap-1.5" id="detailModalIngredientsContainer">
              <!-- Dynamically injected -->
            </div>
          </div>

          <!-- Steps List -->
          <div class="flex flex-col gap-1.5">
            <h4 class="font-label-md text-label-md font-bold text-on-surface flex items-center gap-1.5">
              <span class="material-symbols-outlined text-tertiary text-[16px]">skillet</span>
              <span>Instruksi Langkah Memasak</span>
            </h4>
            <div class="flex flex-col gap-2" id="detailModalStepsContainer">
              <!-- Dynamically injected -->
            </div>
          </div>

          <!-- Zero Waste Tip Card -->
          <div class="bg-primary/10 border border-primary/20 rounded-2xl p-3 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">eco</span>
            <div class="flex flex-col gap-0.5">
              <span class="font-label-sm text-label-sm font-bold text-primary">Trik Anti-Food-Waste BEKAL</span>
              <p id="detailModalZeroWasteTip" class="font-body-sm text-[11px] text-on-surface leading-relaxed">
                Kulit dan biji tomat jangan dibuang! Keduanya kaya akan antioksidan likopen dan pektin alami yang mengentalkan sambal.
              </p>
            </div>
          </div>
        </div>

        <!-- Modal Bottom Actions -->
        <div class="p-3 bg-surface-container-low border-t border-surface-container-high flex items-center gap-2">
          <button id="btnDetailBookmark" class="px-3.5 py-2.5 rounded-xl bg-surface-container text-on-surface hover:bg-secondary-container font-label-sm text-label-sm font-bold flex items-center gap-1 active:scale-95 transition-all">
            <span class="material-symbols-outlined text-[16px]">bookmark_border</span>
            <span>Simpan</span>
          </button>
          <button id="btnDetailToCook" class="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all">
            <span class="material-symbols-outlined text-[18px]">restaurant</span>
            <span>Mulai Masak Sekarang</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Floating Global Toast -->
    <div id="toastNotification" class="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 pointer-events-none opacity-0 -translate-y-2 transition-all duration-300">
      <span class="material-symbols-outlined text-primary-fixed text-[18px]" id="toastIcon">check_circle</span>
      <span class="font-label-md text-label-md font-medium" id="toastMessage">Pesan pemberitahuan</span>
    </div>
  `;
}
