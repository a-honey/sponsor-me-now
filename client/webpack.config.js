const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    fallback: {
      assert: false,
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true,
    open: true,
  },
};
