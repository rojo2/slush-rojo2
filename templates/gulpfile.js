const gulp = require("gulp");
const plugins = require("gulp-load-plugins")();
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const path = require("path");
const bs = require("browser-sync");

gulp.task("scripts:lint", () => {

  gulp.src("src/scripts/**/*.js")
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());

});

gulp.task("scripts", () => {

  return browserify({
      debug: process.env.NODE_ENV === "development",
      paths: ["src/scripts"]
    })
    .add("src/scripts/app/index.js")
    .transform("babelify")
    .bundle()
    .pipe(source("index.js"))
    .pipe(gulp.dest("dist"));

});

gulp.task("styles:lint", () => {

  gulp.src("src/styles/**/*.styl")
    .pipe(plugins.stylint({ config: ".stylintrc" }))
    .pipe(plugins.stylint.reporter());

});

gulp.task("styles", () => {

  gulp.src("src/styles/index.styl")
    .pipe(plugins.stylus({
      compress: process.env.NODE_ENV === "production"
    }))
    .pipe(gulp.dest("dist"));

});

gulp.task("templates", () => {

  gulp.src("src/templates/index.pug")
    .pipe(plugins.pug({
      pretty: process.env.NODE_ENV === "development",
      locals: {}
    }))
    .pipe(gulp.dest(CONFIG.BUILD.TEMPLATE))
    .pipe(bs.stream());

});

gulp.task("bs", ["watch"], () => {

  bs.init({
    server: {
      baseDir: "dist"
    }
  });

});

gulp.task("watch", ["build"], () => {

  gulp.watch(CONFIG.SRC.SCRIPTS, ["scripts"]);
  gulp.watch(CONFIG.SRC.STYLES, ["styles"]);
  gulp.watch(CONFIG.SRC.TEMPLATES, ["templates"]);

});

gulp.task("build", ["scripts", "templates", "styles"]);

gulp.task("default", ["bs"]);

