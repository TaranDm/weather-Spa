module.exports = {
  module: {
    rules: [
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^7.0.0
            options: {
              /* eslint-disable */
              implementation: require('sass'),
                /* eslint-enable */
              indentedSyntax: true, // optional
            },
          },
        ],
      },
    ],
  },
};
