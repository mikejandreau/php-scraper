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

gulp.task('php', function() {
    php.server({
        base: '.',      // Root folder for project
        port: 8000,     // Specified port for local dev
        keepalive: true
    });
});

gulp.task('browser-sync', ['php'], function() {
    browserSync({
        proxy: '127.0.0.1:8000',    // Project URL
        port: 8080,                 // Use a specific port (instead of the one auto-detected by Browsersync)
        open: true,                 // 'true' automatically opens BrowserSync live server, 'false' does not
        notify: false
    });
});

gulp.task('default', ['css', 'browser-sync'], function () {
    gulp.watch("src/scss/*/*.scss", ['css']);
    gulp.watch("*.php", reload);
});
