//++++++++++Css++++++++++//
import * as sass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcss from 'gulp-postcss';
import sourcemaps, { init } from 'gulp-sourcemaps';

//==========js==========//
import terser from 'gulp-terser-js';

//++++++++++Gulp++++++++++//
import gulp from 'gulp';
import plumber from 'gulp-plumber';

//++++++++++Images++++++++++//
import webp from 'gulp-webp';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import avif from 'gulp-avif';

const dartSass = gulpSass(sass);
const { src, dest, watch, parallel } = gulp;

function modifyCss(done) {
    src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init()) // Initialize sourcemaps before compilation starts
        .pipe(plumber()) // Prevent pipe breaking caused by errors from gulp plugins
        .pipe(dartSass()) // Convert Sass to CSS with gulp-sass
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.')) // Now add/write the sourcemaps
        .pipe(dest('./build/css')); // Output CSS files

    done();
}

function minifyJs() {
    return src('./src/js/**/*.js').pipe(sourcemaps.init()).pipe(terser()).pipe(sourcemaps.write('.')).pipe(dest('./build/js'));
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

export function watcher(done) {
    watch('./src/sass/**/*.scss', css);
    done();
}

export const dev = parallel(
    lightImages,
    versionWebp,
    versionAvif,
    watcher
);
export const js = minifyJs;
export const css = modifyCss;
