// Supabase public settings (the publishable key is safe to expose; database policies protect writes).
window.GW={url:"https://pfxlsgmohiziohfpmxhb.supabase.co",key:"sb_publishable_KNSa7tC2O7FrDlX560_6TQ_5-IblBMo"};

// Local test mode: when the site is opened from your own computer (VS Code Live Server etc.) edits are kept in this browser only and never touch the live site. Add ?live to the address to use the real database instead.
window.GW.local=/^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(location.hostname)&&!/[?&]live\b/.test(location.search);

// Google sign-in button on the editor. Switch to true once Google is enabled in Supabase (Authentication > Sign In / Providers > Google).
window.GW.google=false;
