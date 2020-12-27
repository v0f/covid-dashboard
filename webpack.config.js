module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  externals: ({ request }, callback) => {
    if (/xlsx|canvg|pdfmake/.test(request)) {
      return callback(null, `commonjs ${request}`);
    }
    return callback();
  },
};
