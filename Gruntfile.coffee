module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    coffee:
      compile:
        files:
          'shepherd.js': 'shepherd.coffee'
          'docs/welcome/js/welcome.js': 'docs/welcome/coffee/welcome.coffee'

    watch:
      coffee:
        files: ['*.coffee', 'sass/*', 'docs/**/*']
        tasks: ['coffee', 'uglify', 'compass']
      options:
        atBegin: true

    uglify:
      shepherd:
        src: 'shepherd.js'
        dest: 'shepherd.min.js'
        options:
          banner: '/*! shepherd.js <%= pkg.version %> */\n'

    compass:
      dist:
        options:
          sassDir: 'sass'
          cssDir: 'css'
      welcomeDocs:
        options:
          sassDir: 'docs/welcome/sass'
          cssDir: 'docs/welcome/css'

    bower:
      install:
        options:
          targetDir: 'deps'
          cleanup: true
          layout: 'byComponent'
          bowerOptions:
            forceLatest: true
            production: true

  grunt.loadNpmTasks 'grunt-bower-task'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['bower', 'coffee', 'uglify', 'compass']