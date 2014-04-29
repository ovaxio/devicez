#-----------------------------
# dependencies
#--------
gulp = require 'gulp'
coffee = require 'gulp-coffee'
jade = require 'gulp-jade'
stylus = require 'gulp-stylus'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'
util = require 'gulp-util'
plumber = require 'gulp-plumber'
component = require 'gulp-component'
changed = require 'gulp-changed'
livereload = require 'gulp-livereload'
prefix = require 'gulp-autoprefixer'
size = require 'gulp-size'
open = require 'open'
lr = require('tiny-lr')()

#-----------------------------
# configs
#--------
paths =
  src:
    scripts: [
      'src/*.coffee'
    ]
  build: 'test'
  component:
    src: 'component.json'
    build: 'build/libs'

#-----------------------------
# compiler Coffeescript
#--------
gulp.task 'coffeescript', ()->
  gulp.src paths.src.scripts
    .pipe plumber()
    .pipe coffee()
    .pipe concat 'index.js'
    .pipe size
      showFiles: true
    .pipe gulp.dest '.'

#-----------------------------
# Build the component dependencies
#--------
gulp.task 'build', ()->
  gulp.src paths.component.src
    .pipe plumber()
    .pipe component
      standalone: false
    .pipe gulp.dest paths.component.build
    .pipe gulp.dest 'test/libs/'

#-----------------------------
# Create a static server
#--------
gulp.task 'staticsvr', ()->
  staticS = require 'node-static'
  server = new staticS.Server './' + paths.build
  Config =
    port : 1234
    livereloadport : 35729

  require 'http'
    .createServer (request, response)->
      request.addListener 'end', ()->
        server.serve request, response
        return
      .resume()
      return
    .listen Config.port, ()->
      util.log 'Server listening on port: ' + util.colors.magenta(Config.port)
      return
  lr.listen Config.livereloadport
  util.log util.colors.yellow("Livereload listening on port " + Config.livereloadport)
  open("http://localhost:"+Config.port)
  return

#-----------------------------
# Realod Task
#--------
gulp.task 'reload', ()->
  server = livereload(lr)
  gulp.watch paths.build + '/**'
    .on 'change', (file)->
      server.changed file.path

#-----------------------------
# Watch task
#--------
gulp.task 'watch', ['staticsvr','reload'], ()->
  gulp.watch ['src/**/*.coffee'], ['coffeescript']
  gulp.watch 'component.json', ['build']

#-----------------------------
# Default task
#--------
gulp.task 'default', ['coffeescript', 'build', 'watch']