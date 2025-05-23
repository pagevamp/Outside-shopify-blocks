const miniCss = require('mini-css-extract-plugin');
const path = require('path');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = {
  mode: 'production',
  entry: {
    ni: ['./assets/scripts/script.js', './assets/styles/style.scss'],
    ni_styleguide: ['./assets/styles/styleguide.scss'],
    ob_leadspace: './assets/styles/ob-leadspace.scss',
    ob_leadspace_2: './assets/styles/ob-leadspace-2.scss',
    ni_payment_solution: './assets/styles/ni-payment-solution.scss',
    ni_ecomm_features: './assets/styles/ni-ecomm-features.scss',
    ni_online_payments: './assets/styles/ni-online-payments.scss',
    ni_payment_ecosystem: './assets/styles/ni-payment-ecosystem.scss'
  },
  output: {
    path: path.resolve(__dirname, '../assets/'),
    filename: '[name].min.js',
    // filename: pathData => {
    //   console.log(pathData.chunk.name.includes('leadspace'));
    //   if (
    //     pathData &&
    //     pathData.chunk &&
    //     pathData.chunk.name &&
    //     pathData.chunk.name.includes('leadspace')
    //   ) {
    //     return ''; // Do not output file for leadspace entry
    //   } else {
    //     return '[name].min.js'; // Output for other entries
    //   }
    // },
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: miniCss.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      // {
      //   test: /\.(woff|woff2|ttf|eot|otf)$/,
      //   loader: 'file-loader',
      //   include: path.resolve(__dirname, ''),
      //   options: {
      //     name: '[name].[ext]',
      //     outputPath: './assets',
      //   },
      // },
      // {
      //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'assets/[name][ext]',
      //   },
      // },
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new miniCss({
      filename: '[name].min.css',
    }),
  ],
};
