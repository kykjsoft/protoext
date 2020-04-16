const { src,dest,series } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// `clean` 函数并未被导出（export），因此被认为是私有任务（private task）。
// 它仍然可以被用在 `series()` 组合中。
function clean(cb) {

  // body omitted
  cb();
}

// `build` 函数被导出（export）了，因此它是一个公开任务（public task），并且可以被 `gulp` 命令直接调用。
// 它也仍然可以被用在 `series()` 组合中。
function build(cb) {
    return src('src/**/*.js')
    .pipe(dest('dist')); //最后生成的文件路径为 dist/**/*.js
}

function mini(){
    return src('src/**/*.js')
    // gulp-uglify 插件并不改变文件名
    .pipe(uglify())
    // 因此使用 gulp-rename 插件修改文件的扩展名
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('dist/'));
}

exports.build = build;
exports.default = series(clean, build,mini);