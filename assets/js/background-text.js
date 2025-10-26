// Background text effects module (optimized)
// assets/js/background-text.js

window.BackgroundText = function() {
  const self = this;
  let bgTextElements = [];
  let typingInterval = null;

  // Initialize the module
  this.init = function() {
    bgTextElements = Array.from(document.querySelectorAll('.bg-text'));
    
    if (bgTextElements.length === 0) {
      return;
    }

    // Initialize each background text element
    bgTextElements.forEach((element, index) => {
      setupBgTextElement(element, index);
    });

    // Start automatic typing effect
    startAutoTyping();
    
    // Start random flicker effect
    setTimeout(startRandomFlicker, 3000);
    
  };

  // Setup background text element
  function setupBgTextElement(element, index) {
    const originalText = element.textContent;
    element.dataset.originalText = originalText;
    element.dataset.index = index;
    
    // Initial state
    element.style.opacity = '0';
    
    // Random delay for display
    gsap.delayedCall(index * 0.2, function() {
      gsap.to(element, {
        opacity: 0.8,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  }

  // Start automatic typing animation
  function startAutoTyping() {
    if (typingInterval) clearInterval(typingInterval);
    
    // Randomly select an element for typing animation every 3-5 seconds
    const startRandomTyping = () => {
      if (bgTextElements.length > 0) {
        const randomElement = bgTextElements[Math.floor(Math.random() * bgTextElements.length)];
        performTypingAnimation(randomElement);
      }
      
      // Schedule next execution
      const nextDelay = 3000 + Math.random() * 2000; // 3-5 seconds
      setTimeout(startRandomTyping, nextDelay);
    };
    
    // Initial delay of 2 seconds before starting
    setTimeout(startRandomTyping, 2000);
  }

  // Execute typing animation
  function performTypingAnimation(element) {
    if (!element || element.classList.contains('typing-active')) return;
    
    const originalText = element.dataset.originalText;
    if (!originalText) return;


    element.classList.add('typing-active');
    element.textContent = '';
    
    // Create typing timeline
    const timeline = gsap.timeline({
      onComplete: function() {
        element.classList.remove('typing-active');
      }
    });

    // Character-by-character display effect
    let currentText = '';
    for (let i = 0; i <= originalText.length; i++) {
      timeline.call(() => {
        currentText = originalText.substring(0, i);
        element.textContent = currentText;
        
        // Blinking cursor effect
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

    // Remove cursor after completion
    timeline.call(() => {
      element.textContent = originalText;
    }, null, "+=0.5");
  }

  // Random flicker effect
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
      
      // Schedule next flicker
      const nextFlicker = 1000 + Math.random() * 3000; // 1-4 seconds
      setTimeout(flickerElement, nextFlicker);
    };
    
    flickerElement();
  }

  // Handle responsive adjustments
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

  // Reset background text to initial state
  this.reset = function() {
    // Stop typing animation
    if (typingInterval) {
      clearInterval(typingInterval);
      typingInterval = null;
    }
    
    // Reset all element states
    bgTextElements.forEach(element => {
      element.classList.remove('typing-active', 'flicker');
      element.textContent = element.dataset.originalText;
      
      gsap.set(element, {
        color: 'var(--bg-text-color)',
        opacity: 0.8
      });
    });
    
    // Restart automatic effects
    startAutoTyping();
  };

  // Callback when active text changes (simplified)
  this.onActiveTextChange = function(newTextId, previousTextId) {
    if (newTextId) {
      // Apply simple effects when text is selected
      bgTextElements.forEach(element => {
        gsap.to(element, {
          opacity: 0.6,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    }
  };

  // Callback when active text is cleared
  this.onActiveTextClear = function(previousTextId) {
    // Restore original opacity
    bgTextElements.forEach(element => {
      gsap.to(element, {
        opacity: 0.8,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  };

  // Public method: Add new background text
  this.addBackgroundText = function(text, style) {
    const element = document.createElement('div');
    element.className = 'bg-text';
    element.textContent = text;
    element.dataset.originalText = text;
    
    // Apply styles
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

  // Public method: Remove background text
  this.removeBackgroundText = function(index) {
    if (index >= 0 && index < bgTextElements.length) {
      const element = bgTextElements[index];
      element.remove();
      bgTextElements.splice(index, 1);
    }
  };

  // Public method: Trigger typing animation for a specific element
  this.triggerTyping = function(index) {
    if (index >= 0 && index < bgTextElements.length) {
      performTypingAnimation(bgTextElements[index]);
    }
  };

  // Auto-initialize on module load
  this.init();
};