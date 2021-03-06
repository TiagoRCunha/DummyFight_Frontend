const { resolve, join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')

const ROOT = resolve(__dirname)

module.exports = {
  context: resolve(ROOT, 'src'),
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      resolve(ROOT, './src/index.tsx')
    ]
  },
  output: {
    filename: 'bundle.js',
    path: resolve(ROOT, '/dist'),
    publicPath: resolve(ROOT, '/public')
  },
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    hot: true,
    contentBase: join(ROOT, '/public'),
    port: 3000,
    disableHostCheck: true,
    compress: false,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'cache-loader',
          {
            loader: 'thread-loader',
            options: {
              workers: require('os').cpus().length - 1
            }
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
              configFile: resolve(ROOT, 'tsconfig.json')
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[contenthash].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@config': resolve(ROOT, 'src/config'),
      '@domain': resolve(ROOT, 'src/domain'),
      '@mocks': resolve(ROOT, 'src/mocks'),
      '@modules': resolve(ROOT, 'src/modules'),
      '@pages': resolve(ROOT, 'src/pages'),
      '@store': resolve(ROOT, 'src/store'),
      '@theme': resolve(ROOT, 'src/theme'),
      '@domain/Entities': resolve(ROOT, 'src/domain/Entities'),
      '@domain/Events': resolve(ROOT, 'src/domain/Events'),
      '@domain/Mappers': resolve(ROOT, 'src/domain/Mappers'),
      '@domain/Repository': resolve(ROOT, 'src/domain/Repository'),
      '@domain/Shared': resolve(ROOT, 'src/domain/Shared'),
      '@domain/UseCases': resolve(ROOT, 'src/domain/UseCases')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement'
    }),
    new ForkTsCheckerPlugin({
      checkSyntacticErrors: false,
      tsconfig: resolve(ROOT, 'tsconfig.json')
    })
  ]
}
