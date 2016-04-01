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

function performChange(content) {
    return content.replace(/\n/g, ' \\\n');
}

// Tasks

gulp.task('client_ts', function(){
  gulp.src([
    './scripts/internal/client/*.ts',
    './partials/generated/*.ts'
    ])
    .pipe(typescript())
    .pipe(concat('App.js'))
    .pipe(gulp.dest('./public/scripts'))
});

gulp.task('client_ts_login', function() {
    gulp.src([
        './scripts/internal/client/Login.ts',
        './scripts/internal/client/UiText.ts',
        './scripts/internal/client/en-GB.ts'
        ])
      .pipe(typescript())
      .pipe(concat('Login.js'))
      .pipe(gulp.dest('./public/scripts'))
});

gulp.task('server_ts', function(){
  gulp.src(['./scripts/internal/server/*.ts'])
    .pipe(typescript())
    .pipe(gulp.dest('./scripts/internal/server'))
});

gulp.task('server_app_ts', function() {
    gulp.src(['ServerApp.ts'])
    .pipe(typescript())
    .pipe(gulp.dest('.'))
});

gulp.task('less', function () {
    gulp.src('./less/styles.less') // path to your file
    .pipe(less().on('error', function(err) {
        console.log(err);
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('routie', function () {
    gulp.src('../routie/lib/routie.js')
    .pipe(gulp.dest('./public/scripts/external'));
});

/* Foreach html file:
    1. Get name (strip off suffix)
    2. Turn .ts file into .html file

BACKUP of working
gulp.task('partials', function () {
    gulp.src('partials/about.html')
    .pipe(insert.wrap('var About_Html: string = \'', '\n\';'))
    .pipe(change(performChange))
    .pipe(rename("about.ts"))
    .pipe(gulp.dest('./partials/generated'));
});
*/



gulp.task('partials', function () {
    console.log("Generating partial views for pages:")

    gulp.src('partials/*.html')
    .pipe(foreach(function(stream, file){
    
      var filename = path.basename(file.path, ".html");
      console.log(" - " + filename)

      return stream
        .pipe(insert.wrap('var ' + filename + '_html: string = \'', '\n\';'))
        .pipe(change(performChange))
        .pipe(concat(filename + ".ts"))
        .pipe(gulp.dest('./partials/generated'));
    }))
});

gulp.task('watch', function () {
    gulp.watch('./less/*.less', ['less']);
    gulp.watch('./scripts/internal/client/*.ts', ['client_ts']);
    gulp.watch('./partials/generated/*.ts', ['client_ts']);
    gulp.watch('./scripts/internal/server/*.ts', ['server_ts']);
    gulp.watch('./ServerApp.ts', ['server_app_ts']);
    gulp.watch('./scripts/internal/client/Login.ts', ['client_ts_login']);
});

gulp.task('default', 
    [
        'less',
        'client_ts',
        'server_ts',
        'server_app_ts',
        'client_ts_login',
        'routie',
        'partials'
    ]
);
