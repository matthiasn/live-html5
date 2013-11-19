module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: { dist: { files: { 'dist/js/<%= pkg.name %>.min.js': [
            'src/bower_components/jquery/jquery.min.js'
        ] } } },
        watch:       { less:  { files: ['src/**/*.less'], tasks: ['less'], options: { spawn: true } } },
        targethtml:  { dist:    { files: { 'build/index.html': 'src/index.html'} } },
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
                                           { expand: true, cwd: 'src',  src: ['blog/**'],  dest: 'dist/'} ] } },
        htmlbuild:   { dist:    { src: 'build/index.html', dest: 'build/index-inline.html',
                                  options: { relative: true, styles: { bundle: 'build/css/main.min.css' } } },
                       optimal: { src: 'build/index.html', dest: 'build/optimal-inline.html',
                                  options: { relative: true, styles: { bundle: 'build/css/main.min.css' } } } },
        htmlmin:     { dist:    { options: { removeComments: true, collapseWhitespace: true },
                                  files:   { 'dist/index.html': 'build/index-inline.html' } } }
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
    grunt.registerTask('dist', [ 'less', 'uglify', 'targethtml', 'copy', 'cssmin', 'htmlbuild', 'htmlmin', 'compress']);
    grunt.registerTask('default', ['concurrent:dev']);
};
