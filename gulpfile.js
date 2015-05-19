var del         = require('del');
var gulp        = require('gulp');
var babel       = require('gulp-babel');
var bump        = require('gulp-bump');
var filter      = require('gulp-filter');
var header      = require('gulp-header');
var prefixer    = require('gulp-autoprefixer');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var sass        = require('gulp-sass');
var tagVersion  = require('gulp-tag-version');
var umd         = require('gulp-wrap-umd');

// Variables
var distDir = './dist';
var pkg = require('./package.json');
var banner = ['/*!', pkg.name, pkg.version, '*/\n'].join(' ');
var umdOptions = {
  exports: 'Shepher',
  namespace: 'Shepher',
  deps: [{
    name: 'Tether',
    globalName: 'Tether',
    paramName: 'Tether',
    amdName: 'tether',
    cjsName: 'tether'
  }]
};


// Clean
gulp.task('clean', function() {
  del.sync([distDir]);
});


// Javascript
gulp.task('js', ['clean'], function() {
  gulp.src('./src/js/**/*.js')
    .pipe(babel())
    .pipe(umd(umdOptions))
    .pipe(header(banner))

    // Original
    .pipe(gulp.dest(distDir + '/js'))

    // Minified
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(distDir + '/js'));
});


// CSS
gulp.task('css', function() {
  gulp.src('./src/css/**/*.sass')
    .pipe(sass({
      includePaths: ['./bower_components']
    }))
    .pipe(prefixer())
    .pipe(gulp.dest(distDir + '/css'));
});


// Version bump
var VERSIONS = ['patch', 'minor', 'major'];
for (var i = 0; i < VERSIONS.length; ++i){
  (function(version) {
    var pkgFilter = filter('package.json');
    gulp.task('version:' + version, function() {
      gulp.src(['package.json', 'bower.json'])
        .pipe(bump({type: version}))
        .pipe(pkgFilter)
        .pipe(tagVersion())
        .pipe(pkgFilter.restore())
        .pipe(gulp.dest('.'))
    });
  })(VERSIONS[i]);
}


// Watch
gulp.task('watch', ['js', 'css'], function() {
  gulp.watch('./src/js/**/*', ['js']);
  gulp.watch('./src/css/**/*', ['css']);
});


// Defaults
gulp.task('build', ['js', 'css'])
gulp.task('default', ['build'])

