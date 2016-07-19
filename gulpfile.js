'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var jade = require('gulp-jade');

var directories = {
    sass: {
        input: './src/flexbox-grid.scss',
        output: {
            folder: './dist',
            fileName: 'flexbox-grid.css'
        }
    },
    jade: {
        input: './assets/jade/index.jade',
        output: {
            folder: './docs',
            fileName: 'index.html'
        }
    },
    minify: {
        input: './src/flexbox-grid.scss',
        output: {
            folder: './dist',
            fileName: 'flexbox-grid.min.css'
        }
    }
};

// Dist
gulp.task('dist-css', function() {
    return gulp
        .src(directories.sass.input)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix())
        .pipe(rename(directories.sass.output.fileName))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(directories.sass.output.folder));
});

gulp.task('dist-minify', function() {
    return gulp
        .src(directories.minify.input)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix())
        .pipe(cleanCss())
        .pipe(rename(directories.minify.output.fileName))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(directories.minify.output.folder));
});

gulp.task('build', ['dist-css', 'dist-minify']);


// Docs
gulp.task('docs-fonts', function() {
    return gulp
        .src(['./assets/fonts/**'])
        .pipe(gulp.dest('./docs/dist/fonts/'));
});

gulp.task('docs-css', function() {
    return gulp
        .src(['./assets/scss/stylesheet.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix())
        .pipe(cleanCss())
        .pipe(rename('stylesheet.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./docs/dist/css'));
});

gulp.task('docs-html', function() {
    return gulp
        .src(directories.jade.input)
        .pipe(jade({
            pretty: true
        }))
        .pipe(rename(directories.jade.output.fileName))
        .pipe(gulp.dest(directories.jade.output.folder));
});

gulp.task('docs', ['docs-fonts', 'docs-css', 'docs-html']);

gulp.task('default', ['build', 'docs']);