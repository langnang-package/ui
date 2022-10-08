const gulp = require('gulp')
  , sass = require('gulp-sass')(require('sass'))
  , minifyCSS = require('gulp-minify-css')
  , autoprefixer = require('gulp-autoprefixer')
  , clean = require('gulp-clean')
  , rename = require("gulp-rename")
  ;

gulp.task('clean', () => gulp.src('./dist').pipe(clean()))

gulp.task('sass', () => gulp.src('./src/**/*.scss')
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ["last 4 versions", "Firefox >= 27", "Blackberry >= 7", "IE 8", "IE 9"],
    cascade: false
  }))
  .pipe(rename({
    // basename: 'ln'
  }))
  .pipe(gulp.dest('dist'))
)
gulp.task('rename', () => gulp.src('./dist/index.css')
  .pipe(rename({
    basename: 'ln'
  }))
  .pipe(gulp.dest('dist'))
)

gulp.task('min', () => gulp.src('./dist/**/*.css')
  .pipe(minifyCSS())
  .pipe(rename({
    suffix: ".min",
  }))
  .pipe(gulp.dest('dist'))
)

gulp.task('watch', () => {
  gulp.watch('./packages/**', gulp.series(['sass']))
})

gulp.task('default', gulp.series(['clean', 'sass', 'rename', 'min']))