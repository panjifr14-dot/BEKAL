// Screen 8: Masuk - Akun BEKAL
export function renderMasukScreen() {
  return `
    <div class="flex flex-col w-full min-h-screen bg-surface px-margin pt-20 pb-safe">
      <div class="flex flex-col w-full pb-space-lg">
        <!-- Brand & Welcome Hero Block -->
        <div class="flex flex-col space-y-space-xs mt-space-sm mb-space-lg">
          <div class="inline-flex items-center gap-space-xs self-start px-space-sm py-1 rounded-full bg-secondary-container text-on-secondary-container">
            <span class="material-symbols-outlined text-[16px] text-primary" style="font-variation-settings: 'FILL' 1;">eco</span>
            <span class="font-label-sm text-label-sm uppercase tracking-wider font-bold">BEKAL Pantry Guard</span>
          </div>
          <h2 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight mt-1 font-bold">
            Selamat Datang Kembali! 👋
          </h2>
          <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Masuk untuk memantau kulkas dan efisiensi dapurmu hari ini.
          </p>
        </div>

        <!-- Social Auth Direct Actions -->
        <div class="flex flex-col gap-space-sm mb-space-lg">
          <!-- Google Button -->
          <button id="btnGoogleSignIn" class="w-full flex items-center justify-center gap-space-md py-3.5 px-space-md rounded-xl bg-surface-container-lowest text-on-surface shadow-sm active:scale-[0.99] transition-all" type="button">
            <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17Z" fill="#4285F4"></path>
              <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z" fill="#34A853"></path>
              <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15Z" fill="#FBBC05"></path>
              <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z" fill="#EA4335"></path>
            </svg>
            <span class="font-label-lg text-label-lg text-on-surface font-semibold">Lanjutkan dengan Google</span>
          </button>
          <!-- Apple Button -->
          <button id="btnAppleSignIn" class="w-full flex items-center justify-center gap-space-md py-3.5 px-space-md rounded-xl bg-inverse-surface text-inverse-on-surface shadow-sm active:scale-[0.99] transition-all" type="button">
            <svg class="w-5 h-5 shrink-0 fill-current" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.06-7.65-7.85-11.89-14.36-6-9.19-10.74-19.8-14.22-31.84-3.48-12.04-5.22-23.36-5.22-33.95 0-14.68 3.68-26.79 11.03-36.34 7.35-9.55 16.63-14.42 27.84-14.61 4.9 0 10.42 1.34 16.57 4.03 6.14 2.68 10.02 4.09 11.64 4.23 2.12-.41 6.22-1.96 12.3-4.65 6.08-2.69 11.24-3.86 15.48-3.52 14.22 1.13 25.04 6.75 32.46 16.86-12.57 7.64-18.75 17.84-18.54 30.61.19 10.01 4.02 18.29 11.49 24.84 7.46 6.56 16.48 10.37 27.05 11.45-2.22 6.64-4.87 13.04-7.94 19.22zM119.22 33.15c0-7.39 2.66-14.34 7.99-20.85 5.33-6.5 11.82-10.66 19.46-12.3-1.06 7.64-3.92 14.59-8.59 20.85-4.67 6.26-10.76 10.36-18.27 12.3-.12-.13-.32-.26-.59 0z"></path>
            </svg>
            <span class="font-label-lg text-label-lg text-inverse-on-surface font-semibold">Lanjutkan dengan Apple</span>
          </button>
        </div>

        <!-- Soft Divider -->
        <div class="relative flex items-center justify-center my-space-sm mb-space-lg">
          <div class="w-full h-px bg-surface-container-high"></div>
          <span class="absolute px-space-md bg-surface font-label-md text-label-md text-secondary font-semibold">
            atau masuk dengan email
          </span>
        </div>

        <!-- Sign-in Form -->
        <form class="flex flex-col gap-space-md" id="loginForm" onsubmit="event.preventDefault();">
          <!-- Email / Phone Input -->
          <div class="flex flex-col gap-1.5">
            <label class="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1" for="identifierInput">
              Email atau No. Handphone
            </label>
            <div class="relative flex items-center bg-surface-container-lowest rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-primary/30 transition-all">
              <span class="material-symbols-outlined text-outline text-[20px] ml-space-md shrink-0">mail</span>
              <input class="w-full py-3.5 px-space-md bg-transparent text-on-surface font-body-md text-body-md placeholder:text-outline outline-none" id="identifierInput" placeholder="andi@domain.com" required type="text" value="andi@domain.com"/>
            </div>
          </div>

          <!-- Password Input -->
          <div class="flex flex-col gap-1.5">
            <label class="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1" for="loginPasswordInput">
              Kata Sandi
            </label>
            <div class="relative flex items-center bg-surface-container-lowest rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-primary/30 transition-all">
              <span class="material-symbols-outlined text-outline text-[20px] ml-space-md shrink-0">lock</span>
              <input class="w-full py-3.5 px-space-md bg-transparent text-on-surface font-body-md text-body-md placeholder:text-outline outline-none" id="loginPasswordInput" placeholder="••••••••" required type="password" value="DapurBijak2024!"/>
              <button aria-label="Tampilkan sandi" class="p-space-sm mr-space-xs rounded-full text-secondary hover:text-on-surface hover:bg-surface-container-high transition-colors flex items-center justify-center" id="btnToggleLoginPassword" type="button">
                <span class="material-symbols-outlined text-[20px]" id="loginEyeIcon">visibility</span>
              </button>
            </div>
          </div>

          <!-- Remember Me & Forgot Password Row -->
          <div class="flex items-center justify-between mt-1 mb-space-sm">
            <label class="flex items-center gap-space-sm cursor-pointer select-none">
              <input checked class="w-4 h-4 rounded text-primary accent-primary bg-surface-container-low cursor-pointer" type="checkbox"/>
              <span class="font-body-sm text-body-sm text-on-surface-variant font-medium">Ingat Saya</span>
            </label>
            <button class="font-label-md text-label-md text-primary font-bold hover:underline" type="button" id="btnForgotPassword">
              Lupa Kata Sandi?
            </button>
          </div>

          <!-- Primary Login Button -->
          <button class="w-full flex items-center justify-center gap-space-sm py-4 px-space-lg rounded-xl bg-primary text-on-primary font-headline-sm text-headline-sm font-bold shadow-md active:scale-[0.98] transition-all group" id="btnSubmitLogin" type="submit">
            <span>Masuk ke Dapur Saya</span>
            <span class="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
          </button>
        </form>

        <!-- Biometric Login Pill Action -->
        <div class="flex justify-center mt-space-lg">
          <button class="flex items-center gap-space-sm px-space-lg py-2.5 rounded-full bg-secondary-container text-on-secondary-fixed shadow-sm active:scale-95 transition-all hover:bg-secondary-container/80" id="btnBioAuth" type="button">
            <span class="material-symbols-outlined text-primary text-[20px]">fingerprint</span>
            <span class="font-label-md text-label-md font-bold">Masuk dengan Face ID / Sidik Jari</span>
          </button>
        </div>

        <!-- Household Eco Pantry Mini Banner -->
        <div class="mt-space-xl p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex items-center gap-space-md">
          <div class="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-primary text-[24px]">soup_kitchen</span>
          </div>
          <div class="flex flex-col min-w-0">
            <div class="flex items-center gap-1.5">
              <span class="font-label-sm text-label-sm font-bold text-primary uppercase">Dapur Bebas Sampah</span>
              <span class="w-1.5 h-1.5 rounded-full bg-primary-fixed-dim"></span>
            </div>
            <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 leading-snug">
              Kelola masa kedaluwarsa & temukan resep lezat penyelamat stok.
            </p>
          </div>
        </div>

        <!-- Footer Navigation Links -->
        <div class="mt-space-xl flex flex-col items-center gap-space-xs text-center">
          <p class="font-body-md text-body-md text-on-surface-variant">
            Belum punya akun? 
            <button id="btnGoToSignupFromLogin" class="font-label-lg text-label-lg text-primary hover:underline ml-1 font-bold">
              Daftar sekarang
            </button>
          </p>
        </div>
      </div>
    </div>
  `;
}
