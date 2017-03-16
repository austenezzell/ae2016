import { paths } from './paths';
import gulp from 'gulp';
import del from 'del';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';

// Import tasks
import html from './html';
import styles from './styles';
import bundle from './bundle';
import copyfiles from './copyfiles';
import useref from './useref';
import serve from './serve';
import docs from './docs';

gulp.task('clean', () => del([`${paths.build}/*`]));
gulp.task('html', () => html());
gulp.task('styles', () => styles());
gulp.task('bundle', () => bundle());
gulp.task('copyfiles', () => copyfiles());
gulp.task('serve', ['watch'], () => serve());
gulp.task('useref', () => useref());
gulp.task('watch', () => {
  gulp.watch(paths.html, ['html', browserSync.reload]);
  gulp.watch(paths.scss, ['styles', browserSync.reload]);
  gulp.watch(paths.js, ['bundle', browserSync.reload]);
  gulp.watch(paths.img, ['copyfiles', browserSync.reload]);
  gulp.watch(paths.json, [['copyfiles', 'html'], browserSync.reload]);
});

const buildTasks = ['html', 'styles', 'bundle', 'copyfiles'];

// Build docs
gulp.task('docs', () => docs());

// Development
gulp.task('default', ['clean'], () => {
  runSequence(
    buildTasks, 'serve'
  );
});

// Deployment
gulp.task('build', ['clean'], () => {
  runSequence(
    buildTasks, 'useref'
  );
});
