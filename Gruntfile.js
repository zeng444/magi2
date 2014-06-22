module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      buildAll:  {
        files: [{
          expand: true,
          cwd: "core",//js/src目录下
          src: ["*.js", "!*.min.js", "!*-min.js", "!jquery.pie.js"],//所有js文件
          dest: "core/min/"//输出到此目录下
        }]
      },
    },

    concat: {
      merger: {
        files: {
          
          "core/min/all.js": ["core/min/*.js",],
        }
      }
    },

    jshint:{
       foo:{
        src:['core/*.js']
       },
       options: {
         // 可以在这里重写 JSHint 的默认配置选项
        globals: {
          jshintrc: true
        }
      }
    },
      //编译less
      less: {
          options: {
              //编译后的文件加入行号信息
              // dumpLineNumbers: "comments",
          },
          buildall: {
              files: [{
                  expand: true,
                  cwd: "css",
                  src: [ "**/*.less", "!**/*.module.less" ],
                  dest: "css",
                  ext: ".css"
              }]
          }
      },
    // jshint: {
    //     options: {
    //         curly: true,
    //         eqeqeq: true,
    //         newcap: true,
    //         noarg: true,
    //         sub: true,
    //         undef: true,
    //         boss: true,
    //         node: true
    //     },
    //     globals: {
    //         exports: true
    //     }
    // },
    watch: {
      files: ['*/*.less'],
      tasks: ['less']
    }


  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');

  // 在命令行执行 "grunt test" 会运行 test 任务
  grunt.registerTask('test', ['watch']);

  grunt.registerTask('build', ['less']);
  // 在命令行执行 "grunt" 会运行 default 任务
  grunt.registerTask('default', [ 'uglify','concat']);

};