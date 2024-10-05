/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3f51b5', // Couleur primaire d'Angular Material par défaut
          dark: '#303f9f'
        }
      }
    },
  },
  plugins: [],
}






// // tailwind.config.js
// const colors = require('tailwindcss/colors')

// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: '#86B817', 
//         secondary: '#FFFFFF', // Votre couleur secondaire qui est en conflit avec Bootstap, utilise plutot secondaryCustom
//         secondaryCustom: '#FFFFFF', // Nouvelle classe pour une spécificité accrue
//         tertiaire : '#000000', //pour certains titres titres 
//         light: '#F5F5F5',
//         dark: '#14141F',
//       },
//       fontFamily: {
//         sans: ['Nunito', 'sans-serif'],
//       },
//       fontWeight: {
//         medium: 600,
//         semibold: 700,
//       },
//       boxShadow: {
//         'service': '0 0 45px rgba(0, 0, 0, .08)',
//       },
//       transitionProperty: {
//         'size': 'width, height',
//       },
//     },
//   },
//   plugins: [],
//   variants: {
//     extend: {
//       scale: ['hover', 'group-hover'],
//       textColor: ['hover', 'group-hover'],
//       backgroundColor: ['hover', 'group-hover'],
//     },
//   },
// }