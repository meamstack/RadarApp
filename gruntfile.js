/*global module:false*/
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true
      },
      stylus: {
        files: ['www/styles/stylus/*'],
        tasks: ['stylus']
      },
      karma: {
        files: ['www/js/controllers/*.js',
                'www/js/directives/*.js', 
                'www/js/services/*.js',
                'www/app.js',
                'www/config.js',
                'www/index.js',
                'test/spec/*.js'],
        tasks: ['karma:unit:start']
      }
      //, phonegap: {
      //   files: ['www/js/*', 'www/img/*', '/www/views/*', '/www/views/*'],
      //   tasks: ['phonegap:build']
      // }
    },
    stylus: {
      compile: {
        options: {
          'paths': [
              'node_modules/',    // nib
              'styl/'             // Individual components
          ]
        },
        files: {
          'www/styles/css/main.css': ['www/styles/stylus/meetme.styl',
          'www/styles/stylus/map.styl', 'www/styles/stylus/createActivity.styl', 'www/styles/css/boilerplate.css','www/styles/css/map.css','www/styles/css/index.css']

        }
      }
    },
    copy: {
      examples: {
        expand: true,
        cwd: 'examples/',
        src: ['**'],
        dest: 'www/styles/exa/maines/'
      }
    },
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        options: {
          files: ['../test/spec/*.js']
        },
        background: true
      }
    }
    // phonegap: {
    //   config: {
    //     root: 'www',
    //     config: 'www/config.xml',
    //     cordova: '/.cordova',
    //     path: 'phonegap_grunt',
    //     plugins: [],
    //     platforms: ['ios'],
    //     verbose: false
    //   }
    // }
  });

  // Default task
  grunt.registerTask('default', ['stylus', 'copy', 'watch']);
  grunt.registerTask('karma', ['karma:unit:start']);

    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    // grunt.loadNpmTasks('grunt-phonegap');
};

