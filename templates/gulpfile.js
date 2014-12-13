var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  browserify = require('browserify'),
  browserSync = require('browser-sync'),
  source = require('vinyl-source-stream');

gulp.task('scripts', function() {
  var stream = browserify('src/scripts/index.js')
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('dist/js'));

  if (browserSync.active) {
    stream.pipe(browserSync.reload({
      stream: true
    }));
  }
});

gulp.task('styles', function() {
  var stream = gulp.src('src/styles/index.less')
    .pipe(plugins.less())
    .pipe(gulp.dest('dist/css'));

  if (browserSync.active) {
    stream.pipe(browserSync.reload({
      stream: true
    }));
  }
});

gulp.task('templates', function() {
  var stream = gulp.src('src/templates/*.jade')
    .pipe(plugins.jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist'))

  if (browserSync.active) {
    stream.pipe(browserSync.reload({
      stream: true
    }));
  }
});

gulp.task('browser-sync', ['templates', 'scripts', 'styles'], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });
});

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/styles/**/*.less', ['styles']);
  gulp.watch('src/templates/**/*.jade', ['templates']);
});

gulp.task('default', ['watch']);
