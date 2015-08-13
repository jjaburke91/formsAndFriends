/**
 * All of this code was originally written for my Katina project (https://github.com/jjaburke91/katinaTheme/blob/develop_makeover/Gruntfile.js)
 * I've removed the commentary that was copied over, changes from original are very minor.
 */

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        wiredep: {
            task: {
                src: ['index.html']
            }
        },

        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: './lib',
                    cleanTargetDir: true
                }
            }
        },

        // Concatenates all angular files and views
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [ 'angular/*.js', 'angular/**/*.js' ],
                dest: 'dist/dist-app.js'
            }
        },

        less: {
            development: {
                files: {
                    'dist/style.css' : 'style.less'
                }
            }
        },

        watch: {
            dev: {
                files: [ 'index.html', 'Gruntfile.js', 'angular/*.js', 'angular/**/*.js', '*.less' ],
                tasks: [ 'concat:dist', 'less' ],
                options: {
                    atBegin: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('dev', [ 'bower', 'less', 'watch:dev' ]);
    grunt.registerTask('package', [ 'bower', 'concat:dist' ]);
    grunt.registerTask('build', ['bower:install', 'less', 'concat:dist', 'wiredep'])

};
