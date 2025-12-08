// tailwind.config.js
module.exports = {
    content: [
      "./layouts/**/*.{html,js}",   
      "./content/**/*.{md,html}",   
      "./assets/**/*.{css,js}"      
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
  }
  