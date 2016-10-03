export const paths = {
  build: './build',
  html: './source/html/**/*.html',
  templates: './source/html/_templates/',
  scss: './source/scss/**/*.scss',
  js: './source/js/main.js',
  img: './source/img/**/*',
  index: [
    './source/html/**/*.html',
    '!./source/html/_templates{,/**}',
  ],
  docs: './docs',
};
