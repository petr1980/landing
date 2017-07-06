const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano'); 
const concat = require('gulp-concat');
const sourcemaps   = require('gulp-sourcemaps');
const notify = require("gulp-notify");
const plumber = require('gulp-plumber');
const svgmin = require('gulp-svgmin');
const svgSprite = require('gulp-svg-sprite');

const buildDir  ='build';

/* -------- Server  -------- */
gulp.task('server', function() {
  browserSync.init({
    server: {
      port: 9000,
      baseDir: buildDir
    }
  });

  gulp.watch(buildDir+ '/**/*').on('change', browserSync.reload);
});

/* ------------ Pug compile ------------- */


gulp.task('templates:compile', function () {
    return gulp.src('source/template/index.pug') 
        .pipe(plumber()) 
        .pipe(pug({ 
            pretty: true
        })).on("error", notify.onError())
        .pipe(gulp.dest(buildDir))
});



/* ------------ Styles compile ------------- */
gulp.task('styles:compile', function () {
  return gulp.src('source/styles/main.scss')
  	.pipe(sourcemaps.init())
    .pipe(sass().on("error", notify.onError()))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(rename('main.min.css'))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))  
    .pipe(gulp.dest(buildDir +'/css'));
});

/* --------  js -------- */
gulp.task('js', function() {
    return gulp.src([
            'source/js/init.js',
            'source/js/validation.js',
            'source/js/form.js',
            'source/js/navigation.js',
            'source/js/main.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(plumber({
          errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }}))         
        .pipe(concat('main.min.js'))
      //  .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(buildDir+'/js'));
});

/* ------------ Sprite ------------- */
gulp.task('sprite:png', function(cb) {
  const spriteData = gulp.src('source/images/icons/png/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../images/sprite.png',
    cssName: 'sprite.scss'
  }));

  spriteData.img.pipe(gulp.dest('build/images/'));
  spriteData.css.pipe(gulp.dest('source/styles/global/'));
  cb();
});
////
gulp.task('sprite:svg', function () {
  return gulp.src('source/images/icons/svg/*.svg')
  // minify svg
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    // build svg sprite
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg",
          render: {
            scss: {
              dest:'../../../source/styles/global/sprite-svg.scss',
              template: "source/styles/template/_sprite_template.scss"
            }
          }
        }
      }
    }))
    .pipe(gulp.dest(buildDir+'/images/'));
});




/* ------------ Delete ------------- */
gulp.task('clean', function del(cb) {
  return rimraf('build', cb);
});

/* ------------ Copy fonts ------------- */
gulp.task('copy:fonts', function() {
  return gulp.src('./source/fonts/**/*.*')
    .pipe(gulp.dest('build/fonts'));
});

/* ------------ Copy images ------------- */
gulp.task('copy:images', function() {
  return gulp.src('./source/images/**/*.*')
    .pipe(gulp.dest('build/images'));
});

/* ------------ Copy video ------------- */
gulp.task('copy:video', function() {
  return gulp.src('./source/video/**/*.*')
    .pipe(gulp.dest('build/video'));
});

/* ------------ Copy ------------- */
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images', 'copy:video'));

/* ------------ Watchers ------------- */
gulp.task('watch', function() {
  gulp.watch('source/template/**/*.pug', gulp.series('templates:compile'));
  gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile'));
  gulp.watch('source/js/**/*.js', gulp.series('js'));
});

gulp.task('dev', gulp.series(
  'clean',
  gulp.parallel('templates:compile', 'styles:compile', 'js', 'sprite:png', 'sprite:svg', 'copy'),
  gulp.parallel('watch', 'server')
  )
);

