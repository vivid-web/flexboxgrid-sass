'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

var directories = {
    sass: {
        input: './src/flexbox-grid.scss',
        output: {
            folder: './dist',
            fileName: 'flexbox-grid.css'
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

gulp.task('default', ['build']);