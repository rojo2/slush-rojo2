"use strict";

const gulp = require("gulp"),
      plugins = require("gulp-load-plugins")(),
      browserify = require("browserify"),
      babelify = require("babelify"),
      source = require("vinyl-source-stream"),
      path = require("path"),
      bs = require("browser-sync");

const CONFIG = {

  SRC: {
    SCRIPTS:    "./src/scripts/**/*.js",
    STYLES:     "./src/styles/**/*.styl",
    TEMPLATES:  "./src/templates/**/*.jade"
  },

  INDEX: {
    SCRIPT: "./src/scripts/index.js",
    STYLE: "./src/styles/index.styl",
    TEMPLATE: "./src/templates/index.jade"
  },

  BUILD: {
    SCRIPT: "./build/",
    STYLE: "./build/",
    TEMPLATE: "./build/"
  },

  GLOBALS: {
    TEMPLATE: {

    },
    STYLE: {

    },
    SCRIPT: {

    }
  }

};

gulp.task("scripts:lint", () => {

  gulp.src(CONFIG.SRC.SCRIPTS)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());

});

gulp.task("scripts", () => {

  browserify(CONFIG.INDEX.SCRIPT, { debug: true })
    .transform(babelify)
    .bundle()
    .pipe(source(path.basename(CONFIG.INDEX.SCRIPT)))
    .pipe(gulp.dest(CONFIG.BUILD.SCRIPT))
    .pipe(bs.stream());

});

gulp.task("styles:lint", () => {

  gulp.src(CONFIG.SRC.STYLES)
    .pipe(plugins.stylint({ config: ".stylintrc" }))
    .pipe(plugins.stylint.reporter());

});

gulp.task("styles", () => {

  gulp.src(CONFIG.INDEX.STYLE)
    .pipe(plugins.stylus())
    .pipe(gulp.dest(CONFIG.BUILD.STYLE))
    .pipe(bs.stream());

});

gulp.task("templates", () => {

  gulp.src(CONFIG.INDEX.TEMPLATE)
    .pipe(plugins.jade({
      pretty: true,
      locals: CONFIG.GLOBALS.TEMPLATE
    }))
    .pipe(gulp.dest(CONFIG.BUILD.TEMPLATE))
    .pipe(bs.stream());

});

gulp.task("watch", ["build"], () => {

  gulp.watch(CONFIG.SRC.SCRIPTS, ["scripts"]);
  gulp.watch(CONFIG.SRC.STYLES, ["styles"]);
  gulp.watch(CONFIG.SRC.TEMPLATES, ["templates"]);

  bs.init({
    server: {
      baseDir: CONFIG.BUILD.TEMPLATE
    }
  });

});

gulp.task("build", ["scripts", "templates", "styles"]);

gulp.task("default", ["watch"]);
