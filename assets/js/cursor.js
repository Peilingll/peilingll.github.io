document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.getElementById("custom-cursor");
    
    if (!cursor) {
      return;
    }

  
    // 游標跟隨滑鼠
    document.addEventListener("mousemove", (e) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    });


    
    // 添加 hover 效果
    const hoverElements = document.querySelectorAll("a, button, .main-text-row, .bg-text");
    
    hoverElements.forEach(element => {
      element.addEventListener("mouseenter", () => {
        cursor.classList.add("hover");
      });
      
      element.addEventListener("mouseleave", () => {
        cursor.classList.remove("hover");
      });
    });
  });
  