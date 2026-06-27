function initImageZoom() {
  if (window.__imageZoomInit) return;
  window.__imageZoomInit = true;

  const overlay = document.createElement('div');
  overlay.className = 'image-zoom-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  const img = document.createElement('img');
  img.className = 'image-zoom-img';
  img.alt = '';

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'image-zoom-close';
  closeBtn.setAttribute('aria-label', '关闭');
  closeBtn.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>';

  overlay.appendChild(img);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  function open(src, alt) {
    img.src = src;
    img.alt = alt || '';
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    img.src = '';
  }

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target instanceof HTMLImageElement && target.closest('.sl-markdown-content')) {
      if (target.closest('a')) return;
      open(target.currentSrc || target.src, target.alt);
    }
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || (e.target instanceof Element && e.target.closest('.image-zoom-close'))) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
  });
}

initImageZoom();
document.addEventListener('astro:page-load', initImageZoom);
