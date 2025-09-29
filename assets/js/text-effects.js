// 大字互動效果模組
// assets/js/text-effects.js

window.TextEffects = function() {
  const self = this;
  let mainTextRows = [];
  let splitTexts = {};

  // 初始化
  this.init = function() {
    mainTextRows = document.querySelectorAll('.main-text-row');
    
    if (mainTextRows.length === 0) {
      return;
    }

    // 為每個大字創建字符分割
    mainTextRows.forEach(row => {
      const textElement = row.querySelector('.main-text');
      const textId = row.dataset.id;
      
      if (textElement && textId) {
        splitTexts[textId] = createCharacterSplit(textElement);
        setupRowEvents(row, textId);
      }
    });

  };
function createCharacterSplit(textElement) {
  const originalText = textElement.textContent;
  const chars = [];
  
  textElement.innerHTML = '';
  textElement.style.display = 'flex';
  textElement.style.alignItems = 'center';
  
  for (let i = 0; i < originalText.length; i++) {
    const char = originalText[i];
    
    if (char === ' ') {
      const spaceSpan = document.createElement('span');
      spaceSpan.innerHTML = '&nbsp;';
      spaceSpan.style.width = '0.5em';
      textElement.appendChild(spaceSpan);
      continue;
    }

    const charWrapper = document.createElement('span');
    charWrapper.className = 'char-wrapper';
    charWrapper.style.cssText = `
      display: inline-flex;
      align-items: center;
      position: relative;
    `;
    
    const charSpan = document.createElement('span');
    charSpan.className = 'char';
    charSpan.textContent = char;
    
    const divider = document.createElement('span');
    divider.className = 'char-divider';
    divider.style.cssText = `
      width: 2px;
      height: 1em;
      background: currentColor;
      opacity: 0;
      margin: 0;
      transition: all 0.4s ease;
    `;
    
    charWrapper.appendChild(charSpan);
    if (i < originalText.length - 1) { // 不在最後一個字母後加分割線
      charWrapper.appendChild(divider);
    }
    
    textElement.appendChild(charWrapper);
    chars.push(charWrapper);
  }
  
  return { chars, originalText };
}

  // 設置行事件
  function setupRowEvents(row, textId) {
    const interactiveArea = row.querySelector('.interactive-area');
    const textElement = row.querySelector('.main-text');
    
    if (!interactiveArea || !textElement) return;

    // 滑鼠進入
    interactiveArea.addEventListener('mouseenter', function() {
      handleMouseEnter(row, textId);
    });

    // 滑鼠離開
    interactiveArea.addEventListener('mouseleave', function() {
      handleMouseLeave(row, textId);
    });

    // 點擊支持（移動設備）
    interactiveArea.addEventListener('click', function() {
      handleClick(row, textId);
    });
  }

  // 滑鼠進入處理
  function handleMouseEnter(row, textId) {
    if (window.HeroState.activeTextId === textId) return;

    // 更新全域狀態
    window.HeroMain.setActiveText(textId);
    
    // 添加活動狀態
    row.classList.add('active');
    
    // 執行字符展開動畫
    animateTextExpand(textId);
    
    // 文字顏色變化
    const textElement = row.querySelector('.main-text');
    gsap.to(textElement, {
      duration: 0.5,
      color: 'var(--main-text-hover-color)',
      scale: 1.05,
      ease: "power2.out"
    });
  }

  // 滑鼠離開處理
  function handleMouseLeave(row, textId) {
    if (window.HeroState.activeTextId !== textId) return;

    // 清除全域狀態
    window.HeroMain.clearActiveText();
    
    // 移除活動狀態
    row.classList.remove('active');
    
    // 執行字符收縮動畫
    animateTextCollapse(textId);
    
    // 恢復文字樣式
    const textElement = row.querySelector('.main-text');
    gsap.to(textElement, {
      duration: 0.5,
      color: 'var(--main-text-color)',
      scale: 1,
      ease: "power2.out"
    });
  }

  // 點擊處理（移動設備）
  function handleClick(row, textId) {
    if (window.HeroState.activeTextId === textId) {
      handleMouseLeave(row, textId);
    } else {
      // 先清除其他活動狀態
      mainTextRows.forEach(otherRow => {
        if (otherRow !== row && otherRow.classList.contains('active')) {
          const otherTextId = otherRow.dataset.id;
          handleMouseLeave(otherRow, otherTextId);
        }
      });
      
      handleMouseEnter(row, textId);
    }
  }

function createCharacterSplit(textElement) {
  const originalText = textElement.textContent;
  const chars = [];
  
  textElement.innerHTML = '';
  textElement.style.display = 'flex';
  textElement.style.position = 'relative';
  
  for (let i = 0; i < originalText.length; i++) {
    const char = originalText[i];
    
    if (char === ' ') {
      const spaceSpan = document.createElement('span');
      spaceSpan.innerHTML = '&nbsp;';
      spaceSpan.style.width = '0.5em';
      textElement.appendChild(spaceSpan);
      continue;
    }

    // 字母容器
    const charWrapper = document.createElement('span');
    charWrapper.className = 'char-wrapper';
    charWrapper.style.cssText = `
      position: relative;
      display: inline-block;
      overflow: hidden;
    `;
    
    // 字母本身
    const charSpan = document.createElement('span');
    charSpan.className = 'char';
    charSpan.textContent = char;
    charSpan.style.cssText = `
      display: inline-block;
      position: relative;
      z-index: 1;
      transition: transform 0.4s ease;
    `;
    
    // 分割線（固定位置）
    const divider = document.createElement('span');
    divider.className = 'char-divider';
    divider.style.cssText = `
      position: absolute;
      right: -1px;
      top: 50px;
      height: 50%;
      width: 2px;
      background: currentColor;
      opacity: 0;
      z-index: 2;
      transition: opacity 0.4s ease;
    `;
    
    charWrapper.appendChild(charSpan);
    charWrapper.appendChild(divider);
    textElement.appendChild(charWrapper);
    chars.push({wrapper: charWrapper, char: charSpan, divider: divider});
  }
  
  return { chars, originalText };
}

function animateTextExpand(textId) {
  const split = splitTexts[textId];
  if (!split || !split.chars) return;

  split.chars.forEach((item, i) => {
    // 字母向左移動
    gsap.to(item.char, {
      x: 15,
      duration: 0.4,
      delay: i * 0.02,
      ease: "power2.out"
    });
    
    // 分割線顯示（不移動）
    gsap.to(item.divider, {
      opacity: 0.5,
      duration: 0.3,
      delay: i * 0.02,
      ease: "power2.out"
    });
  });
}

function animateTextCollapse(textId) {
  const split = splitTexts[textId];
  if (!split || !split.chars) return;

  split.chars.forEach((item, i) => {
    // 字母恢復
    gsap.to(item.char, {
      x: 0,
      duration: 0.4,
      delay: i * 0.01,
      ease: "power2.out"
    });
    
    // 分割線隱藏
    gsap.to(item.divider, {
      opacity: 0,
      duration: 0.3,
      delay: i * 0.01,
      ease: "power2.out"
    });
  });
}

  // 響應式處理
  this.handleResize = function() {
    // 重新計算字符寬度
    Object.keys(splitTexts).forEach(textId => {
      const split = splitTexts[textId];
      if (split && split.chars) {
        const isMobile = window.innerWidth < 768;
        const baseWidth = isMobile ? 40 : 60;
        const expandWidth = isMobile ? 60 : 100;
        
        split.chars.forEach(charItem => {
          // 檢查 charItem 是否有 char 屬性（DOM 元素）
          if (charItem && charItem.char && charItem.char.style) {
            charItem.char.style.maxWidth = baseWidth + 'px';
            charItem.char.dataset.expandWidth = expandWidth;
          }
        });
      }
    });
  };

  // 重置所有文字效果
  this.reset = function() {
    mainTextRows.forEach(row => {
      const textId = row.dataset.id;
      if (row.classList.contains('active')) {
        handleMouseLeave(row, textId);
      }
    });
  };

  // 活動文字變化時的回調
  this.onActiveTextChange = function(newTextId, previousTextId) {
    if (previousTextId && previousTextId !== newTextId) {
      const previousRow = document.querySelector(`[data-id="${previousTextId}"]`);
      if (previousRow) {
        handleMouseLeave(previousRow, previousTextId);
      }
    }
  };

  // 活動文字清除時的回調
  this.onActiveTextClear = function(previousTextId) {
    if (previousTextId) {
      const previousRow = document.querySelector(`[data-id="${previousTextId}"]`);
      if (previousRow) {
        handleMouseLeave(previousRow, previousTextId);
      }
    }
  };

  // 自動初始化
  this.init();
};