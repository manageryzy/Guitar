module.exports = function(grunt) {

	// configure the tasks
	grunt.initConfig({

		copy: {
			build: {
				cwd: 'src',
				src: [ '**', '!**/*.styl', '!**/*.coffee', '!**/*.jade' ,'!**.bak','!**.log','!**.html','!readme.md,!.scss'],
				dest: 'build',
				expand: true
			},
		},
		clean: {
			build: {
				src: [ 'build' ]
			},
			stylesheets: {
				src: [ 'build/**/*.css', '!build/css/application.css' ]
			},
			scripts: {
				src: [ 'build/**/*.js', '!build/js/application.js','!build/**/**.min.js']
			},
		},
		stylus: {
			build: {
				options: {
					linenos: true,
					compress: false
				},
				files: [{
					expand: true,
					cwd: 'src',
					src: [ '**/*.styl' ],
					dest: 'build',
					ext: '.css'
				}]
			}
		},
		autoprefixer: {
			build: {
				expand: true,
				cwd: 'build',
				src: [ '**/*.css' ],
				dest: 'build'
			}
		},
		cssmin: {
			build: {
				files: {
					'build/css/application.css': [ 'build/**/*.css' ]
				}
			}
		},
		coffee: {
			build: {
				expand: true,
				cwd: 'src',
				src: [ '**/*.coffee' ],
				dest: 'build',
				ext: '.js'
			}
		},
		uglify: {
			build: {
				options: {
					mangle: {
						except: ['jQuery', 'Backbone']
					},
					sourceMap: true,
					report:'gzip'					
				},
				files: {
					'build/js/application.js': [ 'build/**/*.js','!build/**/**.min.js']
				}
			}
		},
		jade: {
			compile: {
				options: {
					data: {}
				},
				files: [{
					expand: true,
					cwd: 'src',
					src: [ '**/*.jade' ],
					dest: 'build',
					ext: '.html'
				}]
			}
		},
		fixturesPath: "path",
		htmlbuild: {
			dist: {
				src: ['src/*.html'],
				dest: 'build/',
				options: {
					beautify: false,
					relative: true,
					scripts: {
						libs:[
							'/bower_components/bootstarp/dist/js/*.js',
							'/bower_components/jquery/dist/*.js',
							'/bower_components/vexflow/releases/*.js']
					},
					styles: {
					},
					sections: {
					},
					data: {		
					},
				}
			}
		},
		htmlmin: {                                     // Task
			multiple: { 
				options: {                                 // Target options
					removeComments: true,
					collapseWhitespace: true
				},			// Target
				files: [{                                  // Dictionary of files
					expand: true,
					cwd: 'build/',                             // Project root
					src: '**/*.html',                        // Source
					dest: 'build/'                            // Destination
				}]
			}
		},
		sass:{
			dist:{
				files:[{
					expand: true,
					cwd: 'src/scss',
					src: ['*.scss'],
					dest: 'build/css',
					ext: '.css'
				}],
				options:{
					sourcemap:'auto'
				}
			}	
		},
		cleanempty: {
			options: {
				force: true,
			},
			src: ['build/**/*', 'build/*'],
		},
	});

	// load the tasks
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-html-build');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-cleanempty');

	// define the tasks
    grunt.file.setBase('./')

	grunt.registerTask(
		'stylesheets', 
		'Compiles the stylesheets.', 
		[ 'stylus','sass', 'autoprefixer', 'cssmin', 'clean:stylesheets' ]
	);

	grunt.registerTask(
		'scripts', 
		'Compiles the JavaScript files.', 
		[ 'coffee', 'uglify' ,'clean:scripts' ]
	);
	
	grunt.registerTask(
		'debug-scripts', 
		'Compiles the JavaScript files.', 
		[ 'coffee', 'uglify']
	);

	grunt.registerTask(
		'build', 
		'Compiles all of the assets and copies the files to the build directory.', 
		[ 'clean:build', 'copy', 'stylesheets', 'scripts', 'jade','htmlbuild' ,'htmlmin','cleanempty']
	);
	
	grunt.registerTask(
		'debug-build', 
		'Compiles all of the assets and copies the files to the build directory.', 
		[ 'clean:build', 'copy', 'stylesheets', 'debug-scripts', 'jade','htmlbuild']
	);

	grunt.registerTask(
		'default', 
		'', 
		[ 'build']
	);

};