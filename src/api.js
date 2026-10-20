// BEKAL API Client - Connects Frontend to Express + Better Auth Backend
// Uses relative /api path (proxied by Vite) so it works seamlessly on localhost and mobile devices (LAN)
const API_BASE_URL = '/api';

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  let userId = 'usr_panji_01';
  try {
    const raw = localStorage.getItem('bekal_user');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.email) {
        userId = 'usr_' + parsed.email.replace(/[^a-zA-Z0-9]/g, '_');
      }
    }
  } catch (e) {}

  const headers = {
    'Content-Type': 'application/json',
    'x-user-id': userId,
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.warn(`[BEKAL API] Request to ${endpoint} failed, using local offline fallback:`, err.message);
    return null;
  }
}

export const bekalApi = {
  // 1. Health
  checkHealth: () => apiRequest('/health'),

  // 2. Food Risk & Pantry
  getFoodRiskDashboard: () => apiRequest('/food-risk/dashboard'),
  getPantry: (filters) => apiRequest(`/pantry?${new URLSearchParams(filters || {}).toString()}`),
  addItem: (item) =>
    apiRequest('/pantry', {
      method: 'POST',
      body: JSON.stringify(item),
    }),
  deleteItem: (itemId) =>
    apiRequest(`/pantry/${itemId}`, {
      method: 'DELETE',
    }),
  scanReceipt: (imagePayload) =>
    apiRequest('/pantry/scan-receipt', {
      method: 'POST',
      body: JSON.stringify({ imagePayload }),
    }),
  confirmReceipt: (receiptId, items) =>
    apiRequest('/pantry/confirm-receipt', {
      method: 'POST',
      body: JSON.stringify({ receiptId, items }),
    }),

  // 3. Promo Trap Detector
  evaluatePromo: (payload) =>
    apiRequest('/promo-trap/evaluate', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  recordPromoDecision: (checkId, decision) =>
    apiRequest('/promo-trap/decision', {
      method: 'POST',
      body: JSON.stringify({ checkId, decision }),
    }),

  // 4. Rescue Recipe
  getRescueRecipes: (category = 'all') =>
    apiRequest(`/recipes/recommendations?category=${category}`),
  completeCooking: (payload) =>
    apiRequest('/recipes/complete-cooking', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // 5. Warung Rescue Network
  getNearbyPartners: (lat = -6.2415, lng = 106.7942, radius = 2.0) =>
    apiRequest(`/rescue-network/partners?lat=${lat}&lng=${lng}&radius=${radius}`),
  createRescueListing: (payload) =>
    apiRequest('/rescue-network/listings', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // 6. Impact & Gamification
  getImpactSummary: () => apiRequest('/impact/summary'),
  getStoryCard: () => apiRequest('/impact/story-card'),

  // 7. Users & Preferences
  getUserProfile: () => apiRequest('/users/profile'),
  updateHousehold: (householdType, householdPortions) =>
    apiRequest('/users/household', {
      method: 'PATCH',
      body: JSON.stringify({ householdType, householdPortions }),
    }),
  updatePreferences: (alarmEnabled) =>
    apiRequest('/users/preferences', {
      method: 'PATCH',
      body: JSON.stringify({ alarmEnabled }),
    }),

  // 8. Subscriptions & B2B
  getSubscriptionStatus: () => apiRequest('/subscriptions/status'),
  upgradeSubscription: () =>
    apiRequest('/subscriptions/upgrade', {
      method: 'POST',
      body: JSON.stringify({ paymentProvider: 'google_play' }),
    }),
  getB2BInsights: (city) => apiRequest(`/b2b/insights?city=${encodeURIComponent(city || '')}`),
};
