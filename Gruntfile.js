'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mocha: {
            browser: ['test/**/*.html'],
            options: {
                run: true,
                reporter: 'Nyan'
            }
        },
        jst: {
            options: {
                amd: true
            },
            compile: {
                files: {
                    'app/dist/scripts/templates.js': ['app/scripts/templates/*.ejs']
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    keepalive: true,
                    livereload: true,
                    open: true,
                    base: 'app'
                }
            }
        },
        watch: {
            development: {
                options: {
                    livereload: true
                },
                files: ['app/scripts/**/*.js', 'app/scripts/**/*.ejs', 'test/**/*.html'],
                tasks: ['jst', 'mocha']
            }
        },
        parallel: {
            dev: {
                options: {
                    stream: true
                },
                tasks: [
                    {
                        grunt: true,
                        args: ['connect']
                    },
                    {
                        grunt: true,
                        args: ['watch']
                    }
                ]
            }
        }
    });

    grunt.registerTask('test', [
        'jst',
        'mocha'
    ]);

    grunt.registerTask('default', [
        'jst',
        'parallel'
    ]);
};
