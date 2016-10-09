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

/*
var clientTypescriptOptions = {
    target: "ES5",
    module: "AMD"
};
*/

// Tasks
gulp.task('unit_tests', function() {
    gulp.src([
        './src/**/*.test.ts'])
    .pipe(typescript())
    .pipe(concat('UnitTests.js'))
    .pipe(gulp.dest('./src/public/scripts'))
});

gulp.task('client_ts', function(){
  gulp.src([
    './src/app_cv/models/App.ts',
    ])
    .pipe(typescript())
    .pipe(concat('cv.js'))
    .pipe(gulp.dest('./src/public/scripts'))
});

gulp.task('server_ts', function() {
    gulp.src([
        './src/resources/**/*.ts',
        './src/shared/**/*.ts',
        './src/server/**/*.ts'
    ], { base: "." })
    .pipe(typescript())
    .pipe(gulp.dest('.'));

    gulp.src(
        ['./ServerApp.ts']
    )
    .pipe(typescript())
    .pipe(gulp.dest('.'));

});

gulp.task('less', function () {
    gulp.src('./src/app_cv/less/styles.less')
    .pipe(less().on('error', function(err) {
        console.log(err);
    }))
    .pipe(rename('cv.css'))
    .pipe(gulp.dest('./src/public/css'));

    gulp.src('./src/server/less/home-styles.less')
    .pipe(less().on('error', function(err) {
        console.log(err);
    }))
    .pipe(rename('home.css'))
    .pipe(gulp.dest('./src/public/css'));
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
    gulp.watch('./src/**/*.less', ['less']);
    gulp.watch('./src/app_cv/**/*.ts', ['client_ts']);
    gulp.watch('./src/app_cv/**/generated/*.ts', ['client_ts']);
    gulp.watch('./src/server/**/*.ts', ['server_ts']);
});

gulp.task('default', 
    [
        'client_ts',
        'server_ts',
        'unit_tests',
        'less',
        'templates'
    ]
);
