// Major text interactive effects module
// assets/js/text-effects.js

window.TextEffects = function() {
  const self = this;
  let mainTextRows = [];
  let splitTexts = {};

  // Initialize the text effects module
  this.init = function() {
    mainTextRows = document.querySelectorAll('.main-text-row');
    
    if (mainTextRows.length === 0) {
      return;
    }

    // Create character split for each major text row
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
    if (i < originalText.length - 1) { // Do not add divider after the last character
      charWrapper.appendChild(divider);
    }
    
    textElement.appendChild(charWrapper);
    chars.push(charWrapper);
  }
  
  return { chars, originalText };
  }

  // Setup event listeners for each text row
  function setupRowEvents(row, textId) {
    const interactiveArea = row.querySelector('.interactive-area');
    const textElement = row.querySelector('.main-text');
    
    if (!interactiveArea || !textElement) return;

    // Handle mouse enter event
    interactiveArea.addEventListener('mouseenter', function() {
      handleMouseEnter(row, textId);
    });

    // Handle mouse leave event
    interactiveArea.addEventListener('mouseleave', function() {
      handleMouseLeave(row, textId);
    });

    // Handle click events for mobile devices
    interactiveArea.addEventListener('click', function() {
      handleClick(row, textId);
    });
  }

  // Handle mouse enter interaction
  function handleMouseEnter(row, textId) {
    if (window.HeroState.activeTextId === textId) return;

    // Update global state
    window.HeroMain.setActiveText(textId);
    
    // Add active state class
    row.classList.add('active');
    
    // Execute character expand animation
    animateTextExpand(textId);
    
    // Apply text color and scale transitions
    const textElement = row.querySelector('.main-text');
    gsap.to(textElement, {
      duration: 0.5,
      color: 'var(--main-text-hover-color)',
      scale: 1.05,
      ease: "power2.out"
    });
  }

  // Handle mouse leave interaction
  function handleMouseLeave(row, textId) {
    if (window.HeroState.activeTextId !== textId) return;

    // Clear global state
    window.HeroMain.clearActiveText();
    
    // Remove active state class
    row.classList.remove('active');
    
    // Execute character collapse animation
    animateTextCollapse(textId);
    
    // Restore original text style
    const textElement = row.querySelector('.main-text');
    gsap.to(textElement, {
      duration: 0.5,
      color: 'var(--main-text-color)',
      scale: 1,
      ease: "power2.out"
    });
  }

  // Handle click interaction for mobile devices
  function handleClick(row, textId) {
    if (window.HeroState.activeTextId === textId) {
      handleMouseLeave(row, textId);
    } else {
      // Clear other active states first
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

    // Character container wrapper
    const charWrapper = document.createElement('span');
    charWrapper.className = 'char-wrapper';
    charWrapper.style.cssText = `
      position: relative;
      display: inline-block;
      overflow: hidden;
    `;
    
    // Character element itself
    const charSpan = document.createElement('span');
    charSpan.className = 'char';
    charSpan.textContent = char;
    charSpan.style.cssText = `
      display: inline-block;
      position: relative;
      z-index: 1;
      transition: transform 0.4s ease;
    `;
    
    // Divider element (fixed position)
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
    // Animate character to move left
    gsap.to(item.char, {
      x: 15,
      duration: 0.4,
      delay: i * 0.02,
      ease: "power2.out"
    });
    
    // Show divider without movement
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
    // Restore character to original position
    gsap.to(item.char, {
      x: 0,
      duration: 0.4,
      delay: i * 0.01,
      ease: "power2.out"
    });
    
    // Hide divider
    gsap.to(item.divider, {
      opacity: 0,
      duration: 0.3,
      delay: i * 0.01,
      ease: "power2.out"
    });
  });
  }

  // Handle responsive adjustments
  this.handleResize = function() {
    // Recalculate character widths based on viewport
    Object.keys(splitTexts).forEach(textId => {
      const split = splitTexts[textId];
      if (split && split.chars) {
        const isMobile = window.innerWidth < 768;
        const baseWidth = isMobile ? 40 : 60;
        const expandWidth = isMobile ? 60 : 100;
        
        split.chars.forEach(charItem => {
          // Verify charItem has valid char DOM element
          if (charItem && charItem.char && charItem.char.style) {
            charItem.char.style.maxWidth = baseWidth + 'px';
            charItem.char.dataset.expandWidth = expandWidth;
          }
        });
      }
    });
  };

  // Reset all text effects to initial state
  this.reset = function() {
    mainTextRows.forEach(row => {
      const textId = row.dataset.id;
      if (row.classList.contains('active')) {
        handleMouseLeave(row, textId);
      }
    });
  };

  // Callback when active text changes
  this.onActiveTextChange = function(newTextId, previousTextId) {
    if (previousTextId && previousTextId !== newTextId) {
      const previousRow = document.querySelector(`[data-id="${previousTextId}"]`);
      if (previousRow) {
        handleMouseLeave(previousRow, previousTextId);
      }
    }
  };

  // Callback when active text is cleared
  this.onActiveTextClear = function(previousTextId) {
    if (previousTextId) {
      const previousRow = document.querySelector(`[data-id="${previousTextId}"]`);
      if (previousRow) {
        handleMouseLeave(previousRow, previousTextId);
      }
    }
  };

  // Auto-initialize on module load
  this.init();
};