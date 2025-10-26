document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.getElementById("custom-cursor");
    
    if (!cursor) {
      return;
    }

  
    // Cursor follows mouse movement
    document.addEventListener("mousemove", (e) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    });


    
    // Add hover effect
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
  