module.exports = {  
  entry: './src/app_cv/models/App.ts',
  output: {
    filename: './src/public/scripts/cv.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
}