const gulp = require('gulp');

const path = require('path');

const dartsass = require('sass');
const nodesass = require('node-sass');

// define gulp-plugins container
const gp = {
    babel: require('gulp-babel'),
    rename: require('gulp-rename'),
    sass: require('gulp-sass')(dartsass),
    //cssnano : require('gulp-cssnano'), use cleancss now
    cleancss: require('gulp-clean-css'),
    if: require('gulp-if'),
    stripCssComments : require('gulp-strip-css-comments'),
    uncss: require('gulp-uncss'),
    rtlcss: require('gulp-rtlcss'),
    concat: require('gulp-concat'),
    stripJsComments: require('gulp-strip-comments'),
    //uglify: require('gulp-uglify'), // use terser now
    terser: require('gulp-terser'),
    sourcemaps: require('gulp-sourcemaps'),
    autoprefixer: require('gulp-autoprefixer'),
    //watcher : require('glob-watcher'),
    watch: require('gulp-watch'),
    '_': null
};

//gp.sass.compiler = require('dart-sass');

const CUR_DIR = `${__dirname}/`

const SRC  = `${CUR_DIR}src/`;
const DIST =`${CUR_DIR}dist/`; //'/';

const SRC_SCSS = `${SRC}scss/`;
const SRC_JS = `${SRC}js/`;

const DIST_JS = `${DIST}js/`;
const DIST_CSS = `${DIST}css/`;

const NODE_SRC = `${SRC}node_modules/`;
const NODE_SRC_GLOBAL = `/usr/lib/node_modules/`;
const BOWER_SRC = `${SRC}bower_components/`;

const BS_SCSS = `${BOWER_SRC}bootstrap/scss/`;
const BS_JS_SRC = `${BS_SCSS}javascripts/bootstrap/`;

const JS_PATHS = [
    SRC_JS,
];

const SASS_INCLUDE_PATHS = [
    `${NODE_SRC_GLOBAL}compass-mixins/lib/`,
    SRC_SCSS,
    NODE_SRC,
    BOWER_SRC,
];
const SASS_PRECISION = 15 // not supported in dart-sass

const NANO_OPTIONS = {
    safe: true,
    autoprefixer: true,
//    reduceIdents: {
//        keyframes: false
//    },
//    discardUnused: {
//        keyframes: false
//    },
//    discardComments: {
//        removeAll: true
//    },
};

const AUTOPREFIXER_OPTIONS = {
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
        "Edge >= 12",
        "not Explorer <= 11",
    ]
};

const UNCSS_OPTIONS = {
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

const TERSER_OPTION = {
    compress: {
        passes: 2,
    },
    mangle: true,
    sourceMap: {
        // source map options
    },
    ecma: 5,
};

//==============================================================================
// SASS
//==============================================================================
function compile_sass(
    sourceFile,
    destDir = DIST_CSS,
    includePaths = SASS_INCLUDE_PATHS,
    uncss = false,
    uncssOptions = null,
    rtl = false
) {
    destDir = destDir || DIST_CSS;
    includePaths = includePaths || SASS_INCLUDE_PATHS;
    uncss = uncss !== null ? Boolean(uncss) : false;
    uncssOptions = uncssOptions || UNCSS_OPTIONS;
    rtl = rtl !== null ? Boolean(rtl) : false;

    return gulp.src(SRC_SCSS + sourceFile)
//        .pipe(gp.sourcemaps.init())
        .pipe(gp.sass({
            includePaths: includePaths,
            outputStyle: 'expanded',
            indentWidth: 4,
            lineComments: false,
            //precision: SASS_PRECISION // removed in dart-sass
        }).on('error', gp.sass.logError))
        .pipe(gp.stripCssComments())
        .pipe(gp.autoprefixer(AUTOPREFIXER_OPTIONS))
        .pipe(gp.if(uncss === true, gp.uncss(uncssOptions)))
        .pipe(gp.if(rtl === true, gp.rtlcss()))
        .pipe(gp.if(rtl === true, gp.rename({suffix: '.rtl'})))
        .pipe(gulp.dest(DIST_CSS))
        .pipe(gp.cleancss())
        .pipe(gp.rename({suffix: '.min'}))
//        .pipe(gp.sourcemaps.write('.',  {
//            includeContent: true,
//            addComment: true,
//            sourceRoot: '.'
//        }))
        .pipe(gulp.dest(DIST_CSS));
}

function convert_to_rtl(
    sourceFile,
    destDir = DIST_CSS
) {
    destDir = destDir || DIST_CSS;

    return gulp.src(DIST_CSS + sourceFile)
//        .pipe(gp.sourcemaps.init())
        .pipe(gp.stripCssComments())
        .pipe(gp.rtlcss())
        .pipe(gp.rename({suffix: '.rtl'}))
        .pipe(gulp.dest(DIST_CSS))
        .pipe(gp.cleancss())
        .pipe(gp.rename({suffix: '.min'}))
//        .pipe(gp.sourcemaps.write('.',  {
//            includeContent: true,
//            addComment: true,
//            sourceRoot: '.'
//        }))
        .pipe(gulp.dest(DIST_CSS));
}


gulp.task('sass:ltr', function() {
    return compile_sass('p3-bs-navbar.scss');
});
//gulp.task('sass:rtl', function() {
//    return compile_sass('p3-bs-navbar.scss', null, null, false, null, true);
//});
gulp.task('sass:rtl', function() {
    return convert_to_rtl('p3-bs-navbar.css');
});

gulp.task('sass', gulp.series('sass:ltr','sass:rtl'));

gulp.task('watch:sass', function() {
    gulp.watch(SRC_SCSS + '*.scss', gulp.task('sass'));
});

gulp.task('js', function() {
  return gulp.src(SRC_JS + '*.js')
    .pipe(gp.stripJsComments())
    .pipe(gp.babel({
        presets: [
            "@babel/preset-env",
        ]
    }))
    .pipe(gp.sourcemaps.init())
    .pipe(gulp.dest(DIST_JS))
    //.pipe(gp.uglify()) // use teaser for es6
    .pipe(gp.terser())
    .pipe(gp.rename({suffix: '.min'}))
    .pipe(gp.sourcemaps.write('./'))
    .pipe(gulp.dest(DIST_JS))
});

gulp.task('watch:js', function() {
    gulp.watch(SRC_JS + '*.js', gulp.task('js'));
});


gulp.task('watch', gulp.parallel('watch:sass', 'watch:js'));

gulp.task('default', function () {
    gulp.task('watch');
});
