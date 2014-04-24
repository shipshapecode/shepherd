gulp = require('gulp')
coffee = require('gulp-coffee')
compass = require('gulp-compass')
concat = require('gulp-concat')
uglify = require('gulp-uglify')
header = require('gulp-header')
rename = require('gulp-rename')
bower = require('gulp-bower')
gutil = require('gulp-util')

pkg = require('./package.json')
banner = "/*! #{ pkg.name } #{ pkg.version } */\n"

gulp.task 'bower', ->
  bower().pipe(gulp.dest('./bower_components'))

gulp.task 'coffee', ->
  try
    gulp.src('./coffee/*')
      .pipe(coffee().on('error', gutil.log))
      .pipe(gulp.dest('./js/'))

    gulp.src('./docs/welcome/coffee/*')
      .pipe(coffee())
      .pipe(gulp.dest('./docs/welcome/js/'))
  catch e

gulp.task 'concat', ->
  gulp.src(['./bower_components/tether/tether.js', 'js/shepherd.js'])
    .pipe(concat('shepherd.js'))
    .pipe(header(banner))
    .pipe(gulp.dest('./'))

gulp.task 'uglify', ->
  gulp.src('./shepherd.js')
    .pipe(uglify())
    .pipe(header(banner))
    .pipe(rename('shepherd.min.js'))
    .pipe(gulp.dest('./'))

gulp.task 'js', ->
  gulp.run 'coffee', ->
    gulp.run 'concat', ->
      gulp.run 'uglify', ->

gulp.task 'compass', ->
  for path in ['', 'docs/welcome/']
    gulp.src("./#{ path }sass/*")
      .pipe(compass(
        sass: "#{ path }sass"
        css: "#{ path }css"
        comments: false
      ))
      .pipe(gulp.dest("./#{ path }css"))

gulp.task 'default', ->
  gulp.run 'bower', ->
    gulp.run 'js', 'compass', ->

  gulp.watch './**/*.coffee', ->
    gulp.run 'js'

  gulp.watch './**/*.sass', ->
    gulp.run 'compass'

  gulp.watch './bower.json', ->
    gulp.run 'bower'

  gulp.watch './package.json', ->
    gulp.run 'js'
