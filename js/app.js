// Fix import statements to correctly import the default exports
import themes from './themes.js';

class AppManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.lastScrollTop = 0;
    this.scrollThreshold = 100;
    this.navbar = document.querySelector('.navbar');
    this.init();
    console.log('AppManager constructor called');
  }

  init() {
    console.log('AppManager initializing...');
    this.setupTheme();
    this.setupNavbar();
    this.setupEventListeners();
    console.log('AppManager initialized successfully');
  }

  setupTheme() {
    if (this.currentTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
    this.applyTheme(this.currentTheme);
  }

  setupNavbar() {
    // Add navbar scroll effects
    window.addEventListener('scroll', () => {
      this.handleScroll();
    });
  }

  setupEventListeners() {
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    console.log('Theme toggle element:', themeToggle);
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        console.log('Theme toggle clicked');
        this.toggleTheme();
      });
      console.log('Theme toggle event listener added');
    } else {
      console.error('Theme toggle element not found');
    }
  }

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class for enhanced styling
    if (scrollTop > this.scrollThreshold) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }

    // Hide/show navbar on scroll
    if (scrollTop > this.lastScrollTop && scrollTop > 200) {
      this.navbar.classList.add('hidden');
    } else {
      this.navbar.classList.remove('hidden');
    }
    
    this.lastScrollTop = scrollTop;
  }

  toggleTheme() {
    console.log('Toggle theme called, current theme:', this.currentTheme);
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    console.log('New theme:', this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
    
    if (this.currentTheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    
    this.applyTheme(this.currentTheme);
    this.updateThemeIcon();
    console.log('Theme toggle completed');
  }

  applyTheme(theme) {
    const themeVars = themes[theme];
    Object.entries(themeVars).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
  }

  updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-toggle svg');
    if (themeIcon) {
      if (this.currentTheme === 'dark') {
        themeIcon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        `;
      } else {
        themeIcon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        `;
      }
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AppManager();
});

export default AppManager;