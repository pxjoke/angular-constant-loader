const path = require('path');

module.exports = env => {
    return {
        entry: path.join(__dirname, 'test.js'),
        output: {
            filename: '[name].js',
            path: path.join(__dirname, 'dist')
        },
        module: {
          rules: [
              {
                  test: /\.json$/,
                  use: [
                      {
                          loader: 'angular-constant-loader',
                          options: {
                              moduleName: 'configuration',
                              field: 'dev'
                          }
                      }
                  ]
              }
          ]
        },
        resolveLoader: {
            alias: {
                'angular-constant-loader': path.join(__dirname, "./index.js")
            }
        }
    };
};