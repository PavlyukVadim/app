// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!app)/,
      'app.js': /^app/
    }
  },
  stylesheets: {joinTo: 'app.css'}
};

exports.conventions = {
  ignored: /^test/
};

exports.plugins = {
  babel: {
    presets: ['latest'],
    plugins: [
      ['transform-react-jsx', {pragma: 'h'}]
    ],
    ignore: [/node_modules/]
  },
  handlebars: {
    locals: {
      baseUrl: process.env.NODE_ENV === 'production' ? '/app.github.io' : ''
    }
  }
};
