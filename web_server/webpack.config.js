'use strict'

const path = require('path');
const nodeExternals = require('webpack-node-externals')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  externals: [nodeExternals()], //redis-hi 에러 교정
  target: 'node',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'src/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {from: 'proto/packet.proto', to: 'proto/packet.proto'}, //logManager 에서 .proto 를 직접 사용
        {from: 'proto/enum', to: 'proto/enum'},
        {from: 'conf', to: 'conf'},
        {from: 'db_sql', to: 'db_sql'},
      ]
    }),
  ]
};