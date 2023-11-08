//++++++++++Css++++++++++//
import * as sass from 'sass';
import gulpSass from 'gulp-sass';

//++++++++++Gulp++++++++++//
import gulp from 'gulp';
import plumber from 'gulp-plumber';

//++++++++++Images++++++++++//
import webp from 'gulp-webp';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import avif from 'gulp-avif'

const dartSass = gulpSass(sass);
const { src, dest, watch, parallel } = gulp;

function css(done) {
    src('./src/sass/**/*.scss')
        .pipe(plumber())
        .pipe(dartSass())
        .pipe(dest('./build/css'));

    done();
}

function lightImages(done) {
    const options = {
        optimizationLevel: 3,
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(options)))
        .pipe(dest('build/img'));
    done();
}

function versionWebp(done) {
    const options = {
        quality: 50,
    };

    src('src/img/**/*.{png,jpg}').pipe(webp(options)).pipe(dest('build/img'));

    done();
}

function versionAvif(done) {
    const options = {
        quality: 50,
    };

    src('src/img/**/*.{png,jpg}').pipe(avif(options)).pipe(dest('build/img'));

    done();
}

function watcher(done) {
    watch('./src/sass/**/*.scss', css);
    done();
}

export const dev = parallel(lightImages, versionWebp, versionAvif, watcher);
