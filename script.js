/* ============================================================
   3Mコーチング LP - script.js
   ============================================================ */

'use strict';

/* ============================================================
   CTA クリック計測
   後でGA4 / GTM に差し替えられるように console.log で出力。

   GA4 に切り替える場合は以下をコメントアウトして使用：
   gtag('event', 'cta_click', { cta_id: ctaId, page_location: window.location.href });

   GTM の場合：
   window.dataLayer = window.dataLayer || [];
   window.dataLayer.push({ event: 'cta_click', cta_id: ctaId });
   ============================================================ */
document.addEventListener('click', function (e) {
  const btn = e.target.closest('[data-cta]');
  if (!btn) return;

  const ctaId = btn.getAttribute('data-cta');

  // --- 計測ログ（GA等に置換する箇所） ---
  console.log('[CTA Click]', {
    id: ctaId,
    label: btn.textContent.trim(),
    href: btn.getAttribute('href'),
    timestamp: new Date().toISOString(),
  });

  // TODO: GA4 に置換する場合はここに追記
  // if (typeof gtag === 'function') {
  //   gtag('event', 'cta_click', { cta_id: ctaId });
  // }
});

/* ============================================================
   スティッキーCTA 表示制御
   ヒーローのCTAボタンがビューポートから外れたら表示する
   ============================================================ */
(function () {
  const stickyCta = document.getElementById('stickyCta');
  const heroCta   = document.querySelector('[data-cta="hero"]');

  if (!stickyCta || !heroCta) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          stickyCta.classList.remove('visible');
        } else {
          stickyCta.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(heroCta);
})();

/* ============================================================
   FAQ アコーディオン
   ひとつ開いたら他を閉じる（任意。削除しても動作する）
   ============================================================ */
(function () {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      items.forEach(function (other) {
        if (other !== item && other.open) {
          other.open = false;
        }
      });
    });
  });
})();

/* ============================================================
   スムーズスクロール補助
   iOS Safari のために scroll-behavior: smooth を JS で補完
   ============================================================ */
(function () {
  if ('scrollBehavior' in document.documentElement.style) return;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();
