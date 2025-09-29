document.addEventListener("DOMContentLoaded", () => {
    const balls = document.querySelectorAll(".dynamic-bg > div"); // 外層
  
    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 100;
      const y = (e.clientY / window.innerHeight - 0.5) * 100;
  
      balls.forEach((ball, i) => {
        // 可以在 HTML 上設 data-factor-x / data-factor-y
        const fx = parseFloat(ball.dataset.factorX) || (i % 2 === 0 ? (i + 1) * 0.8 : -(i + 1) * 2);
        const fy = parseFloat(ball.dataset.factorY) || (i % 2 === 0 ? -(i + 1) * 0.5 : (i + 1) * 0.7);
  
        const tx = x * fx;
        const ty = y * fy;
  
        ball.style.transition = "transform 0.3s ease-out";
        ball.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      });
    });
  });
  