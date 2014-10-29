var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();



gulp.task('default', ['example']);



var exampleFiles = [
  './bower_components/FlexSlider/jquery.flexslider.js',
  './bower_components/jquery/dist/jquery.min.js',
  './bower_components/jquery.dotdotdot/src/js/jquery.dotdotdot.min.js',
  './src/slider.*'
];
gulp.task('example', function () {
  gulp.src(exampleFiles).pipe(gulp.dest('./example'));
});



gulp.task('ghpages', ['example'], function () {
  return gulp.src('./example/**/*').pipe(plugins.ghPages());
});



gulp.task('watch', function () {
  gulp.watch(exampleFiles, ['example']);
});