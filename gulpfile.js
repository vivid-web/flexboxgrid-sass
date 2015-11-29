'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

var directories = {
    sass: {
        input: './scss/flexbox-grid.scss',
        output: {
            folder: './dist',
            fileName: 'flexbox-grid.css'
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

gulp.task('default', ['sass', 'minify-css']);