// 背景小字效果模組（優化版）
// assets/js/background-text.js

window.BackgroundText = function() {
  const self = this;
  let bgTextElements = [];
  let typingInterval = null;

  // 初始化
  this.init = function() {
    bgTextElements = Array.from(document.querySelectorAll('.bg-text'));
    
    if (bgTextElements.length === 0) {
      return;
    }

    // 初始化每個背景文字元素
    bgTextElements.forEach((element, index) => {
      setupBgTextElement(element, index);
    });

    // 開始自動 typing 效果
    startAutoTyping();
    
    // 開始隨機閃爍效果
    setTimeout(startRandomFlicker, 3000);
    
  };

  // 設置背景文字元素
  function setupBgTextElement(element, index) {
    const originalText = element.textContent;
    element.dataset.originalText = originalText;
    element.dataset.index = index;
    
    // 初始狀態
    element.style.opacity = '0';
    
    // 隨機延遲顯示
    gsap.delayedCall(index * 0.2, function() {
      gsap.to(element, {
        opacity: 0.8,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  }

  // 開始自動 typing 效果
  function startAutoTyping() {
    if (typingInterval) clearInterval(typingInterval);
    
    // 每 3-5 秒隨機選擇一個元素進行 typing 動畫
    const startRandomTyping = () => {
      if (bgTextElements.length > 0) {
        const randomElement = bgTextElements[Math.floor(Math.random() * bgTextElements.length)];
        performTypingAnimation(randomElement);
      }
      
      // 設置下次執行時間
      const nextDelay = 3000 + Math.random() * 2000; // 3-5秒
      setTimeout(startRandomTyping, nextDelay);
    };
    
    // 初次延遲 2 秒後開始
    setTimeout(startRandomTyping, 2000);
  }

  // 執行 typing 動畫
  function performTypingAnimation(element) {
    if (!element || element.classList.contains('typing-active')) return;
    
    const originalText = element.dataset.originalText;
    if (!originalText) return;


    element.classList.add('typing-active');
    element.textContent = '';
    
    // 創建 typing 時間軸
    const timeline = gsap.timeline({
      onComplete: function() {
        element.classList.remove('typing-active');
      }
    });

    // 逐字顯示效果
    let currentText = '';
    for (let i = 0; i <= originalText.length; i++) {
      timeline.call(() => {
        currentText = originalText.substring(0, i);
        element.textContent = currentText;
        
        // 閃爍光標效果
        if (i < originalText.length) {
          element.textContent += '|';
          setTimeout(() => {
            if (element.textContent.endsWith('|')) {
              element.textContent = element.textContent.slice(0, -1);
            }
          }, 300);
        }
      }, null, i * 0.1);
    }

    // 完成後移除光標
    timeline.call(() => {
      element.textContent = originalText;
    }, null, "+=0.5");
  }

  // 隨機閃爍效果
  function startRandomFlicker() {
    const flickerElement = () => {
      if (bgTextElements.length === 0) return;
      
      const randomElement = bgTextElements[Math.floor(Math.random() * bgTextElements.length)];
      
      if (!randomElement.classList.contains('typing-active')) {
        
        randomElement.classList.add('flicker');
        
        setTimeout(() => {
          randomElement.classList.remove('flicker');
        }, 300);
      }
      
      // 下次閃爍時間
      const nextFlicker = 1000 + Math.random() * 3000; // 1-4秒
      setTimeout(flickerElement, nextFlicker);
    };
    
    flickerElement();
  }

  // 響應式處理
  this.handleResize = function() {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;

    bgTextElements.forEach(element => {
      if (isMobile) {
        element.style.fontSize = '10px';
      } else if (isTablet) {
        element.style.fontSize = '12px';
      } else {
        element.style.fontSize = '14px';
      }
    });
  };

  // 重置背景文字
  this.reset = function() {
    // 停止 typing 動畫
    if (typingInterval) {
      clearInterval(typingInterval);
      typingInterval = null;
    }
    
    // 重置所有元素狀態
    bgTextElements.forEach(element => {
      element.classList.remove('typing-active', 'flicker');
      element.textContent = element.dataset.originalText;
      
      gsap.set(element, {
        color: 'var(--bg-text-color)',
        opacity: 0.8
      });
    });
    
    // 重新開始自動效果
    startAutoTyping();
  };

  // 活動文字變化回調（簡化版）
  this.onActiveTextChange = function(newTextId, previousTextId) {
    if (newTextId) {
      // 當有文字被選中時，可以添加一些簡單的效果
      bgTextElements.forEach(element => {
        gsap.to(element, {
          opacity: 0.6,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    }
  };

  // 活動文字清除回調
  this.onActiveTextClear = function(previousTextId) {
    // 恢復原始透明度
    bgTextElements.forEach(element => {
      gsap.to(element, {
        opacity: 0.8,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  };

  // 公共方法：添加新的背景文字
  this.addBackgroundText = function(text, style) {
    const element = document.createElement('div');
    element.className = 'bg-text';
    element.textContent = text;
    element.dataset.originalText = text;
    
    // 應用樣式
    if (style) {
      Object.assign(element.style, style);
    }
    
    const container = document.querySelector('.background-text-container');
    if (container) {
      container.appendChild(element);
      bgTextElements.push(element);
      setupBgTextElement(element, bgTextElements.length - 1);
    }
  };

  // 公共方法：移除背景文字
  this.removeBackgroundText = function(index) {
    if (index >= 0 && index < bgTextElements.length) {
      const element = bgTextElements[index];
      element.remove();
      bgTextElements.splice(index, 1);
    }
  };

  // 公共方法：立即觸發某個元素的 typing 動畫
  this.triggerTyping = function(index) {
    if (index >= 0 && index < bgTextElements.length) {
      performTypingAnimation(bgTextElements[index]);
    }
  };

  // 自動初始化
  this.init();
};