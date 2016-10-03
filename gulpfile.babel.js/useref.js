import { paths } from './paths';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import useref from 'gulp-useref';
import uglify from 'gulp-uglify';
import cssnano from 'gulp-cssnano';

module.exports = () => gulp.src(`${paths.build}/**/*.html`)
  .pipe(useref({
    searchPath: paths.build,
  }))
  .pipe(gulpif('*.js', uglify()))
  .pipe(gulpif('*.css', cssnano()))
  .pipe(gulp.dest(paths.build));
