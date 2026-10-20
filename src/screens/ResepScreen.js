// Screen 7: Resep - Rescue Recipe
import { state } from '../state.js';

export function renderResepScreen() {
  const highRiskIngredients = state.inventory.filter(i => (i.risk || 0) >= 75);
  const recipesList = state.recipes || [];

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
              <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Rekomendasi masakan cerdas yang memprioritaskan bahan kulkas hampir kedaluwarsa untuk mencegah food waste.
              </p>
            </div>
            <div class="w-12 h-12 shrink-0 rounded-2xl bg-secondary-container flex items-center justify-center text-primary shadow-sm">
              <span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1;">skillet</span>
            </div>
          </div>

          <!-- Active Risk or Empty Status Box -->
          ${highRiskIngredients.length > 0 ? `
            <div class="bg-error-container/60 rounded-xl p-space-sm flex items-center gap-space-sm">
              <div class="w-7 h-7 rounded-full bg-error text-on-error flex items-center justify-center shrink-0 shadow-sm">
                <span class="material-symbols-outlined text-[16px]">local_fire_department</span>
              </div>
              <div class="min-w-0 flex-1">
                <p class="font-label-sm text-label-sm text-error font-bold leading-tight">${highRiskIngredients.length} Bahan Berisiko Tinggi Perlu Segera Dimasak</p>
                <p class="font-body-sm text-body-sm text-on-error-container leading-tight truncate mt-0.5">
                  ${highRiskIngredients.map(i => `${i.name} (${i.expiryDays} hari lagi)`).join(' • ')}
                </p>
              </div>
            </div>
          ` : `
            <div class="bg-secondary-container/60 rounded-xl p-space-sm flex items-center gap-space-sm">
              <div class="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
                <span class="material-symbols-outlined text-[16px]">check_circle</span>
              </div>
              <div class="min-w-0 flex-1">
                <p class="font-label-sm text-label-sm text-primary font-bold leading-tight">
                  ${state.inventory.length === 0 ? 'Kulkas Kosong • Resep Praktis Siap Coba' : 'Kulkas Aman • Bebas Bahan Mendesak'}
                </p>
                <p class="font-body-sm text-body-sm text-on-surface-variant leading-tight truncate mt-0.5">
                  Pilih resep favorit keluarga di bawah untuk mulai berkreasi di dapur.
                </p>
              </div>
            </div>
          `}
        </section>

        <!-- Filter Chips & Search Bar -->
        <section class="flex flex-col gap-space-xs">
          <!-- Search input for recipes -->
          <div class="relative flex items-center bg-surface-container-lowest rounded-xl shadow-xs mb-2">
            <span class="material-symbols-outlined absolute left-3.5 text-secondary text-[20px]">search</span>
            <input class="w-full pl-10 pr-4 py-2.5 bg-transparent text-on-surface font-body-sm text-body-sm placeholder:text-outline outline-none" id="inputSearchRecipe" placeholder="Cari resep penyelamat (sambal, semur, ayam, bayam)..." type="text"/>
          </div>

          <div class="flex items-center justify-between">
            <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Kategori Penyelamat</span>
            <span class="font-body-sm text-body-sm text-primary font-bold" id="recipeCountLabel">${recipesList.length} Resep Siap</span>
          </div>

          <div class="flex items-center gap-2 overflow-x-auto pb-1 -mx-margin px-margin no-scrollbar" id="filter-container">
            <button class="filter-chip px-3.5 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-all shadow-sm bg-primary text-on-primary font-bold flex items-center gap-1.5 active:scale-95" data-filter="all">
              <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
              Semua Resep (${recipesList.length})
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
              Porsi Keluarga
            </button>
          </div>
        </section>

        <!-- Dynamic Recipe Cards List -->
        <section class="flex flex-col gap-space-lg" id="recipeCardsList">
          ${recipesList.map((recipe, idx) => {
            // Check pantry matching ingredients
            const matchedCount = (recipe.ingredients || []).filter(ing => {
              return state.inventory.some(invItem => {
                const invN = (invItem.name || '').toLowerCase();
                const key = (ing.key || ing.name || '').toLowerCase();
                return invN.includes(key) || key.includes(invN);
              });
            }).length;
            const totalIngredients = (recipe.ingredients || []).length;
            const matchRatio = `${matchedCount}/${totalIngredients} Bahan Tersedia`;

            return `
              <article class="recipe-card bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col group transition-all duration-200 hover:shadow-md" data-category="all ${recipe.category || ''}" data-id="${recipe.id}">
                <div class="relative w-full h-48 overflow-hidden bg-surface-container">
                  <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="${recipe.title}" src="${recipe.img}"/>
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>
                  
                  <!-- Tag Badges -->
                  <div class="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full ${idx === 0 ? 'bg-error text-on-error' : 'bg-primary text-on-primary'} shadow-sm font-label-sm text-label-sm tracking-wide font-bold">
                    <span class="material-symbols-outlined text-[13px]" style="font-variation-settings: 'FILL' 1;">
                      ${idx === 0 ? 'priority_high' : 'eco'}
                    </span>
                    <span>${idx === 0 ? 'Paling Direkomendasikan' : 'Penyelamat Pangan'}</span>
                  </div>

                  <!-- Food Waste Saving Impact Tag -->
                  <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-primary">
                    <span class="font-label-sm text-label-sm bg-primary/90 backdrop-blur-md px-2.5 py-1 rounded-full text-on-primary flex items-center gap-1 font-bold">
                      <span class="material-symbols-outlined text-[13px]">recycling</span>
                      ${recipe.savingsText || 'Zero Food Waste'}
                    </span>
                    <button class="w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-primary shadow-sm hover:scale-110 active:scale-95 transition-transform btn-bookmark" data-id="${recipe.id}">
                      <span class="material-symbols-outlined text-[18px]">bookmark_border</span>
                    </button>
                  </div>
                </div>

                <div class="p-space-md flex flex-col gap-space-md">
                  <div class="flex flex-col gap-1">
                    <div class="flex items-center justify-between gap-2">
                      <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">${recipe.title}</h3>
                      <span class="px-2 py-0.5 rounded-full bg-secondary-container text-primary font-label-sm text-label-sm font-bold shrink-0">
                        Score ${recipe.score || 80}
                      </span>
                    </div>
                    <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">${recipe.subtitle}</p>
                  </div>

                  <!-- Recipe Metas -->
                  <div class="flex items-center gap-3 py-1 font-body-sm text-body-sm text-on-surface-variant font-medium">
                    <div class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-[17px] text-tertiary">schedule</span>
                      <span>${recipe.time}</span>
                    </div>
                    <span class="text-surface-dim">•</span>
                    <div class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-[17px] text-secondary">group</span>
                      <span>${recipe.portions}</span>
                    </div>
                    <span class="text-surface-dim">•</span>
                    <div class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-[17px] text-primary">local_fire_department</span>
                      <span>${recipe.calories}</span>
                    </div>
                  </div>

                  <!-- Pantry Match Items -->
                  <div class="flex flex-col gap-1.5 bg-surface-container-low rounded-xl p-space-sm">
                    <div class="flex items-center justify-between">
                      <span class="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Kecocokan Bahan Kulkas</span>
                      <span class="text-xs font-bold text-primary">${matchRatio}</span>
                    </div>
                    <div class="flex flex-wrap gap-1.5">
                      ${(recipe.ingredients || []).map(ing => {
                        const isAvailable = state.inventory.some(invItem => {
                          const invN = (invItem.name || '').toLowerCase();
                          const key = (ing.key || ing.name || '').toLowerCase();
                          return invN.includes(key) || key.includes(invN);
                        });
                        return `
                          <span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg ${isAvailable ? 'bg-secondary-container text-primary font-bold' : 'bg-surface-container-lowest text-secondary font-medium'} font-label-sm text-label-sm shadow-xs">
                            <span class="material-symbols-outlined text-[13px]">${isAvailable ? 'check_circle' : 'radio_button_unchecked'}</span>
                            ${ing.name} ${isAvailable ? '(Ada)' : ''}
                          </span>
                        `;
                      }).join('')}
                    </div>
                  </div>

                  <!-- Dual Action Buttons: Detail & Masak -->
                  <div class="flex items-center gap-2 pt-1">
                    <button class="flex-1 bg-surface-container-high hover:bg-secondary-container text-on-surface py-3 rounded-xl font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] btn-recipe-detail" data-id="${recipe.id}">
                      <span class="material-symbols-outlined text-[18px]">menu_book</span>
                      <span>Detail Resep</span>
                    </button>
                    <button class="flex-1 bg-primary hover:bg-primary-container text-on-primary py-3 rounded-xl font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98] btn-cook-trigger" data-id="${recipe.id}" data-title="${recipe.title}" data-img="${recipe.img}">
                      <span class="material-symbols-outlined text-[18px]">restaurant</span>
                      <span>Mulai Masak</span>
                    </button>
                  </div>
                </div>
              </article>
            `;
          }).join('')}
        </section>

      </div>
    </div>
  `;
}
