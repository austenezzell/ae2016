import { paths } from './paths';
import gulp from 'gulp';

module.exports = () => gulp.src(
  [
    './source/**/*.{ttf,woff,woff2,eof,otf,svg,ico,png,jpg,gif,pdf,mp4}',
    './source/**/.htaccess',
    './source/**/*.json',
  ])
  .pipe(gulp.dest(paths.build));
