const gulp = require('gulp');
const less = require('gulp-less');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const soursemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const mediaqueries = require('gulp-group-css-media-queries');

const config = {
	src: './src',
	css: {
		src: '/buildCSS/**/*.css',
		dest: '/css'
	},
	less: {
		src: '/buildCSS/**/*.less',
	},
	scss: {
		src: '/buildCSS/**/*.scss',
	},
	html: {
		src: '/index.html'
	}
};

gulp.task('build', function() {
	gulp.src(config.src + config.scss.src)
		.pipe(concat('styles.scss'))
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(soursemaps.init())
		.pipe(autoprefixer ({
			browsers: ['last 2 versions'],
			cascade: false

		}))
		.pipe(mediaqueries())
		.pipe(cleanCSS())
		.pipe(soursemaps.write('.'))
		.pipe(gulp.dest(config.src + config.css.dest))
		.pipe(browserSync.reload({
			stream: true
		})); 
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: config.src
        }
    });
});

gulp.task('watch', ['browserSync'], function () {
	gulp.watch(config.src + config.scss.src, ['build']);
	gulp.watch(config.src + config.html.src, browserSync.reload);
});