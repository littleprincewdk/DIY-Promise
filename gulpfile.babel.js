import gulp from 'gulp';
import ts from 'gulp-typescript';

gulp.task('default', function task() {
  return gulp
    .src('src/**/*.ts')
    .pipe(
      ts({
        module: 'commonjs',
        target: 'es5',
      })
    )
    .pipe(gulp.dest('dist'));
});
