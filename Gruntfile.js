module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	var modRewrite = require('connect-modrewrite');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			dev: {
				options: {
					port: 8081,
					keepalive: true
				}
			},
			dist: {
				options: {
					base: 'build',
					port: 8081,
					keepalive: true
				}
			}
		}

	});

	grunt.registerTask('default', ['connect:dev']);

};