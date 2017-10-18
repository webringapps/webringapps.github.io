var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

// Compiles SCSS files from /scss into /css
gulp.task('sass', function() {
    return gulp.src('asset/scss/main.scss')
        .pipe(sass())
        /*.pipe(header(banner, {
          pkg: pkg
        }))*/
        .pipe(gulp.dest('dist/css'))
});

// Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
    return gulp.src('dist/css/main.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('static/css'))
});

// Minify custom JS
gulp.task('minify-js', function() {
    return gulp.src('asset/js/main.js')
        .pipe(uglify())
        /*.pipe(header(banner, {
          pkg: pkg
        }))*/
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('static/js'))
});

// Copy vendor files from /node_modules into /vendor
// NOTE: requires `npm install` before running!
gulp.task('copy', function() {
    gulp.src([
            'node_modules/bootstrap/dist/**/*',
            '!**/npm.js',
            '!**/bootstrap-theme.*',
            '!**/*.map'
        ])
        .pipe(gulp.dest('vendor/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'))

    gulp.src(['node_modules/popper.js/dist/umd/popper.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest('vendor/popper'))

    gulp.src(['node_modules/jquery.easing/*.js'])
        .pipe(gulp.dest('vendor/jquery-easing'))

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('vendor/font-awesome'))
})

// Default task
gulp.task('default', ['sass', 'minify-css', 'minify-js' /*, 'copy'*/ ]);