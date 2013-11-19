module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: { dist: { files: { 'dist/js/<%= pkg.name %>.min.js': [
            'src/bower_components/jquery/jquery.min.js'
        ] } } },
        watch:       { less:  { files: ['src/**/*.less'], tasks: ['less'], options: { spawn: true } } },
        targethtml:  { dist:    { files: { 'build/index.html': 'src/index.html'} },
                       optimal: { files: { 'build/optimal.html': 'src/index.html'} }},
        less:        { dist:    { files: { "build/css/main.css": "src/less/main.less" } } },
        concurrent:  { dev:     { tasks: ['watch'], options: { logConcurrentOutput: true } } },
        cssmin:      { minify:  { expand: true,  cwd: 'build/css/', src: 'main.css', dest: 'build/css/', ext: '.min.css',
                                  options: { keepSpecialComments: 0 } } },
        compress:    { main:    { options: { mode: 'gzip' }, expand: true,
                       src:       [ 'dist/**/*.js', 'dist/**/*.css', 'dist/**/*.html', 'dist/**/*.json', 'dist/**/*.md',
                                    'dist/**/*.svg', 'dist/**/*.ttf', 'dist/**/*.otf' ], dest: '.' } },
        copy:        { main:    { files: [ { expand: true, cwd: 'src/less',  src: ['fonts/**'], dest: 'dist/'},
                                           { expand: true, cwd: 'src',  src: ['img/**'], dest: 'dist/'},
                                           { expand: true, cwd: 'src',  src: ['*.ico'], dest: 'dist/'},
                                           { expand: true, cwd: 'src',  src: ['blog/**'],  dest: 'dist/'} ] },
                      // Tasks for copying gh-pages content (dist folder) to separate folder that holds
                      // the gh-pages repository. You might not need this.
                      ghPages:  { files: [ { expand: true, cwd: 'dist',  src: ['**'], dest: '../live-html5-gh-pages/'} ] }
        },
        htmlbuild:   { dist:    { src: 'build/index.html', dest: 'build/index-inline.html',
                                  options: { relative: true, styles: { bundle: 'build/css/main.min.css' } } },
                       optimal: { src: 'build/optimal.html', dest: 'build/optimal-inline.html',
                                  options: { relative: true, styles: { bundle: 'build/css/main.min.css' } } } },
        htmlmin:     { dist:    { options: { removeComments: true, collapseWhitespace: true },
                                  files:   { 'dist/index.html': 'build/index-inline.html' } },
                       optimal: { options: { removeComments: true, collapseWhitespace: true },
                                  files:   { 'dist/optimal.html': 'build/optimal-inline.html' } }}
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-targethtml');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.registerTask('dist', [ 'less', 'uglify', 'targethtml', 'copy', 'cssmin', 'htmlbuild', 'htmlmin',
        'compress', 'optimal']);
    grunt.registerTask('optimal', [ 'less', 'uglify', 'targethtml', 'copy', 'cssmin', 'htmlbuild', 'htmlmin', 'compress']);
    grunt.registerTask('ghPages', ['copy:ghPages']);   // publish to gh-pages folder
    grunt.registerTask('default', ['concurrent:dev']);
};
