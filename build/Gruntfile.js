module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		useminPrepare: {
			html: '../src/index.html',
			options: {
				dest: 'output'
			}
		},
		usemin: {
			html: ['output/index.html']
		},
		clean: ["output/**"],
		copy: {
			main: {
				files: [
					{src: '../src/index.html', dest: 'output/index.html'},
					{expand: true, cwd: '../src/images/', src: '*', dest: 'output/images/'},
					{expand: true, cwd: '../src/js/lib/', src: '*', dest: 'output/js/lib/'}
				]
			}
		},
		zip: {
			pack: {
				cwd: 'output/',
				src: 'output/**',
				dest: 'output/candyrain.zip'
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-zip');
	
	grunt.registerTask('default', [
		'clean',
		'copy:main',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'usemin',
		'zip:pack'
		]);
};