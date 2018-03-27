var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    package = require('./package.json');
    reload = browserSync.reload; // For manual browser reload.

gulp.task('css', function () {
    return gulp.src('src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('assets/css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task( 'browser-sync', function() {
  browserSync.init( {
    proxy: 'dev4',    // Project URL
    open: true,                 // 'true' automatically opens BrowserSync live server, 'false' does not
    injectChanges: true,        // Inject CSS changes, comment it to reload browser for every CSS change
    // port: 7000,              // Use a specific port (instead of the one auto-detected by Browsersync)
  } );
});

gulp.task('default', ['css', 'browser-sync'], function () {
    gulp.watch("src/scss/*/*.scss", ['css']);
    gulp.watch("*.php", reload);
});
