//This gulp file is continuously looking for any change
//for html file,JavaScript files or SCSS files anywhere in folder src


//Include all required modules
const {src, dest, series, parallel, watch} = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const cssnano = require("gulp-cssnano");
const browserSync = require("browser-sync").create();
const del = require("del");
const imagemin = require("gulp-imagemin");
const sass = require('gulp-sass'); 
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');

//Define an object named files with these members 
//htmlPath, JavaScript, imagePath or sassPath
const files = {
   htmlPath: "src/**/*.html",
   jsPath: "src/**/*.js",
   imagePath:"src/images/*",
   sassPath:"src/sass/*.scss"
}

//Removes the pub folder completely
function clean() 
{
   return del(['pub/']);
}

//This task is doing the following
//1.Search for html files somewhere in src folder
//2.Copy the html file to folder pub
//3.run browserSync to open browser
function copyHTML()
{
   return src(files.htmlPath)
      .pipe(dest("pub"))
      .pipe(browserSync.stream());
}

//This task is doing the following
//1.Search for JavaScript files somewhere in src folder
//2.Add all of these JavaScript files to one main.js
//3.Minify the JavaScript file that is now stored in menory
//4.Place this main.js in folder pub/js
//5.run browserSync to open browser
function jsFiles()
{
   return src(files.jsPath)
      .pipe(concat("main.js"))
      .pipe(dest("pub/js"))
      .pipe(browserSync.stream());
}

//This task is doing the following
//1. Search for scss files in src/sass folder
//2  sourcemaps keeps the path to the original file
//3. Minify the css files that is now stored in memory
//4. Write info about sourcemaps so we know the source file
//5. Add all of these css files to one styles.css
//6. Place this styles.css in folder pub/css
//7. run browserSync to open browser
function sassTask()
{
   return src(files.sassPath)
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle:"compressed"}).on('error', sass.logError))
      .pipe(sourcemaps.write("./maps"))
      .pipe(concat("styles.css"))
      .pipe(dest("pub/css"))
      .pipe(browserSync.stream());
}

//This task is doing the following
//1. Search for any kind of image in src/images
//2. Minify the images
//3. Add all the images to pub/images
//4.run browserSync to open browser
function imageFiles()
{
   return src(files.imagePath)
    .pipe(imagemin())
    .pipe(dest("pub/images"))
    .pipe(browserSync.stream());
}


 // 1. Initialize browserSync som startar en lokal server öppnar en webbläsare
 // 2. run watch to keep looking for changes(html,js and css)
function serve() {
   browserSync.init({
      server: 'pub/'
   });

   watchTask();
}

//This task is doing the following
//1. Watch for changes in html,JavaScript or css files somewhere in src folder
//2. If changes are found run copyHTML, jsFiles and cssFiles in parallel
function watchTask()
{
   watch([files.htmlPath, files.jsPath, files.sassPath], 
      parallel(copyHTML, jsFiles, sassTask, imageFiles));
}

//Define some tasks as default.
//This default action is doing the following
//1. Run the clean function in serie
//2. run copyHTML,jsFiles and cssFiles in parallell
//3. run serve in serie
exports.default = series(clean,
   parallel(copyHTML, jsFiles, sassTask,imageFiles), 
   serve);