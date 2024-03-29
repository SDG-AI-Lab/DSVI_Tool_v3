module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      opacity: {
        1: '1',
        2: '.2',
        3: '.3',
        4: '.4',
        5: '.5',
        6: '.6',
        7: '.7',
        8: '.8',
        9: '.9',
        10: '.10',
        11: '.11',
        12: '.12',
        13: '.13',
        14: '.14',
        15: '.15',
        16: '.16',
        17: '.17',
        18: '.18',
        19: '.19',
        20: '.2',
        21: '.21',
        22: '.22',
        23: '.23',
        24: '.24',
        25: '.25',
        26: '.26',
        27: '.27',
        28: '.28',
        29: '.29',
        30: '.3',
        31: '.31',
        32: '.32',
        33: '.33',

        67: '.67',
      },
      maxWidth: {
        '1/2': '50%',
        '1/3': '33.33%',
        '2/3': '66.66%',
        '11/12': '91.667%',
      },
    },
  },
  plugins: [require('tailwind-scrollbar'), require('flowbite/plugin')],
}
