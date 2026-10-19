// Screen 2: Daftar - Bergabung dengan BEKAL
export function renderDaftarScreen() {
  return `
    <div class="flex flex-col w-full min-h-screen bg-surface px-margin pt-20 pb-safe">
      <div class="flex flex-col w-full pb-8">
        <!-- Visual Accent Header Card -->
        <section class="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm mb-space-lg">
          <div class="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-primary-fixed/30 pointer-events-none blur-xl"></div>
          <div class="relative z-10">
            <div class="inline-flex items-center gap-1.5 px-space-sm py-space-xs rounded-full bg-secondary-fixed text-on-secondary-fixed mb-space-sm">
              <span class="material-symbols-outlined text-[14px]">eco</span>
              <span class="font-label-sm text-label-sm uppercase tracking-wider font-bold">Langkah Berkelanjutan</span>
            </div>
            <h2 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight mb-space-xs font-bold">
              Mulai Langkah Bijakmu 🌱
            </h2>
            <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Buat akun BEKAL dan selamatkan makanan dari dapurmu mulai hari ini.
            </p>
          </div>
          <!-- Quick Mini Impact Snapshot Preview -->
          <div class="mt-space-md grid grid-cols-2 gap-space-sm">
            <div class="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-low">
              <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span class="material-symbols-outlined text-[18px]">inventory_2</span>
              </div>
              <div class="min-w-0">
                <p class="font-label-sm text-label-sm text-secondary">Pantau Stok</p>
                <p class="font-label-md text-label-md text-on-surface truncate font-bold">Bebas Makanan Basi</p>
              </div>
            </div>
            <div class="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-low">
              <div class="w-8 h-8 rounded-full bg-tertiary-container/15 flex items-center justify-center text-tertiary shrink-0">
                <span class="material-symbols-outlined text-[18px]">savings</span>
              </div>
              <div class="min-w-0">
                <p class="font-label-sm text-label-sm text-secondary">Hemat Bulanan</p>
                <p class="font-label-md text-label-md text-on-surface truncate font-bold">Hingga 30% Belanja</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Social Registration Quick Buttons -->
        <div class="flex flex-col gap-space-sm mb-space-lg">
          <button id="btnGoogleSignUp" class="w-full flex items-center justify-center gap-space-sm py-3 px-space-md rounded-xl bg-surface-container-lowest text-on-surface font-label-lg text-label-lg font-semibold shadow-sm active:scale-[0.99] transition-transform" type="button">
            <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
            </svg>
            <span>Daftar dengan Google</span>
          </button>
          <button id="btnAppleSignUp" class="w-full flex items-center justify-center gap-space-sm py-3 px-space-md rounded-xl bg-inverse-surface text-inverse-on-surface font-label-lg text-label-lg font-semibold shadow-sm active:scale-[0.99] transition-transform" type="button">
            <svg class="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.78 1.06-1.85.94-2.94-.93.04-2.02.63-2.66 1.4-.57.67-1.06 1.76-.93 2.82 1.04.08 2.05-.53 2.65-1.28z"></path>
            </svg>
            <span>Daftar dengan Apple</span>
          </button>
        </div>

        <!-- Divider -->
        <div class="relative flex items-center justify-center mb-space-lg">
          <div class="w-full h-px bg-surface-variant"></div>
          <span class="absolute px-space-sm bg-surface font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
            atau daftar dengan email
          </span>
        </div>

        <!-- Main Registration Form -->
        <form class="flex flex-col gap-space-lg" id="signupForm" onsubmit="event.preventDefault();">
          <!-- Field: Nama Lengkap -->
          <div class="flex flex-col gap-1.5">
            <label class="font-label-md text-label-md text-on-surface flex items-center gap-1 font-semibold" for="fullNameInput">
              <span>Nama Lengkap</span>
              <span class="text-primary">*</span>
            </label>
            <div class="relative flex items-center">
              <span class="material-symbols-outlined absolute left-3.5 text-secondary text-[20px]">person</span>
              <input class="w-full pl-11 pr-4 py-3 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all" id="fullNameInput" placeholder="Andi Pratama" type="text" value="Andi Pratama" required/>
            </div>
          </div>

          <!-- Field: Email Aktif -->
          <div class="flex flex-col gap-1.5">
            <label class="font-label-md text-label-md text-on-surface flex items-center gap-1 font-semibold" for="emailInput">
              <span>Email Aktif</span>
              <span class="text-primary">*</span>
            </label>
            <div class="relative flex items-center">
              <span class="material-symbols-outlined absolute left-3.5 text-secondary text-[20px]">mail</span>
              <input class="w-full pl-11 pr-10 py-3 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all" id="emailInput" placeholder="andi@domain.com" type="email" value="andi@domain.com" required/>
              <span class="material-symbols-outlined absolute right-3 text-primary text-[20px]">check_circle</span>
            </div>
          </div>

          <!-- Field: Kata Sandi -->
          <div class="flex flex-col gap-1.5">
            <div class="flex items-center justify-between">
              <label class="font-label-md text-label-md text-on-surface flex items-center gap-1 font-semibold" for="passwordInput">
                <span>Kata Sandi</span>
                <span class="text-primary">*</span>
              </label>
              <span class="font-label-sm text-label-sm text-secondary">Min. 8 Karakter</span>
            </div>
            <div class="relative flex items-center">
              <span class="material-symbols-outlined absolute left-3.5 text-secondary text-[20px]">lock</span>
              <input class="w-full pl-11 pr-11 py-3 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all tracking-wider" id="passwordInput" type="password" value="DapurBijak2024!" required/>
              <button aria-label="Lihat kata sandi" class="absolute right-3 text-secondary p-1 rounded-full hover:bg-surface-container-high transition-colors" id="btnTogglePassword" type="button">
                <span class="material-symbols-outlined text-[20px]" id="eyeIcon">visibility</span>
              </button>
            </div>
            <!-- Password Strength Indicator -->
            <div class="mt-1 p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <span class="font-label-sm text-label-sm text-secondary font-medium">Kekuatan Sandi</span>
                <span id="strengthText" class="font-label-sm text-label-sm text-primary flex items-center gap-1 font-bold">
                  <span class="material-symbols-outlined text-[14px]">shield</span>
                  Kuat (Kombinasi Aman)
                </span>
              </div>
              <!-- Progress Bar Segments -->
              <div class="grid grid-cols-3 gap-1.5 w-full h-1.5">
                <div id="bar1" class="rounded-full bg-primary h-full transition-colors"></div>
                <div id="bar2" class="rounded-full bg-primary h-full transition-colors"></div>
                <div id="bar3" class="rounded-full bg-primary h-full transition-colors"></div>
              </div>
            </div>
          </div>

          <!-- Field: Tipe Rumah Tangga (Personalization) -->
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <label class="font-label-md text-label-md text-on-surface flex items-center gap-1 font-semibold">
                <span>Tipe Rumah Tangga</span>
                <span class="text-primary">*</span>
              </label>
              <span class="font-label-sm text-label-sm text-secondary">Prediksi Risiko Makanan</span>
            </div>
            <div class="flex flex-col gap-2" id="householdSelector">
              <!-- Option 1: Mahasiswa/Solo -->
              <label class="cursor-pointer relative flex items-center p-3 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow transition-all household-item" data-household="solo">
                <input class="sr-only" name="household_type" type="radio" value="solo"/>
                <div class="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mr-3 transition-colors">
                  <span class="material-symbols-outlined text-[20px]">person</span>
                </div>
                <div class="flex-1 min-w-0 pr-2">
                  <div class="flex items-center gap-2">
                    <p class="font-label-md text-label-md text-on-surface truncate font-semibold">Sendiri / Kos</p>
                    <span class="px-1.5 py-0.5 rounded-full bg-surface-container-high text-secondary font-label-sm text-label-sm font-medium">Mahasiswa</span>
                  </div>
                  <p class="font-body-sm text-body-sm text-secondary truncate">Porsi mini, fokus tanggal kadaluarsa camilan</p>
                </div>
                <div class="radio-indicator w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center transition-all">
                  <div class="w-2 h-2 rounded-full bg-transparent"></div>
                </div>
              </label>
              
              <!-- Option 2: Keluarga Kecil (Active Selected) -->
              <label class="cursor-pointer relative flex items-center p-3 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow transition-all household-item household-active ring-2 ring-primary/40" data-household="small">
                <input checked class="sr-only" name="household_type" type="radio" value="small"/>
                <div class="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 mr-3 transition-colors">
                  <span class="material-symbols-outlined text-[20px]">group</span>
                </div>
                <div class="flex-1 min-w-0 pr-2">
                  <div class="flex items-center gap-2">
                    <p class="font-label-md text-label-md text-on-surface truncate font-semibold">Keluarga Kecil</p>
                    <span class="px-1.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">2–3 Orang</span>
                  </div>
                  <p class="font-body-sm text-body-sm text-secondary truncate">Cocok untuk batch meal prep mingguan</p>
                </div>
                <div class="radio-indicator w-5 h-5 rounded-full bg-primary flex items-center justify-center transition-all">
                  <span class="material-symbols-outlined text-on-primary text-[14px]">check</span>
                </div>
              </label>

              <!-- Option 3: Keluarga Besar -->
              <label class="cursor-pointer relative flex items-center p-3 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow transition-all household-item" data-household="large">
                <input class="sr-only" name="household_type" type="radio" value="large"/>
                <div class="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mr-3 transition-colors">
                  <span class="material-symbols-outlined text-[20px]">diversity_3</span>
                </div>
                <div class="flex-1 min-w-0 pr-2">
                  <div class="flex items-center gap-2">
                    <p class="font-label-md text-label-md text-on-surface truncate font-semibold">Keluarga Besar</p>
                    <span class="px-1.5 py-0.5 rounded-full bg-surface-container-high text-secondary font-label-sm text-label-sm font-medium">4+ Orang</span>
                  </div>
                  <p class="font-body-sm text-body-sm text-secondary truncate">Penyimpanan volume besar & rotasi belanja</p>
                </div>
                <div class="radio-indicator w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center transition-all">
                  <div class="w-2 h-2 rounded-full bg-transparent"></div>
                </div>
              </label>
            </div>
          </div>

          <!-- Agreement Commitment Checkbox -->
          <div class="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm">
            <label class="flex items-start gap-space-sm cursor-pointer select-none">
              <input checked class="sr-only peer" id="commitmentCheckbox" type="checkbox"/>
              <div class="w-5 h-5 mt-0.5 rounded-md bg-surface-container-high peer-checked:bg-primary flex items-center justify-center shrink-0 transition-colors">
                <span class="material-symbols-outlined text-on-primary text-[16px] hidden peer-checked:block">check</span>
              </div>
              <div class="flex flex-col">
                <span class="font-body-sm text-body-sm text-on-surface leading-snug">
                  Saya berkomitmen mengurangi <strong class="text-primary font-semibold">food waste</strong> dan setuju dengan <a class="text-primary underline font-bold" href="#">Syarat & Ketentuan</a> BEKAL.
                </span>
                <span class="font-label-sm text-label-sm text-secondary mt-1 flex items-center gap-1 font-medium">
                  <span class="material-symbols-outlined text-[13px] text-primary">verified</span>
                  Bebas spam, data kulkas Anda aman terenkripsi
                </span>
              </div>
            </label>
          </div>

          <!-- Primary CTA Button -->
          <button class="w-full py-3.5 px-space-md rounded-xl bg-primary-container text-on-primary font-headline-sm text-headline-sm shadow-md active:scale-[0.98] transition-transform flex items-center justify-center gap-space-sm font-bold" id="btnSubmitSignup" type="submit">
            <span class="material-symbols-outlined text-[20px]">soup_kitchen</span>
            <span>Buat Akun & Mulai Dapur Cerdas</span>
          </button>
        </form>

        <!-- Login Link Footer -->
        <div class="mt-space-lg text-center">
          <p class="font-body-md text-body-md text-secondary">
            Sudah terdaftar di BEKAL? 
            <button id="btnGoToLoginFromSignup" class="font-label-lg text-label-lg text-primary hover:underline ml-1 font-bold">
              Masuk di sini
            </button>
          </p>
        </div>
      </div>
    </div>
  `;
}
