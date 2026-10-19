// Screen 1: Onboarding - Kenalan dengan BEKAL
export function renderOnboardingScreen() {
  return `
    <div class="flex flex-col w-full min-h-screen bg-surface px-margin pb-8 pt-safe">
      <!-- Top Bar -->
      <div class="flex items-center justify-between py-2 mb-3">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-primary-container flex items-center justify-center text-on-primary shadow-sm">
            <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">eco</span>
          </div>
          <div class="flex flex-col">
            <span class="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">BEKAL</span>
            <span class="font-label-sm text-label-sm text-secondary -mt-1 tracking-wider uppercase font-semibold">Kitchen Lifecycle</span>
          </div>
        </div>
        <button id="btnSkipOnboarding" class="px-3 py-1.5 rounded-full bg-surface-container-low text-secondary hover:text-primary active:scale-95 transition-all flex items-center gap-1" type="button">
          <span class="font-label-md text-label-md font-semibold">Lewati</span>
          <span class="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>

      <!-- Hero Visual Card -->
      <div class="relative w-full rounded-3xl bg-surface-container-lowest p-3 shadow-md overflow-hidden mb-5">
        <div class="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-primary-fixed/30 blur-2xl pointer-events-none"></div>
        <div class="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-secondary-fixed/40 blur-2xl pointer-events-none"></div>
        
        <div class="relative w-full h-64 rounded-2xl overflow-hidden bg-surface-container-low">
          <img class="w-full h-full object-cover" alt="Fresh kitchen groceries" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBqEZMaAa88m7UflRi5i0tUIJI0NJwuia8c_ep3oLsATEiZLQK9K-6CXoc7VJPI6uHWF_4WEYXBnUzlLtZ1WMc-WHtwmVn2nYDPGLr-vRL1siZ_5sKqMNqIHuMwIo2K0mvmk8bhdTFLbn4HnZM4HxER9o2U0GLED4nCXSsbOTw8CWbTEuULraOuMf_8RMYEpdh9a5Uv6RljL4HWCoSOZVP5424f3Gaw2UObYqSKZdUFbKuXQxGZxC7"/>
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10"></div>
          
          <div class="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm">
            <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span class="font-label-md text-label-md text-on-surface font-semibold">Zero Food Waste 🌱</span>
          </div>

          <div class="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow-sm">
            <span class="material-symbols-outlined text-primary text-[16px]" style="font-variation-settings: 'FILL' 1;">verified</span>
            <span class="font-label-sm text-label-sm text-primary tracking-wide font-bold">Score 85 Safe</span>
          </div>

          <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow-sm">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span class="material-symbols-outlined text-[16px]">savings</span>
              </div>
              <div class="flex flex-col">
                <span class="font-label-sm text-label-sm text-secondary font-medium">Estimasi Penghematan</span>
                <span class="font-label-md text-label-md text-on-surface font-bold">Hemat Rp 150rb+/bln 💰</span>
              </div>
            </div>
            <span class="material-symbols-outlined text-primary text-[18px]">trending_up</span>
          </div>
        </div>
      </div>

      <!-- Pagination Indicator Dots -->
      <div class="flex items-center justify-center gap-1.5 mb-4">
        <div class="w-7 h-2 rounded-full bg-primary transition-all duration-300"></div>
        <div class="w-2 h-2 rounded-full bg-surface-container-highest transition-all duration-300"></div>
        <div class="w-2 h-2 rounded-full bg-surface-container-highest transition-all duration-300"></div>
      </div>

      <!-- Headline -->
      <div class="flex flex-col mb-5 text-center px-1">
        <h1 class="font-headline-xl-mobile text-headline-xl-mobile text-on-surface tracking-tight mb-2 font-bold">
          Kelola Dapur Cerdas, <br class="hidden xs:block"/><span class="text-primary">Cegah Pangan Terbuang</span>
        </h1>
        <p class="font-body-md text-body-md text-secondary leading-relaxed">
          Lacak bahan makanan secara real-time, hindari jebakan diskon supermarket, dan masak resep lezat sebelum bahan kedaluwarsa.
        </p>
      </div>

      <!-- Feature Highlights -->
      <div class="flex flex-col gap-2.5 mb-6">
        <div class="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
          <div class="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-primary shrink-0">
            <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">notifications_active</span>
          </div>
          <div class="flex flex-col min-w-0">
            <div class="flex items-center gap-1.5">
              <span class="font-label-lg text-label-lg text-on-surface font-bold truncate">Smart Risk Detector</span>
              <span class="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed uppercase tracking-wider font-bold">AI</span>
            </div>
            <p class="font-body-sm text-body-sm text-secondary truncate">Peringatan cerdas sebelum sayur & buah membusuk</p>
          </div>
        </div>

        <div class="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
          <div class="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0">
            <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">price_check</span>
          </div>
          <div class="flex flex-col min-w-0">
            <div class="flex items-center gap-1.5">
              <span class="font-label-lg text-label-lg text-on-surface font-bold truncate">Anti-Promo Trap</span>
              <span class="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-tertiary-fixed-dim text-on-tertiary-fixed uppercase tracking-wider font-bold">Cermat</span>
            </div>
            <p class="font-body-sm text-body-sm text-secondary truncate">Validasi apakah diskon grocery benar kamu butuhkan</p>
          </div>
        </div>

        <div class="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
          <div class="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0">
            <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">volunteer_activism</span>
          </div>
          <div class="flex flex-col min-w-0">
            <div class="flex items-center gap-1.5">
              <span class="font-label-lg text-label-lg text-on-surface font-bold truncate">Warung Rescue Network</span>
              <span class="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed uppercase tracking-wider font-bold">Lokal</span>
            </div>
            <p class="font-body-sm text-body-sm text-secondary truncate">Salurkan surplus bahan layak konsumsi ke tetangga</p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col gap-3 mt-auto">
        <button id="btnStartNow" class="w-full py-3.5 px-6 rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all group" type="button">
          <span>Mulai Sekarang</span>
          <span class="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
        </button>
        <button id="btnGoToLogin" class="w-full py-2.5 text-center font-label-lg text-label-lg text-secondary hover:text-primary active:opacity-75 transition-colors" type="button">
          Sudah punya akun? <span class="text-primary underline font-bold">Masuk</span>
        </button>
      </div>
    </div>
  `;
}
