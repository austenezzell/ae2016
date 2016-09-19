var browserSync = require('browser-sync');

module.exports = function(gulp, $, plumberConfig, paths) {
  return function() {
    browserSync({
      server: {
        baseDir: paths.build
      },
      notify: false,
      ghostMode: false
      // reloadDelay: 500
    });
  };
};
