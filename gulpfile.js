// Dependencies
var gulp       = require('gulp');
var typescript = require('gulp-tsc');
var less       = require('gulp-less');
var concat     = require('gulp-concat');
var insert     = require('gulp-insert');
var rename     = require("gulp-rename");
var change     = require('gulp-change');
var foreach    = require('gulp-foreach');
var path       = require('path');
var tap        = require('gulp-tap');

// Helper methods
function replaceNewLines(content) {
    return content.replace(/\n/g, ' \\\n');
}

function replaceQuotes(content) {
    return content.replace(/\'/g, '\\\'')
}

// Tasks
gulp.task('unit_tests', function() {
    gulp.src([
        './src/**/*.test.ts'])
    .pipe(typescript())
    .pipe(concat('UnitTests.js'))
    .pipe(gulp.dest('./public/scripts'))
});

gulp.task('client_ts', function(){
  gulp.src([
    './src/app_cv/**/*.ts',
    ])
    .pipe(typescript())
    .pipe(concat('CV.js'))
    .pipe(gulp.dest('./public/scripts'))
});

gulp.task('server_app_ts', function() {
    gulp.src([
        './resources/home/HomeUiText.ts',
        './src/**/ServerApp.ts'
    ])
    .pipe(typescript())
    .pipe(concat('ServerApp.js'))
    .pipe(gulp.dest('.'))
});

gulp.task('less', function () {
    gulp.src('./src/app_cv/less/styles.less')
    .pipe(less().on('error', function(err) {
        console.log(err);
    }))
    .pipe(gulp.dest('./src/public/css/cv.css'));

    gulp.src('./src/shared/less/styles.less')
    .pipe(less().on('error', function(err) {
        console.log(err);
    }))
    .pipe(gulp.dest('./src/public/css/home.css'));
});

gulp.task('templates', function () {
    console.log("Generating partial views for pages:")

    return gulp.src('./src/app_cv/templates/*.html')
    .pipe(foreach(function(stream, file){
    
      var filename = path.basename(file.path, ".html");
      console.log(" - " + filename)

      return stream
        .pipe(change(replaceQuotes))
        .pipe(insert.wrap('var ' + filename + '_html: string = \'', '\n\';'))
        .pipe(change(replaceNewLines))
        .pipe(concat(filename + ".ts"))
        .pipe(gulp.dest('./src/app_cv/templates/generated/'));
    }))
});

gulp.task('watch', function () {
    gulp.watch('./less/*.less', ['less']);
    gulp.watch('./scripts/internal/client/*.ts', ['client_ts']);
    gulp.watch('./partials/generated/*.ts', ['client_ts']);
    gulp.watch('./scripts/internal/server/*.ts', ['server_ts']);
    gulp.watch('./scripts/internal/server/ServerApp.ts', ['server_app_ts']);
    gulp.watch('./scripts/internal/client/Login.ts', ['client_ts_login']);
});

gulp.task('default', 
    [
        'unit_tests',
        'client_ts',
        'server_app_ts',
        'less',
        'templates'
    ]
);
