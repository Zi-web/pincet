'use strict';
 
var gulp = require("gulp");
/*var uglify = require('gulp-uglify');*/ //Minify JavaScript
var concat =  require ('gulp-concat');//Concatenates files
var rename = require("gulp-rename");
var plumber = require("gulp-plumber");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var run = require("run-sequence");
var copy = require("gulp-copy");
var del = require("del");

gulp.task("style", function(done){
	gulp.src("less/style.less")
	.pipe(plumber())
	.pipe(less())
	.pipe(postcss([
		autoprefixer({overrideBrowserslist: [
			"last 2 versions"
			]}),
		mqpacker({
			sort: true //true сортирует медиастили по порядку
		})
		]))

	.pipe(gulp.dest("build/css"))
	.pipe(minify())
	.pipe(rename("style.min.css"))
	.pipe(gulp.dest("build/css"))
	.pipe(server.reload({stream: true}))
	done();
});


gulp.task("images", function(done){
	return gulp.src("build/img/**/*.{png, jpg, gif}")
	.pipe(imagemin(gulp.series(
		imagemin.optipng({optimizationLevel: 3}),
		imagemin.jpegtran({progressive: true}),
	)))
	.pipe(gulp.dest("build/img"))
	.pipe(server.reload({stream: true}))
});


gulp.task("symbols", function(){
	return gulp.src("build/img/icon/*.svg")
	.pipe(svgmin())
	.pipe(svgstore({
		inlineSvg: true
	}))
	.pipe(rename("symbols.svg"))	
	.pipe(gulp.dest("build/img"));
});


// Слежение за изменениями, локальный сервер

gulp.task("serve", function(done){
	server.init({
		server: "build"
	});
	gulp.watch("less/**/*.less", gulp.series("style"));
	/*gulp.watch("*.html").on("change", server.reload);*/
	gulp.watch("*.html", gulp.series("buildHTML"));
	gulp.watch("*js/**/*.js", gulp.series("buildJS"));
	done();
});

gulp.task('buildHTML', function() {
    gulp.src('*.html')
    .pipe(plumber())
    .pipe(gulp.dest('build'))
    .pipe(server.reload())
})

gulp.task('buildJS', function(done) {
    gulp.src('js/**')
    .pipe(plumber())
    /*.pipe(uglify())*/ // Сжимаем JS файл
    .pipe(gulp.dest('build/js'))
    .pipe(server.reload({stream:true}))
    done()
})


//gulp.task('scripts', function() {
//	return gulp.src([ // Берем все необходимые библиотеки
//		'js/jquery/jquery-3.4.1.min.js' // Берем jQuery
//		/*'js/jquery/jquery.magnific-popup.min.js' // Берем Magnific Popup*/
//		])
//		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
//		.pipe(uglify()) // Сжимаем JS файл
//		.pipe(gulp.dest('build/js')) // Выгружаем в папку app/js
//		.pipe(server.reload({stream: true}))
//});


/*gulp.task("build", gulp.series("style","images", "symbols"));*/


gulp.task("clean", function(){
	return del("build");
});


gulp.task("copy", function(done) {
  gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "js/*.js",
    "*.html"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
  done()
});


gulp.task('build', gulp.series(
    'clean',
        "copy",
        "images",
		"symbols",
		"style",
//		"scripts",
		"serve"
));
