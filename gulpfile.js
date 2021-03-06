// Generated by CoffeeScript 1.7.1
(function() {
  var changed, coffee, component, concat, gulp, jade, livereload, lr, open, paths, plumber, prefix, size, stylus, uglify, util;

  gulp = require('gulp');

  coffee = require('gulp-coffee');

  jade = require('gulp-jade');

  stylus = require('gulp-stylus');

  concat = require('gulp-concat');

  uglify = require('gulp-uglify');

  util = require('gulp-util');

  plumber = require('gulp-plumber');

  component = require('gulp-component');

  changed = require('gulp-changed');

  livereload = require('gulp-livereload');

  prefix = require('gulp-autoprefixer');

  size = require('gulp-size');

  open = require('open');

  lr = require('tiny-lr')();

  paths = {
    src: {
      scripts: ['src/*.coffee']
    },
    build: 'test',
    component: {
      src: 'component.json',
      build: 'build/libs'
    }
  };

  gulp.task('coffeescript', function() {
    return gulp.src(paths.src.scripts).pipe(plumber()).pipe(coffee()).pipe(concat('index.js')).pipe(size({
      showFiles: true
    })).pipe(gulp.dest('.'));
  });

  gulp.task('build', function() {
    return gulp.src(paths.component.src).pipe(plumber()).pipe(component({
      standalone: false
    })).pipe(gulp.dest(paths.component.build)).pipe(gulp.dest('test/libs/'));
  });

  gulp.task('staticsvr', function() {
    var Config, server, staticS;
    staticS = require('node-static');
    server = new staticS.Server('./' + paths.build);
    Config = {
      port: 1234,
      livereloadport: 35729
    };
    require('http').createServer(function(request, response) {
      request.addListener('end', function() {
        server.serve(request, response);
      }).resume();
    }).listen(Config.port, function() {
      util.log('Server listening on port: ' + util.colors.magenta(Config.port));
    });
    lr.listen(Config.livereloadport);
    util.log(util.colors.yellow("Livereload listening on port " + Config.livereloadport));
    open("http://localhost:" + Config.port);
  });

  gulp.task('reload', function() {
    var server;
    server = livereload(lr);
    return gulp.watch(paths.build + '/**').on('change', function(file) {
      return server.changed(file.path);
    });
  });

  gulp.task('watch', ['staticsvr', 'reload'], function() {
    gulp.watch(['src/**/*.coffee'], ['coffeescript']);
    return gulp.watch('component.json', ['build']);
  });

  gulp.task('default', ['coffeescript', 'build', 'watch']);

}).call(this);
