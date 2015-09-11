var gulp=require('gulp');
var uglify=require('gulp-uglify');
var minifycss=require('gulp-minify-css');
var imagemin=require('gulp-imagemin');
var concat=require('gulp-concat');
var rev=require('gulp-rev');
var revCollector=require('gulp-rev-collector');

gulp.task('script',function(){
    gulp.src("js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});
gulp.task('css',function(){
	gulp.src("css_original/*.css")
	.pipe(minifycss())
	.pipe(gulp.dest('dist/css'))
});
gulp.task('images',function(){
	gulp.src("Images/*.*")
	.pipe(imagemin({
		progressive:true
	}))
	.pipe(gulp.dest('dist/images'))
});
gulp.task('auto',function(){
	gulp.watch('css/*.css',['css'])
});
gulp.task('concat',function(){
	gulp.src(['css_original/DigIt*.css'])
	.pipe(concat('digitC.css'))
	.pipe(minifycss())
	.pipe(rev())
	.pipe(gulp.dest('dist/concat'))
	.pipe(rev.manifest())
	.pipe(gulp.dest('dist/rev'))
});
gulp.task('rev',function(){
	 gulp.src(['dist/rev/*.json','*.aspx'])
	 .pipe(revCollector())
	 .pipe(gulp.dest('dist/pages'))
});
gulp.task('default',['concat','rev']);
