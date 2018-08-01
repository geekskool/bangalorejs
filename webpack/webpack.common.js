const path = require('path')

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, '../public/js'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
      //,
      // Not necessary unless you consume a module using `createClass`
      //'create-react-class': 'preact-compat/lib/create-react-class'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-2']
          }
        }
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
