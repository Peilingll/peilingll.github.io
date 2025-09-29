// tailwind.config.js
module.exports = {
    content: [
      "./layouts/**/*.{html,js}",   // 掃描 Hugo layouts
      "./content/**/*.{md,html}",   // 掃描 Hugo content
      "./assets/**/*.{css,js}"      // 掃描 Hugo assets
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
  }
  