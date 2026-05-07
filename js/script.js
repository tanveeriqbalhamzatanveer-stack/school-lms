/**
 * Nusrat High School LMS – Main Script
 * Version: 2.0.0
 *
 * Modules:
 *  1. State Management
 *  2. Utility Functions
 *  3. Toast Notifications
 *  4. Auth (Login / Signup / Logout)
 *  5. Navigation (Page & Section Switching)
 *  6. Sidebar (Mobile Drawer)
 *  7. Avatar Upload
 *  8. Progress Bar Animations
 *  9. Form Validation
 * 10. localStorage Persistence
 * 11. Date/Time Display
 * 12. Event Listeners (replaces all inline onclick="")
 */

/* ─────────────────────────────────────────────────────────────
   1. STATE MANAGEMENT
───────────────────────────────────────────────────────────── */
const AppState = {
  currentRole:     'student',
  profilePhotoUrl: null,
  currentSection:  'dashboard',
  user: {
    name:    'Ahmed Malik',
    initials:'AM',
    class:   'Class 10-A',
    roll:    '14',
    session: '2024–25'
  }
};

/* ─────────────────────────────────────────────────────────────
   2. UTILITY FUNCTIONS
───────────────────────────────────────────────────────────── */

/**
 * Get element by ID (shorthand)
 * @param {string} id
 * @returns {HTMLElement|null}
 */
const $ = (id) => document.getElementById(id);

/**
 * Query all matching elements
 * @param {string} selector
 * @param {Element} [context=document]
 * @returns {NodeListOf<Element>}
 */
const $$ = (selector, context = document) => context.querySelectorAll(selector);

/**
 * Safely set element text content
 * @param {string} id
 * @param {string} text
 */
const setText = (id, text) => {
  const el = $(id);
  if (el) el.textContent = text;
};

/**
 * Safely set element innerHTML (use only with trusted content)
 * @param {string} id
 * @param {string} html
 */
const setHTML = (id, html) => {
  const el = $(id);
  if (el) el.innerHTML = html;
};

/* ─────────────────────────────────────────────────────────────
   3. TOAST NOTIFICATIONS
───────────────────────────────────────────────────────────── */
const Toast = (() => {
  let timer = null;

  /**
   * Show a toast notification
   * @param {string} message
   * @param {number} [duration=3000]
   */
  function show(message, duration = 3000) {
    const toast = $('toast');
    if (!toast) return;

    // Clear any existing timer
    if (timer) clearTimeout(timer);

    toast.textContent = message;
    toast.classList.add('show');

    timer = setTimeout(() => {
      toast.classList.remove('show');
      timer = null;
    }, duration);
  }

  return { show };
})();

/* ─────────────────────────────────────────────────────────────
   4. AUTHENTICATION
───────────────────────────────────────────────────────────── */
const Auth = (() => {

  /**
   * Handle login form submission
   */
  function doLogin() {
    const idInput   = $('login-id');
    const passInput = $('login-pass');
    const id   = idInput ? idInput.value.trim() : '';
    const pass = passInput ? passInput.value.trim() : '';

    // Basic validation
    if (!id || !pass) {
      Toast.show('⚠️ Please enter your credentials.');
      return;
    }

    if (pass.length < 6) {
      Toast.show('⚠️ Password must be at least 6 characters.');
      return;
    }

    // Persist demo session
    Storage.save('lms_session', { id, role: AppState.currentRole, timestamp: Date.now() });

    // Navigate to app
    Navigation.showPage('app');
    Navigation.showSection('dashboard', $$('.nav-item')[0]);
  }

  /**
   * Handle signup form submission
   */
  function doSignup() {
    const firstName  = document.querySelector('#page-signup input[placeholder="First name"]');
    const lastName   = document.querySelector('#page-signup input[placeholder="Last name"]');
    const email      = document.querySelector('#page-signup input[type="email"]');
    const rollInput  = document.querySelector('#page-signup input[placeholder="NHS-2024-XXX"]');
    const passwords  = $$('#page-signup input[type="password"]');

    // Validate required fields
    if (!firstName?.value.trim() || !lastName?.value.trim()) {
      Toast.show('⚠️ Please enter your full name.');
      return;
    }

    if (!email?.value.trim() || !isValidEmail(email.value)) {
      Toast.show('⚠️ Please enter a valid email address.');
      return;
    }

    if (!rollInput?.value.trim()) {
      Toast.show('⚠️ Please enter your Roll Number / Employee ID.');
      return;
    }

    if (passwords.length >= 2) {
      const pw1 = passwords[0].value;
      const pw2 = passwords[1].value;

      if (pw1.length < 6) {
        Toast.show('⚠️ Password must be at least 6 characters.');
        return;
      }

      if (pw1 !== pw2) {
        Toast.show('⚠️ Passwords do not match.');
        return;
      }
    }

    Toast.show('✅ Account created! Please sign in.');
    setTimeout(() => Navigation.showPage('login'), 1500);
  }

  /**
   * Handle logout
   */
  function doLogout() {
    Storage.remove('lms_session');
    Navigation.showPage('login');
    Toast.show('👋 You have been signed out.');
  }

  /**
   * Set active role tab
   * @param {string} role
   * @param {Element} el
   */
  function setRole(role, el) {
    AppState.currentRole = role;
    $$('.role-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }

  /**
   * Basic email validation
   * @param {string} email
   * @returns {boolean}
   */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  return { doLogin, doSignup, doLogout, setRole };
})();

/* ─────────────────────────────────────────────────────────────
   5. NAVIGATION
───────────────────────────────────────────────────────────── */
const Navigation = (() => {

  const sectionTitles = {
    dashboard:  'Dashboard',
    attendance: 'Attendance Record',
    results:    'Results & Grades',
    fees:       'Fee Record',
    profile:    'My Profile',
    timetable:  'Class Timetable',
    notices:    'Notice Board',
    parent:     'Parent Portal'
  };

  /**
   * Show a top-level page
   * @param {string} name - page id suffix (login | signup | app)
   */
  function showPage(name) {
    $$('.page').forEach(p => p.classList.remove('active'));
    const page = $('page-' + name);
    if (page) page.classList.add('active');
  }

  /**
   * Show a section within the app
   * @param {string} name - section id suffix
   * @param {Element|null} [navEl] - nav item that was clicked
   */
  function showSection(name, navEl) {
    // Update sections
    $$('.section-view').forEach(s => s.classList.remove('active'));
    const section = $('section-' + name);
    if (section) section.classList.add('active');

    // Update nav items
    $$('.nav-item').forEach(n => n.classList.remove('active'));
    if (navEl) navEl.classList.add('active');

    // Update topbar title
    setText('topbar-title', sectionTitles[name] || name);

    // Store state
    AppState.currentSection = name;

    // Close mobile sidebar if open
    Sidebar.close();

    // Animate progress bars when attendance section opens
    if (name === 'attendance' || name === 'results') {
      setTimeout(Animations.runProgressBars, 100);
    }
  }

  return { showPage, showSection };
})();

/* ─────────────────────────────────────────────────────────────
   6. SIDEBAR (MOBILE DRAWER)
───────────────────────────────────────────────────────────── */
const Sidebar = (() => {

  function open() {
    const sidebar  = document.querySelector('.sidebar');
    const overlay  = document.querySelector('.sidebar-overlay');
    if (sidebar)  sidebar.classList.add('open');
    if (overlay)  overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    const sidebar  = document.querySelector('.sidebar');
    const overlay  = document.querySelector('.sidebar-overlay');
    if (sidebar)  sidebar.classList.remove('open');
    if (overlay)  overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  function toggle() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && sidebar.classList.contains('open')) {
      close();
    } else {
      open();
    }
  }

  return { open, close, toggle };
})();

/* ─────────────────────────────────────────────────────────────
   7. AVATAR UPLOAD
───────────────────────────────────────────────────────────── */
const AvatarManager = (() => {

  function handleUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      Toast.show('⚠️ Please select an image file.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      Toast.show('⚠️ Image must be smaller than 5MB.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const url = e.target.result;
      AppState.profilePhotoUrl = url;

      // Update profile avatar
      const profileAv = $('profile-avatar-display');
      if (profileAv) profileAv.innerHTML = `<img src="${url}" alt="Profile Photo">`;

      // Update sidebar avatar
      const sidebarAv = $('sidebar-avatar-wrap');
      if (sidebarAv) {
        sidebarAv.innerHTML = `<img src="${url}" alt="Profile" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
      }

      // Persist to localStorage
      Storage.save('lms_avatar', url);

      Toast.show('✅ Profile photo updated!');
    };

    reader.onerror = () => {
      Toast.show('❌ Failed to read image. Please try again.');
    };

    reader.readAsDataURL(file);
  }

  /**
   * Restore saved avatar on load
   */
  function restore() {
    const saved = Storage.load('lms_avatar');
    if (!saved) return;

    AppState.profilePhotoUrl = saved;

    const profileAv = $('profile-avatar-display');
    if (profileAv) profileAv.innerHTML = `<img src="${saved}" alt="Profile Photo">`;

    const sidebarAv = $('sidebar-avatar-wrap');
    if (sidebarAv) {
      sidebarAv.innerHTML = `<img src="${saved}" alt="Profile" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
    }
  }

  return { handleUpload, restore };
})();

/* ─────────────────────────────────────────────────────────────
   8. ANIMATIONS
───────────────────────────────────────────────────────────── */
const Animations = {

  /**
   * Animate all progress bars from 0 to their target width
   */
  runProgressBars() {
    $$('.progress-bar').forEach((bar) => {
      const targetWidth = bar.dataset.width || bar.getAttribute('data-width') || '0%';
      bar.style.width = '0';

      // Small delay to trigger CSS transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bar.style.width = targetWidth;
        });
      });
    });

    // Also animate result bars
    $$('.result-bar').forEach((bar) => {
      const targetWidth = bar.dataset.width || '0%';
      bar.style.width = '0';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bar.style.width = targetWidth;
        });
      });
    });
  },

  /**
   * Stagger-animate stat cards on dashboard load
   */
  animateStatCards() {
    $$('.stat-card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(12px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 80 * i);
    });
  }
};

/* ─────────────────────────────────────────────────────────────
   9. FORM VALIDATION
───────────────────────────────────────────────────────────── */
const FormValidator = {

  /**
   * Show/hide inline error for an input
   * @param {HTMLInputElement} input
   * @param {string} message
   */
  setError(input, message) {
    input.classList.add('is-invalid');
    let errEl = input.nextElementSibling;
    if (!errEl || !errEl.classList.contains('form-error')) {
      errEl = document.createElement('span');
      errEl.className = 'form-error';
      input.after(errEl);
    }
    errEl.textContent = message;
    errEl.classList.add('visible');
  },

  /**
   * Clear error state for an input
   * @param {HTMLInputElement} input
   */
  clearError(input) {
    input.classList.remove('is-invalid');
    const errEl = input.nextElementSibling;
    if (errEl && errEl.classList.contains('form-error')) {
      errEl.classList.remove('visible');
    }
  }
};

/* ─────────────────────────────────────────────────────────────
   10. LOCAL STORAGE PERSISTENCE
───────────────────────────────────────────────────────────── */
const Storage = {

  /**
   * Save data to localStorage
   * @param {string} key
   * @param {*} value
   */
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage.save failed:', e);
    }
  },

  /**
   * Load data from localStorage
   * @param {string} key
   * @returns {*|null}
   */
  load(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.warn('Storage.load failed:', e);
      return null;
    }
  },

  /**
   * Remove a key from localStorage
   * @param {string} key
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('Storage.remove failed:', e);
    }
  }
};

/* ─────────────────────────────────────────────────────────────
   11. DATE / TIME DISPLAY
───────────────────────────────────────────────────────────── */
function initDateDisplay() {
  const el = $('topbar-date');
  if (!el) return;

  const now = new Date();
  el.textContent = now.toLocaleDateString('en-PK', {
    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric'
  });
}

/* ─────────────────────────────────────────────────────────────
   12. EVENT LISTENERS
───────────────────────────────────────────────────────────── */
function bindEvents() {

  /* ── Auth ── */

  // Login button
  const loginBtn = document.querySelector('#page-login .btn-primary');
  if (loginBtn) loginBtn.addEventListener('click', Auth.doLogin);

  // Allow Enter key on login form
  [$('login-id'), $('login-pass')].forEach(input => {
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') Auth.doLogin();
      });
    }
  });

  // Signup button
  const signupBtn = document.querySelector('#page-signup .btn-primary');
  if (signupBtn) signupBtn.addEventListener('click', Auth.doSignup);

  // Go to signup link
  const toSignup = document.querySelector('#page-login .auth-switch a');
  if (toSignup) toSignup.addEventListener('click', () => Navigation.showPage('signup'));

  // Go to login link
  const toLogin = document.querySelector('#page-signup .auth-switch a');
  if (toLogin) toLogin.addEventListener('click', () => Navigation.showPage('login'));

  // Logout button
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) logoutBtn.addEventListener('click', Auth.doLogout);

  /* ── Role Tabs ── */
  $$('.role-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const role = tab.textContent.trim().toLowerCase().replace(/[^a-z]/g, '');
      Auth.setRole(role, tab);
    });
  });

  /* ── Navigation items ── */
  $$('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const section = item.dataset.section;
      if (section) Navigation.showSection(section, item);
    });
  });

  /* ── Hamburger (mobile) ── */
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) hamburger.addEventListener('click', Sidebar.toggle);

  /* ── Overlay click to close sidebar ── */
  const overlay = document.querySelector('.sidebar-overlay');
  if (overlay) overlay.addEventListener('click', Sidebar.close);

  /* ── Avatar upload ── */
  const avatarUpload = $('avatar-upload');
  if (avatarUpload) avatarUpload.addEventListener('change', AvatarManager.handleUpload);

  const avatarEditBtn = document.querySelector('.avatar-edit-btn');
  if (avatarEditBtn) avatarEditBtn.addEventListener('click', () => avatarUpload?.click());

  /* ── Save profile button ── */
  const saveBtn = document.querySelector('.save-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      Toast.show('✅ Profile information saved!');
    });
  }

  /* ── Pay fee buttons ── */
  $$('.pay-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      Toast.show('✅ Redirecting to payment gateway...');
    });
  });

  /* ── Contact school button ── */
  const contactBtn = document.querySelector('#section-parent .pay-btn');
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      Toast.show('✅ Message sent to school administration!');
    });
  }

  /* ── Real-time validation for login fields ── */
  const loginId = $('login-id');
  if (loginId) {
    loginId.addEventListener('input', () => FormValidator.clearError(loginId));
  }

  const loginPass = $('login-pass');
  if (loginPass) {
    loginPass.addEventListener('input', () => FormValidator.clearError(loginPass));
  }
}

/* ─────────────────────────────────────────────────────────────
   INITIALISATION
───────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  // Bind all event listeners
  bindEvents();

  // Set date in topbar
  initDateDisplay();

  // Restore saved avatar
  AvatarManager.restore();

  // Set initial data-width attributes from inline styles
  // (allows CSS transitions via JS-controlled data attributes)
  $$('.progress-bar').forEach(bar => {
    if (!bar.dataset.width && bar.style.width) {
      bar.dataset.width = bar.style.width;
      bar.style.width = '0';
    }
  });

  $$('.result-bar').forEach(bar => {
    if (!bar.dataset.width && bar.style.width) {
      bar.dataset.width = bar.style.width;
      bar.style.width = '0';
    }
  });

  // Animate stat cards if already on dashboard
  setTimeout(Animations.animateStatCards, 150);

  // Check for saved session (demo only — replace with real auth)
  const session = Storage.load('lms_session');
  if (session && (Date.now() - session.timestamp) < 3600000) {
    // Session valid within 1 hour — auto-navigate to app
    // (Disabled in demo; uncomment to enable)
    // Navigation.showPage('app');
    // Navigation.showSection('dashboard', $$('.nav-item')[0]);
  }
});
