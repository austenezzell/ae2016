import { paths } from './paths';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import { plumberConfig } from './plumber';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import pixrem from 'pixrem';
// import mqpacker from 'css-mqpacker';

const processors = [
  // mqpacker,
  autoprefixer({ browsers: ['last 2 versions'] }),
  pixrem({
    rootValue: 10,
    html: false,
  }),
];

module.exports = () => gulp.src(paths.scss)
  .pipe(plumber(plumberConfig))
  .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(processors))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest(`${paths.build}/css/`));
