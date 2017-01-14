var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    autoprefixer = require('gulp-autoprefixer');

//Complite SCSS to CSS
gulp.task('sass', function(){
   return gulp.src('app/sass/**/*.+(sass|scss)')
   .pipe(sass())
   .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8'], { cascade: true }))
   .pipe(gulp.dest('app/css'))
   .pipe(browserSync.reload({stream: true}))
});

//Concat scripts file to single file
gulp.task('scripts', function(){
    return gulp.src([
        'bower_components/angular/angular.min.js',        
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/jasny-bootstrap/dist/js/jasny-bootstrap.min.js',        
    ])
    .pipe(concat('libs.min.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

//Min all css
gulp.task('css-libs', ['sass'], function(){
    return gulp.src('app/css/libs.css')
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'));
})

//Run localhost
gulp.task('browser-sync', function(){
    browserSync({
       server: {
           baseDir: 'app'
       },
    browser:'firefox',
    /*browser:'chrome',*/
    notify: false
    });
});

//Clean up dist folder
gulp.task('clean', function(){
   return del.sync('dist'); 
});

//Run complete SCSS to CSS, html and js changes, css min authomaticly
gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'] , function(){
    gulp.watch('app/sass/**/*.+(sass|scss)',['sass']); 
    //gulp.watch('app/**/*.html', browserSync.reload);
    //gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('app/**/*.html');
    gulp.watch('app/js/**/*.js');
});

//Build production version
gulp.task('build', ['clean', 'sass', 'scripts'], function(){
   var buildCss = gulp.src([
       'app/css/main.css',
       'app/css/libs.min.css'
   ])
   .pipe(gulp.dest('dist/css'));
    
    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
    
    var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));
    
    var buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'))
});