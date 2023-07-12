const gulp = require('gulp');

const path = require('path');

// const nodesass = require('node-sass');
const dartsass = require('sass');

// Define gulp-plugins container object
const gp = {
    autoprefixer: require('gulp-autoprefixer'),
    babel: require('gulp-babel'),
    concat: require('gulp-concat'),
    // cssnano : require('gulp-cssnano'), // Replaced by cleancss
    cleancss: require('gulp-clean-css'),
    filter: require('gulp-filter'),
    if: require('gulp-if'),
    rtlcss: require('gulp-rtlcss'),
    rename: require('gulp-rename'),
    sass: require('gulp-sass')(dartsass),
    sourcemaps: require('gulp-sourcemaps'),
    stripCssComments : require('gulp-strip-css-comments'),
    stripJsComments: require('gulp-strip-comments'),
    terser: require('gulp-terser'),
    //watch: require('gulp-watch'),
    // uglify: require('gulp-uglify'), // Replaced by terser
    // uncss: require('gulp-uncss'),
    '_': null
};

const CUR_DIR = `${__dirname}/`

const SRC  = `${CUR_DIR}src/`;
const DIST =`${CUR_DIR}dist/`;;

const SRC_SCSS = `${SRC}scss/`;
const SRC_JS = `${SRC}js/`;

const DIST_JS = `${DIST}js/`;
const DIST_CSS = `${DIST}css/`;

const NODE_SRC = `${SRC}node_modules/`;
//const NODE_SRC_GLOBAL = `/usr/lib/node_modules/`;
const BOWER_SRC = `${SRC}bower_components/`;

const BS_SCSS = `${BOWER_SRC}bootstrap/scss/`;
const BS_JS_SRC = `${BS_SCSS}javascripts/bootstrap/`;

const JS_PATHS = [
    SRC_JS,
];

const SASS_INCLUDE_PATHS = [
    //`${NODE_SRC_GLOBAL}compass-mixins/lib/`,
    SRC_SCSS,
    NODE_SRC,
    BOWER_SRC,
];
const SASS_PRECISION = 15 // not supported in dart-sass

const NANO_OPTIONS = {
    safe: true,
    autoprefixer: true,
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

//// Better use uncss on a project basis
//const UNCSS_OPTIONS = {
//    html: [
//    ],
//    ignore: [
//    ]
//};

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

const SOURCEMAPS = true;
const SOURCEMAPS_INIT_OPTIONS = {
    loadMaps: false,
};
const SOURCEMAPS_WRITE_OPTIONS = {
    includeContent: true,
    addComment: true,
//    sourceRoot: '.'
};

//==============================================================================
// SASS
//==============================================================================
function compile_sass(
    sourceFile,
    destDir,
    includePaths,
    sourcemaps = null,
    rtl = null
) {
    destDir = destDir || DIST_CSS;
    includePaths = includePaths || SASS_INCLUDE_PATHS;
    sourcemaps = sourcemaps !== null ? Boolean(sourcemaps) : SOURCEMAPS;
    rtl = rtl !== null ? Boolean(rtl) : false;

    return gulp.src(SRC_SCSS + sourceFile)
        .pipe(gp.if(sourcemaps === true, gp.sourcemaps.init(SOURCEMAPS_INIT_OPTIONS)))
        .pipe(gp.sass({
            includePaths: includePaths,
            outputStyle: 'expanded',
            indentWidth: 4,
            //precision: SASS_PRECISION, // Removed in dart-sass
            lineComments: false
        }).on('error', gp.sass.logError))
        .pipe(gp.stripCssComments())
        .pipe(gp.autoprefixer(AUTOPREFIXER_OPTIONS))
        //.pipe(gp.if(uncss === true, gp.uncss(UNCSS_OPTIONS)))
        .pipe(gp.if(rtl === true, gp.rtlcss()))
        .pipe(gp.if(rtl === true, gp.rename({suffix: '.rtl'})))
        .pipe(gp.if(sourcemaps === true, gp.sourcemaps.write('.', SOURCEMAPS_WRITE_OPTIONS)))
        .pipe(gulp.dest(DIST_CSS))
        .pipe(gp.filter("*.css"))
        .pipe(gp.cleancss())
        .pipe(gp.rename({suffix: '.min'}))
        .pipe(gp.if(sourcemaps === true, gp.sourcemaps.write('.', SOURCEMAPS_WRITE_OPTIONS)))
        .pipe(gulp.dest(DIST_CSS));
}

function convert_to_rtl(
    sourceFile,
    destDir,
    sourcemaps = null,
) {
    destDir = destDir || DIST_CSS;
    sourcemaps = sourcemaps !== null ? Boolean(sourcemaps) : SOURCEMAPS;

    return gulp.src(DIST_CSS + sourceFile)
        .pipe(gp.if(sourcemaps === true, gp.sourcemaps.init(SOURCEMAPS_INIT_OPTIONS)))
        .pipe(gp.rtlcss())
        .pipe(gp.rename({suffix: '.rtl'}))
        .pipe(gp.if(sourcemaps === true, gp.sourcemaps.write('.', SOURCEMAPS_WRITE_OPTIONS)))
        .pipe(gulp.dest(DIST_CSS))
        .pipe(gp.filter("*.css"))
        .pipe(gp.cleancss())
        .pipe(gp.rename({suffix: '.min'}))
        .pipe(gp.if(sourcemaps === true, gp.sourcemaps.write('.', SOURCEMAPS_WRITE_OPTIONS)))
        .pipe(gulp.dest(DIST_CSS));
}

// SASS tasks
gulp.task('sass:common:ltr', function() {
    return compile_sass('pine3ree-bs-navbar.scss');
});
gulp.task('sass:inherit:ltr', function() {
    return compile_sass('pine3ree-bs-navbar.inherit.scss');
});
gulp.task('sass:blend:ltr', function() {
    return compile_sass('pine3ree-bs-navbar.blend.scss');
});
gulp.task('sass:ltr', gulp.series('sass:common:ltr', 'sass:inherit:ltr', 'sass:blend:ltr'));

gulp.task('sass:common:rtl', function() {
    return compile_sass('pine3ree-bs-navbar.scss', null, null, null, true);
});
gulp.task('sass:inherit:rtl', function() {
    return compile_sass('pine3ree-bs-navbar.inherit.scss', null, null, null, true);
});
gulp.task('sass:blend:rtl', function() {
    return compile_sass('pine3ree-bs-navbar.blend.scss', null, null, null, true);
});
gulp.task('sass:rtl', gulp.series('sass:common:rtl', 'sass:inherit:rtl', 'sass:blend:rtl'));

gulp.task('sass', gulp.series('sass:ltr', 'sass:rtl'));
gulp.task('watch:sass', function() {
    gulp.watch(SRC_SCSS + '*.scss', gulp.task('sass'));
});

function compile_js(
    sourceDir,
    destDir,
    sourcemaps = null
) {
    sourceDir = sourceDir || SRC_JS;
    destDir   = destDir   || DIST_JS;
    sourcemaps = sourcemaps !== null ? !!sourcemaps : SOURCEMAPS;

    return gulp.src(SRC_JS + '*.js')
        .pipe(gp.if(sourcemaps === true, gp.sourcemaps.init(SOURCEMAPS_INIT_OPTIONS)))
        .pipe(gp.babel({
            presets: [
                "@babel/preset-env",
            ]
        }))
        .pipe(gp.stripJsComments())
        .pipe(gp.if(sourcemaps === true, gp.sourcemaps.write('.', SOURCEMAPS_WRITE_OPTIONS)))
        .pipe(gulp.dest(destDir))
        .pipe(gp.filter("*.js"))
        //.pipe(gp.uglify()) // Now using terser for es6
        .pipe(gp.terser())
        .pipe(gp.rename({suffix: '.min'}))
        .pipe(gp.if(sourcemaps === true, gp.sourcemaps.write('.', SOURCEMAPS_WRITE_OPTIONS)))
        .pipe(gulp.dest(destDir))
}

// JS tasks
gulp.task('js', function() {
    return compile_js(SRC_JS, DIST_JS);
});
gulp.task('watch:js', function() {
    gulp.watch(SRC_JS + '*.js', gulp.task('js'));
});

// GLOBAL tasks
gulp.task('default', gulp.series('sass', 'js'));
gulp.task('watch', gulp.parallel('watch:sass', 'watch:js'));
