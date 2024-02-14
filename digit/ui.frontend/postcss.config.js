/** @type import('postcss').Postcss */
module.exports = ({ env }) => ({
  plugins: {
    'postcss-sorting': {},

    'postcss-pxtorem': {
      replace: true,
      rootValue: 16,
      unitPrecision: 5,

      selectorBlackList: ['html'],

      propList: [
        'bottom',
        'flex-basis',
        'font',
        'font-size',
        'height',
        'left',
        'line-height',
        'margin*',
        'padding*',
        'right',
        'top',
        '*width',
      ],
    },

    'postcss-reporter': {
      clearReportedMessages: true,
    },
  },

  sourceMap: true,
});
