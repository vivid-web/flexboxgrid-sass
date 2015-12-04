'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var jade = require('gulp-jade');

var directories = {
    sass: {
        input: './scss/flexbox-grid.scss',
        output: {
            folder: './dist',
            fileName: 'flexbox-grid.css'
        }
    },
    jade: {
        input: './resources/jade/index.jade',
        output: {
            folder: './docs',
            fileName: 'index.html'
        }
    },
    minify: {
        input: './scss/flexbox-grid.scss',
        output: {
            folder: './dist',
            fileName: 'flexbox-grid.min.css'
        }
    }
};

gulp.task('sass', function () {
    return gulp
        .src(directories.sass.input)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix())
        .pipe(rename(directories.sass.output.fileName))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(directories.sass.output.folder));
});

gulp.task('minify-css', function () {
    return gulp
        .src(directories.minify.input)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix())
        .pipe(minifyCss())
        .pipe(rename(directories.minify.output.fileName))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(directories.minify.output.folder));
});



gulp.task('docs-css', function () {
    return gulp
        .src(['./resources/scss/stylesheet.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix())
        .pipe(minifyCss())
        .pipe(rename('stylesheet.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./docs/dist'));
});

gulp.task('docs-html', function () {
    return gulp
        .src(directories.jade.input)
        .pipe(jade({
            pretty: true
        }))
        .pipe(rename(directories.jade.output.fileName))
        .pipe(gulp.dest(directories.jade.output.folder));
});

gulp.task('default', ['sass', 'minify-css', 'docs-css', 'docs-html']);