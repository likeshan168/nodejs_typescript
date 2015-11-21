module.exports = function (grunt) {

  grunt.initConfig({
    ts: {
      build_server: {
        src: ['./routes/*.ts', './server_src/*/*.ts'],
        options: {
          module: 'commonjs',//适用于后台的js代码，例如：nodejs  (amd: 专门为浏览器端设计的js规范)
          // failOnTypeErrors: false
        }
      },
      build_client: {
        src: ['./client_src/*/*.ts'],
        options: {
          module: 'amd',//适用于后台的js代码，例如：nodejs  (amd: 专门为浏览器端设计的js规范)
          // failOnTypeErrors: false
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          './client_src/style/style.css': './client_src/style/*.scss'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
        spawn: false
      },
      ts_server: {
        files: ['<%= ts.build_server.src %>'],
        tasks: ['ts:build_server']
      },
      ts_client: {
        files: ['<%= ts.build_client.src %>'],
        tasks: ['ts:build_client']
      },
      sass_scss: {
        files: ['./client_src/style/*.scss'],
        tasks: ['sass']
      }
    }
  });

  // grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks("grunt-ts");
  grunt.registerTask('build', ['ts', 'sass', 'watch']);
  grunt.registerTask('default', ['build']);
};