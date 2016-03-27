var gulp       = require('gulp');
var typescript = require('gulp-tsc');
var less       = require('gulp-less');
var concat     = require('gulp-concat');

gulp.task('client_ts', function(){
  gulp.src([
    './scripts/internal/client/*.ts',
    './partials/*.ts'
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

gulp.task('watch', function () {
    gulp.watch('./less/*.less', ['less']);
    gulp.watch('./scripts/internal/client/*.ts', ['client_ts']);
    gulp.watch('./partials/*.ts', ['client_ts']);
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
        'client_ts_login'
    ]
);
