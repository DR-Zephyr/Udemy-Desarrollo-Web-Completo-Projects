import * as sass from 'sass';
import gulpsass from 'gulp-sass';
import pkg from 'gulp';
import plumber from 'gulp-plumber';

const { src, dest, watch } = pkg;
const dartSass = gulpsass(sass);

export function css(done) {
    src('./src/sass/**/*.scss')
        .pipe(plumber())
        .pipe(dartSass())
        .pipe(dest('./build/css'));

    done();
}

export function dev(done) {
    watch('./src/sass/**/*.scss', css);
    done();
}
