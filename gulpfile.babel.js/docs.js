import { paths } from './paths';
import gulp from 'gulp';

module.exports = () => gulp.src(
  [
    `${paths.build}/index.html`,
    `${paths.build}/**/styles.min.css`,
    `${paths.build}/**/scripts.min.js`,
  ])
  .pipe(gulp.dest(paths.docs));
