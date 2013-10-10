/*global module:false*/
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: 35728
      },
      stylus: {
        files: ['www/styles/stylus/*'],
        tasks: ['stylus']
      },
      // phonegap: {
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
          'www/styles/stylus/leaflet.styl', 'www/styles/stylus/createActivity.styl', 'www/styles/css/boilerplate.css','www/styles/css/leaflet.css','www/styles/css/index.css']
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
    phonegap: {
      config: {
        root: 'www',
        config: 'www/config.xml',
        cordova: '/.cordova',
        path: 'phonegap_grunt',
        plugins: [],
        platforms: ['ios'],
        verbose: false
      }
    }
  });

  // Default task
  grunt.registerTask('default', ['stylus', 'copy', 'watch']);

    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-phonegap');
};

