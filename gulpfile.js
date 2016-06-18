var gulp = require('gulp');
var concat = require('gulp-concat');
var react = require('gulp-react');
var browserSync = require('browser-sync');
var browserReload = browserSync.reload;
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var copy = require('gulp-copy');
var del = require('del');
var _ = require('lodash');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var buffer = require('vinyl-buffer');

var path = {
    ALL: ['src/**/*.*'],
    ENTRY_POINT: './src/app/main.js',
    HTML: 'src/index.html',
    IMG: 'src/img/**/*.*',
    STATIC: 'src/static/**/*.*',
    JS: ['src/**/*.js'],
    SCSS: ['src/style/**/*.scss'],
    DEST_PROD: 'production',
    DEST_DEV: 'development',
    OUT: 'build.js'
};

function compileStyle(dest) {
    var files = gulp.src([
        './src/style/app.scss'
    ])
    .pipe(sass({
        includePaths: [ './node_modules/foundation-apps/scss' ]
    }))
    .pipe(sass())
    .pipe(cssmin())
    .pipe(rename('robin.css'))
    .pipe(gulp.dest(dest))
    .on('error', sass.logError);
    return files;
}

function copyFiles(dest) {
    var files = gulp.src([path.IMG, path.STATIC, path.HTML])
    .pipe(copy(dest, { prefix: 1 }));
    return files;
}

function copyLib(dest) {
    var files = gulp.src([path.GEOM])
    .pipe(copy(dest, { prefix: 1 }));
    return files;
}

gulp.task('sass:dev', function(cb) {
    compileStyle(path.DEST_DEV).on('end', cb);
});

gulp.task('sass:prod', function(cb) {
    compileStyle(path.DEST_PROD).on('end', cb);
});

gulp.task('copyFiles:dev', function(cb) {
    copyFiles(path.DEST_DEV).on('end', cb);
});

gulp.task('copyFiles:prod', function(cb) {
    copyFiles(path.DEST_PROD).on('end', cb);
});

gulp.task('copyLib:dev', function(cb) {
    copyLib(path.DEST_DEV).on('end', cb);
});

gulp.task('copyLib:prod', function(cb) {
    copyLib(path.DEST_PROD).on('end', cb);
});

gulp.task('cleanFiles:dev', function(cb){
    del(['development'], cb);
});

gulp.task('cleanFiles:prod', function(cb){
    del(['production'], cb);
});

gulp.task('buildJS:dev', function() {
    return browserify('./src/app/Main.js')
        .transform('reactify')
        .bundle()
        .on('error', function(e) {
            console.log("ERROR");
            console.log(e.message);
        })
        .pipe(source('robin.js'))
        .pipe(gulp.dest(path.DEST_DEV));
});

gulp.task('buildGeom:dev', function() {
    return browserify('./src/geometry/index.js')
        .bundle()
        .on('error', function(e) {
            console.log("ERROR");
            console.log(e.message);
        })
        .pipe(source('geom.js'))
        .pipe(gulp.dest(path.DEST_DEV));
});

gulp.task('buildJS:prod', function() {
    return browserify('./src/app/Main.js')
        .transform('reactify')
        .bundle()
        .on('error', function(e) {
            console.log("ERROR");
            console.log(e.message);
        })
        .pipe(source('robin.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(path.DEST_PROD));
});

gulp.task('serve:dev', function() {
    browserSync({
        ui: false,
        ghostMode: false,
        logLevel: 'silent',
        server: {
          baseDir: path.DEST_DEV
      },
        open: false,
        notify: false,
        injectChanges: false,
        minify: false,
        scrollProportionally: false,
        online: false,
        reloadOnRestart: true,
        browser: [ 'google chrome' ]
    });
});

gulp.task('reload:dev', function() {
    browserReload();
});

gulp.task('watch:html', function() {
    gulp.watch([ path.HTML ], function() {
        runSequence('copyFiles:dev');
    });
});

gulp.task('watch:scss', function() {
    gulp.watch(path.SCSS, function() {
        runSequence('sass:dev');
    });
});

gulp.task('watch:JS', function() {
    gulp.watch(path.JS, function() {
        runSequence('buildJS:dev', 'reload:dev');
    });
});

gulp.task('watch:lib', function() {
    gulp.watch([path.GEOM], function() {
        runSequence('copyLib:dev', 'reload:dev');
    });
});


gulp.task('watch', function() {
    runSequence('cleanFiles:dev');
    runSequence('buildJS:dev', 'buildGeom:dev', 'sass:dev', 'copyFiles:dev', 'watch:html', 'watch:scss', 'watch:JS');
    runSequence('serve:dev');
});

gulp.task('production', function() {
    runSequence('cleanFiles:prod');
    runSequence('buildJS:prod', 'sass:prod', 'copyFiles:prod', 'copyLib:prod');
});
