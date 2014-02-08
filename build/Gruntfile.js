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
		copy: {
			main: {
				files: [
					{src: '../src/index.html', dest: 'output/index.html'},
					{expand: true, cwd: '../src/images/', src: '*', dest: 'output/images/'},
					{expand: true, cwd: '../src/js/lib/', src: '*', dest: 'output/js/lib/'}
				]
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-usemin');
	
	grunt.registerTask('default', [
		'copy:main',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'usemin'
		]);
};