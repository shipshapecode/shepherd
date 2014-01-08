module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    coffee:
      compile:
        files:
          'utils.js': 'utils.coffee'
          'tether.js': 'tether.coffee'
          'constraint.js': 'constraint.coffee'
          'abutment.js': 'abutment.coffee'
          'shift.js': 'shift.coffee'
          'markAttachment.js': 'markAttachment.coffee'
          'docs/js/intro.js': 'docs/coffee/intro.coffee'
          'docs/welcome/js/welcome.js': 'docs/welcome/coffee/welcome.coffee'

    watch:
      coffee:
        files: ['*.coffee', 'sass/*', 'docs/**/*']
        tasks: ['coffee', 'uglify', 'compass']

    uglify:
      tether:
        src: ['utils.js', 'tether.js', 'constraint.js', 'abutment.js', 'shift.js']
        dest: 'tether.min.js'
        options:
          banner: '/*! tether.js <%= pkg.version %> */\n'

    compass:
      dist:
        options:
          sassDir: 'sass'
          cssDir: 'css'
      introDocs:
        options:
          sassDir: 'docs/sass'
          cssDir: 'docs/css'
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

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-bower-task'

  grunt.registerTask 'default', ['bower', 'coffee', 'uglify', 'compass']
