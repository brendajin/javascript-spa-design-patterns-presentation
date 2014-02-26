var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    // Do grunt-related things in here
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['public/views/*.handlebars','public/scss/*.scss'],
      tasks: ['handlebars','compass'],
      options: {
        spawn: false,
        livereload:true
      }
    },
    template_src:'',
    template_target: 'public/views',
    // Handlebars compilation task
    handlebars: {
      compile: {
        options: {
          // Remove folder path name from file
          processName: function (fileName) {
            return path.basename(fileName, '.handlebars');
          },
          namespace: "Handlebars.templates",
          amd: true
        },
        files: {
          '<%= template_target %>':'<%= template_src %>'
        }
      }
    },
    compass: {
      compile: {
        options: {
          sassDir: 'public/scss/',
          cssDir: 'public/css/',
          specify: 'public/scss/*.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.event.on('watch', function(action, filepath, target){
      grunt.log.write('target: ' + target, 'filepath: ' + filepath);

      // compile handlebars templates
      if(filepath.search(".handlebars") > 0) {
        var arr = filepath.split("/");
        for(var i=0; i < arr.length; i++){
            if(arr[i].indexOf(".handlebars") > -1){
                grunt.log.write('public/views/'+arr[i]+'.js');
                grunt.config('template_target','public/views/'+arr[i]+'.js');
            }
        }
        grunt.config('template_src',filepath);

        grunt.task.run('handlebars:compile');
      }
      // or compile sass
      else if(filepath.search(".scss") > 0) {
        grunt.log.write('\n Alert Alert!!! READY TO COMPILE .scss files  ');
        grunt.task.run('compass');
      }
  });

  grunt.registerTask('default', ['sass','handlebars','compass']);
  
};

