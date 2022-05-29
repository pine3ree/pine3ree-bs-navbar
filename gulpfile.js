var gulp = require('gulp');
var sass = require('sass');

// define gulp-plugins container
var gp = {
    babel : require('gulp-babel'),
    rename : require('gulp-rename'),
    sass : require('gulp-sass')(sass),
    cssnano : require('gulp-cssnano'),
    if : require('gulp-if'),
    uncss : require('gulp-uncss'),
    concat : require('gulp-concat'),
    strip : require('gulp-strip-comments'),
    uglify : require('gulp-uglify'),
    sourcemaps : require('gulp-sourcemaps'),
    autoprefixer : require('gulp-autoprefixer'),
    watcher : require('glob-watcher'),
    watch : require('gulp-watch'),
    '_': null
};

//gp.sass.compiler = require('dart-sass');

var SRC  = 'src/';
var DIST = 'dist/';

var SRC_SCSS = SRC + 'scss/';
var SRC_JS = SRC + 'js/';

var DIST_JS = DIST + 'js/';
var DIST_CSS = DIST + 'css/';

var BOWER_SRC = SRC + 'bower_components/';

var BS_SCSS = BOWER_SRC + 'bootstrap/scss/';
var BS_JS_SRC = BS_SCSS + 'javascripts/bootstrap/';

var JS_PATHS = [
    "js",
];

var SASS_INCLUDE_PATHS = [
    '/usr/lib/node_modules/compass-mixins/lib/',
    SRC_SCSS,
    BOWER_SRC,
];
var SASS_PRECISION = 15

NANO_OPTIONS = {
    safe: true,
    autoprefixer: false,
    reduceIdents: {
        keyframes: false
    },
    discardUnused: {
        keyframes: false
    },
    discardComments: {
        removeAll: true
    },
};

AUTOPREFIXER_OPTIONS = {
    remove: false,
    overrideBrowserslist: [
        ">= 0.5%",
        "last 3 major versions",
        "not dead",
        "Chrome >= 60",
        "Firefox >= 60",
        "Firefox ESR",
        "iOS >= 12",
        "Safari >= 12",
        "not Explorer <= 11",
    ]
};

UNCSS_OPTIONS = {
    "html": [
        // DIST + "*.html",
        // DIST + "blog/**/*.html"
    ],
    "ignore": [
        // ".foundation-mq",
        // "/.*menu.*/",
        // "/.*submenu.*/",
        // "/.*parent.*/",
        // "/.*orbit.*/",
        // "/.*sticky.*/",
        // "/.*js\-.*/",
        // "/.*is\-.*/",
        // "/.*has\-.*/",
        // "/.*\-in.*/",
        // "/.*\-out.*/",
        "xxxxxxxxxx"
    ]
};



//==============================================================================
// SASS
//==============================================================================
function compile_sass(sourceFile, destDir, includePaths, uncss, uncssOptions) {
    var destDir = destDir ? destDir : 'css';
    var includePaths = includePaths ? includePaths : SASS_INCLUDE_PATHS;
    return gulp.src(SRC_SCSS + sourceFile)
//        .pipe(gp.sourcemaps.init())
        .pipe(gp.sass({
            includePaths: includePaths,
            outputStyle: 'expanded',
            indentWidth: 4,
            lineComments: false,
            precision: SASS_PRECISION
        }).on('error', gp.sass.logError))
        .pipe(gp.autoprefixer(AUTOPREFIXER_OPTIONS))
        .pipe(gp.if(uncss === true, gp.uncss(uncssOptions ? uncssOptions : UNCSS_OPTIONS)))
        .pipe(gulp.dest(DIST + destDir))
        .pipe(gp.cssnano(NANO_OPTIONS))
        .pipe(gp.rename({suffix: '.min'}))
//        .pipe(gp.sourcemaps.write('.',  {
//            includeContent: true,
//            addComment: true,
//            sourceRoot: '.'
//        }))
        .pipe(gulp.dest(DIST + destDir));
}


gulp.task('sass:main', function() {
    return compile_sass('p3-bs-navbar.scss', 'css', SASS_INCLUDE_PATHS, false);
});
gulp.task('sass', gulp.series('sass:main'));

gulp.task('watch:sass', function() {
    gulp.watch(SRC_SCSS + '*.scss', gulp.task('sass'));
});

gulp.task('js', function() {
  return gulp.src(SRC_JS + '*.js')
    .pipe(gp.strip())
    .pipe(gulp.dest(DIST_JS))
    .pipe(gp.uglify())
    .pipe(gp.rename({suffix: '.min'}))
    .pipe(gulp.dest(DIST_JS))
});

gulp.task('watch:js', function() {
    gulp.watch(SRC_JS + '*.js', gulp.task('js'));
});


gulp.task('watch', gulp.parallel('watch:sass', 'watch:js'));


gulp.task('default', function () {
    gulp.task('watch');
});
