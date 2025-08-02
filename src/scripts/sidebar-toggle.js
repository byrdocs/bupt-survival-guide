function positionRightToggleButton() {
  const root = document.documentElement;
  const rightButton = document.getElementById('right-sidebar-toggle');
  const mainContent = document.querySelector('main');

  if (!rightButton || !mainContent) return;

  const isHidden = root.hasAttribute('data-right-sidebar-hidden');

  if (isHidden) {
    // When sidebar is hidden, let CSS handle positioning to the far right.
    // We must clear any inline `left` style we may have set.
    rightButton.style.left = '';
  } else {
    // When sidebar is visible, calculate the position dynamically.
    const mainContentRight = mainContent.getBoundingClientRect().right;
    // Position the button's center (12px) on the main content's right edge.
    const buttonLeft = mainContentRight - 12;
    rightButton.style.left = `${buttonLeft}px`;
  }
}

function setInitialSidebarState() {
  const root = document.documentElement;
  const leftButton = document.getElementById('left-sidebar-toggle');
  
  if (leftButton) {
    const isLeftCollapsed = localStorage.getItem('starlight-left-sidebar-collapsed') === 'true';
    if (isLeftCollapsed) root.removeAttribute('data-has-sidebar');
    leftButton.setAttribute('aria-expanded', String(root.hasAttribute('data-has-sidebar')));
  }
}

function attachSidebarToggles() {
  const root = document.documentElement;

  // --- Left Sidebar Logic (The Working Model) ---
  const leftButton = document.getElementById('left-sidebar-toggle');
  if (leftButton) {
    leftButton.addEventListener('click', () => {
      const isVisible = root.hasAttribute('data-has-sidebar');
      if (isVisible) {
        root.removeAttribute('data-has-sidebar');
        localStorage.setItem('starlight-left-sidebar-collapsed', 'true');
        leftButton.setAttribute('aria-expanded', 'false');
      } else {
        root.setAttribute('data-has-sidebar', '');
        localStorage.setItem('starlight-left-sidebar-collapsed', 'false');
        leftButton.setAttribute('aria-expanded', 'true');
      }
      // After changing the left sidebar, the main content will resize.
      // We must reposition the right button to match.
      setTimeout(positionRightToggleButton, 50);
    });
  }

  // --- Right Sidebar Logic (with reliable TOC detection and dynamic positioning) ---
  const toc = document.querySelector('starlight-toc');
  if (toc) {
    root.dataset.hasToc = 'true';
    const rightButton = document.getElementById('right-sidebar-toggle');
    if (rightButton) {
      const isRightCollapsed = localStorage.getItem('starlight-right-sidebar-collapsed') === 'true';
      if (isRightCollapsed) root.setAttribute('data-right-sidebar-hidden', 'true');
      rightButton.setAttribute('aria-expanded', !root.hasAttribute('data-right-sidebar-hidden'));

      rightButton.addEventListener('click', () => {
        const isHidden = root.hasAttribute('data-right-sidebar-hidden');
        if (isHidden) {
          root.removeAttribute('data-right-sidebar-hidden');
        } else {
          root.setAttribute('data-right-sidebar-hidden', 'true');
        }
        localStorage.setItem('starlight-right-sidebar-collapsed', String(!isHidden));
        rightButton.setAttribute('aria-expanded', String(isHidden));
        // After the state changes, reposition the button.
        // Use a timeout to allow the browser to repaint the layout first.
        setTimeout(positionRightToggleButton, 50);
      });

      // Initial position calculation
      positionRightToggleButton();

      // Recalculate on window resize
      window.addEventListener('resize', positionRightToggleButton);
    }
  }
}

// Set initial state immediately
setInitialSidebarState();

// Use Astro's native event for when a page is fully loaded and hydrated
document.addEventListener('astro:page-load', () => {
  setInitialSidebarState();
  attachSidebarToggles();
});

// Also run on initial load for non-view-transition navigations
if (document.readyState === 'complete') {
  attachSidebarToggles();
} else {
  document.addEventListener('DOMContentLoaded', attachSidebarToggles);
}