const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'postcss-loader',
        ],
      },
    ],
  },
};