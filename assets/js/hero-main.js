// Hero 主控制器（優化版）
// assets/js/hero-main.js

// 全域狀態管理
window.HeroState = {
  activeTextId: null,
  isAnimating: false,
  modules: {
    textEffects: null,
    backgroundText: null
  }
};

// 主要初始化函數
document.addEventListener('DOMContentLoaded', function() {
  // 檢查是否為 Hero 頁面
  const heroContainer = document.querySelector('.hero-container');
  if (!heroContainer) {
    return;
  }

  // 檢查 GSAP 是否載入
  if (typeof gsap === 'undefined') {
    return;
  }

  // 初始化自定義緩動
  if (typeof CustomEase !== 'undefined') {
    CustomEase.create("heroEase", "0.86, 0, 0.07, 1");
    CustomEase.create("heroMouseEase", "0.25, 0.1, 0.25, 1");
  }

  // 等待字體載入完成
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
  // 等待其他模組載入後再初始化
  const checkModules = () => {
    if (window.TextEffects && window.BackgroundText) {
      // 初始化各模組
      window.HeroState.modules.textEffects = new window.TextEffects();
      window.HeroState.modules.backgroundText = new window.BackgroundText();
      
    } else {
      setTimeout(checkModules, 50);
    }
  };
  
  checkModules();
}

function setupGlobalEvents() {
  // 響應式處理
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // 通知各模組響應式變化
      Object.values(window.HeroState.modules).forEach(module => {
        if (module && typeof module.handleResize === 'function') {
          module.handleResize();
        }
      });
    }, 250);
  });

  // 滑鼠離開整個 hero 區域時重置狀態
  const heroContainer = document.querySelector('.hero-container');
  if (heroContainer) {
    heroContainer.addEventListener('mouseleave', function() {
      if (window.HeroState.activeTextId) {
        resetHeroState();
      }
    });
  }
}

// 重置 Hero 狀態
function resetHeroState() {
  window.HeroState.activeTextId = null;
  window.HeroState.isAnimating = false;
  
  // 通知各模組重置
  Object.values(window.HeroState.modules).forEach(module => {
    if (module && typeof module.reset === 'function') {
      module.reset();
    }
  });
}

// 公共方法
window.HeroMain = {
  setActiveText: function(textId) {
    if (window.HeroState.isAnimating) return;
    
    const previousId = window.HeroState.activeTextId;
    window.HeroState.activeTextId = textId;
    
    
    // 通知各模組活動文字變化
    Object.values(window.HeroState.modules).forEach(module => {
      if (module && typeof module.onActiveTextChange === 'function') {
        module.onActiveTextChange(textId, previousId);
      }
    });
  },
  
  clearActiveText: function() {
    const previousId = window.HeroState.activeTextId;
    window.HeroState.activeTextId = null;
    
    
    // 通知各模組清除活動狀態
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