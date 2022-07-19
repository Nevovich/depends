let resultFolder = 'dist';
let sourceFolder = 'src'; 
// deploy data:
let domenName = 'depends.ru'
let ftpHost = 'depends.ru'
let ftpUser = 'depends_ru_usr'
let ftpPass = 'hylDCg!Pan4G5xh73'



let path = {
    build:{
        html: resultFolder+'/',
        css: resultFolder+'/css/',
        js: resultFolder+'/js/',        
        img: resultFolder+'/img/',
        fonts: resultFolder+'/fonts/',
        serverFiles: resultFolder + '/server/'
    },
    src:{
        html: sourceFolder+'/*.html',
        css: sourceFolder+'/css/*.css',
        minJs: sourceFolder+'/js/*.min.js',
        js: [sourceFolder+'/js/*.js', '!' + sourceFolder+'/js/*.min.js'],
        img: sourceFolder+'/img/**/*.{jpg,png,jpeg}',
        nonCompressibleImg: [sourceFolder+'/img/**', '!' + sourceFolder+'/img/**/*.{jpg,png,jpeg}'],
        fonts: sourceFolder+'/fonts/**/**/*.{woff,woff2}',
        serverFiles: sourceFolder + '/server/**'
    },
    clean: resultFolder + '/' + '!' + resultFolder+'/img/',
    fullClean: resultFolder + '/'
};

let {src, dest, gulp, series} = require('gulp');
let del = require('del');
let uglify = require('gulp-uglify');
let tinypng = require('gulp-tinypng-compress');
let ftp = require('vinyl-ftp');



function html() {
    return src(path.src.html)
        .pipe(dest(path.build.html))  
};
// clean all excluded images from dist
function cleanDist() {
    return del(path.clean);
};
// clean all files from dist
function cleanDistFull() {
    return del(path.fullClean);
};
function moveCss() {
    return src(path.src.css)
    .pipe(dest(path.build.css))
};
function minifyJs() {
    return src(path.src.js)
        .pipe(uglify())
        .pipe(dest(path.build.js));
    // return src(path.src.minjs)
    //     .pipe(dest(path.build.js));
};
function moveMinifiedJs() {
    return src(path.src.minJs)
        .pipe(dest(path.build.js));
};
function imageMinify() {
    return src(path.src.img)
    .pipe(tinypng({
        key: 'RlSvZTP2BVnbvcJmQdfbgGvxQx6x02R0'
    }))
    .pipe(dest(path.build.img));
};
function moveFonts() {
    return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
};
function moveServerFiles() {
    return src(path.src.serverFiles)
    .pipe(dest(path.build.serverFiles))
};
function moveSVG() {
    return src(path.src.nonCompressibleImg)
    .pipe(dest(path.build.img))
};
function defaultTask() {
    // place code for your default task here
    // вот сюда потом ебануть все функции по типу html(); и тд
    cleanDist();
    html();
    moveCss();
    minifyJs();

    // cb();
}

function fullDeploy(done) {
    var conn = ftp.create({
    host:      ftpHost,
    user:      ftpUser,
    password:  ftpPass,
    // log: gutil.log
    });
    let globs = [resultFolder + '/**']
        return src(globs, {buffer: false})
        .pipe(conn.dest('/www/'+ domenName + '/'));
        done();
};  
// exports.default = defaultTask
exports.default = series(cleanDistFull, html, moveCss, minifyJs, moveMinifiedJs, moveFonts, imageMinify, moveSVG);
exports.fullDeployToServ = series(cleanDistFull, html, moveCss, minifyJs, moveMinifiedJs, moveFonts, imageMinify, moveSVG, moveServerFiles, fullDeploy);

// defualt but without img
exports.smartDeploy = series(cleanDist, html, moveServerFiles, moveCss, minifyJs, moveMinifiedJs, moveFonts, moveServerFiles, fullDeploy);