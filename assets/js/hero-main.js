// Hero main controller (optimized)
// assets/js/hero-main.js

// Global state management
window.HeroState = {
  activeTextId: null,
  isAnimating: false,
  modules: {
    textEffects: null,
    backgroundText: null
  }
};

// Main initialization function
document.addEventListener('DOMContentLoaded', function() {
  // Check if this is a Hero page
  const heroContainer = document.querySelector('.hero-container');
  if (!heroContainer) {
    return;
  }

  // Check if GSAP is loaded
  if (typeof gsap === 'undefined') {
    return;
  }

  // Initialize custom easing functions
  if (typeof CustomEase !== 'undefined') {
    CustomEase.create("heroEase", "0.86, 0, 0.07, 1");
    CustomEase.create("heroMouseEase", "0.25, 0.1, 0.25, 1");
  }

  // Wait for fonts to load
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(initializeHero);
  } else {
    setTimeout(initializeHero, 200);
  }
});

function initializeHero() {
  initializeModules();
  setupGlobalEvents();
}

function initializeModules() {
  // Wait for other modules to load before initializing
  const checkModules = () => {
    if (window.TextEffects && window.BackgroundText) {
      // Initialize each module
      window.HeroState.modules.textEffects = new window.TextEffects();
      window.HeroState.modules.backgroundText = new window.BackgroundText();
      
    } else {
      setTimeout(checkModules, 50);
    }
  };
  
  checkModules();
}

function setupGlobalEvents() {
  // Handle responsive adjustments
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Notify all modules of responsive changes
      Object.values(window.HeroState.modules).forEach(module => {
        if (module && typeof module.handleResize === 'function') {
          module.handleResize();
        }
      });
    }, 250);
  });

  // Reset state when mouse leaves hero area
  const heroContainer = document.querySelector('.hero-container');
  if (heroContainer) {
    heroContainer.addEventListener('mouseleave', function() {
      if (window.HeroState.activeTextId) {
        resetHeroState();
      }
    });
  }
}

// Reset Hero state
function resetHeroState() {
  window.HeroState.activeTextId = null;
  window.HeroState.isAnimating = false;
  
  // Notify all modules to reset
  Object.values(window.HeroState.modules).forEach(module => {
    if (module && typeof module.reset === 'function') {
      module.reset();
    }
  });
}

// Public methods
window.HeroMain = {
  setActiveText: function(textId) {
    if (window.HeroState.isAnimating) return;
    
    const previousId = window.HeroState.activeTextId;
    window.HeroState.activeTextId = textId;
    
    
    // Notify all modules of active text change
    Object.values(window.HeroState.modules).forEach(module => {
      if (module && typeof module.onActiveTextChange === 'function') {
        module.onActiveTextChange(textId, previousId);
      }
    });
  },
  
  clearActiveText: function() {
    const previousId = window.HeroState.activeTextId;
    window.HeroState.activeTextId = null;
    
    
    // Notify all modules to clear active state
    Object.values(window.HeroState.modules).forEach(module => {
      if (module && typeof module.onActiveTextClear === 'function') {
        module.onActiveTextClear(previousId);
      }
    });
  },
  
  setAnimating: function(isAnimating) {
    window.HeroState.isAnimating = isAnimating;
  },
  
  getState: function() {
    return window.HeroState;
  }
};